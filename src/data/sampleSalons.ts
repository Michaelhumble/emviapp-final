
import { Salon } from "@/types/salon";

// Define salon specialty types for better organization
export type SalonSpecialty = 
  | "Nails"
  | "Hair"
  | "Barber"
  | "Spa"
  | "Lash & Brow"
  | "Waxing"
  | "Makeup"
  | "Full Service";

export const sampleSalons: Salon[] = [
  {
    id: "s1",
    name: "Luxe Nail Atelier",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Nails",
    city: "Miami, FL",
    neighborhood: "Brickell",
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    bio: "Luxe Nail Atelier brings European elegance to Miami's Brickell district. Specializing in gel extensions, intricate nail art, and luxurious spa pedicures using only premium, non-toxic products. Our talented team stays at the forefront of nail trends while maintaining impeccable sanitization standards.",
    shortBio: "European-inspired nail salon with premium, non-toxic services and innovative nail art designs.",
    rating: 4.9,
    reviewCount: 287,
    priceRange: "$$$",
    established: 2019,
    services: ["Gel Extensions", "Nail Art", "Luxury Pedicures", "Gel Polish", "French Manicure", "Nail Repair"],
    amenities: ["Complimentary Wine", "Free Wifi", "Massage Chairs", "Private Rooms Available"],
    socialMedia: {
      instagram: "@luxenailatelier",
      facebook: "luxenailatelier",
      tiktok: "@luxenailart"
    },
    bookingLink: "https://emviapp.com/book/luxenailatelier",
    isHiring: true,
    featured: true
  },
  {
    id: "s2",
    name: "Urban Edge Barbers",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Barber",
    city: "Brooklyn, NY",
    neighborhood: "Williamsburg",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 9:00 PM",
      friday: "10:00 AM - 9:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    bio: "Urban Edge Barbers fuses traditional barbering techniques with contemporary style. Our master barbers specialize in precision cuts, meticulous fades, and expert beard sculpting. The vintage-meets-modern aesthetic creates a welcoming space where clients can unwind with a complimentary bourbon while receiving top-tier grooming services.",
    shortBio: "Modern barbershop blending traditional techniques with contemporary style in a relaxed setting.",
    rating: 4.8,
    reviewCount: 342,
    priceRange: "$$",
    established: 2017,
    services: ["Classic Cuts", "Fades", "Beard Sculpting", "Hot Towel Shaves", "Hair Design", "Gray Blending"],
    amenities: ["Complimentary Drinks", "TV Screens", "Beard Products", "Online Booking"],
    socialMedia: {
      instagram: "@urbanedgebarbers",
      facebook: "urbanedgebarbers",
      tiktok: "@urbanedgebarbersnyc"
    },
    bookingLink: "https://emviapp.com/book/urbanedgebarbers",
    isHiring: true,
    featured: true
  },
  {
    id: "s3",
    name: "Serenity Day Spa",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Spa",
    city: "San Diego, CA",
    neighborhood: "La Jolla",
    hours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "9:00 AM - 6:00 PM"
    },
    bio: "Perched above La Jolla's coastline, Serenity Day Spa offers transformative wellness experiences with ocean views. Our holistic approach combines advanced skincare technology with ancient healing practices. Guests enjoy personalized treatment journeys, from rejuvenating facials to therapeutic massages, all designed to restore balance to mind, body, and spirit.",
    shortBio: "Oceanside wellness sanctuary offering holistic treatments that blend advanced techniques with natural healing.",
    rating: 4.9,
    reviewCount: 427,
    priceRange: "$$$$",
    established: 2015,
    services: ["Custom Facials", "Hot Stone Massage", "Body Treatments", "Couples Packages", "CBD Therapy", "Prenatal Massage"],
    amenities: ["Ocean View Relaxation Room", "Steam Room", "Organic Tea Bar", "Luxury Robes", "Indoor/Outdoor Treatment Spaces"],
    socialMedia: {
      instagram: "@serenitylajolla",
      facebook: "serenitydayspa",
      tiktok: "@serenityspasandiego"
    },
    bookingLink: "https://emviapp.com/book/serenitydayspa",
    isHiring: false,
    featured: true
  },
  {
    id: "s4",
    name: "Chroma Hair Studio",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Hair",
    city: "Austin, TX",
    neighborhood: "South Congress",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "12:00 PM - 5:00 PM"
    },
    bio: "Chroma Hair Studio is Austin's premier destination for color transformation and precision cutting. Our color specialists are certified in the latest techniques, from subtle balayage to vibrant fashion colors. The salon's bright, artistic space reflects our creative approach to hair design, while our commitment to sustainable practices includes eco-friendly product lines and water-saving initiatives.",
    shortBio: "Color-focused hair studio specializing in personalized transformations from subtle to vivid in a creative space.",
    rating: 4.8,
    reviewCount: 312,
    priceRange: "$$$",
    established: 2018,
    services: ["Color Correction", "Balayage", "Precision Cuts", "Fashion Colors", "Extensions", "Curly Hair Specialists"],
    amenities: ["Color Bar", "Scalp Treatments", "Sustainable Products", "Coffee & Wine Bar"],
    socialMedia: {
      instagram: "@chromahairstudio",
      facebook: "chromahair",
      tiktok: "@chromahairaustin"
    },
    bookingLink: "https://emviapp.com/book/chromahairstudio",
    isHiring: true,
    featured: false
  },
  {
    id: "s5",
    name: "Allure Lash & Brow Bar",
    image: "https://images.unsplash.com/photo-1577952178305-b13a16ff4cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1577952178305-b13a16ff4cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Lash & Brow",
    city: "Chicago, IL",
    neighborhood: "River North",
    hours: {
      monday: "11:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    bio: "Allure Lash & Brow Bar elevates eye-enhancing services to an art form. Our technicians are trained in the most advanced lash extension techniques, from natural classics to dramatic volumes. We offer custom brow solutions including microblading, lamination, and precision shaping to frame your features perfectly. Every treatment is performed in a serene, impeccably clean environment using premium products.",
    shortBio: "Specialized eye enhancement studio providing custom lash extensions and brow transformations with precision.",
    rating: 4.7,
    reviewCount: 289,
    priceRange: "$$",
    established: 2020,
    services: ["Classic Lash Extensions", "Volume Lashes", "Microblading", "Brow Lamination", "Lash Lifts", "Brow Tinting"],
    amenities: ["Heated Beds", "Essential Oil Diffusers", "Complimentary Touch-ups", "Aftercare Products"],
    socialMedia: {
      instagram: "@allurelashbrow",
      facebook: "allurelashbrowbar",
      tiktok: "@allurelashchicago"
    },
    bookingLink: "https://emviapp.com/book/allurelash",
    isHiring: true,
    featured: false
  },
  {
    id: "s6",
    name: "Phoenix Nail Lounge",
    image: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Nails",
    city: "Phoenix, AZ",
    neighborhood: "Scottsdale",
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    bio: "Phoenix Nail Lounge brings desert-inspired luxury to the nail care experience. Our airy, modern space features custom-designed pedicure thrones and manicure tables. We specialize in nail enhancements using Japanese gel techniques and intricate hand-painted nail art. All services use vegan, non-toxic products, and each tool kit is sterilized using medical-grade equipment.",
    shortBio: "Desert-luxe nail salon specializing in Japanese gel techniques and custom nail art in a modern, airy space.",
    rating: 4.8,
    reviewCount: 356,
    priceRange: "$$$",
    established: 2021,
    services: ["Japanese Gel", "Hand-Painted Nail Art", "Gel Extensions", "Luxury Pedicures", "Nail Health Treatments", "Bridal Packages"],
    amenities: ["Custom Pedicure Thrones", "Complimentary Refreshments", "Private Parties", "Organic Scrubs"],
    socialMedia: {
      instagram: "@phoenixnaillounge",
      facebook: "phoenixnaillounge",
      tiktok: "@phoenixnailart"
    },
    bookingLink: "https://emviapp.com/book/phoenixnaillounge",
    isHiring: true,
    featured: false
  },
  {
    id: "s7",
    name: "Gentleman's Quarter",
    image: "https://images.unsplash.com/photo-1634302086887-13b5158a041c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1634302086887-13b5158a041c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Barber",
    city: "Seattle, WA",
    neighborhood: "Capitol Hill",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    bio: "Gentleman's Quarter offers a refined grooming experience in Seattle's vibrant Capitol Hill. Our master barbers provide heritage techniques with modern expertise, from classic haircuts to straight razor shaves. The sophisticated space combines vintage barbering tradition with Northwest aesthetic, featuring leather chairs, wood accents, and a curated selection of men's grooming products.",
    shortBio: "Refined men's grooming destination combining classic barbering tradition with contemporary Pacific Northwest style.",
    rating: 4.9,
    reviewCount: 412,
    priceRange: "$$$",
    established: 2016,
    services: ["Classic Cuts", "Straight Razor Shaves", "Beard Trims", "Face Treatments", "Gray Blending", "Father & Son Packages"],
    amenities: ["Whiskey Bar", "Leather Lounge", "Sports TV", "Grooming Products"],
    socialMedia: {
      instagram: "@gentlemansquarter",
      facebook: "gentlemansquarter",
      tiktok: "@gentlemansquarterbarbers"
    },
    bookingLink: "https://emviapp.com/book/gentlemansquarter",
    isHiring: false,
    featured: false
  },
  {
    id: "s8",
    name: "Glow Skin Studio",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Spa",
    city: "Denver, CO",
    neighborhood: "Cherry Creek",
    hours: {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    bio: "Glow Skin Studio specializes in results-driven skincare treatments customized for Colorado's unique climate challenges. Our team of licensed estheticians combines clinical approaches with holistic care for all skin types and concerns. The minimalist, mountain-inspired space offers a tranquil setting for services ranging from advanced facials to non-invasive skin rejuvenation treatments.",
    shortBio: "Clinical skincare studio with customized treatments addressing Colorado's unique climate challenges in a tranquil setting.",
    rating: 4.7,
    reviewCount: 276,
    priceRange: "$$$",
    established: 2019,
    services: ["Custom Facials", "Chemical Peels", "Microdermabrasion", "LED Therapy", "Dermaplaning", "Oxygen Treatments"],
    amenities: ["Relaxation Lounge", "Skincare Consultations", "Mountain View Terrace", "Organic Teas"],
    socialMedia: {
      instagram: "@glowskinstudio",
      facebook: "glowskinstudio",
      tiktok: "@glowskindenver"
    },
    bookingLink: "https://emviapp.com/book/glowskinstudio",
    isHiring: true,
    featured: false
  },
  {
    id: "s9",
    name: "Mane Attraction",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Hair",
    city: "Nashville, TN",
    neighborhood: "The Gulch",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "12:00 PM - 5:00 PM"
    },
    bio: "Mane Attraction brings high-fashion hair expertise with Nashville's signature warmth. Our team excels in cutting-edge techniques like lived-in color, textured cuts, and seamless extensions. The salon's industrial-chic space features local art and often hosts live acoustic sessions. We pride ourselves on creating customized hair solutions that enhance each client's unique style and lifestyle.",
    shortBio: "Fashion-forward hair salon with Nashville soul, specializing in lived-in color and textured cuts in a music-inspired space.",
    rating: 4.8,
    reviewCount: 329,
    priceRange: "$$$",
    established: 2017,
    services: ["Lived-in Color", "Textured Cuts", "Extensions", "Bridal Styling", "Blowouts", "Hair Treatments"],
    amenities: ["Live Music Events", "Client Lounge", "Complimentary Styling Lessons", "Local Beer & Wine"],
    socialMedia: {
      instagram: "@maneattractionnash",
      facebook: "maneattractionnashville",
      tiktok: "@maneattractionnash"
    },
    bookingLink: "https://emviapp.com/book/maneattraction",
    isHiring: true,
    featured: false
  },
  {
    id: "s10",
    name: "Pristine Nails & Spa",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Nails",
    city: "Boston, MA",
    neighborhood: "Back Bay",
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    bio: "Pristine Nails & Spa elevates nail care to an art form in Boston's historic Back Bay. Our serene, light-filled space provides a peaceful retreat from the city's bustle. We're known for our meticulous attention to detail, whether creating minimalist nail designs or intricate artwork. Our sanitization protocols exceed industry standards, ensuring a safe experience with every visit.",
    shortBio: "Elegant nail sanctuary in historic Back Bay offering meticulous services from classic manicures to intricate nail art.",
    rating: 4.7,
    reviewCount: 298,
    priceRange: "$$",
    established: 2018,
    services: ["Gel Manicures", "Waterless Pedicures", "Nail Extensions", "Minimal Nail Art", "Paraffin Treatments", "Express Services"],
    amenities: ["Luxury Massage Chairs", "Seasonal Scrubs", "Complimentary Consultations", "Hand Treatments"],
    socialMedia: {
      instagram: "@pristinenailsboston",
      facebook: "pristinenailsandspa",
      tiktok: "@pristinenailsboston"
    },
    bookingLink: "https://emviapp.com/book/pristinenails",
    isHiring: false,
    featured: false
  },
  {
    id: "s11",
    name: "Salon Nouveau",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Full Service",
    city: "Portland, OR",
    neighborhood: "Pearl District",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    bio: "Salon Nouveau embodies Portland's sustainable ethos with eco-conscious beauty services. Our full-service salon uses organic, cruelty-free products in a repurposed industrial space with abundant natural light. Our stylists, estheticians, and nail technicians receive continuous education to stay at the forefront of clean beauty innovations. We're proud to be a Green Circle Certified salon, recycling 95% of our waste.",
    shortBio: "Eco-conscious full-service beauty studio with organic products and sustainable practices in a repurposed industrial space.",
    rating: 4.8,
    reviewCount: 342,
    priceRange: "$$$",
    established: 2016,
    services: ["Organic Hair Color", "Custom Cuts", "Natural Skincare", "Eco-friendly Nail Services", "Waxing", "Makeup Application"],
    amenities: ["Living Plant Wall", "Eco Lounge", "Bicycle Parking", "Refill Station for Products"],
    socialMedia: {
      instagram: "@salonnouveaupdx",
      facebook: "salonnouveauportland",
      tiktok: "@salonnouveaupdx"
    },
    bookingLink: "https://emviapp.com/book/salonnouveau",
    isHiring: true,
    featured: true
  },
  {
    id: "s12",
    name: "Classic Edge Barbers",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Barber",
    city: "Philadelphia, PA",
    neighborhood: "Fishtown",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    bio: "Classic Edge Barbers brings old-school barbering traditions to Philly's vibrant Fishtown neighborhood. Our veteran barbers deliver precision fades, traditional cuts, and hot lather shaves in a relaxed, nostalgic setting. The shop's vintage decor pays homage to Philadelphia's rich history, creating an authentic community hub where clients come for quality grooming and stay for the conversation.",
    shortBio: "Traditional barbershop honoring old-school techniques in a vintage Philly setting with modern expertise.",
    rating: 4.8,
    reviewCount: 378,
    priceRange: "$$",
    established: 2015,
    services: ["Classic Cuts", "Skin Fades", "Hot Lather Shaves", "Beard Trims", "Kid's Cuts", "Senior Specials"],
    amenities: ["Vintage Arcade Games", "Local Sports TV", "Free Beer Fridays", "Community Events"],
    socialMedia: {
      instagram: "@classicedgebarbers",
      facebook: "classicedgebarbers",
      tiktok: "@classicedgephilly"
    },
    bookingLink: "https://emviapp.com/book/classicedgebarbers",
    isHiring: true,
    featured: false
  },
  {
    id: "s13",
    name: "Zen Waxing Studio",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Waxing",
    city: "Minneapolis, MN",
    neighborhood: "North Loop",
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "Closed"
    },
    bio: "Zen Waxing Studio transforms hair removal into a comfortable, dignified experience. Our specialized technicians use a proprietary European wax formulated for sensitive skin and maximum comfort. Treatment rooms feature calming design elements and sound therapy to create a peaceful atmosphere. We pride ourselves on efficiency without sacrificing care, perfect for the Minneapolis professional on the go.",
    shortBio: "Specialized waxing studio focused on comfort and dignity with proprietary European wax and calming environment.",
    rating: 4.9,
    reviewCount: 207,
    priceRange: "$$",
    established: 2020,
    services: ["Brazilian Waxing", "Full Body Waxing", "Facial Waxing", "Sugaring", "Men's Waxing", "Pre/Post Care Treatments"],
    amenities: ["Sound Therapy", "Numbing Creams Available", "Cooling Treatments", "Minimalist Zen Design"],
    socialMedia: {
      instagram: "@zenwaxingstudio",
      facebook: "zenwaxingmn",
      tiktok: "@zenwaxingstudio"
    },
    bookingLink: "https://emviapp.com/book/zenwaxingstudio",
    isHiring: false,
    featured: false
  },
  {
    id: "s14",
    name: "Contour Beauty Bar",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Makeup",
    city: "Atlanta, GA",
    neighborhood: "Buckhead",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    bio: "Contour Beauty Bar is Atlanta's premier destination for makeup artistry and beauty education. Our team of diverse artists excels in all skin tones and textures, specializing in everything from natural everyday looks to dramatic special occasion makeup. The luxurious Buckhead studio features ring-lit stations and a photo area for capturing your finished look. We're also known for our popular makeup masterclasses.",
    shortBio: "Upscale makeup studio with diverse artists specializing in all skin tones and offering both services and education.",
    rating: 4.8,
    reviewCount: 256,
    priceRange: "$$$",
    established: 2019,
    services: ["Bridal Makeup", "Special Occasion", "Makeup Lessons", "Editorial Makeup", "Airbrush Application", "Lash Application"],
    amenities: ["Ring Light Stations", "Photography Area", "Champagne Bar", "Group Bookings"],
    socialMedia: {
      instagram: "@contourbeautybar",
      facebook: "contourbeautybar",
      tiktok: "@contourbeautyatl"
    },
    bookingLink: "https://emviapp.com/book/contourbeauty",
    isHiring: true,
    featured: false
  },
  {
    id: "s15",
    name: "Emerald Nail Boutique",
    image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Nails",
    city: "New Orleans, LA",
    neighborhood: "Garden District",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 7:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    bio: "Emerald Nail Boutique captures New Orleans' vibrant spirit in a charming Garden District cottage. Our intimate setting provides personalized attention with just six service stations. We specialize in non-toxic nail care with an emphasis on nail health and stunning designs inspired by the city's rich artistic heritage. Enjoy NOLA-inspired refreshments while our artists create your custom look.",
    shortBio: "Intimate NOLA-inspired nail boutique housed in a Garden District cottage offering non-toxic services and local refreshments.",
    rating: 4.9,
    reviewCount: 187,
    priceRange: "$$$",
    established: 2021,
    services: ["Natural Nail Care", "Gel Manicures", "NOLA-Inspired Nail Art", "Luxury Pedicures", "Nail Rehabilitation", "Bridal Parties"],
    amenities: ["Garden Patio", "Local Refreshments", "Custom Nail Colors", "Historic Setting"],
    socialMedia: {
      instagram: "@emeraldnailnola",
      facebook: "emeraldnailboutique",
      tiktok: "@emeraldnailnola"
    },
    bookingLink: "https://emviapp.com/book/emeraldnail",
    isHiring: true,
    featured: false
  },
  {
    id: "s16",
    name: "Revive Med Spa",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Spa",
    city: "San Francisco, CA",
    neighborhood: "Marina District",
    hours: {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 5:00 PM"
    },
    bio: "Revive Med Spa bridges the gap between traditional day spa relaxation and results-driven medical aesthetics. Our team of licensed medical professionals provides advanced treatments under physician supervision. The sophisticated Marina District location features treatment rooms with bay views and the latest in aesthetic technology. We develop personalized treatment plans combining both immediate results and long-term skin health strategies.",
    shortBio: "Medical spa offering advanced aesthetic treatments by licensed professionals with bay views and personalized care plans.",
    rating: 4.7,
    reviewCount: 312,
    priceRange: "$$$$",
    established: 2018,
    services: ["Medical Facials", "Laser Treatments", "Injectables", "Microneedling", "Body Contouring", "Skin Tightening"],
    amenities: ["Consultation Lounge", "Bay Views", "Medical-Grade Products", "Wellness Library"],
    socialMedia: {
      instagram: "@revivemedspa",
      facebook: "revivemedsf",
      tiktok: "@revivemedspa"
    },
    bookingLink: "https://emviapp.com/book/revivemedspa",
    isHiring: false,
    featured: false
  },
  {
    id: "s17",
    name: "Crown & Blade",
    image: "https://images.unsplash.com/photo-1596178060810-72c3df5b4cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1596178060810-72c3df5b4cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Barber",
    city: "Detroit, MI",
    neighborhood: "Corktown",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    bio: "Crown & Blade honors Detroit's working-class roots and modern renaissance through exceptional barbering. Housed in a renovated Corktown factory, the shop fuses industrial heritage with contemporary style. Our team specializes in all hair textures and techniques, from classic cuts to modern designs. Beyond haircuts, we've created a cultural hub hosting local artists, musicians, and community events.",
    shortBio: "Detroit-inspired barbershop in a renovated factory combining industrial heritage with modern technique for all hair textures.",
    rating: 4.9,
    reviewCount: 427,
    priceRange: "$$",
    established: 2017,
    services: ["Precision Cuts", "Designer Fades", "Hot Towel Shaves", "Beard Sculpting", "Hair Tattoos", "Line-ups"],
    amenities: ["Local Art Gallery", "Detroit Music", "Community Events", "Motor City Memorabilia"],
    socialMedia: {
      instagram: "@crownandbladedetroit",
      facebook: "crownandbladebarbers",
      tiktok: "@crownandbladedetroit"
    },
    bookingLink: "https://emviapp.com/book/crownblade",
    isHiring: true,
    featured: true
  },
  {
    id: "s18",
    name: "Lustre Hair Collective",
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Hair",
    city: "Salt Lake City, UT",
    neighborhood: "Sugar House",
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "Closed"
    },
    bio: "Lustre Hair Collective brings together independent stylists in a collaborative studio that encourages creativity and continued education. Our bright, mountain-modern space features individual styling stations with each artist's unique aesthetic. The collective specializes in dimensional color, textured cutting, and natural hair care, with specific expertise in curly hair treatment and outdoor lifestyle-friendly styles.",
    shortBio: "Collaborative hair studio featuring independent stylists in a mountain-modern space specializing in dimensional color and textured cutting.",
    rating: 4.8,
    reviewCount: 283,
    priceRange: "$$$",
    established: 2019,
    services: ["Dimensional Color", "Curly Hair Specialists", "Textured Cutting", "Hair Extensions", "Styling Lessons", "Bridal Services"],
    amenities: ["Mountain Views", "Outdoor Patio", "Local Product Shop", "Style Tutorials"],
    socialMedia: {
      instagram: "@lustrehair",
      facebook: "lustrehaircollective",
      tiktok: "@lustrehaircollective"
    },
    bookingLink: "https://emviapp.com/book/lustrehair",
    isHiring: true,
    featured: false
  },
  {
    id: "s19",
    name: "Velvet Lash & Brow",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Lash & Brow",
    city: "Dallas, TX",
    neighborhood: "Uptown",
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    bio: "Velvet Lash & Brow delivers precision eye enhancements in a luxurious Uptown setting. Our lash artists customize each application to complement the client's eye shape and desired look, from subtle classic lashes to dramatic volume sets. We're known for our signature 'Dallas Brow' – a perfectly sculpted, defined brow achieved through a combination of techniques. Every service takes place in private suites with adjustable beds and ambient lighting.",
    shortBio: "Luxury lash and brow studio in Uptown Dallas offering custom eye enhancements in private, comfortable suites.",
    rating: 4.8,
    reviewCount: 341,
    priceRange: "$$$",
    established: 2020,
    services: ["Classic Lash Extensions", "Volume Lashes", "Hybrid Sets", "Brow Lamination", "Brow Tinting", "Lash Lifts"],
    amenities: ["Private Suites", "Heated Beds", "Complimentary Beverages", "Lash Nap Pillows"],
    socialMedia: {
      instagram: "@velvetlashandbrow",
      facebook: "velvetlashandbrow",
      tiktok: "@velvetlashdallas"
    },
    bookingLink: "https://emviapp.com/book/velvetlash",
    isHiring: false,
    featured: false
  },
  {
    id: "s20",
    name: "Jade Nail Atelier",
    image: "https://images.unsplash.com/photo-1610992015730-2f651fcb7dea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    logo: "https://images.unsplash.com/photo-1610992015730-2f651fcb7dea?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    specialty: "Nails",
    city: "Washington, DC",
    neighborhood: "Georgetown",
    hours: {
      monday: "10:00 AM - 7:00 PM",
      tuesday: "10:00 AM - 7:00 PM",
      wednesday: "10:00 AM - 7:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    bio: "Jade Nail Atelier brings an architectural approach to nail artistry in historic Georgetown. Our minimalist space features custom-designed furniture and an open concept floor plan. We specialize in clean, geometric nail designs and impeccable execution of classic styles. Our curated service menu focuses on quality over quantity, with techniques perfected by our nail artists who train extensively before joining our team.",
    shortBio: "Architectural nail studio in Georgetown with minimalist aesthetics and precisely executed designs in a custom-designed space.",
    rating: 4.7,
    reviewCount: 267,
    priceRange: "$$$",
    established: 2019,
    services: ["Signature Manicures", "Gel Extensions", "Minimal Nail Art", "Geometric Designs", "Express Services", "Hand Treatments"],
    amenities: ["Custom-Designed Stations", "Natural Lighting", "Seasonal Tea Selection", "Design Consultations"],
    socialMedia: {
      instagram: "@jadenailatelier",
      facebook: "jadenailatelier",
      tiktok: "@jadenailsdc"
    },
    bookingLink: "https://emviapp.com/book/jadenail",
    isHiring: true,
    featured: false
  }
];

export default sampleSalons;
