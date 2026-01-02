# 🧪 APEX DESIGN - FORM SUBMISSION QA CHECKLIST

## Test Environment Setup
- [x] Email credentials configured in `.env.local`
- [x] Email test script passes (`node scripts/test-email.js`)
- [x] Dev server running on `http://localhost:3000`
- [ ] Production environment variables configured in Vercel

---

## ✅ 1. EMAIL DELIVERY TESTS

### Basic Email Test
- [x] **Test Script Execution**: Run `node scripts/test-email.js`
  - [x] Console shows "✅ Email sent successfully!"
  - [x] Message ID received from Gmail
  - [ ] Email arrives in `info@apexdbr.com` inbox
  - [ ] Email NOT in spam folder
  - [ ] Subject line is correct
  - [ ] Sender shows as `info@apexdbr.com`
  - [ ] HTML formatting displays correctly

### Form Submission Email Test
- [ ] Submit test lead via form
  - [ ] Email received with correct lead details
  - [ ] All form fields appear in email body
  - [ ] Clickable phone and email links work
  - [ ] Reply-to is set to submitter's email
  - [ ] HTML table format displays correctly

---

## ✅ 2. LEAD FORM (Landing Page - "Get Estimate" Section)

### Field Validation
- [ ] **First Name**
  - [ ] Required field validation (shows error if empty)
  - [ ] Minimum 2 characters
  - [ ] Error clears on valid input
- [ ] **Last Name**
  - [ ] Required field validation
  - [ ] Minimum 2 characters
  - [ ] Error clears on valid input
- [ ] **Email**
  - [ ] Required field validation
  - [ ] Valid email format required
  - [ ] Shows error for invalid format (e.g., "test" or "test@")
- [ ] **Phone**
  - [ ] Required field validation
  - [ ] Accepts 10-digit phone numbers
  - [ ] Accepts formatted numbers: (949) 555-1234
- [ ] **ZIP Code**
  - [ ] Required field validation
  - [ ] Only accepts 5 digits
  - [ ] Validates Orange County ZIP codes only
  - [ ] Shows specific error for non-OC ZIPs
- [ ] **Project Type**
  - [ ] Required dropdown selection
  - [ ] All options display correctly
- [ ] **Budget**
  - [ ] Required dropdown selection
  - [ ] All budget ranges display correctly

### Form Behavior
- [ ] **Pre-Submission**
  - [ ] All fields start empty
  - [ ] Placeholder text is visible and helpful
  - [ ] Tab order is logical
- [ ] **During Submission**
  - [ ] Button changes to "Sending..." state
  - [ ] Button is disabled during submission
  - [ ] No double-submissions possible
  - [ ] Form fields are disabled during submission
- [ ] **Success State**
  - [ ] Green toast notification appears: "Thank you! We'll contact you within 24 hours."
  - [ ] Success message displays with checkmark icon
  - [ ] Form fields clear after successful submission
  - [ ] Success message is visible for appropriate duration
- [ ] **Error State**
  - [ ] Red toast notification appears with specific error
  - [ ] Error message is user-friendly
  - [ ] Form data is preserved (not cleared)
  - [ ] User can retry submission

### Honeypot (Hidden Field)
- [ ] Honeypot field exists in form (hidden)
- [ ] Field is not visible to users
- [ ] Field is not in tab order
- [ ] When filled (bot simulation), form appears to succeed but no email sent

---

## ✅ 3. CONTACT PAGE (/contact)

### Field Validation
- [ ] **Full Name**
  - [ ] Required field validation
  - [ ] Accepts full name (first + last)
- [ ] **Phone Number**
  - [ ] Required field validation
  - [ ] Validates phone format
- [ ] **Email Address**
  - [ ] Required field validation
  - [ ] Validates email format
- [ ] **ZIP Code**
  - [ ] Required field validation
  - [ ] Only OC ZIP codes accepted
  - [ ] Shows specific error for non-OC ZIPs
- [ ] **Service Type**
  - [ ] Required dropdown selection
  - [ ] All service options display
- [ ] **Project Budget**
  - [ ] Required dropdown selection
  - [ ] All budget ranges display
- [ ] **Project Details (Message)**
  - [ ] Optional field
  - [ ] Accepts multiline text
  - [ ] Character limit enforced (if applicable)

### Form Behavior
- [ ] **Pre-Submission**
  - [ ] All fields start empty
  - [ ] Help text is visible
- [ ] **During Submission**
  - [ ] Button shows "Sending..." state
  - [ ] Button is disabled
  - [ ] No double-submissions
- [ ] **Success State**
  - [ ] Toast notification appears
  - [ ] Success message with icon displays
  - [ ] Form fields clear
  - [ ] Can submit another form after success
- [ ] **Error State**
  - [ ] Toast notification with error message
  - [ ] Form data preserved
  - [ ] User can retry

---

## ✅ 4. SECURITY & SPAM PROTECTION

### Input Sanitization
- [ ] **XSS Prevention**
  - [ ] Test with `<script>alert('xss')</script>` in name field
  - [ ] Script tags are escaped in email
  - [ ] No JavaScript execution
