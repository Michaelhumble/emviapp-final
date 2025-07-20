
export interface JobPrefillData {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary: string;
  location: string;
  employmentType?: string;
  vietnameseDescription?: string;
  category: string; // MANDATORY - No more general category allowed
}

const jobPrefills: Record<string, JobPrefillData> = {
  'nails': {
    category: 'nails',
    title: 'Nail Technician',
    company: 'Premier Nail Salon',
    description: 'We are seeking a skilled and passionate Nail Technician to join our team. The ideal candidate will have experience in manicures, pedicures, nail art, and gel applications. You will provide exceptional nail care services while maintaining the highest standards of hygiene and customer service.',
    requirements: [
      'Valid nail technician license',
      '1+ years of nail service experience',
      'Knowledge of nail art techniques',
      'Experience with gel and acrylic applications',
      'Strong attention to detail',
      'Excellent customer service skills'
    ],
    benefits: [
      'Competitive commission structure',
      'Flexible scheduling',
      'Product discounts',
      'Continuing education opportunities',
      'Health insurance options',
      'Paid vacation time'
    ],
    salary: '$15-25/hour + commission',
    location: 'Houston, TX',
    employmentType: 'full-time',
    vietnameseDescription: 'Chúng tôi đang tìm kiếm một kỹ thuật viên nail có kỹ năng và đam mê để gia nhập đội ngũ của chúng tôi.'
  },
  'hair': {
    category: 'hair',
    title: 'Hair Stylist',
    company: 'Elite Hair Studio',
    description: 'Join our dynamic team as a Hair Stylist! We are looking for a creative professional with expertise in cutting, coloring, and styling. You will work with a diverse clientele and have the opportunity to showcase your artistic skills while building lasting relationships with clients.',
    requirements: [
      'Valid cosmetology license',
      '2+ years of hair styling experience',
      'Proficiency in cutting and coloring techniques',
      'Knowledge of current hair trends',
      'Strong communication skills',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'Base salary plus commission',
      'Advanced training opportunities',
      'Product allowance',
      'Flexible schedule options',
      'Career advancement opportunities',
      'Employee discounts'
    ],
    salary: '$18-30/hour + commission',
    location: 'Los Angeles, CA',
    employmentType: 'full-time'
  },
  'barber': {
    category: 'barber',
    title: 'Professional Barber',
    company: 'Classic Cuts Barbershop',
    description: 'We are seeking an experienced Barber to provide exceptional grooming services to our male clientele. The ideal candidate will be skilled in traditional and modern barbering techniques, including straight razor shaves, beard trims, and contemporary men\'s haircuts.',
    requirements: [
      'Valid barber license',
      '2+ years of barbering experience',
      'Expertise in men\'s haircuts and styling',
      'Straight razor shaving skills',
      'Knowledge of beard and mustache grooming',
      'Professional appearance and demeanor'
    ],
    benefits: [
      'Competitive pay structure',
      'Booth rental options available',
      'Flexible scheduling',
      'Product discounts',
      'Mentorship opportunities',
      'Loyal client base'
    ],
    salary: '$20-35/hour + tips',
    location: 'Chicago, IL',
    employmentType: 'full-time'
  },
  'brows-lashes': {
    category: 'brows-lashes',
    title: 'Eyelash Extension Technician',
    company: 'Luxe Lash Studio',
    description: 'We are looking for a certified Eyelash Extension Technician to join our growing team. You will specialize in applying individual and volume lash extensions, lash lifts, and brow services. Precision, attention to detail, and excellent customer service are essential.',
    requirements: [
      'Eyelash extension certification',
      '1+ years of lash extension experience',
      'Knowledge of various lash techniques',
      'Steady hands and attention to detail',
      'Understanding of eye safety protocols',
      'Customer service excellence'
    ],
    benefits: [
      'High earning potential',
      'Flexible scheduling',
      'Advanced training provided',
      'Product discounts',
      'Commission-based pay',
      'Professional development opportunities'
    ],
    salary: '$20-40/hour + commission',
    location: 'Miami, FL',
    employmentType: 'part-time'
  },
  'skincare': {
    category: 'skincare',
    title: 'Licensed Esthetician',
    company: 'Radiant Skin Spa',
    description: 'Join our spa team as a Licensed Esthetician! You will provide comprehensive skincare treatments including facials, chemical peels, microdermabrasion, and skin analysis. We seek someone passionate about skincare with excellent technical skills and a commitment to client satisfaction.',
    requirements: [
      'Valid esthetician license',
      '1+ years of facial treatment experience',
      'Knowledge of skin analysis techniques',
      'Experience with skincare equipment',
      'Understanding of various skin conditions',
      'Strong interpersonal skills'
    ],
    benefits: [
      'Competitive base pay plus commission',
      'Product training and education',
      'Spa service discounts',
      'Flexible scheduling',
      'Career growth opportunities',
      'Health benefits available'
    ],
    salary: '$16-28/hour + commission',
    location: 'Phoenix, AZ',
    employmentType: 'full-time'
  },
  'massage': {
    category: 'massage',
    title: 'Spa Technician',
    company: 'Serenity Wellness Spa',
    description: 'We are seeking a skilled Spa Technician to provide relaxing body treatments, wraps, and therapeutic services. The ideal candidate will have experience in various spa modalities and a passion for helping clients achieve wellness and relaxation goals.',
    requirements: [
      'Massage therapy or spa certification',
      '1+ years of spa treatment experience',
      'Knowledge of body wrap techniques',
      'Understanding of aromatherapy',
      'Physical stamina for hands-on work',
      'Calm and professional demeanor'
    ],
    benefits: [
      'Competitive hourly rate',
      'Tips and gratuities',
      'Spa service benefits',
      'Flexible part-time schedules',
      'Peaceful work environment',
      'Professional development'
    ],
    salary: '$15-25/hour + tips',
    location: 'San Diego, CA',
    employmentType: 'part-time'
  },
  'massage-therapist': {
    category: 'massage',
    title: 'Licensed Massage Therapist',
    company: 'Therapeutic Touch Wellness',
    description: 'Join our wellness center as a Licensed Massage Therapist. You will provide therapeutic massage services including Swedish, deep tissue, and specialty treatments. We value therapists who are dedicated to client wellness and maintaining the highest professional standards.',
    requirements: [
      'Valid massage therapy license',
      '2+ years of massage experience',
      'Knowledge of various massage modalities',
      'Understanding of anatomy and physiology',
      'Strong hands and physical endurance',
      'Professional communication skills'
    ],
    benefits: [
      'Competitive pay rates',
      'Flexible scheduling options',
      'Continuing education support',
      'Professional liability coverage',
      'Client referral bonuses',
      'Wellness benefits'
    ],
    salary: '$25-45/hour + tips',
    location: 'Austin, TX',
    employmentType: 'full-time'
  },
  'tattoo': {
    category: 'tattoo',
    title: 'Tattoo Artist',
    company: 'Ink Masters Studio',
    description: 'We are seeking a talented Tattoo Artist to join our creative team. The ideal candidate will have a strong portfolio, excellent artistic skills, and experience in various tattoo styles. You will work with clients to create custom designs and execute high-quality tattoo work.',
    requirements: [
      'Tattoo artist certification/license',
      '3+ years of tattoo experience',
      'Strong artistic portfolio',
      'Knowledge of tattoo safety protocols',
      'Various style expertise',
      'Customer consultation skills'
    ],
    benefits: [
      'High earning potential',
      'Artistic freedom',
      'Booth rental options',
      'Equipment provided',
      'Marketing support',
      'Collaborative environment'
    ],
    salary: '$30-60/hour + tips',
    location: 'Portland, OR',
    employmentType: 'full-time'
  },
  'general': {
    category: 'general',
    title: 'Salon Receptionist',
    company: 'Glamour Beauty Salon',
    description: 'We are looking for a friendly and organized Receptionist to be the first point of contact for our salon. You will manage appointments, handle payments, assist clients, and maintain the front desk operations. Strong communication and multitasking skills are essential.',
    requirements: [
      'High school diploma or equivalent',
      'Previous receptionist or customer service experience',
      'Excellent phone and communication skills',
      'Computer proficiency',
      'Multitasking abilities',
      'Professional appearance and attitude'
    ],
    benefits: [
      'Competitive hourly wage',
      'Employee discounts on services',
      'Paid training provided',
      'Regular schedule',
      'Team environment',
      'Growth opportunities'
    ],
    salary: '$12-18/hour',
    location: 'Dallas, TX',
    employmentType: 'full-time'
  },
  'makeup': {
    category: 'makeup',
    title: 'Makeup Artist',
    company: 'Artistry Beauty Studio',
    description: 'We are seeking a talented Makeup Artist to provide professional makeup services for various occasions including bridal, special events, and photoshoots. The ideal candidate will have expertise in different makeup techniques and excellent client consultation skills.',
    requirements: [
      'Professional makeup artistry certification',
      '2+ years of makeup experience',
      'Portfolio of completed work',
      'Knowledge of various makeup techniques',
      'Color theory understanding',
      'Excellent client communication skills'
    ],
    benefits: [
      'Competitive pay per service',
      'Flexible scheduling',
      'Product discounts',
      'Portfolio building opportunities',
      'Referral bonuses',
      'Continuing education support'
    ],
    salary: '$25-75/hour per service',
    location: 'Atlanta, GA',
    employmentType: 'part-time'
  }
};

export const getJobPrefillByIndustry = (templateId: string): JobPrefillData => {
  console.log('🔍 getJobPrefillByIndustry called with templateId:', templateId);
  
  const prefillData = jobPrefills[templateId] || jobPrefills['nails'];
  
  console.log('📋 Returning prefill data for', templateId, ':', prefillData);
  
  return prefillData;
};

export default jobPrefills;
