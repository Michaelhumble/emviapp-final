
import { z } from "zod";

export const salonFormSchema = z.object({
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  askingPrice: z.string().min(1, "Price is required"),
  monthlyRent: z.string().optional(),
  numberOfStaff: z.string().optional(),
  squareFeet: z.string().optional(),
  revenue: z.string().optional(),
  reasonForSelling: z.string().optional(),
  vietnameseDescription: z.string().optional(),
  englishDescription: z.string().optional(),
  willTrain: z.boolean().default(false),
  isNationwide: z.boolean().default(false),
  fastSalePackage: z.boolean().default(false),
  hasHousing: z.boolean().default(false),
  hasWaxRoom: z.boolean().default(false),
  hasDiningRoom: z.boolean().default(false),
  hasLaundry: z.boolean().default(false),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
