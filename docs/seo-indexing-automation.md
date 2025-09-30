# SEO Indexing Automation - Run Book

## Overview
EmviApp automatically indexes 40 cities daily to Google via the Indexing API, cycling through 50 US cities to ensure all get indexed regularly.

## System Components

### 1. Database Tables
- **`seo_cities`**: 50 pre-loaded US cities with tracking fields
- **`seo_indexing_logs`**: Execution history and results

### 2. Edge Functions
- **`daily-seo-indexing`**: Processes 40 cities, generates 200+ URLs, submits to Google
- **`city-sitemap`**: Dynamic XML sitemap for all active cities

### 3. Scheduled Job
- **Name**: `daily-seo-city-indexing`
- **Schedule**: Daily at 02:00 UTC
- **Enabled by**: Migration `20250929221613` (pg_cron + pg_net)

## Prerequisites Checklist

### ✅ Completed (in code/Supabase)
- [x] Database tables created
- [x] Edge functions deployed
- [x] Cron job scheduled (02:00 UTC)
- [x] City sitemap added to robots.txt

### ⚠️ Requires Your Action (GCP Console)

#### 1. Enable Web Search Indexing API
**Path**: GCP Console → APIs & Services → Library → "Web Search Indexing API" → Enable

**Project**: Choose the project containing your service account (likely `emvi-seo-agents` or `emvi-453520`)

#### 2. Verify Service Account Permissions
**Path**: Google Search Console → Settings → Users and permissions

**Required**: The service account email must have **Owner** role for property `emvi.app`

**Service accounts to check**:
- `emvi-seo-agent@emvi-seo-agents.iam.gserviceaccount.com`
- `emvi-seo-agent@emvi-453520.iam.gserviceaccount.com`

(Confirm which one is active and matches your Supabase secrets)

#### 3. Add Secrets to Supabase
**Path**: Supabase Dashboard → Edge Functions → Secrets

**Required secrets**:
```
GOOGLE_CLIENT_EMAIL = <service-account>@<project>.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
```

**⚠️ Important**: Preserve newlines in `GOOGLE_PRIVATE_KEY` using `\n` or paste as-is if Supabase handles formatting.

**Note**: If you have `GSC_CLIENT_EMAIL` / `GSC_PRIVATE_KEY` secrets, they are legacy. The code reads `GOOGLE_*` secrets. You can remove `GSC_*` after confirming `GOOGLE_*` work.

---

## Manual Operations

### Trigger Indexing Manually
```bash
curl -i -X POST 'https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/daily-seo-indexing' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM' \
  -H 'Content-Type: application/json'
```

### View City Sitemap
```
https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/city-sitemap
```

Or via domain:
```
https://www.emvi.app/city-sitemap.xml
```

---

## Verification SQL

### Check Scheduled Jobs
```sql
-- View all cron jobs
SELECT * FROM cron.job;

-- View recent job runs
SELECT * 
FROM cron.job_run_details 
ORDER BY end_time DESC 
LIMIT 20;
```

### Check Indexing Logs
```sql
-- Recent indexing runs
SELECT 
  run_date,
  status,
  cities_processed,
  cities_succeeded,
  cities_failed,
  created_at,
  completed_at
FROM public.seo_indexing_logs 
ORDER BY created_at DESC 
LIMIT 50;
```

### Check City Status
```sql
-- See which cities have been indexed
SELECT 
  city_name,
  state,
  slug,
  last_indexed_at,
  indexing_status,
  priority
FROM public.seo_cities
ORDER BY last_indexed_at DESC NULLS LAST;
```

### Check Unindexed Cities
```sql
-- Cities never indexed
SELECT 
  city_name,
  state,
  slug,
  priority
FROM public.seo_cities
WHERE last_indexed_at IS NULL
ORDER BY priority DESC;
```

---

## Troubleshooting

### Job Not Running
1. Verify extensions are enabled:
```sql
SELECT * FROM pg_extension WHERE extname IN ('pg_cron', 'pg_net');
```

2. Check job schedule:
```sql
SELECT jobname, schedule, active, command 
FROM cron.job 
WHERE jobname = 'daily-seo-city-indexing';
```

3. Check for errors:
```sql
SELECT * 
FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'daily-seo-city-indexing')
ORDER BY end_time DESC 
LIMIT 10;
```

### Function Errors
**View logs**: Supabase Dashboard → Edge Functions → daily-seo-indexing → Logs

**Common issues**:
- Missing secrets: Add `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`
- API not enabled: Enable Web Search Indexing API in GCP
- Permission denied: Ensure service account is Owner in Search Console
- Quota exceeded: Google Indexing API has rate limits (check GCP quotas)

### No URLs Being Indexed
Check if secrets are set:
```typescript
// The function checks for credentials at lines 23-24:
const googleClientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL');
const googlePrivateKey = Deno.env.get('GOOGLE_PRIVATE_KEY');
```

If missing, URLs are logged but not submitted to Google (see line 71: "Would index: {url}").

---

## URLs Generated Per City
Each city generates 5 URLs:
1. `/jobs/{city-slug}` - Job listings
2. `/nail-tech/{city-slug}` - Nail technician jobs
3. `/hair-stylist/{city-slug}` - Hair stylist jobs  
4. `/barber/{city-slug}` - Barber jobs
5. `/salons/{city-slug}` - Salon directory

**Example** (Houston, TX - slug: `houston-tx`):
- https://www.emvi.app/jobs/houston-tx
- https://www.emvi.app/nail-tech/houston-tx
- https://www.emvi.app/hair-stylist/houston-tx
- https://www.emvi.app/barber/houston-tx
- https://www.emvi.app/salons/houston-tx

**Daily volume**: 40 cities × 5 URLs = 200 URLs per day

---

## Monitoring

### Key Metrics
- **Cities indexed per day**: Should be ~40
- **Success rate**: Should be >95%
- **Last run**: Check `seo_indexing_logs.run_date`
- **Cron job status**: Verify in `cron.job` that job is active

### Alerts to Set Up (Optional)
- Alert if no run in 36 hours
- Alert if success rate <80%
- Alert if cron job becomes inactive

---

## Architecture Notes

### Why 40 Cities Per Day?
- 50 cities total ÷ 40 per day = ~1.25 day cycle
- Ensures all cities get indexed at least once every 2 days
- Stays well under Google Indexing API quotas (200/day default)

### Smart Rotation
The `get_cities_for_daily_indexing()` RPC function prioritizes:
1. Never-indexed cities first
2. Oldest indexed cities next
3. High-priority cities

### Idempotency
- Job is scheduled with `cron.schedule()` which doesn't duplicate
- City sitemap is generated dynamically (no stale data)
- Re-running migrations is safe (uses `IF NOT EXISTS`)

---

## Status Summary

### ✅ Automated & Ready
- Cron scheduler configured (02:00 UTC daily)
- Edge functions deployed
- Database schema ready
- Robots.txt includes city sitemap

### ⚠️ Needs Manual Setup
1. **GCP**: Enable Web Search Indexing API
2. **Search Console**: Verify service account has Owner role
3. **Supabase Secrets**: Add `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`
4. **First Run**: Trigger manually to verify (see curl above)

---

## Support Links
- [Supabase Edge Functions](https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/functions)
- [Supabase Cron Jobs](https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/database/cron-jobs)
- [Google Indexing API Docs](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Google Search Console](https://search.google.com/search-console)
