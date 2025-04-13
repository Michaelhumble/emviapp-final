
export interface AvailabilityRecord {
  id?: string;
  user_id?: string;
  artist_id: string; // Required field
  role?: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  location?: string | null;
  is_available?: boolean;
  created_at?: string;
}

export interface AvailabilityDay {
  id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  active: boolean;
  location?: string | null;
}

// Simple interface for booking response
export interface BookingResponse {
  id: string;
  customer_id: string;
  provider_id: string;
  service_id?: string;
  service_name?: string;
  date: string;
  time: string;
  duration?: number;
  status: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  customer_name?: string;
  provider_name?: string;
  service_type?: string;
  recipient_id?: string;
  users?: {
    full_name: string;
  } | null;
}
