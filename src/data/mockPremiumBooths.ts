
// Import the proper Job type
import { Job } from '@/types/job';

// Define a compatible mock function that doesn't use problematic properties
export const createMockPremiumBooths = (): Job[] => {
  return [
    {
      id: "booth-1",
      title: "Nail Booth for Rent - Luxury Salon",
      company: "Diamond Nails & Spa",
      location: "Los Angeles, CA",
      employment_type: "booth-rental",
      description: "Premium booth available in high-end salon. Great location with steady clientele. Includes all utilities.",
      compensation_details: "$200/week",
      created_at: "2023-08-15T00:00:00.000Z",
      contact_info: {
        owner_name: "Lisa Wang",
        phone: "310-555-9876",
        email: "lisa@diamondnails.com"
      },
      requirements: "Licensed nail technician, professional attitude, reliable",
      benefits: "Free parking, flexible hours, walk-in clients",
      is_featured: true,
      isPremium: true
    },
    {
      id: "booth-2",
      title: "Nail Station Rental - Busy Location",
      company: "Glamour Nails",
      location: "San Francisco, CA",
      employment_type: "booth-rental",
      description: "Booth rental available in busy downtown location. High foot traffic and established clientele.",
      compensation_details: "$250/week",
      created_at: "2023-08-10T00:00:00.000Z",
      contact_info: {
        owner_name: "Michael Chen",
        phone: "415-555-3344",
        email: "michael@glamournails.com"
      },
      requirements: "Valid license, 2+ years experience",
      benefits: "Product discount, walk-in clients, flexible schedule",
      is_featured: true,
      isPremium: true
    }
  ];
};

export const mockPremiumBooths = createMockPremiumBooths();
