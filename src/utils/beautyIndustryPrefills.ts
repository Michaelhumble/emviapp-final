
/**
 * BEAUTY INDUSTRY PREFILL DATA UTILITY
 * 
 * ✅ STATUS: 100% READY FOR INSTANT CONNECTION
 * 
 * This module contains detailed, emotionally engaging, and conversion-optimized
 * prefilled starter content for all beauty industries. Once EnhancedJobForm
 * supports initialValues prop, this data can be instantly connected.
 * 
 * PROTECTED COMPONENTS (DO NOT MODIFY):
 * - ConsolidatedJobTemplateSelector.tsx
 * - EnhancedJobForm.tsx
 * 
 * FUTURE CONNECTION: Pass result of getPrefillForIndustry() as initialValues prop
 */

export interface JobPrefillData {
  title: string;
  shortDescription: string;
  longDescription: string;
  requirements: string[];
  benefits: string[];
  salaryRange: string;
  experienceLevel: string;
  workType: string;
  location: string;
  trustPhrase: string;
  urgencyIndicator?: string;
  specialPerks?: string[];
}

/**
 * COMPREHENSIVE BEAUTY INDUSTRY PREFILL DATABASE
 * Each industry includes emotionally engaging content with trust-building elements
 */
const BEAUTY_INDUSTRY_PREFILLS: Record<string, JobPrefillData> = {
  // NAIL INDUSTRY
  nails: {
    title: "Nail Technician - Join Our Growing Team! 💅",
    shortDescription: "Seeking passionate nail artist for busy, friendly salon with loyal clientele base ✨",
    longDescription: `🌟 Join our thriving nail salon family! We're looking for a skilled nail technician who loves creating beautiful nails and building lasting client relationships.

Our established salon offers:
• Steady stream of loyal clients who appreciate quality work
• Supportive, drama-free team environment 
• Modern equipment and premium product lines
• Flexible scheduling to fit your lifestyle
• Weekly pay and performance bonuses 💰

Perfect for artists who want to grow their skills while earning great income in a professional, welcoming atmosphere. Both experienced techs and recent graduates welcome!

Bao Lương Nếu Cần - Hỗ Trợ Việt Nam ✅`,
    requirements: [
      "Valid nail technician license required",
      "Basic knowledge of acrylic, gel, and dip powder techniques",
      "Friendly personality and professional appearance",
      "Ability to work in fast-paced environment",
      "Bilingual (English/Vietnamese) preferred but not required"
    ],
    benefits: [
      "Weekly pay 💰",
      "Flexible scheduling available",
      "Product discounts and training",
      "Performance bonuses",
      "Friendly, supportive team environment",
      "Growing clientele base ✨",
      "Bao Lương Nếu Cần ✅"
    ],
    salaryRange: "$15-25/hour + tips + bonuses",
    experienceLevel: "Entry level welcome - Will train right person",
    workType: "Full-time/Part-time",
    location: "Busy shopping center location",
    trustPhrase: "Established salon with 5+ years serving the community 🏆",
    urgencyIndicator: "Start immediately - Training provided",
    specialPerks: ["Weekly pay", "Flexible hours", "Drama-free environment"]
  },

  // HAIR INDUSTRY
  hair: {
    title: "Hair Stylist - Creative Team Opportunity! ✂️",
    shortDescription: "Join our award-winning salon team! Great pay, flexible schedule, loyal clients 💇‍♀️",
    longDescription: `💫 Transform lives through beautiful hair! We're seeking a talented hair stylist to join our dynamic salon team.

What makes us special:
• Established clientele who trust our expertise
• Latest techniques and continuing education support
• High-quality product lines and modern equipment
• Competitive commission structure with growth potential
• Collaborative, inspiring work environment
• Weekly pay and flexible scheduling 💰

Whether you specialize in cuts, color, or styling, we provide the platform for you to showcase your creativity while building a profitable career. New graduates and experienced stylists both welcome!

Growing Your Success is Our Success ✨`,
    requirements: [
      "Valid cosmetology license required",
      "Proficiency in cutting, coloring, and styling techniques",
      "Strong communication and customer service skills",
      "Creative flair and attention to detail",
      "Professional appearance and positive attitude"
    ],
    benefits: [
      "Competitive commission up to 60%",
      "Weekly pay + tips 💰",
      "Continuing education opportunities", 
      "Product discounts",
      "Flexible scheduling",
      "Supportive team environment",
      "Built-in clientele to get you started ✨"
    ],
    salaryRange: "$18-35/hour + commission + tips",
    experienceLevel: "1+ years preferred, new graduates considered",
    workType: "Full-time/Part-time available",
    location: "Prime salon location with high foot traffic",
    trustPhrase: "Award-winning salon with 10+ years of excellence 🏆",
    urgencyIndicator: "Multiple positions available - Join our growing team",
    specialPerks: ["High commission rates", "Continuing education", "Creative freedom"]
  },

  // LASH INDUSTRY
  lashes: {
    title: "Lash Artist - Premium Lash Studio 👁️✨",
    shortDescription: "High-end lash studio seeking skilled artist. Great pay, luxury environment, repeat clients 💫",
    longDescription: `🌟 Join the premier lash destination in our area! We're looking for a passionate lash artist who takes pride in creating stunning, long-lasting lash extensions.

Our luxury studio offers:
• Premium products and latest lash techniques
• High-paying clientele who value quality work
• Beautiful, relaxing work environment
• Excellent pay structure with performance incentives
• Flexible booking system to maximize your earnings
• Weekly pay and tips 💰

Perfect opportunity for experienced lash artists or those looking to specialize in this growing field. We provide ongoing training and support to help you excel.

Xây Dựng Khách Hàng Thân Thiết - Luxury Experience ✨`,
    requirements: [
      "Lash extension certification required",
      "Knowledge of classic, volume, and mega volume techniques",
      "Steady hands and excellent attention to detail",
      "Professional demeanor and excellent hygiene standards",
      "Ability to work 2-4 hour appointments with precision"
    ],
    benefits: [
      "High service prices - Premium clientele",
      "Weekly pay + tips 💰",
      "Luxury work environment",
      "Flexible appointment scheduling",
      "Advanced training opportunities",
      "Product discounts",
      "Repeat client base ✨"
    ],
    salaryRange: "$25-45/hour + tips",
    experienceLevel: "Certified lash artist with portfolio",
    workType: "Full-time/Part-time/Freelance",
    location: "Upscale studio location",
    trustPhrase: "Premium lash studio with 5-star reviews 🌟",
    urgencyIndicator: "High demand - Book your interview today",
    specialPerks: ["Premium pricing", "Luxury environment", "High-end clientele"]
  },

  // ESTHETICIAN INDUSTRY
  esthetician: {
    title: "Esthetician - Skincare Specialist Position 🧴✨",
    shortDescription: "Growing spa seeks licensed esthetician. Facial specialist, great benefits, wellness focus 🌿",
    longDescription: `🌸 Help clients achieve their best skin! We're seeking a dedicated esthetician to join our wellness-focused spa team.

Our spa specializes in:
• Advanced facial treatments and skin analysis
• Anti-aging and corrective skincare protocols
• Relaxing, therapeutic environment
• High-quality product lines and equipment
• Continuing education in latest techniques
• Weekly pay with performance bonuses 💰

Perfect for skincare enthusiasts who want to make a real difference in clients' confidence and well-being. We support your professional growth while providing stable income.

Chăm Sóc Da Chuyên Nghiệp - Wellness Focus 🌿`,
    requirements: [
      "Valid esthetician license required",
      "Knowledge of facial treatments and skin analysis",
      "Understanding of skin conditions and product ingredients",
      "Professional communication skills",
      "Passion for skincare and wellness"
    ],
    benefits: [
      "Competitive hourly rate + commission",
      "Weekly pay + tips 💰",
      "Product training and certifications",
      "Wellness-focused work environment",
      "Flexible scheduling options",
      "Employee spa discounts",
      "Growing client base ✨"
    ],
    salaryRange: "$20-30/hour + commission + tips",
    experienceLevel: "Licensed esthetician, experience preferred",
    workType: "Full-time/Part-time",
    location: "Relaxing spa environment",
    trustPhrase: "Established wellness spa with loyal clientele 🌟",
    urgencyIndicator: "Spa expansion - Multiple positions available",
    specialPerks: ["Wellness focus", "Advanced training", "Product discounts"]
  },

  // MASSAGE THERAPY
  massage: {
    title: "Massage Therapist - Therapeutic Wellness Team 🤲",
    shortDescription: "Wellness center seeks licensed massage therapist. Therapeutic focus, great pay, healing environment 🌿",
    longDescription: `🌟 Make a healing difference! Our wellness center is expanding and needs a skilled massage therapist who's passionate about therapeutic bodywork.

Our center offers:
• Variety of massage modalities and techniques
• Focus on therapeutic and medical massage
• Peaceful, professional healing environment
• Excellent compensation with regular clients
• Flexible scheduling and weekly pay 💰
• Continuing education support

Ideal for therapists who want meaningful work helping clients with pain relief, stress reduction, and overall wellness. Both experienced therapists and new graduates welcome with proper support.

Chữa Lành Qua Liệu Pháp Massage - Therapeutic Focus ✨`,
    requirements: [
      "Valid massage therapy license (LMT)",
      "Knowledge of Swedish, deep tissue, and therapeutic techniques",
      "Professional demeanor and strong communication",
      "Physical stamina for full-day practice",
      "Compassionate approach to client care"
    ],
    benefits: [
      "Excellent hourly rate + tips",
      "Weekly pay 💰",
      "Flexible scheduling",
      "Therapeutic work environment",
      "Continuing education opportunities",
      "Regular client bookings",
      "Wellness benefits ✨"
    ],
    salaryRange: "$25-40/hour + tips",
    experienceLevel: "Licensed massage therapist",
    workType: "Full-time/Part-time/Contract",
    location: "Professional wellness center",
    trustPhrase: "Established wellness center with therapeutic focus 🌿",
    urgencyIndicator: "High client demand - Start soon",
    specialPerks: ["Therapeutic focus", "High pay", "Meaningful work"]
  },

  // BARBER INDUSTRY
  barber: {
    title: "Barber - Classic & Modern Cuts 💈",
    shortDescription: "Busy barbershop needs skilled barber. Great atmosphere, loyal clients, excellent tips! ✂️",
    longDescription: `💈 Join our brotherhood of skilled barbers! We're looking for a talented barber who takes pride in classic and modern men's grooming.

Our shop features:
• High volume of regular clients who tip well
• Classic barbershop atmosphere with modern amenities
• Latest tools and premium grooming products
• Supportive team environment
• Weekly pay plus excellent tips 💰
• Flexible schedule options

Perfect for barbers who enjoy the craft, conversation, and building lasting client relationships. We welcome experienced barbers and those ready to hone their skills with our mentorship.

Cắt Tóc Nam Chuyên Nghiệp - Classic & Modern Style ✂️`,
    requirements: [
      "Valid barber license required",
      "Proficiency in classic cuts, fades, and beard trimming",
      "Strong people skills and professional demeanor",
      "Ability to work efficiently in busy environment",
      "Passion for men's grooming and style"
    ],
    benefits: [
      "High tip-earning potential",
      "Weekly pay + tips 💰",
      "Busy shop with steady clients",
      "Brotherhood atmosphere",
      "Flexible scheduling",
      "Premium tools and products",
      "Mentorship opportunities ✨"
    ],
    salaryRange: "$20-35/hour + excellent tips",
    experienceLevel: "Licensed barber with experience",
    workType: "Full-time/Part-time",
    location: "Busy neighborhood barbershop",
    trustPhrase: "Established barbershop with 15+ years in community 💈",
    urgencyIndicator: "High client demand - Join immediately",
    specialPerks: ["High tips", "Brotherhood culture", "Busy clientele"]
  },

  // MAKEUP ARTIST
  makeup: {
    title: "Makeup Artist - Bridal & Event Specialist 💄",
    shortDescription: "Event makeup artist needed! Bridal specialist, high-end events, creative freedom ✨",
    longDescription: `💫 Create magic on the most important days! We're seeking a talented makeup artist specializing in bridal and special event makeup.

Our services include:
• Bridal makeup and wedding parties
• Special events and photoshoots
• High-end clientele with premium pricing
• Creative freedom and artistic expression
• Flexible scheduling around events
• Weekly pay with performance bonuses 💰

Perfect for makeup artists who want to specialize in the lucrative bridal market while having creative freedom. We provide marketing support and established client referrals.

Trang Điểm Cô Dâu Chuyên Nghiệp - Bridal Beauty Expert 💍`,
    requirements: [
      "Professional makeup artistry training/certification",
      "Portfolio showcasing bridal and event work",
      "Knowledge of photography-friendly makeup techniques",
      "Professional kit with high-quality products",
      "Excellent communication and client service skills"
    ],
    benefits: [
      "High-paying bridal events",
      "Weekly pay + event bonuses 💰",
      "Creative artistic freedom",
      "Flexible event-based scheduling",
      "Marketing and referral support",
      "Premium client base",
      "Portfolio building opportunities ✨"
    ],
    salaryRange: "$40-80/hour per event + bonuses",
    experienceLevel: "Professional makeup artist with portfolio",
    workType: "Event-based/Freelance/Part-time",
    location: "Various event locations",
    trustPhrase: "Premier bridal makeup team with 100+ weddings 💍",
    urgencyIndicator: "Wedding season approaching - Book now",
    specialPerks: ["High event pay", "Bridal specialty", "Creative freedom"]
  },

  // SPA INDUSTRY
  spa: {
    title: "Spa Therapist - Luxury Wellness Experience 🧘‍♀️",
    shortDescription: "Luxury spa seeks multi-skilled therapist. Wellness focus, premium clients, serene environment 🌸",
    longDescription: `🌺 Create transformative wellness experiences! Our luxury spa is expanding our team of skilled therapists who are passionate about holistic wellness.

Our spa offers:
• Full-service luxury spa treatments
• Premium clientele who value quality service
• Serene, healing work environment
• Latest spa equipment and organic products
• Comprehensive training and development
• Weekly pay with excellent tips 💰

Ideal for therapists skilled in multiple modalities who want to work in a high-end environment focused on true wellness and relaxation. We support your professional growth.

Spa Cao Cấp - Luxury Wellness Experience ✨`,
    requirements: [
      "Relevant licenses (massage, esthetics, or cosmetology)",
      "Multi-skilled in various spa treatments",
      "Holistic wellness philosophy and approach",
      "Excellent communication and service skills",
      "Professional appearance and calming presence"
    ],
    benefits: [
      "Luxury spa environment",
      "Weekly pay + tips 💰",
      "Premium client base",
      "Comprehensive benefits package",
      "Continuing education support",
      "Employee spa privileges",
      "Wellness-focused culture ✨"
    ],
    salaryRange: "$22-35/hour + tips + benefits",
    experienceLevel: "Multi-skilled spa therapist",
    workType: "Full-time with benefits",
    location: "Luxury spa resort setting",
    trustPhrase: "Award-winning luxury spa destination 🏆",
    urgencyIndicator: "Spa expansion - Multiple therapy positions",
    specialPerks: ["Luxury environment", "Multi-service", "Premium benefits"]
  },

  // PIERCING SPECIALIST
  piercing: {
    title: "Professional Piercer - Body Art Studio 💎",
    shortDescription: "Established studio seeks experienced piercer. Safety-focused, artistic environment, great clientele ⚡",
    longDescription: `⚡ Join our respected body art team! We're looking for a professional piercer who prioritizes safety, artistry, and exceptional client experiences.

Our studio features:
• Strict safety protocols and sterile environment
• High-quality jewelry and piercing equipment
• Diverse, artistic clientele of all ages
• Supportive team of experienced artists
• Weekly pay with strong earning potential 💰
• Flexible scheduling options

Perfect for piercers who take pride in their craft, maintain highest safety standards, and enjoy working with clients to achieve their body art goals. Experience and portfolio required.

Xỏ Lỗ Chuyên Nghiệp - Safety First, Art Always ✨`,
    requirements: [
      "Professional piercing training and certification",
      "Bloodborne pathogen certification required",
      "Portfolio demonstrating various piercing techniques",
      "Knowledge of anatomy and safety protocols",
      "Professional demeanor and artistic eye"
    ],
    benefits: [
      "High-quality studio environment",
      "Weekly pay + tips 💰",
      "Artistic freedom and creativity",
      "Safety-focused protocols",
      "Diverse, loyal clientele",
      "Flexible scheduling",
      "Continuing education support ✨"
    ],
    salaryRange: "$25-40/hour + tips",
    experienceLevel: "Certified professional piercer",
    workType: "Full-time/Part-time",
    location: "Established body art studio",
    trustPhrase: "Respected studio with 8+ years safety record 🛡️",
    urgencyIndicator: "Growing demand - Experienced piercers needed",
    specialPerks: ["Safety focus", "Artistic environment", "High-quality equipment"]
  },

  // MICROBLADING SPECIALIST
  microblading: {
    title: "Microblading Artist - Brow Specialist 🎨",
    shortDescription: "Premium brow studio seeks certified microblading artist. High-end clients, artistic precision ✨",
    longDescription: `🎨 Master the art of perfect brows! We're seeking a skilled microblading artist to join our specialized brow studio team.

Our studio specializes in:
• Microblading, powder brows, and combination techniques
• High-end clientele who invest in quality work
• Artistic precision and natural-looking results
• State-of-the-art equipment and premium pigments
• Ongoing training in latest brow techniques
• Weekly pay with excellent earning potential 💰

Perfect for artists who have mastered the microblading craft and want to work with clients who appreciate and pay for quality. Portfolio and certification required.

Phun Xăm Chân Mày Chuyên Nghiệp - Brow Artistry Expert 🖌️`,
    requirements: [
      "Certified microblading training and portfolio",
      "Knowledge of face mapping and brow design",
      "Steady hands and artistic precision",
      "Understanding of skin types and healing process",
      "Professional consultation and aftercare skills"
    ],
    benefits: [
      "High service pricing - Premium clients",
      "Weekly pay + tips 💰",
      "Specialized brow focus",
      "Advanced training opportunities",
      "Artistic creative freedom",
      "Repeat client base",
      "Professional studio environment ✨"
    ],
    salaryRange: "$35-60/hour + tips",
    experienceLevel: "Certified microblading artist with portfolio",
    workType: "Full-time/Part-time/Commission",
    location: "Premium brow studio",
    trustPhrase: "Leading brow studio with celebrity clientele 🌟",
    urgencyIndicator: "High brow demand - Certified artists needed",
    specialPerks: ["Premium pricing", "Brow specialization", "Celebrity clientele"]
  }
};

