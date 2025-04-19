
export interface SalonTeamMember {
  id: string;
  full_name: string;
  email: string;
  role: string;
  specialty: string;
  status: 'active' | 'inactive' | 'pending';
  joined_at: string;  // Making this required to match the types
  invitation_sent_at?: string;
  avatar_url?: string;
  commission_rate?: number;
  salon_id: string;  // Making this required to match the types
}

export type TeamMemberFormData = {
  full_name: string;
  email: string;
  role: string;
  specialty?: string;
  commission_rate?: number;
};
