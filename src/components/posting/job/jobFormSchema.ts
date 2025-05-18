
import { z } from 'zod';

// Define the experience level options as a union type to ensure type safety
export type ExperienceLevelType = 'entry' | 'intermediate' | 'experienced' | 'senior';
export type JobTypeOption = 'full-time' | 'part-time' | 'contract' | 'temporary' | 'commission';

// Define the job form schema using Zod
export const jobFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').optional(),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  compensation_details: z.string().optional(),
  salary_range: z.string().optional(),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary', 'commission']),
  experience_level: z.enum(['entry', 'intermediate', 'experienced', 'senior']),
  contactEmail: z.string().email('Please enter a valid email address'),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  templateType: z.string().optional()
});

// Define the type for the form values based on the schema
export type JobFormValues = z.infer<typeof jobFormSchema>;
