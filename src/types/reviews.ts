
export interface Review {
  id: string;
  booking_id: string;
  artist_id: string;
  customer_id: string;
  salon_id?: string;
  rating: number;
  comment?: string;
  created_at: string;
  reported: boolean;
  status: 'active' | 'hidden' | 'reported';
}

export interface ArtistRating {
  average_rating: number;
  review_count: number;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}
