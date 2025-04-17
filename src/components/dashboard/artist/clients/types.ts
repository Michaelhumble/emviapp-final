
export interface BookingHistoryItem {
  id: string;
  date?: string | null;
  service: string;
  price: number;
  status?: string;
}

export interface ClientData {
  id: string;
  name: string;
  phone: string;
  notes: string;
  visitCount: number;
  lastVisit?: string | null;
  totalSpent: number;
  bookingHistory: BookingHistoryItem[];
  isManualEntry?: boolean;
}

// Add new type for the artist_clients table
export interface ArtistClientRow {
  id: string;
  artist_id: string;
  name: string;
  phone: string | null;
  notes: string | null;
  created_at: string;
}
