# Supabase SEO Edge Functions Deployment Guide

## Overview

EmviApp uses two Edge Functions for automated SEO management:
1. **seo-reindex-cron**: Weekly content reindexing
2. **seo-health-weekly**: Weekly SEO health monitoring

## Prerequisites

- Supabase CLI installed
- Authenticated to project: `wwhqbjrhbajpabfdwnip`

## Deployment Steps

### 1. Deploy seo-reindex-cron

```bash
supabase functions deploy seo-reindex-cron
```

**Expected Output**:
```
Deploying function seo-reindex-cron...
✓ Function deployed successfully
URL: https://wwhqbjrhbajpabfdwnip.functions.supabase.co/seo-reindex-cron
```

### 2. Deploy seo-health-weekly

```bash
supabase functions deploy seo-health-weekly
```

**Expected Output**:
```
Deploying function seo-health-weekly...
✓ Function deployed successfully
URL: https://wwhqbjrhbajpabfdwnip.functions.supabase.co/seo-health-weekly
```

### 3. Set INDEXNOW_KEY Secret

Generate a UUID for IndexNow API key:

```bash
# Option 1: Use this sample UUID
supabase secrets set INDEXNOW_KEY=550e8400-e29b-41d4-a716-446655440000

# Option 2: Generate your own UUID
# Visit https://www.uuidgenerator.net/ and use that value
supabase secrets set INDEXNOW_KEY=<your-uuid-here>
```

**Expected Output**:
```
Setting secret INDEXNOW_KEY...
✓ Secret set successfully
```

## Function Details

### seo-reindex-cron

**Purpose**: Automatically reindex all EmviApp content for search engines

**Triggers**:
- Weekly cron schedule
- Manual API call for testing

**What it does**:
1. Fetches all dynamic content (jobs, salons, artists, blog posts)
2. Submits URLs to IndexNow API
3. Logs results for monitoring

**Test manually**:
```bash
curl -X POST https://wwhqbjrhbajpabfdwnip.functions.supabase.co/seo-reindex-cron \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### seo-health-weekly

**Purpose**: Monitor SEO health metrics across the platform

**Triggers**:
- Weekly cron schedule
- Manual API call for testing

**What it does**:
1. Checks sitemap generation status
2. Validates meta tags on key pages
3. Monitors crawl errors
4. Logs health metrics

**Test manually**:
```bash
curl -X POST https://wwhqbjrhbajpabfdwnip.functions.supabase.co/seo-health-weekly \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Verification

### Check Function Logs

Visit Edge Function logs in Supabase Dashboard:
- [seo-reindex-cron logs](https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/functions/seo-reindex-cron/logs)
- [seo-health-weekly logs](https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/functions/seo-health-weekly/logs)

### Expected Log Entries (within 15 minutes of deployment)

**seo-reindex-cron**:
```
[INFO] Starting weekly reindex
[INFO] Fetched 150 jobs
[INFO] Fetched 45 salons
[INFO] Fetched 200 artists
[INFO] Fetched 12 blog posts
[INFO] Submitting 407 URLs to IndexNow
[SUCCESS] Reindex complete
```

**seo-health-weekly**:
```
[INFO] Starting SEO health check
[INFO] Checking sitemaps: OK
[INFO] Validating meta tags: OK
[INFO] Checking crawl status: OK
[SUCCESS] Health check complete
```

## Cron Schedule

Both functions run weekly. To view/edit schedule:

1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Select function
4. View "Invocations" → "Cron Jobs"

## Troubleshooting

### Function Not Deploying
```bash
# Check CLI version
supabase --version

# Re-authenticate
supabase login

# Try deployment again
supabase functions deploy <function-name>
```

### Missing INDEXNOW_KEY Error
```bash
# Verify secret is set
supabase secrets list

# If not listed, set it
supabase secrets set INDEXNOW_KEY=<uuid>
```

### No Logs Appearing
- Wait 15-30 minutes for first cron execution
- Manually trigger function for immediate testing
- Check function status in dashboard

## Integration with Vercel

These functions work independently of Vercel deployment but support the overall automation:

1. **Vercel**: Serves static content and client-side app
2. **Edge Functions**: Handle dynamic sitemap generation and SEO tasks
3. **Automation**: Content changes → GitHub → Vercel deploy → Edge functions reindex

## Status

- ⚠️ **seo-reindex-cron**: Ready for deployment
- ⚠️ **seo-health-weekly**: Ready for deployment
- ⚠️ **INDEXNOW_KEY**: Needs to be set

## Next Steps

1. Deploy both functions using commands above
2. Set INDEXNOW_KEY secret
3. Wait 15 minutes for first logs
4. Verify logs show successful executions
5. Monitor weekly for ongoing health

---

**Last Updated**: 2025-10-28  
**Project**: wwhqbjrhbajpabfdwnip  
**Functions**: 2 (seo-reindex-cron, seo-health-weekly)
