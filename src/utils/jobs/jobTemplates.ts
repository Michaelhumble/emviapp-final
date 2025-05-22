
import { JobFormValues } from "@/components/posting/job/jobFormSchema";

// Define available industry types
export type JobTemplateType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare' | 'barber' | 'makeup' | 'custom' | 'spa' | 'receptionist' | 'manager' | 'beauty' | 'booth';

/**
 * Get a template for a specific industry
 */
export const getJobTemplate = (industry: JobTemplateType): JobFormValues => {
  switch (industry) {
    case 'nails':
      return {
        salonName: '',
        title: 'Nail Technician',
        description: 'Looking for an experienced nail technician who specializes in manicures, pedicures, and nail art. Join our team and work with a supportive staff in a clean, modern salon environment.',
        vietnameseDescription: 'Cần thợ nail có kinh nghiệm chuyên làm bột, dip, và vẽ móng. Tham gia đội ngũ của chúng tôi và làm việc với đội ngũ hỗ trợ trong môi trường tiệm sạch sẽ, hiện đại.',
        location: '',
        compensation_type: 'commission',
        compensation_details: 'Up to 70% commission based on experience',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$800-1500+ weekly',
        experience_level: 'All levels',
        specialties: ['Manicures', 'Pedicures', 'Dipping Powder', 'Gel Polish', 'Acrylic', 'Nail Art'],
        requirements: ['Valid nail technician license', 'Customer service skills', 'Reliable transportation']
      };
    case 'hair':
      return {
        salonName: '',
        title: 'Hair Stylist',
        description: 'We are seeking a talented hair stylist with a passion for creating beautiful styles. The ideal candidate should have experience with cutting, coloring, and styling for diverse hair types and textures.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: '50-60% commission depending on experience',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$800-1800+ weekly',
        experience_level: 'Minimum 1 year',
        specialties: ['Cutting', 'Coloring', 'Balayage', 'Styling', 'Hair Treatments'],
        requirements: ['Cosmetology license', 'Strong technical skills', 'Portfolio of work']
      };
    case 'lashes':
      return {
        salonName: '',
        title: 'Lash Artist',
        description: 'Join our team as a skilled Lash Artist! We are looking for a detail-oriented, steady-handed professional who can create beautiful, customized lash sets. Experience with classic, hybrid, and volume techniques preferred.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: '50-65% commission based on experience and client retention',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$700-1500 weekly',
        experience_level: '1+ year preferred',
        specialties: ['Classic Lashes', 'Volume Lashes', 'Hybrid Sets', 'Lash Lifts', 'Lash Tinting'],
        requirements: ['Lash certification', 'Attention to detail', 'Good eye-hand coordination']
      };
    case 'booth':
      return {
        salonName: '',
        title: 'Booth Rental Available',
        description: 'Prime booth rental available in a busy, upscale salon. Great location with high foot traffic and existing clientele. Perfect for established beauty professionals looking for independence with the support of a salon community.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'booth-rental',
        compensation_details: 'Weekly or monthly booth rental options available',
        weekly_pay: 'false',
        has_housing: false,
        has_wax_room: true,
        owner_will_train: false,
        no_supply_deduction: true,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: 'Varies based on your clientele',
        experience_level: 'Established professionals only',
        specialties: ['Independent Contractor', 'Self-Employed', 'Booth Rental'],
        requirements: ['Must have existing clientele', 'Valid professional license', 'Business insurance']
      };
    case 'skincare':
      return {
        salonName: '',
        title: 'Esthetician',
        description: 'We are looking for a licensed Esthetician to join our spa team. The ideal candidate will have experience with facials, chemical peels, waxing, and other skincare treatments. Must be passionate about helping clients achieve healthy skin.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'hourly',
        compensation_details: 'Competitive hourly rate plus commission on product sales',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: true,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$700-1400 weekly',
        experience_level: '1+ years preferred',
        specialties: ['Facials', 'Chemical Peels', 'Microdermabrasion', 'Waxing', 'Skin Analysis'],
        requirements: ['Esthetician license', 'Knowledge of skincare products', 'Customer service skills']
      };
    case 'barber':
      return {
        salonName: '',
        title: 'Barber',
        description: 'Looking for a skilled barber to join our growing team. Must be proficient in modern cutting techniques, fades, beard trimming, and razor work. Experience with diverse hair textures is a plus.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: '60-70% commission with opportunity for booth rental later',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$800-1800 weekly',
        experience_level: '2+ years',
        specialties: ['Fades', 'Tapers', 'Beard Trims', 'Razor Shaves', 'Line-ups'],
        requirements: ['Barber license', 'Own tools', 'Portfolio of work']
      };
    case 'massage':
      return {
        salonName: '',
        title: 'Massage Therapist',
        description: 'We are seeking a licensed Massage Therapist to join our wellness center. The ideal candidate will be skilled in several modalities and able to customize treatments based on client needs. Professional environment with established clientele.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: '50-60% commission plus tips',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$700-1600 weekly',
        experience_level: 'Licensed, all experience levels',
        specialties: ['Swedish Massage', 'Deep Tissue', 'Hot Stone', 'Prenatal Massage', 'Sports Massage'],
        requirements: ['Massage therapy license', 'Professional demeanor', 'Physical stamina']
      };
    case 'tattoo':
      return {
        salonName: '',
        title: 'Tattoo Artist',
        description: 'Established tattoo studio looking for experienced artists to join our team. Must have a strong portfolio demonstrating technical skill and artistic ability. Clean, professional environment with steady client flow.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: '50-60% commission on all work',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: 'Depends on clientele and output',
        experience_level: '3+ years',
        specialties: ['Traditional', 'Neo-traditional', 'Realism', 'Black and Grey', 'Color Work'],
        requirements: ['Professional portfolio', 'Bloodborne pathogens certification', 'Clean and consistent line work']
      };
    case 'brows':
      return {
        salonName: '',
        title: 'Brow Artist / Microblading Specialist',
        description: 'Seeking a skilled brow artist specialized in microblading, brow lamination, and tinting. Must have an eye for symmetry and face shape assessment. Join our upscale salon serving a discerning clientele.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: '45-55% commission with retail bonus',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$800-1800 weekly',
        experience_level: 'Minimum 1 year in brow services',
        specialties: ['Microblading', 'Brow Lamination', 'Brow Tinting', 'Threading', 'Brow Mapping'],
        requirements: ['Microblading certification', 'Esthetician license', 'Portfolio of before/after photos']
      };
    case 'makeup':
      return {
        salonName: '',
        title: 'Makeup Artist',
        description: 'Creative makeup artist needed for our beauty studio. Looking for someone with experience in bridal, special occasion, and everyday makeup applications. Must be able to work with all skin types and tones.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: '50% commission plus product commission',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: 'Varies by bookings',
        experience_level: '2+ years',
        specialties: ['Bridal Makeup', 'Special Occasion', 'Natural Looks', 'Dramatic Looks', 'Airbrush'],
        requirements: ['Professional makeup kit', 'Portfolio of work', 'Excellent color theory knowledge']
      };
    case 'spa':
      return {
        salonName: '',
        title: 'Spa Therapist',
        description: 'Full-service day spa seeking a skilled therapist for our wellness team. Should be experienced in multiple spa treatments including body wraps, scrubs, and relaxation therapies. Serene environment with focus on guest experience.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'hourly',
        compensation_details: 'Competitive hourly rate plus treatment commission',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: true,
        owner_will_train: true,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$600-1200 weekly',
        experience_level: '1+ years in spa setting',
        specialties: ['Body Wraps', 'Body Scrubs', 'Hydrotherapy', 'Relaxation Treatments', 'Aromatherapy'],
        requirements: ['Massage or esthetician license', 'Spa experience', 'Professional demeanor']
      };
    case 'receptionist':
      return {
        salonName: '',
        title: 'Salon Receptionist / Front Desk',
        description: 'Busy salon seeking a friendly, organized receptionist to manage front desk operations. Responsibilities include scheduling appointments, greeting clients, handling phone calls, and processing payments. Must have excellent customer service skills.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'hourly',
        compensation_details: 'Competitive hourly rate plus bonuses',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: true,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$15-20 per hour',
        experience_level: 'Entry level to experienced',
        specialties: ['Customer Service', 'Scheduling', 'Retail Sales', 'Phone Skills', 'Computer Skills'],
        requirements: ['Professional appearance', 'Reliable transportation', 'Computer proficiency']
      };
    case 'manager':
      return {
        salonName: '',
        title: 'Salon Manager',
        description: 'Experienced salon manager needed to oversee daily operations of our established beauty business. Responsibilities include staff supervision, inventory management, scheduling, and ensuring exceptional client experiences. Leadership skills essential.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'salary',
        compensation_details: 'Competitive salary plus performance bonuses',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '$45,000-60,000 annually',
        experience_level: '3+ years in salon management',
        specialties: ['Staff Management', 'Operations', 'Customer Service', 'Inventory', 'Scheduling'],
        requirements: ['Salon management experience', 'Leadership skills', 'Computer proficiency']
      };
    case 'beauty':
      return {
        salonName: '',
        title: 'Beauty Professional',
        description: 'Looking for licensed beauty professionals to join our growing team. Whether your specialty is waxing, threading, permanent makeup, or another beauty service, we welcome skilled practitioners to apply. Flexible scheduling available.',
        vietnameseDescription: '',
        location: '',
        compensation_type: 'commission',
        compensation_details: 'Competitive commission structure based on service type',
        weekly_pay: 'true',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: 'Varies by specialty',
        experience_level: 'All levels considered',
        specialties: ['Waxing', 'Threading', 'Permanent Makeup', 'Body Treatments', 'Specialty Services'],
        requirements: ['Appropriate licensing for services offered', 'Professional demeanor', 'Client-focused attitude']
      };
    default:
    case 'custom':
      return {
        salonName: '',
        title: '',
        description: '',
        vietnameseDescription: '',
        location: '',
        compensation_type: undefined,
        compensation_details: '',
        weekly_pay: 'false',
        has_housing: false,
        has_wax_room: false,
        owner_will_train: false,
        no_supply_deduction: false,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        salary_range: '',
        experience_level: '',
        specialties: [],
        requirements: []
      };
  }
};

export const getJobTemplates = getJobTemplate;
