import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export type JobTemplateType = "nail" | "hair" | "spa" | "barber" | "massage" | "tattoo" | "makeup" | "booth" | "custom";

interface JobTemplate {
  [key: string]: JobFormValues;
}

const nailTemplates: JobTemplate = {
  fullTimeNailTech: {
    title: "Full-Time Nail Technician",
    description: "We are seeking an experienced nail technician to join our team. The ideal candidate should be skilled in a variety of nail services including manicures, pedicures, gel polish, acrylics, and nail art. You will be responsible for providing excellent customer service and maintaining high standards of cleanliness and safety.",
    vietnameseDescription: "Chúng tôi đang tìm kiếm một kỹ thuật viên nail có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Ứng viên lý tưởng phải có kỹ năng trong nhiều dịch vụ nail bao gồm manicure, pedicure, sơn gel, acrylic và nail art. Bạn sẽ chịu trách nhiệm cung cấp dịch vụ khách hàng xuất sắc và duy trì tiêu chuẩn cao về vệ sinh và an toàn.",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "60-70% commission based on experience and performance",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid nail technician license",
      "2+ years of experience in a salon environment",
      "Proficient in acrylic, gel, dip powder, and nail art",
      "Strong customer service skills",
      "Ability to work weekends and evenings",
      "English communication skills required"
    ],
    specialties: [
      "Manicures",
      "Pedicures",
      "Gel Polish",
      "Acrylics",
      "Dip Powder",
      "Nail Art"
    ]
  },
  partTimeNailTech: {
    title: "Part-Time Nail Technician",
    description: "We are looking for a part-time nail technician to provide services on weekends and evenings. Must be proficient in basic manicure and pedicure services.",
    vietnameseDescription: "Chúng tôi đang tìm kiếm một kỹ thuật viên nail bán thời gian để cung cấp dịch vụ vào cuối tuần và buổi tối. Phải thành thạo các dịch vụ manicure và pedicure cơ bản.",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "part-time",
    compensation_type: "hourly",
    compensation_details: "$15 - $20 per hour plus tips",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid nail technician license",
      "1+ years of experience",
      "Reliable and punctual",
      "Ability to work independently"
    ],
    specialties: [
      "Manicures",
      "Pedicures",
      "Gel Polish"
    ]
  },
  boothRentalNailTech: {
    title: "Booth Rental for Nail Tech",
    description: "Booth rental opportunity available for a motivated nail technician. Be your own boss and set your own hours in our upscale salon.",
    vietnameseDescription: "Cơ hội thuê booth có sẵn cho một kỹ thuật viên nail có động lực. Tự làm chủ và đặt giờ làm việc của riêng bạn trong salon cao cấp của chúng tôi.",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract",
    compensation_type: "booth rental",
    compensation_details: "$150 per week",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Valid nail technician license",
      "Own clientele",
      "Professional attitude"
    ],
    specialties: [
      "Manicures",
      "Pedicures",
      "Acrylics",
      "Nail Art"
    ]
  }
};

const hairTemplates: JobTemplate = {
  hairStylist: {
    title: "Hair Stylist Needed - High Commission",
    description: "Join our busy salon as a talented hair stylist! We offer a high-commission structure, a steady flow of clients, and a collaborative work atmosphere. The ideal candidate is creative, knowledgeable about current trends, and passionate about hair care.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "Up to 65% commission based on experience",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid cosmetology license",
      "2+ years of styling experience",
      "Color expertise and up-to-date knowledge of trends",
      "Professional demeanor and excellent customer service",
      "Availability for flexible scheduling including weekends"
    ],
    specialties: [
      "Haircuts",
      "Coloring",
      "Balayage",
      "Highlights",
      "Extensions",
      "Styling"
    ]
  },
  barberStylist: {
    title: "Barber Stylist Wanted",
    description: "Upscale barbershop looking for a skilled barber stylist. Must be proficient in modern cuts, fades, and beard grooming. Great opportunity to build your clientele in a high-traffic location.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "Competitive commission rate, negotiable based on experience",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid barber license",
      "2+ years of experience",
      "Expertise in fades and modern cuts",
      "Excellent customer service skills"
    ],
    specialties: [
      "Fades",
      "Modern Cuts",
      "Beard Grooming",
      "Shaves"
    ]
  },
  colorSpecialist: {
    title: "Color Specialist - Creative Environment",
    description: "We are seeking a talented color specialist to join our salon. Must have experience with highlights, balayage, and color correction. We offer ongoing education and a supportive team environment.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "Commission based, negotiable based on experience",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid cosmetology license",
      "3+ years of coloring experience",
      "Expertise in highlights, balayage, and color correction",
      "Knowledge of current color trends"
    ],
    specialties: [
      "Highlights",
      "Balayage",
      "Color Correction",
      "Ombre"
    ]
  }
};