/**
 * UTILITY FUNCTIONS FOR PREFILL DATA ACCESS
 * These functions are ready for instant connection to the job form
 */

/**
 * Get prefill data for a specific beauty industry
 * @param industry - Industry identifier (e.g., 'nails', 'hair', 'lashes')
 * @returns Complete prefill data object ready for form initialization
 */
export function getPrefillForIndustry(industry: string): JobPrefillData | null {
  const normalizedIndustry = industry.toLowerCase().trim();
  
  // Direct industry match
  if (BEAUTY_INDUSTRY_PREFILLS[normalizedIndustry]) {
    return BEAUTY_INDUSTRY_PREFILLS[normalizedIndustry];
  }
  
  // Fuzzy matching for common variations
  const industryMappings: Record<string, string> = {
    'nail': 'nails',
    'nail-tech': 'nails',
    'nail-technician': 'nails',
    'manicure': 'nails',
    'pedicure': 'nails',
    'hair-stylist': 'hair',
    'hairstylist': 'hair',
    'colorist': 'hair',
    'lash-artist': 'lashes',
    'lash-tech': 'lashes',
    'eyelash': 'lashes',
    'skin-care': 'esthetician',
    'skincare': 'esthetician',
    'facial': 'esthetician',
    'massage-therapist': 'massage',
    'lmt': 'massage',
    'bodywork': 'massage',
    'barber-shop': 'barber',
    'mens-grooming': 'barber',
    'makeup-artist': 'makeup',
    'mua': 'makeup',
    'bridal-makeup': 'makeup',
    'spa-therapist': 'spa',
    'wellness': 'spa',
    'body-piercing': 'piercing',
    'piercer': 'piercing',
    'brow-artist': 'microblading',
    'microblading-artist': 'microblading',
    'permanent-makeup': 'microblading'
  };
  
  const mappedIndustry = industryMappings[normalizedIndustry];
  if (mappedIndustry && BEAUTY_INDUSTRY_PREFILLS[mappedIndustry]) {
    return BEAUTY_INDUSTRY_PREFILLS[mappedIndustry];
  }
  
  // Return null if no match found
  return null;
}

