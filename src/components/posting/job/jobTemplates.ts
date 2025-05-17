export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'brows' | 'skincare' | 'tattoo';

export type JobTemplate = {
  id: string;
  title: string;
  industry: IndustryType;
  location: string;
  description: string[];
  requirements: string[];
  salary_range: string;
  employment_type: string;
  experience_level: 'entry' | 'intermediate' | 'experienced' | 'senior';
  popularity: string;
  summary: string;
};

export type JobTemplatesByIndustry = {
  [key in IndustryType]: JobTemplate[];
};

export const jobTemplatesByIndustry: JobTemplatesByIndustry = {
  nails: [
    {
      id: 'nail-tech-1',
      title: 'Experienced Nail Technician',
      industry: 'nails',
      location: 'Any location',
      description: [
        'We are looking for an experienced nail technician to join our busy salon. The ideal candidate will have at least 2 years of experience and be skilled in manicures, pedicures, and nail enhancements.',
        'You will be working in a friendly, professional environment with a steady clientele. We offer competitive pay, flexible scheduling, and opportunities for growth.',
        'Our salon provides all supplies and equipment. We are looking for someone who is reliable, detail-oriented, and passionate about nail artistry.'
      ],
      requirements: ['Valid nail technician license', '2+ years experience', 'Skilled in manicures, pedicures, and nail enhancements'],
      salary_range: '$800-1200/week',
      employment_type: 'full-time',
      experience_level: 'experienced',
      popularity: 'most-hired',
      summary: 'Join our busy salon as an experienced nail tech with competitive pay and steady clientele.'
    },
    {
      id: 'nail-tech-2',
      title: 'Nail Technician - High Commission',
      industry: 'nails',
      location: 'Any location',
      description: [
        'Join our team of talented nail technicians! We are seeking licensed professionals who excel in acrylic, gel, dip powder, and nail art. Our upscale salon offers a luxurious experience for clients and a supportive environment for our team.',
        'We provide ongoing training and education to keep you at the forefront of nail trends and techniques. Our commission structure is designed to reward your skills and client retention.',
        'Benefits include flexible scheduling, paid vacation after one year, and product discounts.'
      ],
      requirements: ['Valid nail technician license', 'Experience with acrylic, gel, and dip powder', 'Excellent customer service skills'],
      salary_range: '60-70% Commission',
      employment_type: 'full-time',
      experience_level: 'intermediate',
      popularity: 'fastest-applicants',
      summary: 'High commission opportunity for nail techs skilled in acrylics, gel, and nail art.'
    }
  ],
  hair: [
    {
      id: 'hair-stylist-1',
      title: 'Professional Hair Stylist',
      industry: 'hair',
      location: 'Any location',
      description: [
        'We are seeking a talented and passionate hair stylist to join our team. The ideal candidate will have experience in cutting, coloring, and styling for a diverse clientele.',
        'Our salon offers a modern, upscale environment with a focus on continuing education and professional development. We have a strong client base and provide marketing support to help you build your book of business.',
        'We offer competitive commission rates, flexible scheduling, and a collaborative team atmosphere.'
      ],
      requirements: ['Valid cosmetology license', 'Experience in cutting, coloring, and styling', 'Portfolio of work'],
      salary_range: '$50,000-70,000/year',
      employment_type: 'full-time',
      experience_level: 'experienced',
      popularity: 'trusted',
      summary: 'Join our upscale salon as a hair stylist with opportunities for growth and development.'
    }
  ],
  lashes: [
    {
      id: 'lash-tech-1',
      title: 'Lash Extension Specialist',
      industry: 'lashes',
      location: 'Any location',
      description: [
        'We are looking for a certified lash technician to join our growing team. The ideal candidate will be skilled in classic and volume lash extensions and committed to providing exceptional service.',
        'Our boutique studio offers a relaxing environment for clients and a supportive atmosphere for our technicians. We provide all supplies and equipment needed for your success.',
        'This position offers competitive pay, flexible scheduling, and opportunities for advanced training and certification.'
      ],
      requirements: ['Lash extension certification', 'Experience with classic and volume techniques', 'Attention to detail'],
      salary_range: '$25-35/hour + tips',
      employment_type: 'full-time',
      experience_level: 'intermediate',
      popularity: 'fastest-applicants',
      summary: 'Certified lash technician needed for boutique studio with competitive pay.'
    }
  ],
  massage: [
    {
      id: 'massage-therapist-1',
      title: 'Licensed Massage Therapist',
      industry: 'massage',
      location: 'Any location',
      description: [
        'We are seeking a licensed massage therapist to join our wellness center. The ideal candidate will be skilled in various massage modalities including Swedish, deep tissue, and sports massage.',
        'Our center provides a tranquil environment focused on client wellness and relaxation. We have a established clientele and provide marketing support to help you maintain a full schedule.',
        'We offer competitive pay, flexible scheduling, and a collaborative team environment.'
      ],
      requirements: ['Valid massage therapy license', 'Experience in multiple massage modalities', 'Professional demeanor'],
      salary_range: '$50-70/hour + tips',
      employment_type: 'part-time',
      experience_level: 'experienced',
      popularity: 'trusted',
      summary: 'Join our wellness center as a licensed massage therapist with competitive hourly pay.'
    }
  ],
  brows: [
    {
      id: 'brow-artist-1',
      title: 'Eyebrow Specialist / Microblading Artist',
      industry: 'brows',
      location: 'Any location',
      description: [
        'We are looking for a talented eyebrow specialist with microblading experience to join our beauty studio. The ideal candidate will be skilled in brow shaping, tinting, lamination, and microblading techniques.',
        'Our studio focuses on natural, enhancing brow services that help clients look and feel their best. We provide all necessary equipment and products for your success.',
        'This position offers competitive commission rates, flexible scheduling, and opportunities for continued education in the latest brow techniques.'
      ],
      requirements: ['Microblading certification', 'Experience with brow shaping and tinting', 'Portfolio of work'],
      salary_range: '50-60% Commission',
      employment_type: 'full-time',
      experience_level: 'experienced',
      popularity: 'most-hired',
      summary: 'Skilled microblading artist needed for busy beauty studio with high commission.'
    }
  ],
  skincare: [
    {
      id: 'esthetician-1',
      title: 'Licensed Esthetician',
      industry: 'skincare',
      location: 'Any location',
      description: [
        'We are seeking a licensed esthetician to join our spa team. The ideal candidate will be experienced in facials, chemical peels, waxing, and other skincare treatments.',
        'Our spa offers a luxurious environment for clients and a supportive atmosphere for our team. We use high-quality skincare products and provide ongoing training in the latest techniques.',
        'This position offers competitive pay, benefits package for full-time employees, and opportunities for growth within our company.'
      ],
      requirements: ['Valid esthetician license', 'Experience with various skincare treatments', 'Knowledge of skincare products'],
      salary_range: '$40,000-55,000/year',
      employment_type: 'full-time',
      experience_level: 'intermediate',
      popularity: 'trusted',
      summary: 'Join our luxury spa as a licensed esthetician performing facials and skincare treatments.'
    }
  ],
  tattoo: [
    {
      id: 'tattoo-artist-1',
      title: 'Professional Tattoo Artist',
      industry: 'tattoo',
      location: 'Any location',
      description: [
        'We are looking for a talented tattoo artist to join our established studio. The ideal candidate will have a strong portfolio demonstrating technical skill and artistic ability across various tattoo styles.',
        'Our studio has a loyal client base and provides a clean, professional environment. We offer private workstations and maintain the highest standards of safety and hygiene.',
        'This position offers competitive commission rates, flexible scheduling, and the opportunity to build your clientele with our marketing support.'
      ],
      requirements: ['Professional tattoo experience', 'Strong portfolio', 'Knowledge of safety and sterilization procedures'],
      salary_range: '50-70% Commission',
      employment_type: 'full-time',
      experience_level: 'experienced',
      popularity: 'fastest-applicants',
      summary: 'Talented tattoo artist needed for established studio with private workstations.'
    }
  ]
};
