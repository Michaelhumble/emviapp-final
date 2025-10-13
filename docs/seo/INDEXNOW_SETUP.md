# IndexNow Setup Guide

## What is IndexNow?

IndexNow is a fast-track protocol supported by Bing, Yandex, and other search engines to notify them immediately when content changes. Unlike Google's traditional crawling, IndexNow provides near-instant indexing.

## Setup Steps

### 1. Generate an IndexNow Key

Generate a random key (32-64 characters recommended):

```bash
# Use openssl to generate a secure random key
openssl rand -hex 32
```

Example output: `a1b2c3d4e5f6789...`

### 2. Add Key to Supabase Secrets

Add the `INDEXNOW_KEY` secret in your Supabase project:

1. Go to: https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/settings/functions
2. Click "Add new secret"
3. Name: `INDEXNOW_KEY`
4. Value: Your generated key (e.g., `a1b2c3d4e5f6789...`)
5. Save

### 3. Update the Key File

Update `public/indexnow.txt` with your key:

```
a1b2c3d4e5f6789...
```

This file must be accessible at: `https://www.emvi.app/indexnow.txt`

### 4. Verify Configuration

The `src/utils/seo/indexNow.ts` client should point to your key location:

```typescript
keyLocation: 'https://www.emvi.app/indexnow.txt'
```

### 5. Test

After deploying, test IndexNow submission:

```bash
# Should return 200 OK
curl -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "host": "www.emvi.app",
    "key": "YOUR_KEY_HERE",
    "keyLocation": "https://www.emvi.app/indexnow.txt",
    "urlList": ["https://www.emvi.app/"]
  }'
```

## How It Works

1. Content changes (job/salon/artist created/updated)
2. Auto-enqueued in `seo_reindex_queue` table
3. Cron runs every 2 hours
4. Batch submits URLs to IndexNow API
5. Bing/Yandex index within hours (vs days for traditional crawl)

## Supported Search Engines

- ✅ **Bing** (Microsoft)
- ✅ **Yandex** (Russia)
- ✅ **Seznam.cz** (Czech Republic)
- ✅ **Naver** (Korea)
- ⏳ **Google** (Not supported; use Google Indexing API instead)

## Monitoring

Check IndexNow submissions in the admin dashboard:

https://www.emvi.app/admin/seo-health

## Troubleshooting

### "IndexNow key not found" error

- Verify `INDEXNOW_KEY` is set in Supabase secrets
- Check `public/indexnow.txt` contains the same key
- Ensure file is accessible at `/indexnow.txt`

### "Invalid key location" error

- Verify URL in `src/utils/seo/indexNow.ts` matches deployed location
- Test file accessibility: `curl https://www.emvi.app/indexnow.txt`

### No indexing happening

- Check cron logs: https://supabase.com/dashboard/project/wwhqbjrhbajpabfdwnip/functions/seo-reindex-cron/logs
- Verify queue has items: Check `seo_reindex_queue` table
- Confirm cron is scheduled (every 2 hours)

## Next Steps

Once IndexNow is configured:

1. URLs automatically enqueue on content changes
2. Cron processes queue every 2 hours
3. Monitor in admin dashboard
4. Check Bing Webmaster Tools for indexing results

---

**Last Updated**: 2025-01-13  
**Status**: Ready for production
