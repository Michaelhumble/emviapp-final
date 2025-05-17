export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'brows';

export interface JobTemplate {
  id: string;
  industry: IndustryType;
  title: string;
  location: string;
  description: string[];
  requirements: string[];
  salary_range: string;
  schedule: string;
  employment_type: string;
  experience_level: string;
}

// Job templates by industry
export const jobTemplatesByIndustry: Record<IndustryType, JobTemplate[]> = {
  nails: [
    {
      id: 'nail-template-1',
      industry: 'nails',
      title: 'Nail Technician',
      location: 'Houston, TX',
      description: [
        'We are looking for a skilled and creative Nail Technician to join our salon. You will be responsible for providing high-quality nail services to our clients.',
        'Responsibilities include manicures, pedicures, nail art, and ensuring a clean and sanitary work environment.'
      ],
      requirements: ['Valid nail technician license', 'Minimum 2 years of experience', 'Excellent customer service skills'],
      salary_range: '$800 - $1200 per week',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    },
    {
      id: 'nail-template-2',
      industry: 'nails',
      title: 'Experienced Nail Technician',
      location: 'Los Angeles, CA',
      description: [
        'Upscale nail salon seeking an experienced nail technician. Must be proficient in all aspects of nail care including gel, acrylic, and nail art.',
        'We offer a competitive salary and a friendly, professional work environment.'
      ],
      requirements: ['Valid California nail technician license', '3+ years experience', 'Proficiency in gel and acrylic nails'],
      salary_range: '$1000 - $1500 per week',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    }
  ],
  hair: [
    {
      id: 'hair-template-1',
      industry: 'hair',
      title: 'Hair Stylist',
      location: 'New York, NY',
      description: [
        'Busy hair salon in downtown New York is hiring a talented Hair Stylist. You will provide a range of hair services including cutting, coloring, and styling.',
        'We are looking for someone with a passion for hair and a commitment to customer satisfaction.'
      ],
      requirements: ['Cosmetology license', 'Experience with various hair types', 'Strong communication skills'],
      salary_range: '$50,000 - $70,000 per year',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    },
    {
      id: 'hair-template-2',
      industry: 'hair',
      title: 'Creative Hair Colorist',
      location: 'Chicago, IL',
      description: [
        'We are seeking a creative and experienced Hair Colorist to join our team. You will specialize in hair coloring techniques and provide consultations to clients.',
        'Must have a strong understanding of color theory and the latest trends.'
      ],
      requirements: ['Cosmetology license', 'Extensive knowledge of hair coloring', 'Portfolio of previous work'],
      salary_range: '$60,000 - $80,000 per year',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    }
  ],
  lashes: [
    {
      id: 'lash-template-1',
      industry: 'lashes',
      title: 'Eyelash Technician',
      location: 'Miami, FL',
      description: [
        'Lash salon is seeking a skilled Eyelash Technician to provide eyelash extensions and related services.',
        'Responsibilities include client consultation, lash application, and maintaining a clean work environment.'
      ],
      requirements: ['Eyelash extension certification', 'Excellent attention to detail', 'Customer service experience'],
      salary_range: '$600 - $1000 per week',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    },
    {
      id: 'lash-template-2',
      industry: 'lashes',
      title: 'Experienced Lash Artist',
      location: 'San Francisco, CA',
      description: [
        'High-end lash studio looking for an experienced Lash Artist. Must be proficient in classic, volume, and hybrid lash extensions.',
        'We offer a luxury work environment and opportunities for growth.'
      ],
      requirements: ['Valid esthetician or cosmetology license', '2+ years of lash extension experience', 'Proficiency in multiple lash techniques'],
      salary_range: '$800 - $1200 per week',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    }
  ],
  massage: [
    {
      id: 'massage-template-1',
      industry: 'massage',
      title: 'Massage Therapist',
      location: 'Denver, CO',
      description: [
        'Spa is hiring a licensed Massage Therapist to provide therapeutic massage services to clients.',
        'Responsibilities include performing various massage techniques, consulting with clients, and maintaining treatment rooms.'
      ],
      requirements: ['Massage therapy license', 'Knowledge of different massage modalities', 'Excellent communication skills'],
      salary_range: '$45,000 - $65,000 per year',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    },
    {
      id: 'massage-template-2',
      industry: 'massage',
      title: 'Experienced Massage Therapist',
      location: 'Seattle, WA',
      description: [
        'Well-established massage clinic seeking an experienced Massage Therapist. Must be proficient in deep tissue, Swedish, and sports massage.',
        'We offer a supportive work environment and competitive pay.'
      ],
      requirements: ['Valid massage therapy license', '3+ years of experience', 'Proficiency in multiple massage techniques'],
      salary_range: '$50,000 - $70,000 per year',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    }
  ],
  brows: [
    {
      id: 'brow-template-1',
      industry: 'brows',
      title: 'Eyebrow Technician',
      location: 'Atlanta, GA',
      description: [
        'Brow studio is seeking an Eyebrow Technician to provide eyebrow shaping, threading, and microblading services.',
        'Responsibilities include client consultation, brow design, and maintaining a clean and sanitary work environment.'
      ],
      requirements: ['Certification in eyebrow threading or microblading', 'Excellent attention to detail', 'Customer service experience'],
      salary_range: '$500 - $900 per week',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    },
    {
      id: 'brow-template-2',
      industry: 'brows',
      title: 'Microblading Artist',
      location: 'Austin, TX',
      description: [
        'Premier brow and lash studio looking for a skilled Microblading Artist. Must be proficient in microblading and other semi-permanent makeup techniques.',
        'We offer a high-end work environment and opportunities for advancement.'
      ],
      requirements: ['Microblading certification', '2+ years of experience', 'Portfolio of previous work'],
      salary_range: '$800 - $1400 per week',
      schedule: 'Full-time',
      employment_type: 'employee',
      experience_level: 'experienced'
    }
  ]
};

// Export all templates as a flat array
export const jobTemplates = Object.values(jobTemplatesByIndustry).flat();
