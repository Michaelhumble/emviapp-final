export interface Location {
  lat: number | null;
  lng: number | null;
  address?: string | null;
}

export interface OpeningTime {
  day: string;
  open: string;
  close: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  title?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  location?: Location;
  salonName?: string;
  boothRental?: boolean;
  specialties?: string[];
  services?: string[];
  gallery?: string[];
  resume?: string;
  certifications?: string[];
  yearsOfExperience?: number;
  hourlyRate?: number;
  openingTimes?: OpeningTime[];
  profile_views?: number;
}
