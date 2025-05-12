
import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(5, "Job title is required and must be at least 5 characters"),
  location: z.string().min(3, "Location is required"),
  employmentType: z.enum(["full-time", "part-time", "contract", "booth-rental"]),
  compensation: z.string().min(2, "Compensation details are required"),
  description: z.string().min(10, "Job description is required and should be detailed"),
  phoneNumber: z.string().optional(),
  contactEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;
