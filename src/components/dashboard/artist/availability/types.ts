
export interface AvailabilityDay {
  id?: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface TimeOffPeriod {
  id?: string;
  start_date: Date;
  end_date: Date;
  reason?: string;
}
