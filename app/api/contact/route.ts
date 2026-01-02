import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import validator from 'validator';

// Rate limiting store (in-memory, resets on serverless function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 5 requests per 15 minutes per IP
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function sanitizeInput(input: string): string {
  return validator.escape(validator.trim(input));
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('📬 Form submission received');

    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    // Parse request body
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      name,
      email, 
      phone, 
      zipCode, 
      projectType,
      serviceType,
      budget,
      message,
      honeypot 
    } = body;

    // Honeypot check (bot detection)
    if (honeypot) {
      console.log('🤖 Bot detected via honeypot');
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || !validator.isEmail(email)) {
      console.log('❌ Invalid email format:', email);
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      console.log('⚠️ Rate limit exceeded for:', clientIP);
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      firstName: firstName ? sanitizeInput(firstName) : '',
      lastName: lastName ? sanitizeInput(lastName) : '',
      name: name ? sanitizeInput(name) : '',
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      zipCode: zipCode ? sanitizeInput(zipCode) : '',
      projectType: projectType ? sanitizeInput(projectType) : '',
      serviceType: serviceType ? sanitizeInput(serviceType) : '',
      budget: budget ? sanitizeInput(budget) : '',
      message: message ? sanitizeInput(message) : '',
    };

    console.log('🧹 Input sanitized');

    // Determine full name
    const fullName = sanitizedData.name || `${sanitizedData.firstName} ${sanitizedData.lastName}`.trim();
    const service = sanitizedData.projectType || sanitizedData.serviceType || 'General Inquiry';

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection
    console.log('🔌 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Compose email
    const emailContent = `
New ${sanitizedData.message ? 'Contact Form' : 'Lead Form'} Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
ZIP Code: ${sanitizedData.zipCode || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service Type: ${service}
Budget: ${sanitizedData.budget || 'Not specified'}

${sanitizedData.message ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${sanitizedData.message}
` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
Client IP: ${clientIP}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated message from Apex Remodeling website.
Reply directly to this email to contact the customer.
    `.trim();

    // Send email
    console.log('📧 Sending email...');
    await transporter.sendMail({
      from: `"Apex Remodeling" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: sanitizedData.email,
      subject: `New ${sanitizedData.message ? 'Contact' : 'Lead'}: ${fullName} - ${service}`,
      text: emailContent,
    });

    const responseTime = Date.now() - startTime;
    console.log(`✅ Email sent successfully in ${responseTime}ms`);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    console.error('❌ Error processing form submission:', error);
    
    // Specific error messages
    let errorMessage = 'There was an error sending your message. Please try again.';
    
    if (error.code === 'EAUTH') {
      console.error('🔐 Authentication failed - check EMAIL_USER and EMAIL_PASS');
      errorMessage = 'Email configuration error. Please contact support.';
    } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.error('🌐 Network error - SMTP connection failed');
      errorMessage = 'Network error. Please try again later.';
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS (if needed)
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
