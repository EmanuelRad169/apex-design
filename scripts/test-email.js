const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

async function sendTestEmail() {
  console.log('📧 Starting email test...');
  console.log(`User: ${process.env.EMAIL_USER}`);
  console.log(`To: ${process.env.EMAIL_TO}`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Error: EMAIL_USER or EMAIL_PASS environment variables are missing.');
    console.error('Please ensure you have a .env.local file with these variables.');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log('✅ Server connection verified');

    const info = await transporter.sendMail({
      from: `"Apex Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: "Apex Design - Test Email",
      text: "This is a test email to verify your configuration is working correctly.",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #2d3748;">Test Email Successful! 🎉</h2>
          <p>Your email configuration for <strong>Apex Design</strong> is working correctly.</p>
          <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendTestEmail();
