import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export type JobTemplateType = 
  | 'nails' 
  | 'hair' 
  | 'lashes' 
  | 'massage' 
  | 'tattoo' 
  | 'barber'
  | 'skincare'
  | 'makeup'
  | 'booth'
  | 'receptionist'
  | 'manager'
  | 'spa'
  | 'beauty'
  | 'custom';

// Main function to get job templates
export const getJobTemplate = (type: JobTemplateType): JobFormValues => {
  switch (type) {
    case 'nails':
      return nailTechTemplate;
    case 'hair':
      return hairStylistTemplate;
    case 'lashes':
      return lashTechTemplate;
    case 'barber':
      return barberTemplate;
    case 'skincare':
      return skinCareTemplate;
    case 'massage':
      return massageTemplate;
    case 'tattoo':
      return tattooTemplate;
    case 'makeup':
      return makeupTemplate;
    case 'booth':
      return boothRentalTemplate;
    case 'receptionist':
      return receptionistTemplate;
    case 'manager':
      return managerTemplate;
    case 'spa':
      return spaTemplate;
    case 'beauty':
      return beautyTemplate;
    case 'custom':
    default:
      return blankTemplate;
  }
};

// Blank template for custom jobs
const blankTemplate: JobFormValues = {
  title: "",
  description: "",
  vietnameseDescription: "",
  location: "",
  jobType: "Full-time",
  compensation_type: "",
  compensation_details: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  salary_range: "",
  specialties: [],
  requirements: [],
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  image: "",
  templateType: "custom",
};

// Nail tech template
const nailTechTemplate: JobFormValues = {
  title: "Nail Technician",
  description: "We are seeking skilled nail technicians to join our salon. The ideal candidate has experience with manicures, pedicures, and nail enhancements. Must be professional, detail-oriented, and provide excellent customer service.",
  vietnameseDescription: "Chúng tôi đang tìm kiếm các kỹ thuật viên làm móng có kỹ năng để tham gia tiệm của chúng tôi. Ứng viên lý tưởng có kinh nghiệm với dịch vụ làm móng tay, móng chân và đắp móng. Phải chuyên nghiệp, chú ý đến chi tiết và cung cấp dịch vụ khách hàng xuất sắc.",
  location: "",
  jobType: "Full-time",
  compensation_type: "Hourly + Commission",
  compensation_details: "60/40 commission split",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  requirements: ["Valid nail technician license", "2+ years experience", "Acrylic and gel experience", "Customer service skills"],
  specialties: ["Dip Powder", "Gel", "Acrylic", "Nail Art"],
  weekly_pay: true,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  templateType: "nails",
};

// Hair stylist template
const hairStylistTemplate: JobFormValues = {
  title: "Hair Stylist",
  description: "We're looking for a creative and enthusiastic hair stylist to join our team. The ideal candidate has experience in cutting, coloring, and styling for a diverse clientele. Must be professional, passionate about hair, and committed to ongoing education.",
  vietnameseDescription: "",
  location: "",
  jobType: "Full-time",
  compensation_type: "Commission",
  compensation_details: "Competitive commission structure",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  requirements: ["Cosmetology license", "2+ years salon experience", "Color and cutting skills", "Portfolio of work"],
  specialties: ["Hair Cuts", "Color", "Balayage", "Extensions"],
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  templateType: "hair",
};

// Lash tech template
const lashTechTemplate: JobFormValues = {
  title: "Lash Technician",
  description: "We are seeking a skilled lash technician to join our beauty team. The ideal candidate has experience in classic and volume lash extensions, lash lifts, and providing exceptional client experiences.",
  vietnameseDescription: "",
  location: "",
  jobType: "Full-time",
  compensation_type: "Hourly + Commission",
  compensation_details: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  requirements: ["Lash certification", "1+ year experience", "Knowledge of lash types and styles", "Attention to detail"],
  specialties: ["Classic Lashes", "Volume Lashes", "Hybrid Lashes", "Lash Lifts"],
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  templateType: "lashes",
};

