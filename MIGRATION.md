# Booking System Migration Guide

## Overview

The EmviApp booking system has been unified under a single type system located at `src/lib/booking/`. This migration consolidates all booking-related types, validation, and utilities for better maintainability and type safety.

## What Changed

### Type System
- **OLD**: Multiple scattered type files (`types/booking.ts`, `types/booking-enhanced.ts`)
- **NEW**: Unified types in `src/lib/booking/types.ts`

### Import Changes
```typescript
// ❌ OLD - Multiple import sources
import { Booking } from '@/types/booking';
import { BookingRequest } from '@/types/booking-enhanced';
import { Service } from '@/types/booking-enhanced';

// ✅ NEW - Single source of truth
import { Booking, BookingRequest, Service } from '@/lib/booking/types';
// OR use the barrel export
import { Booking, BookingRequest, Service } from '@/lib/booking';
```

### Database Schema Alignment
The new types are directly aligned with the Supabase database schema:

#### Services Table
```typescript
interface Service {
  id: string;
  title: string;           // Database field
  name: string;            // Alias for component compatibility
  description?: string;
  duration_minutes: number; // Database field
  price: number;           // Database field
  user_id: string;         // Database field (artist ID)
  artist_id: string;       // Alias for user_id
  is_visible?: boolean;    // Database field
  is_active: boolean;      // Alias for is_visible
  location_type: LocationType; // For component compatibility
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}
```

#### Bookings Table
```typescript
interface Booking {
  id: string;
  sender_id: string;       // Customer ID
  recipient_id: string;    // Artist ID
  service_id?: string;
  client_name?: string;
  client_email?: string; 
  client_phone?: string;
  date_requested?: string;  // YYYY-MM-DD format
  time_requested?: string;  // HH:MM format
  starts_at?: string;       // ISO timestamp
  ends_at?: string;         // ISO timestamp
  status?: BookingStatus;   // 'pending' | 'confirmed' | 'cancelled' | 'rescheduled' | 'completed'
  source?: BookingSource;   // 'web' | 'hubspot' | 'manual'
  note?: string;
  service_type?: string;    // Legacy compatibility
  service_name?: string;    // Alias for service_type
  // ... additional fields
}
```

## File Structure

```
src/lib/booking/
├── index.ts          # Barrel export for easy imports
├── types.ts          # Core type definitions
├── schemas.ts        # Zod validation schemas  
├── mappers.ts        # Database row to type mappers
├── guards.ts         # Type guard functions
└── compat.ts         # Legacy compatibility helpers
```

## Migration Steps

### 1. Update Imports
Replace all old booking type imports:

```bash
# Find all files with old imports
grep -r "from.*types/booking" src/

# Update each file manually or use find/replace:
# @/types/booking → @/lib/booking/types
# @/types/booking-enhanced → @/lib/booking/types
```

### 2. Use Mappers for Database Operations
```typescript
// ❌ OLD - Manual type conversion
const booking = data as Booking;

// ✅ NEW - Use mappers
import { rowToBooking } from '@/lib/booking/mappers';
const booking = rowToBooking(data);
```

### 3. Validate with Schemas
```typescript
// ✅ NEW - Runtime validation
import { CreateBookingInput } from '@/lib/booking/schemas';

const validatedData = CreateBookingInput.parse(formData);
```

## Edge Functions

Three new edge functions have been added:

1. **`bookings-create`** - Create new bookings with conflict checking
2. **`bookings-cancel`** - Cancel bookings with notifications  
3. **`availability-slots`** - Generate available time slots

All functions use the unified type system and Zod validation.

## Breaking Changes

### Property Name Changes
Some property names were standardized:

| Component Usage | Database Field | Unified Type |
|----------------|----------------|--------------|
| `service.name` | `title` | Both `name` and `title` available |
| `service.artist_id` | `user_id` | Both `artist_id` and `user_id` available |
| `service.is_active` | `is_visible` | Both `is_active` and `is_visible` available |
| `booking.service_name` | `service_type` | Both `service_name` and `service_type` available |

### Status Values
Booking status values are now strictly typed:
```typescript
type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'rescheduled' | 'completed';
```

## Legacy Compatibility

The migration includes compatibility helpers in `src/lib/booking/compat.ts`:

```typescript
import { toLegacyArtistBooking, toLegacyViewModel } from '@/lib/booking/compat';

// Convert unified booking to legacy format for existing components
const legacyBooking = toLegacyArtistBooking(unifiedBooking);
```

## Validation

### Client-Side
```typescript
import { CreateBookingInput } from '@/lib/booking/schemas';

const result = CreateBookingInput.safeParse(formData);
if (!result.success) {
  // Handle validation errors
  console.error(result.error.errors);
}
```

### Server-Side (Edge Functions)
```typescript
import { CreateBookingInput } from '@/lib/booking/schemas';

const bookingRequest = CreateBookingInput.parse(await req.json());
```

## Environment Variables

Add these to your `.env` file:

```bash
# Email notifications (optional)
RESEND_API_KEY=your_resend_api_key

# CRM integration (optional)  
HUBSPOT_API_KEY=your_hubspot_api_key
```

## Testing Migration

Run these commands to verify the migration:

```bash
# Type checking
pnpm typecheck

# Build verification  
pnpm build

# Test booking flow end-to-end
# 1. Navigate to artist profile
# 2. Click "Book Now" 
# 3. Complete 3-step booking widget
# 4. Verify confirmation screen shows
# 5. Check database for booking record
```

## ESLint Rule (Optional)

Add this to `.eslintrc.js` to prevent future legacy imports:

```javascript
{
  "rules": {
    "import/no-restricted-paths": [
      "error",
      {
        "zones": [
          {
            "target": "./src/**/*",
            "from": "./src/types/booking*.ts",
            "message": "Use @/lib/booking instead of legacy booking types"
          }
        ]
      }
    ]
  }
}
```

## Support

If you encounter issues during migration:

1. Check that all imports are updated to use `@/lib/booking`
2. Verify database schema matches the type definitions
3. Use compatibility helpers for existing components that can't be immediately updated
4. Run `pnpm typecheck` to catch type mismatches

The unified booking system maintains backward compatibility while providing a clear path forward for new development.