import { JobFormValues } from '@/components/posting/job/jobFormSchema';

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

export const getJobTemplate = (templateType: JobTemplateType): JobFormValues => {
  switch (templateType) {
    case 'nails':
      return {
        title: "Nail Technician",
        description: "We are seeking a skilled Nail Technician to join our team! The ideal candidate has experience with manicures, pedicures, and nail art. You should be detail-oriented, have excellent customer service skills, and maintain high standards of cleanliness and safety.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một Kỹ thuật viên Nail có tay nghề để tham gia vào đội ngũ của chúng tôi! Ứng viên lý tưởng có kinh nghiệm với dịch vụ làm móng tay, móng chân và nghệ thuật vẽ móng. Bạn nên chú ý đến chi tiết, có kỹ năng dịch vụ khách hàng xuất sắc và duy trì tiêu chuẩn cao về vệ sinh và an toàn.",
        location: "",
        compensation_details: "Competitive pay with commission, flexible schedule, and opportunity for growth.",
        salary_range: "$600-1000/week",
        jobType: "full-time",
        experience_level: "entry",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid nail technician license",
          "1+ years experience (preferred)",
          "Knowledge of nail art techniques",
          "Excellent customer service skills"
        ],
        specialties: [
          "Manicures",
          "Pedicures",
          "Gel nails",
          "Acrylic nails",
          "Nail art"
        ],
        templateType: "nails"
      };
    case 'hair':
      return {
        title: "Hair Stylist",
        description: "Join our talented team of stylists! We are looking for a passionate Hair Stylist with a creative eye and technical expertise. The ideal candidate will excel at cutting, coloring, and styling for a diverse clientele.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive commission structure, paid education, and flexible scheduling.",
        salary_range: "$700-1200/week",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid cosmetology license",
          "2+ years experience in hair cutting and coloring",
          "Strong customer service skills",
          "Portfolio of work"
        ],
        specialties: [
          "Hair cutting",
          "Hair coloring",
          "Balayage",
          "Blowouts",
          "Styling"
        ],
        templateType: "hair"
      };
    case 'barber':
      return {
        title: "Barber",
        description: "Are you passionate about men's grooming? We're seeking a skilled Barber to join our growing team. The ideal candidate has exceptional technique with classic and modern cuts, beard trimming, and straight razor shaves.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Base pay + commission, health benefits for full-time employees.",
        salary_range: "$650-1100/week",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid barber license",
          "1+ years experience",
          "Proficient in modern and classic cutting techniques",
          "Excellent client communication skills"
        ],
        specialties: [
          "Men's haircuts",
          "Beard trims",
          "Hot towel shaves",
          "Fades",
          "Line-ups"
        ],
        templateType: "barber"
      };
    case 'skincare':
      return {
        title: "Esthetician",
        description: "We are seeking a licensed Esthetician to provide exceptional skincare services to our clients. The ideal candidate will be knowledgeable about various skin conditions and treatments, passionate about helping clients achieve their skincare goals, and committed to providing a relaxing experience.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive commission structure plus retail commissions, paid continuing education, and flexible scheduling.",
        salary_range: "$700-1100/week",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid esthetician license",
          "1+ years experience preferred",
          "Knowledge of skincare products and ingredients",
          "Excellent customer service skills"
        ],
        specialties: [
          "Facials",
          "Chemical peels",
          "Microdermabrasion",
          "Waxing",
          "Product recommendations"
        ],
        templateType: "skincare"
      };
    case 'lashes':
      return {
        title: "Lash Technician",
        description: "We're looking for a skilled Lash Technician who can create beautiful, natural-looking eyelash extensions. The ideal candidate has a steady hand, attention to detail, and the ability to customize lash styles to suit each client.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive pay with commission structure.",
        salary_range: "$650-1000/week",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Lash certification",
          "6+ months experience",
          "Portfolio of work",
          "Knowledge of lash types and adhesives"
        ],
        specialties: [
          "Classic lashes",
          "Volume lashes",
          "Hybrid sets",
          "Lash lifts",
          "Lash tinting"
        ],
        templateType: "lashes"
      };
    case 'spa':
      return {
        title: "Spa Therapist",
        description: "Join our luxurious spa as a Spa Therapist providing exceptional body treatments and massage services. The ideal candidate will have a nurturing personality, excellent technique, and the ability to create a relaxing atmosphere for clients.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Base pay + gratuities, employee discounts on products and services.",
        salary_range: "$700-1100/week",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Massage therapy license or equivalent certification",
          "2+ years experience in spa setting",
          "Knowledge of various massage modalities",
          "Excellent client communication"
        ],
        specialties: [
          "Swedish massage",
          "Deep tissue massage",
          "Hot stone therapy",
          "Body wraps",
          "Body scrubs"
        ],
        templateType: "spa"
      };
    case 'receptionist':
      return {
        title: "Salon Receptionist",
        description: "We are looking for a friendly, organized Salon Receptionist to be the face of our salon. The ideal candidate will have excellent communication skills, ability to multi-task, and a passion for customer service in the beauty industry.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive hourly rate, employee discounts on services and products.",
        salary_range: "$14-18/hour",
        jobType: "full-time",
        experience_level: "entry",  // Changed from "any" to "entry"
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "High school diploma or equivalent",
          "Customer service experience preferred",
          "Proficient with computers and appointment software",
          "Excellent phone etiquette"
        ],
        specialties: [
          "Appointment scheduling",
          "Client relations",
          "Retail sales",
          "Inventory management"
        ],
        templateType: "receptionist"
      };
    case 'manager':
      return {
        title: "Salon Manager",
        description: "Experienced Salon Manager needed to oversee daily operations, staff management, and business growth. The ideal candidate will have leadership experience in the beauty industry and a track record of improving salon performance.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive salary plus performance bonuses, health benefits, paid vacation.",
        salary_range: "$45,000-60,000/year",
        jobType: "full-time",
        experience_level: "senior",  // Changed from "any" to "senior"
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "3+ years of salon management experience",
          "Strong leadership and team building skills",
          "Business and financial management experience",
          "Customer service excellence"
        ],
        specialties: [
          "Staff management",
          "Business operations",
          "Marketing",
          "Client retention",
          "Budget management"
        ],
        templateType: "manager"
      };
    case 'massage':
      return {
        title: "Massage Therapist",
        description: "Licensed Massage Therapist wanted for a busy wellness center. The ideal candidate has a healing touch, strong knowledge of anatomy, and the ability to customize treatments for client needs.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive compensation package with base pay plus tips, flexible scheduling.",
        salary_range: "$45-75/hour",
        jobType: "part-time",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid massage therapy license",
          "500+ hours of certified training",
          "1+ years professional experience",
          "Knowledge of multiple massage modalities"
        ],
        specialties: [
          "Swedish massage",
          "Deep tissue",
          "Sports massage",
          "Reflexology",
          "Prenatal massage"
        ],
        templateType: "massage"
      };
    case 'tattoo':
      return {
        title: "Tattoo Artist",
        description: "We are seeking a talented and experienced Tattoo Artist to join our studio. The ideal candidate should have a strong portfolio showcasing their artistic skills and expertise in various tattooing styles.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive commission-based pay, flexible hours, and a supportive work environment.",
        salary_range: "$500 - $1500/week (depending on experience and clientele)",
        jobType: "contract",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid tattoo license",
          "Minimum of 2 years of professional tattooing experience",
          "Strong portfolio demonstrating a variety of styles",
          "Excellent knowledge of sanitation and safety procedures"
        ],
        specialties: [
          "Black and grey",
          "Color realism",
          "Traditional",
          "Neo-traditional",
          "Geometric"
        ],
        templateType: "tattoo"
      };
    case 'makeup':
      return {
        title: "Makeup Artist",
        description: "We are looking for a skilled and creative Makeup Artist to provide exceptional makeup services to our clients. The ideal candidate should have a passion for beauty, a keen eye for detail, and the ability to create a variety of looks for different occasions.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly wage plus commission, opportunities for tips, and flexible scheduling.",
        salary_range: "$18 - $30/hour (depending on experience and tips)",
        jobType: "part-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Proven experience as a makeup artist",
          "Knowledge of makeup techniques and color theory",
          "Excellent customer service skills",
          "Ability to work under pressure and meet deadlines"
        ],
        specialties: [
          "Bridal makeup",
          "Special effects makeup",
          "Editorial makeup",
          "Everyday makeup",
          "Airbrush makeup"
        ],
        templateType: "makeup"
      };
    case 'booth':
      return {
        title: "Booth Rental Available",
        description: "We have booth rental opportunities available for experienced beauty professionals. Our salon offers a supportive and professional environment with great amenities and a prime location.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive rental rates, flexible terms, and access to salon amenities.",
        salary_range: "Rental rates vary",
        jobType: "contract",
        experience_level: "experienced",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid cosmetology license",
          "Proven clientele",
          "Professional liability insurance",
          "Commitment to maintaining a clean and organized workspace"
        ],
        specialties: [
          "Hair styling",
          "Nail services",
          "Esthetics",
          "Massage therapy",
          "Other beauty services"
        ],
        templateType: "booth"
      };
    case 'beauty':
      return {
        title: "Other Beauty Professional",
        description: "We are always looking for talented beauty professionals to join our team. If you have a unique skill or service to offer, we encourage you to apply.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Compensation varies depending on the role and experience.",
        salary_range: "Negotiable",
        jobType: "contract",
        experience_level: "intermediate",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        requirements: [
          "Valid license or certification (if applicable)",
          "Proven experience in your field",
          "Excellent customer service skills",
          "Passion for the beauty industry"
        ],
        specialties: [
          "Microblading",
          "Eyelash extensions",
          "Waxing",
          "Threading",
          "Other specialized beauty services"
        ],
        templateType: "beauty"
      };
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
