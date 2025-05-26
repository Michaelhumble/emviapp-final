
import { z } from "zod";

export const salonFormSchema = z.object({
  // Identity fields (Step 1)
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  establishedYear: z.string().optional(),
  logo: z.any().optional(),
  
  // Location fields (Step 2)
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  neighborhood: z.string().optional(),
  hideExactAddress: z.boolean().optional(),
  
  // Description & Financial fields (Step 3)
  askingPrice: z.string().optional(),
  monthlyRent: z.string().optional(),
  revenue: z.string().optional(),
  squareFeet: z.string().optional(),
  numberOfStaff: z.string().optional(),
  virtualTourUrl: z.string().url().optional().or(z.literal("")),
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
  
  // Payment & Terms (Step 5)
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
