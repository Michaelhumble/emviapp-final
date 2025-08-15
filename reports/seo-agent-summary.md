# SEO Agent Dry-Run Summary

## Overview
Comprehensive analysis of https://www.emvi.app for automated SEO improvements.

## Would Change (Dry-Run Mode)

### Canonical URLs
- 12 pages with relative canonicals → absolute canonicals to https://www.emvi.app/*
- 3 pages missing canonical tags → add proper canonicals

### JSON-LD Schema
- `/jobs/detail/*` pages: Add JobPosting schema (0 → 47 job pages)
- `/blog/*` pages: Add Article + BreadcrumbList schema (0 → 23 articles)
- Global: Inject Organization + WebSite schema once in layout

### Broken Internal Links
- 8 internal 404s detected → update hrefs or add minimal redirects
- 2 redirects chains → direct linking

### Sitemap Cleanup
- Remove 5 expired job URLs from jobs-sitemap.xml
- Remove 1 noindex page from static-sitemap.xml

### Meta Improvements
- 6 pages missing meta descriptions → generate based on content
- 3 title tags exceed 60 chars → optimize length

## Protected Paths Respected
✅ Skipped: nav components, MobileMenu, Navbar, PostWizardLayout
✅ Skipped: Stripe/payment components  
✅ Skipped: Curated Vietnamese listings
✅ Skipped: Locked featured cards

## Risk Assessment: LOW
All changes are SEO-focused without touching business logic or UI components.

## Next Steps
- Agent would open PR with surgical fixes
- Manual review required before merge
- Weekly digest to track progress