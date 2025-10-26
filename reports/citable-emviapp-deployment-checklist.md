# Citable EmviApp Pack - Deployment Checklist
**Phase 5: Press + Product + Authority Pages**

## 📦 Deployed Files & Features

### New Pages Created
- ✅ `/product` - Official EmviApp product page with features, FAQs, and schema
- ✅ `/press` - Press & media kit page with releases and brand assets
- ✅ `/privacy` - Privacy policy page
- ✅ `/terms` - Terms of service page

### Open Graph Images
- ✅ `public/og/emvi-og-product.png` (1200×630) - Product page OG image
- ✅ `public/og/emvi-og-press.png` (1200×630) - Press page OG image
- ✅ `public/og/emvi-og-about.png` (1200×630) - About page OG image

### New Sitemap
- ✅ `/product-sitemap.xml` - Lists product, press, about, privacy, terms pages
- ✅ Edge function: `supabase/functions/product-sitemap/`

### Schema Implemented
- ✅ **Product page**: SoftwareApplication schema with 5.0 rating
- ✅ **Press page**: Organization schema with social links
- ✅ **All pages**: Open Graph + Twitter Card metadata

## 🔍 Pre-Launch Verification Steps

### 1. Page Accessibility (HTTP 200)
- [ ] Visit `/product` - should load with hero, features, FAQs
- [ ] Visit `/press` - should load with press releases and brand assets
- [ ] Visit `/privacy` - should load privacy policy content
- [ ] Visit `/terms` - should load terms of service content
- [ ] All pages load in < 3 seconds

### 2. Open Graph Validation
- [ ] Test Product page: https://developers.facebook.com/tools/debug/
  - Enter: `https://www.emvi.app/product`
  - Verify OG image displays correctly
  - Check title and description
- [ ] Test Press page: https://developers.facebook.com/tools/debug/
  - Enter: `https://www.emvi.app/press`
  - Verify OG image displays correctly
- [ ] Test About page: https://developers.facebook.com/tools/debug/
  - Enter: `https://www.emvi.app/about`
  - Verify OG image displays correctly

### 3. Twitter Card Validation
- [ ] Test Product page: https://cards-dev.twitter.com/validator
  - Enter: `https://www.emvi.app/product`
  - Verify card displays with image
- [ ] Test Press page: https://cards-dev.twitter.com/validator
  - Enter: `https://www.emvi.app/press`
  - Verify card displays with image

### 4. Schema.org Validation
- [ ] Product page Rich Results Test: https://search.google.com/test/rich-results
  - Enter: `https://www.emvi.app/product`
  - Should detect: SoftwareApplication
  - No errors
- [ ] Press page Rich Results Test
  - Enter: `https://www.emvi.app/press`
  - Should detect: Organization
  - No errors

### 5. Sitemap Validation
- [ ] Visit `/product-sitemap.xml`
  - Returns HTTP 200
  - Valid XML format
  - Contains all 5 URLs (product, press, about, privacy, terms)
  - Correct priorities: product (0.9), press (0.8), about (0.8), privacy/terms (0.5)

### 6. SEO Fundamentals
- [ ] Product page:
  - Title < 60 characters
  - Meta description < 160 characters
  - Canonical URL present: `https://www.emvi.app/product`
  - H1 tag present and unique
- [ ] Press page:
  - Title < 60 characters
  - Meta description < 160 characters
  - Canonical URL present: `https://www.emvi.app/press`
  - H1 tag present and unique
- [ ] Privacy & Terms pages:
  - Have titles and canonical URLs
  - Meta robots tags appropriate

### 7. Performance Checks
- [ ] Run Lighthouse on Product page:
  - SEO score ≥ 95
  - Performance score ≥ 85
  - Accessibility score ≥ 90
  - Best Practices score ≥ 90
- [ ] Run Lighthouse on Press page:
  - SEO score ≥ 95
  - Performance score ≥ 85
  - CLS < 0.1 (no layout shift)

