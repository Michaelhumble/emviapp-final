// SEO Hub Pages: 25 Cities × 6 Roles = 150 Programmatic Job Pages

export const BEAUTY_ROLES = [
  {
    slug: 'nail-technician',
    name: 'Nail Technician', 
    category: 'nails',
    searchTerms: ['nail tech', 'manicurist', 'nail artist']
  },
  {
    slug: 'hair-stylist', 
    name: 'Hair Stylist',
    category: 'hair',
    searchTerms: ['hairdresser', 'colorist', 'hair artist'] 
  },
  {
    slug: 'barber',
    name: 'Barber',
    category: 'barber', 
    searchTerms: ['men\'s grooming', 'fade specialist', 'traditional barber']
  },
  {
    slug: 'esthetician',
    name: 'Esthetician', 
    category: 'skincare',
    searchTerms: ['skincare specialist', 'facial therapist', 'skin analyst']
  },
  {
    slug: 'massage-therapist',
    name: 'Massage Therapist',
    category: 'massage',
    searchTerms: ['bodywork specialist', 'therapeutic massage', 'spa therapist']
  },
  {
    slug: 'lash-artist', 
    name: 'Lash Artist',
    category: 'brows-lashes',
    searchTerms: ['lash technician', 'eyelash extension specialist', 'brow artist']
  }
];

export const TARGET_CITIES = [
  // Major Metropolitan Areas
  { name: 'New York', state: 'NY', slug: 'new-york-ny', population: 8400000, averageIncome: 65850 },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca', population: 3900000, averageIncome: 62180 },
  { name: 'Chicago', state: 'IL', slug: 'chicago-il', population: 2700000, averageIncome: 58247 },
  { name: 'Houston', state: 'TX', slug: 'houston-tx', population: 2300000, averageIncome: 52338 },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix-az', population: 1600000, averageIncome: 54516 },
  
  // High-Growth Markets  
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia-pa', population: 1500000, averageIncome: 52649 },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio-tx', population: 1400000, averageIncome: 50979 },
  { name: 'San Diego', state: 'CA', slug: 'san-diego-ca', population: 1400000, averageIncome: 68117 },
  { name: 'Dallas', state: 'TX', slug: 'dallas-tx', population: 1300000, averageIncome: 54747 },
  { name: 'San Jose', state: 'CA', slug: 'san-jose-ca', population: 1000000, averageIncome: 104574 },
  
  // Beauty Industry Hotspots
  { name: 'Miami', state: 'FL', slug: 'miami-fl', population: 460000, averageIncome: 44268 },
  { name: 'Las Vegas', state: 'NV', slug: 'las-vegas-nv', population: 650000, averageIncome: 49726 },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta-ga', population: 500000, averageIncome: 51701 },
  { name: 'Orlando', state: 'FL', slug: 'orlando-fl', population: 280000, averageIncome: 47122 },
  { name: 'Nashville', state: 'TN', slug: 'nashville-tn', population: 690000, averageIncome: 56137 },
  
  // Emerging Markets
  { name: 'Denver', state: 'CO', slug: 'denver-co', population: 715000, averageIncome: 62842 },
  { name: 'Seattle', state: 'WA', slug: 'seattle-wa', population: 750000, averageIncome: 93481 },
  { name: 'Austin', state: 'TX', slug: 'austin-tx', population: 970000, averageIncome: 71203 },
  { name: 'Charlotte', state: 'NC', slug: 'charlotte-nc', population: 880000, averageIncome: 58641 },
  { name: 'Portland', state: 'OR', slug: 'portland-or', population: 650000, averageIncome: 64507 },
  
  // Secondary Growth Markets
  { name: 'Tampa', state: 'FL', slug: 'tampa-fl', population: 390000, averageIncome: 50703 },
  { name: 'Raleigh', state: 'NC', slug: 'raleigh-nc', population: 470000, averageIncome: 65834 },
  { name: 'Sacramento', state: 'CA', slug: 'sacramento-ca', population: 520000, averageIncome: 62335 },
  { name: 'Kansas City', state: 'MO', slug: 'kansas-city-mo', population: 490000, averageIncome: 54478 },
  { name: 'Virginia Beach', state: 'VA', slug: 'virginia-beach-va', population: 450000, averageIncome: 58068 }
];

