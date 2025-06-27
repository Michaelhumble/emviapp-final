
import { Job } from "@/types/job";

export const bilingualJobs: Job[] = [
  {
    id: "bilingual-1",
    title: "Nail Technician Needed - Vietnamese & English",
    role: "Nail Technician",
    company: "Luxury Nails Spa",
    location: "Houston, TX",
    employment_type: "Full-time",
    description: "Seeking bilingual nail technician fluent in Vietnamese and English. Experience with gel, acrylic, and nail art required.",
    contact_info: {
      owner_name: "Linda Nguyen",
      phone: "(713) 555-0123",
      email: "hiring@luxurynails.com"
    },
    requirements: ["2+ years experience", "Vietnamese & English fluency", "Valid nail technician license"],
    specialties: ["Gel manicures", "Acrylic nails", "Nail art"],
    salary_range: "$15-25/hour + tips",
    created_at: "2024-01-15T10:00:00Z",
    category: "Nail Tech"
  },
  {
    id: "bilingual-2", 
    title: "Hair Stylist - Korean Speaking Preferred",
    role: "Hair Stylist",
    company: "Seoul Beauty Salon",
    location: "Los Angeles, CA",
    employment_type: "Full-time",
    description: "Hair stylist position available. Korean language skills preferred but not required. Experience with Asian hair textures a plus.",
    contact_info: {
      owner_name: "Sarah Kim",
      phone: "(213) 555-0456",
      email: "careers@seoulbeauty.com"
    },
    requirements: ["Valid cosmetology license", "3+ years experience", "Color and cut expertise"],
    specialties: ["Hair coloring", "Asian hair techniques", "Keratin treatments"],
    salary_range: "$20-30/hour + commission",
    created_at: "2024-01-14T14:30:00Z",
    category: "Hair Stylist"
  },
  {
    id: "bilingual-3",
    title: "Lash Technician - Spanish/English",
    role: "Lash Technician", 
    company: "Bella Lashes Studio",
    location: "Miami, FL",
    employment_type: "Part-time",
    description: "Part-time lash technician needed. Must be fluent in Spanish and English to serve our diverse clientele.",
    contact_info: {
      owner_name: "Maria Rodriguez",
      phone: "(305) 555-0789",
      email: "info@bellalashes.com"
    },
    requirements: ["Lash extension certification", "Spanish & English fluency", "Flexible schedule"],
    specialties: ["Classic lashes", "Volume lashes", "Lash lifts"],
    salary_range: "$18-25/hour",
    created_at: "2024-01-13T09:15:00Z",
    category: "Lash Tech"
  }
];