const spaTemplates: JobTemplate = {
  esthetician: {
    title: "Esthetician / Facial Specialist",
    description: "We are seeking a professional Esthetician to join our high-end spa. The ideal candidate will provide exceptional skincare services and treatment recommendations to our clientele. You'll work in a tranquil environment with a focus on client satisfaction and relaxation.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "55-65% commission plus retail commission",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Current Esthetician license",
      "Minimum 1 year of facial experience",
      "Knowledge of skincare products and treatments",
      "Ability to perform various facial techniques",
      "Strong sales skills for product recommendations",
      "Professional appearance and excellent communication"
    ],
    specialties: [
      "Facials",
      "Chemical Peels",
      "Microdermabrasion",
      "Waxing",
      "LED Therapy",
      "Anti-Aging Treatments"
    ]
  },
  massageTherapistSpa: {
    title: "Massage Therapist - Spa Environment",
    description: "Join our spa as a massage therapist and provide therapeutic massage services to our clients. We offer a peaceful work environment and a steady stream of clients.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "Competitive commission rate plus tips",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Valid massage therapy license",
      "Experience with various massage techniques",
      "Excellent customer service skills"
    ],
    specialties: [
      "Swedish Massage",
      "Deep Tissue Massage",
      "Hot Stone Massage",
      "Prenatal Massage"
    ]
  },
  waxingSpecialist: {
    title: "Waxing Specialist - High Volume",
    description: "We are looking for a waxing specialist to join our busy spa. Must be proficient in all types of waxing services. Great opportunity to earn high commission in a fast-paced environment.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "High commission rate, negotiable based on experience",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid esthetician license",
      "Proficient in all types of waxing services",
      "Excellent customer service skills"
    ],
    specialties: [
      "Brazilian Wax",
      "Eyebrow Wax",
      "Body Waxing"
    ]
  }
};

const barberTemplates: JobTemplate = {
  barber: {
    title: "Experienced Barber - Join Our Team",
    description: "We're looking for a skilled barber to join our modern barbershop. If you have experience with classic cuts, fades, beard grooming, and hot towel shaves, we want to speak with you! We offer competitive commission rates and a fun, energetic work environment.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "65-70% commission based on experience",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid barber license",
      "Minimum 2 years of barbering experience",
      "Expertise in modern cutting techniques",
      "Knowledge of men's grooming products",
      "Strong customer service skills",
      "Reliable and punctual"
    ],
    specialties: [
      "Fades",
      "Classic Cuts",
      "Beard Trims",
      "Hot Towel Shaves",
      "Line Ups",
      "Hair Design"
    ]
  },
  masterBarber: {
    title: "Master Barber Wanted",
    description: "Upscale barbershop seeking a master barber with a strong clientele. Must be proficient in all types of cuts and styles. Great opportunity to earn top dollar in a high-end environment.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "High commission rate, negotiable based on experience",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Valid barber license",
      "5+ years of experience",
      "Strong clientele",
      "Expertise in all types of cuts and styles"
    ],
    specialties: [
      "Fades",
      "Tapers",
      "Scissor Cuts",
      "Beard Design"
    ]
  },
  juniorBarber: {
    title: "Junior Barber / Apprentice",
    description: "We are looking for a junior barber or apprentice to join our team. Great opportunity to learn from experienced barbers and build your skills. Must be passionate about barbering and willing to learn.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "hourly",
    compensation_details: "Hourly wage plus tips",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Barber license or in progress",
      "Passion for barbering",
      "Willingness to learn",
      "Reliable and punctual"
    ],
    specialties: [
      "Fades",
      "Tapers",
      "Line Ups",
      "Beard Trims"
    ]
  }
};

