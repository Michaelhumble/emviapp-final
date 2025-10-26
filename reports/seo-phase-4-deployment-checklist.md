# SEO Phase 4 Deployment Checklist
**Salary Calculator + Job Alerts System**

## 📦 Deployed Files & Features

### Frontend Pages
- ✅ `/salary-calculator` - Live calculator with income estimates
- ✅ `/job-alerts` - Email signup for job notifications  
- ✅ `/job-alerts/unsubscribe` - One-click unsubscribe functionality

### Database Tables
- ✅ `job_alerts` - Stores user alert subscriptions (email, role, city)
- ✅ `outbound_email_queue` - Queues emails for sending (not sent yet)

### Edge Functions
- ✅ `tools-sitemap` - Sitemap for calculator page
- ✅ `alerts-sitemap` - Sitemap for job alerts pages
- ✅ `notify-job-alerts` - Finds matching subscribers & enqueues emails

### UI Enhancements
- ✅ Micro-CTA on city/role pages linking to job alerts
- ✅ CTA on calculator page linking to job alerts
- ✅ Mobile-responsive designs
- ✅ Accessibility features (labels, focus rings, aria-live)

## 🔍 Verification Steps

### 1. Pages Load Correctly
- [ ] Visit `/salary-calculator` - should render form and results
- [ ] Visit `/job-alerts` - should show signup form
- [ ] Visit `/job-alerts?role=Nail%20Technician&city=New%20York%2C%20NY` - should pre-fill form
- [ ] Visit `/job-alerts/unsubscribe?email=test@example.com` - should show unsubscribe form

### 2. Calculator Functionality
- [ ] Enter base pay, hours, tips, commission
- [ ] Results update instantly (no page reload)
- [ ] Comparison line shows when role+city has baseline data
- [ ] CTA to job alerts appears and links correctly

### 3. Job Alerts Signup
- [ ] Fill form and submit
- [ ] Success screen appears with correct email/role/city
- [ ] Check database: row exists in `job_alerts` table
- [ ] Try duplicate submission - should succeed (allows multiple alerts per email)

### 4. Job Alerts Unsubscribe
- [ ] Click unsubscribe link (use real email from test)
- [ ] Confirm unsubscribe
- [ ] Check database: row removed from `job_alerts` table
- [ ] Visit unsubscribe page without email param - should show error

### 5. Notification System (Backend)
- [ ] Create a test job with specific role+city
- [ ] Call `notify-job-alerts` edge function with job details
- [ ] Check `outbound_email_queue` table - emails should be queued
- [ ] Verify HTML template renders correctly with unsubscribe link

### 6. Sitemaps
- [ ] Visit `/tools-sitemap.xml` - should return 200 OK, valid XML
- [ ] Visit `/alerts-sitemap.xml` - should return 200 OK, valid XML
- [ ] Both should include correct URLs and be well-formed

### 7. SEO & Schema
- [ ] Calculator page has `SoftwareApplication` schema
- [ ] Job alerts page has `BreadcrumbList` schema
- [ ] Both pages have canonical URLs
- [ ] Meta descriptions are < 160 characters
- [ ] Page titles are < 60 characters

### 8. Performance
- [ ] Lighthouse SEO score ≥ 95 on both pages
- [ ] CLS < 0.1 (no layout shift)
- [ ] Images have explicit width/height
- [ ] No console errors

### 9. Micro-CTA on City/Role Pages
- [ ] Visit `/jobs/nail-technician/new-york` (or any city/role combo)
- [ ] Scroll to bottom - should see job alerts micro-CTA
- [ ] CTA should link to `/job-alerts` with pre-filled params
- [ ] Should not cause layout shift

### 10. Database Security
- [ ] `job_alerts` has RLS enabled with correct policies
- [ ] `outbound_email_queue` only accessible by service role
- [ ] Anonymous users can insert alerts
- [ ] Users can delete their own alerts

## 📊 Test Data & Queries

### Create Test Alert
```sql
INSERT INTO job_alerts (email, role, city)
VALUES ('test@example.com', 'Nail Technician', 'New York, NY');
```

