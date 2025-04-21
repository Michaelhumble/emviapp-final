
import { UserRole } from "@/context/auth/types";
import { User, Scissors, Building2, Briefcase, ShoppingBag, HelpCircle } from "lucide-react";
import React from "react";

export type RoleOption = {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
};

export const roleOptions: RoleOption[] = [
  {
    id: "customer",
    label: "Customer",
    description: "I'm looking for beauty services and offers from top professionals.",
    icon: React.createElement(User, { className: "h-5 w-5 text-primary" })
  },
  {
    id: "artist",
    label: "Artist (Hair, Brows, Lashes, Nails, Tattoo...)",
    description: "I'm a beauty professional looking for jobs, exposure, or to build my brand.",
    icon: React.createElement(Scissors, { className: "h-5 w-5 text-primary" })
  },
  {
    id: "salon",
    label: "Salon Owner (Business)",
    description: "I'm a salon owner hiring, managing my team, or selling my salon.",
    icon: React.createElement(Building2, { className: "h-5 w-5 text-primary" })
  },
  {
    id: "freelancer",
    label: "Freelancer (Makeup Artist, Photographer, etc.)",
    description: "I'm a solo artist looking for gigs, clients, or to promote my service.",
    icon: React.createElement(Briefcase, { className: "h-5 w-5 text-primary" })
  },
  {
    id: "supplier",
    label: "Vendor (Beauty Supplier)",
    description: "I sell products or tools for beauty salons and professionals.",
    icon: React.createElement(ShoppingBag, { className: "h-5 w-5 text-primary" })
  },
  {
    id: "other",
    label: "Other",
    description: "I'm not sure yet — I just want to explore.",
    icon: React.createElement(HelpCircle, { className: "h-5 w-5 text-primary" })
  }
];
