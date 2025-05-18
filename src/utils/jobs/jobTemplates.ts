
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
  spa: {
    title: "Spa Technician",
    description: "We're looking for a dedicated spa technician to join our wellness team. You will provide a range of spa services including body treatments, wraps, scrubs, and relaxation therapies.\n\nThe ideal candidate has a calming presence and understands how to create a tranquil experience for clients.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$800-1200/week",
    contactEmail: "",
    requirements: [
      "Spa therapy certification required",
      "1+ years experience in spa setting",
      "Knowledge of various body treatments",
      "Understanding of aromatherapy principles",
      "Excellent client communication skills",
      "Professional and calming demeanor"
    ],
    specialties: [
      "Body Treatments",
      "Hot Stone Therapy",
      "Body Wraps",
      "Aromatherapy",
      "Relaxation Techniques"
    ]
  },
  receptionist: {
    title: "Salon Receptionist",
    description: "We're seeking a friendly, organized salon receptionist to manage our front desk operations. You will handle scheduling, client check-ins, phone calls, and retail sales while maintaining a welcoming salon environment.\n\nThe ideal candidate has excellent people skills and thrives in a fast-paced setting.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "beginner",
    salary_range: "$15-20/hour",
    contactEmail: "",
    requirements: [
      "High school diploma or equivalent",
      "Previous customer service experience preferred",
      "Proficiency with scheduling software",
      "Strong communication skills",
      "Multi-tasking abilities",
      "Professional appearance and positive attitude"
    ],
    specialties: [
      "Client Relations",
      "Appointment Scheduling",
      "Retail Sales",
      "Payment Processing",
      "Salon Management Systems"
    ]
  },
  manager: {
    title: "Salon Manager",
    description: "We're looking for an experienced salon manager to oversee daily operations and lead our team to success. You'll manage staff, monitor inventory, implement marketing strategies, and ensure exceptional client experiences.\n\nThe ideal candidate has leadership skills and a passion for the beauty industry.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "advanced",
    salary_range: "$50,000-65,000/year",
    contactEmail: "",
    requirements: [
      "3+ years salon management experience",
      "Strong leadership and team-building skills",
      "Experience with scheduling and inventory systems",
      "Knowledge of beauty industry trends and standards",
      "Business acumen and financial management abilities",
      "Customer service excellence"
    ],
    specialties: [
      "Team Leadership",
      "Business Operations",
      "Staff Development",
      "Client Retention",
      "Revenue Growth"
    ]
  },
  massage: {
    title: "Massage Therapist",
    description: "Join our wellness team as a licensed massage therapist. You will provide therapeutic massage services customized to client needs, including deep tissue, Swedish, and sports massage techniques.\n\nWe're seeking a therapist who understands body mechanics and creates a healing experience.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$25-40/hour + tips",
    contactEmail: "",
    requirements: [
      "Licensed massage therapist certification",
      "1+ years professional massage experience",
      "Proficiency in multiple massage modalities",
      "Knowledge of anatomy and physiology",
      "Physical stamina and dexterity",
      "Excellent client communication skills"
    ],
    specialties: [
      "Deep Tissue Massage",
      "Swedish Massage",
      "Sports Massage",
      "Trigger Point Therapy",
      "Relaxation Techniques"
    ]
  },
  tattoo: {
    title: "Tattoo Artist",
    description: "We're seeking a talented tattoo artist to join our studio. You will create custom tattoo designs and deliver professional, safe tattooing services to clients. Your portfolio should demonstrate strong artistic skills and technical precision.\n\nThe ideal candidate has a distinctive style and excellent client rapport.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "Commission-based",
    contactEmail: "",
    requirements: [
      "Professional tattoo experience (2+ years)",
      "Strong portfolio of completed work",
      "Bloodborne pathogen certification",
      "Knowledge of sterilization procedures",
      "Drawing and design skills",
      "Client consultation abilities"
    ],
    specialties: [
      "Custom Designs",
      "Cover-ups",
      "Traditional Tattoos",
      "Fine Line Work",
      "Color Work"
    ]
  },
  makeup: {
    title: "Makeup Artist",
    description: "We're looking for a creative makeup artist to join our team. You will provide makeup services for special events, photoshoots, and everyday clients seeking to enhance their appearance.\n\nThe ideal candidate has knowledge of various makeup techniques and can work with diverse skin tones and face shapes.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "$20-35/hour + tips",
    contactEmail: "",
    requirements: [
      "Professional makeup certification preferred",
      "Impressive makeup portfolio",
      "Knowledge of skincare basics",
      "Experience with diverse skin types and tones",
      "Excellent customer service skills",
      "Creativity and attention to detail"
    ],
    specialties: [
      "Bridal Makeup",
      "Special Event Makeup",
      "Natural Looks",
      "Editorial Styles",
      "Makeup Education"
    ]
  },
  booth: {
    title: "Booth Rental Available",
    description: "We have premium booth rental spaces available for established beauty professionals. Our modern, well-located salon offers independent practitioners the opportunity to grow their business in a supportive environment.\n\nIdeal for self-motivated stylists, barbers, and technicians with existing clientele.",
    vietnameseDescription: "",
    location: "",
    jobType: "independent",
    experience_level: "intermediate",
    salary_range: "Rental terms negotiable",
    contactEmail: "",
    requirements: [
      "Current professional license in your field",
      "2+ years professional experience",
      "Existing client base preferred",
      "Professional liability insurance",
      "Business management skills",
      "Compatible with salon culture and values"
    ],
    specialties: [
      "Hair Styling",
      "Barbering",
      "Nail Services",
      "Esthetics",
      "Lash Services"
    ]
  },
  beauty: {
    title: "Other Beauty Professional",
    description: "We're expanding our service offerings and seeking various beauty professionals to join our team. Whether you specialize in microblading, permanent makeup, threading, waxing, or other beauty services, we'd like to hear from you.\n\nIdeal candidates have certification in their specialty and client service excellence.",
    vietnameseDescription: "",
    location: "",
    jobType: "full-time",
    experience_level: "intermediate",
    salary_range: "Based on experience and specialty",
    contactEmail: "",
    requirements: [
      "Professional certification in your beauty specialty",
      "Minimum 1 year experience in your field",
      "Knowledge of safety and sanitation protocols",
      "Portfolio of work (if applicable)",
      "Client-focused approach",
      "Willingness to build clientele"
    ],
    specialties: [
      "Microblading",
      "Permanent Makeup",
      "Threading",
      "Waxing",
      "Specialized Beauty Services"
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
