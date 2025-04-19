
export type SalonTeamMember = {
  id: string;
  full_name: string;
  email: string;
  role: 'owner' | 'manager' | 'technician';
  specialty?: string; // Made optional to match the other definition
  status: 'active' | 'inactive' | 'pending';
  avatar_url?: string;
  joined_at: string;
  invitation_sent_at?: string;
  commission_rate?: number;
  salon_id: string;
};
