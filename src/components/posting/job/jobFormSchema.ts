
import { z } from 'zod';

// Job types options
export const JOB_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
];

// Yes ladder options
export const YES_LADDER_OPTIONS = [
  { value: 'weekly_pay', label: '✅ "We pay weekly — artists appreciate fast pay"' },
  { value: 'lunch', label: '✅ "We provide lunch on busy days"' },
  { value: 'products', label: '✅ "We use the latest Dip/Gel/Acrylic products"' },
  { value: 'flexible', label: '✅ "We\'re flexible with days off or vacation"' },
  { value: 'growth', label: '✅ "We give everyone a chance to grow and be seen"' },
  { value: 'bonus', label: '✅ "We offer bonuses for great customer reviews"' },
];

// Polish themes
export const POLISH_THEMES = [
  { id: 'professional', label: 'Professional & Clear' },
  { id: 'warm', label: 'Warm & Friendly' },
  { id: 'energetic', label: 'High-Energy Hustle' },
  { id: 'luxury', label: 'Luxury & Premium' },
  { id: 'concise', label: 'Short & Sweet' },
  { id: 'growth', label: 'Growth-Oriented' },
  { id: 'flexible', label: 'Flexible & Chill' },
  { id: 'boss', label: 'Boss Vibes Only' },
  { id: 'artistic', label: 'Artistic & Expressive' },
  { id: 'direct', label: 'Straight to the Point' },
];

// Job templates
export const jobTemplates = [
  {
    id: 'nail-salon',
    label: 'Nail Salon Hiring',
    title: 'Nail Technician Needed',
    description: 'We are looking for an experienced nail technician to join our team. The ideal candidate will have experience with acrylics, gel, and regular manicures and pedicures. Must be able to work in a fast-paced environment with attention to detail.',
    summary: 'Nail tech position with competitive pay and benefits'
  },
  {
    id: 'hair-stylist',
    label: 'Hair Stylist Needed',
    title: 'Hair Stylist Position Available',
    description: 'Join our salon as a professional hair stylist! We\'re seeking someone skilled in cutting, coloring, and styling who can provide excellent service to our clients. Experience with various hair types and current trends is a plus.',
    summary: 'Hair stylist role for busy and growing salon'
  },
  {
    id: 'massage-therapist',
    label: 'Massage Therapist Opportunity',
    title: 'Licensed Massage Therapist Wanted',
    description: 'We are expanding our spa team and looking for licensed massage therapists. Must be certified and have experience in various massage techniques including deep tissue, Swedish, and hot stone. Professional demeanor and ability to make clients comfortable is essential.',
    summary: 'Massage therapy position with flexible scheduling'
  },
  {
    id: 'tattoo-artist',
    label: 'Tattoo Shop Job',
    title: 'Tattoo Artist Position',
    description: 'Creative tattoo artist wanted for established shop. Must have a solid portfolio demonstrating your skills and style. We\'re looking for someone who is detail-oriented, can work in various styles, and provides excellent customer service.',
    summary: 'Tattoo artist opening at reputable studio'
  },
  {
    id: 'lash-artist',
    label: 'Lash Artist Wanted',
    title: 'Lash Technician Position',
    description: 'Seeking an experienced lash artist skilled in classic, hybrid, and volume techniques. Must have certification and be able to provide natural-looking, long-lasting extensions. Attention to detail and a gentle touch are essential.',
    summary: 'Lash extension specialist for upscale beauty bar'
  },
  {
    id: 'barber',
    label: 'Barber Chair Opening',
    title: 'Barber Position Available',
    description: 'Looking for a skilled barber to join our team. Experience with modern cutting techniques, fades, beard grooming, and straight razor shaves required. Must be professional and able to build a loyal client base.',
    summary: 'Barber position with existing clientele opportunity'
  },
  {
    id: 'skincare',
    label: 'Skin Care / Facial Technician',
    title: 'Esthetician Needed',
    description: 'We are seeking a licensed esthetician to join our spa team. Must be knowledgeable in facial treatments, skin analysis, and product recommendations. Experience with chemical peels, microdermabrasion, and other advanced treatments is a plus.',
    summary: 'Esthetician role at growing skincare studio'
  },
  {
    id: 'beauty-supply',
    label: 'Beauty Supply Hiring',
    title: 'Beauty Supply Store Associate',
    description: 'Beauty supply store seeking knowledgeable sales associate. Must have excellent customer service skills and knowledge of hair and beauty products. Responsibilities include assisting customers, managing inventory, and maintaining store appearance.',
    summary: 'Beauty retail position with product knowledge requirements'
  },
  {
    id: 'makeup-artist',
    label: 'Freelance Makeup Gig',
    title: 'Makeup Artist Position',
    description: 'Seeking talented makeup artist for bridal, special event, and photoshoot work. Must have a diverse portfolio showing various styles and techniques. Kit should include high-quality products suitable for all skin types and tones.',
    summary: 'Makeup artist for events and special occasions'
  }
];

// Form validation schema
export const jobFormSchema = z.object({
  title: z.string().min(3, { message: "Job title must be at least 3 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(3, { message: "Location is required" }),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary']),
  salary: z.string().optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(7, { message: "Please enter a valid phone number" }),
  jobSummary: z.string().optional(),
  heartfeltMessage: z.string().optional(),
  isUrgent: z.boolean().default(false),
  yesLadderOptions: z.array(z.string()).default([]),
  template: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
});
