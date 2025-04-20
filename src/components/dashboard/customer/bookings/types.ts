
export interface CustomerBooking {
  id: string;
  created_at: string;
  date_requested?: string;
  time_requested?: string;
  status?: string;
  note?: string;
  service_id?: string;
  service?: {
    id: string;
    title: string;
    price: number;
  };
  artist?: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
}
