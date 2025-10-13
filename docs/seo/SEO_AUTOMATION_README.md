# SEO Automation System - Complete Guide

## Overview

EmviApp's SEO automation ensures search engines discover and index new/updated content automatically through a queue-based system that runs every 2 hours.

## Architecture

```
┌─────────────────┐
│  Content Change │ (Job/Salon/Artist/Blog)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Auto-Enqueue   │ (src/utils/seo/queue.ts)
│  with Hash      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Queue Table    │ (seo_reindex_queue)
│  Status: queued │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Cron (2h)      │ (seo-reindex-cron)
│  Batch 200 URLs │
└────────┬────────┘
         │
         ├─────────────┬─────────────┐
         ▼             ▼             ▼
    ┌────────┐   ┌──────────┐  ┌──────────┐
    │ Google │   │ IndexNow │  │ Sitemaps │
    │  API   │   │   (Bing) │  │   Ping   │
    └────────┘   └──────────┘  └──────────┘
```

## Components

### 1. Queue Management (`src/utils/seo/queue.ts`)

**Functions:**
- `enqueueForReindex({ url, type, hash })` - Add URL to queue
- `batchEnqueue(items[])` - Bulk enqueue
- `getQueueStats()` - Admin dashboard stats

**Auto-Skip Patterns:**
- `/auth/`, `/dashboard/`, `/checkout/`, `/admin/`
- `/api/`, `/settings/`, `/account/`
- `/login`, `/signup`, `/reset-password`

### 2. Content Hashers (`src/utils/seo/hash.ts`)

**Functions:**
- `hashJob(job)` - Job content fingerprint
- `hashSalon(salon)` - Salon content fingerprint
- `hashArtist(artist)` - Artist profile fingerprint
- `hashBlog(post)` - Blog post fingerprint
- `hashPage(content)` - Generic page hash

**Purpose:** Detect content changes; only re-index if hash differs

### 3. Cron Worker (`supabase/functions/seo-reindex-cron`)

**Schedule:** Every 2 hours  
**Batch Size:** 200 URLs per run  
**Max Retries:** 5 (with exponential backoff)

**Process:**
1. Fetch 200 oldest queued URLs (status=queued, tries<5)
2. For jobs: Submit to Google Indexing API
3. For all: Submit batch to IndexNow
4. Ping all 7 sitemaps
5. Mark successes as `sent`, failures increment `tries`

### 4. Database Schema

**Table:** `seo_reindex_queue`

| Column     | Type      | Description                           |
|------------|-----------|---------------------------------------|
| url        | text (PK) | Full URL to re-index                  |
| type       | text      | job, salon, artist, blog, page        |
| lastmod    | timestamp | Last content modification             |
| hash       | text      | Content fingerprint (djb2 hash)       |
| status     | text      | queued, sent, error                   |
| tries      | int       | Retry count (max 5)                   |
| created_at | timestamp | When first enqueued                   |
| updated_at | timestamp | Auto-updated on change                |

**Indexes:**
- `idx_seo_reindex_queue_status_lastmod` (for queue processing)
- `idx_seo_reindex_queue_type` (for filtering by type)

### 5. Admin Dashboard (`/admin/seo-health`)

**Features:**
- Queue stats: queued/sent/error counts
- Last cron run details
- Manual trigger: "Rebuild Now" button
- Sitemap status links
- Content type breakdown

**Access:** Admin-only route

### 6. Popular Links (`src/components/layout/PopularLinks.tsx`)

**Purpose:** Boost crawl depth with internal links  
**Location:** Global footer  
**Links:** 12 high-value city/role combinations  
**Rotation:** Weekly round-robin (planned)

**Cities Covered:**
- Houston, Los Angeles, New York, Miami
- Dallas, Phoenix, Chicago, Atlanta, Las Vegas

**Roles Covered:**
- Nail Tech, Hair Stylist, Barber, Makeup Artist
- Esthetician, Lash Tech, Salons

## Integration Points

### Automatic Enqueuing

Add to any create/update functions:

