
export interface BoostStatus {
  isActive: boolean;
  expiresAt: string | null;
}

export interface CreditOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>; // Changed from ReactNode to ComponentType
  credits: number;
  actionType: string;
  disabled?: boolean;
  featured?: boolean;
  duration?: number; // In days
}
