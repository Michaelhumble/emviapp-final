
import { JobFormValues, IndustryType } from './jobFormSchema';

// Template card data for the UI
export const templateCards = [
  {
    id: 'nails',
    emoji: '💅',
    title: 'Nail Technician',
    subtitle: 'Magic hands, happy clients',
    slogan: 'Find your salon soulmate!'
  },
  {
    id: 'hair',
    emoji: '💇‍♀️',
    title: 'Hair Stylist',
    subtitle: 'Create stunning transformations',
    slogan: 'Build your dream salon team!'
  },
  {
    id: 'lashes',
    emoji: '👁️',
    title: 'Lash Artist',
    subtitle: 'Expert in beautiful lashes',
    slogan: 'Extend your talent search!'
  },
  {
    id: 'massage',
    emoji: '💆‍♀️',
    title: 'Massage Therapist',
    subtitle: 'Healing hands, relaxing touch',
    slogan: 'Find your wellness expert!'
  },
  {
    id: 'tattoo',
    emoji: '🎨',
    title: 'Tattoo Artist',
    subtitle: 'Creative, skilled professionals',
    slogan: 'Ink your way to success!'
  },
  {
    id: 'brows',
    emoji: '✨',
    title: 'Brow Artist',
    subtitle: 'Perfect arches, defined looks',
    slogan: 'Raise your brow game!'
  },
  {
    id: 'skincare',
    emoji: '✨',
    title: 'Skincare Specialist',
    subtitle: 'Glowing results, happy clients',
    slogan: 'Reveal your best team!'
  },
  {
    id: 'barber',
    emoji: '✂️',
    title: 'Barber',
    subtitle: 'Classic cuts, modern style',
    slogan: 'Cut above the competition!'
  },
  {
    id: 'makeup',
    emoji: '💄',
    title: 'Makeup Artist',
    subtitle: 'Beauty transformations',
    slogan: 'Face your future together!'
  },
  {
    id: 'custom',
    emoji: '🌟',
    title: 'Custom Listing',
    subtitle: 'Create your own perfect post',
    slogan: 'Your vision, your way!'
  }
];

