# EmviApp PWA & Modal Configuration

## Feature Flags

### Signup Modal Control
The auto-opening signup modal can be controlled via environment variable:

```bash
# Enable auto-opening signup modal (default: false)
VITE_ENABLE_SIGNUP_MODAL=true
```

**Modal Behavior:**
- Only shows to unauthenticated users
- Respects 30-day dismissal period via localStorage
- Never shows in PWA mode (installed app)
- Never shows on restricted routes: /signup, /login, /jobs/post, /book, /press, /auth/*
- Stores dismissal in `emvi.dismiss_signup_modal` localStorage key

## PWA Icons

### iOS/Android Home Screen Icons
New full-color app icons have been added:
- `/icons/apple-touch-icon-180.png` (180x180 - iPhone)
- `/icons/apple-touch-icon-167.png` (167x167 - iPad Pro)
- `/icons/apple-touch-icon-152.png` (152x152 - iPad)
- `/icons/icon-192.png` (192x192 - Android)
- `/icons/icon-512.png` (512x512 - High-res Android)

### Service Worker
- Cache version bumped to `emviapp-v2.0.0` for new icons
- Caches all PWA assets for offline functionality

## Development

To re-enable the signup modal during development:
1. Set `VITE_ENABLE_SIGNUP_MODAL=true` in your `.env` file
2. Clear localStorage key `emvi.dismiss_signup_modal` if needed
3. Test on non-restricted routes while logged out

## Testing PWA Installation

### iOS Safari:
1. Visit the site in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Verify the full-color icon appears

### Chrome Android:
1. Visit the site in Chrome
2. Tap the "Install" banner or menu option
3. Verify the full-color icon in app drawer

### Desktop Chrome:
1. Visit the site
2. Look for install icon in address bar
3. Click to install as desktop PWA