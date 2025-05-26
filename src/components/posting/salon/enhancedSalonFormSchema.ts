
import { z } from "zod";

// Complete schema for all salon listing fields
export const enhancedSalonFormSchema = z.object({
  // Identity Section
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Business type is required"),
  logo: z.instanceof(File).optional(),
  establishedYear: z.string().optional(),

  // Location Section
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  neighborhood: z.string().optional(),
  hideAddressFromPublic: z.boolean().default(false),

  // Photos Section
  photos: z.array(z.instanceof(File)).default([]),
  coverPhotoIndex: z.number().default(0),
  virtualTourUrl: z.string().url().optional().or(z.literal("")),

  // About Section
  description: z.string().min(10, "Description must be at least 10 characters"),
  reasonForSelling: z.string().min(1, "Reason for selling is required"),
  ownerNote: z.string().optional(),
  yearsInBusiness: z.string().optional(),

  // Performance Section
  annualRevenue: z.string().min(1, "Annual revenue is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  averageClients: z.string().min(1, "Average clients is required"),
  hideFinancialInfo: z.boolean().default(false),
  growthTrend: z.enum(["growing", "stable", "declining"]).optional(),

  // Assets Section
  equipment: z.array(z.string()).default([]),
  equipmentValue: z.string().optional(),
  staffCount: z.string().optional(),
  staffIncluded: z.boolean().default(false),
  leaseDetails: z.string().optional(),

  // Promotion Section
  promotionTier: z.enum(["standard", "featured", "premium", "diamond"]).default("standard"),
  urgentListing: z.boolean().default(false),
  highlightColor: z.string().optional(),

  // Contact Privacy Section
  showPhone: z.boolean().default(true),
  showEmail: z.boolean().default(true),
  requireNDA: z.boolean().default(false),
  preScreenBuyers: z.boolean().default(false),
  messagingPreference: z.enum(["open", "serious-inquiries", "qualified-only"]).default("open"),

  // Final fields
  askingPrice: z.string().min(1, "Asking price is required"),
});

export type EnhancedSalonFormValues = z.infer<typeof enhancedSalonFormSchema>;
