
import { JobTemplate } from '@/components/posting/job/jobFormSchema';
import { IndustryType } from '@/utils/posting/types';

const nailsTemplate: JobTemplate = {
  id: 'nails-1',
  title: 'Nail Technician Needed',
  industry: 'nails',
  salonName: 'Glamour Nails & Spa',
  description: `We're looking for talented nail technicians to join our busy salon. Great opportunity in a friendly environment with consistent client flow.

Our salon is well-established with loyal clients and is located in a high-traffic area.`,
  vietnameseDescription: `Chúng tôi đang tìm kiếm thợ nail tài năng để tham gia vào tiệm salon bận rộn của chúng tôi. Cơ hội tuyệt vời trong môi trường thân thiện với lượng khách hàng ổn định.

Salon của chúng tôi đã được thành lập với nhiều khách hàng trung thành và nằm ở khu vực có lưu lượng khách cao.`,
  location: 'Houston, TX',
  jobType: 'full-time',
  compensation_type: 'commission',
  compensation_details: '60% commission',
  weekly_pay: true,
  has_housing: false,
  has_wax_room: true,
  owner_will_train: false,
  no_supply_deduction: true,
  salary_range: '$800-1200/week',
  experience_level: '2+ years preferred',
  requirements: [
    '2+ years experience preferred',
    'Client-friendly attitude',
    'Reliable transportation',
    'Clean and organized',
    'Team player'
  ],
  specialties: [
    'Gel Manicures',
    'Pedicures',
    'Acrylic Nails',
    'Nail Art',
    'Dipping Powder'
  ],
  thumbnailUrl: '/assets/thumbnails/nails.jpg',
  contactName: 'Kim Nguyen',
  contactEmail: 'salon@example.com',
  contactPhone: '(123) 456-7890'
};

const hairTemplate: JobTemplate = {
  id: 'hair-1',
  title: 'Experienced Hair Stylist',
  industry: 'hair',
  salonName: 'Elite Hair Studio',
  description: `Join our upscale salon as a skilled hair stylist. We're looking for someone with a passion for creating beautiful styles and building a loyal client base.

Our team focuses on continual education and staying current with the latest trends and techniques.`,
  vietnameseDescription: '',
  location: 'Dallas, TX',
  jobType: 'full-time',
  compensation_type: 'hybrid',
  compensation_details: 'Base + Commission',
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: true,
  salary_range: '$50,000-70,000/year',
  experience_level: '3+ years required',
  requirements: [
    'Cosmetology license required',
    'Portfolio of work',
    'Color expertise',
    'Cutting techniques',
    'Customer service skills'
  ],
  specialties: [
    'Hair Coloring',
    'Balayage',
    'Haircuts',
    'Bridal Styling',
    'Extensions'
  ],
  thumbnailUrl: '/assets/thumbnails/hair.jpg',
  contactName: 'Jessica Smith',
  contactEmail: 'elite@example.com',
  contactPhone: '(123) 555-7890'
};

const lashesTemplate: JobTemplate = {
  id: 'lashes-1',
  title: 'Lash Artist / Technician',
  industry: 'lashes',
  salonName: 'Flutter Beauty Bar',
  description: `We are seeking a detail-oriented lash artist to provide exceptional lash extension services to our growing clientele. Join our luxury beauty bar and grow your career in a supportive environment.

Perfect opportunity for someone who takes pride in their precision and artistry.`,
  vietnameseDescription: '',
  location: 'Austin, TX',
  jobType: 'full-time',
  compensation_type: 'commission',
  compensation_details: '50-60% commission',
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: true,
  no_supply_deduction: false,
  salary_range: '$700-1000/week',
  experience_level: '1+ year preferred',
  requirements: [
    'Lash certification required',
    'Attention to detail',
    'Professional demeanor',
    'Comfortable with social media',
    'Punctual and reliable'
  ],
  specialties: [
    'Classic Lashes',
    'Volume Lashes',
    'Hybrid Lashes',
    'Lash Lifts',
    'Lash Tinting'
  ],
  thumbnailUrl: '/assets/thumbnails/lashes.jpg',
  contactName: 'Maria Lopez',
  contactEmail: 'flutter@example.com',
  contactPhone: '(123) 789-4560'
};

