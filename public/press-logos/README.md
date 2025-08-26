# Press Logos Directory

This directory contains media outlet logos for the "As Featured In" section.

## Adding/Removing Outlets

To manage press outlets:

1. **Add SVG logos** to this directory with descriptive filenames (e.g., `ap.svg`, `benzinga.svg`)
2. **Update configuration** in `src/config/pressOutlets.ts`:
   - Add new outlet object with `name`, `slug`, `logo`, `url`, and `featured` properties
   - Set `featured: true` for homepage display (max 8 outlets)
   - Set `featured: false` for press page only

## Logo Requirements

- **Format**: SVG preferred (fallback to PNG/WebP)
- **Size**: Max 120px width, auto height
- **Style**: Grayscale versions that colorize on hover
- **Compression**: Keep under 10-15KB for performance

## Example Configuration

```typescript
{
  name: "AP News",
  slug: "ap-news",
  logo: "/press-logos/ap.svg",
  url: "https://apnews.com/...",
  featured: true,
  description: "Associated Press coverage..."
}
```

## Performance Notes

- All logos use lazy loading (`loading="lazy"`)
- Grayscale filter applied by default
- Hover effects use CSS transitions
- Mobile displays horizontal scroll with touch support