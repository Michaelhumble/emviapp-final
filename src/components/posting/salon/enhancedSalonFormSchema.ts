
import { z } from "zod";

export const enhancedSalonFormSchema = z.object({
  // Salon Identity
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Business type is required"),
  salonSize: z.string().min(1, "Salon size is required"),
  logoUrl: z.string().optional(),

  // Location
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  neighborhood: z.string().optional(),
  hideAddress: z.boolean().default(false),

  // Photos & Video
  coverPhotoIndex: z.number().default(0),
  videoUrl: z.string().optional(),

  // About This Salon
  salonStory: z.string().min(10, "Please tell us more about your salon's story"),
  ownerMessage: z.string().optional(),
  reasonForSelling: z.string().optional(),

  // Business Performance - Fixed field names
  showRevenue: z.boolean().default(true),
  showProfit: z.boolean().default(true),
  showClients: z.boolean().default(true),
  revenue: z.string().optional(),
  monthlyRevenue: z.string().optional(),
  annualRevenue: z.string().optional(),
  profit: z.string().optional(),
  monthlyClients: z.string().optional(),
  yearsInOperation: z.string().optional(),
  leaseTerms: z.string().optional(),
  monthlyRent: z.string().optional(),
  askingPrice: z.string().min(1, "Asking price is required"),
  hidePrice: z.boolean().default(false),

  // Assets & Team
  includedEquipment: z.array(z.string()).default([]),
  teamSize: z.string().optional(),
  teamStays: z.boolean().default(false),
  staffBios: z.string().optional(),

  // Promotion Options - Fixed type
  promotionUpgrades: z.object({
    isUrgent: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    isDiamond: z.boolean().default(false)
  }).default({}),
  urgentSale: z.boolean().default(false),
  featuredListing: z.boolean().default(false),
  diamondListing: z.boolean().default(false),

  // Contact & Privacy
  requireNDA: z.boolean().default(false),
  messagingOnly: z.boolean().default(true),
});

export type EnhancedSalonFormValues = z.infer<typeof enhancedSalonFormSchema>;
