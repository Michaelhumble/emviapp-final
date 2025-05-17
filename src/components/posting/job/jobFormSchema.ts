
import { z } from 'zod';

// Define the base schema for a job posting
export const jobFormSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  location: z.string().min(3),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship']),
  salary_range: z.string().optional(),
  contactEmail: z.string().email(),
  experience_level: z.enum(['entry-level', 'intermediate', 'experienced', 'senior']).optional(),
  requirements: z.array(z.string()).optional(),
});

// Export the TypeScript type for the form values
export type JobFormValues = z.infer<typeof jobFormSchema>;

// Define the industry types for job templates
export type IndustryType = 'nail' | 'hair' | 'spa' | 'beauty' | 'makeup' | 'other';

// Define the job template data structure
export interface JobTemplate {
  id: string;
  icon: string;
  title: string;
  description: string;
  industry: IndustryType;
  template: Partial<JobFormValues>;
}
