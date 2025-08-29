# HubSpot Integration Documentation

## Overview

EmviApp integrates with HubSpot's free analytics platform to track user behavior, identify authenticated users, and capture marketing attribution data. The integration is designed with privacy-first principles and production-only loading.

## Setup Instructions

### 1. Load Order Fix (Critical)
The `HubSpotProvider` is properly wrapped **inside** `AuthProvider` context to prevent "useAuth must be used within an AuthProvider" runtime errors. This ensures auth state is ready before HubSpot initialization and guards against user identification when not logged in.

### 2. Environment Configuration

Add your HubSpot Portal ID to your environment variables:

```env
# HubSpot Configuration (Optional - only loads in production when set)
HUBSPOT_PORTAL_ID=your_portal_id_here
```

**Note**: The integration supports multiple environment variable formats:
- `VITE_HUBSPOT_PORTAL_ID` (Vite standard)  
- `HUBSPOT_PORTAL_ID` (generic)

### 3. Finding Your Portal ID

1. Log into your HubSpot account
2. Navigate to Settings → Account Setup → Account Defaults
3. Your Hub ID (Portal ID) is displayed at the top of the page
4. Copy this number (without any prefixes) to your environment variable

## What Data We Track

### Automatic Page Views
- **When**: Every page navigation in production
- **Data**: URL, referrer, UTM parameters, page type, user role
- **Privacy**: Only after user consent

### User Identification  
- **When**: User logs in with email address
- **Data**: Email, name, user ID, role, plan, location, specialty, UTM attribution
- **Frequency**: Once per user per session (prevents duplicates)
- **Enhanced**: Pulls from both auth metadata and profile table for rich data

### Attribution Data
- **UTM Parameters**: Source, medium, campaign, content, term
- **Referrer**: Initial and page-level referrer tracking
- **Landing Page**: First page visited with UTM data
- **Storage**: 90-day TTL in sessionStorage

## Privacy & Security

### Consent Requirements
- **Cookie Consent**: Only loads after user accepts marketing cookies
- **Do Not Track**: Respects browser DNT=1 setting
- **Production Only**: Never loads in development environment

### Content Security Policy
The integration is whitelisted in our CSP headers:
```
script-src: https://js.hs-analytics.net
connect-src: https://js.hs-analytics.net https://track.hubspot.com
```

### Error Handling
- Graceful failures if HubSpot script is blocked
- No-op functions when script unavailable
- Console warnings for debugging (not user-facing errors)

## Implementation Details

### Core Components

1. **HubSpotAnalytics Class** (`src/lib/analytics/hubspot.ts`)
   - Singleton pattern for consistent state
   - Async script loading with timeout protection
   - Session-based duplicate prevention

2. **HubSpotProvider** (`src/components/analytics/HubSpotProvider.tsx`)
   - React provider for app-wide integration
   - Auth state monitoring for user identification
   - Consent change listener

3. **App Integration** (`src/App.tsx`)
   - Wrapped in provider hierarchy
   - Automatic initialization on app load

### Key Methods

```typescript
// Load HubSpot (automatic in provider)
await loadHubSpot(portalId);

// Enhanced user identification (automatic on login)
hubspotIdentify({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName, 
  userId: user.id,
  role: 'artist', // customer, artist, salon_owner
  plan: 'premium', // free, premium
  city: 'San Francisco, CA',
  specialty: 'Nail Art',
  first_touch_utm_source: 'google'
});

// Track page view (automatic on navigation)
hubspotTrackPageView({
  path: '/page',
  referrer: document.referrer,
  page_title: document.title
});

// Custom event tracking (client-side)
hubspotTrackEvent('job_viewed', { 
  job_id: 'abc123',
  job_title: 'Nail Technician'
});

// Custom event tracking (with server fallback)
import { trackHubSpotEvent, HubSpotEvents } from '@/lib/analytics/hubspotEvents';

// Pre-defined events
await HubSpotEvents.jobViewed('job-123', 'Nail Technician', 'NYC');
await HubSpotEvents.profileViewed('artist-456', 'artist');

// Custom events with server fallback
await trackHubSpotEvent('custom_action', { 
  property: 'value',
  user_type: 'premium'
});
```

