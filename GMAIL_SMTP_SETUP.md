# Gmail SMTP Setup Guide - Apex Remodeling

**Last Updated:** January 2, 2026  
**Status:** ✅ Fully Configured

---

## 🎯 Overview

Forms now use **Gmail SMTP via Nodemailer** to send emails directly to info@apexdbr.com.

### Benefits:
- ✅ Direct email delivery
- ✅ Full control over email formatting
- ✅ No third-party dependencies
- ✅ Rate limiting & spam protection
- ✅ Input sanitization
- ✅ Works on Vercel free tier

---

## 🔐 Gmail App Password Setup

### Why App Password?

Gmail requires an **App Password** (not your regular Gmail password) for SMTP access.

### How to Generate:

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/apppasswords
   - Or navigate: Google Account → Security → 2-Step Verification → App passwords

2. **Create New App Password**
   - App name: `Apex Remodeling Website`
   - Click **Generate**
   - Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

3. **Save to .env.local**
   ```env
   EMAIL_USER=info@apexdbr.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   EMAIL_TO=info@apexdbr.com
   ```

### Security Notes:
- ✅ App passwords are more secure than account passwords
- ✅ Can be revoked individually without changing main password
- ✅ Specific to this application only
- ⚠️ Never commit .env.local to git (already in .gitignore)

---

## 🧪 Testing

### Test Email Delivery

```bash
node scripts/test-email.js
```

**Expected Output:**
```
📧 Starting email test...
User: info@apexdbr.com
To: info@apexdbr.com
✅ Server connection verified
✅ Email sent successfully!
Message ID: <...@apexdbr.com>
Response: 250 2.0.0 OK ... - gsmtp
```

### Test API Endpoint (Local)

```bash
# Start dev server
npm run dev

# In another terminal:
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "9495551234",
    "zipCode": "92614",
    "projectType": "kitchen",
    "budget": "25k-plus",
    "honeypot": ""
  }'
```

**Expected Response:**
```json
{"success":true,"message":"Message sent successfully"}
```

---

## 📧 Email Format

### What You'll Receive:

**From:** Apex Remodeling <info@apexdbr.com>  
**To:** info@apexdbr.com  
**Reply-To:** [customer's email]  
**Subject:** New Lead: John Smith - kitchen

**Body:**
```
New Lead Form Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: John Smith
Email: john@example.com
Phone: (949) 555-1234
ZIP Code: 92614

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Service Type: kitchen
Budget: $25,000+

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: 1/2/2026, 2:30:00 PM PST
Client IP: 127.0.0.1
User Agent: Mozilla/5.0...
```

---

## 🛡️ Security Features

### 1. Rate Limiting
- **Limit:** 5 requests per 15 minutes per IP
- **Prevents:** Form spam and abuse
- **Response:** HTTP 429 (Too Many Requests)

### 2. Honeypot Protection
- Hidden field that bots typically fill
- Silently rejects submissions with honeypot value
- No indication to bot that it was blocked

### 3. Input Sanitization
- All inputs escaped to prevent XSS attacks
- Using `validator` library
- Email validation with strict rules

### 4. Email Validation
- Validates email format before processing
- Rejects invalid/malformed emails
- Returns clear error messages

---

## 🚀 Deployment to Vercel

### Environment Variables

Add these to Vercel:

1. **Go to Vercel Dashboard**
   - https://vercel.com/emanuels-projects-1dd59b95/apex-design/settings/environment-variables

2. **Add Variables:**
   - `EMAIL_USER` = `info@apexdbr.com`
   - `EMAIL_PASS` = `[your 16-char app password]`
   - `EMAIL_TO` = `info@apexdbr.com`

3. **Environment:** Select **Production, Preview, Development**

4. **Redeploy:**
   ```bash
   git push origin main
   npx vercel --prod
   ```

### Important: Deployment Protection

⚠️ **If you have Vercel Deployment Protection enabled:**
- Forms won't work with protection enabled
- **Option 1 (Recommended):** Disable protection for production
- **Option 2:** Add bypass for `/api/*` routes only

**To disable:**
1. Go to: https://vercel.com/emanuels-projects-1dd59b95/apex-design/settings/deployment-protection
2. Select "Disable Protection" for Production
3. Click "Save"

---

## 🐛 Troubleshooting

### "Authentication failed" Error

**Cause:** Invalid EMAIL_USER or EMAIL_PASS

**Solution:**
1. Verify EMAIL_USER is correct Gmail address
2. Regenerate App Password at https://myaccount.google.com/apppasswords
3. Copy password exactly (remove spaces if needed)
4. Update .env.local
5. Restart dev server: `npm run dev`

### "ETIMEDOUT" or "ECONNREFUSED" Error

**Cause:** Network/firewall blocking SMTP port 465/587

**Solution:**
1. Check internet connection
2. Try from different network
3. Verify Gmail SMTP isn't blocked
4. Check with ISP if port 465/587 is open

### Emails Not Arriving

**Check:**
1. ✅ Spam/junk folder
2. ✅ Gmail sent folder (from info@apexdbr.com)
3. ✅ Gmail quota (500 emails/day limit)
4. ✅ Environment variables set in Vercel

**Test Locally:**
```bash
node scripts/test-email.js
```

If local works but production doesn't:
- Verify Vercel environment variables
- Check Vercel function logs
- Ensure deployment protection is disabled

### Rate Limit Exceeded

**Message:** "Too many requests. Please try again later."

**Cause:** More than 5 submissions in 15 minutes from same IP

**Solution:**
- Wait 15 minutes
- Or adjust rate limits in `app/api/contact/route.ts`:
  ```typescript
  const RATE_LIMIT_MAX = 10;  // Increase limit
  const RATE_LIMIT_WINDOW = 15 * 60 * 1000;  // Keep window
  ```

---

## 📊 Monitoring

### Gmail Sent Folder
- All sent emails appear in info@apexdbr.com sent folder
- Check for delivery confirmation
- Review email content/format

### Vercel Function Logs
1. Go to: https://vercel.com/emanuels-projects-1dd59b95/apex-design
2. Click deployment
3. Click "Functions" tab
4. Select `/api/contact`
5. View real-time logs

**Log Indicators:**
- `📬 Form submission received` - Request started
- `✅ Email sent successfully` - Success
- `❌ Error processing` - Failure (check details)
- `🤖 Bot detected` - Honeypot triggered
- `⚠️ Rate limit exceeded` - Too many requests

---

## 🔧 Advanced Configuration

### Customize Email Template

Edit [app/api/contact/route.ts](app/api/contact/route.ts):

```typescript
const emailContent = `
Your custom email template here
Name: ${fullName}
Email: ${sanitizedData.email}
...
`;
```

### Adjust Rate Limits

```typescript
const RATE_LIMIT_MAX = 10;  // Max requests
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;  // 10 minutes
```

### Add CC Recipients

```typescript
await transporter.sendMail({
  from: `"Apex Remodeling" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_TO,
  cc: 'sales@apexdbr.com',  // Add CC
  replyTo: sanitizedData.email,
  subject: `...`,
  text: emailContent,
});
```

### Enable HTML Emails

```typescript
await transporter.sendMail({
  from: `"Apex Remodeling" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_TO,
  replyTo: sanitizedData.email,
  subject: `...`,
  html: `<h1>New Lead</h1><p>Name: ${fullName}</p>`,  // HTML format
  text: emailContent,  // Fallback plain text
});
```

---

## 📞 Support

**Gmail Issues:**
- https://support.google.com/mail/answer/7126229 (App passwords)
- https://support.google.com/mail/answer/13287 (SMTP settings)

**Vercel Issues:**
- https://vercel.com/docs/functions/serverless-functions
- https://vercel.com/support

**Nodemailer Documentation:**
- https://nodemailer.com/about/
- https://nodemailer.com/usage/using-gmail/

---

## ✅ Quick Checklist

- [ ] Gmail App Password generated
- [ ] .env.local configured with all 3 variables
- [ ] `node scripts/test-email.js` runs successfully
- [ ] Local API test works (`npm run dev` → curl test)
- [ ] Environment variables added to Vercel
- [ ] Deployment protection disabled (if enabled)
- [ ] Deployed to production
- [ ] Test form submission on production
- [ ] Verify email arrives at info@apexdbr.com
- [ ] Test on mobile device

---

**Ready to go! Your forms now send emails directly via Gmail SMTP.**
