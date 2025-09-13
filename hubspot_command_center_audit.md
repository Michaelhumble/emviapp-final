# HubSpot Command Center Audit — EmviApp

## Executive Summary

EmviApp has a **sophisticated HubSpot integration** that is 70% complete with solid foundations but critical gaps preventing it from being a true "command center." The infrastructure supports attribution tracking, contact management, and consent compliance, but **key user events are not firing** and there are **environment configuration mismatches** that prevent proper tracking.

**Status**: 🟡 **Partially Functional** - Frontend tracking works, server-side CRM integration exists, but signup events and role-based analytics are missing.

---

## 1. Environment & IDs

### Current Configuration
- **Portal ID in HTML**: `243714531` (hardcoded in `index.html:39`)
- **Environment Variable**: `HUBSPOT_PORTAL_ID` in `.env.example` (no `VITE_` prefix)
- **Code References**: `VITE_HUBSPOT_PORTAL_ID` in `HubSpotProvider.tsx:28`
- **Environment Gate**: Production-only loading (`import.meta.env.DEV` check)

### Issues Found
🔴 **CRITICAL**: Environment variable mismatch
- `.env.example` defines `HUBSPOT_PORTAL_ID=`
- Code expects `VITE_HUBSPOT_PORTAL_ID`
- This prevents dynamic portal ID configuration

### File Locations
- `index.html:39` - HubSpot script tag
- `src/components/analytics/HubSpotProvider.tsx:28` - Portal ID resolution
- `.env.example:36` - Environment variable definition

---

## 2. Frontend Tag & SPA Pageviews

### Implementation Status
✅ **HubSpot Script**: Loaded via async/defer in `index.html`
```html
<script type="text/javascript" id="hs-script-loader" async defer src="//js-na2.hs-scripts.com/243714531.js"></script>
```

✅ **SPA Route Tracking**: Implemented in `HubSpotProvider.tsx:96`
```typescript
hubspotTrackPageView(location.pathname + location.search);
```

### Security Configuration
✅ **CSP Headers**: HubSpot domains whitelisted in CSP
- `https://js.hs-analytics.net`
- `https://track.hubspot.com`

### Performance Considerations
⚠️ **Synchronous Loading**: Script blocks HTML parsing (not deferred enough)

---

## 3. Identity & Properties (Signup/Login)

### Current Implementation
✅ **User Identification**: Implemented in `HubSpotProvider.tsx:156`
```typescript
hubspotIdentify(user.email, {
  firstName, lastName, userId, role, city, plan,
  salon_name, specialty, years_experience, ...utmData
});
```

🔴 **MISSING**: Explicit signup event firing
- No `_hsq.push(['trackEvent', { id: 'signup_completed' }])` calls
- Signup tracking relies only on `identify()` calls
- No role-specific event differentiation

### Enhanced User Data Collection
✅ **Profile Integration**: Fetches from Supabase profiles table
✅ **Role Mapping**: Maps 4 roles (customer/artist/salon_owner/freelancer)
✅ **Attribution Merge**: Combines UTM data with user properties

---

## 4. Server-Side Events & CRM Sync

### Edge Functions Available
✅ **Contact Management**: `hubspot-crm-contact/index.ts`
- Contact upsert with full attribution properties
- Requires `HS_PRIVATE_APP_TOKEN` secret

✅ **Deal Management**: `hubspot-crm-deal/index.ts`
- Deal creation/updates with attribution tracking

✅ **Forms Integration**: `hubspot-forms/index.ts`
- Enhanced form submissions with hidden fields

### Company Creation (Salon Owners)
🔴 **MISSING**: No Company object creation for salon owners
- Current implementation only creates Contacts
- No Contact→Company associations
- Missing salon-specific CRM hierarchy

### Required Scopes (Private App)
- `crm.objects.contacts.read/write` ✅
- `crm.objects.deals.read/write` ✅
- `crm.objects.companies.read/write` ⚠️ (needed for salon owners)
- `forms` ✅

---

## 5. Data Model (Objects & Properties)

### Contact Properties (Documented in `docs/HUBSPOT_INTEGRATION.md`)
✅ **Core Attribution**:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `affiliate_id`, `landing_url`, `first_seen_at`

✅ **User Properties**:
- `user_role`, `signup_stage`, `mql_score`
- `salon_name`, `specialty`, `years_experience`

