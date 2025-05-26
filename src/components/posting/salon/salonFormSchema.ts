
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
  
  // Step 3: Description
  salonDescription: z.string()
    .min(30, "Description must be at least 30 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  askingPrice: z.string().min(1, "Asking price is required"),
  reasonForSelling: z.string()
    .max(300, "Reason must not exceed 300 characters")
    .optional(),
  virtualTourUrl: z.string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  // Step 4: Photos
  photos: z.array(z.any()).min(1, "At least one photo is required").max(10, "Maximum 10 photos allowed"),
  coverPhotoIndex: z.number().min(0).default(0),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
