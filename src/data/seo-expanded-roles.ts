// Expanded beauty industry roles for massive SEO coverage
export const EXPANDED_SEO_ROLES = [
  // Core beauty services (existing)
  { id: 'nails', name: 'Nail Technician', category: 'nails', avgSalary: 35000, searchVolume: 14800 },
  { id: 'hair', name: 'Hair Stylist', category: 'hair', avgSalary: 32000, searchVolume: 12100 },
  { id: 'barber', name: 'Barber', category: 'hair', avgSalary: 38000, searchVolume: 9900 },
  { id: 'lashes', name: 'Lash Artist', category: 'lashes', avgSalary: 42000, searchVolume: 3600 },
  { id: 'massage', name: 'Massage Therapist', category: 'wellness', avgSalary: 45000, searchVolume: 8100 },
  { id: 'skincare', name: 'Esthetician', category: 'skincare', avgSalary: 36000, searchVolume: 5400 },
  
  // Expanded specialty services (NEW - HIGH OPPORTUNITY)
  { id: 'microblading', name: 'Microblading Artist', category: 'brows', avgSalary: 65000, searchVolume: 2900 },
  { id: 'permanent-makeup', name: 'Permanent Makeup Artist', category: 'makeup', avgSalary: 58000, searchVolume: 1800 },
  { id: 'medical-aesthetics', name: 'Medical Aesthetician', category: 'medical', avgSalary: 52000, searchVolume: 1400 },
  { id: 'waxing-specialist', name: 'Waxing Specialist', category: 'hair-removal', avgSalary: 32000, searchVolume: 2200 },
  { id: 'threading-specialist', name: 'Threading Specialist', category: 'brows', avgSalary: 28000, searchVolume: 1100 },
  { id: 'spray-tan-technician', name: 'Spray Tan Technician', category: 'tanning', avgSalary: 30000, searchVolume: 800 },
  { id: 'body-piercing', name: 'Body Piercer', category: 'piercing', avgSalary: 35000, searchVolume: 1500 },
  { id: 'cosmetic-tattoo-artist', name: 'Cosmetic Tattoo Artist', category: 'tattoo', avgSalary: 55000, searchVolume: 900 },
  { id: 'bridal-makeup-artist', name: 'Bridal Makeup Artist', category: 'makeup', avgSalary: 48000, searchVolume: 2400 },
  { id: 'editorial-makeup-artist', name: 'Editorial Makeup Artist', category: 'makeup', avgSalary: 52000, searchVolume: 800 },
  { id: 'sfx-makeup-artist', name: 'SFX Makeup Artist', category: 'makeup', avgSalary: 58000, searchVolume: 600 },
  { id: 'hairstylist-colorist', name: 'Hair Colorist', category: 'hair', avgSalary: 42000, searchVolume: 3200 },
  { id: 'hair-extension-specialist', name: 'Hair Extension Specialist', category: 'hair', avgSalary: 45000, searchVolume: 1800 },
  { id: 'brazilian-blowout-specialist', name: 'Brazilian Blowout Specialist', category: 'hair', avgSalary: 38000, searchVolume: 700 },
  
  // Wellness & spa services
  { id: 'acupuncturist', name: 'Acupuncturist', category: 'wellness', avgSalary: 68000, searchVolume: 3300 },
  { id: 'reiki-practitioner', name: 'Reiki Practitioner', category: 'wellness', avgSalary: 42000, searchVolume: 1200 },
  { id: 'lymphatic-drainage-therapist', name: 'Lymphatic Drainage Therapist', category: 'wellness', avgSalary: 48000, searchVolume: 600 },
  { id: 'reflexologist', name: 'Reflexologist', category: 'wellness', avgSalary: 41000, searchVolume: 900 },
  
  // Advanced skincare
  { id: 'chemical-peel-specialist', name: 'Chemical Peel Specialist', category: 'skincare', avgSalary: 45000, searchVolume: 800 },
  { id: 'microdermabrasion-technician', name: 'Microdermabrasion Technician', category: 'skincare', avgSalary: 38000, searchVolume: 600 },
  { id: 'laser-hair-removal-technician', name: 'Laser Hair Removal Technician', category: 'medical', avgSalary: 42000, searchVolume: 1900 },
  { id: 'coolsculpting-technician', name: 'CoolSculpting Technician', category: 'medical', avgSalary: 45000, searchVolume: 400 },
  
  // Specialized roles
  { id: 'salon-manager', name: 'Salon Manager', category: 'management', avgSalary: 48000, searchVolume: 2100 },
  { id: 'spa-manager', name: 'Spa Manager', category: 'management', avgSalary: 52000, searchVolume: 1600 },
  { id: 'beauty-instructor', name: 'Beauty Instructor', category: 'education', avgSalary: 45000, searchVolume: 1200 },
  { id: 'cosmetology-instructor', name: 'Cosmetology Instructor', category: 'education', avgSalary: 44000, searchVolume: 1100 },
  
  // Mobile/freelance services
  { id: 'mobile-hair-stylist', name: 'Mobile Hair Stylist', category: 'mobile', avgSalary: 45000, searchVolume: 1500 },
  { id: 'mobile-makeup-artist', name: 'Mobile Makeup Artist', category: 'mobile', avgSalary: 48000, searchVolume: 1200 },
  { id: 'mobile-nail-technician', name: 'Mobile Nail Technician', category: 'mobile', avgSalary: 38000, searchVolume: 900 },
  { id: 'wedding-beauty-team', name: 'Wedding Beauty Team', category: 'events', avgSalary: 55000, searchVolume: 800 },
  
  // Emerging trends
  { id: 'brow-lamination-specialist', name: 'Brow Lamination Specialist', category: 'brows', avgSalary: 38000, searchVolume: 600 },
  { id: 'lash-lift-technician', name: 'Lash Lift Technician', category: 'lashes', avgSalary: 35000, searchVolume: 1100 },
  { id: 'henna-brow-artist', name: 'Henna Brow Artist', category: 'brows', avgSalary: 32000, searchVolume: 400 },
  { id: 'dermaplaning-specialist', name: 'Dermaplaning Specialist', category: 'skincare', avgSalary: 40000, searchVolume: 800 },
  { id: 'hydrafacial-technician', name: 'HydraFacial Technician', category: 'skincare', avgSalary: 42000, searchVolume: 700 }
] as const;

