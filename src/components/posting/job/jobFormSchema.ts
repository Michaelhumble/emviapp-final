
import { z } from 'zod';

// Define types for the job form
export type JobType = 'full-time' | 'part-time' | 'contract' | 'temporary';
export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare' | 'barber' | 'makeup';
export type CompensationType = 'hourly' | 'salary' | 'commission' | 'hybrid';

// Export the job template types that include all fields
export type JobTemplate = {
  salonName: string;
  title: string;
  description: string;
  vietnameseDescription?: string;
  location: string;
  jobType: string;
  specialties?: string[];
  requirements?: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  compensation_type: string;
  compensation_details?: string;
  weekly_pay?: boolean;
  has_housing?: boolean;
  has_wax_room?: boolean;
  owner_will_train?: boolean;
  no_supply_deduction?: boolean;
  salary_range?: string;
  experience_level?: string;
  industry: IndustryType;
  compensationMin?: string | number;
  compensationMax?: string | number;
  isNationwide?: boolean;
  isRemote?: boolean;
  templateType?: string;
};

// Define the schema for the job form
export const jobFormSchema = z.object({
  title: z.string().optional(),
  salonName: z.string().optional(),
  description: z.string().optional(),
  vietnameseDescription: z.string().optional(),
  location: z.string().optional(),
  jobType: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  weekly_pay: z.boolean().optional().default(false),
  has_housing: z.boolean().optional().default(false),
  has_wax_room: z.boolean().optional().default(false),
  owner_will_train: z.boolean().optional().default(false),
  no_supply_deduction: z.boolean().optional().default(false),
  salary_range: z.string().optional(),
  experience_level: z.string().optional(),
  industry: z.string().optional(),
  compensationMin: z.union([z.string(), z.number()]).optional(),
  compensationMax: z.union([z.string(), z.number()]).optional(),
  isNationwide: z.boolean().optional().default(false),
  isRemote: z.boolean().optional().default(false),
  templateType: z.string().optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
