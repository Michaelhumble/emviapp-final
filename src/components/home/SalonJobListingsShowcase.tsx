
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MapPin, Users, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';

const featuredJobs: Job[] = [
  {
    id: "featured-1",
    title: "Nail Technician - Vietnamese Speaking",
    company: "Golden Nails Spa",
    location: "Houston, TX",
    description: "Seeking experienced nail technician fluent in Vietnamese and English. Full-time position with benefits.",
    vietnamese_description: "Cần thợ nails biết làm bột và chân tay nước, full-time có benefits.",
    contact_info: {
      phone: "(713) 555-0123"
    },
    weekly_pay: true,
    has_housing: true,
    created_at: "2024-01-15T10:00:00Z",
    category: "Nail Tech"
  },
  {
    id: "featured-2",
    title: "Nail Salon For Sale - Established Business",
    company: "Luxury Nail Studio",
    location: "Los Angeles, CA",
    description: "Profitable nail salon in prime location. 8 stations, established clientele, modern equipment included.",
    vietnamese_description: "Sang tiệm nail có 8 ghế, khách quen, thiết bị mới.",
    for_sale: true,
    contact_info: {
      phone: "(213) 555-0456"
    },
    created_at: "2024-01-14T14:30:00Z",
    category: "Nail Tech"
  },
  {
    id: "featured-3",
    title: "Hair Stylist Position Available",
    company: "Trendy Hair Salon",
    location: "Miami, FL",
    description: "Creative hair stylist wanted for busy salon. Color and cut experience required. Great tips!",
    weekly_pay: true,
    has_housing: true,
    contact_info: {
      phone: "(305) 555-0789"
    },
    specialties: ["Hair coloring", "Cutting", "Styling"],
    created_at: "2024-01-13T09:15:00Z",
    category: "Hair Stylist"
  },
  {
    id: "featured-4",
    title: "Lash Technician Needed",
    company: "Bella Lashes Studio",
    location: "New York, NY",
    description: "Experienced lash extension specialist needed. Volume and classic lash certification required.",
    contact_info: {
      owner_name: "Maria",
      phone: "(212) 555-0234"
    },
    created_at: "2024-01-12T16:45:00Z",
    category: "Lash Tech"
  },
  {
    id: "featured-5",
    title: "Barber Position - Traditional Shop",
    company: "Classic Cuts Barbershop",
    location: "Chicago, IL",
    description: "Traditional barber shop seeking skilled barber. Straight razor experience preferred. Great atmosphere!",
    vietnamese_description: "Cần thợ cắt tóc nam có kinh nghiệm, tiệm truyền thống.",
    contact_info: {
      owner_name: "Tony",
      phone: "(312) 555-0567"
    },
    specialties: ["Traditional cuts", "Straight razor", "Beard trim"],
    created_at: "2024-01-11T11:20:00Z",
    category: "Barber"
  },
  {
    id: "featured-6",
    title: "Spa Business For Sale",
    company: "Serenity Day Spa",
    location: "San Francisco, CA",
    description: "Full-service day spa for sale. Includes massage rooms, established clientele, prime location.",
    vietnamese_description: "Sang tiệm spa đầy đủ dịch vụ, có khách quen, vị trí đẹp.",
    for_sale: true,
    asking_price: "$180,000",
    contact_info: {
      owner_name: "Susan",
      phone: "(415) 555-0890"
    },
    created_at: "2024-01-10T13:00:00Z",
    category: "Spa"
  },
  {
    id: "featured-7",
    title: "Esthetician Wanted",
    company: "Glow Skincare Studio",
    location: "Seattle, WA",
    description: "Licensed esthetician needed for upscale skincare studio. Facial and acne treatment experience preferred.",
    specialties: ["Facials", "Acne treatment", "Chemical peels"],
    contact_info: {
      phone: "(206) 555-1234"
    },
    created_at: "2024-01-09T10:30:00Z",
    category: "Esthetician"
  },
  {
    id: "featured-8",
    title: "Makeup Artist Position",
    company: "Glamour Beauty Bar",
    location: "Las Vegas, NV",
    description: "Professional makeup artist for bridal and special events. Portfolio required. High-end clientele.",
    has_housing: true,
    contact_info: {
      owner_name: "Jessica",
      phone: "(702) 555-5678"
    },
    created_at: "2024-01-08T15:45:00Z",
    category: "Makeup"
  },
  {
    id: "featured-9",
    title: "Tattoo Artist Booth Rental",
    company: "Ink Masters Studio",
    location: "Austin, TX",
    description: "Professional tattoo booth available for rent. Established studio with great reputation and foot traffic.",
    weekly_pay: true,
    contact_info: {
      owner_name: "Mike",
      phone: "(512) 555-9012"
    },
    created_at: "2024-01-07T12:15:00Z",
    category: "Tattoo"
  },
  {
    id: "featured-10",
    title: "Nail Salon Partnership",
    company: "Diamond Nail Lounge",
    location: "Phoenix, AZ",
    description: "Seeking business partner for expanding nail salon. Established location with growth potential.",
    for_sale: true,
    contact_info: {
      owner_name: "Lisa",
      phone: "(602) 555-3456"
    },
    created_at: "2024-01-06T09:00:00Z",
    category: "Nail Tech"
  },
  {
    id: "featured-11",
    title: "Hair Salon Manager Position",
    company: "Elite Hair Studios",
    location: "Denver, CO",
    description: "Experienced salon manager needed for busy hair salon. Leadership and customer service skills required.",
    contact_info: {
      owner_name: "Robert",
      phone: "(303) 555-7890"
    },
    created_at: "2024-01-05T14:20:00Z",
    category: "Hair Stylist"
  },
  {
    id: "featured-12",
    title: "Lash Extension Training Available",
    company: "Pro Lash Academy",
    location: "Orlando, FL",
    description: "Professional lash extension training and certification. Small class sizes, hands-on experience.",
    weekly_pay: true,
    contact_info: {
      phone: "(407) 555-2468"
    },
    created_at: "2024-01-04T11:00:00Z",
    category: "Lash Tech"
  },
  {
    id: "featured-13",
    title: "Barber Shop For Sale",
    company: "Old School Barber Shop",
    location: "Portland, OR",
    description: "Traditional barber shop for sale. Loyal customer base, vintage equipment, prime downtown location.",
    specialties: ["Traditional barbering", "Established clientele"],
    contact_info: {
      phone: "(503) 555-1357"
    },
    created_at: "2024-01-03T16:30:00Z",
    category: "Barber"
  },
  {
    id: "featured-14",
    title: "Spa Receptionist Needed",
    company: "Tranquil Waters Spa",
    location: "Nashville, TN",
    description: "Front desk receptionist for luxury spa. Customer service experience required. Relaxing work environment.",
    for_sale: true,
    contact_info: {},
    created_at: "2024-01-02T08:45:00Z",
    category: "Spa"
  },
  {
    id: "featured-15",
    title: "Mobile Makeup Artist",
    company: "Beauty On-The-Go",
    location: "Atlanta, GA",
    description: "Mobile makeup artist for weddings and special events. Must have own transportation and kit.",
    contact_info: {
      owner_name: "Ashley",
      phone: "(404) 555-9876"
    },
    created_at: "2024-01-01T13:15:00Z",
    category: "Makeup"
  }
];

export default function SalonJobListingsShowcase() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">Featured Beauty Industry Jobs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the latest job opportunities from nail salons, hair studios, spas, and beauty businesses across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredJobs.slice(0, 9).map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {job.category}
                  </Badge>
                  {job.for_sale && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      For Sale
                    </Badge>
                  )}
                  {job.weekly_pay && (
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      Weekly Pay
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{job.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{job.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {job.description}
                </p>
                
                {job.vietnamese_description && (
                  <p className="text-gray-500 text-xs mb-4 italic line-clamp-2">
                    {job.vietnamese_description}
                  </p>
                )}
                
                {job.specialties && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {job.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {job.asking_price && (
                  <div className="text-lg font-bold text-green-600 mb-4">
                    {job.asking_price}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  {job.contact_info?.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{job.contact_info.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex gap-1">
                    {job.has_housing && (
                      <Badge variant="outline" className="text-xs">Housing</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/jobs">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
              <Users className="mr-2 h-4 w-4" />
              View All Job Listings
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
