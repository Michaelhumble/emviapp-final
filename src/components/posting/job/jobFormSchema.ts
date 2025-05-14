
import { z } from "zod";

export const jobFormSchema = z.object({
  summary: z.string().optional(),
  template: z.string().optional(),
  title: z
    .string()
    .min(3, {
      message: "Job title must be at least 3 characters.",
    })
    .max(100),
  type: z
    .string()
    .min(1, {
      message: "Please select a job type.",
    }),
  location: z
    .string()
    .min(2, {
      message: "Please enter a valid location.",
    })
    .max(100),
  compensation: z.string().optional(),
  isUrgent: z.boolean().default(false),
  description: z
    .string()
    .min(10, {
      message: "Job description must be at least 10 characters.",
    }),
  contactEmail: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    }),
  contactPhone: z
    .string()
    .min(7, {
      message: "Please enter a valid phone number.",
    }),
  payWeekly: z.boolean().default(false),
  provideLunch: z.boolean().default(false),
  qualityProducts: z.boolean().default(false),
  flexibleHours: z.boolean().default(false),
  reviewBonuses: z.boolean().default(false),
  growthOpportunities: z.boolean().default(false),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
