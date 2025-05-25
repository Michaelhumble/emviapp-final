
export interface JobPrefillData {
  title: string;
  company: string;
  location: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
}

export const beautyIndustryPrefills: Record<string, JobPrefillData> = {
  'nails': {
    title: 'Nail Technician',
    company: 'Your Salon Name',
    location: 'City, State',
    description: 'We are seeking a skilled and passionate Nail Technician to join our team. The ideal candidate will provide exceptional nail care services including manicures, pedicures, nail art, and gel applications while maintaining the highest standards of cleanliness and customer service.',
    requirements: [
      'Valid nail technician license',
      'Minimum 1 year of experience in nail services',
      'Knowledge of nail care techniques and current trends',
      'Excellent customer service skills',
      'Attention to detail and artistic ability'
    ],
    benefits: [
      'Competitive commission structure',
      'Flexible scheduling',
      'Continuing education opportunities',
      'Professional product discounts',
      'Supportive team environment'
    ]
  },
  'hair': {
    title: 'Hair Stylist',
    company: 'Your Salon Name', 
    location: 'City, State',
    description: 'Join our dynamic salon team as a Hair Stylist! We are looking for a creative and skilled professional who specializes in cutting, coloring, and styling. The perfect candidate will have a passion for hair artistry and building lasting client relationships.',
    requirements: [
      'Valid cosmetology license',
      '2+ years of hair styling experience',
      'Proficiency in cutting, coloring, and styling techniques',
      'Strong communication and interpersonal skills',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'Booth rental or commission options',
      'Advanced training opportunities',
      'Flexible schedule',
      'Professional development support',
      'Modern salon environment'
    ]
  },
  'lashes': {
    title: 'Lash Technician',
    company: 'Your Beauty Studio',
    location: 'City, State', 
    description: 'We are seeking a detail-oriented Lash Technician to provide premium eyelash extension services. The ideal candidate will have expertise in various lash techniques and a commitment to creating beautiful, natural-looking results for our clients.',
    requirements: [
      'Certified lash extension training',
      'Minimum 6 months of lash experience',
      'Knowledge of different lash techniques and styles',
      'Steady hands and excellent attention to detail',
      'Professional appearance and demeanor'
    ],
    benefits: [
      'High commission rates',
      'Flexible appointment scheduling',
      'Premium lash products provided',
      'Ongoing training and certification',
      'Growing clientele base'
    ]
  },
  'esthetician': {
    title: 'Esthetician',
    company: 'Your Spa & Wellness Center',
    location: 'City, State',
    description: 'Join our wellness team as a licensed Esthetician! We are looking for someone passionate about skincare who can provide a range of facial treatments, skin analysis, and personalized skincare recommendations to help clients achieve their best skin.',
    requirements: [
      'Valid esthetician license', 
      'Knowledge of skin analysis and treatment techniques',
      'Experience with facial treatments and skincare products',
      'Excellent client consultation skills',
      'Commitment to ongoing education in skincare'
    ],
    benefits: [
      'Competitive hourly rate plus tips',
      'Product commission opportunities',
      'Continuing education allowance',
      'Relaxing spa environment',
      'Health and wellness benefits'
    ]
  },
  'massage': {
    title: 'Massage Therapist',
    company: 'Your Wellness Center',
    location: 'City, State',
    description: 'We are seeking a licensed Massage Therapist to join our wellness team. The ideal candidate will provide therapeutic and relaxation massage services while creating a peaceful, healing environment for our clients.',
    requirements: [
      'Valid massage therapy license',
      'Certification in multiple massage techniques',
      'Strong knowledge of anatomy and physiology',
      'Excellent communication and listening skills',
      'Professional and compassionate demeanor'
    ],
    benefits: [
      'Competitive rates and gratuities',
      'Flexible scheduling options',
      'Peaceful work environment',
      'Professional development opportunities',
      'Employee wellness benefits'
    ]
  },
  'barber': {
    title: 'Barber',
    company: 'Your Barbershop',
    location: 'City, State',
    description: 'Join our traditional barbershop as a skilled Barber! We are looking for someone who excels in classic and modern men\'s grooming services including haircuts, beard trims, and straight razor shaves.',
    requirements: [
      'Valid barber license',
      'Proficiency in classic and modern cutting techniques',
      'Experience with beard grooming and straight razor',
      'Strong customer service skills',
      'Knowledge of men\'s grooming trends'
    ],
    benefits: [
      'Chair rental or commission structure',
      'Established clientele available',
      'Traditional barbershop atmosphere',
      'Flexible scheduling',
      'Professional growth opportunities'
    ]
  }
};

export const getJobPrefillByIndustry = (industry: string): JobPrefillData | null => {
  const normalizedIndustry = industry.toLowerCase().replace(/[^a-z]/g, '');
  return beautyIndustryPrefills[normalizedIndustry] || null;
};
