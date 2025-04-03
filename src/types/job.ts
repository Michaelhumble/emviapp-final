
export interface Job {
  id: string;
  created_at: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  description: string;
  requirements?: string;
  weekly_pay: boolean;
  owner_will_train: boolean;
  employment_type: string;
  user_id: string;
  is_nationwide?: boolean;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  company_description?: string;
  contact_info?: {
    phone?: string;
    email?: string;
  };
  trust_indicators?: {
    verified: boolean;
    activelyHiring: boolean;
    chatAvailable: boolean;
  };
}
