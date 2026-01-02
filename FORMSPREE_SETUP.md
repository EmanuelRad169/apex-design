# Formspree Setup Guide - Apex Remodeling

**Last Updated:** January 2, 2026  
**Status:** ⚠️ Configuration Required

---

## 🎯 What Changed

Replaced the Vercel API backend (`/api/contact`) with **Formspree**, a free form submission service that bypasses deployment protection issues.

### Benefits:
- ✅ No backend code needed
- ✅ No Vercel deployment protection issues
- ✅ No environment variables to configure
- ✅ Built-in spam protection
- ✅ Email notifications included
- ✅ Free tier: 50 submissions/month

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Formspree Account

1. Go to https://formspree.io
2. Click **"Get Started Free"**
3. Sign up with your email: **info@apexdbr.com**
4. Verify your email

### Step 2: Create Two Forms

**Form 1: Homepage Lead Form**
1. Click **"+ New Form"**
2. Name: `Apex Lead Form - Homepage`
3. Email destination: `info@apexdbr.com`
4. Click **"Create Form"**
5. Copy the form endpoint URL (looks like: `https://formspree.io/f/xyzabc123`)
6. Save this as your **HOMEPAGE_FORM_ID**

**Form 2: Contact Page Form**
1. Click **"+ New Form"** again
2. Name: `Apex Contact Form`
3. Email destination: `info@apexdbr.com`
4. Click **"Create Form"**
5. Copy the form endpoint URL
6. Save this as your **CONTACT_FORM_ID**

### Step 3: Update the Code

Open [components/LeadFormSection.tsx](components/LeadFormSection.tsx) and replace line 117:

```tsx
// BEFORE:
const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {

// AFTER (use your actual ID):
const response = await fetch('https://formspree.io/f/xyzabc123', {
```

Open [app/contact/page.tsx](app/contact/page.tsx) and replace line 62:

```tsx
// BEFORE:
const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {

// AFTER (use your actual ID):
const response = await fetch('https://formspree.io/f/xyzabc123', {
```

### Step 4: Deploy

```bash
git add .
git commit -m "Configure Formspree form endpoints"
git push origin main
npx vercel --prod
```

### Step 5: Test Forms

1. Visit https://apex-design-76hoy3yy8-emanuels-projects-1dd59b95.vercel.app
2. Fill out the lead form at the bottom
3. Submit and check:
   - ✅ Success toast appears
   - ✅ Form clears after submission
   - ✅ Email arrives at info@apexdbr.com within 30 seconds

4. Visit https://apex-design-76hoy3yy8-emanuels-projects-1dd59b95.vercel.app/contact
5. Fill out and submit the contact form
6. Verify email delivery

---

## 📧 Email Format

### What You'll Receive

**Subject:** `New Lead: John Smith - kitchen`  
**From:** `submissions@formspree.io`  
**Reply-To:** `[customer's email]`  
**To:** `info@apexdbr.com`

**Body:**
```
name: John Smith
email: john@example.com
phone: (949) 555-1234
zipCode: 92614
projectType: kitchen
budget: 25k-plus
```

### Customizing Email Format (Optional)

In your Formspree dashboard:
1. Click on the form
2. Go to **"Settings"** → **"Email"**
3. Customize:
   - Email subject template
   - Reply-to behavior
   - Auto-response to submitter
   - Email format (HTML or plain text)

---

## 🔒 Spam Protection

### Built-in Features:
- ✅ Honeypot field (already implemented in code)
- ✅ reCAPTCHA v2 (can enable in Formspree dashboard)
- ✅ Rate limiting (50 submissions/month on free plan)
- ✅ Submission archive (view all submissions in dashboard)

### Enable reCAPTCHA (Recommended):
1. In Formspree dashboard, click your form
2. Go to **"Settings"** → **"Spam Prevention"**
3. Toggle **"Enable reCAPTCHA"**
4. Choose **"Invisible reCAPTCHA"** for best UX
5. Save changes

No code changes needed - Formspree handles it automatically!

---

## 🧪 Testing Locally

Test forms in development (localhost):

```bash
npm run dev
```

Visit http://localhost:3000 and test forms. Formspree will:
- ✅ Accept submissions from localhost
- ✅ Send emails to info@apexdbr.com
- ✅ Show success/error responses

