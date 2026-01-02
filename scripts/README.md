# Testing Scripts

This directory contains automated testing scripts for the Apex Remodeling website.

## Available Scripts

### 🧪 test-formspree-e2e.ts
End-to-end testing for Formspree form submissions.

**Usage:**
```bash
npm run test:forms
```

**What it tests:**
- Homepage lead form submission
- Contact page form submission
- Response times
- HTTP status codes
- Formspree API responses

**Configuration:**
Set environment variables or update the script directly:
- `FORMSPREE_HOMEPAGE_ID` - Homepage lead form ID
- `FORMSPREE_CONTACT_ID` - Contact page form ID

### 🚀 smoke-test-production.ts
Production smoke testing to verify deployment health.

**Usage:**
```bash
npm run smoke:test
```

**What it tests:**
- All page URLs are accessible
- Forms are present on pages
- Response times
- HTTP status codes
- Production deployment health

**Configuration:**
Set `VERCEL_URL` environment variable or uses default production URL.

### 📦 test-email.js (Legacy)
Old SMTP email testing script (now deprecated).

**Status:** ⚠️ Deprecated - Use Formspree instead

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Formspree IDs:**
   - Update `test-formspree-e2e.ts` with your actual form IDs
   - Or set environment variables

3. **Run tests:**
   ```bash
   npm run test:forms
   ```

4. **Deploy and test:**
   ```bash
   npm run deploy:test
   ```

## CI/CD Integration

These scripts are used in GitHub Actions:
- `.github/workflows/deploy.yml` - Automated deployment pipeline
- Tests run before deployment
- Smoke tests run after deployment
- See `.github/GITHUB_ACTIONS_SETUP.md` for setup

## Test Results

### Expected Output (Success)
```
━━━ Formspree E2E Form Testing ━━━

ℹ Checking Formspree configuration...
✓ Homepage form ID: xyzabc123
✓ Contact form ID: def456789

ℹ Testing homepage lead form...
✓ Homepage form submitted successfully (234ms)

ℹ Testing contact page form...
✓ Contact form submitted successfully (189ms)

━━━ Test Summary ━━━

Total Tests: 2
Passed: 2
Failed: 0
Total Time: 423ms

✓ All tests passed! Forms are ready for production.
```

### Expected Output (Failure)
```
❌ Configuration incomplete!
ℹ Follow these steps:
1. Create Formspree account at https://formspree.io
2. Create two forms and copy their IDs
3. Update the IDs in this script or set environment variables
4. Run tests again
```

## Troubleshooting

### "YOUR_FORMSPREE_ID" error
**Solution:** Update form IDs in `test-formspree-e2e.ts` or set environment variables.

### Network timeout errors
**Solution:** Check internet connection and Formspree status at https://status.formspree.io

### Tests pass but no email received
**Solution:** 
- Check spam folder
- Verify email configuration in Formspree dashboard
- Check Formspree submission logs

### TypeScript errors
**Solution:** Ensure dependencies are installed: `npm install`

## Development

To modify tests:
1. Edit the TypeScript files in this directory
2. Run tests locally: `npm run test:forms`
3. Commit changes and push to trigger CI/CD

## Dependencies

Required packages:
- `node-fetch` - HTTP requests
- `typescript` - TypeScript support
- `ts-node` - Run TypeScript directly

All dependencies are in `package.json`.

## See Also

- [FORMSPREE_SETUP.md](../FORMSPREE_SETUP.md) - Formspree configuration
- [MANUAL_TESTING_GUIDE.md](../MANUAL_TESTING_GUIDE.md) - Manual testing procedures
- [QA_TEST_REPORT.md](../QA_TEST_REPORT.md) - QA findings and reports
- [.github/GITHUB_ACTIONS_SETUP.md](../.github/GITHUB_ACTIONS_SETUP.md) - CI/CD setup
