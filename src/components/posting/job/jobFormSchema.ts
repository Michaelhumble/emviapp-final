
export interface JobFormValues {
  title: string;
  description?: string;
  vietnameseDescription?: string;
  location: string;
  compensation_details?: string;
  salary_range?: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'temporary' | 'commission';
  experience_level: 'entry' | 'intermediate' | 'experienced' | 'senior';
  contactEmail: string;
  requirements?: string[] | string;
  industry?: IndustryType;
}

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'brows' | 'skincare' | 'tattoo' | '';

export interface JobTemplate {
  id: string;
  title: string;
  industry: IndustryType;
  location: string;
  description: string[];
  requirements: string[];
  experience_level: 'entry' | 'intermediate' | 'experienced' | 'senior';
  employment_type: 'full-time' | 'part-time' | 'contract' | 'temporary' | 'commission';
  salary_range: string;
  popularity?: 'high' | 'medium' | 'low';
  vietnameseTitle?: string;
  vietnameseDescription?: string[];
  vietnameseRequirements?: string[];
}
