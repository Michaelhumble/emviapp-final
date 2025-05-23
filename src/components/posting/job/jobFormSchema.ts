
import { z } from 'zod';

// Define industry types
export type IndustryType = 'nails' | 'hair' | 'lashes' | 'barber' | 'skincare' | 'spa' | 'receptionist' | 'manager' | 'massage' | 'tattoo' | 'makeup' | 'booth' | 'beauty' | 'custom';

// Define job types
export type JobType = 'full-time' | 'part-time' | 'contract' | 'temporary';

// Define compensation types
export type CompensationType = 'hourly' | 'commission' | 'salary' | 'hybrid';

// Define template category
export type TemplateCategory = 'nails' | 'hair' | 'lashes' | 'barber' | 'skincare' | 'spa' | 'massage' | 'tattoo' | 'makeup' | 'reception' | 'management' | 'custom';

// Define job template type
export type JobTemplateType = IndustryType;

// Define contact info schema to match JobDetailsSubmission
const contactInfoSchema = z.object({
  owner_name: z.string().min(1, { message: 'Contact name is required' }),
  email: z.string().email({ message: 'Must be a valid email' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  notes: z.string().optional(),
  zalo: z.string().optional(),
});

// Define the schema for job form validation
export const jobFormSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required' }),
  salonName: z.string().min(1, { message: 'Salon name is required' }),
  description: z.string().min(1, { message: 'Job description is required' }),
  vietnamese_description: z.string().optional(),
  location: z.string().min(1, { message: 'Location is required' }),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary']).default('full-time'),
  compensation_type: z.enum(['hourly', 'commission', 'salary', 'hybrid']).optional(),
  compensation_details: z.string().optional(),
  weekly_pay: z.boolean().default(false),
  has_housing: z.boolean().default(false),
  has_wax_room: z.boolean().default(false),
  owner_will_train: z.boolean().default(false),
  no_supply_deduction: z.boolean().default(false),
  contactName: z.string().min(1, { message: 'Contact name is required' }),
  contactEmail: z.string().email({ message: 'Must be a valid email' }),
  contactPhone: z.string().min(1, { message: 'Phone number is required' }),
  // For optional contact fields
  contactNotes: z.string().optional(),
  contactZalo: z.string().optional(),
  // Map to nested contact_info in JobDetailsSubmission
  contact_info: contactInfoSchema.optional(),
  requirements: z.array(z.string()).or(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  salary_range: z.string().optional(),
  experience_level: z.string().optional(),
  industry: z.string().optional(), // Store the selected template industry
  templateType: z.string().optional(), // Store the selected template type
  // Additional fields from JobDetailsSubmission
  employment_type: z.string().optional(), // This is redundant with jobType but included for mapping
  preferred_languages: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  salon_type: z.string().optional(),
  tip_range: z.string().optional(),
  is_urgent: z.boolean().optional(),
  user_id: z.string().optional(),
  post_type: z.string().optional(),
}).refine((data) => {
  // Additional validation to ensure contactName/Email/Phone are correctly filled
  // This is needed during the transition to using contact_info
  return data.contactName && data.contactEmail && data.contactPhone;
}, {
  message: "Contact information is required",
  path: ["contactName"] // Show the error on the contactName field
});

// Infer TypeScript type from schema
export type JobFormValues = z.infer<typeof jobFormSchema>;

// Define the job template interface to match the actual templates structure
export interface JobTemplate {
  id: string;
  title: string;
  industry: TemplateCategory;
  salonName: string;
  description: string;
  vietnamese_description: string;
  location: string;
  jobType: JobType;
  compensation_type: CompensationType;
  compensation_details: string;
  weekly_pay: boolean;
  has_housing: boolean;
  has_wax_room: boolean;
  owner_will_train: boolean;
  no_supply_deduction: boolean;
  salary_range?: string;
  experience_level?: string;
  requirements: string[];
  specialties: string[];
  thumbnailUrl?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}