✅ **Tracking Properties**:
- `press_slug`, `city_slug`, `category_slug`

### Missing Properties
🟡 **Role-Specific Properties**:
- `signup_provider` (google/facebook/email)
- `signup_completed_at` (datetime)
- `last_login_at` (datetime)
- `listings_count` (for future job/salon posts)

---

## 6. Events to Track (Spec & Current Status)

| Event | Status | Implementation | Payload Fields |
|-------|--------|----------------|----------------|
| `page_view` | ✅ **Present** | `HubSpotProvider.tsx:96` | pathname, search |
| `signup_started` | 🔴 **Missing** | None | role_selected, provider |
| `signup_completed` | 🔴 **Missing** | None | role, signup_provider, utm_* |
| `clicked_social_button` | 🔴 **Missing** | None | provider (google/facebook) |
| `role_selected` | 🔴 **Missing** | None | role, previous_role |
| `form_submitted` | ✅ **Present** | `ContactForm.tsx:249` | form_type, attribution |

### Critical Missing Events
🔴 **Authentication Events**: No events fire on signup/login success
🔴 **Role Selection**: No tracking when users choose their role
🔴 **Social Auth**: No differentiation between email vs social signup

---

## 7. Consent, Privacy, & Compliance

### Implementation Status
✅ **Consent Banner**: `ConsentBanner.tsx` - GDPR compliant
✅ **Do Not Track**: Respects `navigator.doNotTrack === '1'`
✅ **Production Gate**: Only loads in production environment
✅ **Consent Storage**: localStorage + cookie persistence

### Consent Flow
```typescript
// Only loads HubSpot after explicit consent
if (consent !== 'accepted') return false;
```

### Privacy Policy Integration
✅ **Privacy Link**: Links to `/privacy` page
✅ **Data Minimization**: Only collects necessary attribution data

---

## 8. Attribution & UTM Capture

### Implementation Status
✅ **UTM Capture**: `public/scripts/utm.js`
- Captures all 5 UTM parameters on first visit
- 90-day localStorage persistence
- Automatic form injection

✅ **Attribution Propagation**: 
- `HubSpotProvider.tsx:135` - UTM data merged with identify calls
- `hubspot-crm-contact` - Server-side attribution in contact properties

### Attribution Storage
```javascript
// Storage key: 'emvi_attribution' 
// TTL: 90 days
// Fallback: referrer + landing page
```

### Missing Attribution
🟡 **Affiliate Tracking**: Basic structure exists but not fully utilized
🟡 **Cross-Device Attribution**: No user ID bridging

---

## 9. Dashboards to Build in HubSpot

### Recommended HubSpot Dashboard Widgets

#### Overview KPIs Dashboard
- **Total Contacts**: Count by `signup_stage`
- **Monthly Signups**: Contact creation date trend
- **Conversion Rate**: Website sessions → Contacts
- **Role Distribution**: Pie chart of `user_role` property

#### Attribution Dashboard  
- **UTM Performance**: Signups by `utm_source`/`utm_medium`
- **Channel Attribution**: Organic vs Paid vs Direct
- **Campaign ROI**: `utm_campaign` performance ranking
- **Geographic Distribution**: Signups by city/location

#### Role-Based Insights
- **Salon Owner Pipeline**: Contacts with `user_role = salon_owner`
- **Artist Growth**: Artist signups and activation rate
- **Customer Lifecycle**: Customer acquisition and engagement

#### User Journey Dashboard
- **Attribution Timeline**: First touch → Signup timeline
- **Drop-off Analysis**: Where users abandon signup flow
- **Retention Cohorts**: Weekly signup cohorts and retention

---

## 10. Gaps, Risks, and Action Plan

### Gap Analysis (Severity Rating)

#### 🔴 HIGH SEVERITY
1. **Environment Variable Mismatch** - Prevents configuration
2. **Missing Signup Events** - No conversion tracking  
3. **No Role-Based Events** - Can't segment user behavior
4. **Missing Company Creation** - Incomplete CRM hierarchy for salons

#### 🟡 MEDIUM SEVERITY  
5. **No Social Auth Differentiation** - Can't track acquisition channels
6. **Missing Behavioral Events** - Limited user journey tracking
7. **Incomplete Attribution** - No cross-device tracking

