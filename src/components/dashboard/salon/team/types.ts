
export type SalonTeamMember = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  specialty: string;
  status: 'active' | 'inactive' | 'pending';
  joined_at: string;
  avatar_url?: string;
  commission_rate?: number;
  salon_id: string;
};
