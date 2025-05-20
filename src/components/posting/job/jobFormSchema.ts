
import { z } from "zod";

export const jobFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  jobType: z.string().optional(),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  salary_range: z.string().optional(),
  experience_level: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactZalo: z.string().optional(),
  salonName: z.string().min(2, "Salon name must be at least 2 characters"),
  weekly_pay: z.boolean().optional().default(false),
  has_housing: z.boolean().optional().default(false),
  has_wax_room: z.boolean().optional().default(false),
  owner_will_train: z.boolean().optional().default(false),
  no_supply_deduction: z.boolean().optional().default(false),
  specialties: z.array(z.string()).optional(),
  requirements: z.union([z.string(), z.array(z.string())]).optional(),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;

export const JobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "For Sale",
  "Looking for Work",
] as const;

export type JobType = typeof JobTypes[number];

export const IndustryTypes = [
  "nails",
  "hair",
  "lashes",
  "massage",
  "tattoo",
  "brows",
  "skincare",
  "barber",
  "makeup",
] as const;

export type IndustryType = typeof IndustryTypes[number];