### Check Alerts
```sql
SELECT * FROM job_alerts WHERE email = 'test@example.com';
```

### Check Email Queue
```sql
SELECT * FROM outbound_email_queue WHERE to_email = 'test@example.com';
```

### Delete Test Data
```sql
DELETE FROM job_alerts WHERE email = 'test@example.com';
DELETE FROM outbound_email_queue WHERE to_email = 'test@example.com';
```

## 🔐 Security Checks

- ✅ Email validation (must contain @)
- ✅ RLS enabled on both tables
- ✅ Service role required for email queue
- ✅ No SQL injection vulnerabilities
- ✅ Unsubscribe requires exact email match
- ✅ No sensitive data exposed in URLs

## 🚨 Known Limitations (By Design)

1. **Email Sending**: Emails are queued but not sent yet. Requires email provider integration (future phase).
2. **Duplicate Alerts**: Users can create multiple alerts for same role+city. This is intentional for flexibility.
3. **No Authentication**: Alert signup is anonymous. Users identify by email only.
4. **Static Salary Data**: Calculator uses hardcoded baselines for ~25 cities. Others show no comparison.

## 🎯 Success Criteria

- [ ] All 3 pages render without errors
- [ ] Calculator performs instant calculations
- [ ] Job alerts stores data correctly
- [ ] Unsubscribe removes records
- [ ] Sitemaps return valid XML
- [ ] Lighthouse SEO ≥ 95
- [ ] No RLS violations
- [ ] Micro-CTA visible on city/role pages

## 🔄 Rollback Instructions

If issues arise, remove these files/features:

### Frontend Files to Delete
```
src/pages/SalaryCalculator.tsx
src/pages/JobAlerts.tsx
src/pages/JobAlertsUnsubscribe.tsx
src/data/salary-calculator-data.ts
```

### Edge Functions to Delete
```
supabase/functions/tools-sitemap/
supabase/functions/alerts-sitemap/
supabase/functions/notify-job-alerts/
```

### Routes to Remove from App.tsx
```tsx
<Route path="/salary-calculator" ... />
<Route path="/job-alerts" ... />
<Route path="/job-alerts/unsubscribe" ... />
<Route path="/tools-sitemap.xml" ... />
<Route path="/alerts-sitemap.xml" ... />
```

### Micro-CTA to Remove
Remove lines 202-217 from `src/pages/jobs/CityRoleJobLanding.tsx`

### Database Tables to Drop (Optional)
```sql
DROP TABLE IF EXISTS public.job_alerts;
DROP TABLE IF EXISTS public.outbound_email_queue;
```

### Config Changes
Remove from `supabase/config.toml`:
```toml
[functions.tools-sitemap]
[functions.alerts-sitemap]
[functions.notify-job-alerts]
```

## 🎉 Post-Deployment Tasks

### Immediate
- [ ] Submit `/tools-sitemap.xml` to Google Search Console
- [ ] Submit `/alerts-sitemap.xml` to Google Search Console
- [ ] Test calculator with 5 different role+city combinations
- [ ] Create 3 test job alerts and verify database entries

### Within 48 Hours
- [ ] Monitor `job_alerts` table growth
- [ ] Check for any console errors in production
- [ ] Verify sitemap indexing status in GSC
- [ ] Test unsubscribe flow with real email

### Within 1 Week
- [ ] Analyze calculator usage (page views, time on page)
- [ ] Check job alerts signup conversion rate
- [ ] Review email queue table for any issues
- [ ] Plan email provider integration (Phase 5)

## 📝 Notes

- **No Emails Sent**: System only queues emails. Integration with SendGrid/Mailgun/etc. needed for actual sending.
- **Static Baselines**: Salary comparison data is static. Consider adding admin panel to update values.
- **Anonymous Alerts**: No user accounts required. Unsubscribe uses email+role+city matching.
- **Micro-CTA Non-Invasive**: Only shows on city/role pages where it's contextually relevant.

---

**Deployment Completed**: [DATE]  
**Deployed By**: [NAME]  
**Version**: Phase 4 - Salary Calculator + Job Alerts  
**Status**: ✅ Ready for Testing
