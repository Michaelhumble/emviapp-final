
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface RecommendedService {
  id: string;
  title: string;
  price: number;
  artistName: string;
  artistAvatar: string;
  location: string;
  rating: number;
  specialty: string;
  isNew?: boolean;
}

const RecommendedServicesSection: React.FC = () => {
  const navigate = useNavigate();

  // Mock recommended services data
  const recommendedServices: RecommendedService[] = [
    {
      id: "1",
      title: "Luxury Gel Manicure",
      price: 45,
      artistName: "Sarah Chen",
      artistAvatar: "/lovable-uploads/0003b2e9-4b56-4284-9fd7-56772930e035.png",
      location: "Beverly Hills, CA",
      rating: 4.9,
      specialty: "Nail Art Specialist",
      isNew: true
    },
    {
      id: "2", 
      title: "Signature Facial Treatment",
      price: 120,
      artistName: "Maria Rodriguez",
      artistAvatar: "/lovable-uploads/009c07d8-9e50-4d56-86f2-3f8662606519.png",
      location: "Manhattan, NY",
      rating: 4.8,
      specialty: "Skincare Expert"
    },
    {
      id: "3",
      title: "Hair Color & Cut",
      price: 180,
      artistName: "Jessica Kim",
      artistAvatar: "/lovable-uploads/00ccb907-6755-4698-a289-71b05f7012f1.png",
      location: "West Hollywood, CA",
      rating: 4.9,
      specialty: "Color Specialist"
    }
  ];

  const handleViewService = (service: RecommendedService) => {
    navigate('/artists');
    toast.success(`Exploring ${service.title} options!`);
  };

  const handleBookService = (service: RecommendedService) => {
    navigate('/artists');
    toast.success(`Let's book your ${service.title}!`);
  };

  if (recommendedServices.length === 0) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Suggested for You
          </h2>
          <Badge variant="secondary" className="text-purple-600">Personalized</Badge>
        </div>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-8 text-center">
            <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No services available right now</h3>
            <p className="text-gray-600 mb-4">We're working on finding the perfect services for you!</p>
            <Button 
              onClick={() => navigate('/artists')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Explore Services
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Suggested for You
        </h2>
        <Badge variant="secondary" className="text-purple-600">Personalized</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedServices.map((service) => (
          <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {service.isNew && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                    New
                  </Badge>
                )}
                
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{service.location}</span>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/90 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={service.artistAvatar} 
                  alt={service.artistName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{service.artistName}</h4>
                  <p className="text-xs text-gray-500">{service.specialty}</p>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">{service.title}</h3>
              <p className="text-2xl font-bold text-purple-600 mb-4">${service.price}</p>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewService(service)}
                >
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => handleBookService(service)}
                >
                  Book
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecommendedServicesSection;
