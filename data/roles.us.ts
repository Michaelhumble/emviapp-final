// US-Only Beauty Industry Roles for Programmatic SEO
// 🛡️ GUARD: This file is scanned for banned terms - US cities/content only

export interface BeautyRole {
  slug: string;
  label: string;
  synonyms: string[];
  category: string;
  avgSalary: number;
  description: string;
}

export const US_BEAUTY_ROLES: BeautyRole[] = [
  // Core Beauty Services
  { 
    slug: 'nails', 
    label: 'Nail Technician', 
    synonyms: ['nail tech', 'manicurist', 'pedicurist', 'nail artist'], 
    category: 'nails',
    avgSalary: 35000,
    description: 'Professional nail care, manicures, pedicures, and nail art services'
  },
  { 
    slug: 'hair-stylist', 
    label: 'Hair Stylist', 
    synonyms: ['hairstylist', 'hairdresser', 'hair designer'], 
    category: 'hair',
    avgSalary: 32000,
    description: 'Expert hair cutting, styling, and treatment services'
  },
  { 
    slug: 'barber', 
    label: 'Barber', 
    synonyms: ['men\'s barber', 'traditional barber', 'master barber'], 
    category: 'hair',
    avgSalary: 38000,
    description: 'Traditional barbering services for men including cuts, shaves, and grooming'
  },
  { 
    slug: 'lash-artist', 
    label: 'Lash Artist', 
    synonyms: ['lash technician', 'eyelash extension specialist', 'lash tech'], 
    category: 'lashes',
    avgSalary: 42000,
    description: 'Certified eyelash extension application and lash enhancement services'
  },
  { 
    slug: 'makeup-artist', 
    label: 'Makeup Artist', 
    synonyms: ['MUA', 'cosmetic artist', 'beauty artist'], 
    category: 'makeup',
    avgSalary: 38000,
    description: 'Professional makeup application for events, photo shoots, and special occasions'
  },
  { 
    slug: 'esthetician', 
    label: 'Esthetician', 
    synonyms: ['facialist', 'skincare specialist', 'skin therapist'], 
    category: 'skincare',
    avgSalary: 36000,
    description: 'Licensed skincare professional providing facials and skin treatments'
  },

  // Advanced Specialty Services
  { 
    slug: 'microblading', 
    label: 'Microblading Artist', 
    synonyms: ['permanent makeup artist', 'brow artist', 'cosmetic tattoo artist'], 
    category: 'brows',
    avgSalary: 65000,
    description: 'Semi-permanent eyebrow tattooing and cosmetic enhancement procedures'
  },
  { 
    slug: 'permanent-makeup', 
    label: 'Permanent Makeup Artist', 
    synonyms: ['cosmetic tattoo artist', 'PMU artist', 'micropigmentation specialist'], 
    category: 'makeup',
    avgSalary: 58000,
    description: 'Permanent cosmetic tattooing for eyebrows, eyeliner, and lip color'
  },
  { 
    slug: 'medical-aesthetics', 
    label: 'Medical Aesthetician', 
    synonyms: ['medical esthetician', 'clinical esthetician', 'dermatology assistant'], 
    category: 'medical',
    avgSalary: 52000,
    description: 'Advanced skincare treatments in medical and clinical settings'
  },
  { 
    slug: 'waxing', 
    label: 'Waxing Specialist', 
    synonyms: ['hair removal specialist', 'wax technician', 'depilation specialist'], 
    category: 'hair-removal',
    avgSalary: 32000,
    description: 'Professional hair removal services using various waxing techniques'
  },
  { 
    slug: 'threading', 
    label: 'Threading Specialist', 
    synonyms: ['eyebrow threading artist', 'facial hair removal specialist'], 
    category: 'brows',
    avgSalary: 28000,
    description: 'Precision hair removal using traditional threading techniques'
  },
  { 
    slug: 'spray-tan', 
    label: 'Spray Tan Technician', 
    synonyms: ['airbrush tan artist', 'sunless tanning specialist'], 
    category: 'tanning',
    avgSalary: 30000,
    description: 'Professional spray tanning and sunless tanning services'
  },
  { 
    slug: 'body-piercing', 
    label: 'Body Piercer', 
    synonyms: ['professional piercer', 'piercing artist', 'body modification artist'], 
    category: 'piercing',
    avgSalary: 35000,
    description: 'Safe and sterile body piercing services and jewelry consultation'
  },
  { 
    slug: 'cosmetic-tattoo', 
    label: 'Cosmetic Tattoo Artist', 
    synonyms: ['permanent makeup artist', 'micropigmentation artist'], 
    category: 'tattoo',
    avgSalary: 55000,
    description: 'Specialized tattooing for cosmetic enhancement and medical applications'
  },

  // Event & Specialized Makeup
  { 
    slug: 'bridal-makeup', 
    label: 'Bridal Makeup Artist', 
    synonyms: ['wedding makeup artist', 'bridal beauty specialist'], 
    category: 'makeup',
    avgSalary: 48000,
    description: 'Specialized makeup services for weddings and special events'
  },
  { 
    slug: 'editorial-makeup', 
    label: 'Editorial Makeup Artist', 
    synonyms: ['fashion makeup artist', 'commercial makeup artist'], 
    category: 'makeup',
    avgSalary: 52000,
    description: 'High-fashion and editorial makeup for photography and media'
  },
  { 
    slug: 'sfx-makeup', 
    label: 'SFX Makeup Artist', 
    synonyms: ['special effects makeup artist', 'prosthetic makeup artist'], 
    category: 'makeup',
    avgSalary: 58000,
    description: 'Special effects and prosthetic makeup for film, theater, and events'
  },
  { 
    slug: 'brows', 
    label: 'Brow Specialist', 
    synonyms: ['eyebrow artist', 'brow technician', 'arch specialist'], 
    category: 'brows',
    avgSalary: 35000,
    description: 'Eyebrow shaping, tinting, and enhancement services'
  },

  // Wellness & Massage
  { 
    slug: 'massage-therapist', 
    label: 'Massage Therapist', 
    synonyms: ['licensed massage therapist', 'LMT', 'bodywork therapist'], 
    category: 'wellness',
    avgSalary: 45000,
    description: 'Licensed therapeutic and relaxation massage services'
  },
  { 
    slug: 'facialist', 
    label: 'Facialist', 
    synonyms: ['facial specialist', 'skincare therapist'], 
    category: 'skincare',
    avgSalary: 38000,
    description: 'Specialized facial treatments and advanced skincare services'
  },

  // Hair Specialties
  { 
    slug: 'blowout', 
    label: 'Blowout Specialist', 
    synonyms: ['blowdry specialist', 'styling specialist'], 
    category: 'hair',
    avgSalary: 32000,
    description: 'Professional hair washing, drying, and styling services'
  },
  { 
    slug: 'colorist', 
    label: 'Hair Colorist', 
    synonyms: ['color specialist', 'hair color expert'], 
    category: 'hair',
    avgSalary: 42000,
    description: 'Expert hair coloring, highlighting, and color correction services'
  },
  { 
    slug: 'braider', 
    label: 'Hair Braider', 
    synonyms: ['braid specialist', 'braiding artist'], 
    category: 'hair',
    avgSalary: 35000,
    description: 'Specialized braiding and protective hairstyling services'
  },
  { 
    slug: 'loctician', 
    label: 'Loctician', 
    synonyms: ['loc specialist', 'dreadlock specialist'], 
    category: 'hair',
    avgSalary: 40000,
    description: 'Specialized care and maintenance of locs and natural hair textures'
  },
  { 
    slug: 'wig-specialist', 
    label: 'Wig Specialist', 
    synonyms: ['wig stylist', 'hairpiece specialist'], 
    category: 'hair',
    avgSalary: 38000,
    description: 'Wig fitting, styling, and maintenance services'
  },
  { 
    slug: 'hair-extension', 
    label: 'Hair Extension Specialist', 
    synonyms: ['extension artist', 'hair addition specialist'], 
    category: 'hair',
    avgSalary: 45000,
    description: 'Professional hair extension application and maintenance'
  },

  // Advanced Techniques
  { 
    slug: 'microshading', 
    label: 'Microshading Artist', 
    synonyms: ['powder brow artist', 'ombre brow specialist'], 
    category: 'brows',
    avgSalary: 58000,
    description: 'Advanced eyebrow shading and powder brow techniques'
  },
  { 
    slug: 'dermaplaning', 
    label: 'Dermaplaning Specialist', 
    synonyms: ['face shaving specialist', 'exfoliation specialist'], 
    category: 'skincare',
    avgSalary: 40000,
    description: 'Professional facial hair removal and skin exfoliation treatment'
  },
  { 
    slug: 'scalp-micropigmentation', 
    label: 'Scalp Micropigmentation Artist', 
    synonyms: ['SMP artist', 'hair tattoo specialist'], 
    category: 'tattoo',
    avgSalary: 65000,
    description: 'Scalp tattooing to simulate hair follicles for hair loss treatment'
  },

  // Medical & Advanced
  { 
    slug: 'laser-tech', 
    label: 'Laser Technician', 
    synonyms: ['laser hair removal technician', 'IPL specialist'], 
    category: 'medical',
    avgSalary: 42000,
    description: 'Laser hair removal and advanced light-based beauty treatments'
  },
  { 
    slug: 'coolsculpting-tech', 
    label: 'CoolSculpting Technician', 
    synonyms: ['body contouring specialist', 'non-invasive fat reduction specialist'], 
    category: 'medical',
    avgSalary: 45000,
    description: 'Non-invasive body contouring and fat reduction treatments'
  },
  { 
    slug: 'iv-therapy', 
    label: 'IV Therapy Specialist', 
    synonyms: ['hydration specialist', 'wellness IV technician'], 
    category: 'wellness',
    avgSalary: 48000,
    description: 'Intravenous hydration and vitamin therapy administration'
  },
  { 
    slug: 'nurse-injector', 
    label: 'Nurse Injector', 
    synonyms: ['cosmetic nurse', 'aesthetic nurse'], 
    category: 'medical',
    avgSalary: 75000,
    description: 'Licensed nurse providing cosmetic injectables and aesthetic treatments'
  },

  // General & Education
  { 
    slug: 'cosmetologist', 
    label: 'Cosmetologist', 
    synonyms: ['beauty professional', 'licensed cosmetologist'], 
    category: 'general',
    avgSalary: 32000,
    description: 'Licensed beauty professional providing comprehensive beauty services'
  },
  { 
    slug: 'manicurist', 
    label: 'Manicurist', 
    synonyms: ['nail technician', 'nail specialist'], 
    category: 'nails',
    avgSalary: 28000,
    description: 'Hand and nail care specialist focusing on manicure services'
  },
  { 
    slug: 'pedicurist', 
    label: 'Pedicurist', 
    synonyms: ['foot care specialist', 'pedicure technician'], 
    category: 'nails',
    avgSalary: 30000,
    description: 'Foot and toenail care specialist providing pedicure services'
  },
  { 
    slug: 'makeup-educator', 
    label: 'Makeup Educator', 
    synonyms: ['makeup instructor', 'beauty educator'], 
    category: 'education',
    avgSalary: 45000,
    description: 'Professional makeup instruction and beauty education services'
  },
  { 
    slug: 'lash-educator', 
    label: 'Lash Educator', 
    synonyms: ['lash instructor', 'eyelash extension trainer'], 
    category: 'education',
    avgSalary: 55000,
    description: 'Eyelash extension training and certification instruction'
  },
  { 
    slug: 'barber-educator', 
    label: 'Barber Educator', 
    synonyms: ['barbering instructor', 'barber trainer'], 
    category: 'education',
    avgSalary: 48000,
    description: 'Professional barbering instruction and apprenticeship training'
  },

  // Business & Management
  { 
    slug: 'salon-receptionist', 
    label: 'Salon Receptionist', 
    synonyms: ['salon coordinator', 'front desk specialist'], 
    category: 'management',
    avgSalary: 28000,
    description: 'Client services and appointment coordination in beauty establishments'
  },
  { 
    slug: 'salon-manager', 
    label: 'Salon Manager', 
    synonyms: ['beauty salon manager', 'spa manager'], 
    category: 'management',
    avgSalary: 48000,
    description: 'Beauty establishment management and business operations'
  },
  { 
    slug: 'booth-rental', 
    label: 'Booth Rental Specialist', 
    synonyms: ['independent contractor', 'suite renter'], 
    category: 'business',
    avgSalary: 45000,
    description: 'Independent beauty professional operating from rented salon space'
  },

  // Mobile & Freelance
  { 
    slug: 'freelance-artist', 
    label: 'Freelance Beauty Artist', 
    synonyms: ['independent beauty artist', 'mobile beauty professional'], 
    category: 'freelance',
    avgSalary: 42000,
    description: 'Independent beauty services provided at various locations'
  },
  { 
    slug: 'mobile-artist', 
    label: 'Mobile Beauty Artist', 
    synonyms: ['traveling beauty professional', 'on-location artist'], 
    category: 'mobile',
    avgSalary: 48000,
    description: 'Beauty services provided at client locations for convenience'
  },
  { 
    slug: 'spray-tan-tech', 
    label: 'Spray Tan Technician', 
    synonyms: ['mobile tanning specialist', 'airbrush tan artist'], 
    category: 'tanning',
    avgSalary: 32000,
    description: 'Professional spray tanning services at salon or mobile locations'
  },

  // Trending Services
  { 
    slug: 'brow-lamination', 
    label: 'Brow Lamination Specialist', 
    synonyms: ['brow perm specialist', 'eyebrow lamination artist'], 
    category: 'brows',
    avgSalary: 38000,
    description: 'Eyebrow lamination and reshaping treatments for fuller-looking brows'
  },
  { 
    slug: 'brow-tint', 
    label: 'Brow Tinting Specialist', 
    synonyms: ['eyebrow tinting artist', 'brow color specialist'], 
    category: 'brows',
    avgSalary: 32000,
    description: 'Eyebrow tinting and color enhancement services'
  },
  { 
    slug: 'keratin', 
    label: 'Keratin Treatment Specialist', 
    synonyms: ['hair smoothing specialist', 'Brazilian blowout artist'], 
    category: 'hair',
    avgSalary: 38000,
    description: 'Keratin hair treatments for smooth, frizz-free hair'
  },
  { 
    slug: 'hair-botox', 
    label: 'Hair Botox Specialist', 
    synonyms: ['hair treatment specialist', 'deep conditioning expert'], 
    category: 'hair',
    avgSalary: 40000,
    description: 'Advanced hair restoration and deep conditioning treatments'
  },
  { 
    slug: 'hair-straightening', 
    label: 'Hair Straightening Specialist', 
    synonyms: ['chemical relaxer specialist', 'permanent straightening artist'], 
    category: 'hair',
    avgSalary: 36000,
    description: 'Chemical and thermal hair straightening services'
  },
  { 
    slug: 'balayage', 
    label: 'Balayage Specialist', 
    synonyms: ['hand-painted highlights artist', 'freehand color specialist'], 
    category: 'hair',
    avgSalary: 45000,
    description: 'Freehand hair coloring technique for natural-looking highlights'
  },
  { 
    slug: 'perm', 
    label: 'Perm Specialist', 
    synonyms: ['permanent wave specialist', 'curl specialist'], 
    category: 'hair',
    avgSalary: 34000,
    description: 'Permanent wave and curl creation services for all hair types'
  }
];

export default US_BEAUTY_ROLES;