
import { z } from 'zod';

// Define the basic job form schema
export const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  jobSummary: z.string().optional(),
  heartfeltMessage: z.string().optional(),
  isUrgent: z.boolean().default(false)
});

// Export the type for use in components
export type JobFormValues = z.infer<typeof jobFormSchema>;
