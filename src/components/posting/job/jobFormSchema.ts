
import { z } from 'zod';

// Define the basic job form schema
export const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  location: z.string().min(2, "Location is required"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  salary: z.string().optional(),
  jobSummary: z.string().optional(),
  fullDescription: z.string().min(20, "Please provide a detailed description"),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  pricingTier: z.enum(["standard", "featured", "premium", "gold"]),
  showAtTop: z.boolean().default(false),
  isHotListing: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  autoRenew: z.boolean().default(false),
  industry: z.string().default("nails")
});

// Export the type for use in components
export type JobFormValues = z.infer<typeof jobFormSchema>;