---

## 📊 Form Analytics

View submission analytics in Formspree dashboard:
- Total submissions
- Submission rate over time
- Form conversion rate
- Spam blocks
- Failed submissions

**Pro Tip:** Upgrade to Formspree Gold ($10/month) for:
- Unlimited submissions
- File uploads
- Custom redirects
- Webhook integrations
- Priority support

---

## 🔧 Advanced Configuration

### Webhook Integration (Optional)

Send form data to external services (Slack, Zapier, etc.):

1. In Formspree dashboard: **"Settings"** → **"Webhooks"**
2. Add webhook URL
3. Formspree will POST submission data as JSON

### Custom Redirect After Submission

In your form code, add `_next` field:

```tsx
body: JSON.stringify({
  name: formData.name,
  email: formData.email,
  // ... other fields
  _next: 'https://apex-design.com/thank-you',  // Custom thank-you page
}),
```

### File Uploads (Gold Plan Only)

Add file input to forms:

```tsx
<input 
  type="file" 
  name="attachment"
  accept="image/*,.pdf"
/>
```

Formspree will include file URLs in email notifications.

---

## 🆚 Comparison: Old vs New

| Feature | Old (Vercel API) | New (Formspree) |
|---------|------------------|-----------------|
| Backend code | Required | None |
| Environment vars | 3 variables | None |
| Deployment protection | ❌ Blocked | ✅ Works |
| Email service | Gmail SMTP | Formspree |
| Spam protection | Manual | Built-in |
| Submission logs | Vercel logs | Dashboard |
| Cost | Free | Free (50/mo) |
| Setup time | 30 min | 5 min |

---

## 🚨 Migration Checklist

- [ ] Create Formspree account with info@apexdbr.com
- [ ] Create two forms in Formspree dashboard
- [ ] Copy both form endpoint IDs
- [ ] Update `LeadFormSection.tsx` with homepage form ID
- [ ] Update `contact/page.tsx` with contact form ID
- [ ] Commit and push changes to GitHub
- [ ] Deploy to Vercel production
- [ ] Test homepage lead form submission
- [ ] Test contact page form submission
- [ ] Verify emails arrive at info@apexdbr.com
- [ ] Check Formspree dashboard for submissions
- [ ] (Optional) Enable reCAPTCHA in Formspree
- [ ] (Optional) Remove old `/api/contact` route

---

## 🛠 Troubleshooting

### Form submission fails with 403 error
**Solution:** Form endpoint ID is incorrect. Double-check the ID in your code matches Formspree dashboard.

### Emails not arriving
**Solution:** 
1. Check spam/junk folder
2. Verify email destination in Formspree dashboard
3. Check Formspree submission logs for delivery status

### Honeypot field visible to users
**Solution:** The honeypot field has CSS to hide it. If visible, check your CSS is loading correctly.

### Rate limit exceeded
**Solution:** Free plan limited to 50 submissions/month. Upgrade to Gold plan for unlimited submissions.

### CORS errors in console
**Solution:** Formspree automatically handles CORS. If you see errors, ensure you're using the correct endpoint URL with `/f/` prefix.

---

## 📞 Support

**Formspree Support:** support@formspree.io  
**Documentation:** https://help.formspree.io  
**Status Page:** https://status.formspree.io

---

## 🔄 Rollback Plan

If Formspree doesn't work, you can rollback to the old API:

1. Revert the changes to form components:
   ```bash
   git revert HEAD
   git push origin main
   npx vercel --prod
   ```

2. Disable Vercel deployment protection:
   - Go to Vercel dashboard → Settings → Deployment Protection
   - Select "Disable Protection"

3. Redeploy and test

---

## ✅ Next Steps After Setup

1. **Test mobile forms** on real devices
2. **Monitor Formspree dashboard** for submissions
3. **Set up email filters** in Gmail to organize leads
4. **Enable reCAPTCHA** if you receive spam
5. **Consider upgrading** to Gold if you expect >50 leads/month
6. **Remove old API route** (`app/api/contact/route.ts`) if everything works

---

**Questions?** Check the [QA_TEST_REPORT.md](QA_TEST_REPORT.md) for additional testing procedures.
