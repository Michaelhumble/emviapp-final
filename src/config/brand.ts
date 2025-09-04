// Centralized brand configuration for EmviApp
export const BRAND_CONFIG = {
  // Basic Information
  name: "EmviApp",
  tagline: "The Beauty Industry's Missing Piece",
  description: "Premium beauty platform connecting professionals with opportunities worldwide",
  foundingDate: "2024",
  
  // Contact Information
  contact: {
    telephone: "+1-844-EMVIAPP", // +1-844-368-4277
    email: "hello@emvi.app",
    supportEmail: "support@emvi.app",
    areaServed: "US",
    contactType: "customer support"
  },

  // Address (Headquarters)
  address: {
    streetAddress: "1234 Innovation Drive",
    addressLocality: "San Francisco",
    addressRegion: "CA", 
    postalCode: "94105",
    addressCountry: "US"
  },

  // Geographic Coordinates (San Francisco HQ)
  geo: {
    latitude: 37.7749,
    longitude: -122.4194
  },

  // Digital Presence
  urls: {
    website: "https://www.emvi.app",
    logo: "https://www.emvi.app/icons/emvi-master-512.png",
    logoPng200: "https://www.emvi.app/icons/emvi-logo-200x200.png",
    favicon: "https://www.emvi.app/favicon.ico"
  },

  // Social Media & External Links
  sameAs: [
    "https://www.facebook.com/emviapp",
    "https://www.instagram.com/emviapp", 
    "https://www.tiktok.com/@emviapp",
    "https://www.youtube.com/@emviapp",
    "https://www.linkedin.com/company/emviapp",
    "https://www.crunchbase.com/organization/emviapp" // When ready
  ],

  // Business Operations
  business: {
    priceRange: "$$",
    openingHours: [
      "Mo-Fr 09:00-18:00", // Business hours for support
      "Sa 10:00-16:00"
    ],
    servicesProvided: [
      "Beauty Professional Staffing",
      "Beauty Job Marketplace", 
      "Salon Management Platform",
      "Beauty Industry Networking"
    ],
    targetMarket: "Beauty Industry Professionals"
  },

  // Brand Colors (for potential schema images)
  colors: {
    primary: "#8B5CF6", // purple-500
    secondary: "#F59E0B", // amber-500  
    accent: "#EF4444" // red-500
  }
} as const;

// Helper to get full logo URL
export const getLogoUrl = (size: 'default' | '200x200' = 'default') => {
  return size === '200x200' ? BRAND_CONFIG.urls.logoPng200 : BRAND_CONFIG.urls.logo;
};

// Helper to get formatted address
export const getFormattedAddress = () => {
  const { streetAddress, addressLocality, addressRegion, postalCode } = BRAND_CONFIG.address;
  return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
};

// Helper to get business hours for schema
export const getOpeningHoursSpecification = () => {
  return [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ];
};