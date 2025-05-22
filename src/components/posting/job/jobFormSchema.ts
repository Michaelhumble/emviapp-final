
import { z } from "zod";

// Define types for specific fields
export type IndustryType = 'nails' | 'hair' | 'lashes' | 'barber' | 'skincare' | 'microblading' | 'makeup' | 'custom' | string;

// Define the overall form schema
export const jobFormSchema = z.object({
  // Basic job info
  title: z.string().min(2, "Job title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(2, "Location must be at least 2 characters"),
  
  // Industry & specialties
  industryType: z.string().min(1, "Please select an industry"),
  specialties: z.array(z.string()).optional(),
  
  // Job type & compensation
  jobType: z.enum(["full-time", "part-time", "contract", "temporary", "commission"]),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  weekly_pay: z.boolean().optional(),
  
  // Requirements & benefits
  requirements: z.array(z.string()).optional(),
  preferred_languages: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  has_housing: z.boolean().optional(),
  has_wax_room: z.boolean().optional(),
  owner_will_train: z.boolean().optional(),
  no_supply_deduction: z.boolean().optional(),
  
  // New fields to match what's being used in the templates
  experience_level: z.string().optional(),
  salary_range: z.string().optional(),
  
  // Contact info
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email").optional(),
});

// Export the inferred type
export type JobFormValues = z.infer<typeof jobFormSchema>;
