
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

// Industry-specific job templates
export const jobTemplates: Record<string, Partial<JobFormValues>> = {
  nails: {
    title: "Nail Technician – Full Time",
    jobType: "full-time",
    location: "San Jose, CA",
    salary: "Up to $1,200/week",
    jobSummary: "Looking for a friendly, reliable nail tech with experience in dip, gel, and design. Great team, busy salon, weekly pay.",
  },
  hair: {
    title: "Hair Stylist Needed",
    jobType: "full-time",
    location: "",
    salary: "Competitive pay + tips",
    jobSummary: "Seeking experienced hair stylist with client following preferred. Friendly team environment with growth opportunities.",
  },
  tattoo: {
    title: "Tattoo Artist Position",
    jobType: "full-time",
    location: "",
    salary: "Commission-based",
    jobSummary: "Established tattoo studio looking for artists with strong portfolio. Must be reliable and have excellent customer service skills.",
  },
  eyebrowLash: {
    title: "Lash Technician Wanted",
    jobType: "full-time",
    location: "",
    salary: "Base + Commission",
    jobSummary: "Seeking certified lash technician with experience in volume and classic lashes. Professional environment with loyal clientele.",
  },
  massage: {
    title: "Licensed Massage Therapist",
    jobType: "part-time",
    location: "",
    salary: "Hourly + tips",
    jobSummary: "Looking for licensed massage therapist with experience in deep tissue and relaxation techniques. Flexible schedule available.",
  },
};

// Vietnamese translations for nail industry templates
export const vietnameseTemplates: Record<string, Partial<JobFormValues>> = {
  nails: {
    title: "Thợ Nail – Toàn Thời Gian",
    jobType: "full-time", 
    location: "San Jose, CA",
    salary: "Lên đến $1,200/tuần",
    jobSummary: "Cần thợ nail thân thiện, đáng tin cậy có kinh nghiệm làm bột, gel, và vẽ móng. Tiệm đông khách, môi trường làm việc tốt, trả lương hàng tuần.",
  }
};

// Get template merged with user information
export const getJobTemplate = (industry: string, userData?: { 
  phoneNumber?: string;
  email?: string;
}): Partial<JobFormValues> => {
  const template = jobTemplates[industry] || {};
  
  return {
    ...template,
    // Only include user contact info if available
    ...(userData?.phoneNumber ? { phoneNumber: userData.phoneNumber } : {}),
    ...(userData?.email ? { contactEmail: userData.email } : {})
  };
};

// Get Vietnamese template for the industry if available
export const getVietnameseTemplate = (industry: string): Partial<JobFormValues> | null => {
  return vietnameseTemplates[industry] || null;
};
