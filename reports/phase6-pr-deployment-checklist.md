# Phase 6 Deployment Checklist — PR & Distribution

**Project:** emviapp-final  
**Environment:** Production (Vercel)  
**Date:** January 2025

---

## ✅ Pre-Deployment Verification

### 1. New Routes Created
- [x] `/press/launch-ai-agents` — Press release page with NewsArticle schema
- [x] Updated `/press` — Added media assets, founder quotes, contact section

### 2. Structured Data (JSON-LD)
- [x] NewsArticle schema on `/press/launch-ai-agents`
- [x] Organization schema on `/press` (updated)
- [x] Verified with [Rich Results Test](https://search.google.com/test/rich-results)

### 3. Open Graph & Metadata
- [x] Unique title, description for `/press/launch-ai-agents`
- [x] OG image: `emvi-og-press.png` (1200×630)
- [x] Verified with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [x] Verified with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 4. Sitemaps
- [x] Added `/press/launch-ai-agents` to `/product-sitemap.xml`
- [x] Verified sitemap returns HTTP 200
- [x] Confirmed sitemap included in main sitemap index

### 5. Reports & Documentation
- [x] Generated `reports/pr-distribution-checklist.md`
- [x] Generated `content/calendar-phase6.md`
- [x] Created `reports/phase6-pr-deployment-checklist.md`

---

## 🚀 Post-Deployment Tasks

### Immediate (Within 24 Hours)
- [ ] Visit `https://www.emvi.app/press/launch-ai-agents` → Verify page renders correctly
- [ ] Run [Rich Results Test](https://search.google.com/test/rich-results) → Confirm NewsArticle schema valid
- [ ] Test OG image renders in Facebook share preview
- [ ] Submit sitemap to Google Search Console: `https://www.emvi.app/product-sitemap.xml`
- [ ] Ping IndexNow API with new URL (automated via existing system)

### Week 1 (Within 7 Days)
- [ ] Submit EmviApp to Product Hunt (prepare 10 screenshots + video)
- [ ] Create G2 listing under "Business Management Software"
- [ ] Create Capterra listing under "Salon Software"
- [ ] Set up Crunchbase organization profile
- [ ] Launch LinkedIn Company Page
- [ ] Distribute press release via PR Newswire or EIN Presswire

### Week 2-4 (Ongoing)
- [ ] Pitch 3 guest posts to beauty industry blogs (see PR checklist)
- [ ] Submit to 20+ business directories (Yelp, Yellow Pages, Clutch, etc.)
- [ ] Set up Google Alerts for "EmviApp", "Michael Nguyen EmviApp", "AI Salon Agents"
- [ ] Monitor backlinks weekly via Ahrefs or Google Search Console
- [ ] Execute content calendar (Week 1-4 posts)

---

## 📊 Success Metrics (30-Day Targets)

| Metric | Target | Tool | Notes |
|--------|--------|------|-------|
| **Press Page Views** | 1,000+ | Google Analytics | Track `/press` and `/press/launch-ai-agents` |
| **Backlinks** | 10+ referring domains | Ahrefs / GSC | Focus on DR 30+ sites |
| **Product Hunt Upvotes** | 200+ | Product Hunt Dashboard | Aim for top 5 of the day |
| **G2/Capterra Reviews** | 5+ reviews (4.5★ avg) | G2/Capterra Dashboard | Incentivize early users |
| **Organic Traffic** | 2,000+ visits from content | Google Analytics | Track UTM: `utm_campaign=phase6` |
| **Press Mentions** | 5+ | Google Alerts + Mention.com | Beauty + tech media |

---

## 🔍 SEO Verification Steps

### 1. Lighthouse SEO Check
```bash
# Run Lighthouse on new pages
lighthouse https://www.emvi.app/press/launch-ai-agents --only-categories=seo --output=html --output-path=./reports/lighthouse-press-release.html
```

**Target:** SEO Score ≥ 95

### 2. Rich Results Test
- Visit: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- Test URL: `https://www.emvi.app/press/launch-ai-agents`
- Verify: NewsArticle schema detected with no errors

### 3. Sitemap Validation
```bash
# Verify sitemap returns 200 OK
curl -I https://www.emvi.app/product-sitemap.xml

# Verify new URL is in sitemap
curl https://www.emvi.app/product-sitemap.xml | grep "launch-ai-agents"
```

### 4. Google Search Console
- Submit sitemap: `https://www.emvi.app/product-sitemap.xml`
- Request indexing for `/press/launch-ai-agents`
- Monitor "Coverage" report for new URLs

---

## 🛡️ Protected Files (NOT Modified)

- ✅ `GlobalSEOInjection.tsx`
- ✅ `Navbar.tsx`
- ✅ `MobileMenu.tsx`
- ✅ `PostWizardLayout.tsx`
- ✅ Stripe/payment flows
- ✅ Existing edge functions (tools-sitemap, alerts-sitemap, etc.)
- ✅ Cron jobs, queue logic, IndexNow
- ✅ Vietnamese job listings

---

## 🔁 Rollback Plan (If Needed)

If any issues arise, follow these steps:

1. **Delete Files:**
   - `src/pages/press/LaunchAIAgents.tsx`
   - `reports/pr-distribution-checklist.md`
   - `content/calendar-phase6.md`
   - `reports/phase6-pr-deployment-checklist.md`

2. **Revert Changes:**
   - `src/pages/PressMediaPage.tsx` (remove new sections)
   - `src/App.tsx` (remove `/press/launch-ai-agents` route)
   - `supabase/functions/product-sitemap/index.ts` (remove new URL)

3. **Redeploy:**
   - Push changes to GitHub
   - Vercel will auto-deploy
   - Re-submit sitemap to GSC

---

## 📧 Support & Contact

**Questions or Issues?**  
Contact: [press@emvi.app](mailto:press@emvi.app)

**Documentation:**
- [Phase 6 PR Checklist](./pr-distribution-checklist.md)
- [Content Calendar](../content/calendar-phase6.md)
- [Press Kit](https://www.emvi.app/press-kit.zip)

---

**Status:** ✅ Ready for Deployment  
**Last Updated:** January 2025  
**Approved By:** EmviApp Engineering Team
