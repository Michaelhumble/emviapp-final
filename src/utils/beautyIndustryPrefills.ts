
export interface JobPrefillData {
  title: string;
  company: string;
  location: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  salary?: string;
  experience?: string;
  schedule?: string;
}

export const beautyIndustryPrefills: Record<string, JobPrefillData> = {
  'nails': {
    title: 'Nail Technician',
    company: 'Your Salon Name',
    location: 'City, State',
    salary: '$25,000 - $45,000 + Tips',
    experience: '1+ years preferred',
    schedule: 'Full-time, Flexible Hours',
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
    salary: '$30,000 - $60,000 + Commission',
    experience: '2+ years preferred',
    schedule: 'Full-time/Part-time Available',
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
    salary: '$28,000 - $55,000',
    experience: '6 months+ preferred',
    schedule: 'Flexible Appointments',
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
    salary: '$32,000 - $50,000 + Tips',
    experience: '1+ years preferred',
    schedule: 'Full-time, Some Weekends',
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
    salary: '$35,000 - $65,000',
    experience: '1+ years preferred',
    schedule: 'Full-time/Part-time',
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
    salary: '$28,000 - $55,000 + Tips',
    experience: '1+ years preferred',
    schedule: 'Full-time, Some Evenings',
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
  },
  'makeup': {
    title: 'Makeup Artist',
    company: 'Your Beauty Studio',
    location: 'City, State',
    salary: '$25,000 - $50,000 + Commission',
    experience: '1+ years preferred',
    schedule: 'Flexible, Event-based',
    description: 'We are seeking a talented Makeup Artist to join our beauty team. The ideal candidate will specialize in bridal, special event, and everyday makeup applications with a keen eye for color and current beauty trends.',
    requirements: [
      'Professional makeup artistry certification',
      'Portfolio demonstrating various makeup styles',
      'Knowledge of current beauty trends and techniques',
      'Excellent color matching and blending skills',
      'Strong interpersonal and communication skills'
    ],
    benefits: [
      'Competitive commission structure',
      'Access to professional makeup products',
      'Flexible scheduling for events',
      'Networking opportunities',
      'Creative work environment'
    ]
  },
  'spa': {
    title: 'Spa Therapist',
    company: 'Your Day Spa',
    location: 'City, State',
    salary: '$30,000 - $48,000 + Tips',
    experience: '1+ years preferred',
    schedule: 'Full-time, Weekends',
    description: 'Join our luxury day spa as a Spa Therapist! We are looking for someone who can provide a variety of spa treatments including body wraps, scrubs, and relaxation therapies in a serene environment.',
    requirements: [
      'Spa therapy certification',
      'Experience with various spa treatments',
      'Knowledge of spa products and protocols',
      'Excellent customer service skills',
      'Ability to create a relaxing atmosphere'
    ],
    benefits: [
      'Competitive hourly rate plus tips',
      'Luxury spa environment',
      'Professional development opportunities',
      'Employee spa discounts',
      'Wellness-focused workplace'
    ]
  },
  'piercing': {
    title: 'Body Piercer',
    company: 'Your Piercing Studio',
    location: 'City, State',
    salary: '$30,000 - $55,000 + Tips',
    experience: '2+ years required',
    schedule: 'Full-time, Some Evenings',
    description: 'We are seeking an experienced Body Piercer to join our professional piercing studio. The ideal candidate will have extensive knowledge of piercing techniques, anatomy, and strict adherence to safety and sanitation protocols.',
    requirements: [
      'Professional piercing certification',
      'Minimum 2 years of piercing experience',
      'Knowledge of anatomy and piercing placement',
      'Strict adherence to safety and sanitation protocols',
      'Excellent customer consultation skills'
    ],
    benefits: [
      'Competitive hourly rate plus tips',
      'Professional piercing environment',
      'High-quality jewelry and tools provided',
      'Continuing education support',
      'Growing client base'
    ]
  },
  'microblading': {
    title: 'Microblading Artist',
    company: 'Your Brow Studio',
    location: 'City, State',
    salary: '$35,000 - $70,000',
    experience: '1+ years preferred',
    schedule: 'By Appointment',
    description: 'We are seeking a skilled Microblading Artist to provide permanent makeup services. The ideal candidate will have expertise in eyebrow design, color theory, and precise hand technique to create natural-looking results.',
    requirements: [
      'Certified microblading training',
      'Portfolio of microblading work',
      'Knowledge of color theory and skin undertones',
      'Steady hands and attention to detail',
      'Understanding of aftercare protocols'
    ],
    benefits: [
      'High earning potential',
      'Premium microblading supplies provided',
      'Flexible appointment scheduling',
      'Continuing education opportunities',
      'Professional growth potential'
    ]
  }
};

export const getJobPrefillByIndustry = (industry: string): JobPrefillData | null => {
  const normalizedIndustry = industry.toLowerCase().replace(/[^a-z]/g, '');
  return beautyIndustryPrefills[normalizedIndustry] || null;
};

// Helper function to get all available industries
export const getAvailableIndustries = (): string[] => {
  return Object.keys(beautyIndustryPrefills);
};

// Helper function to check if an industry has prefill data
export const hasIndustryPrefill = (industry: string): boolean => {
  const normalizedIndustry = industry.toLowerCase().replace(/[^a-z]/g, '');
  return normalizedIndustry in beautyIndustryPrefills;
};
