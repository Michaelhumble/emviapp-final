
import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export type JobTemplateType = 
  | "nail-tech" 
  | "hair-stylist" 
  | "esthetician" 
  | "massage-therapist" 
  | "waxing-specialist"
  | "custom";

export interface JobTemplate extends JobFormValues {
  templateType: string;
}

// Default templates for different job types
export const nailTechTemplate: JobFormValues = {
  title: "Nail Technician",
  description: "Looking for an experienced nail technician to join our team. Must be skilled in acrylic, gel, and regular manicures.",
  vietnameseDescription: "Tìm thợ nail có kinh nghiệm. Cần biết làm bột, gel, và sơn thường.",
  location: "",
  jobType: "Full-time",
  compensation_type: "Commission",
  compensation_details: "50-60% commission based on experience",
  salary_range: "",
  experience_level: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  weekly_pay: true,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: true,
  specialties: ["acrylic", "gel", "manicure", "pedicure"],
  requirements: ["license", "experience", "english"],
  templateType: "nail-tech",
  image: "",
};

export const hairStylistTemplate: JobFormValues = {
  title: "Hair Stylist",
  description: "Seeking professional hair stylist with experience in cuts, color, and styling. Must have a strong portfolio.",
  vietnameseDescription: "Cần thợ tóc có kinh nghiệm cắt, nhuộm và tạo kiểu. Cần có portfolio đẹp.",
  location: "",
  jobType: "Full-time",
  compensation_type: "Hourly + Commission",
  compensation_details: "$15/hr plus 30% commission on services",
  salary_range: "",
  experience_level: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  weekly_pay: true,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  specialties: ["haircut", "color", "balayage", "styling"],
  requirements: ["license", "portfolio", "experience"],
  templateType: "hair-stylist",
  image: "",
};

export const estheticianTemplate: JobFormValues = {
  title: "Esthetician",
  description: "Looking for a licensed esthetician with experience in facials, chemical peels, and skin treatments.",
  vietnameseDescription: "Cần thợ skin care có bằng và kinh nghiệm về facial, chemical peel, và các liệu pháp chăm sóc da.",
  location: "",
  jobType: "Full-time",
  compensation_type: "Hourly + Commission",
  compensation_details: "Base pay plus commission on treatments",
  salary_range: "",
  experience_level: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  weekly_pay: true,
  has_housing: false,
  has_wax_room: true,
  owner_will_train: false,
  no_supply_deduction: false,
  specialties: ["facial", "peel", "skincare"],
  requirements: ["license", "experience"],
  templateType: "esthetician",
  image: "",
};

export const massageTherapistTemplate: JobFormValues = {
  title: "Massage Therapist",
  description: "Seeking licensed massage therapist with experience in various massage techniques including Swedish, deep tissue, and hot stone.",
  vietnameseDescription: "Cần thợ massage có bằng và kinh nghiệm về các kỹ thuật massage như Swedish, deep tissue, và hot stone.",
  location: "",
  jobType: "Part-time",
  compensation_type: "Hourly + Commission",
  compensation_details: "$25-35/hr based on experience plus tips",
  salary_range: "",
  experience_level: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  weekly_pay: true,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  specialties: ["swedish", "deep tissue", "hot stone"],
  requirements: ["license", "certification"],
  templateType: "massage-therapist",
  image: "",
};

export const waxingSpecialistTemplate: JobFormValues = {
  title: "Waxing Specialist",
  description: "Looking for waxing specialist with experience in all types of waxing services.",
  vietnameseDescription: "Cần thợ wax có kinh nghiệm về tất cả các loại dịch vụ wax.",
  location: "",
  jobType: "Full-time",
  compensation_type: "Commission",
  compensation_details: "50% commission on all services",
  salary_range: "",
  experience_level: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  weekly_pay: true,
  has_housing: false,
  has_wax_room: true,
  owner_will_train: false,
  no_supply_deduction: false,
  specialties: ["waxing", "brazilian", "eyebrow"],
  requirements: ["license", "experience"],
  templateType: "waxing-specialist",
  image: "",
};

export const customTemplate: JobFormValues = {
  title: "",
  description: "",
  vietnameseDescription: "",
  location: "",
  jobType: "Full-time",
  compensation_type: "Commission",
  compensation_details: "",
  salary_range: "",
  experience_level: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  specialties: [],
  requirements: [],
  templateType: "custom",
  image: "",
};

// Function to get a template by type
export const getJobTemplateByType = (templateType: JobTemplateType): JobFormValues => {
  switch (templateType) {
    case "nail-tech":
      return nailTechTemplate;
    case "hair-stylist":
      return hairStylistTemplate;
    case "esthetician":
      return estheticianTemplate;
    case "massage-therapist":
      return massageTherapistTemplate;
    case "waxing-specialist":
      return waxingSpecialistTemplate;
    case "custom":
    default:
      return customTemplate;
  }
};
