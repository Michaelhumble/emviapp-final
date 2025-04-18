// If this file doesn't exist yet, create an empty array with the right type
// Otherwise just fix the established properties to be strings instead of numbers
// and ensure the socialMedia properties align with the expanded type

// Sample implementation (the actual implementation will depend on what's in your file)
import { Salon } from '@/types/salon';

export const sampleSalons: Salon[] = [
  {
    id: '1',
    salon_name: 'Glamour Nails & Spa',
    created_at: '2023-01-15T08:00:00Z',
    name: 'Glamour Nails & Spa',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60',
    logo: 'https://via.placeholder.com/64x64?text=G',
    rating: 4.8,
    reviewCount: 124,
    city: 'Los Angeles',
    neighborhood: 'Beverly Hills',
    isHiring: true,
    specialty: 'Luxury Manicures & Pedicures',
    featured: true,
    bio: 'Premier nail salon offering exceptional services with the highest quality products.',
    shortBio: 'Luxury nail services in the heart of Beverly Hills',
    services: ['Gel Manicures', 'Spa Pedicures', 'Nail Art', 'Acrylics', 'Dipping Powder'],
    established: '2015', // Fixed to be string instead of number
    email: 'info@glamournails.com',
    bookingLink: '/book/glamour-nails',
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM'
    },
    amenities: ['Free WiFi', 'Complimentary Beverages', 'Massage Chairs'],
    paymentMethods: ['Credit Card', 'Cash', 'Venmo', 'Apple Pay'],
    beforeAfterGallery: [
      'https://images.unsplash.com/photo-1604902396830-aca29e19b2b9?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1604902396830-aca29e19b2b9?auto=format&fit=crop&w=800&q=60'
    ],
    socialMedia: {
      instagram: 'glamour_nails',
      facebook: 'GlamourNailsLA',
      tiktok: 'glamournails'
    }
  },
  // Add more sample salons as needed or the rest of your existing salons
  // with established as string and socialMedia properties matching the type
];

// Export default if needed
export default sampleSalons;