const massageTemplate: JobTemplate = {
  id: 'massage-1',
  title: 'Licensed Massage Therapist',
  industry: 'massage',
  salonName: 'Serenity Wellness Spa',
  description: `Serenity Wellness Spa is looking for a licensed massage therapist to join our peaceful, client-focused spa. We offer various modalities to meet our clients' needs in a serene environment.

Flexible scheduling available with growing client base and competitive compensation.`,
  vietnameseDescription: '',
  location: 'San Antonio, TX',
  jobType: 'part-time',
  compensation_type: 'hourly',
  compensation_details: '$20-25/hr + tips',
  weekly_pay: true,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: true,
  salary_range: '$30-45/hour with tips',
  experience_level: 'Licensed with 2+ years experience',
  requirements: [
    'Licensed massage therapist',
    'Multiple modality knowledge',
    'Professional demeanor',
    'Physically capable',
    'Customer-focused'
  ],
  specialties: [
    'Deep Tissue',
    'Swedish Massage',
    'Hot Stone',
    'Sports Massage',
    'Aromatherapy'
  ],
  thumbnailUrl: '/assets/thumbnails/massage.jpg',
  contactName: 'David Johnson',
  contactEmail: 'serenity@example.com',
  contactPhone: '(123) 456-7890'
};

const tattooTemplate: JobTemplate = {
  id: 'tattoo-1',
  title: 'Experienced Tattoo Artist',
  industry: 'tattoo',
  salonName: 'Ink & Art Collective',
  description: `Looking for a passionate tattoo artist to join our creative studio. We provide a clean, professional environment with a steady stream of clients and freedom for artistic expression.

The ideal candidate has a strong portfolio and can create custom designs while maintaining the highest standards of safety and sanitation.`,
  vietnameseDescription: '',
  location: 'Austin, TX',
  jobType: 'full-time',
  compensation_type: 'commission',
  compensation_details: '60% commission',
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: true,
  salary_range: 'Based on experience and clientele',
  experience_level: '3+ years required',
  requirements: [
    'Professional portfolio required',
    'Licensed/certified',
    'Clean and precise work',
    'Knowledge of sanitation practices',
    'Client communication skills'
  ],
  specialties: [
    'Traditional',
    'Realism',
    'Watercolor',
    'Japanese',
    'Blackwork'
  ],
  thumbnailUrl: '/assets/thumbnails/tattoo.jpg',
  contactName: 'Alex Rivera',
  contactEmail: 'inkartstudio@example.com',
  contactPhone: '(123) 456-7890'
};

const browsTemplate: JobTemplate = {
  id: 'brows-1',
  title: 'Brow Specialist/Microblading Artist',
  industry: 'brows',
  salonName: 'Arch Beauty Studio',
  description: `We are expanding our team and looking for a talented brow specialist with microblading experience. Join our modern, Instagram-worthy studio with a focus on brow artistry and client satisfaction.

Training opportunities available for the right candidate with basic experience wanting to enhance their skills.`,
  vietnameseDescription: '',
  location: 'Houston, TX',
  jobType: 'full-time',
  compensation_type: 'commission',
  compensation_details: '50% commission with bonus structure',
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: true,
  no_supply_deduction: true,
  salary_range: '$800-1500/week depending on clientele',
  experience_level: '1+ year preferred',
  requirements: [
    'Microblading certification',
    'Brow shaping expertise',
    'Portfolio of work',
    'Social media savvy',
    'Excellent customer service'
  ],
  specialties: [
    'Microblading',
    'Brow Tinting',
    'Brow Lamination',
    'Henna Brows',
    'Eyebrow Design'
  ],
  thumbnailUrl: '/assets/thumbnails/brows.jpg',
  contactName: 'Sarah Chen',
  contactEmail: 'arch@example.com',
  contactPhone: '(123) 456-7890'
};

const skincareTemplate: JobTemplate = {
  id: 'skincare-1',
  title: 'Licensed Esthetician',
  industry: 'skincare',
  salonName: 'Glow Skincare & Wellness',
  description: `Join our results-driven skincare studio as a licensed esthetician. We focus on delivering transformative skincare treatments in a serene, upscale environment.

Great opportunity to work with premium products and advanced treatments while building a loyal client base.`,
  vietnameseDescription: '',
  location: 'Dallas, TX',
  jobType: 'full-time',
  compensation_type: 'hybrid',
  compensation_details: 'Hourly + Commission',
  weekly_pay: true,
  has_housing: false,
  has_wax_room: true,
  owner_will_train: false,
  no_supply_deduction: true,
  salary_range: '$40,000-60,000/year',
  experience_level: '2+ years preferred',
  requirements: [
    'Licensed esthetician',
    'Knowledge of advanced treatments',
    'Retail sales experience',
    'Professional appearance',
    'Excellent communication skills'
  ],
  specialties: [
    'Chemical Peels',
    'Microdermabrasion',
    'Hydrafacial',
    'LED Therapy',
    'Acne Treatments'
  ],
  thumbnailUrl: '/assets/thumbnails/skincare.jpg',
  contactName: 'Emily Taylor',
  contactEmail: 'glow@example.com',
  contactPhone: '(123) 456-7890'
};

