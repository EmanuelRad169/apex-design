# 🧪 MANUAL TESTING GUIDE - APEX DESIGN FORMS

## Quick Start Testing

### Prerequisites
1. Ensure dev server is running: `npm run dev`
2. Open browser to `http://localhost:3000`
3. Open browser console (F12 or Cmd+Option+I)
4. Have `info@apexdbr.com` inbox open in another tab

---

## TEST 1: Email Delivery Verification ✅

**Status:** PASSED ✅

```bash
node scripts/test-email.js
```

**Expected Result:**
- ✅ Console shows "Email sent successfully!"
- ✅ Message ID received
- ✅ Email arrives in inbox within 1-2 minutes
- ✅ Email NOT in spam folder

**Actual Result:** Email sent successfully with Message ID

---

## TEST 2: Landing Page Lead Form

### Location
Navigate to `http://localhost:3000` and scroll to **"Let's Design Your Dream Space"** section

### Test Case 2.1: Valid Submission
**Steps:**
1. Fill out all fields with valid data:
   - First Name: `John`
   - Last Name: `Tester`
   - Email: `john.tester@example.com`
   - Phone: `(949) 555-1234`
   - ZIP Code: `92614` (Orange County)
   - Project Type: `Kitchen Remodeling`
   - Budget: `$25K+`

2. Click **"Request My Estimate"**

**Expected Results:**
- ✅ Button changes to "Sending..."
- ✅ Button is disabled during submission
- ✅ Green toast appears: "Thank you! We'll contact you within 24 hours."
- ✅ Success message with checkmark displays
- ✅ Form fields clear
- ✅ Email received at `info@apexdbr.com` with all data
- ✅ Console shows detailed logs (see API logs section)

**Console Logs Should Show:**
```
📬 [API] New form submission received
📝 [API] Form data received: { hasFirstName: true, ... }
🔒 [RATE LIMIT] Checking rate limit for: john.tester@example.com
🧹 [SANITIZE] Sanitizing and normalizing inputs...
👤 [DATA] Normalized lead info: {...}
📧 [EMAIL] Configuring email transporter...
📤 [EMAIL] Sending email to: info@apexdbr.com
✅ [SUCCESS] Email sent successfully!
📬 [EMAIL] Message ID: <...>
⏱️  [TIMING] Total processing time: XXXms
```

### Test Case 2.2: Field Validation
**Steps:**
1. Try to submit with empty First Name
2. Try invalid email (e.g., `test` or `test@`)
3. Try phone with less than 10 digits
4. Try ZIP code outside Orange County (e.g., `90210`)

**Expected Results:**
- ❌ Error messages appear under each invalid field
- ❌ Form does not submit
- ✅ Error messages clear when field is corrected
- ✅ No API call is made until all fields are valid

### Test Case 2.3: Rate Limiting
**Steps:**
1. Submit form successfully with email `rate.limit@test.com`
2. Immediately submit again with same email
3. Submit third time
4. Submit fourth time

**Expected Results:**
- ✅ First 3 submissions succeed
- ❌ 4th submission shows toast: "Too many submissions. Please try again in 15 minutes."
- ✅ Console shows: `⚠️  [RATE LIMIT] Limit exceeded`

---

## TEST 3: Contact Page Form

### Location
Navigate to `http://localhost:3000/contact`

### Test Case 3.1: Valid Submission
**Steps:**
1. Fill out all fields:
   - Full Name: `Jane Contact`
   - Phone: `(949) 555-6789`
   - Email: `jane.contact@example.com`
   - ZIP Code: `92614`
   - Service Type: `Bathroom Remodeling`
   - Project Budget: `$25,000 - $50,000`
   - Message: `I need a bathroom remodel ASAP`

2. Click **"Get My Free Estimate"**

**Expected Results:**
- ✅ Button changes to "Sending..."
- ✅ Green toast notification appears
- ✅ Success message displays
- ✅ Form fields clear
- ✅ Email received with message included

### Test Case 3.2: Orange County ZIP Validation
**Steps:**
1. Enter ZIP code `90210` (Beverly Hills - not OC)
2. Try to submit

**Expected Results:**
- ❌ Error: "We currently serve Orange County ZIP codes only"
- ❌ Form does not submit

---

## TEST 4: Security Testing

### Test Case 4.1: Honeypot (Bot Protection)
**Steps:**
1. Open browser DevTools (F12)
2. Go to Elements/Inspector tab
3. Find the honeypot field (hidden input with name="honeypot")
4. In Console, run:
   ```javascript
   document.querySelector('input[name="honeypot"]').value = "bot-filled";
   ```
5. Fill out form normally and submit

