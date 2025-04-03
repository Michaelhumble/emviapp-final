
export interface Job {
  id: string;
  title: string;
  compensation_type: string;
  compensation_details: string;
  created_at: string;
  expires_at: string;
  status: string;
  requirements?: string;
  description?: string;
  salon_id?: string;
  updated_at?: string;
  _count?: {
    applications: number;
  }
  is_sample?: boolean;
}
