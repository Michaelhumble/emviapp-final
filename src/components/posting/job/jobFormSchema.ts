
import { z } from 'zod';

// Define the schema for job form validation
export const jobFormSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required' }),
  salonName: z.string().min(1, { message: 'Salon name is required' }),
  description: z.string().min(1, { message: 'Job description is required' }),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(1, { message: 'Location is required' }),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary']).default('full-time'),
  compensation_type: z.enum(['hourly', 'commission', 'salary', 'hybrid']).default('hourly'),
  compensation_details: z.string().optional(),
  weekly_pay: z.boolean().default(false),
  has_housing: z.boolean().default(false),
  has_wax_room: z.boolean().default(false),
  owner_will_train: z.boolean().default(false),
  no_supply_deduction: z.boolean().default(false),
  contactName: z.string().min(1, { message: 'Contact name is required' }),
  contactEmail: z.string().email({ message: 'Must be a valid email' }),
  contactPhone: z.string().min(1, { message: 'Phone number is required' }),
  requirements: z.array(z.string()).or(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  salary_range: z.string().optional(),
  experience_level: z.string().optional(),
});

// Infer TypeScript type from schema
export type JobFormValues = z.infer<typeof jobFormSchema>;