## HubSpot Configuration

### In HubSpot Dashboard
1. **Navigate to**: Reports → Analytics Tools → Tracking Code
2. **Verify**: Your portal ID matches the environment variable
3. **Contact Properties**: Create custom properties for enhanced tracking:
   - `user_role` (text) - artist, customer, salon_owner
   - `subscription_plan` (text) - free, premium
   - `specialty` (text) - Nails, Hair, etc.
   - `years_experience` (number)
   - `first_touch_utm_source` (text)
   - `salon_name` (text)
4. **Contact Lists**: Create smart lists based on properties and behaviors
5. **Email Workflows**: Set up nurture campaigns by user role/plan
6. **Lead Scoring**: Rules based on page views, events, and user properties

### Server-Side Event Tracking
A server helper is available at `/functions/v1/hubspot-event` for backend event tracking:

```typescript
// From your edge functions or server code
const response = await supabase.functions.invoke('hubspot-event', {
  body: {
    eventName: 'job_posted',
    email: user.email,
    userId: user.id,
    properties: {
      job_title: 'Nail Technician',
      location: 'NYC',
      salary_range: '$50k-$60k'
    }
  }
});
```

## Testing & Verification

### Development Testing
```bash
# Set environment variable
export VITE_HUBSPOT_PORTAL_ID=your_portal_id

# Build production version locally  
npm run build
npm run preview

# Open browser network tab
# Look for requests to js.hs-analytics.net
```

### Production Verification
1. **Script Loading**: Check for `_hsq` array in browser console
2. **Page Views**: Network tab shows tracking calls on navigation
3. **User Identification**: Identify call appears after login
4. **HubSpot Dashboard**: Verify data appears in Analytics Tools

### Console Debugging
```javascript
// Check if HubSpot is loaded
window._hsq

// Check current portal ID
console.log(hubspotAnalytics.getPortalIdInUse())

// Check if ready
console.log(hubspotAnalytics.isReady())
```

## Disabling HubSpot

To disable HubSpot tracking:
1. Remove or comment out the `HUBSPOT_PORTAL_ID` environment variable
2. Restart your application  
3. No HubSpot scripts will load

**Note**: Users can also disable tracking by:
- Declining cookie consent
- Enabling Do Not Track in their browser
- Using ad blockers (integration handles gracefully)

## Troubleshooting

### Common Issues

**HubSpot not loading**:
- Check `HUBSPOT_PORTAL_ID` is set correctly
- Verify you're in production mode (`NODE_ENV=production`)  
- Check browser console for CSP violations
- Ensure user has accepted marketing cookies

**User identification not working**:
- Verify user has email address in auth profile
- Check that user logged in after HubSpot loaded
- Look for duplicate identification prevention logs
- Ensure profile data loads correctly (check network tab for profiles API calls)

**Missing UTM data**:
- UTM parameters must be present on initial page load
- Check sessionStorage for `emvi_utm` key
- Verify 90-day TTL hasn't expired

### Debug Logs
Enable debug logging by opening browser console:
```javascript
// All HubSpot logs are prefixed with "HubSpot:"
// Filter console to see only HubSpot-related messages
```

## Data Flow Diagram

```
User Visit → Consent Check → HubSpot Load → Page View Track
    ↓
User Login → Email Check → Identify Call → Contact Creation
    ↓  
Page Navigation → UTM Collection → Page View Track → Analytics Dashboard
```

## Compliance Notes

- **GDPR**: Respects consent through our existing cookie banner
- **CCPA**: Honors Do Not Track browser setting
- **Data Retention**: Controlled by HubSpot's retention policies
- **User Rights**: Users can withdraw consent via cookie preferences

## Support

For technical issues:
- Check browser console for error messages
- Verify environment configuration  
- Test in production environment
- Review HubSpot's tracking code status in their dashboard

For HubSpot-specific questions:
- Refer to HubSpot's documentation at developers.hubspot.com
- Check HubSpot Academy for training resources
- Contact HubSpot support for platform-specific issues