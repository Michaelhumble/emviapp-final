# PWA on iOS Checklist

## Quick Setup Verification

### 1. Pre-deployment Checklist
- [ ] All WebSocket connections use `wss://` (secure WebSocket)
- [ ] CSP headers include `connect-src 'self' https: wss:` and `upgrade-insecure-requests`
- [ ] Manifest.json has `start_url: "/?source=pwa"` and `display: "standalone"`
- [ ] Service Worker only registers on `isSecureContext === true`
- [ ] Environment variables point to production HTTPS/WSS endpoints

### 2. iOS Testing Workflow

#### Remove Old Installation
```bash
# On iPhone/iPad:
1. Long press existing EmviApp icon → Delete App
2. Confirm "Delete App" (removes all data)
```

#### Fresh Installation
```bash
# In Safari:
1. Navigate to https://www.emvi.app
2. Tap Share button (bottom center)
3. Scroll down → "Add to Home Screen"
4. Confirm installation
5. Open from Home Screen (not Safari)
```

#### Diagnostic Check
```bash
# Open the diagnostics page:
https://www.emvi.app/debug/pwa

# Verify all green checkmarks:
✅ isSecureContext: true
✅ SW: activated, cache version matches
✅ WS test: connected (wss://)
✅ Manifest loaded: yes
✅ Standalone mode: true
```

### 3. Feature Testing

#### Connection Resilience
```bash
1. Open PWA → use realtime feature (should connect via WebSocket)
2. Turn on Airplane Mode (connection should gracefully degrade)
3. Turn off Airplane Mode (should auto-reconnect within 5 seconds)
4. Check /debug/pwa → connection type should show current method
```

#### Offline Capability
```bash
1. Browse cached pages while offline
2. Try to submit forms (should queue for later)
3. Return online → queued actions should sync
```

### 4. Common Issues & Fixes

#### Issue: WebSocket "SecurityError" or Connection Refused
```bash
# Check:
- URL uses wss:// (not ws://)
- Domain matches CSP connect-src policy
- No mixed content (HTTP resources on HTTPS page)

# Fix:
- Ensure NEXT_PUBLIC_WS_URL uses wss://
- Verify CSP includes 'wss:' in connect-src
```

#### Issue: Service Worker Not Registering
```bash
# Check:
- window.isSecureContext === true
- No console errors in registration
- SW file accessible at /sw.js

# Fix:
- Only register on HTTPS
- Check service worker file path
- Verify no syntax errors in SW code
```

#### Issue: App Not Showing as "Installed"
```bash
# Check:
- Manifest accessible at /manifest.webmanifest
- start_url matches current origin
- All required manifest fields present

# Fix:
- Verify manifest Content-Type: application/manifest+json
- Check icon URLs are absolute and accessible
- Test manifest in browser dev tools
```

### 5. Environment Configuration

#### Production Environment Variables
```env
NEXT_PUBLIC_API_URL=https://wwhqbjrhbajpabfdwnip.supabase.co
NEXT_PUBLIC_WS_URL=wss://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/realtime-chat
NEXT_PUBLIC_SSE_URL=https://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/events
NEXT_PUBLIC_POLLING_URL=https://wwhqbjrhbajpabfdwnip.functions.supabase.co/functions/v1/poll
```

#### Vercel Headers (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "connect-src 'self' https: wss:; upgrade-insecure-requests"
        }
      ]
    }
  ]
}
```

### 6. Deployment Verification

#### After Deploy, Test:
```bash
1. Visit production URL in iPhone Safari
2. Check /debug/pwa shows all green
3. Install PWA → verify standalone mode
4. Test primary app functionality
5. Verify realtime features work
6. Test offline → online transitions
```

#### Performance Check:
```bash
# Lighthouse PWA audit should show:
- Installable: ✓
- PWA optimized: ✓
- Service Worker: ✓
- Secure HTTPS: ✓
- Responsive design: ✓
```

### 7. Emergency Fallback Deploy

If WebSocket issues persist, deploy with polling-only mode:

```typescript
// Quick patch in connection.ts:
const createSecureConnection = () => {
  // Force polling mode for immediate iOS compatibility
  const connection = new SecureConnectionManager(config);
  return connection.connectPolling(); // Skip WS/SSE attempts
};
```

This ensures PWA works immediately while WebSocket issues are resolved.

---

## Success Criteria

- [ ] PWA installs cleanly from Safari
- [ ] Opens in standalone mode (no Safari UI)
- [ ] `/debug/pwa` shows all systems green
- [ ] Realtime features work (with automatic fallback)
- [ ] Offline functionality preserved
- [ ] Service Worker updates automatically
- [ ] Connection survives network interruptions

**Target Result**: Users can install and use EmviApp as a native-feeling iOS app with reliable connectivity.