// Generate unique introductions for each city/role combination
export const generateRoleIntro = (role: typeof BEAUTY_ROLES[0], city: typeof TARGET_CITIES[0]): string => {
  const roleIntros = {
    'nail-technician': [
      `${city.name}'s nail industry is thriving with opportunities for skilled technicians across luxury spas, trendy boutique salons, and established nail bars. The city's diverse clientele demands expertise in everything from classic manicures to the latest nail art trends and advanced techniques like Russian manicures and gel-x extensions.`,
      `Looking for nail technician positions in ${city.name}? The city offers exceptional career growth for nail artists, with high-end salons, celebrity clientele, and competitive compensation packages. From innovative nail art studios to full-service day spas, ${city.name} provides diverse opportunities for every skill level.`,
      `${city.name}'s beauty scene creates abundant opportunities for nail technicians seeking to advance their careers. The market values creativity, technical precision, and customer service excellence, offering positions in upscale salons, wellness centers, and specialized nail boutiques throughout the metropolitan area.`
    ],
    'hair-stylist': [
      `${city.name}'s hair styling scene offers diverse opportunities from cutting-edge fashion salons to neighborhood favorites serving loyal clientele. The city's dynamic market rewards stylists who master both classic techniques and trending styles, with opportunities in luxury establishments, independent studios, and full-service beauty centers.`,
      `Hair stylists in ${city.name} enjoy a vibrant professional landscape with high demand for skilled colorists, cut specialists, and styling experts. The city's fashion-forward culture and diverse population create opportunities to work with every hair type and texture, from avant-garde editorial work to everyday transformations.`,
      `The hair styling market in ${city.name} continues expanding with new salon openings, established chains recruiting talent, and independent artists building loyal followings. From bridal specialists to men's grooming experts, the city offers career paths for every styling specialty and experience level.`
    ],
    'barber': [
      `${city.name}'s barbering renaissance has created a thriving market for skilled professionals who blend traditional techniques with modern styling. The city's growing appreciation for craft barbering, precision fades, and classic hot towel shaves has established numerous opportunities in traditional barbershops, modern grooming lounges, and upscale men's salons.`,
      `Barbers in ${city.name} find excellent opportunities serving the city's diverse male clientele, from business professionals seeking sharp cuts to style-conscious individuals wanting the latest trends. The market supports both traditional barbershop culture and modern grooming establishments offering comprehensive men's services.`,
      `The barbering profession thrives in ${city.name} with established shops expanding, new concept stores opening, and increasing demand for skilled fade specialists and straight razor experts. From classic neighborhood barbershops to high-end grooming establishments, the city offers diverse career opportunities for dedicated barbers.`
    ],
    'esthetician': [
      `${city.name}'s wellness and skincare market creates exceptional opportunities for estheticians specializing in facial treatments, anti-aging services, and therapeutic skincare. The city's health-conscious population and growing beauty industry support careers in medical spas, luxury day spas, dermatology offices, and independent skincare studios.`,
      `Estheticians in ${city.name} benefit from strong demand for professional skincare services, advanced facial treatments, and specialized procedures like microdermabrasion and chemical peels. The city's beauty market values expertise in skin analysis, customized treatments, and the latest skincare technologies and techniques.`,
      `The skincare industry in ${city.name} offers estheticians diverse career paths from relaxation-focused day spas to results-driven medical aesthetics practices. Growing awareness of professional skincare benefits creates opportunities in established spas, wellness centers, and emerging boutique facial studios throughout the area.`
    ],
    'massage-therapist': [
      `${city.name}'s wellness industry provides massage therapists with diverse opportunities in luxury spas, medical facilities, wellness centers, and private practice settings. The city's focus on health and stress management creates demand for therapeutic massage, sports therapy, and relaxation services across multiple professional environments.`,
      `Massage therapists find rewarding careers in ${city.name}'s expanding wellness market, serving clients seeking pain relief, stress management, and overall well-being. Opportunities span from resort spas and day spas to chiropractic offices, physical therapy clinics, and independent wellness practices throughout the metropolitan area.`,
      `The massage therapy profession flourishes in ${city.name} with growing recognition of therapeutic benefits and wellness tourism. Licensed therapists can build careers in established spa chains, boutique wellness centers, medical settings, or independent practices serving the city's health-conscious population and visiting clientele.`
    ],
    'lash-artist': [
      `${city.name}'s beauty scene has embraced the lash extension trend, creating numerous opportunities for skilled lash artists and technicians. The city's fashion-forward clientele seeks everything from natural everyday enhancements to dramatic volume lashes, supporting careers in dedicated lash studios, beauty bars, and full-service salons.`,
      `Lash artists in ${city.name} enjoy strong market demand from clients seeking professional eyelash extensions, lifts, and tinting services. The city's beauty industry supports both established lash specialists expanding their businesses and new technicians building clienteles in luxury salons, boutique lash bars, and independent studios.`,
      `The lash extension market in ${city.name} continues growing with new studios opening and established salons adding lash services to meet client demand. Skilled lash technicians find opportunities in high-end beauty establishments, specialized lash boutiques, and mobile services catering to the city's busy professional population.`
    ]
  };

  const intros = roleIntros[role.slug as keyof typeof roleIntros] || [`${role.name} opportunities in ${city.name} offer diverse career paths...`];
  const hash = (city.slug + role.slug).split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
  return intros[Math.abs(hash) % intros.length];
};

