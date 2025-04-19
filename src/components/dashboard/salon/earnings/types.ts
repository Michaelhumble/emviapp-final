
export type SalonEarnings = {
  artist_id: string;
  artist_name: string;
  month: string;
  booking_count: number;
  total_revenue: number;
  artist_earnings: number;
};

export type MonthlyStats = {
  totalEarnings: number;
  totalBookings: number;
  artistPerformance: SalonEarnings[];
};
