
import { z } from "zod";

export const salonFormSchema = z.object({
  salonName: z.string().min(1, "Salon name is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  askingPrice: z.string().min(1, "Asking price is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  numberOfStaff: z.string().min(1, "Number of staff is required"),
  squareFeet: z.string().optional(),
  revenue: z.string().optional(),
  reasonForSelling: z.string().min(10, "Please provide a reason for selling"),
  vietnameseDescription: z.string().optional(),
  englishDescription: z.string().min(10, "English description is required"),
  willTrain: z.boolean().default(false),
  isNationwide: z.boolean().default(false),
  fastSalePackage: z.boolean().default(false),
  hasHousing: z.boolean().default(false),
  hasWaxRoom: z.boolean().default(false),
  hasDiningRoom: z.boolean().default(false),
  hasLaundry: z.boolean().default(false),
  // Vietnamese salon specific fields
  numberOfTables: z.string().default("4"),
  numberOfChairs: z.string().default("9"),
  neighborhood: z.string().optional(),
  specialNotes: z.string().optional(),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
