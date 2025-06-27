
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MapPin, Users, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';

// Sample opportunities with proper categories
const sampleOpportunities: Job[] = [
  {
    id: "opp-1",
    title: "Nail Technician Position",
    company: "Luxury Nail Studio",
    location: "Los Angeles, CA",
    description: "Join our upscale nail studio serving celebrity clientele. Advanced nail art skills preferred.",
    specialties: ["Gel extensions", "Nail art", "Pedicures"],
    for_sale: false,
    created_at: "2024-01-15T10:00:00Z",
    type: "job",
    category: "Nail Tech",
    imageUrl: "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png"
  },
  {
    id: "opp-2", 
    title: "Hair Stylist Opportunity",
    company: "Modern Hair Collective",
    location: "New York, NY",
    description: "Creative hair stylist wanted for trendy salon in Manhattan. Color specialist preferred.",
    specialties: ["Hair coloring", "Cutting", "Styling"],
    for_sale: false,
    created_at: "2024-01-14T14:30:00Z",
    type: "job",
    category: "Hair Stylist"
  },
  {
    id: "opp-3",
    title: "Lash Extension Specialist",
    company: "Bella Lashes",
    location: "Miami, FL", 
    description: "Experienced lash technician needed for busy Miami location. Volume lash experience required.",
    specialties: ["Volume lashes", "Classic lashes", "Lash lifts"],
    for_sale: false,
    created_at: "2024-01-13T09:15:00Z",
    type: "opportunity",
    category: "Lash Tech",
    imageUrl: "/lovable-uploads/8fce2e0f-98d1-4ee6-8e30-a81575dee63a.png"
  },
  {
    id: "opp-4",
    title: "Nail Salon For Sale",
    company: "Established Nail Business",
    location: "Houston, TX",
    description: "Profitable nail salon in prime location. Established clientele and modern equipment included.",
    specialties: ["Full service salon", "Established business"],
    for_sale: true,
    asking_price: "$120,000",
    created_at: "2024-01-12T16:45:00Z",
    type: "salon",
    category: "Nail Tech"
  },
  {
    id: "opp-5",
    title: "Hair Salon Partnership",
    company: "Elite Hair Studio",
    location: "San Francisco, CA",
    description: "Seeking experienced stylist for partnership opportunity in established salon.",
    specialties: ["Partnership opportunity", "Established clientele"],
    for_sale: false,
    created_at: "2024-01-11T11:20:00Z",
    type: "salon",
    category: "Hair Stylist",
    imageUrl: "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png"
  },
  {
    id: "opp-6",
    title: "Barber Shop Opportunity",
    company: "Classic Cuts Barber Shop",
    location: "Chicago, IL",
    description: "Traditional barber shop seeking skilled barber. Straight razor experience preferred.",
    specialties: ["Traditional barbering", "Straight razor", "Beard grooming"],
    for_sale: false,
    created_at: "2024-01-10T13:00:00Z",
    type: "opportunity",
    category: "Barber",
    imageUrl: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png"
  },
  {
    id: "opp-7",
    title: "Spa Business For Sale",
    company: "Serenity Day Spa",
    location: "Phoenix, AZ",
    description: "Full-service day spa for sale. Includes massage rooms, facial equipment, and loyal client base.",
    specialties: ["Full service spa", "Massage therapy", "Facial treatments"],
    for_sale: true,
    asking_price: "$250,000",
    created_at: "2024-01-09T10:30:00Z",
    type: "opportunity",
    category: "Spa"
  },
  {
    id: "opp-8",
    title: "Esthetician Position",
    company: "Glow Skin Studio",
    location: "Seattle, WA",
    description: "Licensed esthetician wanted for upscale skincare studio. Acne treatment experience preferred.",
    specialties: ["Facials", "Acne treatment", "Chemical peels"],
    for_sale: true,
    created_at: "2024-01-08T15:45:00Z",
    type: "opportunity",
    category: "Esthetician",
    imageUrl: "/lovable-uploads/68440114-1848-438a-8b69-5667e8d9ec77.png"
  },
  {
    id: "opp-9",
    title: "Makeup Artist Role",
    company: "Glamour Beauty Studio",
    location: "Las Vegas, NV",
    description: "Professional makeup artist needed for bridal and special events. Portfolio required.",
    specialties: ["Bridal makeup", "Special events", "Airbrush makeup"],
    for_sale: false,
    created_at: "2024-01-07T12:15:00Z",
    type: "job",
    category: "Makeup",
    imageUrl: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png"
  },
  {
    id: "opp-10",
    title: "Tattoo Studio Booth Rental",
    company: "Ink Masters Studio",
    location: "Austin, TX",
    description: "Professional tattoo booth available for rent in established studio. Great location and foot traffic.",
    specialties: ["Booth rental", "Established studio", "High traffic"],
    for_sale: true,
    created_at: "2024-01-06T09:00:00Z",
    type: "opportunity",
    category: "Tattoo",
    imageUrl: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png"
  }
];

export default function LatestIndustryOpportunities() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">Latest Industry Opportunities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the newest job openings, salon partnerships, and business opportunities in the beauty industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {sampleOpportunities.slice(0, 6).map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {opportunity.imageUrl && (
                <div className="aspect-video bg-gray-100">
                  <img 
                    src={opportunity.imageUrl} 
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {opportunity.type === 'job' ? 'Job' : opportunity.type === 'salon' ? 'Salon' : 'Opportunity'}
                  </Badge>
                  {opportunity.for_sale && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      For Sale
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{opportunity.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span className="text-sm">{opportunity.company}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{opportunity.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {opportunity.description}
                </p>
                
                {opportunity.specialties && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {opportunity.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {opportunity.asking_price && (
                  <div className="text-lg font-bold text-green-600 mb-4">
                    {opportunity.asking_price}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/jobs">
            <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
              <Users className="mr-2 h-4 w-4" />
              View All Opportunities
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
