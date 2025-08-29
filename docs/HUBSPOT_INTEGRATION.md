# HubSpot CRM Integration for EmviApp

This document outlines the comprehensive HubSpot CRM integration for EmviApp, including contact management, deal tracking, forms integration, and attribution capture.

## Overview

EmviApp integrates with HubSpot Free Plan to provide:
- **Contact Management**: Automatic contact upsert on signup/login with attribution data
- **Deal Tracking**: MQL milestone tracking and revenue event deal updates
- **Attribution Capture**: UTM parameters, affiliate IDs, and page-specific slug tracking
- **Forms Integration**: Contact forms that create/update contacts with full attribution
- **Admin Monitoring**: Dashboard to monitor sync attempts and integration health

## Required HubSpot Properties

The integration requires these custom properties to be created in your HubSpot portal:

### Contact Properties
- `affiliate_id` (Single-line text) - Affiliate/referrer ID
- `landing_url` (Single-line text) - First landing page URL
- `utm_source` (Single-line text) - UTM source parameter
- `utm_medium` (Single-line text) - UTM medium parameter
- `utm_campaign` (Single-line text) - UTM campaign parameter
- `utm_content` (Single-line text) - UTM content parameter
- `utm_term` (Single-line text) - UTM term parameter
- `first_seen_at` (Date picker) - First visit timestamp
- `press_slug` (Single-line text) - Press article slug from /press/[slug] visits
- `city_slug` (Single-line text) - City page slug from programmatic pages
- `category_slug` (Single-line text) - Category slug from programmatic pages
- `signup_stage` (Dropdown) - Values: visitor, lead, mql, sql, customer
- `mql_score` (Number) - Marketing qualified lead score

### Deal Properties
Same properties as Contact properties above for attribution tracking on deals.

## Architecture

### Core Components

1. **HubSpotCRM Class** (`src/lib/analytics/hubspot.ts`)
   - Full CRM integration with contacts, deals, and forms
   - Attribution capture and persistence in localStorage
   - Consent-based loading with graceful degradation

2. **Edge Functions**
   - `hubspot-crm-contact`: Contact upsert with all attribution properties
   - `hubspot-crm-deal`: Deal creation/update with attribution tracking
   - `hubspot-forms`: Enhanced form submission with hidden fields

3. **Admin Dashboard** (`src/pages/admin/HubSpotSync.tsx`)
   - Monitor last 20 sync attempts
   - View attribution data and integration status
   - Debug information and troubleshooting

## Setup Instructions

### 1. Environment Configuration

Set your HubSpot Portal ID:
```env
# HubSpot Portal ID (required)
VITE_HUBSPOT_PORTAL_ID=your_portal_id_here
```

### 2. Private App Token (Server-Side)

Add your HubSpot Private App token to Supabase secrets:
```env
# HubSpot Private App Token (required for CRM operations)
HS_PRIVATE_APP_TOKEN=your_private_app_token_here
```

**Required Scopes for Private App:**
- `crm.objects.contacts.read`
- `crm.objects.contacts.write`
- `crm.objects.deals.read`
- `crm.objects.deals.write`
- `forms`
- `forms-uploaded-files`
- `external_integrations.forms.access`

### 3. HubSpot Portal Configuration

1. **Create Custom Properties**: Add all required properties listed above to both Contact and Deal objects
2. **Create Forms**: Create forms for contact_general, press_inquiry, partner_affiliate (update form IDs in code)
3. **Set Up Workflows**: Optional automation based on signup_stage changes

## Usage

### Attribution Capture

Attribution is automatically captured on first page load and stored persistently:

```typescript
import { captureAttribution, getAttribution } from '@/lib/analytics/hubspot';

// Capture attribution (automatic on page load)
const attribution = captureAttribution();

// Get stored attribution
const stored = getAttribution();
```

### Contact Management

```typescript
import { upsertContact } from '@/lib/analytics/hubspot';

// Create or update contact with attribution
const result = await upsertContact('user@example.com', {
  firstName: 'John',
  lastName: 'Doe',
  role: 'artist',
  city: 'San Francisco',
  signup_stage: 'mql',
  mql_score: 75
});

if (result.success) {
  console.log('Contact ID:', result.contactId);
}
```

### Deal Management

```typescript
import { createOrUpdateDeal } from '@/lib/analytics/hubspot';

// Create deal when user hits MQL milestone
const result = await createOrUpdateDeal('contact-id-123', {
  dealName: 'Emvi App MQL - John Doe',
  amount: 500,
  dealStage: 'appointmentscheduled'
});
```

### Form Submission

```typescript
import { submitHubSpotForm } from '@/lib/analytics/hubspot';

// Submit form with attribution
const result = await submitHubSpotForm('contact_general', {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Interested in partnership'
});
```

## UTM and Attribution Flow

