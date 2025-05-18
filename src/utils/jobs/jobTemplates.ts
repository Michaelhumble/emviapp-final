import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export type JobTemplateType = 
  | "nails" 
  | "hair" 
  | "lashes" 
  | "barber" 
  | "skincare" 
  | "spa" 
  | "receptionist" 
  | "manager" 
  | "massage" 
  | "tattoo" 
  | "makeup" 
  | "booth" 
  | "beauty" 
  | "custom";

/**
 * Returns a job posting template based on the selected industry type
 */
export const getJobTemplate = (templateType: JobTemplateType): JobFormValues => {
  switch (templateType) {
    case "nails":
      return {
        title: "Nail Technician",
        description: "We are seeking a skilled Nail Technician to join our team. The ideal candidate will have experience in manicures, pedicures, and nail art. Must be licensed and able to provide excellent customer service.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một Kỹ thuật viên Nail có kỹ năng để tham gia vào nhóm của chúng tôi. Ứng viên lý tưởng sẽ có kinh nghiệm về manicure, pedicure và nail art. Phải có giấy phép và có thể cung cấp dịch vụ khách hàng xuất sắc.",
        location: "",
        compensation_details: "Competitive pay + tips",
        salary_range: "$25-35/hour depending on experience and clientele",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["License required", "Experience with acrylics, gel, and dipping powder", "Customer service skills"],
        specialties: ["Acrylic", "Gel", "Nail Art", "Pedicure"],
        templateType: "nails"
      };
    case "hair":
      return {
        title: "Hair Stylist",
        description: "Join our salon as a Hair Stylist! We're looking for talented stylists with cutting, coloring, and styling experience. Must be able to build and maintain a client base.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Commission-based with product bonuses",
        salary_range: "50-60% commission",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Cosmetology license required", "Minimum 2 years experience", "Portfolio recommended"],
        specialties: ["Haircuts", "Color", "Balayage", "Blowouts"],
        templateType: "hair"
      };
    case "lashes":
      return {
        title: "Lash Technician",
        description: "We are looking for a skilled Lash Technician to provide eyelash extensions and lash services. Certification and experience required.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly or commission-based",
        salary_range: "$20-30/hour or 50% commission",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Lash certification", "1+ year experience", "Knowledge of lash styles"],
        specialties: ["Eyelash Extensions", "Lash Lifts", "Lash Tinting"],
        templateType: "lashes"
      };
    case "barber":
      return {
        title: "Barber",
        description: "Skilled barber needed for busy shop. Must excel in men's cuts, fades, beard trims, and traditional hot towel shaves. Good communication skills essential.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive booth rental or commission options available",
        salary_range: "60% commission or $150-200/week booth rental",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Barber license", "2+ years experience", "Own basic tools"],
        specialties: ["Fades", "Beard Grooming", "Hot Towel Shaves", "Men's Styling"],
        templateType: "barber"
      };
    case "skincare":
      return {
        title: "Esthetician",
        description: "Experienced Esthetician needed for upscale spa. Provide facials, skin treatments, and skincare consultations. Strong product knowledge and attention to detail required.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly + commission on services and products",
        salary_range: "$18-25/hour plus commission",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Esthetician license", "Experience with various skin types", "Product knowledge"],
        specialties: ["Facials", "Chemical Peels", "Microdermabrasion", "Skin Analysis"],
        templateType: "skincare"
      };
    case "spa":
      return {
        title: "Spa Technician",
        description: "Join our spa team as a Spa Technician! We're looking for professionals skilled in body treatments, wraps, and therapeutic services. Certification required.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly + tips",
        salary_range: "$17-23/hour + tips",
        jobType: "part-time",
        experience_level: "entry",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Certification in massage or related field", "Customer service skills"],
        specialties: ["Body Wraps", "Massage", "Facials"],
        templateType: "spa"
      };
    case "receptionist":
      return {
        title: "Salon Receptionist",
        description: "We are seeking a Salon Receptionist to manage scheduling, client check-ins, and salon operations. Must have excellent communication and organizational skills.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly wage",
        salary_range: "$15-18/hour",
        jobType: "full-time",
        experience_level: "entry",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["High school diploma", "Customer service experience", "Basic computer skills"],
        specialties: ["Scheduling", "Customer Service", "Cash Handling"],
        templateType: "receptionist"
      };
    case "manager":
      return {
        title: "Salon Manager",
        description: "Experienced Salon Manager needed to oversee salon operations and team leadership. Must have strong management and customer service skills.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Salary + bonuses",
        salary_range: "$40,000 - $60,000/year",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Management experience", "Customer service skills", "Knowledge of salon operations"],
        specialties: ["Team Leadership", "Customer Service", "Inventory Management"],
        templateType: "manager"
      };
    case "massage":
      return {
        title: "Massage Therapist",
        description: "Licensed Massage Therapist needed for spa and wellness center. Provide massage and bodywork services. Must have excellent communication skills.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Commission-based",
        salary_range: "50-60% commission",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Massage license", "Customer service skills"],
        specialties: ["Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage"],
        templateType: "massage"
      };
    case "tattoo":
      return {
        title: "Tattoo Artist",
        description: "Skilled Tattoo Artist needed for busy studio. Must have strong portfolio and tattooing expertise.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Commission-based",
        salary_range: "50-70% commission",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Tattoo license", "Strong portfolio"],
        specialties: ["Tattooing", "Custom Designs"],
        templateType: "tattoo"
      };
    case "makeup":
      return {
        title: "Makeup Artist",
        description: "We are seeking a skilled Makeup Artist to provide makeup application for various occasions. Must have experience with different makeup styles.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly or commission-based",
        salary_range: "$18-25/hour or 40-50% commission",
        jobType: "part-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Makeup artistry experience", "Knowledge of different makeup styles"],
        specialties: ["Bridal Makeup", "Special Effects Makeup", "Editorial Makeup"],
        templateType: "makeup"
      };
    case "booth":
      return {
        title: "Booth Rental Available",
        description: "Booth rental space available for independent beauty professionals. Great location and amenities.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Weekly or monthly rental fee",
        salary_range: "$150-250/week",
        jobType: "contract",
        experience_level: "any",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: ["Cosmetology license"],
        specialties: [],
        templateType: "booth"
      };
    case "beauty":
      return {
        title: "Other Beauty Professional",
        description: "Seeking beauty professionals for specialized services such as microblading, threading, or waxing.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Varies",
        salary_range: "Varies",
        jobType: "contract",
        experience_level: "any",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [],
        specialties: [],
        templateType: "beauty"
      };
    case "custom":
    default:
      return {
        title: "",
        description: "",
        vietnameseDescription: "",
        location: "",
        compensation_details: "",
        salary_range: "",
        jobType: "full-time",
        experience_level: "entry",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [],
        specialties: [],
        templateType: "custom"
      };
  }
};
