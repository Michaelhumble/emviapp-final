
export const generatePromotionalText = (userRole: string | null) => {
  switch (userRole) {
    case 'artist':
    case 'nail technician/artist':
      return "Showcase your artistry to potential clients";
    case 'salon':
    case 'owner':
      return "Get more clients through your door";
    case 'vendor':
    case 'supplier':
    case 'beauty supplier':
      return "Reach more salons with your products";
    case 'freelancer':
      return "Find more clients for your services";
    default:
      return "Connect with more customers";
  }
};

export const getFirstPostPromotionalText = () => {
  return "First-time posters get a special discount!";
};

// Base pricing functions
export const getBasePrice = (postType: string, isFirstPost: boolean): number => {
  if (isFirstPost) {
    return 0; // First post is free
  }
  
  switch (postType) {
    case 'job':
      return 20;
    case 'salon':
      return 20;
    case 'booth':
      return 15;
    case 'supply':
      return 15;
    default:
      return 15;
  }
};

export const getNationwidePrice = (postType: string): number => {
  switch (postType) {
    case 'job':
      return 10;
    case 'salon':
      return 10;
    case 'booth':
      return 8;
    case 'supply':
      return 8;
    default:
      return 10;
  }
};

export const getFastSalePackagePrice = (postType: string): number => {
  switch (postType) {
    case 'job':
      return 15;
    case 'salon':
      return 30;
    case 'booth':
      return 10;
    case 'supply':
      return 10;
    default:
      return 15;
  }
};

export const getShowAtTopPrice = (postType: string): number => {
  switch (postType) {
    case 'job':
      return 12;
    case 'salon':
      return 15;
    case 'booth':
      return 10;
    case 'supply':
      return 10;
    default:
      return 12;
  }
};

export const getJobPostBundlePrice = (postType: string): number => {
  switch (postType) {
    case 'salon':
      return 10;
    case 'booth':
      return 12;
    default:
      return 10;
  }
};

export const getPriceWithDiscount = (price: number, hasReferrals: boolean): number => {
  if (hasReferrals) {
    return Math.round(price * 0.8); // 20% off for users with referrals
  }
  return price;
};

export const getRenewalPrice = (postType: string, isNationwide: boolean, fastSalePackage: boolean, bundleWithJobPost: boolean) => {
  let basePrice = 0;
  
  switch (postType) {
    case 'job':
      basePrice = 15;
      break;
    case 'salon':
      basePrice = 30;
      break;
    case 'booth':
      basePrice = 20;
      break;
    default:
      basePrice = 15;
  }
  
  if (isNationwide) basePrice += 10;
  if (fastSalePackage) basePrice += 7;
  if (bundleWithJobPost) basePrice += 12;
  
  return basePrice;
};

// Helper function for PaymentConfirmationModal
export const generatePromotionalText2 = (postType: string, stats: any, options: any): string => {
  if (options.isFirstPost) {
    return "Your first post is free! Future posts will help you grow your business even more.";
  }
  
  if (postType === 'job') {
    return "Hiring the right professionals will transform your business!";
  } else if (postType === 'salon') {
    return "The right buyer is looking for a salon just like yours!";
  } else if (postType === 'booth') {
    return "Fill your vacant booth with a talented artist quickly!";
  } else {
    return "Grow your business with EmviApp's specialized marketing tools!";
  }
};