// Job templates data for pre-filling the form
export const jobTemplates: Record<IndustryType | 'custom', JobFormValues> = {
  nails: {
    title: 'Experienced Nail Technician Needed',
    description: 'We are looking for an experienced nail technician to join our busy salon. Must be skilled in acrylics, gel, and nail art. Great earning potential with a strong client base. Full-time position with flexible hours.',
    vietnameseDescription: 'Chúng tôi đang tìm kiếm một kỹ thuật viên làm móng có kinh nghiệm để tham gia vào tiệm salon nhộn nhịp của chúng tôi. Phải có kỹ năng về móng acrylic, gel và nghệ thuật móng. Tiềm năng thu nhập tuyệt vời với cơ sở khách hàng vững chắc. Vị trí toàn thời gian với giờ làm việc linh hoạt.',
    location: 'Houston, TX',
    compensation_details: 'Competitive pay + tips. Top performers earn $1,200-$1,800/week.',
    salary_range: '$800-$1800 weekly depending on experience',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'hiring@beautysalon.com',
    requirements: [
      'Minimum 2 years experience',
      'Acrylic and gel nail skills',
      'Nail art experience a plus',
      'Good English communication'
    ],
    specialties: [
      'Acrylic Nails',
      'Gel Polish',
      'Nail Art',
      'Pedicures'
    ]
  },
  hair: {
    title: 'Professional Hair Stylist Position Available',
    description: 'Upscale salon seeking talented hair stylist with a passion for creating beautiful, trendy styles. Experience with color, cuts, and special occasion styling required. Join our friendly, collaborative team and grow your career.',
    location: 'Atlanta, GA',
    compensation_details: 'Commission-based (up to 50%) plus product bonuses',
    salary_range: '$50K-$75K annually for experienced stylists',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'careers@hairsalongroupatl.com',
    requirements: [
      'Cosmetology license required',
      'Minimum 2 years salon experience',
      'Color and cutting expertise',
      'Client-focused attitude'
    ],
    specialties: [
      'Hair Coloring',
      'Precision Cuts',
      'Balayage',
      'Blowouts'
    ]
  },
  lashes: {
    title: 'Lash Extension Artist - Premium Salon',
    description: 'Fast-growing beauty studio seeks certified lash artist specialized in classic and volume techniques. Perfect your craft in our luxurious setting with high-end clientele. Training for advanced techniques provided.',
    location: 'Miami, FL',
    compensation_details: 'Base pay + commission + retail commission',
    salary_range: '$800-$1500 weekly depending on clientele',
    jobType: 'full-time',
    experience_level: 'intermediate',
    contactEmail: 'join@lashstudiomiami.com',
    requirements: [
      'Lash certification required',
      'Portfolio of work',
      'Detail-oriented with steady hands',
      'Excellent customer service skills'
    ],
    specialties: [
      'Classic Lashes',
      'Volume Lashes',
      'Hybrid Sets',
      'Lash Lifts'
    ]
  },
  massage: {
    title: 'Licensed Massage Therapist - Luxury Spa',
    description: 'Upscale day spa seeking licensed massage therapists for our growing location. Experience in Swedish, deep tissue, and hot stone therapies preferred. Join our wellness team in a relaxing, client-focused environment.',
    location: 'Chicago, IL',
    compensation_details: 'Hourly + tips + benefits for full-time staff',
    salary_range: '$50-70K annually including gratuities',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'staff@wellnesschicago.com',
    requirements: [
      'State massage license required',
      'Minimum 500 hours certification',
      'Knowledge of multiple modalities',
      'Professional demeanor and presentation'
    ],
    specialties: [
      'Deep Tissue Massage',
      'Swedish Massage',
      'Hot Stone Therapy',
      'Sports Massage'
    ]
  },
  tattoo: {
    title: 'Experienced Tattoo Artist - Creative Studio',
    description: 'Established tattoo studio looking for talented artists to join our team. Bring your creativity and technical skills to a supportive, artistic environment with a loyal client base and room to grow.',
    location: 'Portland, OR',
    compensation_details: 'Booth rental or commission options available',
    salary_range: 'Commission-based, top artists earn $70K-$100K+',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'create@inkstudiopdx.com',
    requirements: [
      'Minimum 3 years professional experience',
      'Strong portfolio of work',
      'Blood-borne pathogens certification',
      'Excellent line work and shading techniques'
    ],
    specialties: [
      'Custom Designs',
      'Black and Grey',
      'Color Work',
      'Cover-ups'
    ]
  },
  brows: {
    title: 'Eyebrow Artist & Microblading Specialist',
    description: 'Beauty boutique seeking a skilled brow artist specializing in shaping, tinting, and microblading. Help clients achieve their perfect brows in our intimate, upscale setting. Existing clientele a plus but not required.',
    location: 'Seattle, WA',
    compensation_details: 'Base + commission on services and retail',
    salary_range: '$50K-$80K annually with a strong client base',
    jobType: 'part-time',
    experience_level: 'experienced',
    contactEmail: 'hello@browstudioseattle.com',
    requirements: [
      'Microblading certification',
      'Esthetician license preferred',
      'Experience with brow mapping',
      'Knowledge of different face shapes and suitable styles'
    ],
    specialties: [
      'Microblading',
      'Brow Lamination',
      'Brow Tinting',
      'Brow Shaping'
    ]
  },
  skincare: {
    title: 'Licensed Esthetician - Medical Spa',
    description: 'Medical spa seeking a licensed esthetician with experience in advanced treatments. Work alongside medical professionals in a clinical, results-driven environment while providing exceptional skincare services.',
    location: 'Dallas, TX',
    compensation_details: 'Hourly + commission on services and products',
    salary_range: '$45K-$70K depending on experience and certifications',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'careers@medspadallas.com',
    requirements: [
      'Current esthetician license',
      'Experience with chemical peels and microdermabrasion',
      'Knowledge of medical-grade skincare products',
      'Comfortable working in a medical setting'
    ],
    specialties: [
      'Chemical Peels',
      'Hydrafacial',
      'Microdermabrasion',
      'LED Light Therapy'
    ]
  },
  barber: {
    title: 'Master Barber - Premium Barbershop',
    description: 'Modern, upscale barbershop seeking experienced barbers who excel in classic cuts, fades, beard grooming, and straight razor shaves. Join our team of professionals in a stylish, client-focused environment with steady clientele.',
    location: 'Brooklyn, NY',
    compensation_details: 'Commission-based structure with guaranteed minimum',
    salary_range: '$60K-$90K annually including tips',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: 'join@premiumcutsbk.com',
    requirements: [
      'Current barber license',
      'Minimum 2-3 years professional experience',
      'Proficiency in modern and classic cutting techniques',
      'Experience with diverse hair textures and styles'
    ],
    specialties: [
      'Precision Fades',
      'Beard Sculpting',
      'Hot Towel Shaves',
      'Hair Design'
    ]
  },
  makeup: {
    title: 'Professional Makeup Artist - Luxury Beauty Brand',
    description: 'High-end beauty retailer seeking a creative makeup artist to join our team. Demonstrate products, perform makeovers, and help clients achieve their desired looks. Perfect position for a passionate beauty enthusiast with excellent people skills.',
    location: 'Los Angeles, CA',
    compensation_details: 'Hourly rate + commission + gratis products',
    salary_range: '$45K-$65K depending on experience and sales',
    jobType: 'full-time',
    experience_level: 'intermediate',
    contactEmail: 'careers@luxebeauty.com',
    requirements: [
      'Professional makeup certification preferred',
      'Experience with diverse skin tones and face shapes',
      'Knowledge of current beauty trends',
      'Retail or customer service background a plus'
    ],
    specialties: [
      'Special Occasion Makeup',
      'Natural Glam',
      'Editorial Looks',
      'Color Matching'
    ]
  },
  custom: {
    title: '',
    description: '',
    location: '',
    compensation_details: '',
    salary_range: '',
    jobType: 'full-time',
    experience_level: 'experienced',
    contactEmail: '',
    requirements: [],
    specialties: []
  }
};

// Export IndustryType for direct use
export { IndustryType } from './jobFormSchema';
