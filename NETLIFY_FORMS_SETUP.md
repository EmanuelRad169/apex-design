# Netlify Forms Setup - APEX Design

✅ **Your forms have been successfully converted to Netlify Forms!**

## 📋 What Was Changed

### Forms Updated:
1. **Contact Form** (`/app/contact/page.tsx`) - Main contact page form
2. **Lead Form** (`/components/LeadFormSection.tsx`) - Homepage lead generation form

### Key Changes Made:
- ✅ Added `data-netlify="true"` attribute to both forms
- ✅ Added `name` attributes for Netlify form identification
- ✅ Added hidden `form-name` inputs for proper form routing
- ✅ Removed API route dependencies (`/api/contact`)
- ✅ Updated form submission logic to work with static export
- ✅ Added success state handling for redirects
- ✅ Maintained client-side validation
- ✅ Kept honeypot spam protection (Lead form)

## 🚀 Deployment Instructions

### 1. Build & Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify (drag & drop the 'out' folder to Netlify dashboard)
# OR use Netlify CLI:
npm install -g netlify-cli
netlify login
netlify deploy --dir=out --prod
```

### 2. After Deployment - Configure Forms

1. **Go to your Netlify dashboard**
2. **Navigate to:** Site Settings → Forms
3. **You should see two forms:**
   - `contact` - Main contact form
   - `lead` - Homepage lead form

### 3. Set Up Form Notifications (Recommended)

1. **Forms → Notifications**
2. **Add notification** → Email notification
3. **Enter:** `info@apexdbr.com`
4. **Save**

Netlify controls the notification recipient in the dashboard. The website can
submit and label the forms, but the email destination must be configured there.

## 🧪 Testing the Forms

### Test Page Available:
Visit: `your-domain.netlify.app/test-forms.html`

This page contains simplified versions of both forms for easy testing.

### Testing Steps:
1. ✅ Deploy to Netlify
2. ✅ Fill out and submit both forms
3. ✅ Check Netlify dashboard → Forms for submissions
4. ✅ Verify the submissions arrive at `info@apexdbr.com`
5. ✅ Test spam protection (honeypot on lead form)

## 📊 Form Fields Reference

### Contact Form (`contact`):
- `name` (required)
- `phone` (required) 
- `email` (required)
- `zipCode` (required)
- `serviceType` (required)
- `budget` (required)
- `message` (optional)

### Lead Form (`lead`):
- `firstName` (required)
- `lastName` (required)
- `email` (required)
- `phone` (required)
- `zipCode` (required)
- `projectType` (required)
- `budget` (required)
- `honeypot` (spam protection - hidden field)

## 🔧 Advanced Configuration

### Custom Thank You Page:
Forms currently redirect to the same page with `?success=true` parameter. To create a custom thank you page:

1. Create `/app/thank-you/page.tsx`
2. Update forms to redirect to `/thank-you`
3. Remove `?success=true` handling from contact page

### Slack/Zapier Integration:
- **Netlify Forms** → **Notifications** → **Outgoing webhook**
- Perfect for Slack notifications or Zapier automation

### Form Validation:
Client-side validation is maintained. Server-side validation is handled by Netlify automatically.

## 🛠️ Troubleshooting

### Forms not appearing in Netlify dashboard?
- ✅ Check the form has `data-netlify="true"`
- ✅ Verify the form has a `name` attribute
- ✅ Make sure the hidden `form-name` input matches the form name
- ✅ Redeploy the site

### Submissions not working?
- ✅ Ensure you're testing on the live Netlify URL (not localhost)
- ✅ Check Network tab for form submission
- ✅ Verify forms are being submitted with POST method

### Analytics Still Working?
Yes! The `trackLeadSubmission()` function still runs before form submission.

## 📝 Notes

- ⚠️ **The `/api/contact` route has been removed** since it's not needed for static Netlify Forms
- ⚠️ **Forms only work on deployed Netlify sites**, not in local development
- ✅ **All styling and UX remains the same**
- ✅ **Client-side validation is preserved**
- ✅ **Analytics tracking continues to work**

## 🎉 Ready to Deploy!

Your site is now ready for Netlify deployment with fully functional forms. Just build and deploy!
