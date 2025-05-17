
import { JobFormValues, IndustryType } from './jobFormSchema';

type JobTemplate = {
  id: string;
  title: string;
  description: string;
  summary: string;
  location: string;
  salary_range: string;
  tip_range: string;
  jobType: string;
  experience_level: string;
  requirements: string[];
  perks: string[];
  popularity: 'most-hired' | 'fastest-applicants' | 'trusted' | 'trending' | '';
  vietnameseDescription?: string;
}

type JobTemplatesByIndustry = {
  [key in IndustryType]: JobTemplate[];
}

export const jobTemplatesByIndustry: JobTemplatesByIndustry = {
  nails: [
    {
      id: 'nail-tech-high-tip',
      title: 'Nail Tech Needed – High Tip Area, Khu Mỹ Trắng, Full-Time',
      summary: 'Full-time position with $1000-1800/wk in affluent neighborhood',
      description: 'We are looking for an experienced nail technician to join our luxury salon in an upscale neighborhood with a well-established clientele. Our salon specializes in acrylic, gel, and dipping powder services. You'll work in a clean, modern salon with high-paying customers and excellent tips.',
      vietnameseDescription: 'Chúng tôi đang tìm kiếm một thợ nail có kinh nghiệm để tham gia tiệm sang trọng của chúng tôi trong khu vực giàu có với khách hàng đã được thiết lập. Tiệm của chúng tôi chuyên về dịch vụ acrylic, gel và bột nhúng. Bạn sẽ làm việc trong một tiệm sạch sẽ, hiện đại với khách hàng trả lương cao và tiền tip rất tốt.',
      location: 'Los Angeles, CA',
      salary_range: '$1000-1800/week',
      tip_range: '$300-500/week',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['2+ years experience', 'Acrylic and gel polish skills', 'Professional attitude', 'English communication'],
      perks: ['Weekly pay', 'High tips', 'Modern salon', 'Steady clientele'],
      popularity: 'most-hired'
    },
    {
      id: 'nail-tech-bao-luong',
      title: 'Tuyển Thợ Nail Bao Lương – Tip Cao, Bao Ăn Ở, Khu Sang Trọng',
      summary: 'Bao lương $1200+/tuần, có chỗ ở, tip cao, khu Mỹ trắng',
      description: 'Tiệm nail khu Mỹ trắng đông khách, cần tuyển thợ nail có kinh nghiệm làm bột, dip, và gel. Bao lương $1200+/tuần tùy theo kinh nghiệm. Tiệm mới remodel, làm việc với chủ Việt Nam dễ tính, có chỗ ở cho thợ ở xa.',
      vietnameseDescription: 'Tiệm nail khu Mỹ trắng đông khách, cần tuyển thợ nail có kinh nghiệm làm bột, dip, và gel. Bao lương $1200+/tuần tùy theo kinh nghiệm. Tiệm mới remodel, làm việc với chủ Việt Nam dễ tính, có chỗ ở cho thợ ở xa.',
      location: 'Houston, TX',
      salary_range: '$1200-1500/week',
      tip_range: '$200-400/week',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['Kinh nghiệm làm bột, dip và gel', 'Làm việc siêng năng', 'Giao tiếp tiếng Anh cơ bản'],
      perks: ['Bao ăn ở', 'Bao lương', 'Tip cao', 'Khu sang trọng'],
      popularity: 'fastest-applicants'
    },
    {
      id: 'full-time-nail-artist',
      title: 'Hiring Full-Time Nail Artist – $20–30/hr + High Tips, Weekly Pay',
      summary: '$20-30/hr base + tips in upscale salon with regular clients',
      description: 'Join our team as a full-time nail artist in our established salon. We offer a guaranteed hourly rate of $20-30 based on experience plus tips. Our salon specializes in natural nails, gel extensions, and nail art. We have a steady stream of regular clients and a comfortable, friendly work environment.',
      location: 'New York, NY',
      salary_range: '$20-30/hr plus tips',
      tip_range: '$200-400/week',
      jobType: 'full-time',
      experience_level: 'intermediate',
      requirements: ['1+ year experience', 'Gel and natural nail services', 'Basic nail art skills', 'Customer service oriented'],
      perks: ['Weekly pay', 'Hourly guarantee', 'Employee benefits', 'Paid training available'],
      popularity: 'trusted'
    },
    {
      id: 'part-time-nail-tech',
      title: 'Part-Time Nail Technician – Flexible Hours, Great for Students',
      summary: 'Part-time position with flexible schedule, perfect for students',
      description: 'Looking for a part-time nail technician to join our friendly neighborhood salon. Flexible hours, perfect for students or those with family commitments. We specialize in basic manicures, pedicures and gel polish services. No acrylic experience required, but willingness to learn is appreciated.',
      location: 'Chicago, IL',
      salary_range: '$15-20/hr plus tips',
      tip_range: '$100-200/week',
      jobType: 'part-time',
      experience_level: 'entry',
      requirements: ['Basic manicure/pedicure skills', 'Friendly attitude', 'Reliability', 'Willing to learn'],
      perks: ['Flexible schedule', 'Training provided', 'No late nights', 'Family-friendly salon'],
      popularity: 'trending'
    }
  ],
  hair: [
    {
      id: 'hair-stylist-commission',
      title: 'Experienced Hair Stylist – High Commission + Booth Rental Option',
      summary: '60% commission or booth rental in busy downtown location',
      description: 'Seeking an experienced hair stylist to join our high-end salon in the heart of downtown. We offer either a 60% commission structure or booth rental options for independent stylists. Our salon specializes in color services, cutting techniques, and hair extensions. We have a strong client base with room for growth.',
      location: 'Seattle, WA',
      salary_range: '60% commission or booth rental',
      tip_range: 'Keep 100% of your tips',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['3+ years experience', 'Color expertise', 'Cutting skills', 'Client portfolio'],
      perks: ['High commission', 'Product discounts', 'Continuing education', 'Flexible schedule'],
      popularity: 'most-hired'
    },
    {
      id: 'junior-hair-stylist',
      title: 'Junior Hair Stylist – Training Program with Guaranteed Salary',
      summary: 'Entry-level position with formal training and salary guarantee',
      description: 'Great opportunity for a junior stylist to start their career! We offer a structured training program working alongside experienced stylists. You'll receive a guaranteed salary during training with increases as you build your skills. Perfect for cosmetology school graduates looking to build their career.',
      location: 'Portland, OR',
      salary_range: '$15-18/hr + tips during training',
      tip_range: 'Growing as you build clientele',
      jobType: 'full-time',
      experience_level: 'entry',
      requirements: ['Cosmetology license', 'Passion for hair', 'Willingness to learn', 'Professional appearance'],
      perks: ['Paid training', 'Career growth', 'Product discounts', 'Regular schedule'],
      popularity: 'trending'
    }
  ],
  lashes: [
    {
      id: 'lash-tech-full-time',
      title: 'Lash Extension Specialist – Full-Time with Guaranteed Clientele',
      summary: '$25-35/hr plus retail commission in luxury beauty studio',
      description: 'Join our team as a full-time lash artist at our luxury beauty studio. We provide a guaranteed clientele through our booking system and marketing efforts. Specializing in classic, hybrid, and volume lash extensions. Looking for someone who can maintain our high standards and provide exceptional customer service.',
      location: 'Miami, FL',
      salary_range: '$25-35/hr plus retail commission',
      tip_range: '$150-300/week in tips',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['2+ years lash experience', 'Classic and volume certification', 'Portfolio of work', 'Professional demeanor'],
      perks: ['Guaranteed clientele', 'Luxury setting', 'Retail commission', 'Growth opportunities'],
      popularity: 'trusted'
    },
    {
      id: 'lash-artist-commission',
      title: 'Lash Artist – 50% Commission with Training Available',
      summary: '50% commission structure with option for advanced training',
      description: 'We are looking for a passionate lash artist to join our growing team. Whether you're newly certified or experienced, we offer 50% commission on all services with room for increases based on performance. Our boutique focuses exclusively on lash services in a relaxing, upscale environment.',
      location: 'Denver, CO',
      salary_range: '50% commission on services',
      tip_range: 'Keep 100% of tips',
      jobType: 'full-time',
      experience_level: 'intermediate',
      requirements: ['Lash certification', 'Basic lash experience', 'Client-focused attitude', 'Reliable and punctual'],
      perks: ['Ongoing training', 'Flexible schedule', 'Product discounts', 'Growing clientele'],
      popularity: 'fastest-applicants'
    }
  ],
  massage: [
    {
      id: 'massage-therapist-luxury',
      title: 'Licensed Massage Therapist – Luxury Spa Setting, Top Pay',
      summary: '$30-40/hr plus tips and benefits in 5-star resort spa',
      description: 'Join our award-winning spa team as a licensed massage therapist. We offer a stable schedule with guaranteed hours in a luxury resort setting. Specializing in various modalities including deep tissue, hot stone, and Swedish massage. Benefits include health insurance, paid time off, and continuing education.',
      location: 'Scottsdale, AZ',
      salary_range: '$30-40/hr plus tips',
      tip_range: '$200-400/week',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['State massage license', '2+ years experience', 'Multiple massage modalities', 'Spa experience preferred'],
      perks: ['Health benefits', 'PTO', 'Employee discounts', 'Continuing education'],
      popularity: 'most-hired'
    },
    {
      id: 'massage-therapist-commission',
      title: 'Massage Therapist – 60% Commission, Flexible Hours',
      summary: '60% commission with flexible scheduling in wellness center',
      description: 'Looking for licensed massage therapists to join our wellness center team. We offer a generous 60% commission structure with flexible scheduling options. Our center focuses on therapeutic massage, sports recovery, and stress relief. Build your clientele with our marketing support and booking system.',
      location: 'Austin, TX',
      salary_range: '60% commission',
      tip_range: 'Keep 100% of tips',
      jobType: 'part-time',
      experience_level: 'intermediate',
      requirements: ['Massage license', 'Liability insurance', 'Therapeutic massage skills', 'Professional communication'],
      perks: ['Flexible schedule', 'Room for growth', 'Marketing support', 'Modern facility'],
      popularity: 'trending'
    }
  ],
  tattoo: [
    {
      id: 'tattoo-artist-booth',
      title: 'Tattoo Artist – Private Booth in Established Studio',
      summary: 'Private booth rental in popular studio with high foot traffic',
      description: 'Opportunity for an experienced tattoo artist to rent a private booth in our well-established studio. We're located in a high-traffic area with excellent visibility. Our shop has built a strong reputation over 10 years, with a focus on custom work and a clean, professional environment.',
      location: 'Las Vegas, NV',
      salary_range: 'Booth rental with high earning potential',
      tip_range: 'Keep 100% of your earnings',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['3+ years professional experience', 'Strong portfolio', 'Professional attitude', 'Client base preferred'],
      perks: ['Private booth', 'Established location', 'Walk-in potential', 'Artist-focused environment'],
      popularity: 'most-hired'
    },
    {
      id: 'tattoo-apprentice',
      title: 'Tattoo Apprenticeship – Learn from Master Artists',
      summary: 'Paid apprenticeship with structured training program',
      description: 'Rare opportunity for a serious artist to apprentice in our renowned tattoo studio. We offer a paid apprenticeship with structured training from our team of experienced artists. Looking for someone with strong drawing skills, dedication to the craft, and professional demeanor.',
      location: 'Philadelphia, PA',
      salary_range: 'Paid apprenticeship with progression',
      tip_range: 'Growing as skills develop',
      jobType: 'full-time',
      experience_level: 'entry',
      requirements: ['Strong art portfolio', 'Drawing skills', 'Dedication to learning', 'Professional attitude'],
      perks: ['Structured training', 'Paid while learning', 'Industry connections', 'Career development'],
      popularity: 'trending'
    }
  ],
  brows: [
    {
      id: 'microblading-artist',
      title: 'Microblading Artist – High-End Clientele, 50% Commission',
      summary: '50% commission with $150+ services in luxury setting',
      description: 'Join our exclusive beauty studio as a microblading and permanent makeup artist. We cater to high-end clientele with premium pricing ($150+ per service). You'll receive 50% commission with the potential to earn $2000+ weekly. Our modern studio provides all supplies and handles booking and marketing.',
      location: 'Beverly Hills, CA',
      salary_range: '50% commission on $150+ services',
      tip_range: '$100-200/week',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['Certification in microblading', 'Portfolio of work', '1+ year experience', 'Attention to detail'],
      perks: ['High-end clientele', 'Premium pricing', 'Marketing support', 'All supplies provided'],
      popularity: 'fastest-applicants'
    },
    {
      id: 'brow-specialist-hourly',
      title: 'Eyebrow Specialist – Hourly + Commission in Busy Location',
      summary: '$20/hr base plus commission in high-traffic mall location',
      description: 'We are hiring an eyebrow specialist for our busy mall location. Services include threading, waxing, and tinting. We offer a stable $20/hr base pay plus commission on services and retail sales. Full-time position with consistent hours and a steady flow of walk-in clients.',
      location: 'Atlanta, GA',
      salary_range: '$20/hr + commission',
      tip_range: '$100-200/week',
      jobType: 'full-time',
      experience_level: 'intermediate',
      requirements: ['Threading experience', 'Waxing skills', 'Customer service focus', 'Availability for weekend shifts'],
      perks: ['Guaranteed hourly', 'Walk-in clientele', 'No marketing needed', 'Product commission'],
      popularity: 'trusted'
    }
  ],
  skincare: [
    {
      id: 'esthetician-medical',
      title: 'Medical Esthetician – Full-Time with Benefits Package',
      summary: '$25-35/hr plus commission in medical spa with benefits',
      description: 'Seeking a licensed medical esthetician to join our physician-led medical spa. You'll perform advanced treatments including chemical peels, microneedling, and laser services. We offer a competitive hourly rate plus commission on services and retail sales, along with comprehensive benefits.',
      location: 'San Diego, CA',
      salary_range: '$25-35/hr + commission',
      tip_range: '$100-200/week',
      jobType: 'full-time',
      experience_level: 'experienced',
      requirements: ['Esthetics license', 'Medical esthetics training', 'Laser certification preferred', '2+ years experience'],
      perks: ['Medical benefits', 'Paid time off', 'Continuing education', 'Product discounts'],
      popularity: 'most-hired'
    },
    {
      id: 'esthetician-spa',
      title: 'Spa Esthetician – Commission-Based with Guaranteed Booking',
      summary: '60% commission with booked appointments and retail bonus',
      description: 'Join our day spa team as an esthetician performing facials, waxing, and body treatments. We offer a commission-based structure with a strong booking system that keeps our therapists busy. Our spa focuses on natural skincare and customized treatments in a relaxing environment.',
      location: 'Nashville, TN',
      salary_range: '60% commission on services',
      tip_range: '$150-250/week',
      jobType: 'full-time',
      experience_level: 'intermediate',
      requirements: ['Esthetics license', 'Facial experience', 'Waxing skills', 'Retail sales ability'],
      perks: ['Guaranteed bookings', 'Retail commission bonus', 'Continuing education', 'Team environment'],
      popularity: 'trending'
    }
  ]
};

