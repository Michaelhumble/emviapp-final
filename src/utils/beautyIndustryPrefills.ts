
export interface JobPrefillData {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary: string;
  location: string;
  employmentType?: string;
  compensationType?: string;
  specialties?: string[];
  features?: string[];
}

const beautyIndustryPrefills: Record<string, JobPrefillData> = {
  'nail-tech': {
    title: 'Licensed Nail Technician',
    company: 'Premium Nail Studio',
    description: 'We are seeking an experienced and passionate Licensed Nail Technician to join our upscale nail salon team. The ideal candidate will provide exceptional manicure, pedicure, and nail art services while maintaining the highest standards of cleanliness and customer service. You will work with premium products and the latest nail techniques in a modern, welcoming environment.',
    requirements: [
      'Valid state nail technician license',
      'Minimum 2+ years of professional nail experience',
      'Proficiency in gel, acrylic, and dip powder applications',
      'Knowledge of nail art techniques and designs',
      'Strong attention to detail and precision',
      'Excellent customer service and communication skills',
      'Ability to maintain sanitation and safety standards'
    ],
    benefits: [
      'Competitive commission structure (45-60%)',
      'Health insurance and dental coverage',
      'Paid vacation and sick leave',
      'Continuing education support',
      'Product discounts and free services',
      'Flexible scheduling options',
      'Opportunity for advancement'
    ],
    salary: '$40,000 - $65,000 annually plus tips',
    location: 'Various locations available',
    employmentType: 'Full-time',
    compensationType: 'Commission + Tips',
    specialties: ['Manicures', 'Pedicures', 'Nail Art', 'Gel Applications'],
    features: ['Modern equipment', 'Premium products', 'Client base provided']
  },

  'hair-stylist': {
    title: 'Professional Hair Stylist',
    company: 'Elite Hair Salon',
    description: 'Join our award-winning salon team as a skilled Hair Stylist! We are looking for a creative and technically proficient stylist who excels in cutting, coloring, and styling. Our salon offers a collaborative environment where you can grow your skills while working with a diverse clientele. We specialize in the latest trends and classic techniques.',
    requirements: [
      'Valid cosmetology license',
      'Minimum 3+ years of salon experience',
      'Expertise in cutting, coloring, and styling',
      'Knowledge of current hair trends and techniques',
      'Strong portfolio demonstrating skill range',
      'Excellent interpersonal and communication skills',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'High commission rate (50-65%)',
      'Medical and dental insurance',
      'Paid time off and holidays',
      'Advanced education opportunities',
      'Retail commission opportunities',
      'Flexible scheduling',
      'Established client referral system'
    ],
    salary: '$45,000 - $80,000 annually plus tips',
    location: 'Multiple salon locations',
    employmentType: 'Full-time',
    compensationType: 'Commission + Tips',
    specialties: ['Hair Cutting', 'Hair Coloring', 'Styling', 'Treatments'],
    features: ['High-end products', 'Modern salon', 'Continuing education']
  },

  'barber': {
    title: 'Master Barber',
    company: 'Classic Barber Shop',
    description: 'We are seeking a skilled Master Barber to join our traditional barbershop that values craftsmanship and attention to detail. The ideal candidate will excel in classic and modern cutting techniques, straight razor shaves, and beard grooming. Our shop maintains a welcoming atmosphere where tradition meets contemporary style.',
    requirements: [
      'Valid barber license',
      'Minimum 2+ years of barbering experience',
      'Proficiency in traditional and modern cutting techniques',
      'Straight razor shaving expertise',
      'Beard trimming and grooming skills',
      'Strong customer service abilities',
      'Understanding of classic barbering traditions'
    ],
    benefits: [
      'Competitive commission (50-60%)',
      'Health benefits package',
      'Paid vacation time',
      'Tool and product allowances',
      'Flexible work schedule',
      'Tip opportunities',
      'Professional development support'
    ],
    salary: '$38,000 - $70,000 annually plus tips',
    location: 'Downtown and suburban locations',
    employmentType: 'Full-time',
    compensationType: 'Commission + Tips',
    specialties: ['Hair Cutting', 'Straight Razor Shaves', 'Beard Grooming'],
    features: ['Traditional atmosphere', 'Quality tools', 'Loyal clientele']
  },

  'lash-tech': {
    title: 'Certified Lash Technician',
    company: 'Luxury Lash Studio',
    description: 'Join our premier lash extension studio as a Certified Lash Technician. We specialize in high-quality lash extensions and lash lifts, serving clients who demand excellence. The ideal candidate will have experience with various lash techniques and a passion for enhancing natural beauty through precise application.',
    requirements: [
      'Valid lash extension certification',
      'Minimum 1+ year of lash experience',
      'Proficiency in classic, volume, and hybrid techniques',
      'Knowledge of lash lift and tint procedures',
      'Excellent hand-eye coordination',
      'Strong attention to detail',
      'Customer service excellence'
    ],
    benefits: [
      'High commission structure (50-65%)',
      'Flexible scheduling options',
      'Health insurance available',
      'Paid training for new techniques',
      'Product discounts',
      'Bonus incentives',
      'Supportive team environment'
    ],
    salary: '$35,000 - $60,000 annually plus tips',
    location: 'Upscale studio locations',
    employmentType: 'Full-time or Part-time',
    compensationType: 'Commission + Tips',
    specialties: ['Lash Extensions', 'Lash Lifts', 'Lash Tinting'],
    features: ['Premium products', 'Comfortable workspace', 'Established clientele']
  },

  'esthetician': {
    title: 'Licensed Esthetician',
    company: 'Radiant Skin Spa',
    description: 'We are seeking a Licensed Esthetician to join our full-service spa team. The ideal candidate will provide professional facial treatments, skin analysis, and skincare consultations. Our spa focuses on results-driven treatments using medical-grade products and advanced techniques.',
    requirements: [
      'Valid esthetician license',
      'Minimum 2+ years of spa experience',
      'Knowledge of various facial techniques',
      'Experience with skincare analysis and treatment planning',
      'Familiarity with medical-grade skincare products',
      'Excellent customer service skills',
      'Continuing education in skincare trends'
    ],
    benefits: [
      'Competitive salary plus commission',
      'Full health benefits package',
      'Paid vacation and sick time',
      'Product training and education',
      'Employee spa services discount',
      'Performance bonuses',
      'Career advancement opportunities'
    ],
    salary: '$40,000 - $65,000 annually plus commission',
    location: 'Luxury spa locations',
    employmentType: 'Full-time',
    compensationType: 'Salary + Commission',
    specialties: ['Facials', 'Chemical Peels', 'Skincare Consultations'],
    features: ['Medical-grade products', 'Advanced equipment', 'Spa environment']
  },

  'spa-tech': {
    title: 'Spa Technician',
    company: 'Wellness Retreat Spa',
    description: 'Join our tranquil spa as a Spa Technician specializing in body treatments, wraps, and wellness services. We offer a holistic approach to beauty and wellness, providing clients with rejuvenating experiences. The ideal candidate will have experience in various spa modalities and a passion for helping clients achieve relaxation and wellness.',
    requirements: [
      'Spa certification or relevant training',
      'Experience in body treatments and wraps',
      'Knowledge of wellness and relaxation techniques',
      'Strong communication and interpersonal skills',
      'Ability to maintain a calm, professional demeanor',
      'Understanding of sanitation and safety protocols',
      'Physical ability to perform treatments'
    ],
    benefits: [
      'Hourly rate plus gratuities',
      'Health and wellness benefits',
      'Flexible scheduling',
      'Free spa services and products',
      'Training in new modalities',
      'Peaceful work environment',
      'Team building activities'
    ],
    salary: '$32,000 - $50,000 annually plus tips',
    location: 'Resort and day spa locations',
    employmentType: 'Full-time or Part-time',
    compensationType: 'Hourly + Tips',
    specialties: ['Body Treatments', 'Wraps', 'Wellness Services'],
    features: ['Tranquil environment', 'Holistic approach', 'Quality products']
  },

  'massage-therapist': {
    title: 'Licensed Massage Therapist',
    company: 'Therapeutic Wellness Center',
    description: 'We are seeking a Licensed Massage Therapist to join our wellness-focused practice. The ideal candidate will provide therapeutic and relaxation massage services, working with clients to address their specific needs. Our center emphasizes healing, wellness, and personalized care.',
    requirements: [
      'Valid massage therapy license',
      'Minimum 1+ year of professional experience',
      'Proficiency in Swedish, deep tissue, and therapeutic techniques',
      'Strong anatomy and physiology knowledge',
      'Excellent communication and listening skills',
      'Ability to assess client needs and adjust treatments',
      'Professional demeanor and ethics'
    ],
    benefits: [
      'Competitive hourly rate plus tips',
      'Flexible scheduling options',
      'Health insurance available',
      'Continuing education support',
      'Employee wellness benefits',
      'Professional development opportunities',
      'Supportive team environment'
    ],
    salary: '$35,000 - $55,000 annually plus tips',
    location: 'Wellness centers and spas',
    employmentType: 'Full-time or Part-time',
    compensationType: 'Hourly + Tips',
    specialties: ['Swedish Massage', 'Deep Tissue', 'Therapeutic Massage'],
    features: ['Professional environment', 'Quality equipment', 'Wellness focus']
  },

  'tattoo-artist': {
    title: 'Professional Tattoo Artist',
    company: 'Artistic Ink Studio',
    description: 'Join our established tattoo studio as a Professional Tattoo Artist. We are looking for a skilled artist with a strong portfolio and experience in various tattoo styles. Our studio maintains the highest standards of safety, artistry, and customer service while fostering a creative and professional environment.',
    requirements: [
      'Valid tattoo artist license',
      'Minimum 3+ years of tattooing experience',
      'Strong portfolio demonstrating artistic skill',
      'Proficiency in multiple tattoo styles',
      'Knowledge of safety and sanitation protocols',
      'Excellent customer consultation skills',
      'Ability to work independently and collaboratively'
    ],
    benefits: [
      'High commission rate (60-70%)',
      'Flexible scheduling',
      'Established client base',
      'Supply and equipment provided',
      'Convention and training opportunities',
      'Creative freedom',
      'Professional studio environment'
    ],
    salary: '$45,000 - $90,000 annually plus tips',
    location: 'Established studio locations',
    employmentType: 'Full-time or Part-time',
    compensationType: 'Commission + Tips',
    specialties: ['Custom Tattoos', 'Various Art Styles', 'Cover-ups'],
    features: ['Professional studio', 'Quality equipment', 'Artistic freedom']
  },

  'receptionist': {
    title: 'Salon Receptionist',
    company: 'Premier Beauty Salon',
    description: 'We are seeking a friendly and organized Salon Receptionist to be the first point of contact for our clients. The ideal candidate will manage appointments, handle client inquiries, process payments, and maintain the front desk operations. This role is essential to creating a welcoming atmosphere and ensuring smooth salon operations.',
    requirements: [
      'High school diploma or equivalent',
      'Previous customer service experience preferred',
      'Strong communication and interpersonal skills',
      'Proficiency with appointment booking systems',
      'Basic computer and phone skills',
      'Professional appearance and demeanor',
      'Ability to multitask in a busy environment'
    ],
    benefits: [
      'Competitive hourly wage',
      'Health insurance options',
      'Paid time off',
      'Employee service discounts',
      'Training and development opportunities',
      'Friendly work environment',
      'Flexible scheduling'
    ],
    salary: '$28,000 - $38,000 annually',
    location: 'Front desk salon positions',
    employmentType: 'Full-time or Part-time',
    compensationType: 'Hourly',
    specialties: ['Customer Service', 'Appointment Management', 'Front Desk Operations'],
    features: ['Professional environment', 'Team support', 'Growth opportunities']
  },

  'salon-manager': {
    title: 'Salon Manager',
    company: 'Upscale Beauty Salon',
    description: 'We are seeking an experienced Salon Manager to oversee daily operations, manage staff, and ensure exceptional client experiences. The ideal candidate will have strong leadership skills, business acumen, and extensive knowledge of salon operations. This role involves staff management, inventory control, and business development.',
    requirements: [
      'Minimum 5+ years of salon management experience',
      'Strong leadership and team management skills',
      'Business and financial management knowledge',
      'Excellent customer service and problem-solving abilities',
      'Knowledge of beauty industry trends and practices',
      'Experience with salon management software',
      'Professional license preferred'
    ],
    benefits: [
      'Competitive salary plus bonuses',
      'Comprehensive health benefits',
      'Paid vacation and holidays',
      'Professional development opportunities',
      'Performance-based incentives',
      'Management training programs',
      'Career advancement potential'
    ],
    salary: '$50,000 - $75,000 annually plus bonuses',
    location: 'Salon management positions',
    employmentType: 'Full-time',
    compensationType: 'Salary + Bonuses',
    specialties: ['Team Management', 'Business Operations', 'Customer Relations'],
    features: ['Leadership role', 'Business growth', 'Team development']
  },

  'booth-rental': {
    title: 'Booth Rental Opportunity',
    company: 'Independent Beauty Suites',
    description: 'Premium booth rental space available for licensed beauty professionals. Our modern facility offers fully equipped stations in a professional environment. Perfect for established stylists, nail technicians, or other beauty professionals looking to build their independent business while enjoying the benefits of a shared professional space.',
    requirements: [
      'Valid professional beauty license',
      'Minimum 2+ years of industry experience',
      'Established client base preferred',
      'Professional liability insurance',
      'Excellent customer service skills',
      'Self-motivated and business-minded',
      'Ability to maintain professional standards'
    ],
    benefits: [
      'Keep 100% of your earnings',
      'Flexible scheduling and hours',
      'Professional facility and equipment',
      'Shared common areas and amenities',
      'Utilities and wifi included',
      'Marketing support available',
      'Professional networking opportunities'
    ],
    salary: 'Weekly rental: $200 - $400 (location dependent)',
    location: 'Premium suite locations',
    employmentType: 'Independent Contractor',
    compensationType: 'Booth Rental',
    specialties: ['Independent Practice', 'Client Management', 'Business Development'],
    features: ['Modern facility', 'Professional environment', 'Business independence']
  },

  'makeup-artist': {
    title: 'Professional Makeup Artist',
    company: 'Glamour Beauty Studio',
    description: 'Join our team as a Professional Makeup Artist specializing in bridal, special events, and editorial makeup. We serve clients for weddings, photoshoots, special occasions, and everyday beauty needs. The ideal candidate will have strong technical skills, creativity, and the ability to enhance each client\'s natural beauty.',
    requirements: [
      'Professional makeup certification or equivalent experience',
      'Minimum 2+ years of makeup artistry experience',
      'Proficiency in bridal and special event makeup',
      'Knowledge of various makeup techniques and trends',
      'Strong portfolio showcasing diverse work',
      'Excellent color theory and application skills',
      'Professional kit with quality products'
    ],
    benefits: [
      'Competitive commission structure',
      'Flexible scheduling for events',
      'Product discounts and allowances',
      'Continuing education opportunities',
      'Wedding and event referrals',
      'Creative freedom and artistic growth',
      'Professional networking opportunities'
    ],
    salary: '$35,000 - $65,000 annually plus tips',
    location: 'Studio and on-location work',
    employmentType: 'Full-time or Part-time',
    compensationType: 'Commission + Tips',
    specialties: ['Bridal Makeup', 'Special Events', 'Editorial Makeup'],
    features: ['Creative work', 'Event opportunities', 'Professional growth']
  },

  'other-beauty': {
    title: 'Beauty Specialist',
    company: 'Specialized Beauty Services',
    description: 'We are seeking a skilled Beauty Specialist for specialized services including microblading, permanent makeup, threading, waxing, or other advanced beauty techniques. Our practice focuses on precision, safety, and exceptional results. The ideal candidate will have specialized training and experience in their area of expertise.',
    requirements: [
      'Valid certification in specialized beauty service',
      'Minimum 1+ year of specialized experience',
      'Advanced training in specific techniques',
      'Strong attention to detail and precision',
      'Knowledge of safety and sanitation protocols',
      'Excellent client consultation skills',
      'Commitment to continuing education'
    ],
    benefits: [
      'Competitive compensation structure',
      'Flexible scheduling options',
      'Advanced training opportunities',
      'Professional development support',
      'Quality products and equipment provided',
      'Established client referral system',
      'Specialized practice environment'
    ],
    salary: '$40,000 - $70,000 annually plus tips',
    location: 'Specialized beauty clinics',
    employmentType: 'Full-time or Part-time',
    compensationType: 'Commission + Tips',
    specialties: ['Microblading', 'Threading', 'Waxing', 'Specialized Services'],
    features: ['Specialized training', 'Advanced techniques', 'Professional growth']
  }
};

export const getJobPrefillByIndustry = (industryId: string): JobPrefillData => {
  console.log('🔍 getJobPrefillByIndustry called with industryId:', industryId);
  
  const prefillData = beautyIndustryPrefills[industryId];
  
  if (!prefillData) {
    console.warn('⚠️ No prefill data found for industry:', industryId);
    console.log('📋 Available industry keys:', Object.keys(beautyIndustryPrefills));
    
    // Return empty prefill structure if industry not found
    return {
      title: '',
      company: '',
      description: '',
      requirements: [],
      benefits: [],
      salary: '',
      location: '',
      employmentType: '',
      compensationType: '',
      specialties: [],
      features: []
    };
  }
  
  console.log('✅ Prefill data found for', industryId, ':', prefillData);
  console.log('📊 Prefill data keys:', Object.keys(prefillData));
  console.log('📝 Title:', prefillData.title);
  console.log('🏢 Company:', prefillData.company);
  console.log('📄 Description length:', prefillData.description.length);
  console.log('📋 Requirements count:', prefillData.requirements.length);
  console.log('🎁 Benefits count:', prefillData.benefits.length);
  
  return prefillData;
};

export default beautyIndustryPrefills;
