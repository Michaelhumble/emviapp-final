
export interface SalonListing {
  identity: {
    salonName: string;
    businessType: string;
    logo?: File;
    establishedYear?: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood?: string;
    hideAddressFromPublic: boolean;
  };
  photos: {
    photos: File[];
    coverPhotoIndex: number;
    virtualTourUrl?: string;
  };
  about: {
    description: string;
    reasonForSelling: string;
    ownerNote?: string;
    yearsInBusiness?: string;
  };
  performance: {
    annualRevenue: string;
    monthlyRent: string;
    averageClients: string;
    hideFinancialInfo: boolean;
    growthTrend?: "growing" | "stable" | "declining";
  };
  assets: {
    equipment: string[];
    equipmentValue?: string;
    staffCount?: string;
    staffIncluded: boolean;
    leaseDetails?: string;
  };
  promotion: {
    promotionTier: "standard" | "featured" | "premium" | "diamond";
    urgentListing: boolean;
    highlightColor?: string;
  };
  contactPrivacy: {
    showPhone: boolean;
    showEmail: boolean;
    requireNDA: boolean;
    preScreenBuyers: boolean;
    messagingPreference: "open" | "serious-inquiries" | "qualified-only";
  };
  askingPrice: string;
}

export interface SalonSectionProps {
  data: Partial<SalonListing>;
  onSubmit: (data: Partial<SalonListing>) => void;
  onPrevious?: () => void;
}
