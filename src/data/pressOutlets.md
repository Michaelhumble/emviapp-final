# Press Outlets Management

This file manages the "AS SEEN ON" press coverage section.

## Data Structure

Each outlet in `pressOutlets.ts` has:

```typescript
{
  id: string;         // Unique identifier (e.g., 'benzinga')
  name: string;       // Display name (e.g., 'Benzinga') 
  href: string;       // Full article URL with HTTPS
  logo: string;       // Path to SVG logo in /public/press-logos/
  alt: string;        // Accessible alt text for logo
}
```

## Adding New Outlets

1. **Add logo**: Create `/public/press-logos/{id}.svg`
   - 88x88 viewBox for consistency
   - Transparent background
   - Brand-accurate colors
   - Minimal, clean design

2. **Add to array**: Insert in `PRESS_OUTLETS` array in priority order

3. **Validate**: Run `npm run validate:press` to check URLs

## Logo Guidelines

- **Format**: SVG only (no raster images)
- **Size**: 88x88 viewBox with proper scaling
- **Style**: Clean, minimal representation of brand
- **Colors**: Use official brand colors when possible
- **Background**: Transparent (white circle added by component)

## URL Requirements

- **Protocol**: Must use HTTPS
- **Target**: Link to specific EmviApp press coverage, not homepage
- **UTM**: UTM parameters added automatically by component
- **Validation**: URLs checked by build script

## Testing

```bash
# Validate all press outlets
npm run validate:press

# Check for broken links (skip in CI)
NETWORK_TESTS=1 npm run validate:press
```

## Fallback Handling

- **Image errors**: Automatically swap to `/press-logos/fallback.svg`
- **Network issues**: Component handles gracefully with error boundaries
- **Invalid URLs**: Build fails to prevent broken links in production

## Order Priority

Outlets appear in array order. Most prestigious/recognizable outlets should be first:

1. Major financial (Benzinga)
2. National networks (NBC, ABC, CBS, FOX)  
3. Major newspapers (USA Today)
4. Digital publications
5. Local affiliates

## Maintenance

- **Monthly**: Verify links still work
- **Quarterly**: Review outlet relevance and priority order
- **On design changes**: Update logo SVGs to match new brand guidelines