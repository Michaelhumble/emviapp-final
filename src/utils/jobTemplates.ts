
import { JobFormValues } from '@/components/posting/job/jobFormSchema';

// Industry-specific job templates
export const jobTemplates: Record<string, Partial<JobFormValues>> = {
  nails: {
    title: "Nail Technician – Full Time",
    jobType: "full-time",
    location: "San Jose, CA",
    salary: "Up to $1,200/week",
    jobSummary: "Looking for a friendly, reliable nail tech with experience in dip, gel, and design. Great team, busy salon, weekly pay.",
    description: "We are seeking an experienced Nail Technician to join our busy salon in San Jose. The ideal candidate will have at least 2 years of experience with acrylics, gel, dip powder, and nail art design. You'll work in a clean, modern environment with a loyal client base.\n\nSkills Required:\n- Acrylics, gel, and dip powder application\n- Basic to advanced nail art and design\n- Professional customer service\n- Ability to work efficiently while maintaining quality\n\nWe provide a supportive team environment, on-the-job training for new techniques, and consistent clientele. Our technicians typically earn $800-1,200 weekly depending on experience and client retention.",
    heartfeltMessage: "Our salon started as a family business, and we still treat our team members like family. Many of our staff have been with us for 5+ years because we believe in creating a supportive environment where everyone can thrive."
  },
  hair: {
    title: "Hair Stylist Needed",
    jobType: "full-time",
    location: "",
    salary: "Competitive pay + tips",
    jobSummary: "Seeking experienced hair stylist with client following preferred. Friendly team environment with growth opportunities.",
    description: "Join our talented team of hair stylists at our full-service salon! We're looking for a passionate hair stylist with a strong technical background in cutting, coloring, and styling. Ideal candidates will have 1+ years of salon experience and a portfolio demonstrating their skills.\n\nResponsibilities:\n- Consult with clients to understand their hair goals\n- Perform cuts, colors, treatments, and styling\n- Recommend appropriate hair care products\n- Maintain a clean station and follow safety protocols\n\nBenefits:\n- Flexible scheduling options\n- Ongoing education and training opportunities\n- Commission-based compensation\n- Retail commission bonuses\n- Supportive, collaborative team",
    heartfeltMessage: "We pride ourselves on creating a drama-free workspace where stylists can focus on their craft and build meaningful connections with clients. Your growth and wellbeing matter to us."
  },
  barber: {
    title: "Barber Wanted - Great Location",
    jobType: "full-time",
    location: "",
    salary: "Up to 70% commission",
    jobSummary: "Looking for skilled barber to join our busy shop. Experience with fades, designs, and beard work required. Walk-in clients available daily.",
    description: "Our established barbershop is seeking a skilled barber to join our team. You'll be working in a modern, well-equipped shop with a steady flow of loyal clients and new walk-ins daily.\n\nIdeal candidates should have:\n- Minimum 1 year professional barbering experience\n- Excellence in fades, tapers, and traditional cuts\n- Clean lineup and beard trimming skills\n- Basic hair design capabilities\n- Professional, friendly attitude\n\nWe offer a competitive commission structure (60-70% based on experience), with our barbers typically taking home $1,000-1,500+ weekly. Booth rental options available for experienced barbers with an existing clientele.",
    heartfeltMessage: "Our shop isn't just a place to get haircuts - it's a community hub where clients come for the experience as much as the service. We support each other, share techniques, and push each other to grow as professionals."
  },
  eyebrowLash: {
    title: "Lash Tech Needed - Home-Based Studio",
    jobType: "part-time",
    location: "",
    salary: "Base + Commission",
    jobSummary: "Seeking certified lash technician with experience in volume and classic lashes. Professional environment with loyal clientele.",
    description: "We're expanding our home-based beauty studio and looking for a certified lash technician to join our team. This position is perfect for someone who values a calm, intimate work environment while still maintaining professional standards.\n\nQualifications:\n- Lash certification required\n- Experience with classic and volume lash applications\n- Knowledge of proper sanitation and safety protocols\n- Excellent attention to detail\n- Great time management skills\n\nThis position offers flexible hours (part-time to full-time available), a comfortable work environment, and competitive compensation. Our clients are loyal and appointments book consistently, giving you steady income potential.",
    heartfeltMessage: "We've created a peaceful, drama-free space where both technicians and clients feel relaxed and comfortable. We believe in quality over quantity and take pride in offering exceptional, personalized service to every client."
  },
  tattoo: {
    title: "Tattoo Artist Position",
    jobType: "full-time",
    location: "",
    salary: "Commission-based",
    jobSummary: "Established tattoo studio looking for artists with strong portfolio. Must be reliable and have excellent customer service skills.",
    description: "Our reputable tattoo studio is looking to add a talented tattoo artist to our team. We're seeking someone with a diverse style range, professional attitude, and ability to work well with clients from concept to completion.\n\nRequirements:\n- Minimum 2+ years professional tattoo experience\n- Strong, diverse portfolio showcasing your work\n- Understanding of proper sanitation/sterilization procedures\n- Ability to create custom designs\n- Excellent customer service skills\n\nWe offer a competitive commission structure, a clean and modern workspace, and an established client base with regular walk-ins. Your success is our success, and we aim to support your growth as an artist while providing a stable income environment.",
    heartfeltMessage: "Our studio prides itself on being a respectful, creative space where artists can develop their unique style while having the stability of a professional business supporting them. We value artistic integrity as much as professional conduct."
  },
  esthetician: {
    title: "Licensed Esthetician - Luxury Spa",
    jobType: "full-time",
    location: "",
    salary: "Hourly + Commission",
    jobSummary: "Upscale spa seeking licensed esthetician for facials, waxing, and body treatments. Experience with high-end products preferred.",
    description: "Join our luxury day spa as a skilled Esthetician providing a range of treatments to our discerning clientele. We're seeking someone with excellent technique, product knowledge, and a commitment to delivering exceptional service in a serene environment.\n\nResponsibilities include:\n- Performing customized facial treatments\n- Body treatments and scrubs\n- Expert waxing services\n- Skin analysis and product recommendations\n- Maintaining immaculate treatment rooms\n\nQualifications:\n- Current Esthetician license required\n- Minimum 1 year experience in a spa setting\n- Knowledge of advanced skincare techniques\n- Experience with luxury product lines a plus\n\nWe offer base pay plus commission, paid training on our product lines, and benefits for full-time employees.",
    heartfeltMessage: "Our spa was founded on the belief that everyone deserves moments of true relaxation and self-care. We apply this philosophy to our team as well, fostering a supportive environment where wellness professionals can thrive."
  },
  massage: {
    title: "Licensed Massage Therapist",
    jobType: "part-time",
    location: "",
    salary: "Hourly + tips",
    jobSummary: "Looking for licensed massage therapist with experience in deep tissue and relaxation techniques. Flexible schedule available.",
    description: "We are currently seeking a Licensed Massage Therapist to join our established wellness center. This position offers a supportive work environment, dedicated client base, and opportunities for professional growth.\n\nQualifications:\n- Current massage license required\n- Proficiency in Swedish, Deep Tissue, and Sports massage\n- Additional modalities (hot stone, prenatal, etc.) a plus\n- Professional demeanor and excellent communication skills\n- Ability to customize treatments to client needs\n\nWe provide clean, well-maintained treatment rooms, quality supplies and equipment, online booking system, reception services, and marketing support. Our therapists typically earn $25-35/hour plus gratuities, with both part-time and full-time opportunities available.",
    heartfeltMessage: "We understand the physical demands of being a massage therapist. That's why we've created a sustainable environment with appropriate scheduling, adequate rest between sessions, and a team that genuinely supports one another's wellbeing."
  },
  makeup: {
    title: "Freelance Makeup Artist",
    jobType: "contract",
    location: "",
    salary: "Competitive event rates",
    jobSummary: "Seeking creative makeup artist for weddings, special events and photoshoots. Must have own kit and reliable transportation.",
    description: "Our beauty company is expanding our team of freelance makeup artists to meet growing demand for wedding and special event services. We're looking for talented artists who can create flawless, long-lasting makeup looks customized to client preferences.\n\nRequirements:\n- Professional makeup kit with quality products for diverse skin tones and types\n- Portfolio demonstrating range of makeup styles (bridal, editorial, natural, glam)\n- Excellent interpersonal skills and ability to work under time constraints\n- Reliable transportation and willingness to travel to venues\n- Weekend availability essential\n\nThis is a contract position with competitive per-event rates. Frequency of bookings depends on season, your availability, and client demand. Peak wedding season offers consistent weekend opportunities.",
    heartfeltMessage: "We believe makeup is about enhancing confidence and helping people feel their best on important days. Our artists aren't just technically skilled - they're compassionate professionals who understand the emotional significance of their work."
  },
  studioRental: {
    title: "Beauty Studio Space for Rent",
    jobType: "contract",
    location: "",
    salary: "Affordable weekly/monthly rates",
    jobSummary: "Modern, furnished studio space available for beauty professionals. Great location, utilities included, flexible terms.",
    description: "Premium beauty space available for rent in an established salon suite complex. Perfect for hair stylists, estheticians, lash techs, microblading artists, or other beauty professionals looking to run their own business without the overhead of opening a full salon.\n\nOur studio spaces include:\n- Professional styling chair and shampoo bowl (for hair stations)\n- Esthetician bed (for skincare/lash rooms)\n- Storage cabinetry and retail display space\n- Utilities included (water, electric, WiFi)\n- Secure 24/7 access\n- Common area with laundry facilities\n- Reception services available\n\nWeekly and monthly rental options with flexible terms. Build your business on your own schedule while enjoying the benefits of a professional, well-maintained environment.",
    heartfeltMessage: "We created this space because we believe talented beauty professionals deserve a place to grow their business without excessive startup costs or long-term leases. Many of our current renters started small and have grown to tremendous success - we'd love to be part of your journey too."
  }
};

// Get template merged with user information
export const getJobTemplate = (industry: string, userData?: { 
  phoneNumber?: string;
  email?: string;
}): Partial<JobFormValues> => {
  const template = jobTemplates[industry] || {};
  
  return {
    ...template,
    // Only include user contact info if available
    ...(userData?.phoneNumber ? { phoneNumber: userData.phoneNumber } : {}),
    ...(userData?.email ? { contactEmail: userData.email } : {})
  };
};
