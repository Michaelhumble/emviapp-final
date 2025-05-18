
import { JobFormValues, IndustryType } from './jobFormSchema';

// Template cards displayed in the UI
export const templateCards = [
  {
    id: 'nails',
    emoji: '💅',
    title: 'Nail Tech Superstar',
    subtitle: 'Magic hands, happy clients',
    slogan: 'Find your salon soulmate!',
  },
  {
    id: 'hair',
    emoji: '💇‍♀️',
    title: 'Hair Stylist Wizard',
    subtitle: 'Cutting-edge talent wanted',
    slogan: 'Grow your glam squad!',
  },
  {
    id: 'lashes',
    emoji: '👁️',
    title: 'Lash Artist',
    subtitle: 'Creating stunning looks',
    slogan: 'Join our luxury team!',
  },
  {
    id: 'massage',
    emoji: '💆‍♀️',
    title: 'Massage Therapist',
    subtitle: 'Wellness professional',
    slogan: 'Elevate your career!',
  },
  {
    id: 'brows',
    emoji: '🧿',
    title: 'Brow Expert',
    subtitle: 'Shape perfect arches',
    slogan: 'Show off your artistry!',
  },
  {
    id: 'skincare',
    emoji: '✨',
    title: 'Esthetician',
    subtitle: 'Skincare specialist',
    slogan: 'Make clients glow!',
  },
  {
    id: 'tattoo',
    emoji: '🎨',
    title: 'Tattoo Artist',
    subtitle: 'Create lasting art',
    slogan: 'Express your creativity!',
  },
  {
    id: 'barber',
    emoji: '✂️',
    title: 'Master Barber',
    subtitle: 'Precision cuts & style',
    slogan: 'Join our barbering family!',
  },
  {
    id: 'makeup',
    emoji: '💋',
    title: 'Makeup Artist',
    subtitle: 'Beauty transformation pro',
    slogan: 'Create stunning looks!',
  },
  {
    id: 'custom',
    emoji: '✏️',
    title: 'Create My Own',
    subtitle: 'Start from scratch',
    slogan: 'Feeling creative? Let\'s go!',
  },
];

