import { z } from 'zod';

// Define the basic job form schema
export const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  jobSummary: z.string().optional(),
  heartfeltMessage: z.string().optional(),
  isUrgent: z.boolean().default(false),
  // Yes ladder options
  weeklyPay: z.boolean().default(false),
  providesLunch: z.boolean().default(false),
  latestProducts: z.boolean().default(false),
  flexibleSchedule: z.boolean().default(false),
  growthOpportunities: z.boolean().default(false),
  customerReviewBonuses: z.boolean().default(false),
});

// Export the type for use in components
export type JobFormValues = z.infer<typeof jobFormSchema>;

// Template options
export const JOB_TEMPLATES = [
  { id: "nail-salon", label: "Nail Salon Hiring" },
  { id: "hair-stylist", label: "Hair Stylist Needed" },
  { id: "massage-therapist", label: "Massage Therapist Opportunity" },
  { id: "tattoo-shop", label: "Tattoo Shop Job" },
  { id: "lash-artist", label: "Lash Artist Wanted" },
  { id: "barber-chair", label: "Barber Chair Opening" },
  { id: "skin-care", label: "Skin Care / Facial Technician" },
  { id: "beauty-supply", label: "Beauty Supply Hiring" },
  { id: "freelance-makeup", label: "Freelance Makeup Gig" },
  { id: "custom", label: "Other (Custom)" }
];

// Job polish themes
export const POLISH_THEMES = [
  { id: "professional", label: "Professional & Clear", icon: "Briefcase" },
  { id: "warm", label: "Warm & Friendly", icon: "Heart" },
  { id: "energetic", label: "High-Energy Hustle", icon: "Zap" },
  { id: "luxury", label: "Luxury & Premium", icon: "Diamond" },
  { id: "concise", label: "Short & Sweet", icon: "FileText" },
  { id: "growth", label: "Growth-Oriented", icon: "TrendingUp" },
  { id: "flexible", label: "Flexible & Chill", icon: "Clock" },
  { id: "boss", label: "Boss Vibes Only", icon: "Crown" },
  { id: "artistic", label: "Artistic & Expressive", icon: "Palette" },
  { id: "direct", label: "Straight to the Point", icon: "ArrowRight" }
];

// Job types
export const JOB_TYPES = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "temporary", label: "Temporary" }
];

