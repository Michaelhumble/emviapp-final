# 🤖 SEO Autopilot System

EmviApp's comprehensive SEO automation system with scheduled workflows, safe auto-fixes, and detailed reporting.

## 📅 Automated Schedule

| Workflow | Schedule | Purpose |
|----------|----------|---------|
| **Daily Auto-Fix** | 17:00 UTC daily | Fix broken links, canonicals, meta tags |
| **Weekly Digest** | Mon 09:00 UTC | Collect GSC trends, generate reports |
| **CWV Monitor** | Mon 08:30 UTC | Core Web Vitals collection & alerts |
| **Keyword Tracker** | 06:00 UTC daily | Track rankings, competitor analysis |
| **Priority Indexing** | Sun 06:00 UTC | Submit URLs to Google Search Console |
| **Housekeeping** | 23:50 UTC daily | Clean cache files, validate data |

## 🎯 Cron Schedule Summary

```bash
# Daily Auto-Fix: Every day at 17:00 UTC
0 17 * * *

# Weekly Digest: Every Monday at 09:00 UTC  
0 9 * * 1

# CWV Monitor: Every Monday at 08:30 UTC
30 8 * * 1

# Keyword Tracker: Every day at 06:00 UTC
0 6 * * *

# Priority Indexing: Every Sunday at 06:00 UTC
0 6 * * 0

# Housekeeping: Every day at 23:50 UTC
50 23 * * *
```

## 🔧 Required Secrets

### Essential (workflows will skip if missing):
- `OPENAI_API_KEY` - For AI-powered SEO recommendations
- `GSC_CLIENT_EMAIL` - Google Search Console service account
- `GSC_PRIVATE_KEY` - GSC private key (must contain `\n` sequences)

### Optional:
- `SLACK_WEBHOOK_URL` - For performance alerts
- `PAGESPEED_API_KEY` - For real CWV data (uses mock data if missing)

## 📊 Where to Find Reports

### GitHub Actions Artifacts
- Go to **Actions** → Select workflow → Download artifacts
- All reports saved for 30-90 days

### Key Report Files
- `reports/weekly-YYYY-MM-DD.md` - Weekly SEO digest
- `.seo-cache/cwv-YYYY-MM-DD.json` - Core Web Vitals data  
- `.seo-cache/keywords-YYYY-MM-DD.json` - Keyword rankings
- `.seo-cache/gsc-indexing-YYYY-MM-DD.json` - Priority indexing results
- `reports/housekeeping-report.md` - Maintenance summary

### Automated Issues
- Weekly SEO reports auto-created as GitHub issues
- Critical keyword drops generate immediate alerts

## ⚙️ Manual Controls

### Run Individual Workflows
- **Actions** → Select workflow → **Run workflow**
- All workflows support manual dispatch with options

### Temporarily Pause a Job
1. Go to `.github/workflows/[workflow-name].yml`
2. Comment out the `schedule` section
3. Commit change to pause automation

### DRY_RUN Mode
- Set `dry_run: true` in manual workflow dispatch
- Generates reports without making changes

## 🛡️ Safety Features

- **Environment validation** - Skips gracefully if secrets missing
- **Safe auto-fixes only** - No business logic changes
- **Protected paths** - Won't touch payment/auth code
- **Rate limiting** - API calls properly spaced
- **Artifact retention** - All data preserved for analysis

## 📈 Success Metrics

The system tracks:
- **Broken links fixed** per day
- **Internal links added** automatically  
- **Core Web Vitals** trends
- **Keyword position** changes
- **Cache maintenance** efficiency

## 🚨 Alert Conditions

Automated alerts for:
- **5+ performance alerts** (CWV threshold exceeded)
- **Keywords dropping 5+ positions** (competitor analysis)
- **Missing critical data files** (housekeeping issues)
- **High disk usage** (>200MB cache)
- **GSC indexing quota exceeded** (priority indexing failures)

## 📤 Priority Indexing Details

### Schedule & Operation
- **Frequency**: Every Sunday at 06:00 UTC
- **Batch Processing**: Handles 100+ URLs automatically with rate limiting
- **Retry Logic**: 2 attempts with 10-second delay
- **Timeout**: 15-minute maximum execution time

### GSC API Requirements
```bash
# Required secrets for indexing functionality
GSC_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GSC_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

### Expected Output
- **Success Log**: `✅ DONE | submitted: 25 URLs | retries: 0`
- **Skip Log**: `⚠️ SKIPPED | missing: GSC credentials`
- **Artifact**: `.seo-cache/gsc-indexing-YYYY-MM-DD.json`

### Troubleshooting
| Issue | Solution |
|-------|----------|
| **Quota Exceeded** | GSC allows 200 requests/day - reduce URL list |
| **Authentication Failed** | Verify GSC service account has indexing API enabled |
| **Timeout** | Large URL lists are batched automatically |
| **No URLs Submitted** | Check `data/priority-urls.json` file exists and is valid JSON |

---

**Status**: ✅ Fully operational with DRY_RUN=false in production

**Next Review**: Check weekly digest reports every Monday