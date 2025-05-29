
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';

const BarberListingsSection = () => {
  const barberListings = [
    {
      id: 1,
      title: "Senior Barber - High End Salon",
      salon: "Gentleman's Cut Co.",
      location: "Beverly Hills, CA",
      salary: "$65,000 - $85,000/year",
      type: "Full-time",
      experience: "3+ years",
      rating: 4.8,
      description: "Join our premium barbershop serving Hollywood's elite. Must have classic and modern cutting skills.",
      image: "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png",
      tags: ["Premium Salon", "High Tips", "Celebrity Clients"]
    },
    {
      id: 2,
      title: "Barber Apprentice Program",
      salon: "Traditional Cuts Barbershop",
      location: "Austin, TX",
      salary: "$35,000 - $45,000/year",
      type: "Apprenticeship",
      experience: "Entry Level",
      rating: 4.6,
      description: "Learn from master barbers in our traditional shop. Full training provided.",
      image: "/lovable-uploads/513e8703-1059-4ed5-aef3-9f9b4536b69d.png",
      tags: ["Training Provided", "Growth Opportunity", "Mentorship"]
    },
    {
      id: 3,
      title: "Mobile Barber Services",
      salon: "On-Demand Cuts",
      location: "Miami, FL",
      salary: "$50 - $100/cut",
      type: "Freelance",
      experience: "2+ years",
      rating: 4.9,
      description: "Service high-end clients in their homes and offices. Flexible schedule, premium rates.",
      image: "/lovable-uploads/565dbac0-48b7-4aaf-b1ad-7c97ca38e1e9.png",
      tags: ["Flexible Schedule", "High Rates", "Premium Clients"]
    }
  ];

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">✂️ Barber Opportunities</h3>
          <p className="text-gray-600">Classic cuts, modern styles, premium positions</p>
        </div>
        <Button variant="outline" className="hidden md:flex">
          View All Barber Jobs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barberListings.map((listing) => (
          <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={listing.image} 
                    alt={listing.salon}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {listing.title}
                    </h4>
                    <p className="text-sm text-gray-600">{listing.salon}</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm ml-1">{listing.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {listing.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {listing.salary}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {listing.type} • {listing.experience}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {listing.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 md:hidden">
        <Button variant="outline">
          View All Barber Jobs
        </Button>
      </div>
    </div>
  );
};

export default BarberListingsSection;
