# 🔐 SEO Automation Secrets Setup Guide

## Required GitHub Secrets

To enable full SEO automation, you must configure these repository secrets:

### 1. OpenAI API Key
```
Name: OPENAI_API_KEY
Value: sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Used for: AI-powered SEO recommendations and meta description generation
- Get from: https://platform.openai.com/api-keys

### 2. Google Search Console Service Account
```
Name: GSC_CLIENT_EMAIL
Value: emvi-seo-agent@your-project-id.iam.gserviceaccount.com

Name: GSC_PRIVATE_KEY  
Value: -----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n
```
- Used for: GSC data pulls, indexing requests, performance monitoring
- **CRITICAL**: Keep the `\n` line breaks in GSC_PRIVATE_KEY

## Optional Secrets

### 3. PageSpeed Insights API (Optional)
```
Name: PAGESPEED_API_KEY
Value: AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Used for: Real Core Web Vitals data
- Without this: CWV monitoring uses mock/fallback data
- Get from: Google Cloud Console → APIs & Services → Credentials

### 4. Slack Notifications (Optional)
```
Name: SLACK_WEBHOOK_URL
Value: https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```
- Used for: Performance alerts and notifications
- Without this: No Slack notifications (workflows still run)

## 📋 Step-by-Step Setup

### Step 1: Google Service Account Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing project
3. Enable "Google Search Console API"
4. Create Service Account:
   - IAM & Admin → Service Accounts → Create
   - Name: `emvi-seo-agent`
   - Download JSON key file
5. Add service account to Search Console:
   - Go to [Google Search Console](https://search.google.com/search-console/)
   - Property Settings → Users and permissions
   - Add user: `emvi-seo-agent@your-project-id.iam.gserviceaccount.com`
   - Permission: Full

### Step 2: Extract Credentials from JSON
From your downloaded service account JSON file:
```json
{
  "client_email": "emvi-seo-agent@your-project-id.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhki...\n-----END PRIVATE KEY-----\n"
}
```

### Step 3: Add to GitHub Repository
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with **exact names** shown above

## 🧪 Verify Setup

After adding secrets, test by manually running:
- **SEO Weekly Digest** workflow
- **SEO Priority Indexing** workflow

Success indicators:
```
✅ OPENAI_API_KEY configured
✅ GSC_CLIENT_EMAIL configured  
✅ GSC_PRIVATE_KEY configured
ℹ️ PAGESPEED_API_KEY not configured - Core Web Vitals will use mock data
ℹ️ SLACK_WEBHOOK_URL not configured - Slack notifications disabled
```

## ⚠️ Security Notes

- **Never commit secrets to code**
- **Use GitHub repository secrets only**
- **GSC private key must include `\n` line breaks**
- **Service account should have minimal required permissions**

## 🔍 Troubleshooting

### "GSC authentication failed"
- Check GSC_CLIENT_EMAIL format
- Verify GSC_PRIVATE_KEY has proper line breaks (`\n`)
- Confirm service account is added to Search Console property

### "OpenAI API error" 
- Verify OPENAI_API_KEY starts with `sk-proj-` or `sk-`
- Check API key has sufficient credits/quota

### "No CWV data"
- Either add PAGESPEED_API_KEY or expect mock data
- Workflows will not fail without PageSpeed API key

---
*Setup complete? Run the SEO Weekly Digest workflow to verify all integrations work!*