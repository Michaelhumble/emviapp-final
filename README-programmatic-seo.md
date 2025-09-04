# Programmatic SEO Pages - EmviApp Artists

## Overview
150 programmatic artist landing pages are now live under `/artists/{role}/{city}` format.

## Current Implementation

### Roles (6):
- `nails` - Nail technicians
- `hair` - Hair stylists  
- `barber` - Barbers
- `lashes` - Lash technicians
- `massage` - Massage therapists
- `skincare` - Estheticians/skincare specialists

### Cities (25):
All major US markets including New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, Nashville, El Paso, Detroit, Portland, Orlando, Tampa, Atlanta, Raleigh, Las Vegas, Sacramento.

## Architecture

### Page Component
- **File**: `src/pages/artists/SpecialtyCityLanding.tsx`
- **Route**: `/artists/:specialty/:cityState` (already configured in App.tsx)
- **Features**: Dynamic intro text, FAQ with JSON-LD, artist listings teaser, internal links

### SEO Implementation
- Dynamic H1: "Hire {Role} in {City}"
- Meta descriptions with local keywords
- FAQ JSON-LD schema with 4 location-specific questions
- Canonical URLs
- Internal linking to Jobs, Salons, Artists, Blog

### Sitemap
- All 150 pages included in `public/sitemap-static.xml`
- Priority: 0.6 (high for local search)
- Change frequency: weekly

## Adding More Cities/Roles

### To Add New Cities:
1. Update `src/data/seo-locations.ts` with new city data
2. Add city entries to `public/sitemap-static.xml` with all 6 roles
3. Test sample URLs to verify routing works

### To Add New Roles:
1. Update `src/data/seo-roles.ts` with new role data  
2. Add role entries to `public/sitemap-static.xml` with all 25 cities
3. Update FAQ templates in `SpecialtyCityLanding.tsx` if needed

### Sitemap Formula:
Total pages = Cities × Roles (currently 25 × 6 = 150)

## Current Status ✅
- 150 programmatic pages live and crawlable
- All pages have intro content, FAQ JSON-LD, and internal links
- Complete sitemap integration
- No regressions to existing Jobs/Salons pages
- Mobile responsive and SEO optimized

## Testing
Test any combination:
- `/artists/nails/new-york-ny`
- `/artists/hair/los-angeles-ca`  
- `/artists/lashes/orlando-fl`
- etc.