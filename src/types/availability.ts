
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
