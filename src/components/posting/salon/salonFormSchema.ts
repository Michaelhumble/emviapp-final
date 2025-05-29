
import { z } from "zod";

export const salonFormSchema = z.object({
  // Identity fields
  salonName: z.string().min(1, 'Salon name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  establishedYear: z.string().optional(),
  logo: z.any().optional(),

  // Location fields
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  neighborhood: z.string().optional(),
  hideExactAddress: z.boolean().default(false),

  // Financial/Business details
  askingPrice: z.string().min(1, 'Asking price is required'),
  monthlyRent: z.string().optional(),
  numberOfStaff: z.string().optional(),
  numberOfTables: z.string().optional(),
  numberOfChairs: z.string().optional(),
  squareFeet: z.string().optional(),
  revenue: z.string().optional(),
  monthlyRevenue: z.string().optional(),
  yearlyRevenue: z.string().optional(),
  grossRevenue: z.string().optional(),
  netProfit: z.string().optional(),
  
  // Descriptions and details
  vietnameseDescription: z.string().optional(),
  englishDescription: z.string().optional(),
  reasonForSelling: z.string().optional(),
  virtualTourUrl: z.string().optional(),
  
  // Features and amenities
  willTrain: z.boolean().default(false),
  hasHousing: z.boolean().default(false),
  hasWaxRoom: z.boolean().default(false),
  hasDiningRoom: z.boolean().default(false),
  hasLaundry: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  equipmentIncluded: z.boolean().default(false),
  leaseTransferable: z.boolean().default(false),
  sellerFinancing: z.boolean().default(false),
  
  // Pricing options
  selectedPricingTier: z.enum(['basic', 'gold', 'premium', 'annual']).default('basic'),
  featuredAddon: z.boolean().default(false),
  
  // Terms acceptance for final step
  termsAccepted: z.boolean().default(false),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
