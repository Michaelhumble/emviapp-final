
import { SubscriptionPlan } from "./types";

// Base plans with common features for all roles
export const basePlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tier: "free",
    features: [
      "Create a basic profile",
      "Browse public listings",
      "Limited messaging",
      "Community access"
    ]
  },
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    tier: "basic",
    features: [
      "Create a professional profile",
      "Browse all listings",
      "Full messaging system",
      "Save favorites",
      "Contact business owners"
    ]
  },
  {
    id: "pro",
    name: "Professional",
    price: 19.99,
    tier: "professional",
    features: [
      "Everything in Basic",
      "Featured profile listing",
      "Priority matching",
      "Advanced analytics",
      "Client management tools"
    ],
    recommended: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 29.99,
    tier: "premium",
    features: [
      "Everything in Professional",
      "Verified profile badge",
      "Marketing toolkit",
      "Priority support",
      "Email notifications",
      "AI-powered recommendations"
    ]
  },
  {
    id: "diamond",
    name: "Diamond Exclusive",
    price: 9999,
    tier: "diamond",
    features: [
      "Everything in Premium",
      "VIP Premium Placement",
      "Personal Account Manager",
      "Custom Branding Options",
      "Unlimited Featured Listings",
      "Advanced Analytics Dashboard",
      "Priority Phone Support",
      "Exclusive Industry Events",
      "White-glove Service",
      "Custom Integration Support"
    ]
  }
];

// Role-specific plans with customized features
export const getPlansForRole = (role?: string): SubscriptionPlan[] => {
  const plans = [...basePlans];
  
  switch(role) {
    case 'artist':
    case 'nail technician/artist':
      plans[1].features.push("Apply to unlimited jobs");
      plans[2].features.push("Featured in artist search");
      plans[3].features.push("Booking management system");
      break;
    case 'owner':
    case 'salon':
      plans[1].features.push("Post up to 3 jobs");
      plans[2].features.push("Post unlimited jobs");
      plans[3].features.push("Premium salon listing");
      break;
    case 'freelancer':
      plans[1].features.push("Apply to unlimited gigs");
      plans[2].features.push("Custom portfolio page");
      plans[3].features.push("Early access to new gigs");
      break;
    case 'supplier':
    case 'beauty supplier':
      plans[1].features.push("List up to 10 products");
      plans[2].features.push("List up to 50 products");
      plans[3].features.push("Unlimited product listings");
      break;
    case 'customer':
      plans[1].features.push("No booking fees");
      plans[2].features.push("Priority appointments");
      plans[3].features.push("Member-only discounts");
      break;
    default:
      // Default plans for 'other' or undefined role
      break;
  }
  
  return plans;
};
