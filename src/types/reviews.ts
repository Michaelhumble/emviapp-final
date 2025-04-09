
export interface Review {
  id: string;
  booking_id?: string;
  artist_id?: string;
  salon_id?: string;
  customer_id?: string;
  customer_name?: string;
  rating: number;
  comment?: string;
  artist_response?: string;
  status?: 'active' | 'inactive' | 'reported' | 'deleted';
  reported?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ArtistRating {
  average_rating: number;
  review_count: number;
}
