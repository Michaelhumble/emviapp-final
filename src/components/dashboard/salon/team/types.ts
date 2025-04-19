export type SalonStaffRole = 'owner' | 'manager' | 'technician' | 'receptionist' | 'front_desk';

export interface SalonTeamMember {
  id: string;
  full_name: string;
  email: string;
  role: SalonStaffRole;
  specialty?: string;
  status: 'active' | 'inactive' | 'pending';
  avatar_url?: string;
  joined_at: string;
  invitation_sent_at?: string;
  commission_rate?: number;
  salon_id: string;
}

export interface TeamMemberFormData {
  full_name: string;
  email: string;
  role: SalonStaffRole;
  specialty?: string;
  commission_rate?: number;
}

