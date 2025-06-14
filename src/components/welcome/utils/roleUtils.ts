
import { UserRole } from "@/context/auth/types";

export const getRoleDisplayName = (userRole: UserRole = 'customer') => {
  switch(userRole) {
    case 'artist':
      return "Beauty Professional";
    case 'nail technician/artist':
      return "Nail Technician/Artist";
    case 'owner':
      return "Salon Owner";
    case 'renter':
      return "Booth Renter";
    case 'supplier':
      return "Supplier";
    case 'beauty supplier':
      return "Beauty Supplier";
    case 'freelancer':
      return "Freelancer";
    case 'salon':
      return "Salon Business";
    case 'customer':
      return "Beauty Enthusiast";
    default:
      return "EmviApp User";
  }
};

export const getWelcomeMessage = (userRole: UserRole = 'customer') => {
  switch(userRole) {
    case 'artist':
    case 'nail technician/artist':
      return "Your artistic journey starts here. Find amazing opportunities and showcase your talent.";
    case 'owner':
    case 'salon':
      return "Grow your salon business with powerful tools designed for success.";
    case 'renter':
      return "Maximize your booth rental income and build your client base with EmviApp.";
    case 'supplier':
    case 'beauty supplier':
      return "Connect with salons and professionals looking for quality products like yours.";
    case 'freelancer':
      return "Build your independent career with tools designed for success on your own terms.";
    case 'customer':
      return "Discover talented professionals and amazing salons for your beauty needs.";
    default:
      return "Explore a world of beauty connections and opportunities.";
  }
};

export const getWelcomeImage = (userRole: UserRole = 'customer') => {
  switch(userRole) {
    case 'artist':
    case 'nail technician/artist':
      return "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png";
    case 'renter':
      return "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png";
    case 'owner':
    case 'salon':
      return "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png";
    case 'supplier':
    case 'beauty supplier':
      return "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png";
    case 'freelancer':
      return "/lovable-uploads/1763ca30-ecb0-409f-8bb0-11b851ea743f.png";
    case 'customer':
      return "/lovable-uploads/f6bb9656-c400-4f28-ba97-69d71c651a97.png";
    default:
      return "/lovable-uploads/8c7d4688-5f67-42e1-952b-1e4eb4bd4679.png";
  }
};
