
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, CalendarClock, DollarSign } from 'lucide-react';
import { Salon } from '@/types/salon';
import { getFeaturedSalons } from '@/utils/featuredContent';

const FeaturedSalonsShowcase: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  
  useEffect(() => {
    const featuredSalons = getFeaturedSalons(3);
    setSalons(featuredSalons);
  }, []);

  // Ensure we have a numeric value
  const formatCurrency = (value: string | number | undefined): string => {
    if (value === undefined) return '$0';
    if (typeof value === 'string') {
      // Try to parse the string as a number
      const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(parsedValue)) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(parsedValue);
      }
      return value; // Return the string as is if it can't be parsed
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">Featured Salons For Sale</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Discover premium salon opportunities in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <Card key={salon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] relative">
                <img 
                  src={salon.image || '/salon-placeholder.jpg'} 
                  alt={salon.name} 
                  className="object-cover w-full h-full"
                />
                {salon.isPremium && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-sm font-medium">
                    Premium
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{salon.name}</h3>
                
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{salon.city}, {salon.state}</span>
                </div>
                
                <div className="mb-4">
                  <div className="font-medium text-primary text-lg">
                    {formatCurrency(salon.asking_price)}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {salon.description || "Beautiful salon with great potential and loyal clientele."}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {salon.features?.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="font-normal">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Link to={`/salons/${salon.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Contact
                    </Button>
                  </Link>
                  
                  <Link to={`/salons/${salon.id}`}>
                    <Button size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/salons">
            <Button variant="outline" size="lg" className="font-medium">
              View All Salon Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSalonsShowcase;
