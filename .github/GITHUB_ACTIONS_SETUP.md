# GitHub Actions Setup Guide

This repository includes automated testing and deployment via GitHub Actions.

## 🔐 Required GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions, then add:

### 1. Vercel Secrets

**VERCEL_TOKEN**
- Get from: https://vercel.com/account/tokens
- Create new token named "GitHub Actions"
- Copy and paste into GitHub secret

**VERCEL_ORG_ID**
- Run in terminal: `vercel whoami`
- Or check `.vercel/project.json` after running `vercel link`
- Copy the org ID

**VERCEL_PROJECT_ID**
- Run: `vercel link` (if not already linked)
- Check `.vercel/project.json`
- Copy `projectId` value

### 2. Formspree Secrets

**FORMSPREE_HOMEPAGE_ID**
- Your homepage lead form ID (e.g., `xyzabc123`)
- Found in Formspree dashboard

**FORMSPREE_CONTACT_ID**
- Your contact page form ID
- Found in Formspree dashboard

## 🚀 How It Works

### Workflow Triggers
The deployment workflow runs on:
- Every push to `main` branch
- Manual trigger via GitHub Actions UI

### Workflow Steps

1. **Test Forms** (runs first)
   - Installs dependencies
   - Runs E2E tests for both Formspree forms
   - Verifies forms respond with HTTP 200
   - Fails deployment if tests fail

2. **Deploy to Vercel** (runs if tests pass)
   - Builds Next.js production bundle
   - Deploys to Vercel production
   - Returns deployment URL

3. **Smoke Test** (runs after deploy)
   - Tests all production URLs
   - Verifies forms are present on pages
   - Checks response times
   - Fails if any page returns errors

## 📋 Setup Checklist

- [ ] Add all 5 secrets to GitHub repository
- [ ] Update Formspree IDs in form components
- [ ] Push to main branch to trigger first deployment
- [ ] Check Actions tab to verify workflow runs
- [ ] Review deployment logs for any issues

## 🧪 Manual Testing

Test forms locally before pushing:
```bash
npm run test:forms
```

Test production after deployment:
```bash
npm run smoke:test
```

Run full deployment cycle locally:
```bash
npm run deploy:test
```

## 🔄 Workflow Status

Check workflow status at:
https://github.com/EmanuelRad169/apex-design/actions

## 📧 Notifications

The workflow will:
- ✅ Show green checkmark on successful deployment
- ❌ Show red X if tests or deployment fail
- 💬 Comment on PRs with deployment URL (if applicable)

## 🛠 Troubleshooting

**Workflow fails at "Test Forms" step**
- Verify Formspree IDs are correct in GitHub secrets
- Check that forms are configured in Formspree dashboard

**Workflow fails at "Deploy to Vercel" step**
- Verify VERCEL_TOKEN is valid and not expired
- Check VERCEL_ORG_ID and VERCEL_PROJECT_ID are correct
- Ensure Vercel project exists and is accessible

**Workflow fails at "Smoke Test" step**
- Deployment succeeded but site has issues
- Check Vercel deployment logs
- Manually visit production URL to diagnose

## 🔐 Security Notes

- Never commit secrets to git
- Rotate VERCEL_TOKEN periodically
- Use separate tokens for CI/CD vs local development
- Review GitHub Actions logs for sensitive data exposure
