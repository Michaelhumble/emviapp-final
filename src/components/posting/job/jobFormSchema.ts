
import { z } from 'zod';

// Define IndustryType enum that can be exported and used in other files
export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare' | 'barber' | 'makeup';

export const jobFormSchema = z.object({
  // Basic Job Info
  title: z.string().min(2, { message: "Job title is required" }),
  jobType: z.string().min(1, { message: "Job type is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  
  // Job Description
  description: z.string().optional(),
  vietnameseDescription: z.string().optional(),
  
  // Compensation
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  salary_range: z.string().optional(),
  tip_range: z.string().optional(),
  weekly_pay: z.boolean().optional(),
  
  // Job Features
  has_housing: z.boolean().optional(),
  has_wax_room: z.boolean().optional(),
  no_supply_deduction: z.boolean().optional(),
  owner_will_train: z.boolean().optional(),
  
  // Contact Info
  contactName: z.string().min(1, { message: "Contact name is required" }),
  contactPhone: z.string().min(7, { message: "Valid phone number is required" }),
  contactEmail: z.string().email({ message: "Valid email address is required" }),
  
  // Optional fields
  salonName: z.string().optional(),
  experience_level: z.string().optional(),
  is_urgent: z.boolean().optional(),
  
  // Required fields that were causing errors
  requirements: z.array(z.string()).or(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  
  // Template metadata (used in job templates but not stored in the database)
  templateType: z.string().optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
