
/**
 * Centralized storage for Beauty Exchange images
 * Only manually uploaded images are used - NO stock photos or AI-generated images
 */

// Nail salon images uploaded by the user
export const nailSalonImages = {
  luxuryNailSalon1: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png", // Luxury salon with round gold mirrors and pink chairs
  luxuryNailSalon2: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png", // Modern minimalist salon with light blue chairs
  luxuryNailSalon3: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png", // Bright salon with gold pendant lights and reception desk
  luxuryNailSalon4: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png", // Elegant salon with gold chandeliers and marble surfaces
};

// Sample nail salon listings with paired images (preview + detail)
export const nailSalonListings = [
  {
    id: "ns-001",
    title: "Luxe Gold Nail Spa",
    description: "Premium nail salon featuring gold accents and crystal chandeliers. Full service nail care in an elegant environment.",
    category: "nails",
    location: "Beverly Hills, CA",
    photos: [
      nailSalonImages.luxuryNailSalon1, // Card preview
      nailSalonImages.luxuryNailSalon3  // Detail view
    ],
    price: "$$$",
    rating: 4.9
  },
  {
    id: "ns-002",
    title: "Serenity Nail Studio",
    description: "Modern nail studio with a minimalist aesthetic. Specializing in gel nails and artistic designs.",
    category: "nails",
    location: "Santa Monica, CA",
    photos: [
      nailSalonImages.luxuryNailSalon2, // Card preview
      nailSalonImages.luxuryNailSalon4  // Detail view
    ],
    price: "$$",
    rating: 4.8
  },
  {
    id: "ns-003",
    title: "Golden Glow Nail Boutique",
    description: "Upscale nail salon with luxurious seating and premium nail services. Specializing in bridal parties and events.",
    category: "nails",
    location: "Newport Beach, CA",
    photos: [
      nailSalonImages.luxuryNailSalon3, // Card preview
      nailSalonImages.luxuryNailSalon1  // Detail view
    ],
    price: "$$$",
    rating: 4.7
  },
  {
    id: "ns-004",
    title: "Marble & Gold Nail Lounge",
    description: "High-end nail salon with marble countertops and gold accents. Offering premium manicures, pedicures, and nail art.",
    category: "nails",
    location: "Malibu, CA",
    photos: [
      nailSalonImages.luxuryNailSalon4, // Card preview
      nailSalonImages.luxuryNailSalon2  // Detail view
    ],
    price: "$$$",
    rating: 4.9
  },
  {
    id: "ns-005",
    title: "Pink Chair Nail Studio",
    description: "Trendy nail salon with signature pink chairs and crystal chandeliers. Full nail services in a luxurious setting.",
    category: "nails",
    location: "West Hollywood, CA",
    photos: [
      nailSalonImages.luxuryNailSalon1, // Card preview
      nailSalonImages.luxuryNailSalon4  // Detail view
    ],
    price: "$$",
    rating: 4.8
  }
];