1. **First Visit**: UTM parameters and referrer captured in localStorage (`emvi.attribution.v1`)
2. **Page Navigation**: Press slugs, city slugs, and category slugs updated
3. **Contact Creation**: All attribution data sent to HubSpot on signup/login
4. **Deal Creation**: Attribution copied from contact to deal
5. **Form Submission**: Attribution automatically included in form data

## Admin Monitoring

Visit `/admin/hubspot-sync` to monitor:
- Integration status and portal ID
- Last 20 sync attempts with success/error details
- Current attribution data in session
- Debug information for troubleshooting

## Testing

### Dry Run Script

Test your integration with the dry run script:

```bash
# Set environment variables
export HS_PRIVATE_APP_TOKEN=your_token_here
export VITE_HUBSPOT_PORTAL_ID=your_portal_id

# Run the test
npx tsx scripts/hubspotTest.ts
```

The script will:
- Create/update a test contact with attribution data
- Create/update a test deal linked to the contact
- Verify all properties are populated correctly

### Manual Testing

1. **Attribution Capture**: Visit with UTM parameters and check localStorage
2. **Contact Creation**: Sign up and verify contact appears in HubSpot with UTMs
3. **Deal Creation**: Trigger MQL milestone and verify deal creation
4. **Form Submission**: Submit forms and verify attribution data flows through

## Privacy and Consent

- **Production Only**: Never loads in development environment
- **Consent Required**: Respects cookie consent and Do Not Track settings
- **Graceful Degradation**: Works without HubSpot if user blocks tracking
- **Data Minimization**: Only collects necessary attribution and profile data

## Error Handling

All operations include comprehensive error handling:
- Network failures are logged but don't break user experience
- Sync attempts are logged for admin monitoring
- Missing properties are handled gracefully
- Server-side validation prevents malformed requests

## Troubleshooting

### Common Issues

**Integration not working:**
- Verify `HS_PRIVATE_APP_TOKEN` is set in Supabase secrets
- Check that `VITE_HUBSPOT_PORTAL_ID` matches your portal
- Ensure private app has all required scopes

**Missing attribution data:**
- Check localStorage for `emvi.attribution.v1` key
- Verify UTM parameters were present on initial page load
- Confirm user consent is granted

**Sync failures:**
- Check `/admin/hubspot-sync` for error details  
- Verify custom properties exist in HubSpot portal
- Review edge function logs in Supabase dashboard

### Debug Commands

```javascript
// Check attribution data
console.log(JSON.parse(localStorage.getItem('emvi.attribution.v1')));

// Check sync attempts
console.log(JSON.parse(localStorage.getItem('hubspot_sync_attempts')));

// Test dry run
npx tsx scripts/hubspotTest.ts
```

## Week-1 Hardening

### Enhanced Security & Reliability

**Token Security:**
- Server-side token validation with hard-fail on missing `HS_PRIVATE_APP_TOKEN`
- Client-side code never exposes private tokens
- All edge functions validate token presence before processing

**Retry Strategy:**
- Exponential backoff: 1s, 2s, 4s delays
- Random jitter (0-250ms) to prevent thundering herd
- Retry on 429 (rate limit) and 5xx errors only
- Never retry 4xx errors (except 429)
- Max 3 attempts per request

**Data Validation:**
- **Email**: RFC 5322 validation, required for all contacts
- **Signup Stage**: Limited to enum [`visitor`, `signup`, `activated`, `mql`, `sql`, `customer`]
- **MQL Score**: Numeric 0-100 range with coercion
- **UTM Fields**: Max 150 characters, control character stripping
- **Names**: Max 80 characters for first/last names
- **URLs**: Max 300 characters for landing URLs

**Error Monitoring:**
- Centralized `logHubSpotError()` hook with `[HUBSPOT]` tag
- PII redaction (email → `a***@domain.com`)
- Token scrubbing from logs
- Optional Sentry integration when `NEXT_PUBLIC_SENTRY_DSN` present

**Admin Dashboard:**
- Filter toggles: All/Contacts/Deals/Forms
- "Last 24h" quick filter (client-side only)
- Real-time sync status monitoring
- Attribution data inspection

### Rate Limits & Quotas

**HubSpot Free Plan Limits:**
- 100 requests per 10 seconds
- 1,000 contacts maximum
- Basic deal pipeline only
- No custom pipelines or workflows

**Dry-Run Testing:**
```bash
# Basic tests
pnpm tsx scripts/hubspotTest.ts --createContact --withUTM

# Advanced tests  
pnpm tsx scripts/hubspotTest.ts --createDeal --mqlScore=80 --failOnWarning
```

## Support

For integration issues:
- Check Supabase edge function logs
- Review HubSpot portal activity logs  
- Use the admin dashboard for sync status
- Run the dry-run script to validate setup