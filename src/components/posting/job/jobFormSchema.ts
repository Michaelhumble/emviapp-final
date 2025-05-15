
import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(2, { message: 'Title is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  location: z.string().min(2, { message: 'Location is required' }),
  type: z.string().min(1, { message: 'Job type is required' }),
  compensation: z.string().optional(),
  contactEmail: z.string().email({ message: 'Please enter a valid email address' }),
  contactPhone: z.string().min(7, { message: 'Please enter a valid phone number' }),
  isUrgent: z.boolean().default(false),
  template: z.string().optional(),
  perks: z.array(z.string()).optional(),
  summary: z.string().optional(),
  
  // Additional fields from the provided schema
  shortSummary: z.string().optional(),
  payWeekly: z.boolean().optional(),
  provideLunch: z.boolean().optional(),
  qualityProducts: z.boolean().optional(),
  reviewBonuses: z.boolean().optional(),
  flexibleHours: z.boolean().optional(),
  growthOpportunities: z.boolean().optional(),
  
  // Enhancement options from Yes Ladder
  enhancementOptions: z.record(z.boolean()).optional()
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