// The actual job templates with full data for form pre-filling
export const jobTemplates: Record<'custom' | IndustryType, JobFormValues> = {
  // Nail Tech template
  nails: {
    title: 'Experienced Nail Technician Needed',
    description: 'Looking for a skilled nail technician to join our busy salon. Must be experienced in all nail services including gel, acrylics, dip powder, and nail art. Great atmosphere and clientele, flexible schedule available. Competitive commission and tips.',
    vietnameseDescription: 'Cần thợ nail có kinh nghiệm để tham gia tiệm salon nhộn nhịp của chúng tôi. Phải có kinh nghiệm về tất cả các dịch vụ làm móng bao gồm gel, acrylic, bột nhúng và nghệ thuật móng. Không khí làm việc tốt và khách hàng ổn định, lịch trình linh hoạt. Hoa hồng và tiền boa cạnh tranh.',
    location: 'Houston, TX',
    compensation_details: 'Commission-based pay structure with booth rental option available. Weekly pay, no supply deduction.',
    salary_range: '$800-$1,500/week',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'hiring@glamournails.com',
    requirements: [
      'Valid cosmetology or nail technician license',
      '2+ years experience in nail services',
      'Proficiency in gel, acrylic, and dip applications',
      'Knowledge of proper sanitation procedures',
      'Customer service oriented',
      'Available to work weekends'
    ],
    specialties: ['Acrylic Extensions', 'Gel Polish', 'Nail Art', 'Pedicures', 'Manicures']
  },

  // Hair Stylist template
  hair: {
    title: 'Creative Hair Stylist Position',
    description: 'Join our upscale salon as a hair stylist! We are looking for a passionate professional with excellent customer service skills and a strong portfolio. Opportunities for growth and education.',
    location: 'Miami, FL',
    compensation_details: 'Competitive commission structure plus retail commission. Health benefits available for full-time stylists.',
    salary_range: '$45,000-$70,000/year',
    jobType: 'full-time',
    experience_level: 'intermediate',
    contactEmail: 'careers@luxehairstudio.com',
    requirements: [
      'Active cosmetology license',
      'Minimum 1 year salon experience',
      'Color formulation knowledge',
      'Cutting and styling proficiency',
      'Excellent communication skills',
      'Portfolio of work'
    ],
    specialties: ['Color Specialist', 'Balayage', 'Extensions', 'Cutting', 'Styling']
  },

  // Lash Artist template
  lashes: {
    title: 'Certified Lash Technician Needed',
    description: 'Seeking an experienced lash artist to join our beauty studio. Must be certified in classic and volume lash extensions with attention to detail and excellent time management.',
    location: 'Dallas, TX',
    compensation_details: 'Competitive commission rates, flexible scheduling, and opportunities for advanced training.',
    salary_range: '$50-$75 per set + tips',
    jobType: 'part-time',
    experience_level: 'experienced',
    contactEmail: 'join@flutterlashes.com',
    requirements: [
      'Lash certification (classic and volume)',
      'Minimum 6 months professional experience',
      'Own professional kit and tools',
      'Portfolio of work',
      'Excellent time management',
      'Weekend availability'
    ],
    specialties: ['Classic Extensions', 'Volume Extensions', 'Hybrid Sets', 'Lash Lifts', 'Tinting']
  },

  // Barber template
  barber: {
    title: 'Master Barber Position Available',
    description: 'Modern barbershop seeking experienced barber for our growing clientele. Must excel in classic cuts, fades, beard grooming, and straight razor shaves. Join our team-oriented atmosphere with high earning potential.',
    location: 'Atlanta, GA',
    compensation_details: 'Commission-based with guaranteed minimum. Weekly pay structure with booth rental option for experienced professionals.',
    salary_range: '$900-$1,800/week',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'careers@sharpcuts.com',
    requirements: [
      'Valid barber license',
      'Minimum 2 years professional experience',
      'Proficiency in fades, tapers, and classic cuts',
      'Beard trimming and straight razor shaving skills',
      'Excellent customer service',
      'Ability to maintain client relationships'
    ],
    specialties: ['Skin Fades', 'Beard Design', 'Straight Razor Shaves', 'Hair Design', 'Hot Towel Service']
  },

  // Makeup Artist template
  makeup: {
    title: 'Professional Makeup Artist Wanted',
    description: 'Luxury beauty studio seeking talented makeup artist for our clientele. Experience with bridal, special occasion, and photoshoot makeup necessary. Must have excellent color theory and working knowledge of various skin types and tones.',
    location: 'Los Angeles, CA',
    compensation_details: 'Commission-based pay with product discounts and paid professional development opportunities.',
    salary_range: '$50-$150 per service + retail commission',
    jobType: 'part-time',
    experience_level: 'intermediate',
    contactEmail: 'artistry@glamstudio.com',
    requirements: [
      'Professional makeup certification preferred',
      'Minimum 1 year experience in beauty industry',
      'Strong portfolio demonstrating versatility',
      'Knowledge of current trends and techniques',
      'Excellent sanitization practices',
      'Available for weekend appointments'
    ],
    specialties: ['Bridal', 'Special Occasion', 'Airbrush', 'Editorial', 'Natural Makeup']
  },

  // Massage Therapist template
  massage: {
    title: 'Licensed Massage Therapist Position',
    description: 'Wellness center seeking licensed massage therapist to provide therapeutic treatments to our clients. Experience in deep tissue, Swedish, and sports massage preferred.',
    location: 'Denver, CO',
    compensation_details: 'Hourly plus tips, or commission-based options available. Flexible scheduling.',
    salary_range: '$40-$60/hr + tips',
    jobType: 'part-time',
    experience_level: 'intermediate',
    contactEmail: 'hr@wellnessspa.com',
    requirements: [
      'Current massage therapy license',
      'Liability insurance',
      'Knowledge of multiple massage modalities',
      'Good physical stamina',
      'Professional demeanor',
      'Excellent communication skills'
    ],
    specialties: ['Deep Tissue', 'Swedish', 'Hot Stone', 'Prenatal', 'Sports Massage']
  },

  // Brow specialist template
  brows: {
    title: 'Eyebrow Specialist/Microblading Artist',
    description: 'Upscale beauty bar seeking skilled brow artist experienced in shaping, tinting, lamination, and microblading. Must have an eye for symmetry and facial proportions.',
    location: 'Chicago, IL',
    compensation_details: 'Commission-based with guaranteed minimum. Monthly performance bonuses available.',
    salary_range: '$45,000-$65,000/year',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'careers@browstudio.com',
    requirements: [
      'Microblading certification',
      'Brow lamination certification',
      'Minimum 1 year professional experience',
      'Portfolio of work',
      'Detail-oriented with steady hands',
      'Excellent color matching skills'
    ],
    specialties: ['Microblading', 'Brow Lamination', 'Brow Tinting', 'Threading', 'Brow Mapping']
  },

  // Skincare Specialist template
  skincare: {
    title: 'Licensed Esthetician Needed',
    description: 'Medical spa seeking licensed esthetician with experience in clinical skincare treatments, chemical peels, microdermabrasion, and facial protocols. Must be knowledgeable about skincare ingredients and technologies.',
    location: 'Seattle, WA',
    compensation_details: 'Hourly base plus commission on services and retail. Medical benefits for full-time employees.',
    salary_range: '$40,000-$60,000/year',
    jobType: 'full-time',
    experience_level: 'intermediate',
    contactEmail: 'jobs@medispa.com',
    requirements: [
      'Current esthetics license',
      'Minimum 1 year spa or medical spa experience',
      'Knowledge of medical-grade skincare lines',
      'Experience with chemical peels and microdermabrasion',
      'Understanding of skin conditions and contraindications',
      'Excellent sanitation practices'
    ],
    specialties: ['Medical Facials', 'Chemical Peels', 'Microdermabrasion', 'LED Light Therapy', 'Extraction Techniques']
  },

  // Tattoo Artist template
  tattoo: {
    title: 'Experienced Tattoo Artist Wanted',
    description: 'Professional tattoo studio seeking an experienced artist to join our team. Must have a strong portfolio demonstrating technical skill and artistic ability. Clean, professional shop with established clientele.',
    location: 'Portland, OR',
    compensation_details: 'Booth rental or commission-based options available. Flexible schedule.',
    salary_range: 'Commission-based',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'art@inkstudio.com',
    requirements: [
      'Minimum 3 years professional tattooing experience',
      'Strong portfolio showcasing range and skill',
      'Bloodborne pathogen certification',
      'Excellent drawing and design skills',
      'Knowledge of proper sterilization techniques',
      'Professional attitude and good communication'
    ],
    specialties: ['Traditional', 'Realism', 'Watercolor', 'Black and Grey', 'Cover-ups']
  },

  // Custom/empty template
  custom: {
    title: '',
    description: '',
    location: '',
    compensation_details: '',
    salary_range: '',
    jobType: 'full-time',
    experience_level: 'entry',
    contactEmail: '',
    requirements: [],
    specialties: []
  }
};

// Export type instead of regular export for type definitions
export type { JobFormValues, IndustryType };
