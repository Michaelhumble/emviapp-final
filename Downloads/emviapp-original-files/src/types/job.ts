
export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  description: string;
  salary: string;
  employment_type: string;
  posted_date: string;
  application_deadline?: string;
  tags?: string[];
}
