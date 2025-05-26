
import { z } from "zod";

export const salonFormSchema = z.object({
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Business type is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  askingPrice: z.string().min(1, "Asking price is required"),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