// Template content - Default texts for each template
export const getTemplateContent = (templateId: string) => {
  switch (templateId) {
    case "nail-salon":
      return {
        title: "Nail Technician Needed - Join Our Team",
        jobSummary: "Experienced nail tech wanted for busy salon with great culture and loyal clients",
        description: "We are looking for a skilled Nail Technician to join our growing team. The ideal candidate has at least 1-2 years of experience with acrylics, gel, and dip powder techniques. Our salon offers a supportive environment with consistent clientele and competitive compensation.\n\nResponsibilities include providing excellent nail services, maintaining a clean workspace, and creating a welcoming experience for clients. We value reliability, attention to detail, and a positive attitude.\n\nIf you're passionate about nail artistry and want to grow with a supportive team, we'd love to meet you!",
        salary: "$800-1200/week depending on experience"
      };
    case "hair-stylist":
      return {
        title: "Experienced Hair Stylist Wanted for Modern Salon",
        jobSummary: "Creative stylist needed for cutting-edge salon with established clientele",
        description: "Join our award-winning salon team as our newest Hair Stylist! We're seeking someone with a strong foundation in cutting and coloring techniques who can translate trends into wearable styles for our diverse clientele.\n\nThe ideal candidate has 2+ years of salon experience, excellent communication skills, and a portfolio that demonstrates technical skill and creativity. We provide ongoing education, a beautiful workspace, and a drama-free environment where your talent can shine.\n\nCompensation includes commission, product bonuses, and tips from our generous clientele. Full and part-time schedules available.",
        salary: "Commission-based (50-60%) with $75K-90K annual earning potential"
      };
    case "massage-therapist":
      return {
        title: "Licensed Massage Therapist Opportunity",
        jobSummary: "Join our wellness center offering holistic massage services in a calm environment",
        description: "Our established wellness center is seeking a licensed Massage Therapist to join our dedicated team. We provide a tranquil environment where you can focus on delivering exceptional therapeutic services to a loyal client base.\n\nThe ideal candidate holds current licensing, has experience in various modalities (Swedish, deep tissue, sports massage), and prioritizes client comfort and results. You'll work in a professionally designed space with all supplies provided.\n\nWe offer flexible scheduling, competitive compensation, and a supportive team atmosphere. Our therapists enjoy consistent bookings with minimal downtime between sessions.",
        salary: "$50-75/hour plus tips (averaging $70-90K annually)"
      };
    case "tattoo-shop":
      return {
        title: "Tattoo Artist Position - Established Shop",
        jobSummary: "Creative tattoo artist needed for popular studio with strong client flow",
        description: "Our well-respected tattoo studio is adding to our team of artists. We're looking for someone with a strong portfolio, excellent technical skills, and the ability to create custom designs that exceed client expectations.\n\nThe ideal candidate has 3+ years of professional experience, can work in multiple styles, and maintains the highest standards of safety and cleanliness. You should be comfortable with both flash and custom work, and have a professional attitude when working with clients.\n\nWe offer a private workstation, in-house referrals, and a drama-free environment. Our shop has a steady stream of new and returning clients, ensuring you'll stay busy and profitable.",
        salary: "60/40 split with booth rental option for experienced artists"
      };
    case "lash-artist":
      return {
        title: "Lash Artist Wanted - Full or Part Time",
        jobSummary: "Skilled lash extension specialist needed for growing beauty studio",
        description: "Join our specialized lash studio as we expand to meet increasing client demand! We're seeking a certified Lash Artist with experience in classic, hybrid, and volume techniques. The ideal candidate can create customized looks that enhance each client's natural beauty while maintaining proper application standards.\n\nYou'll work in a clean, well-equipped environment with high-quality products and tools provided. Our scheduling system ensures sufficient time between appointments, and we value quality over quantity.\n\nWe have a loyal clientele who appreciate attention to detail and are willing to pay premium prices for exceptional service. Full training on our systems and products provided.",
        salary: "Base pay + commission structure (averaging $50-70K annually)"
      };
    case "barber-chair":
      return {
        title: "Barber Wanted - Chair Available Now",
        jobSummary: "Experienced barber needed for busy shop with consistent walk-ins and appointments",
        description: "Our established barbershop is looking for a skilled barber to join our team. We have a steady stream of loyal clients plus consistent walk-in traffic in our prime location. The ideal candidate has 2+ years of experience, excellent fade techniques, and can provide straight razor shaves.\n\nWe offer a positive work culture, flexible scheduling options, and competitive compensation. Our shop is well-maintained, fully equipped, and has a strong social media presence that keeps new clients coming through the door.\n\nIf you have your own clientele, we make transitioning easy. If you're building your book, we can help with client referrals to get you established quickly.",
        salary: "Commission or chair rental available (barbers averaging $1000-1500 weekly)"
      };
    case "skin-care":
      return {
        title: "Licensed Esthetician Position Available",
        jobSummary: "Experienced esthetician needed for upscale spa offering cutting-edge treatments",
        description: "Our luxury skincare studio is seeking a licensed Esthetician to provide high-end facial treatments and skin services. The ideal candidate has thorough knowledge of skin conditions, advanced training in results-driven treatments, and excellent client communication skills.\n\nYou'll work with premium product lines in a serene, well-appointed treatment room with all necessary equipment. We focus on personalized care plans rather than pushing products, though retail commission is available.\n\nOur clients expect exceptional service and are willing to invest in their skincare. We provide ongoing education to keep your skills current with the latest techniques and technologies in the skincare industry.",
        salary: "Base wage + service commission + gratuities ($65-85K potential)"
      };
    case "beauty-supply":
      return {
        title: "Beauty Supply Store Associate Needed",
        jobSummary: "Knowledgeable beauty enthusiast wanted for customer service role in retail setting",
        description: "Our busy beauty supply store is seeking a knowledgeable, customer-focused team member who understands professional and consumer beauty products. The ideal candidate has experience with haircare, skincare, or cosmetics, and can provide helpful recommendations to both professionals and retail customers.\n\nResponsibilities include assisting customers, maintaining displays, processing transactions, and keeping the store organized. We value product knowledge, a friendly demeanor, and reliability.\n\nThis position offers stable hours, employee discounts, and opportunities for advancement for those who demonstrate leadership skills and beauty industry expertise. Both full and part-time positions available.",
        salary: "$15-18/hour plus commission on specified product lines"
      };
    case "freelance-makeup":
      return {
        title: "Freelance Makeup Artist Opportunity",
        jobSummary: "Creative makeup artist needed for special events, photo shoots and private clients",
        description: "We're expanding our beauty team and seeking a talented Makeup Artist for freelance events and client appointments. The ideal candidate has a diverse portfolio showing proficiency in bridal, special occasion, editorial, and everyday makeup looks.\n\nYou should have your own professional kit with quality products for diverse skin tones and types. Strong time management, the ability to work under pressure, and excellent interpersonal skills are essential as you'll be working directly with clients during important events.\n\nThis position offers flexible scheduling, competitive day rates, and exposure to a high-end clientele. Perfect for someone looking to supplement their existing freelance business or build their portfolio.",
        salary: "$50-125/hour depending on event type (weddings, editorial, commercial)"
      };
    default:
      return {
        title: "",
        jobSummary: "",
        description: "Describe the position, responsibilities, and ideal candidate. Include experience required, working hours, and what makes your workplace special. Be specific about what sets this opportunity apart.",
        salary: ""
      };
  }
};