// Role-specific FAQ data
export const generateRoleFAQs = (role: typeof BEAUTY_ROLES[0], city: typeof TARGET_CITIES[0]) => {
  const baseFAQs = {
    'nail-technician': [
      {
        question: `What qualifications do I need to work as a nail technician in ${city.name}?`,
        answer: `To work as a nail technician in ${city.name}, you typically need to complete a state-approved cosmetology or nail technology program and obtain your ${city.state} nail technician license. Most programs require 300-600 hours of training covering sanitation, nail anatomy, manicure/pedicure techniques, and nail art. You'll also need to pass both written and practical state board examinations.`
      },
      {
        question: `What's the average salary for nail technicians in ${city.name}?`,
        answer: `Nail technicians in ${city.name} typically earn between $30,000-$60,000 annually, with experienced professionals and those in high-end salons earning more. Hourly rates range from $15-$35, plus tips which can significantly increase earnings. Independent nail artists and salon owners may earn $70,000+ with established clientele.`
      },
      {
        question: `Are there opportunities for career advancement in ${city.name}'s nail industry?`,
        answer: `Yes, ${city.name} offers excellent advancement opportunities including salon management positions, opening your own nail studio, specializing in nail art or specific techniques, becoming an educator, or expanding into related beauty services. The city's thriving beauty scene supports entrepreneurial nail professionals.`
      },
      {
        question: `What nail techniques are most in demand in ${city.name}?`,
        answer: `Popular nail services in ${city.name} include gel manicures, nail extensions (gel-x, acrylics), Russian manicures, nail art designs, and specialized treatments like dip powder and BIAB. Staying current with trends through continuing education helps nail techs remain competitive in the market.`
      }
    ],
    'hair-stylist': [
      {
        question: `What education is required to become a hair stylist in ${city.name}?`,
        answer: `Hair stylists in ${city.name} must complete a state-approved cosmetology program (typically 1,500-2,000 hours) and obtain a ${city.state} cosmetology license. Training covers hair cutting, coloring, chemical services, sanitation, and client consultation. Many stylists also pursue advanced education in specialized techniques.`
      },
      {
        question: `What can hair stylists expect to earn in ${city.name}?`,
        answer: `Hair stylists in ${city.name} typically earn $35,000-$75,000 annually, with top stylists in upscale salons earning $80,000+. Compensation varies by experience, salon type, and clientele. Many stylists also earn significant income from tips and retail product sales.`
      },
      {
        question: `Are there specialization opportunities for hair stylists in ${city.name}?`,
        answer: `${city.name}'s diverse beauty market supports various specializations including color correction, bridal styling, men's cuts, curly hair expertise, extensions, and keratin treatments. Specialized stylists often command higher rates and develop loyal client bases.`
      },
      {
        question: `How competitive is the hair styling market in ${city.name}?`,
        answer: `While competitive, ${city.name}'s large population and growing beauty industry provide ample opportunities for skilled stylists. Success depends on technical skills, customer service, continuing education, and building a strong client base through quality work and professional networking.`
      }
    ],
    'barber': [
      {
        question: `Do I need a special license to work as a barber in ${city.name}?`,
        answer: `Yes, barbers in ${city.name} need a ${city.state} barber license, which typically requires completing a state-approved barbering program (1,000-1,500 hours) and passing written and practical examinations. Some states allow cosmetologists to perform barbering services with additional training.`
      },
      {
        question: `What's the earning potential for barbers in ${city.name}?`,
        answer: `Barbers in ${city.name} typically earn $30,000-$65,000 annually, with experienced barbers in busy shops or upscale establishments earning more. Master barbers and shop owners can earn $75,000+. Tips and client retention significantly impact overall earnings.`
      },
      {
        question: `What barbering techniques are popular in ${city.name}?`,
        answer: `Popular services in ${city.name} include precision fades, beard trimming and styling, straight razor shaves, modern cuts, and traditional barbering techniques. Many barbers also offer additional services like hot towel treatments, scalp massages, and men's grooming consultations.`
      },
      {
        question: `Is there demand for barbers in ${city.name}?`,
        answer: `Yes, ${city.name} has strong demand for skilled barbers due to the growing men's grooming market and resurgence of traditional barbering. New barbershops continue opening, and established shops actively recruit experienced professionals.`
      }
    ],
    'esthetician': [
      {
        question: `What licensing requirements exist for estheticians in ${city.name}?`,
        answer: `Estheticians in ${city.name} must complete a state-approved esthetics program (typically 600-1,500 hours depending on ${city.state} requirements) and obtain an esthetics license. Advanced procedures may require additional certifications or working under medical supervision.`
      },
      {
        question: `What do estheticians earn in ${city.name}?`,
        answer: `Estheticians in ${city.name} typically earn $35,000-$60,000 annually, with medical estheticians and those in high-end spas earning more. Specialized practitioners offering advanced treatments like microdermabrasion or chemical peels can earn $65,000+.`
      },
      {
        question: `What career paths are available for estheticians in ${city.name}?`,
        answer: `${city.name} offers diverse opportunities including day spas, medical spas, dermatology offices, wellness centers, and independent practice. Estheticians can specialize in areas like acne treatment, anti-aging, holistic skincare, or advanced aesthetic procedures.`
      },
      {
        question: `What skincare treatments are most popular in ${city.name}?`,
        answer: `Popular services include customized facials, chemical peels, microdermabrasion, LED light therapy, anti-aging treatments, and specialized acne care. The city's health-conscious population also seeks natural and organic skincare options.`
      }
    ],
    'massage-therapist': [
      {
        question: `What are the licensing requirements for massage therapists in ${city.name}?`,
        answer: `Massage therapists in ${city.name} must complete a state-approved massage therapy program (typically 500-1,000 hours) and obtain a ${city.state} massage therapy license. Requirements include anatomy, physiology, therapeutic techniques, ethics, and business practices.`
      },
      {
        question: `How much do massage therapists earn in ${city.name}?`,
        answer: `Massage therapists in ${city.name} typically earn $40,000-$70,000 annually. Earnings vary by work setting, with spa therapists, medical massage specialists, and independent practitioners often earning different rates. Tips and repeat clients significantly boost income.`
      },
      {
        question: `Where can massage therapists work in ${city.name}?`,
        answer: `Opportunities exist in day spas, resort spas, medical facilities, chiropractic offices, physical therapy clinics, wellness centers, fitness facilities, and private practice. Each setting offers different clientele and specialized massage techniques.`
      },
      {
        question: `What massage specialties are in demand in ${city.name}?`,
        answer: `Popular specialties include deep tissue massage, sports massage, prenatal massage, lymphatic drainage, hot stone therapy, and medical massage. Specialized training in these areas can increase earning potential and client demand.`
      }
    ],
    'lash-artist': [
      {
        question: `Do lash artists need certification in ${city.name}?`,
        answer: `While ${city.state} may not require specific lash certification, most employers prefer certified lash technicians. Professional lash extension training covers safety, adhesive knowledge, application techniques, and styling. Some states require cosmetology or esthetics licenses.`
      },
      {
        question: `What can lash artists expect to earn in ${city.name}?`,
        answer: `Lash artists in ${city.name} typically earn $35,000-$65,000 annually, with experienced technicians in high-end salons or with established clientele earning more. Per-service rates range from $100-$300 for full sets, with fill appointments providing steady income.`
      },
      {
        question: `What lash services are popular in ${city.name}?`,
        answer: `Popular services include classic lash extensions, volume lashes, mega volume, lash lifts, tinting, and removal services. Many clients also seek specialized styles like cat eyes, doll eyes, or natural enhancement looks.`
      },
      {
        question: `Is the lash industry growing in ${city.name}?`,
        answer: `Yes, the lash extension market continues growing in ${city.name} with new studios opening and established salons adding lash services. The semi-permanent nature of extensions creates recurring client relationships and steady income for skilled technicians.`
      }
    ]
  };

  return baseFAQs[role.slug as keyof typeof baseFAQs] || [];
};

// Generate all combinations for sitemap
export const generateAllCombinations = () => {
  const combinations = [];
  for (const city of TARGET_CITIES) {
    for (const role of BEAUTY_ROLES) {
      combinations.push({
        city,
        role,
        url: `/jobs/${city.slug}/${role.slug}`,
        title: `${role.name} Jobs in ${city.name}, ${city.state}`,
        description: generateRoleIntro(role, city).substring(0, 160) + '...'
      });
    }
  }
  return combinations;
};