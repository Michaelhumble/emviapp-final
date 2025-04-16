
export interface Appointment {
  id: string;
  artist_id: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  is_manual?: boolean;
  services: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
  };
}
