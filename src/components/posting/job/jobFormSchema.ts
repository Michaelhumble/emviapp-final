
import { z } from "zod";

// Define the job form schema
export const jobFormSchema = z.object({
  template: z.string().optional(),
  title: z.string().optional(),
  type: z.string().min(1, { message: "Job type is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  compensation: z.string().optional(),
  isUrgent: z.boolean().default(false),
  summary: z.string().optional(),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().min(7, { message: "Please enter a valid phone number" }),
  payWeekly: z.boolean().default(false),
  provideLunch: z.boolean().default(false),
  qualityProducts: z.boolean().default(false),
  flexibleTime: z.boolean().default(false),
  growthOpportunity: z.boolean().default(false),
  reviewBonuses: z.boolean().default(false),
  images: z.array(z.string()).optional(),
  // Optional fields for form handling
  employment_type: z.string().optional(),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
});

// Export the type for use in components
export type JobFormValues = z.infer<typeof jobFormSchema>;
