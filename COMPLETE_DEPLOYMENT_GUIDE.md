# Complete Deployment & Testing Guide

**Project:** Apex Remodeling Website  
**Last Updated:** January 2, 2026  
**Status:** Ready for Production

---

## 🎯 Quick Start

### 1. Setup Formspree (5 minutes)
Follow [FORMSPREE_SETUP.md](FORMSPREE_SETUP.md) to:
- Create Formspree account
- Create 2 forms
- Update form IDs in code

### 2. Test Locally
```bash
npm run test:forms
```

### 3. Deploy
```bash
git push origin main
npx vercel --prod
```

### 4. Verify Production
```bash
npm run smoke:test
```

---

## 📁 Project Structure

```
apex-design/
├── app/
│   ├── contact/page.tsx          # Contact form (Formspree)
│   └── page.tsx                  # Homepage
├── components/
│   └── LeadFormSection.tsx       # Lead form (Formspree)
├── scripts/
│   ├── test-formspree-e2e.ts     # Form testing
│   ├── smoke-test-production.ts  # Production health check
│   └── README.md                 # Scripts documentation
├── .github/
│   ├── workflows/
│   │   └── deploy.yml            # CI/CD pipeline
│   └── GITHUB_ACTIONS_SETUP.md   # GitHub Actions setup
├── FORMSPREE_SETUP.md            # Formspree configuration
├── QA_TEST_REPORT.md             # QA findings
├── DEPLOYMENT_CHECKLIST.md       # Pre-deployment checklist
└── MANUAL_TESTING_GUIDE.md       # Manual test procedures
```

---

## 🚀 Deployment Methods

### Method 1: Automated (Recommended)

**Setup GitHub Actions** (one-time):
1. Follow [.github/GITHUB_ACTIONS_SETUP.md](.github/GITHUB_ACTIONS_SETUP.md)
2. Add 5 secrets to GitHub repository
3. Push to main branch

**Every push to main will:**
- ✅ Run form tests
- ✅ Deploy to Vercel
- ✅ Run smoke tests
- ✅ Report results

### Method 2: Manual Deployment

```bash
# 1. Test forms
npm run test:forms

# 2. Deploy to Vercel
npm run deploy

# 3. Verify deployment
npm run smoke:test
```

### Method 3: One Command

```bash
npm run deploy:test
```

Runs all three steps automatically.

---

## 🧪 Testing

### Local Development Testing

```bash
# Start dev server
npm run dev

# Test forms manually at:
# - http://localhost:3000 (homepage form)
# - http://localhost:3000/contact (contact form)
```

### Automated Form Testing

```bash
npm run test:forms
```

Tests both Formspree forms with mock data.

### Production Smoke Testing

```bash
npm run smoke:test
```

Tests all production URLs and verifies forms are present.

### Full Test Suite

```bash
npm run deploy:test
```

Runs: Form tests → Deploy → Smoke tests

---

## 📧 Email Verification

After deploying, manually test email delivery:

### Test Homepage Form:
1. Visit production URL
2. Scroll to "Get Estimate" section
3. Fill out all fields
4. Submit form
5. Check info@apexdbr.com inbox (within 30 seconds)

### Test Contact Page:
1. Visit `/contact` page
2. Fill out contact form
3. Submit
4. Check inbox

### Expected Email Format:
```
From: submissions@formspree.io
To: info@apexdbr.com
Reply-To: [customer's email]
Subject: New Lead: John Smith - kitchen

name: John Smith
email: john@example.com
phone: (949) 555-1234
zipCode: 92614
projectType: kitchen
budget: 25k-plus
```

---

## 🔐 Security & Configuration

### Environment Variables

**Formspree (required):**
- Set in code or GitHub Secrets
- `FORMSPREE_HOMEPAGE_ID` - Homepage form
- `FORMSPREE_CONTACT_ID` - Contact form

**Vercel (for GitHub Actions):**
- `VERCEL_TOKEN` - API token
- `VERCEL_ORG_ID` - Organization ID
- `VERCEL_PROJECT_ID` - Project ID

### Removed Variables

These are no longer needed (old API):
- ❌ `EMAIL_USER`
- ❌ `EMAIL_PASS`
- ❌ `EMAIL_TO`

