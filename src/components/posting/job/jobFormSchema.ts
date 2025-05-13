
import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  jobType: z.string(),
  salary: z.string().optional(),
  jobSummary: z.string().min(10, 'Job summary must be at least 10 characters'),
  fullDescription: z.string().min(20, 'Job description must be at least 20 characters'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters'),
  benefits: z.string().optional(),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  contactEmail: z.string().email('Invalid email').or(z.string().length(0)).optional(),
  contactName: z.string().min(2, 'Contact name is required'),
  pricingTier: z.enum(['standard', 'premium', 'diamond']),
  showAtTop: z.boolean().default(false),
  isHotListing: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  autoRenew: z.boolean().default(false),
  industry: z.string()
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
