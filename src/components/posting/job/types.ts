
import { z } from 'zod';
import { jobFormSchema } from './jobFormSchema';

export interface JobTemplateOption {
  id: string;
  label: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultType?: string;
}

export interface JobType {
  value: string;
  label: string;
}

export interface PolishedDescription {
  title: string;
  description: string;
}

export interface PolishedDescriptions {
  nail: PolishedDescription[];
  hair: PolishedDescription[];
  spa: PolishedDescription[];
  other: PolishedDescription[];
}

export type JobFormValues = z.infer<typeof jobFormSchema>;
