
export interface AvailabilityRecord {
  id?: string;
  user_id: string;
  role?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  location?: string | null;
  created_at?: string;
}

export interface AvailabilityDay {
  day_of_week: number;
  start_time: string;
  end_time: string;
  active: boolean;
  id?: string;
}