**Expected Results:**
- ✅ Form appears to succeed (200 response)
- ✅ Console shows: `⚠️  [SECURITY] Spam detected: Honeypot field filled`
- ❌ **NO EMAIL IS SENT** (check inbox - should be empty)
- ✅ No error shown to the "bot"

### Test Case 4.2: XSS Prevention
**Steps:**
1. In First Name field, enter: `<script>alert('XSS')</script>`
2. Submit form

**Expected Results:**
- ✅ Form submits successfully
- ✅ Email is received
- ✅ Script tags are escaped in email (shows as text, not executed)
- ❌ No alert popup appears

### Test Case 4.3: HTML Injection
**Steps:**
1. In message field, enter: `<h1>Big Header</h1><b>Bold text</b>`
2. Submit form

**Expected Results:**
- ✅ Email shows escaped HTML (as plain text)
- ❌ HTML is not rendered in email

---

## TEST 5: Mobile Responsiveness

### Test Case 5.1: Mobile Layout (375px width)
**Steps:**
1. Open DevTools (F12)
2. Click device toolbar icon (Cmd+Shift+M)
3. Select iPhone SE or set width to 375px
4. Test both forms

**Expected Results:**
- ✅ All fields stack vertically
- ✅ Buttons are full width
- ✅ Text is readable without zooming
- ✅ No horizontal scrolling
- ✅ Toast notifications are visible and not cut off
- ✅ Touch targets are at least 44px

### Test Case 5.2: Tablet (768px)
**Expected Results:**
- ✅ 2-column grid displays correctly
- ✅ Form is centered and balanced

---

## TEST 6: Error Handling

### Test Case 6.1: Network Error Simulation
**Steps:**
1. Open DevTools > Network tab
2. Set throttling to "Offline"
3. Try to submit form

**Expected Results:**
- ❌ Red toast: "Network error. Please check your connection or call us at (949) 432-0359"
- ✅ Form data is preserved (not cleared)
- ✅ User can retry after going back online

### Test Case 6.2: Invalid Email from API
**Steps:**
1. Submit with email: `not-an-email`

**Expected Results:**
- ❌ Toast: "Invalid email address"
- ❌ HTTP 400 response
- ✅ Console shows: `❌ [VALIDATION] Invalid email format`

---

## TEST 7: Analytics (Optional)

If you've added Google Analytics or Facebook Pixel:

**Steps:**
1. Submit form successfully
2. Check browser console

**Expected Results:**
- ✅ Console log: `📊 Lead submission tracked: {...}`
- ✅ GA event fires (check GA real-time reports)
- ✅ FB Pixel event fires (check Events Manager)

---

## TEST 8: Production Testing

### Prerequisites
1. Ensure environment variables are set in Vercel:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_TO`
2. Redeploy if needed

### Test Case 8.1: Production Form Submission
**Steps:**
1. Visit production URL (e.g., `https://apex-design.vercel.app`)
2. Submit test lead via landing page
3. Submit test via contact page

**Expected Results:**
- ✅ Both forms work identically to local
- ✅ Emails arrive at `info@apexdbr.com`
- ✅ No console errors
- ✅ Toast notifications work

### Test Case 8.2: Production Rate Limiting
**Steps:**
1. Submit 4 times quickly with same email on production

**Expected Results:**
- ✅ Rate limiting works same as local
- ✅ Appropriate error message after 3 submissions

---

## 📋 QUICK CHECKLIST

Use this for rapid testing:

- [ ] Test email script passes
- [ ] Landing page form submits successfully
- [ ] Contact page form submits successfully
- [ ] Email arrives in inbox (not spam)
- [ ] All form data appears in email
- [ ] Field validation works
- [ ] Error messages are user-friendly
- [ ] Success messages display
- [ ] Rate limiting works (4th submission fails)
- [ ] Honeypot silently blocks spam
- [ ] XSS prevention works
- [ ] Mobile layout works
- [ ] Toast notifications display
- [ ] No console errors
- [ ] Production deployment works

---

## 🐛 Bug Reporting Template

If you find issues, document them like this:

```
### Bug: [Short Description]
**Severity:** Critical / High / Medium / Low
**Location:** Landing Page / Contact Page / API
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected:** 
**Actual:** 
**Console Errors:** 
**Screenshot:** 
**Browser:** 
```

---

## ✅ TESTING COMPLETE

**Date:** _______________
**Tester:** _______________
**Result:** ✅ All Pass / ⚠️ Pass with Minor Issues / ❌ Fail

**Notes:**
- 
- 
- 

---

**Next Steps:**
1. Fix any identified bugs
2. Re-test failed cases
3. Deploy to production
4. Monitor for 24 hours post-deployment
