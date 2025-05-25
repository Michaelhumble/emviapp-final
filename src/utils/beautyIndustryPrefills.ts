
export interface JobPrefillData {
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  salary?: string;
}

const industryPrefills: Record<string, JobPrefillData> = {
  'nail-tech': {
    title: 'Nail Technician',
    company: 'Professional Nail Salon',
    location: 'City, State',
    description: 'We are seeking an experienced nail technician to join our busy salon. The ideal candidate will provide high-quality manicures, pedicures, and nail art services to our diverse clientele. Must be passionate about nail care and customer service.',
    requirements: '• Valid nail technician license\n• 2+ years of experience in nail services\n• Knowledge of sanitation and safety protocols\n• Experience with acrylics, gels, and nail art\n• Excellent customer service skills',
    benefits: '• Competitive commission structure (40-60%)\n• Flexible scheduling\n• Professional development opportunities\n• Supply discounts\n• Supportive team environment',
    salary: '$800-1200/week potential earnings'
  },
  'hair-stylist': {
    title: 'Hair Stylist',
    company: 'Modern Hair Studio',
    location: 'City, State',
    description: 'Join our creative team as a hair stylist! We are looking for a talented professional who excels in cutting, coloring, and styling. Our salon values creativity, continuous learning, and exceptional client care.',
    requirements: '• Valid cosmetology license\n• 3+ years of hair styling experience\n• Proficient in cutting, coloring, and styling\n• Knowledge of current trends and techniques\n• Strong communication skills',
    benefits: '• Commission-based pay (45-65%)\n• Continuing education support\n• Product discounts\n• Flexible hours\n• Modern salon environment',
    salary: '$1000-1800/week potential earnings'
  },
  'barber': {
    title: 'Barber',
    company: 'Classic Barber Shop',
    location: 'City, State',
    description: 'Traditional barber shop seeking skilled barber specializing in classic and modern men\'s cuts. Join our team where craftsmanship meets contemporary style in a welcoming atmosphere.',
    requirements: '• Valid barber license\n• 2+ years of barbering experience\n• Expertise in classic cuts and fades\n• Straight razor and hot towel experience\n• Professional appearance and demeanor',
    benefits: '• Competitive commission (50-70%)\n• Established clientele\n• Traditional barber shop atmosphere\n• Flexible scheduling\n• Tips and bonuses',
    salary: '$900-1500/week potential earnings'
  },
  'lash-tech': {
    title: 'Lash Technician',
    company: 'Beauty Lash Studio',
    location: 'City, State',
    description: 'Experienced lash technician needed for our growing lash extension studio. Specialize in classic, volume, and hybrid lash applications while providing exceptional client experiences.',
    requirements: '• Certified lash extension training\n• 1+ years of lash application experience\n• Knowledge of different lash techniques\n• Attention to detail and precision\n• Client consultation skills',
    benefits: '• High commission structure\n• Flexible appointments\n• Premium lash supplies provided\n• Ongoing training opportunities\n• Growing client base',
    salary: '$700-1300/week potential earnings'
  },
  'esthetician': {
    title: 'Esthetician',
    company: 'Luxury Spa & Wellness',
    location: 'City, State',
    description: 'Join our spa team as a licensed esthetician providing facial treatments, skin analysis, and skincare consultations. Help clients achieve their skincare goals in our relaxing environment.',
    requirements: '• Valid esthetics license\n• 2+ years of facial treatment experience\n• Knowledge of skin analysis and treatment\n• Product knowledge and sales ability\n• Professional and calming demeanor',
    benefits: '• Competitive hourly rate plus commission\n• Spa employee discounts\n• Relaxing work environment\n• Professional development\n• Health benefits available',
    salary: '$18-25/hour plus commission'
  },
  'massage-therapist': {
    title: 'Massage Therapist',
    company: 'Wellness Center & Spa',
    location: 'City, State',
    description: 'Licensed massage therapist wanted for our wellness center. Provide therapeutic and relaxation massage services while maintaining the highest standards of professionalism.',
    requirements: '• Valid massage therapy license\n• 1+ years of professional experience\n• Knowledge of various massage techniques\n• Strong anatomy and physiology knowledge\n• Excellent physical stamina',
    benefits: '• Competitive hourly rate\n• Flexible scheduling\n• Professional massage supplies provided\n• Continuing education support\n• Peaceful work environment',
    salary: '$25-40/hour based on experience'
  },
  'receptionist': {
    title: 'Salon Receptionist',
    company: 'Busy Beauty Salon',
    location: 'City, State',
    description: 'Front desk receptionist needed for our bustling salon. Handle appointments, client check-ins, payments, and provide excellent customer service as the first point of contact.',
    requirements: '• High school diploma or equivalent\n• 1+ years of customer service experience\n• Strong phone and communication skills\n• Computer and scheduling software proficiency\n• Multi-tasking abilities',
    benefits: '• Competitive hourly wage\n• Employee discounts on services\n• Friendly team environment\n• Training provided\n• Growth opportunities',
    salary: '$15-18/hour plus tips'
  },
  'salon-manager': {
    title: 'Salon Manager',
    company: 'Premier Beauty Salon',
    location: 'City, State',
    description: 'Experienced salon manager needed to oversee daily operations, manage staff, and ensure exceptional client experiences. Lead our team to success in a thriving salon environment.',
    requirements: '• 3+ years of salon management experience\n• Strong leadership and communication skills\n• Knowledge of salon operations and scheduling\n• Staff training and development experience\n• Financial management abilities',
    benefits: '• Competitive salary plus bonuses\n• Management benefits package\n• Leadership development opportunities\n• Established salon with loyal clientele\n• Growth potential',
    salary: '$45,000-65,000/year plus bonuses'
  }
};

export const getJobPrefillByIndustry = (industryId: string): JobPrefillData => {
  console.log('getJobPrefillByIndustry called with industryId:', industryId);
  
  const prefillData = industryPrefills[industryId] || {};
  console.log('Prefill data found:', prefillData);
  
  return prefillData;
};
