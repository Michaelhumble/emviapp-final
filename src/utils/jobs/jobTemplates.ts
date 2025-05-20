import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export type JobTemplateType = 'nails' | 'hair' | 'lashes' | 'barber' | 'skincare' | 
                             'spa' | 'receptionist' | 'manager' | 'massage' | 
                             'tattoo' | 'makeup' | 'booth' | 'beauty' | 'custom';

export const getJobTemplate = (type: JobTemplateType): JobFormValues => {
  // Base template that all specific templates will extend
  const baseTemplate: JobFormValues = {
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
    contactZalo: "",
    salonName: "",
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    specialties: [],
    requirements: [],
    templateType: type,
    image: "",
  };
  
  // Template-specific customizations
  switch (type) {
    case 'nails':
      return {
        ...baseTemplate,
        title: "Nail Technician",
        description: "We are looking for an experienced nail technician to join our team. Must be skilled in manicures, pedicures, and nail art.",
        jobType: "Full-time",
        compensation_type: "Commission",
        compensation_details: "Up to 60% commission based on experience",
        specialties: ["acrylic", "gel", "dip-powder"],
        requirements: ["license", "experience", "english"],
      };
    case 'hair':
      return {
        ...baseTemplate,
        title: "Hair Stylist",
        description: "Join our salon as a hair stylist with opportunities for growth and a positive team environment.",
        jobType: "Full-time",
        compensation_type: "Commission",
        compensation_details: "50-60% commission based on experience",
        specialties: ["haircut", "color", "highlights"],
        requirements: ["license", "experience"],
      };
    case 'lashes':
      return {
        ...baseTemplate,
        title: "Eyelash Extension Technician",
        description: "We are looking for a skilled eyelash extension technician to provide high-quality lash services to our clients.",
        jobType: "Part-time",
        compensation_type: "Hourly + Tips",
        compensation_details: "Hourly rate + tips",
        specialties: ["Classic Lashes", "Volume Lashes", "Lash Lifts", "Lash Tints"],
        requirements: ["Eyelash extension certification", "Experience with different lash techniques", "Attention to detail", "Excellent hygiene practices"],
      };
    case 'barber':
      return {
        ...baseTemplate,
        title: "Experienced Barber Wanted",
        description: "Our barbershop is looking for a barber with experience in traditional and modern cuts, fades, and shaves.",
        jobType: "Full-time",
        compensation_type: "Commission",
        compensation_details: "Commission based on experience",
        specialties: ["Fades", "Tapers", "Straight Razor Shaves", "Beard Trims"],
        requirements: ["Barber license", "Proficiency in various cutting techniques", "Knowledge of beard grooming", "Strong customer service skills"],
      };
    case 'skincare':
      return {
        ...baseTemplate,
        title: "Esthetician for Spa",
        description: "We are seeking a licensed esthetician to provide facials, waxing, and other skincare treatments in our spa.",
        jobType: "Full-time",
        compensation_type: "Hourly + Commission",
        compensation_details: "Hourly rate + commission",
        specialties: ["Facials", "Waxing", "Microdermabrasion", "Chemical Peels"],
        requirements: ["Esthetician license", "Experience in skincare treatments", "Knowledge of skincare products", "Ability to recommend treatments"],
      };
    case 'spa':
      return {
        ...baseTemplate,
        title: "Spa Technician",
        description: "We are seeking a skilled spa technician to provide body treatments, wraps, and therapeutic services in our wellness center.",
        jobType: "Full-time",
        compensation_type: "Hourly + Tips",
        compensation_details: "Hourly rate + tips",
        specialties: ["Body Wraps", "Massage", "Salt Scrubs", "Aromatherapy"],
        requirements: ["Certification in spa therapies", "Experience in body treatments", "Knowledge of aromatherapy", "Excellent communication skills"],
      };
    case 'receptionist':
      return {
        ...baseTemplate,
        title: "Salon Receptionist",
        description: "We are looking for a friendly and organized receptionist to manage scheduling, client check-ins, and salon operations.",
        jobType: "Part-time",
        compensation_type: "Hourly",
        compensation_details: "Hourly rate",
        specialties: ["Customer Service", "Scheduling", "Phone Etiquette", "Cash Handling"],
        requirements: ["High school diploma", "Excellent communication skills", "Basic computer skills", "Ability to multitask"],
      };
    case 'manager':
      return {
        ...baseTemplate,
        title: "Salon Manager",
        description: "We are seeking an experienced salon manager to oversee salon operations, manage staff, and ensure customer satisfaction.",
        jobType: "Full-time",
        compensation_type: "Salary + Bonuses",
        compensation_details: "Salary + bonuses",
        specialties: ["Staff Management", "Inventory Control", "Customer Relations", "Marketing"],
        requirements: ["Management experience", "Leadership skills", "Knowledge of salon operations", "Excellent problem-solving skills"],
      };
    case 'massage':
      return {
        ...baseTemplate,
        title: "Licensed Massage Therapist",
        description: "Our spa is looking for a licensed massage therapist to provide therapeutic massage and bodywork services to our clients.",
        jobType: "Part-time",
        compensation_type: "Commission",
        compensation_details: "Commission based on experience",
        specialties: ["Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage", "Prenatal Massage"],
        requirements: ["Massage therapy license", "Experience in massage techniques", "Knowledge of anatomy", "Excellent communication skills"],
      };
    case 'tattoo':
      return {
        ...baseTemplate,
        title: "Tattoo Artist",
        description: "Our tattoo studio is looking for a skilled tattoo artist with a strong portfolio and expertise in various tattooing styles.",
        jobType: "Full-time",
        compensation_type: "Commission",
        compensation_details: "Commission based on experience",
        specialties: ["Black and Gray", "Color Realism", "Traditional", "Geometric"],
        requirements: ["Tattoo license", "Strong portfolio", "Knowledge of sterilization", "Excellent artistic skills"],
      };
    case 'makeup':
      return {
        ...baseTemplate,
        title: "Makeup Artist",
        description: "Our salon is seeking a talented makeup artist to provide makeup application services for weddings, events, and photoshoots.",
        jobType: "Part-time",
        compensation_type: "Hourly + Tips",
        compensation_details: "Hourly rate + tips",
        specialties: ["Bridal Makeup", "Special Effects", "Editorial", "Airbrushing"],
        requirements: ["Makeup artistry certification", "Experience in makeup application", "Knowledge of makeup products", "Excellent customer service skills"],
      };
    case 'booth':
      return {
        ...baseTemplate,
        title: "Booth Rental Available",
        description: "We are offering booth rental space to independent beauty professionals in our well-established salon.",
        jobType: "Booth Rental",
        compensation_type: "Rental Fee",
        compensation_details: "Rental fee",
        specialties: ["Hair Stylists", "Nail Technicians", "Estheticians", "Massage Therapists"],
        requirements: ["Valid professional license", "Liability insurance", "Own clientele", "Professional demeanor"],
      };
    case 'beauty':
      return {
        ...baseTemplate,
        title: "Other Beauty Professional",
        description: "We are looking for a skilled beauty professional to provide specialized beauty services such as microblading, threading, or waxing.",
        jobType: "Contract",
        compensation_type: "Commission",
        compensation_details: "Commission based on experience",
        specialties: ["Microblading", "Threading", "Waxing", "Lash Extensions"],
        requirements: ["Certification in the specific service", "Experience in the service", "Knowledge of safety procedures", "Excellent customer service skills"],
      };
    case 'custom':
      return {
        ...baseTemplate,
        title: "",
        description: "",
        vietnameseDescription: "",
        location: "",
        jobType: "",
        compensation_type: "",
        compensation_details: "",
        salary_range: "",
        experience_level: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        contactZalo: "",
        salonName: "",
        weekly_pay: false,
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        specialties: [],
        requirements: [],
        templateType: "custom",
      };
    default:
      return baseTemplate;
  }
};