Remove from Vercel: https://vercel.com/emanuels-projects-1dd59b95/apex-design/settings/environment-variables

---

## 📊 Monitoring

### Formspree Dashboard
Monitor form submissions at: https://formspree.io/forms

**Metrics available:**
- Total submissions
- Submission rate
- Spam blocks
- Email delivery status

### Vercel Analytics
View deployment analytics at: https://vercel.com/emanuels-projects-1dd59b95/apex-design/analytics

**Metrics available:**
- Page views
- Response times
- Error rates
- Geographic distribution

### GitHub Actions
View deployment history at: https://github.com/EmanuelRad169/apex-design/actions

---

## 🐛 Troubleshooting

### Forms not submitting

**Check:**
1. Formspree IDs are correct in code
2. Formspree dashboard shows form is active
3. Browser console for errors
4. Network tab shows POST to Formspree

**Solution:**
```bash
# Verify IDs in code
grep -r "formspree.io/f/" components/ app/
```

### Tests failing

**"YOUR_FORMSPREE_ID" error:**
- Update IDs in `scripts/test-formspree-e2e.ts`
- Or set environment variables

**Network errors:**
- Check internet connection
- Verify Formspree status: https://status.formspree.io

### Deployment failing

**GitHub Actions fails:**
- Check secrets are set correctly
- Verify VERCEL_TOKEN is valid
- Review action logs for specific errors

**Manual deploy fails:**
- Run `vercel login` to re-authenticate
- Check Vercel project settings
- Ensure build completes locally: `npm run build`

### Emails not arriving

**Check:**
1. Spam/junk folder
2. Formspree dashboard → Form → Submissions
3. Email destination in Formspree settings
4. Formspree email quota (50/month free tier)

**Solution:**
- Upgrade to Formspree Gold if quota exceeded
- Verify email in Formspree dashboard
- Check submission logs

---

## 📈 Performance Optimization

### Current Performance
- Build time: ~22 seconds
- Average response: <200ms
- Static pages: 13 routes
- Serverless: 0 functions (Formspree handles forms)

### Recommendations
1. Enable Vercel Analytics for detailed metrics
2. Set up custom domain (removes .vercel.app)
3. Enable Vercel Speed Insights
4. Monitor Formspree submission rate
5. Upgrade to Formspree Gold if >50 submissions/month

---

## 🔄 Rollback Plan

If deployment has issues:

### Rollback to Previous Version
```bash
# In Vercel dashboard:
# 1. Go to Deployments
# 2. Find previous working deployment
# 3. Click "..." → "Promote to Production"
```

### Revert Code Changes
```bash
git log --oneline
git revert <commit-hash>
git push origin main
```

### Emergency Hotfix
```bash
git checkout main
# Make fix
git add .
git commit -m "Hotfix: [issue]"
git push origin main
# Vercel auto-deploys
```

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Update Formspree IDs in code
- [ ] Test forms locally (`npm run dev`)
- [ ] Run automated tests (`npm run test:forms`)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] Commit all changes
- [ ] Push to main branch
- [ ] Verify deployment succeeds
- [ ] Run smoke tests (`npm run smoke:test`)
- [ ] Test forms on production manually
- [ ] Verify email delivery to info@apexdbr.com
- [ ] Test on mobile devices
- [ ] Check Formspree dashboard for submissions
- [ ] Monitor for errors in first 24 hours

---

## 📞 Support Resources

**Formspree:**
- Dashboard: https://formspree.io
- Documentation: https://help.formspree.io
- Support: support@formspree.io

**Vercel:**
- Dashboard: https://vercel.com
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

**GitHub:**
- Repository: https://github.com/EmanuelRad169/apex-design
- Actions: https://github.com/EmanuelRad169/apex-design/actions
- Issues: https://github.com/EmanuelRad169/apex-design/issues

---

## 🎯 Next Steps

1. ✅ Setup Formspree account and forms
2. ✅ Update form IDs in code
3. ✅ Test locally
4. ✅ Setup GitHub Actions (optional but recommended)
5. ✅ Deploy to production
6. ✅ Verify email delivery
7. 📊 Monitor Formspree dashboard
8. 📈 Enable Vercel Analytics
9. 🚀 Launch marketing campaigns

---

**Questions?** Review the documentation files listed above or reach out to the development team.
