
import { z } from "zod";

export const salonFormSchema = z.object({
  salonName: z.string().min(1, "Salon name is required"),
  businessType: z.string().min(1, "Business type is required"),
  establishedYear: z.string().optional(),
  logo: z.any().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().optional(),
  neighborhood: z.string().optional(),
  hideExactAddress: z.boolean().default(false),
  askingPrice: z.string().min(1, "Asking price is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  numberOfStaff: z.string().min(1, "Number of staff is required"),
  numberOfTables: z.string().min(1, "Số bàn is required").default("4"),
  numberOfChairs: z.string().min(1, "Số ghế is required").default("9"),
  squareFeet: z.string().optional(),
  revenue: z.string().optional(),
  reasonForSelling: z.string().min(10, "Please provide a reason for selling"),
  vietnameseDescription: z.string().optional(),
  englishDescription: z.string().min(10, "English description is required"),
  virtualTourUrl: z.string().optional(),
  willTrain: z.boolean().default(false),
  isNationwide: z.boolean().default(false),
  fastSalePackage: z.boolean().default(false),
  hasHousing: z.boolean().default(false),
  hasWaxRoom: z.boolean().default(false),
  hasDiningRoom: z.boolean().default(false),
  hasLaundry: z.boolean().default(false),
  specialNotes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

export type SalonFormValues = z.infer<typeof salonFormSchema>;