#### 🟢 LOW SEVERITY
8. **Script Loading Optimization** - Minor performance impact
9. **Enhanced Error Monitoring** - Debugging improvements

---

## Action Plan (Ordered Implementation Steps)

### Phase 1: Fix Critical Infrastructure (4 hours)
1. **Fix Environment Variable** (1 hour)
   - Update `.env.example`: `HUBSPOT_PORTAL_ID` → `VITE_HUBSPOT_PORTAL_ID` 
   - Test portal ID loading in dev/prod

2. **Add Signup Event Tracking** (2 hours)
   - Add `_hsq.push(['trackEvent', { id: 'signup_completed' }])` to auth success handlers
   - Include role and provider in event payload
   - Test in `src/pages/auth/Callback.tsx` and `src/pages/auth/ChooseRole.tsx`

3. **Add Role Selection Event** (1 hour)
   - Fire event when role is selected in `/auth/choose-role`
   - Include previous role if changing roles

### Phase 2: Enhanced Attribution & Events (6 hours)
4. **Social Auth Event Tracking** (2 hours)
   - Track social button clicks before OAuth redirect
   - Differentiate Google vs Facebook vs Email signup completion
   - Add provider to user identification

5. **Server-Side Contact Enhancement** (2 hours)
   - Add `signup_provider` field to contact upsert
   - Add `signup_completed_at` timestamp
   - Include role in server-side contact creation

6. **Company Creation for Salon Owners** (2 hours)
   - Extend `hubspot-crm-contact` to create Company objects
   - Associate salon owner Contacts with Company records
   - Add salon-specific properties to Company objects

### Phase 3: Dashboard & Monitoring (3 hours)
7. **Enhanced Error Monitoring** (1 hour)
   - Add structured error logging to edge functions
   - Enhance admin dashboard with error filtering

8. **Attribution Debugging** (1 hour)
   - Add debug mode for attribution tracking
   - Console logging for UTM propagation verification

9. **Performance Optimization** (1 hour)
   - Defer HubSpot script loading further
   - Add script loading timeout handling

### Phase 4: Advanced Features (4 hours)
10. **Cross-Device Attribution** (2 hours)
    - Add user ID to attribution tracking
    - Implement attribution bridging on login

11. **Behavioral Event Expansion** (2 hours)
    - Add `job_post_viewed`, `booking_initiated` events
    - Track user engagement milestones

---

## Estimated Total Effort
**17 engineering hours** across 4 phases

**Priority Order**: Phase 1 (Critical) → Phase 2 (Core functionality) → Phase 3 (Monitoring) → Phase 4 (Advanced)

---

## Appendix

### File References
- **HubSpot Core**: `src/lib/analytics/hubspot.ts` (690 lines)
- **Provider Component**: `src/components/analytics/HubSpotProvider.tsx`
- **Edge Functions**: `supabase/functions/hubspot-*`
- **Admin Dashboard**: `src/pages/admin/HubSpotSync.tsx`
- **Attribution Scripts**: `public/scripts/utm.js`, `public/scripts/conversions.js`
- **Consent Management**: `src/components/ConsentBanner.tsx`

### Proposed Event Schema Table

| Event | Properties | Source Component |
|-------|------------|------------------|
| `page_view` | pathname, search, utm_* | HubSpotProvider |
| `signup_started` | role_selected, utm_source | SignUp page |
| `signup_completed` | role, provider, utm_*, user_id | Auth callbacks |
| `role_selected` | role, previous_role | ChooseRole page |
| `social_auth_clicked` | provider | SocialAuthButtons |
| `form_submitted` | form_type, utm_*, success | ContactForm |

### Required HubSpot Properties Schema

```javascript
// Contact Properties
{
  utm_source: 'Single-line text',
  utm_medium: 'Single-line text', 
  utm_campaign: 'Single-line text',
  signup_provider: 'Dropdown [email, google, facebook]',
  user_role: 'Dropdown [customer, artist, salon_owner, freelancer]',
  signup_completed_at: 'Date picker',
  last_login_at: 'Date picker'
}

// Company Properties (for salon owners)
{
  salon_name: 'Single-line text',
  salon_type: 'Dropdown [independent, chain, booth_rental]',
  team_size: 'Number',
  monthly_revenue: 'Number'
}
```

---

**Report Generated**: January 13, 2025  
**Status**: Ready for implementation - fix Phase 1 issues first