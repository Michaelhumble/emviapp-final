# EmviApp Authentication & HubSpot Audit Report

## Current System Analysis

### OAuth Redirect Configuration ✅

**Current redirectTo Values:**
- `src/components/auth/SocialAuthButtons.tsx:60-70` - Uses `${window.location.origin}/auth/callback` (production-safe)
- `src/pages/auth/Callback.tsx:19` - Proper iframe breakout with `window.location.href`

### Iframe Breakout Implementation ✅

**Status**: IMPLEMENTED
- `src/pages/auth/Callback.tsx:18-21` - Proper iframe breakout logic
- Added diagnostic logging for iframe detection

### Profiles Upsert Flow ✅

**Status**: IMPLEMENTED  
- `src/pages/auth/Callback.tsx:33-43` - Upserts profile with user.id
- Handles both email and OAuth flows with proper conflict resolution

### Role Gate Logic ✅

**Choose Role Trigger**: `src/pages/auth/Callback.tsx:74-79`
- Properly checks `!isValidRole(profile?.role)`
- Redirects to `/auth/choose-role` with optional prefill
- Added diagnostic logging for decision tracking

### Provider Detection & State Verification ✅

**Status**: IMPLEMENTED
- `src/utils/auth/provider.ts` - Parses signed OAuth state
- `supabase/functions/auth-prepare-oauth/index.ts` - Creates HMAC-signed payload
- `src/components/auth/SocialAuthButtons.tsx:58-65` - Calls Edge function with provider
- `src/pages/auth/Callback.tsx:82-84` - Uses verified provider for analytics

### HubSpot Configuration ⚠️

**Environment Variable**: Uses `VITE_HUBSPOT_PORTAL_ID` (confirmed in build script)
**Event Firing**:
- `signup_completed`: `src/lib/analytics/hubspot-simple.ts` (basic implementation)
- `role_selected`: Added to `src/pages/auth/ChooseRole.tsx:59`
**Server Fallback**: `src/utils/hubspot-server.ts` exists but not integrated

### Service Worker Status ❓

**Status**: UNKNOWN - needs verification

## Risk List

1. **HIGH**: Missing middleware role-gate for `/dashboard/*` routes
2. **MEDIUM**: Service worker status on auth pages unknown  
3. **LOW**: HubSpot server fallback not fully integrated

## Diagnostic Logging Added ✅

- `[AUTH] callback: redirectTo=...` - Added to callback processing
- `[AUTH] profile: exists=... role=...` - Added to profile fetching
- `[AUTH] decision: next=...` - Added to routing decisions
- `[OAUTH] provider=... stateVerified=...` - Added to provider detection
- `[AUTH] role_selected: ...` - Added to role selection

## Verification Status

**Ready for Phase 2 testing with diagnostic logs in place.**

## Next Phase Actions Required

1. **PRIORITY**: Implement middleware for `/dashboard/*` route protection
2. Verify service worker behavior on auth pages
3. Complete HubSpot server fallback integration
4. Test all OAuth flows with new diagnostic logging