const massageTemplates: JobTemplate = {
  massageTherapist: {
    title: "Licensed Massage Therapist",
    description: "Our wellness center is seeking a licensed massage therapist to provide therapeutic massage services to our clients. The ideal candidate has experience with various massage modalities and can create personalized treatment plans based on client needs.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "50-60% commission plus tips",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Current massage therapy license",
      "2+ years of professional massage experience",
      "Knowledge of multiple massage techniques",
      "Physical stamina for performing massages",
      "Professional demeanor and strong communication",
      "Available weekends and some evenings"
    ],
    specialties: [
      "Swedish Massage",
      "Deep Tissue",
      "Sports Massage",
      "Hot Stone",
      "Prenatal",
      "Reflexology"
    ]
  },
  spaMassageTherapist: {
    title: "Spa Massage Therapist",
    description: "Upscale spa seeking a massage therapist to provide relaxing and therapeutic massage services. Must be proficient in Swedish, deep tissue, and hot stone massage.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "commission",
    compensation_details: "Competitive commission rate plus tips",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Valid massage therapy license",
      "Proficient in Swedish, deep tissue, and hot stone massage",
      "Excellent customer service skills"
    ],
    specialties: [
      "Swedish Massage",
      "Deep Tissue",
      "Hot Stone Massage"
    ]
  },
  mobileMassageTherapist: {
    title: "Mobile Massage Therapist",
    description: "We are looking for a mobile massage therapist to provide massage services to clients in their homes or offices. Must have own transportation and equipment.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract",
    compensation_type: "per service",
    compensation_details: "Per service fee plus tips",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Valid massage therapy license",
      "Own transportation and equipment",
      "Excellent customer service skills"
    ],
    specialties: [
      "Swedish Massage",
      "Deep Tissue",
      "Sports Massage"
    ]
  }
};

const tattooTemplates: JobTemplate = {
  tattooArtist: {
    title: "Experienced Tattoo Artist",
    description: "Our established tattoo studio is seeking a talented tattoo artist to join our team. The ideal candidate has a strong portfolio, excellent drawing skills, and experience with various tattoo styles. We offer a supportive environment and a steady flow of clients.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract",
    compensation_type: "commission",
    compensation_details: "60% commission of all work performed",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "3+ years professional tattooing experience",
      "Strong portfolio demonstrating various styles",
      "Excellent drawing and design skills",
      "Knowledge of proper sterilization techniques",
      "Bloodborne pathogens certification",
      "Professional attitude and good client rapport"
    ],
    specialties: [
      "Traditional",
      "Neo-Traditional",
      "Japanese",
      "Realism",
      "Black and Gray",
      "Color Work"
    ]
  },
  tattooApprentice: {
    title: "Tattoo Apprentice",
    description: "We are looking for a tattoo apprentice to join our studio. Must have strong drawing skills and a passion for tattooing. Great opportunity to learn from experienced artists.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "full-time",
    compensation_type: "hourly",
    compensation_details: "Hourly wage",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Strong drawing skills",
      "Passion for tattooing",
      "Willingness to learn"
    ],
    specialties: [
      "Line Work",
      "Shading",
      "Color Packing"
    ]
  },
  piercingArtist: {
    title: "Piercing Artist",
    description: "We are seeking a piercing artist to join our studio. Must have experience with various types of piercings and be knowledgeable about proper sterilization techniques.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract",
    compensation_type: "commission",
    compensation_details: "Commission based",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Experience with various types of piercings",
      "Knowledge of proper sterilization techniques",
      "Bloodborne pathogens certification"
    ],
    specialties: [
      "Ear Piercings",
      "Nose Piercings",
      "Body Piercings"
    ]
  }
};

