import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/rateLimit';
import { sanitizeInput, validateEmail, sanitizePhone, sanitizeZipCode } from '@/lib/sanitize';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let {
      firstName,
      lastName,
      name, // Fallback if firstName/lastName not provided
      email,
      phone,
      zipCode,
      projectType,
      serviceType, // Fallback for projectType
      budget,
      message,
      honeypot, // Hidden field for spam protection
    } = body;

    // 1. Honeypot Check (Spam Protection)
    if (honeypot) {
      console.warn('Spam detected: Honeypot field filled.');
      // Return success to fool the bot
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 2. Server-side Validation
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Validate and sanitize email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // 4. Rate limiting (by email)
    const rateLimitResult = rateLimit(email, 3, 15 * 60 * 1000); // 3 submissions per 15 minutes
    if (!rateLimitResult.allowed) {
      const minutesRemaining = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Too many submissions. Please try again in ${minutesRemaining} minutes.` },
        { status: 429 }
      );
    }

    // 5. Sanitize all inputs
    firstName = firstName ? sanitizeInput(firstName, 100) : '';
    lastName = lastName ? sanitizeInput(lastName, 100) : '';
    name = name ? sanitizeInput(name, 200) : '';
    phone = sanitizePhone(phone);
    zipCode = sanitizeZipCode(zipCode);
    projectType = projectType ? sanitizeInput(projectType, 100) : '';
    serviceType = serviceType ? sanitizeInput(serviceType, 100) : '';
    budget = budget ? sanitizeInput(budget, 50) : '';
    message = message ? sanitizeInput(message, 1000) : '';

    // Normalize fields
    if (!firstName && !lastName && name) {
      const parts = name.trim().split(' ');
      firstName = parts[0];
      lastName = parts.slice(1).join(' ') || '';
    }
    
    const finalProjectType = projectType || serviceType || 'Not Specified';
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : (name || 'Unknown');

    // 6. Configure Transporter
    // Using environment variables for security
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Built-in service for Gmail
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your App Password (not login password)
      },
    });

    // Alternatively, for generic SMTP (if not using 'service: gmail'):
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    */

    // 7. Email Content
    const mailOptions = {
      from: `"Apex Design Website" <${process.env.EMAIL_USER}>`, // Sender address
      to: process.env.EMAIL_TO || 'info@apexdbr.com', // Receiver address
      replyTo: email, // Allow replying directly to the lead
      subject: `New Lead: ${fullName} - ${finalProjectType}`,
      text: `
        New Lead Submission from Apex Design Website

        Name: ${fullName}
        Email: ${email}
        Phone: ${phone}
        Zip Code: ${zipCode}
        Project Type: ${finalProjectType}
        Budget Range: ${budget}
        Message: ${message || 'N/A'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Lead Submission</h2>
          <p>You have received a new inquiry from the Apex Design website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Zip Code</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${zipCode}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Project Type</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-transform: capitalize;">${finalProjectType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${budget}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${message || 'N/A'}</td>
            </tr>
          </table>
          
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This email was sent from the contact form on apexdbr.com.
          </p>
        </div>
      `,
    };

    // 8. Send Email
    await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully to:', email);
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
