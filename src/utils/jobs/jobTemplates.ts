
// Basic job templates for common industries
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

export type JobTemplateType = 'nails' | 'hair' | 'makeup' | 'barber' | 'lashes' | 'skincare' | 'microblading' | 'custom';

interface JobTemplate {
  title: string;
  description: string;
  type: JobTemplateType;
  values: JobFormValues;
}

export const JOB_TEMPLATES: JobTemplate[] = [
  {
    title: "Nail Technician",
    description: "Find experienced nail technicians for your salon",
    type: "nails",
    values: {
      title: "Nail Technician",
      description: "We're seeking an experienced nail technician to join our team. The ideal candidate will have expertise in manicures, pedicures, gel polish, and acrylics.",
      vietnameseDescription: "Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Ứng viên lý tưởng sẽ có chuyên môn về mani, pedi, sơn gel và bột.",
      specialties: ["Manicure", "Pedicure", "Gel Polish", "Acrylics"],
      jobType: "full-time",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: true,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "nails"
    }
  },
  {
    title: "Hair Stylist",
    description: "Hire talented hair stylists for your salon",
    type: "hair",
    values: {
      title: "Hair Stylist",
      description: "We are looking for a creative and skilled hair stylist to join our team. Experience with cutting, coloring, and styling required.",
      specialties: ["Haircuts", "Hair Color", "Blowouts", "Treatments"],
      jobType: "full-time",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "hair"
    }
  },
  {
    title: "Lash Technician",
    description: "Find certified lash techs for your beauty studio",
    type: "lashes",
    values: {
      title: "Lash Technician",
      description: "Seeking certified lash technician with experience in classic and volume extensions. Must have attention to detail and excellent client skills.",
      specialties: ["Classic Lashes", "Volume Lashes", "Lash Lifts", "Lash Tinting"],
      jobType: "full-time",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "lashes"
    }
  },
  {
    title: "Barber",
    description: "Hire skilled barbers for your shop",
    type: "barber",
    values: {
      title: "Barber",
      description: "Modern barbershop seeking talented barber with skills in precision cuts, fades, beard trims, and hot towel shaves.",
      specialties: ["Haircuts", "Fades", "Beard Trims", "Hot Towel Shaves"],
      jobType: "full-time",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "barber"
    }
  },
  {
    title: "Booth Rental",
    description: "Advertise booth rental opportunities at your salon",
    type: "custom",
    values: {
      title: "Booth Rental Opportunity",
      description: "Beautiful salon has booth rental opportunities available for established stylists with existing clientele. Prime location with great walk-in traffic.",
      specialties: [],
      jobType: "contract",
      compensation_type: "booth rental",
      has_housing: false,
      has_wax_room: true,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "other"
    }
  },
  {
    title: "Salon Assistant",
    description: "Hire support staff for your beauty business",
    type: "custom",
    values: {
      title: "Salon Assistant",
      description: "Busy salon seeking reliable assistant for front desk operations, client check-in/out, scheduling, cleaning, and general support.",
      specialties: ["Reception", "Scheduling", "Cleaning", "Client Service"],
      jobType: "part-time",
      compensation_type: "hourly",
      has_housing: false,
      has_wax_room: false,
      owner_will_train: true,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "other"
    }
  },
  {
    title: "Makeup Artist",
    description: "Find talented makeup artists for your studio",
    type: "makeup",
    values: {
      title: "Makeup Artist",
      description: "Seeking experienced makeup artist skilled in bridal, special event, and photoshoot makeup. Must have professional kit and portfolio.",
      specialties: ["Bridal Makeup", "Special Event Makeup", "Editorial", "Airbrush"],
      jobType: "part-time",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "makeup"
    }
  },
  {
    title: "Esthetician",
    description: "Hire licensed estheticians for spa services",
    type: "skincare",
    values: {
      title: "Licensed Esthetician",
      description: "Upscale spa seeking licensed esthetician experienced in facials, chemical peels, waxing, and body treatments. Knowledge of premium skincare lines preferred.",
      specialties: ["Facials", "Chemical Peels", "Waxing", "Body Treatments"],
      jobType: "full-time",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: true,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "skincare"
    }
  },
  {
    title: "Microblading Artist",
    description: "Find certified permanent makeup specialists",
    type: "microblading",
    values: {
      title: "Certified Microblading Artist",
      description: "Seeking certified microblading artist with portfolio showing exceptional technique. Experience in powder brows and color theory preferred.",
      specialties: ["Microblading", "Powder Brows", "Lip Blush", "Eyeliner"],
      jobType: "contract",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: true,
      location: "",
      salonName: "",
      industryType: "microblading"
    }
  },
  {
    title: "Custom Job Post",
    description: "Create a completely custom job listing",
    type: "custom",
    values: {
      title: "",
      description: "",
      vietnameseDescription: "",
      specialties: [],
      jobType: "full-time",
      compensation_type: "commission",
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      location: "",
      salonName: "",
      industryType: "other"
    }
  },
];
