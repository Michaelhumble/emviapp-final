
export type TeamMember = {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  role: string;
  specialty?: string;
  status?: 'active' | 'inactive' | 'pending';
  joined_at?: string;
};
