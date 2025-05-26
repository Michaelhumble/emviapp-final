
import { z } from "zod";

export const salonFormSchema = z.object({
  // Step 1: Identity
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  establishedYear: z.string().optional(),
  logo: z.any().optional(),
  
  // Step 2: Location
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  neighborhood: z.string().optional(),
  hideAddressFromPublic: z.boolean().default(false),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
