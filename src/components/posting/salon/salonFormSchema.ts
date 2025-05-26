
import { z } from "zod";

export const salonFormSchema = z.object({
  // Identity fields (for /sell-salon wizard)
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  establishedYear: z.string().optional(),
  logo: z.any().optional(),
  
  // Location fields
  city: z.string().optional(),
  state: z.string().optional(),
  
  // Financial fields
  askingPrice: z.string().optional(),
  monthlyRent: z.string().optional(),
  revenue: z.string().optional(),
  
  // Physical details
  squareFeet: z.string().optional(),
  numberOfStaff: z.string().optional(),
  
  // Description fields
  englishDescription: z.string().optional(),
  vietnameseDescription: z.string().optional(),
  reasonForSelling: z.string().optional(),
  
  // Features/Amenities
  willTrain: z.boolean().optional(),
  hasHousing: z.boolean().optional(),
  hasWaxRoom: z.boolean().optional(),
  hasDiningRoom: z.boolean().optional(),
  hasLaundry: z.boolean().optional(),
  
  // Marketing options
  isNationwide: z.boolean().optional(),
  fastSalePackage: z.boolean().optional(),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
