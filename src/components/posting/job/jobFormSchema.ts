
import { z } from 'zod';

// Job form schema with proper validation
export const jobSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required' }),
  template: z.string().optional(),
  location: z.string().min(1, { message: 'Location is required' }),
  type: z.string(),
  compensation: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  contactEmail: z.string().email({ message: 'Please enter a valid email address' }),
  contactPhone: z.string().min(1, { message: 'Phone number is required' }),
  isUrgent: z.boolean().default(false),
  shortSummary: z.string().optional(),
  payWeekly: z.boolean().optional().default(false),
  provideLunch: z.boolean().optional().default(false),
  qualityProducts: z.boolean().optional().default(false),
  reviewBonuses: z.boolean().optional().default(false),
  flexibleHours: z.boolean().optional().default(false),
  growthOpportunities: z.boolean().optional().default(false),
  images: z.array(z.instanceof(File)).optional(),
});

// TypeScript type derived from the schema
export type JobFormValues = z.infer<typeof jobSchema>;
