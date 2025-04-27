
# Salon Page Issues & Plans

## Current Issues

1. **Type Import Errors**
   - FeaturedSalons.tsx: Missing SalonListing import
   - FeaturedSalonsSection.tsx: Missing SalonListing import
   - SalonCard.tsx: Missing SalonListing import
   - SalonDetail.tsx: Missing SalonListing import
   - SalonFilter.tsx: Missing SalonFilters import
   - [id].tsx: Missing SalonListing import

2. **Component Issues**
   - SalonListings.tsx: EmptyState props issue
   - SalonFilter.tsx: Too large (204 lines)

3. **Data Management**
   - Inconsistent data fetching
   - Type mismatches

## Plan for Resolution

1. Phase 1: Fix critical type errors
   - Add SalonListing and SalonFilters interfaces to salon.ts
   - Fix imports in all affected files
   - Add resetFilters prop to EmptyState

2. Phase 2: Refactor components
   - Break down SalonFilter.tsx into smaller components
   - Standardize data fetching patterns
   - Improve error handling

3. Phase 3: Enhance functionality
   - Improve filter performance
   - Add loading states
   - Complete salon detail page

## Note on Stability

These changes will be made WITHOUT modifying the stable parts of the application:
- Homepage
- Industry Opportunities section
- Jobs page
- Dashboards

## Locked Areas

The following areas are considered stable and should not be modified:
- src/components/home/**
- src/components/dashboard/**
- src/pages/jobs/**
- src/pages/Index.tsx
