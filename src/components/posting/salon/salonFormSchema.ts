
import { z } from "zod";

export const salonFormSchema = z.object({
  // Basic Information
  salonName: z.string().min(1, "Salon name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  
  // Contact Information
  contactNotes: z.string().optional(),
  
  // Location Details
  neighborhood: z.string().optional(),
  
  // Business Details
  businessType: z.string().optional(),
  establishedYear: z.string().optional(),
  logo: z.string().optional(),
  
  // Financial Information
  askingPrice: z.string().min(1, "Asking price is required"),
  monthlyRent: z.string().optional(),
  revenue: z.string().optional(),
  numberOfStaff: z.string().optional(),
  
  // Physical Details
  squareFeet: z.string().optional(),
  
  // Descriptions
  englishDescription: z.string().min(1, "English description is required"),
  vietnameseDescription: z.string().optional(),
  reasonForSelling: z.string().optional(),
  virtualTourUrl: z.string().optional(),
  
  // Features (booleans)
  willTrain: z.boolean().default(false),
  hasHousing: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  equipmentIncluded: z.boolean().default(false),
  leaseTransferable: z.boolean().default(false),
  sellerFinancing: z.boolean().default(false),
  hasWaxRoom: z.boolean().default(false),
  hasDiningRoom: z.boolean().default(false),
  hasLaundry: z.boolean().default(false),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
