
import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export type JobTemplateType = 'nails' | 'hair' | 'lashes' | 'barber' | 'skincare' | 'spa' | 'receptionist' | 'manager' | 'massage' | 'tattoo' | 'makeup' | 'booth' | 'beauty' | 'custom';

export const getJobTemplate = (templateType: JobTemplateType): JobFormValues => {
  switch (templateType) {
    case 'nails':
      return {
        title: "Nail Technician",
        description: "Our salon is seeking an experienced nail technician to join our team. The ideal candidate will have experience with a variety of nail services including manicures, pedicures, gel polish, acrylics, and nail art. Must be able to provide excellent customer service and maintain a clean and sanitary work environment.",
        vietnameseDescription: "Tiệm nail của chúng tôi đang tìm kiếm thợ nail có kinh nghiệm. Ứng viên lý tưởng sẽ có kinh nghiệm với nhiều dịch vụ làm móng bao gồm manicure, pedicure, sơn gel, đắp bột, và vẽ móng. Phải có khả năng cung cấp dịch vụ khách hàng xuất sắc và duy trì môi trường làm việc sạch sẽ và vệ sinh.",
        location: "",
        compensation_details: "Competitive pay + tips",
        salary_range: "$80-150+/day depending on experience",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Manicures", "Pedicures", "Gel Polish", "Acrylics", "Nail Art", "SNS Dipping Powder", "Silk/Fiberglass Wraps"],
        requirements: ["Nail Technician License", "Minimum 1 year experience", "Excellent customer service skills", "Knowledge of sanitation practices", "Ability to work weekends", "English speaking preferred"]
      };
    case 'hair':
      return {
        title: "Hair Stylist",
        description: "We are looking for a talented Hair Stylist to join our team. The ideal candidate will have experience with cutting, coloring, styling, and hair treatments for diverse hair types and textures. You will be responsible for consulting with clients, recommending styles, and delivering excellent service.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Commission-based compensation + product commissions",
        salary_range: "60-70% commission",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Haircuts", "Color Services", "Balayage", "Highlights", "Blowouts", "Styling", "Hair Treatments", "Extensions"],
        requirements: ["Cosmetology License", "Minimum 2 years experience", "Portfolio of work", "Customer service skills", "Ability to stand for long periods", "Weekend availability"]
      };
    case 'lashes':
      return {
        title: "Lash Technician",
        description: "Our beauty studio is seeking a skilled Lash Technician to join our growing team. The ideal candidate will be experienced in classic and volume lash extensions, lash lifts, and tints. You will be responsible for providing exceptional lash services while maintaining a clean and welcoming environment.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive compensation + tips",
        salary_range: "Commission-based or hourly depending on experience",
        jobType: "part-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Classic Lash Extensions", "Volume Lash Extensions", "Hybrid Lashes", "Lash Lifts", "Lash Tints", "Lash Removal"],
        requirements: ["Lash Certification", "Minimum 6 months experience", "Excellent attention to detail", "Knowledge of lash health and safety", "Professional demeanor", "Available evenings/weekends"]
      };
    case 'barber':
      return {
        title: "Barber",
        description: "Modern barbershop seeking an experienced barber to join our team. The ideal candidate will be skilled in precision cutting, fading, beard trims, hot towel shaves, and current men's styling techniques. You will provide excellent grooming services while building a loyal client base.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Competitive commission or booth rental available",
        salary_range: "60-70% commission or $150-200/week booth rental",
        jobType: "full-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Precision Cutting", "Fades", "Tapers", "Beard Trims", "Hot Towel Shaves", "Line Ups", "Men's Styling", "Hair Design"],
        requirements: ["Barber License", "Minimum 1 year experience", "Excellent customer service", "Own tools and equipment", "Reliable transportation", "Ability to build clientele"]
      };
    case 'skincare':
      return {
        title: "Esthetician",
        description: "Upscale spa seeking a licensed Esthetician to perform facials, chemical peels, waxing, and other skin care services. The ideal candidate will have knowledge of skin types, conditions, and advanced treatments. You will provide customized skin care recommendations and deliver exceptional client experiences.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly + commission on services and products",
        salary_range: "Base pay plus 10-15% commission on product sales",
        jobType: "part-time",
        experience_level: "entry",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Facials", "Chemical Peels", "Microdermabrasion", "Waxing", "Skin Analysis", "LED Light Therapy", "Extractions", "Anti-aging Treatments"],
        requirements: ["Esthetician License", "Knowledge of skincare products", "Customer service skills", "Ability to recommend home care", "Comfortable with sales", "Professional appearance"]
      };
    case 'spa':
      return {
        title: "Spa Technician",
        description: "Wellness spa seeking a professional Spa Technician to provide body treatments, wraps, scrubs, and relaxation services. The ideal candidate will create a peaceful environment and deliver therapeutic experiences that promote health and wellbeing.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly + tips + service commission",
        salary_range: "$15-25/hour plus tips",
        jobType: "full-time",
        experience_level: "entry",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Body Treatments", "Body Wraps", "Salt Scrubs", "Hot Stone Therapy", "Aromatherapy", "Hydrotherapy", "Relaxation Techniques"],
        requirements: ["Appropriate licensing", "Minimum 1 year experience in spa environment", "Knowledge of body treatments", "Professional demeanor", "Physical stamina", "Customer service skills"]
      };
    case 'receptionist':
      return {
        title: "Salon Receptionist",
        description: "Busy salon seeking a friendly and organized receptionist to manage front desk operations. The ideal candidate will handle scheduling, check-ins, phone calls, and retail sales while creating a welcoming atmosphere for clients.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly + commission on retail sales",
        salary_range: "$13-17/hour",
        jobType: "part-time",
        experience_level: "entry",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Appointment Scheduling", "Client Relations", "Retail Sales", "Inventory Management", "Phone Operations", "Payment Processing"],
        requirements: ["Customer service experience", "Computer proficiency", "Knowledge of salon software preferred", "Professional phone manner", "Organizational skills", "Ability to multitask"]
      };
    case 'manager':
      return {
        title: "Salon Manager",
        description: "Established salon seeking an experienced manager to oversee daily operations, staff management, and business growth. The ideal candidate will have salon industry experience, leadership skills, and a passion for customer satisfaction and team development.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Salary + performance bonuses",
        salary_range: "$45,000-60,000/year",
        jobType: "full-time",
        experience_level: "senior",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Staff Management", "Scheduling", "Inventory Control", "Client Relations", "Business Development", "Performance Reviews", "Marketing Strategy"],
        requirements: ["Minimum 3 years salon management experience", "Leadership skills", "Business acumen", "Problem-solving abilities", "Computer proficiency", "Customer service excellence"]
      };
    case 'massage':
      return {
        title: "Massage Therapist",
        description: "Wellness center seeking a licensed Massage Therapist to provide therapeutic massage services. The ideal candidate will be skilled in various modalities and able to customize treatments to address client needs and promote overall wellbeing.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly + tips or commission structure",
        salary_range: "$20-30/hour plus tips",
        jobType: "part-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Swedish Massage", "Deep Tissue", "Sports Massage", "Hot Stone", "Prenatal Massage", "Reflexology", "Myofascial Release"],
        requirements: ["Massage Therapy License", "Liability insurance", "Knowledge of anatomy", "Physical stamina", "Customer service skills", "Professional boundaries"]
      };
    case 'tattoo':
      return {
        title: "Tattoo Artist",
        description: "Professional tattoo studio seeking an experienced Tattoo Artist to join our team. The ideal candidate will have a strong portfolio, excellent drawing skills, and knowledge of tattoo techniques and safety standards.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Commission-based compensation",
        salary_range: "50-70% commission",
        jobType: "full-time",
        experience_level: "experienced",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Custom Designs", "Cover-ups", "Black and Grey", "Color Work", "Traditional Style", "Japanese Style", "Realism", "Portraits"],
        requirements: ["Strong portfolio", "3+ years professional experience", "Bloodborne pathogen certification", "Equipment knowledge", "Artistic ability", "Customer consultation skills"]
      };
    case 'makeup':
      return {
        title: "Makeup Artist",
        description: "Beauty studio seeking a talented Makeup Artist to provide makeup services for special events, photoshoots, and personal consultations. The ideal candidate will be skilled in various makeup techniques and current trends.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Hourly + commission on retail",
        salary_range: "$15-25/hour plus retail commissions",
        jobType: "part-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Bridal Makeup", "Special Event Makeup", "Photoshoot Makeup", "Natural Looks", "Dramatic Looks", "Color Correction", "Makeup Lessons"],
        requirements: ["Makeup certification preferred", "Professional makeup kit", "Knowledge of different skin types", "Portfolio of work", "Customer service skills", "Retail sales ability"]
      };
    case 'booth':
      return {
        title: "Booth Rental Available",
        description: "Established salon offering booth rental for independent beauty professionals. Our modern, well-maintained space provides an ideal setting for building or bringing your clientele. Multiple rental options available to suit your business needs.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Weekly or monthly booth rental",
        salary_range: "$150-250/week or $500-800/month",
        jobType: "commission",
        experience_level: "experienced",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Prime Location", "High Foot Traffic", "Modern Facilities", "Utilities Included", "Flexible Hours", "Reception Services Available", "Product Commission Opportunities"],
        requirements: ["Valid professional license", "Liability insurance", "Professional demeanor", "Own clientele preferred", "Reliable transportation", "Willingness to maintain clean workspace"]
      };
    case 'beauty':
      return {
        title: "Other Beauty Professional",
        description: "Salon seeking a skilled beauty professional to provide specialized services such as microblading, permanent makeup, threading, waxing, or other in-demand beauty treatments. The ideal candidate will have certification and experience in their specialty area.",
        vietnameseDescription: "",
        location: "",
        compensation_details: "Commission-based or booth rental",
        salary_range: "50-60% commission or $150-200/week booth rental",
        jobType: "part-time",
        experience_level: "intermediate",
        contactEmail: "",
        contactPhone: "",
        specialties: ["Microblading", "Permanent Makeup", "Threading", "Body Waxing", "Brow Design", "Eyelash Perming", "Scalp Micropigmentation"],
        requirements: ["Relevant certification/license", "Minimum 1 year experience", "Professional kit and supplies", "Portfolio of work", "Insurance coverage", "Client management skills"]
      };
    case 'custom':
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
        contactPhone: "",
        requirements: [],
        specialties: []
      };
  }
};
