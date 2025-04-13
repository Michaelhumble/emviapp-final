
export interface AvailabilityRecord {
  id?: string;
  user_id?: string;  // Make optional for new records
  artist_id?: string; // Add this to support the database schema
  role?: string;
  day_of_week: string; // Keep as string to match database
  start_time: string;
  end_time: string;
  location?: string | null;
  is_available?: boolean;
  created_at?: string;
}

export interface AvailabilityDay {
  day_of_week: number; // Keep as number for UI logic
  start_time: string;
  end_time: string;
  active: boolean;
  id?: string;
}
