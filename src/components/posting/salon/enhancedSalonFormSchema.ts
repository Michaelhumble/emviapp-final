
import { z } from "zod";

// Identity Section Schema
export const salonIdentitySchema = z.object({
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Business type is required"),
  logo: z.instanceof(File).optional(),
  establishedYear: z.string().optional(),
});

// Location Section Schema
export const salonLocationSchema = z.object({
  address: z.string().min(5, "Full address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  neighborhood: z.string().optional(),
  hideAddressFromPublic: z.boolean().default(false),
});

// Photos Section Schema
export const salonPhotosSchema = z.object({
  photos: z.array(z.instanceof(File)).min(3, "At least 3 photos are required"),
  coverPhotoIndex: z.number().default(0),
  virtualTourUrl: z.string().url().optional().or(z.literal("")),
});

// About Section Schema
export const salonAboutSchema = z.object({
  description: z.string().min(50, "Description must be at least 50 characters"),
  reasonForSelling: z.string().min(20, "Please explain why you're selling"),
  ownerNote: z.string().optional(),
  yearsInBusiness: z.string().optional(),
});

// Performance Section Schema
export const salonPerformanceSchema = z.object({
  annualRevenue: z.string().min(1, "Annual revenue is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  averageClients: z.string().min(1, "Average monthly clients is required"),
  hideFinancialInfo: z.boolean().default(true),
  growthTrend: z.enum(["growing", "stable", "declining"]).optional(),
});

// Assets Section Schema
export const salonAssetsSchema = z.object({
  equipment: z.array(z.string()),
  equipmentValue: z.string().optional(),
  staffCount: z.string().optional(),
  staffIncluded: z.boolean().default(false),
  leaseDetails: z.string().optional(),
});

// Promotion Section Schema
export const salonPromotionSchema = z.object({
  promotionTier: z.enum(["standard", "featured", "premium", "diamond"]).default("standard"),
  urgentListing: z.boolean().default(false),
  highlightColor: z.string().optional(),
});

// Contact Privacy Section Schema
export const salonContactPrivacySchema = z.object({
  showPhone: z.boolean().default(true),
  showEmail: z.boolean().default(true),
  requireNDA: z.boolean().default(false),
  preScreenBuyers: z.boolean().default(true),
  messagingPreference: z.enum(["open", "serious-inquiries", "qualified-only"]).default("serious-inquiries"),
});

// Master Schema
export const enhancedSalonFormSchema = z.object({
  identity: salonIdentitySchema,
  location: salonLocationSchema,
  photos: salonPhotosSchema,
  about: salonAboutSchema,
  performance: salonPerformanceSchema,
  assets: salonAssetsSchema,
  promotion: salonPromotionSchema,
  contactPrivacy: salonContactPrivacySchema,
  askingPrice: z.string().min(1, "Asking price is required"),
});

export type EnhancedSalonFormValues = z.infer<typeof enhancedSalonFormSchema>;
export type SalonIdentityValues = z.infer<typeof salonIdentitySchema>;
export type SalonLocationValues = z.infer<typeof salonLocationSchema>;
export type SalonPhotosValues = z.infer<typeof salonPhotosSchema>;
export type SalonAboutValues = z.infer<typeof salonAboutSchema>;
export type SalonPerformanceValues = z.infer<typeof salonPerformanceSchema>;
export type SalonAssetsValues = z.infer<typeof salonAssetsSchema>;
export type SalonPromotionValues = z.infer<typeof salonPromotionSchema>;
export type SalonContactPrivacyValues = z.infer<typeof salonContactPrivacySchema>;
