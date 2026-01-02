# 🚀 PRODUCTION DEPLOYMENT CHECKLIST - APEX DESIGN

**Deployment Date:** January 2, 2026  
**Deployed By:** Emanuel  
**Version:** 2.0.0

---

## ⚠️ CRITICAL: Environment Variables

**BEFORE deploying, ensure these are set in Vercel:**

### Step-by-Step Instructions:
1. Go to: https://vercel.com/dashboard
2. Select project: `apex-design`
3. Click **Settings** > **Environment Variables**
4. Add the following three variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `EMAIL_USER` | `info@apexdbr.com` | Production |
| `EMAIL_PASS` | `jpxe tkjo cjfv bemb` | Production |
| `EMAIL_TO` | `info@apexdbr.com` | Production |

5. **IMPORTANT:** After adding env vars, trigger a new deployment

---

## ✅ PRE-DEPLOYMENT CHECKLIST

- [x] All code committed to git
- [x] Code pushed to GitHub
- [x] Local build successful (`npm run build`)
- [x] Email test script passed locally
- [x] No console errors locally
- [x] Dependencies updated (ESLint 9, no vulnerabilities)
- [ ] **Environment variables configured in Vercel**
- [ ] Production deployment triggered

---

## 🚀 DEPLOYMENT COMMAND

```bash
npx vercel --prod
```

**Expected Output:**
```
✅ Production: https://apex-design-xxxx.vercel.app
```

---

## 🧪 POST-DEPLOYMENT TESTING

### Test 1: Landing Page Form
**URL:** `https://your-production-url.vercel.app`

**Steps:**
1. Scroll to "Let's Design Your Dream Space" section
2. Fill out form:
   - First Name: `Production`
   - Last Name: `Test`
   - Email: `production.test@example.com`
   - Phone: `(949) 555-9999`
   - ZIP: `92614`
   - Project Type: `Kitchen Remodeling`
   - Budget: `$25K+`
3. Submit form
4. **Verify:**
   - [ ] Green toast notification appears
   - [ ] Success message displays
   - [ ] Form fields clear
   - [ ] Email arrives at `info@apexdbr.com` within 2 minutes
   - [ ] Email contains all form data
   - [ ] Email is NOT in spam folder

### Test 2: Contact Page Form
**URL:** `https://your-production-url.vercel.app/contact`

**Steps:**
1. Fill out form with test data
2. Submit
3. **Verify:**
   - [ ] Toast notification works
   - [ ] Email received correctly
   - [ ] All data present in email

### Test 3: Mobile Responsiveness
**Device:** iPhone or use Chrome DevTools

**Steps:**
1. Open production URL on mobile
2. Test both forms
3. **Verify:**
   - [ ] Forms display correctly
   - [ ] All fields are accessible
   - [ ] Buttons work
   - [ ] Toast notifications visible
   - [ ] No horizontal scroll

### Test 4: Rate Limiting (Production)
**Steps:**
1. Submit form 4 times quickly with same email
2. **Verify:**
   - [ ] 4th submission shows rate limit error
   - [ ] Error message is user-friendly

### Test 5: Console Errors
**Steps:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Submit form
4. **Verify:**
   - [ ] No JavaScript errors
   - [ ] No 404 errors
   - [ ] API call succeeds (200 status)

---

## 📧 EMAIL VERIFICATION CHECKLIST

When you receive the test email at `info@apexdbr.com`:

- [ ] Subject line correct: "New Lead: [Name] - [Project Type]"
- [ ] Sender shows: `info@apexdbr.com` or "Apex Design Website"
- [ ] All form fields present in email body
- [ ] Phone number is clickable (tel: link)
- [ ] Email address is clickable (mailto: link)
- [ ] HTML formatting displays correctly
- [ ] No spam warning indicators
- [ ] Reply-to is set to submitter's email

---

## 🐛 ISSUE TRACKING

### Issue #1: [If any issues found]
**Severity:** Critical / High / Medium / Low  
**Description:**  
**Steps to Reproduce:**  
**Status:** Open / In Progress / Resolved  

---

## 📊 ANALYTICS SETUP (Optional)

If you want to track form submissions:

### Google Analytics
1. Get your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)
2. Add to `app/layout.tsx`:
```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Facebook Pixel
1. Get your Pixel ID
2. Add to `app/layout.tsx`:
```typescript
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  `}
</Script>
```

3. Test by submitting form and checking:
   - [ ] GA Real-Time reports show lead event
   - [ ] Facebook Events Manager shows Lead event

---

## ✅ DEPLOYMENT SIGN-OFF

**Deployment Successful:** YES / NO  
**All Tests Passed:** YES / NO  
**Email Delivery Working:** YES / NO  
**Production Ready:** YES / NO  

**Notes:**




**Signed Off By:** _______________  
**Date:** _______________

---

## 🔧 TROUBLESHOOTING

### If emails are not being sent:
1. Check Vercel logs for errors
2. Verify environment variables are set correctly
3. Ensure `EMAIL_PASS` has no extra spaces
4. Check Gmail for "suspicious activity" alerts
5. Verify app password is still valid

### If forms are not submitting:
1. Check browser console for errors
2. Verify API endpoint is accessible: `curl https://your-url.vercel.app/api/contact`
3. Check Vercel function logs
4. Ensure rate limit hasn't been hit

### If emails go to spam:
1. Set up SPF record for domain (if using custom domain)
2. Set up DKIM authentication
3. Ensure sender email matches the authenticated domain
4. Check email content for spam triggers

---

## 📞 SUPPORT CONTACTS

**Developer:** Emanuel Rad  
**Client Email:** info@apexdbr.com  
**Hosting:** Vercel  
**Email Service:** Gmail (Google Workspace)

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. Monitor email delivery for 24 hours
2. Check form submissions daily
3. Review analytics data (if configured)
4. Address any user feedback
5. Plan Phase 2 features (if any)

---

**Deployment Status:** 🟡 IN PROGRESS

Update this to:
- 🟢 COMPLETE when all tests pass
- 🔴 BLOCKED if issues prevent deployment
