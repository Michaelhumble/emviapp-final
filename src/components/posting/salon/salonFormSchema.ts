
import { z } from "zod";

// Define form schema with zod
export const salonFormSchema = z.object({
  salonName: z.string().min(2, {
    message: "Salon name must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  askingPrice: z.string().min(1, {
    message: "Asking price is required.",
  }),
  monthlyRent: z.string().optional(),
  numberOfStaff: z.string().min(1, {
    message: "Number of staff is required.",
  }),
  revenue: z.string().optional(),
  vietnameseDescription: z.string().min(10, {
    message: "Vietnamese description must be at least 10 characters.",
  }),
  englishDescription: z.string().min(10, {
    message: "English description must be at least 10 characters.",
  }),
  willTrain: z.boolean().default(false),
  isNationwide: z.boolean().default(false),
  fastSalePackage: z.boolean().default(false),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
