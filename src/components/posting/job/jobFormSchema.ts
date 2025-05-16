
import { z } from 'zod';

// Define the basic job form schema
export const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary", "commission", "booth-rental", "freelance"]),
  requirements: z.array(z.string()).optional(),
  experience_level: z.enum(["entry", "intermediate", "experienced"]).optional()
});

// Export the type for use in components
export type JobFormValues = z.infer<typeof jobFormSchema>;
