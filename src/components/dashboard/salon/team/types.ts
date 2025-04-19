
export interface SalonTeamMember {
  id: string;
  full_name: string;
  role: string;
  specialty: string;
  status: 'active' | 'inactive' | 'pending';
  avatar_url?: string;
}
