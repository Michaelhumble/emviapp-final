
import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export interface DescriptionTemplate {
  id: string;
  title: string;
  description: string;
  vietnameseDescription?: string;
}

export interface IndustryTemplates {
  industry: string;
  templates: DescriptionTemplate[];
}

// Empty templates file - feature removed
export const jobDescriptionTemplates: IndustryTemplates[] = [];