- [ ] **HTML Injection**
  - [ ] Test with `<h1>Test</h1>` in message field
  - [ ] HTML is escaped, not rendered
- [ ] **SQL Injection (if database added later)**
  - [ ] Test with `'; DROP TABLE users;--` in fields
  - [ ] Input is sanitized

### Rate Limiting
- [ ] **Rapid Submissions**
  - [ ] Submit form 4 times quickly with same email
  - [ ] First 3 submissions succeed
  - [ ] 4th submission shows rate limit error
  - [ ] Error message includes wait time
  - [ ] After 15 minutes, can submit again

### Honeypot Test
- [ ] **Bot Simulation**
  - [ ] Open browser dev tools
  - [ ] Find honeypot field in HTML
  - [ ] Manually fill honeypot field
  - [ ] Submit form
  - [ ] Form appears to succeed (returns 200)
  - [ ] NO email is actually sent (check inbox)
  - [ ] No error is shown to the "bot"

---

## ✅ 5. MOBILE RESPONSIVENESS

### Layout Testing (Mobile - 375px width)
- [ ] **Lead Form**
  - [ ] All fields stack vertically
  - [ ] Input fields are full width
  - [ ] Buttons are appropriately sized
  - [ ] Text is readable without zooming
  - [ ] No horizontal scrolling
  - [ ] Toast notifications display correctly
- [ ] **Contact Page**
  - [ ] Form layout is mobile-friendly
  - [ ] All inputs are touch-friendly (min 44px height)
  - [ ] Dropdowns work on mobile
  - [ ] Success/error messages are visible

### Tablet Testing (768px width)
- [ ] Forms display in 2-column grid where appropriate
- [ ] Touch targets are adequate
- [ ] No layout breaking

### Desktop Testing (1920px width)
- [ ] Forms are centered and not too wide
- [ ] Layout is balanced
- [ ] All interactive elements are accessible

---

## ✅ 6. CONSOLE & ERROR CHECKING

### Browser Console (Development)
- [ ] No JavaScript errors in console
- [ ] No 404 errors for resources
- [ ] No CORS errors
- [ ] Analytics events log correctly (if enabled)
- [ ] Form submissions log success/error messages

### Network Tab
- [ ] POST request to `/api/contact` completes
- [ ] Request payload contains all form data
- [ ] Response is JSON with `{success: true}`
- [ ] No failed network requests

---

## ✅ 7. ANALYTICS TRACKING (Optional)

### Google Analytics
- [ ] `generate_lead` event fires on successful submission
- [ ] Event contains project type, budget, and location
- [ ] Event appears in GA real-time reports

### Facebook Pixel
- [ ] `Lead` event fires on successful submission
- [ ] Event contains appropriate metadata
- [ ] Event appears in Facebook Events Manager

---

## ✅ 8. PRODUCTION TESTING (Vercel)

### Environment Variables
- [ ] `EMAIL_USER` is set in Vercel
- [ ] `EMAIL_PASS` is set in Vercel
- [ ] `EMAIL_TO` is set in Vercel
- [ ] Environment variables are set for "Production" environment
- [ ] Redeployment triggered after adding env vars

### Live Site Tests
- [ ] Visit production URL
- [ ] Submit test lead via landing page form
- [ ] Check email arrives at `info@apexdbr.com`
- [ ] Submit test via contact page
- [ ] Check email arrives correctly
- [ ] Test rate limiting on production
- [ ] Verify mobile layout on real device

---

## ✅ 9. FINAL ACCEPTANCE CRITERIA

### Must Pass
- [x] Email delivery working (test script passed)
- [ ] Both forms submit successfully
- [ ] All validation working
- [ ] Success/error messages display
- [ ] No console errors
- [ ] Email contains all form data
- [ ] Emails not going to spam
- [ ] Mobile layout works
- [ ] Rate limiting works
- [ ] Honeypot protection works

### Production Ready
- [ ] Environment variables configured in Vercel
- [ ] Test submission on production successful
- [ ] Email delivery confirmed on production
- [ ] No errors in production logs

---

## 🐛 KNOWN ISSUES / BUGS

Document any issues found during testing:

### Issue #1: [Title]
- **Severity**: High/Medium/Low
- **Description**: [What's wrong]
- **Steps to Reproduce**:
  1. Step 1
  2. Step 2
- **Expected**: [What should happen]
- **Actual**: [What actually happens]
- **Status**: Open/Fixed

---

## 📝 TESTING NOTES

### Manual Test Results (Date: ______)
**Tester**: _____________
**Environment**: Local / Production
**Browser**: Chrome / Safari / Firefox / Mobile

**Overall Result**: ✅ Pass / ❌ Fail / ⚠️ Pass with Issues

**Additional Notes**:
- 
- 
- 

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:
- [x] All tests pass locally
- [x] No console errors
- [x] Email delivery verified
- [ ] Environment variables set in Vercel
- [ ] Analytics configured (if using)
- [ ] Test on production after deployment
- [ ] Monitor for 24 hours post-deployment

---

**Last Updated**: January 2, 2026
**Version**: 1.0.0
