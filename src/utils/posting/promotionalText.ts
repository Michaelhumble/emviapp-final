
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
