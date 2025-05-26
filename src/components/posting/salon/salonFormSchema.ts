
import { z } from "zod";

export const salonFormSchema = z.object({
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  establishedYear: z.string().optional(),
  logo: z.any().optional(),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
