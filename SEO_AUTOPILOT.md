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

---

**Status**: ✅ Fully operational with DRY_RUN=false in production

**Next Review**: Check weekly digest reports every Monday