/**
 * Get all available industry prefill options
 * @returns Array of industry keys that have prefill data available
 */
export function getAvailableIndustries(): string[] {
  return Object.keys(BEAUTY_INDUSTRY_PREFILLS);
}

/**
 * Get prefill data by template selection (backwards compatibility)
 * @param templateId - Template ID from ConsolidatedJobTemplateSelector
 * @returns Prefill data for the selected template industry
 */
export function getJobPrefillByIndustry(templateId: string): JobPrefillData | null {
  // This function maintains compatibility with existing template selector integration
  return getPrefillForIndustry(templateId);
}

/**
 * Validate prefill data structure
 * @param data - Prefill data to validate
 * @returns Boolean indicating if data structure is valid
 */
export function validatePrefillData(data: any): data is JobPrefillData {
  return (
    data &&
    typeof data.title === 'string' &&
    typeof data.shortDescription === 'string' &&
    typeof data.longDescription === 'string' &&
    Array.isArray(data.requirements) &&
    Array.isArray(data.benefits) &&
    typeof data.salaryRange === 'string' &&
    typeof data.experienceLevel === 'string' &&
    typeof data.workType === 'string' &&
    typeof data.location === 'string' &&
    typeof data.trustPhrase === 'string'
  );
}

/**
 * READY FOR FUTURE CONNECTION
 * 
 * Once EnhancedJobForm accepts initialValues prop, connect like this:
 * 
 * // In enhanced-post-job.tsx or similar
 * const prefillData = getPrefillForIndustry(selectedTemplate.id);
 * 
 * return (
 *   <EnhancedJobForm 
 *     initialValues={{
 *       title: prefillData?.title || '',
 *       description: prefillData?.longDescription || '',
 *       requirements: prefillData?.requirements?.join('\n') || '',
 *       // ... other fields
 *     }}
 *   />
 * );
 */

export default {
  getPrefillForIndustry,
  getAvailableIndustries,
  getJobPrefillByIndustry,
  validatePrefillData,
  BEAUTY_INDUSTRY_PREFILLS
};
