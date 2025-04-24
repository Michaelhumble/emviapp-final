
import React from 'react';
import { UserRole } from '@/context/auth/types';
import { User, Scissors, Building2, Briefcase, ShoppingBag, HelpCircle } from 'lucide-react';

export interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export const roleOptions: RoleOption[] = [
  {
    id: "customer",
    label: "Customer",
    description: "I'm looking for beauty services",
    icon: <User className="h-5 w-5 text-indigo-500" />
  },
  {
    id: "artist",
    label: "Beauty Artist",
    description: "I provide beauty services",
    icon: <Scissors className="h-5 w-5 text-indigo-500" />
  },
  {
    id: "salon",
    label: "Salon Owner",
    description: "I own a salon or beauty business",
    icon: <Building2 className="h-5 w-5 text-indigo-500" />
  },
  {
    id: "freelancer",
    label: "Freelancer",
    description: "I offer freelance beauty services",
    icon: <Briefcase className="h-5 w-5 text-indigo-500" />
  },
  {
    id: "supplier",
    label: "Beauty Supplier",
    description: "I sell beauty products or supplies",
    icon: <ShoppingBag className="h-5 w-5 text-indigo-500" />
  },
  {
    id: "other",
    label: "Other",
    description: "None of the above fits my role",
    icon: <HelpCircle className="h-5 w-5 text-indigo-500" />
  }
];
