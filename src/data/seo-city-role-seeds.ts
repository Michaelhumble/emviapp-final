// City/Role combinations for programmatic job landing pages
export const CITY_ROLE_SEEDS = {
  cities: [
    { id: 'los-angeles-ca', name: 'Los Angeles', state: 'CA' },
    { id: 'new-york-ny', name: 'New York', state: 'NY' },
    { id: 'chicago-il', name: 'Chicago', state: 'IL' },
    { id: 'houston-tx', name: 'Houston', state: 'TX' },
    { id: 'phoenix-az', name: 'Phoenix', state: 'AZ' },
    { id: 'philadelphia-pa', name: 'Philadelphia', state: 'PA' },
    { id: 'san-antonio-tx', name: 'San Antonio', state: 'TX' },
    { id: 'san-diego-ca', name: 'San Diego', state: 'CA' },
    { id: 'dallas-tx', name: 'Dallas', state: 'TX' },
    { id: 'austin-tx', name: 'Austin', state: 'TX' },
    { id: 'jacksonville-fl', name: 'Jacksonville', state: 'FL' },
    { id: 'fort-worth-tx', name: 'Fort Worth', state: 'TX' },
    { id: 'columbus-oh', name: 'Columbus', state: 'OH' },
    { id: 'charlotte-nc', name: 'Charlotte', state: 'NC' },
    { id: 'san-francisco-ca', name: 'San Francisco', state: 'CA' },
    { id: 'seattle-wa', name: 'Seattle', state: 'WA' },
    { id: 'denver-co', name: 'Denver', state: 'CO' },
    { id: 'boston-ma', name: 'Boston', state: 'MA' },
    { id: 'detroit-mi', name: 'Detroit', state: 'MI' },
    { id: 'portland-or', name: 'Portland', state: 'OR' },
    { id: 'las-vegas-nv', name: 'Las Vegas', state: 'NV' },
    { id: 'miami-fl', name: 'Miami', state: 'FL' },
    { id: 'atlanta-ga', name: 'Atlanta', state: 'GA' },
    { id: 'orlando-fl', name: 'Orlando', state: 'FL' },
    { id: 'tampa-fl', name: 'Tampa', state: 'FL' }
  ],
  roles: [
    { id: 'nail-technician', name: 'Nail Technician', plural: 'Nail Technicians' },
    { id: 'hair-stylist', name: 'Hair Stylist', plural: 'Hair Stylists' },
    { id: 'salon-manager', name: 'Salon Manager', plural: 'Salon Managers' },
    { id: 'massage-therapist', name: 'Massage Therapist', plural: 'Massage Therapists' },
    { id: 'barber', name: 'Barber', plural: 'Barbers' },
    { id: 'esthetician', name: 'Esthetician', plural: 'Estheticians' }
  ]
} as const;

export function generateCityRoleContent(role: string, city: string, state: string) {
  return {
    intro: `Finding quality ${role.toLowerCase()} positions in ${city}, ${state} has never been easier. EmviApp connects talented beauty professionals with top salons and spas throughout the ${city} area. Whether you're an experienced ${role.toLowerCase()} or just starting your career, discover opportunities that match your skills and schedule preferences.`,
    faqs: [
      {
        question: `What is the average salary for a ${role} in ${city}?`,
        answer: `${role} salaries in ${city}, ${state} typically range from $30,000 to $65,000 annually, depending on experience, location, and clientele. Many positions also offer commission and tips.`
      },
      {
        question: `Do I need a license to work as a ${role} in ${state}?`,
        answer: `Yes, ${state} requires ${role.toLowerCase()}s to hold a valid state-issued cosmetology or specialty license. Requirements vary by role and can be verified through your state board.`
      },
      {
        question: `How do I apply for ${role.toLowerCase()} jobs on EmviApp?`,
        answer: `Simply create a free profile, upload your resume and portfolio, and start applying to jobs that match your preferences. Employers can also reach out to you directly.`
      },
      {
        question: `What types of ${role.toLowerCase()} positions are available in ${city}?`,
        answer: `You'll find full-time, part-time, booth rental, and freelance opportunities across ${city}. Positions range from entry-level to senior roles in salons, spas, and independent studios.`
      },
      {
        question: `How quickly can I find a ${role.toLowerCase()} job in ${city}?`,
        answer: `Many candidates receive interview requests within 48 hours of posting their profile. Active job seekers in ${city} typically secure positions within 1-3 weeks.`
      }
    ]
  };
}
