
import { Megaphone, Briefcase, ShoppingBag } from "lucide-react";
import { CreditOption } from "./types";

export const creditOptions: CreditOption[] = [
  {
    id: "profileBoost",
    title: "Profile Boost",
    description: "Promote your profile to the top of search results for 7 days",
    creditCost: 10,
    icon: Megaphone,
    actionText: "Boost My Profile"
  },
  {
    id: "jobPost",
    title: "Free Job Post",
    description: "Post a job listing without paying the regular posting fee",
    creditCost: 15,
    icon: Briefcase,
    actionText: "Post a Job for Free"
  },
  {
    id: "marketplace",
    title: "Marketplace Access",
    description: "Get exclusive access to special deals in the beauty marketplace",
    creditCost: 20,
    icon: ShoppingBag,
    actionText: "Unlock Marketplace Access",
    comingSoon: true
  }
];
