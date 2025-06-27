
// Import necessary types
import { Job } from '@/types/job';

// 🚨 DO NOT REMOVE, HIDE, OR EDIT THESE MOCKUP LISTINGS.
// These demo/sample listings must remain visible in production until at least June 26, 2026.
// Only the project owner (Michael) can approve any removal or update of these mockups.

// Create a compatible mock function that doesn't use problematic properties
export const createMockPremiumJobs = (): Job[] => {
  return [
    {
      id: "prem-job-1",
      title: "Senior Nail Technician",
      company: "Luxury Nails & Spa",
      location: "Los Angeles, CA",
      employment_type: "full-time",
      description: "Join our luxury nail salon! We're seeking an experienced nail technician with at least 3 years of experience. Must be proficient in gel, acrylic, and nail art.",
      compensation_details: "$25-35/hr + tips",
      created_at: "2023-08-15T00:00:00.000Z",
      contact_info: {
        owner_name: "Hiring Manager",
        email: "hiring@luxurynailsspa.com",
        phone: "310-555-1234"
      },
      requirements: ["3+ years experience", "nail art skills", "customer service excellence"],
      benefits: ["Healthcare", "paid time off", "flexible scheduling", "product discounts"],
      is_featured: true,
      featured: true, // Using the proper field in the Job type
      category: "Nail Tech"
    },
    {
      id: "prem-job-2",
      title: "Nail Salon Manager",
      company: "Elegant Nails",
      location: "San Francisco, CA",
      employment_type: "full-time",
      description: "Seeking an experienced salon manager to oversee daily operations, staff management, and customer service excellence. Must have previous management experience in the beauty industry.",
      compensation_details: "$50,000-$65,000/year",
      created_at: "2023-08-10T00:00:00.000Z",
      contact_info: {
        owner_name: "Careers Team",
        email: "careers@elegantnails.com",
        phone: "415-555-6789"
      },
      requirements: ["5+ years nail industry experience", "2+ years management", "bilingual preferred"],
      benefits: ["Competitive salary", "health insurance", "paid vacation", "commission structure"],
      is_featured: true,
      featured: true, // Using the proper field in the Job type
      category: "Nail Tech"
    },
    {
      id: "prem-job-3",
      title: "Nail Technician - New Location",
      company: "Diamond Nails",
      location: "San Diego, CA",
      employment_type: "full-time",
      description: "Brand new upscale salon seeking talented nail technicians for our grand opening. Experience with luxury services and high-end clientele preferred.",
      compensation_details: "$20-30/hr + tips",
      created_at: "2023-08-05T00:00:00.000Z",
      contact_info: {
        owner_name: "Hiring Team",
        email: "jobs@diamondnails.com",
        phone: "619-555-4321"
      },
      requirements: ["2+ years experience", "exceptional customer service", "specialized in luxury services"],
      benefits: ["Flexible schedule", "product discounts", "growth opportunities", "training provided"],
      is_featured: true,
      featured: true, // Using the proper field in the Job type
      category: "Nail Tech"
    }
  ];
};

export const mockPremiumJobs = createMockPremiumJobs();

// Additional processing functions if needed (modify these to avoid using problematic properties)
export const processPremiumJobs = () => {
  return mockPremiumJobs.map(job => {
    return {
      ...job,
      processedTitle: `${job.title} - ${job.company}`,
      processedLocation: `${job.location}`,
    };
  });
};
