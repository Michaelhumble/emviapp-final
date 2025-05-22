
import { z } from 'zod';

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare' | 'barber' | 'makeup' | 'custom';

export const jobFormSchema = z.object({
  salonName: z.string().min(2, { message: 'Salon name is required' }),
  title: z.string().min(2, { message: 'Job title is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(2, { message: 'Location is required' }),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary']).optional(),
  
  // Ensure these are always arrays
  specialties: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  
  // Contact information
  contactName: z.string().min(2, { message: 'Contact name is required' }),
  contactEmail: z.string().email({ message: 'Valid email is required' }),
  contactPhone: z.string().optional(),
  
  // Compensation details
  compensation_type: z.enum(['hourly', 'commission', 'salary', 'booth-rental', 'per-service']).optional(),
  compensation_details: z.string().optional(),
  weekly_pay: z.string().optional(),
  
  // Additional job features
  has_housing: z.boolean().default(false),
  has_wax_room: z.boolean().default(false),
  owner_will_train: z.boolean().default(false),
  no_supply_deduction: z.boolean().default(false),
  
  // Additional fields
  salary_range: z.string().optional(),
  experience_level: z.string().optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