const barberTemplate: JobTemplate = {
  id: 'barber-1',
  title: 'Experienced Barber',
  industry: 'barber',
  salonName: 'Legacy Barber Lounge',
  description: `Legacy Barber Lounge is seeking a skilled barber to join our premium men's grooming establishment. We offer a sophisticated environment where clients receive exceptional grooming services and enjoy the classic barbershop experience.

Strong technical skills and client rapport are essential for this position.`,
  vietnameseDescription: '',
  location: 'Houston, TX',
  jobType: 'full-time',
  compensation_type: 'commission',
  compensation_details: '65% commission',
  weekly_pay: true,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: true,
  salary_range: '$1,000-1,500/week',
  experience_level: '3+ years required',
  requirements: [
    'Barber license required',
    'Fades and traditional cutting techniques',
    'Straight razor shave experience',
    'Professional appearance',
    'Punctuality and reliability'
  ],
  specialties: [
    'Classic Cuts',
    'Fades',
    'Beard Trims',
    'Hot Towel Shaves',
    'Hair Design'
  ],
  thumbnailUrl: '/assets/thumbnails/barber.jpg',
  contactName: 'James Wilson',
  contactEmail: 'legacy@example.com',
  contactPhone: '(123) 456-7890'
};

const makeupTemplate: JobTemplate = {
  id: 'makeup-1',
  title: 'Makeup Artist',
  industry: 'makeup',
  salonName: 'Glamour Studio',
  description: `Seeking a versatile makeup artist for our beauty studio specializing in events, photoshoots, and personal clients. Join our team of creative professionals in a collaborative environment.

Opportunity to work on diverse clientele and various makeup styles from natural to dramatic looks.`,
  vietnameseDescription: '',
  location: 'Austin, TX',
  jobType: 'part-time',
  compensation_type: 'commission',
  compensation_details: '50% commission + retail commission',
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: true,
  no_supply_deduction: true,
  salary_range: 'Based on bookings and experience',
  experience_level: '1+ year preferred',
  requirements: [
    'Professional makeup kit',
    'Knowledge of different skin types',
    'Excellent color theory understanding',
    'Portfolio of work',
    'Availability for weekend events'
  ],
  specialties: [
    'Bridal Makeup',
    'Special Event Makeup',
    'Natural Looks',
    'Dramatic Evening Looks',
    'Airbrush Makeup'
  ],
  thumbnailUrl: '/assets/thumbnails/makeup.jpg',
  contactName: 'Nicole Adams',
  contactEmail: 'glamourstudio@example.com',
  contactPhone: '(123) 456-7890'
};

const customTemplate: JobTemplate = {
  id: 'custom-1',
  title: 'Beauty Professional',
  industry: 'custom',
  salonName: 'Your Salon Name',
  description: `Describe the position and what makes your salon special. Include information about the work environment, client base, and any unique benefits of working with your team.

Add details about scheduling, responsibilities, and growth opportunities.`,
  vietnameseDescription: '',
  location: 'Your City, State',
  jobType: 'full-time',
  compensation_type: 'commission',
  compensation_details: '',
  weekly_pay: false,
  has_housing: false,
  has_wax_room: false,
  owner_will_train: false,
  no_supply_deduction: false,
  salary_range: '',
  experience_level: '',
  requirements: [
    'Add your requirements here',
    'Such as experience level',
    'Certifications needed',
    'Specific skills'
  ],
  specialties: [
    'Add specialties here',
    'Services you offer',
    'Techniques needed'
  ],
  thumbnailUrl: '/assets/thumbnails/custom.jpg',
  contactName: 'Your Name',
  contactEmail: 'your.email@example.com',
  contactPhone: '(XXX) XXX-XXXX'
};

const templates: Record<IndustryType, JobTemplate> = {
  nails: nailsTemplate,
  hair: hairTemplate,
  lashes: lashesTemplate,
  massage: massageTemplate,
  tattoo: tattooTemplate,
  brows: browsTemplate,
  skincare: skincareTemplate,
  barber: barberTemplate,
  makeup: makeupTemplate,
  custom: customTemplate
};

export const getJobTemplate = (type: IndustryType): JobTemplate => {
  return templates[type] || customTemplate;
};

export const getAllTemplates = (): Record<IndustryType, JobTemplate> => {
  return templates;
};

export default {
  getJobTemplate,
  getAllTemplates
};