// Other templates follow a similar pattern
const barberTemplate: JobFormValues = {
  title: "Barber",
  description: "Looking for a skilled barber to join our team. The ideal candidate has experience in men's haircuts, beard trims, and hot towel shaves. Must be professional, personable, and have excellent customer service skills.",
  vietnameseDescription: "",
  location: "",
  jobType: "Full-time",
  compensation_type: "Commission",
  compensation_details: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  salonName: "",
  requirements: ["Barber license", "1+ years experience", "Expertise in modern cutting techniques", "Customer service skills"],
  specialties: ["Fades", "Beard Trims", "Hot Towel Shaves", "Hair Design"],
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  templateType: "barber",
};

// Simplified templates for remaining types
const skinCareTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Esthetician",
  description: "Seeking a licensed esthetician for facials, skin treatments, and skincare consultations.",
  requirements: ["Esthetician license", "Skincare knowledge", "Customer service skills"],
  specialties: ["Facials", "Chemical Peels", "Microdermabrasion"],
  jobType: "Full-time",
  compensation_type: "Hourly + Commission",
  templateType: "skincare",
};

const massageTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Massage Therapist",
  description: "Looking for a licensed massage therapist to provide various massage techniques.",
  requirements: ["Massage therapy license", "Training in multiple techniques", "Customer service skills"],
  specialties: ["Deep Tissue", "Swedish", "Hot Stone", "Aromatherapy"],
  jobType: "Full-time",
  templateType: "massage",
};

const tattooTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Tattoo Artist",
  description: "Seeking a talented tattoo artist with a strong portfolio and client base.",
  requirements: ["3+ years experience", "Strong portfolio", "Excellent sanitation practices"],
  specialties: ["Black & Gray", "Color", "Custom Design", "Cover-ups"],
  compensation_type: "Commission",
  templateType: "tattoo",
};

const makeupTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Makeup Artist",
  description: "Looking for a creative makeup artist for our beauty salon.",
  requirements: ["Makeup artistry certification", "Portfolio of work", "Experience with diverse skin tones"],
  specialties: ["Bridal", "Editorial", "Special Effects", "Everyday Glam"],
  compensation_type: "Hourly + Commission",
  templateType: "makeup",
};

const boothRentalTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Booth Rental Available",
  description: "Booth rental available in our busy salon for nail technicians, hair stylists, or beauty professionals.",
  location: "",
  jobType: "For Sale",
  compensation_type: "Other",
  compensation_details: "Weekly booth rental",
  requirements: ["Valid license", "Own clientele preferred", "Professional attitude"],
  specialties: ["Booth Rental"],
  templateType: "booth",
};

const receptionistTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Salon Receptionist",
  description: "Front desk position for our busy salon. Responsibilities include scheduling, check-ins, retail sales, and maintaining a welcoming atmosphere.",
  jobType: "Full-time",
  compensation_type: "Hourly",
  requirements: ["Customer service experience", "Computer skills", "Multi-tasking abilities"],
  specialties: ["Reception", "Scheduling", "Retail"],
  templateType: "receptionist",
};

const managerTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Salon Manager",
  description: "Seeking an experienced salon manager to oversee daily operations, staff management, and client relations.",
  jobType: "Full-time",
  compensation_type: "Salary",
  requirements: ["3+ years salon management experience", "Staff leadership skills", "Business acumen"],
  specialties: ["Management", "Operations", "Team Building"],
  templateType: "manager",
};

const spaTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Spa Technician",
  description: "Seeking a spa technician with experience in body treatments, wraps, and scrubs.",
  jobType: "Full-time",
  compensation_type: "Hourly + Commission",
  requirements: ["Spa technician certification", "1+ year experience", "Customer service skills"],
  specialties: ["Body Wraps", "Scrubs", "Relaxation Treatments"],
  templateType: "spa",
};

const beautyTemplate: JobFormValues = {
  ...blankTemplate,
  title: "Beauty Professional",
  description: "Seeking a licensed beauty professional for specialized services.",
  jobType: "Full-time",
  compensation_type: "Commission",
  requirements: ["Relevant license", "Experience in specialty", "Customer service skills"],
  specialties: ["Microblading", "Threading", "Waxing"],
  templateType: "beauty",
};