```typescript
import { enqueueForReindex } from '@/utils/seo/queue';
import { hashJob } from '@/utils/seo/hash';

// After successful job creation
const jobUrl = `https://www.emvi.app/jobs/${job.id}`;
const hash = hashJob(job);
enqueueForReindex({ url: jobUrl, type: 'job', hash }).catch(console.error);
```

**Current Integrations:**
- ✅ Jobs: `src/components/posting/job/EnhancedJobForm.tsx`
- ⏳ Salons: (Add to salon creation/update)
- ⏳ Artists: (Add to profile update)
- ⏳ Blog: (Add to post publish/update)

## Search Engine Protocols

### Google Indexing API (Jobs Only)

**Endpoint:** `supabase/functions/google-indexing`  
**Quota:** 200 requests/day  
**Use Case:** Job postings only (per Google policy)  
**Action:** `URL_UPDATED` or `URL_DELETED`

**Required Secrets:**
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

### IndexNow (All Content)

**Client:** `src/utils/seo/indexNow.ts`  
**Supported Engines:** Bing, Yandex, Seznam, Naver  
**Batch Size:** Up to 10,000 URLs per submission  

**Required Secrets:**
- `INDEXNOW_KEY`

**Setup:** See [INDEXNOW_SETUP.md](./INDEXNOW_SETUP.md)

### Sitemap Ping (All Content)

**Target:** Google's ping endpoint  
**Sitemaps Pinged (7):**
1. sitemap.xml (index)
2. sitemap-static.xml
3. jobs-sitemap.xml
4. salons-sitemap.xml
5. artists-sitemap.xml
6. city-sitemap.xml
7. blog-sitemap.xml

## Monitoring & Debugging

### Check Queue Status

```sql
-- Queue overview
SELECT status, type, COUNT(*) 
FROM seo_reindex_queue 
GROUP BY status, type;

-- Recent failures
SELECT url, tries, status 
FROM seo_reindex_queue 
WHERE status = 'error' 
ORDER BY updated_at DESC 
LIMIT 20;
```

### Check Cron Logs

Dashboard: https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/functions/seo-reindex-cron/logs

### Check Indexing Results

```sql
-- Recent runs
SELECT * 
FROM seo_indexing_logs 
ORDER BY completed_at DESC 
LIMIT 10;
```

## Performance Considerations

### Queue Growth

**Expected:** ~100-500 URLs/day for active content changes  
**Capacity:** Cron processes 2,400 URLs/day (200 × 12 runs)  
**Overflow:** Unlikely; oldest processed first

### API Quotas

**Google Indexing API:** 200/day limit  
- Used only for jobs (~50-100/day typical)  
- Safe margin maintained

**IndexNow:** No published limits  
- Batches of 200 URLs per cron run  
- ~2,400 URLs/day total

### Database Impact

**seo_reindex_queue table:**
- Small rows (~200 bytes each)
- Indexed for fast querying
- Auto-cleanup: sent items >30 days can be archived

## Troubleshooting

### Queue not processing

1. Check cron function is deployed
2. Verify cron schedule (every 2 hours)
3. Check edge function logs
4. Verify secrets are configured

### Google API failures

- Check `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`
- Verify service account has Indexing API enabled
- Check daily quota (200 requests)

### IndexNow failures

- Verify `INDEXNOW_KEY` matches `public/indexnow.txt`
- Test key file accessibility: `curl https://www.emvi.app/indexnow.txt`
- Check API response codes in logs

### Content not enqueuing

- Verify hash calculation in `src/utils/seo/hash.ts`
- Check enqueue calls are not throwing errors
- Verify content URL is not in skip patterns

## Future Enhancements

- [ ] Auto-rotate popular links weekly
- [ ] Add salon/artist enqueue triggers
- [ ] Add blog post enqueue triggers
- [ ] Implement retry backoff timing
- [ ] Add Slack notifications for failures
- [ ] Dashboard charts for indexing trends
- [ ] CSV export of queue history

## Maintenance

### Weekly
- Check admin dashboard for error trends
- Review failed URLs in queue

### Monthly
- Archive old `sent` items from queue
- Review indexing logs for patterns
- Check Google Search Console coverage

### Quarterly
- Review popular links for relevance
- Update city/role combinations
- Optimize hash functions if needed

---

**Last Updated**: 2025-01-13  
**Status**: Production Ready  
**Owner**: SEO Team