const makeupTemplates: JobTemplate = {
  makeupArtist: {
    title: "Makeup Artist Needed",
    description: "We are seeking a talented makeup artist to join our beauty studio. The ideal candidate has experience with bridal, special occasion, and everyday makeup applications. You should be knowledgeable about current makeup trends and techniques.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "part-time",
    compensation_type: "commission",
    compensation_details: "50% commission plus retail commission",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Proven makeup artistry experience",
      "Professional makeup kit with quality products",
      "Knowledge of different skin types and tones",
      "Portfolio showcasing versatile makeup applications",
      "Excellent customer service skills",
      "Flexible availability for events and weekends"
    ],
    specialties: [
      "Bridal Makeup",
      "Special Event",
      "Natural Looks",
      "Dramatic Looks",
      "Airbrush Application",
      "Lash Application"
    ]
  },
  freelanceMakeupArtist: {
    title: "Freelance Makeup Artist",
    description: "We are looking for a freelance makeup artist to provide makeup services for weddings, photo shoots, and other events. Must have own transportation and equipment.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract",
    compensation_type: "per service",
    compensation_details: "Per service fee",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Proven makeup artistry experience",
      "Own transportation and equipment",
      "Professional makeup kit"
    ],
    specialties: [
      "Bridal Makeup",
      "Special Event",
      "Photo Shoots"
    ]
  },
  makeupCounterArtist: {
    title: "Makeup Counter Artist",
    description: "We are seeking a makeup artist to work at our makeup counter. Must have excellent customer service skills and be knowledgeable about our products.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "part-time",
    compensation_type: "hourly",
    compensation_details: "Hourly wage plus commission",
    weekly_pay: true,
    has_housing: false,
    requirements: [
      "Excellent customer service skills",
      "Knowledge of our products",
      "Makeup artistry experience"
    ],
    specialties: [
      "Product Knowledge",
      "Customer Service",
      "Makeup Application"
    ]
  }
};

const boothTemplates: JobTemplate = {
  boothRental: {
    title: "Booth Rental Available - Prime Location",
    description: "We have booth rental opportunities available in our well-established salon. Our location offers high foot traffic, a supportive salon community, and beautiful, modern facilities. Perfect for hairstylists, nail techs, or estheticians looking to grow their clientele.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract", // Updated from "booth rental" to match JobTypeOption
    compensation_type: "booth rental",
    compensation_details: "$200-250 weekly booth rental",
    weekly_pay: false,
    has_housing: false,
    has_wax_room: true,
    requirements: [
      "Current professional license",
      "Minimum 1 year of experience",
      "Own clientele preferred but not required",
      "Professional attitude and appearance",
      "Reliable and responsible",
      "Must provide own equipment and supplies"
    ],
    specialties: [
      "Hair Styling",
      "Nail Services",
      "Skincare",
      "Waxing",
      "Lashes",
      "Microblading"
    ]
  },
  hairBoothRental: {
    title: "Hair Stylist - Booth Rental",
    description: "Booth rental available for a hair stylist in our upscale salon. Great opportunity to be your own boss and set your own hours.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract",
    compensation_type: "booth rental",
    compensation_details: "Weekly booth rental fee",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Valid cosmetology license",
      "Own clientele",
      "Professional attitude"
    ],
    specialties: [
      "Haircuts",
      "Coloring",
      "Styling"
    ]
  },
  nailBoothRental: {
    title: "Nail Technician - Booth Rental",
    description: "Booth rental available for a nail technician in our busy salon. Great opportunity to build your clientele and be your own boss.",
    vietnameseDescription: "",
    location: "",
    salonName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    jobType: "contract",
    compensation_type: "booth rental",
    compensation_details: "Weekly booth rental fee",
    weekly_pay: false,
    has_housing: false,
    requirements: [
      "Valid nail technician license",
      "Own clientele",
      "Professional attitude"
    ],
    specialties: [
      "Manicures",
      "Pedicures",
      "Acrylics"
    ]
  }
};

export const getJobTemplates = (type: JobTemplateType) => {
  switch (type) {
    case "nail":
      return nailTemplates;
    case "hair":
      return hairTemplates;
    case "spa":
      return spaTemplates;
    case "barber":
      return barberTemplates;
    case "massage":
      return massageTemplates;
    case "tattoo":
      return tattooTemplates;
    case "makeup":
      return makeupTemplates;
    case "booth":
      return boothTemplates;
    default:
      return {};
  }
};

export const getAllTemplates = () => {
  return {
    ...nailTemplates,
    ...hairTemplates,
    ...spaTemplates,
    ...barberTemplates,
    ...massageTemplates,
    ...tattooTemplates,
    ...makeupTemplates,
    ...boothTemplates
  };
};