export type ExpandedRoleId = typeof EXPANDED_SEO_ROLES[number]['id'];

// Generate SEO-optimized content for each role
export function getRoleMetadata(roleId: ExpandedRoleId) {
  const role = EXPANDED_SEO_ROLES.find(r => r.id === roleId);
  if (!role) return null;
  
  return {
    title: `${role.name} Jobs | Find ${role.name} Careers | EmviApp`,
    description: `Find premium ${role.name.toLowerCase()} jobs nationwide. Browse high-paying ${role.name.toLowerCase()} opportunities at top salons and spas. Average salary: $${role.avgSalary.toLocaleString()}/year. Apply today!`,
    keywords: [
      `${role.name.toLowerCase()} jobs`,
      `${role.name.toLowerCase()} careers`,
      `${role.name.toLowerCase()} positions`,
      `${role.name.toLowerCase()} opportunities`,
      `${role.name.toLowerCase()} hiring`,
      `${role.name.toLowerCase()} salary`,
      `${role.name.toLowerCase()} near me`
    ],
    structuredData: {
      "@type": "JobPosting",
      "title": `${role.name} Opportunities`,
      "description": `High-paying ${role.name.toLowerCase()} positions available nationwide`,
      "occupationalCategory": role.category,
      "estimatedSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "value": role.avgSalary,
          "unitText": "YEAR"
        }
      }
    }
  };
}

// Categories for navigation and organization
export const ROLE_CATEGORIES = {
  'nails': { name: 'Nail Services', icon: '💅', color: '#FF6B9D' },
  'hair': { name: 'Hair Services', icon: '✂️', color: '#4ECDC4' },
  'makeup': { name: 'Makeup Services', icon: '💄', color: '#FFE66D' },
  'skincare': { name: 'Skincare Services', icon: '🧴', color: '#95E1D3' },
  'lashes': { name: 'Lash & Brow Services', icon: '👁️', color: '#F38BA8' },
  'brows': { name: 'Brow Services', icon: '🤨', color: '#DDB892' },
  'wellness': { name: 'Wellness Services', icon: '🧘', color: '#A8DADC' },
  'medical': { name: 'Medical Aesthetics', icon: '🏥', color: '#457B9D' },
  'mobile': { name: 'Mobile Services', icon: '🚗', color: '#1D3557' },
  'events': { name: 'Event Services', icon: '💒', color: '#E63946' },
  'management': { name: 'Management Roles', icon: '👑', color: '#6A4C93' },
  'education': { name: 'Education Roles', icon: '📚', color: '#FB8500' },
  'piercing': { name: 'Piercing Services', icon: '💎', color: '#8ECAE6' },
  'tattoo': { name: 'Tattoo Services', icon: '🎨', color: '#219EBC' },
  'tanning': { name: 'Tanning Services', icon: '☀️', color: '#FFBE0B' },
  'hair-removal': { name: 'Hair Removal', icon: '🪒', color: '#023047' }
};