// Simple template structure for direct use in the form
export const jobTemplates: Record<IndustryType, {
  title: string;
  description: string;
  salary_range: string;
  jobType: string;
  experience_level: string;
}> = {
  nails: {
    title: 'Nail Tech Needed – High Tip Area, Full-Time',
    description: 'We are looking for an experienced nail technician to join our luxury salon in an upscale neighborhood with a well-established clientele. Our salon specializes in acrylic, gel, and dipping powder services. You'll work in a clean, modern salon with high-paying customers and excellent tips.',
    salary_range: '$1000-1800/week',
    jobType: 'full-time',
    experience_level: 'experienced'
  },
  hair: {
    title: 'Experienced Hair Stylist – High Commission',
    description: 'Seeking an experienced hair stylist to join our high-end salon. We offer either a commission structure or booth rental options for independent stylists. Our salon specializes in color services, cutting techniques, and hair extensions. We have a strong client base with room for growth.',
    salary_range: '60% commission',
    jobType: 'full-time',
    experience_level: 'experienced'
  },
  lashes: {
    title: 'Lash Extension Specialist – Full-Time with Guaranteed Clientele',
    description: 'Join our team as a full-time lash artist at our luxury beauty studio. We provide a guaranteed clientele through our booking system and marketing efforts. Specializing in classic, hybrid, and volume lash extensions. Looking for someone who can maintain our high standards.',
    salary_range: '$25-35/hr plus commission',
    jobType: 'full-time',
    experience_level: 'experienced'
  },
  massage: {
    title: 'Licensed Massage Therapist – Luxury Spa Setting',
    description: 'Join our award-winning spa team as a licensed massage therapist. We offer a stable schedule with guaranteed hours in a luxury setting. Specializing in various modalities including deep tissue, hot stone, and Swedish massage.',
    salary_range: '$30-40/hr plus tips',
    jobType: 'full-time',
    experience_level: 'experienced'
  },
  tattoo: {
    title: 'Tattoo Artist – Private Booth in Established Studio',
    description: 'Opportunity for an experienced tattoo artist to rent a private booth in our well-established studio. We're located in a high-traffic area with excellent visibility. Our shop has built a strong reputation, with a focus on custom work and a clean, professional environment.',
    salary_range: 'Booth rental with high earning potential',
    jobType: 'full-time',
    experience_level: 'experienced'
  },
  brows: {
    title: 'Microblading Artist – High-End Clientele',
    description: 'Join our exclusive beauty studio as a microblading and permanent makeup artist. We cater to high-end clientele with premium pricing. Our modern studio provides all supplies and handles booking and marketing.',
    salary_range: '50% commission on premium services',
    jobType: 'full-time',
    experience_level: 'experienced'
  },
  skincare: {
    title: 'Medical Esthetician – Full-Time with Benefits',
    description: 'Seeking a licensed medical esthetician to join our physician-led medical spa. You'll perform advanced treatments including chemical peels, microneedling, and laser services. We offer a competitive rate plus commission on services and retail sales.',
    salary_range: '$25-35/hr + commission',
    jobType: 'full-time',
    experience_level: 'experienced'
  }
};
