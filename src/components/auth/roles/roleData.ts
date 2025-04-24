
import { UserRole } from '@/context/auth/types';
import { User, Scissors, Building2, Briefcase, ShoppingBag, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const roleOptions: RoleOption[] = [
  {
    id: 'customer' as UserRole,
    label: "Customer",
    description: "I'm looking for beauty services",
    icon: User
  },
  {
    id: 'artist' as UserRole,
    label: "Beauty Artist",
    description: "I provide beauty services",
    icon: Scissors
  },
  {
    id: 'salon' as UserRole,
    label: "Salon Owner",
    description: "I own a salon or beauty business",
    icon: Building2
  },
  {
    id: 'freelancer' as UserRole,
    label: "Freelancer",
    description: "I offer freelance beauty services",
    icon: Briefcase
  },
  {
    id: 'supplier' as UserRole,
    label: "Beauty Supplier",
    description: "I sell beauty products or supplies",
    icon: ShoppingBag
  },
  {
    id: 'other' as UserRole,
    label: "Other",
    description: "None of the above fits my role",
    icon: HelpCircle
  }
];
