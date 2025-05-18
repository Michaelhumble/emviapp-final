
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { beautySpecialties } from '@/data/specialties';

export const jobTemplates: Record<string, JobFormValues> = {
  nails: {
    title: "Nail Technician",
    description: "We are seeking experienced nail technicians to join our growing salon. You will provide high-quality nail services including manicures, pedicures, nail enhancements, and nail art.\n\nOur ideal candidate is detail-oriented, creative, and passionate about delivering exceptional service to clients.",
    vietnameseDescription: "Cần thợ nail có kinh nghiệm để tham gia vào tiệm đang phát triển của chúng tôi. Bạn sẽ cung cấp dịch vụ nail chất lượng cao bao gồm làm móng tay, móng chân, đắp móng, và vẽ móng nghệ thuật.\n\nỨng viên lý tưởng của chúng tôi là người chú trọng đến chi tiết, sáng tạo, và đam mê cung cấp dịch vụ tuyệt vời cho khách hàng.",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$800-1200/week",
    contactEmail: "",
    requirements: [
      "Valid nail technician license",
      "Minimum 1-2 years experience",
      "Proficient in acrylic, gel, and dip powder",
      "Excellent customer service skills",
      "Weekend availability required",
      "Bilingual (English/Vietnamese) preferred"
    ],
    specialties: [
      "Acrylic Nails",
      "Gel Manicures",
      "Dipping Powder",
      "Nail Art",
      "Pedicures"
    ]
  },
  hair: {
    title: "Hair Stylist",
    description: "Join our talented team of hair stylists! We are looking for passionate professionals who excel in cutting, coloring, and styling hair. You will provide consultations and exceptional hair services to our diverse clientele.\n\nWe value creativity, technical skill, and the ability to build strong client relationships.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$900-1400/week",
    contactEmail: "",
    requirements: [
      "Valid cosmetology license",
      "2+ years of salon experience",
      "Proficiency in cutting and coloring techniques",
      "Knowledge of current hair trends",
      "Strong communication skills",
      "Portfolio of work recommended"
    ],
    specialties: [
      "Hair Cutting",
      "Hair Coloring",
      "Balayage",
      "Blowouts",
      "Hair Treatments"
    ]
  },
  lashes: {
    title: "Lash Technician",
    description: "We are looking for a skilled lash technician to join our beauty team. You will provide premium eyelash extension services including classic, volume, and hybrid sets. The ideal candidate has excellent attention to detail and can create customized lash looks for clients.\n\nWe offer a supportive work environment and opportunities for growth.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$800-1200/week",
    contactEmail: "",
    requirements: [
      "Lash certification required",
      "1+ years experience applying lash extensions",
      "Knowledge of proper sanitation practices",
      "Ability to work efficiently with precision",
      "Good eye for symmetry and design",
      "Excellent client communication skills"
    ],
    specialties: [
      "Classic Lash Extensions",
      "Volume Lashes",
      "Hybrid Lashes",
      "Lash Lifts",
      "Lash Tinting"
    ]
  },
  barber: {
    title: "Barber",
    description: "We're seeking skilled barbers to join our modern barbershop. You will provide premium haircuts, beard trims, and hot towel shaves while delivering an exceptional client experience.\n\nThe ideal candidate has excellent technical skills and can establish rapport with a diverse clientele.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$900-1400/week",
    contactEmail: "",
    requirements: [
      "Valid barber license",
      "2+ years experience in a professional setting",
      "Proficient in modern cutting techniques",
      "Knowledge of current men's hair trends",
      "Experience with diverse hair textures",
      "Professional demeanor and communication skills"
    ],
    specialties: [
      "Classic Cuts",
      "Fades",
      "Beard Trims",
      "Hot Towel Shaves",
      "Hair Design"
    ]
  },
  skincare: {
    title: "Esthetician",
    description: "Join our spa team as a skilled esthetician. You will provide facial treatments, skincare consultations, and other aesthetic services to help clients achieve their skincare goals.\n\nWe're looking for someone knowledgeable about skincare products and procedures with excellent client communication skills.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$800-1200/week",
    contactEmail: "",
    requirements: [
      "Esthetician license required",
      "Minimum 1-2 years experience in spa setting",
      "Knowledge of skincare ingredients and treatments",
      "Experience with facial techniques and extractions",
      "Ability to personalize treatments for clients",
      "Professional and friendly demeanor"
    ],
    specialties: [
      "Facials",
      "Chemical Peels",
      "Microdermabrasion",
      "LED Therapy",
      "Anti-aging Treatments"
    ]
  },
  custom: {
    title: "",
    description: "",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    contactEmail: "",
    requirements: [],
    specialties: []
  }
};

export type JobTemplateType = keyof typeof jobTemplates;

export const getJobTemplate = (templateType: JobTemplateType): JobFormValues => {
  return {
    ...jobTemplates[templateType]
  };
};

export const convertToFormattedText = (items: string[] | undefined): string => {
  if (!Array.isArray(items) || items.length === 0) return '';
  return items.join('\n');
};

export const convertTextToArray = (text: string): string[] => {
  if (!text || text.trim() === '') return [];
  
  // Split by either newlines or commas
  const items = text.split(/\n|,/).map(item => item.trim());
  
  // Filter out empty items
  return items.filter(item => item !== '');
};
