
import { Megaphone, Briefcase, ShoppingBag } from "lucide-react";
import { CreditOption } from "./types";

export const creditOptions: CreditOption[] = [
  {
    id: "profileBoost",
    title: "Profile Boost",
    description: "Promote your profile to the top of search results for 7 days",
    credits: 10,
    icon: Megaphone,
    actionType: "profileBoost"
  },
  {
    id: "jobPost",
    title: "Free Job Post",
    description: "Post a job listing without paying the regular posting fee",
    credits: 15,
    icon: Briefcase,
    actionType: "jobPost"
  },
  {
    id: "marketplace",
    title: "Marketplace Access",
    description: "Get exclusive access to special deals in the beauty marketplace",
    credits: 20,
    icon: ShoppingBag,
    actionType: "marketplace",
    disabled: true
  }
];
