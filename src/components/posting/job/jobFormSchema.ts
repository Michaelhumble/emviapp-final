
import { z } from 'zod';

// Define the basic job form schema
export const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email").optional(),
  phoneNumber: z.string().optional(),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  requirements: z.array(z.string()).optional(),
  
  // Add additional fields to ensure all form data is properly validated
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  vietnamese_description: z.string().optional(),
  has_housing: z.boolean().optional(),
  weekly_pay: z.boolean().optional(),
  owner_will_train: z.boolean().optional(),
  no_supply_deduction: z.boolean().optional(),
  has_wax_room: z.boolean().optional(),
  contact_info: z.object({
    owner_name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Please enter a valid email").optional(),
    notes: z.string().optional(),
    zalo: z.string().optional()
  }).optional()
});

// Export the type for use in components
export type JobFormValues = z.infer<typeof jobFormSchema>;
