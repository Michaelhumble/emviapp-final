# 🔐 SEO Automation Secrets Setup

## Required Secrets
- **OPENAI_API_KEY**: `sk-...` for SEO recommendations  
- **GSC_CLIENT_EMAIL**: `...@project.iam.gserviceaccount.com`  
- **GSC_PRIVATE_KEY**: `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`

## Optional Secrets  
- **PAGESPEED_API_KEY**: For Core Web Vitals (uses Lighthouse fallback)
- **SLACK_WEBHOOK_URL**: For performance alerts

## Google Service Account Setup
1. [Google Cloud Console](https://console.cloud.google.com/) → Create project
2. Enable: Search Console API + Web Search Indexing API  
3. Create Service Account with **Owner** role
4. Generate JSON key → Extract client_email and private_key
5. Keep `\n` sequences in private_key

## Add to GitHub
Settings → Secrets and variables → Actions → New repository secret

## Test Setup
Run "SEO Weekly Audit & Tracking" manually → Should show ✅ GSC auth OK