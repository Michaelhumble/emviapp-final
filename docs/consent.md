# Cookie Consent Banner

## Overview
The EmviApp cookie consent banner is designed to be mobile-first, accessible, and compliant with privacy regulations while providing excellent user experience across all devices.

## Features
- **Safe Area Support**: Respects iOS/Android gesture bars and notches
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Mobile Optimized**: 44px minimum tap targets, proper z-index layering
- **Tracking Integration**: GA4 and HubSpot event tracking
- **Performance**: Smooth animations with reduced motion support

## Storage Format
```json
{
  "necessary": true,
  "analytics": boolean,
  "marketing": boolean,
  "ts": number,
  "region": "America/New_York"
}
```

## Configuration

### Changing Copy
Edit the text in `src/components/ConsentBanner.tsx`:
```tsx
<p id="consent-description">
  Your custom message here.
</p>
```

### Adjusting Duration
The consent is stored for 180 days (15,552,000 seconds). To change:
```tsx
const cookieValue = `emvi_consent=v1; Path=/; SameSite=Lax; Max-Age=YOUR_SECONDS`;
```

### Z-Index Policy
The consent banner uses `z-index: 9999` to stay above:
- PWA install prompts (z-index ~8000)
- Navigation bars (z-index ~50)
- Chat widgets (z-index ~1000)
- Modal overlays (z-index ~1000-5000)

To adjust layering, modify the CSS:
```css
.emvi-consent {
  z-index: 9999; /* Adjust as needed */
}
```

## Events Tracked
- `consent_accept_all`: User accepts all cookies
- `consent_reject`: User declines analytics cookies
- `consent_manage_open`: User opens preferences (if implemented)

## Browser Support
- iOS Safari 12+
- Android Chrome 80+
- Desktop Chrome/Firefox/Safari (latest 2 versions)
- Safe area insets supported where available

## Testing Checklist
- [ ] Banner appears on first visit
- [ ] Banner hidden on subsequent visits
- [ ] Buttons are tappable on mobile (44px min)
- [ ] Safe area respected on iOS
- [ ] Keyboard navigation works
- [ ] Screen reader announces properly
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Events fire to GA4/HubSpot
- [ ] No layout shift on banner appearance