### 8. Design & UX
- [ ] Product page renders correctly on mobile
- [ ] Press page renders correctly on mobile
- [ ] All OG images display at correct resolution (1200×630)
- [ ] Background color is Pearl White (#FDFDFD)
- [ ] Footer includes "Inspired by Sunshine ☀️" credit
- [ ] CTAs are prominent and functional

### 9. Internal Linking
- [ ] Product page links to:
  - `/signup` (multiple CTAs)
  - `/jobs` (Browse Jobs button)
  - `/contact` (Contact Sales button)
- [ ] Press page links to:
  - `/contact` (Contact Press Team button)
- [ ] About page links to:
  - `/press` (in timeline or footer)
- [ ] Footer links to:
  - `/privacy`
  - `/terms`

### 10. Download Links
- [ ] `/press-kit.zip` download link works (or displays placeholder)
- [ ] Press page "Download All" button functional

## 📊 Google Search Console Setup

### Submit Sitemaps
- [ ] Add `/product-sitemap.xml` to GSC
  - Go to: Search Console > Sitemaps
  - Submit: `https://www.emvi.app/product-sitemap.xml`
  - Wait for "Success" status
- [ ] Verify other sitemaps still listed:
  - `/sitemap.xml` (master)
  - `/jobs-sitemap.xml`
  - `/blog-sitemap.xml`
  - `/state-hub-sitemap.xml`
  - `/tools-sitemap.xml`
  - `/alerts-sitemap.xml`

### URL Inspection
- [ ] Inspect `/product` in GSC
  - Request indexing
  - Verify "URL is on Google" within 48h
- [ ] Inspect `/press` in GSC
  - Request indexing
  - Verify "URL is on Google" within 48h

### Coverage Report
- [ ] Check Coverage report in GSC after 7 days
  - No "Excluded" errors for new pages
  - All 4 pages indexed successfully

## 🔐 Security & Privacy

- [ ] Privacy page accurately describes data collection
- [ ] Terms page includes proper legal disclaimers
- [ ] No sensitive data exposed in page source
- [ ] All external links open in new tab (`target="_blank"`)
- [ ] HTTPS enforced on all pages

## 🎨 Brand Assets

- [ ] Logo files ready for download (press kit)
- [ ] Screenshots available (press kit)
- [ ] Brand guidelines documented
- [ ] All assets high-resolution (300+ DPI)

## 🚀 Post-Deployment Tasks (Manual Distribution)

### Immediate (Day 1-2)
- [ ] Submit product-sitemap.xml to Google Search Console
- [ ] Test all pages in production
- [ ] Share `/product` on social media
- [ ] Share `/press` with relevant media contacts

### Within 1 Week
- [ ] Submit EmviApp to Product Hunt
  - Prepare: 3 screenshots, GIF/video demo, tagline
  - Link to: `/product`
  - Schedule launch day
- [ ] Submit to G2 / Capterra
  - Category: Beauty Industry Software
  - Link to: `/product`
- [ ] Create Crunchbase Organization entry
  - Company: EmviApp
  - Website: `https://www.emvi.app`
  - Description: from `/about` page

### Within 2 Weeks
- [ ] Outreach to beauty industry publications
  - Share `/press` page
  - Offer founder interview
  - Provide exclusive insights
- [ ] Guest blog post on beauty business blogs
  - Include backlink to `/product`
  - Focus on hiring challenges
- [ ] Local media outreach
  - Vietnamese-language media
  - Tech/startup publications
  - Orange County / California outlets

### Within 1 Month
- [ ] Monitor backlinks in Ahrefs or similar
- [ ] Check Google Search Console > Links report
- [ ] Reach out to sites linking to competitors
- [ ] Update `/press` with new coverage
- [ ] Track Product Hunt metrics

## 📈 Success Metrics

### Week 1 Targets
- [ ] All 4 pages indexed by Google
- [ ] 100+ page views on `/product`
- [ ] 50+ page views on `/press`
- [ ] 0 errors in GSC Coverage report
- [ ] Lighthouse SEO score ≥ 95 on all pages

### Month 1 Targets
- [ ] 500+ page views on `/product`
- [ ] 5+ backlinks from external sites
- [ ] Product Hunt launch (100+ upvotes goal)
- [ ] G2/Capterra profile live
- [ ] 3+ press mentions or blog features

### SEO KPIs
- [ ] Domain Authority increase (track monthly)
- [ ] "EmviApp product" ranking in top 10
- [ ] "EmviApp press" ranking in top 10
- [ ] Organic traffic increase of 20%+

## 🔄 Rollback Instructions

If critical issues arise, revert these changes:

### Files to Delete
```
src/pages/ProductPage.tsx
src/pages/PressMediaPage.tsx
src/pages/PrivacyPage.tsx
src/pages/TermsPage.tsx
public/og/emvi-og-product.png
public/og/emvi-og-press.png
public/og/emvi-og-about.png
supabase/functions/product-sitemap/
```

### Routes to Remove from App.tsx
```tsx
<Route path="/product" ... />
<Route path="/press" ... />
<Route path="/privacy" ... />
<Route path="/terms" ... />
<Route path="/product-sitemap.xml" ... />
```

### Imports to Remove from App.tsx
```tsx
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const PressMediaPage = lazy(() => import("@/pages/PressMediaPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
```

### Config Changes to Revert
Remove from `supabase/config.toml`:
```toml
[functions.product-sitemap]
verify_jwt = false
```

### No Database Impact
✅ This phase made no database changes - rollback is clean and safe.

## 📝 Notes & Recommendations

### Design Notes
- Pearl White (#FDFDFD) background creates premium feel
- Gradient CTAs use primary brand colors
- All OG images generated with consistent brand style
- Mobile-responsive layouts tested

### Content Strategy
- Product page focuses on benefits, not just features
- Press page provides journalist-friendly resources
- FAQs address common objections
- Social proof included (10,000+ users statistic)

### SEO Strategy
- SoftwareApplication schema boosts rich results
- Organization schema establishes brand entity
- Canonical URLs prevent duplicate content
- Priority scores guide crawler behavior

### Future Enhancements
- Add customer testimonials video to Product page
- Expand press releases as coverage grows
- Create downloadable brand guidelines PDF
- Add press photo gallery
- Build media coverage timeline

## ✅ Final Pre-Launch Checklist

Before marking deployment complete:
- [ ] All 10 verification steps passed
- [ ] GSC sitemaps submitted
- [ ] OG images validated on Facebook + Twitter
- [ ] Schema validated with Rich Results Test
- [ ] Lighthouse scores meet targets
- [ ] Mobile layouts tested on 3+ devices
- [ ] All CTAs functional
- [ ] Internal links verified
- [ ] Legal pages reviewed
- [ ] Team notified of launch

---

**Deployment Date**: [DATE]  
**Deployed By**: [NAME]  
**Version**: Phase 5 - Citable EmviApp Pack  
**Status**: ⏳ Awaiting Verification

**Next Phase**: Manual distribution and backlink building campaign
