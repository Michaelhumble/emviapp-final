
export interface CustomerBooking {
  id: string;
  created_at: string;
  date_requested?: string | null;
  time_requested?: string | null;
  status?: string;
  note?: string;
  service_id?: string;
  service?: {
    id: string;
    title: string;
    price: number;
  } | null;
  artist?: {
    id: string;
    full_name: string;
    avatar_url?: string;
  } | null;
}

