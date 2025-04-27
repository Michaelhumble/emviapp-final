
import React, { useState, useMemo } from 'react';
import { Salon } from '@/types/salon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scissors, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SalonServiceItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  description?: string;
  isPopular?: boolean;
  isNew?: boolean;
  category?: string;
}

interface SalonServicesSectionProps {
  salon: Salon;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const SalonServicesSection: React.FC<SalonServicesSectionProps> = ({ 
  salon, 
  selectedCategory,
  onCategoryChange
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  // Mock services data (in a real app, this would come from the API)
  const services = useMemo(() => {
    return salon.services.map((service, index) => ({
      id: `service-${index}`,
      name: service,
      price: `$${Math.floor(Math.random() * 100) + 30}`,
      duration: `${Math.floor(Math.random() * 60) + 30} min`,
      description: index % 3 === 0 ? `Premium ${service} with special care and attention to detail.` : undefined,
      isPopular: index % 5 === 0,
      isNew: index % 7 === 0,
      category: ['Hair', 'Nails', 'Spa', 'Facial'][Math.floor(Math.random() * 4)]
    }));
  }, [salon.services]);
  
  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(services.map(service => service.category)));
    return uniqueCategories;
  }, [services]);
  
  // Filter services by category
  const filteredServices = selectedCategory
    ? services.filter(service => service.category === selectedCategory)
    : services;
  
  return (
    <section className="max-w-5xl mx-auto">
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2 border-b border-gray-50">
          <CardTitle className="flex items-center text-xl font-serif">
            <Scissors className="h-5 w-5 mr-2 text-purple-600" />
            Services
          </CardTitle>
          
          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(null)}
              >
                All
              </Button>
              
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => (
              <Card 
                key={service.id}
                className={`relative overflow-hidden hover:shadow-md transition-all duration-200 ${
                  expandedService === service.id ? 'border-purple-200 bg-purple-50/30' : 'border-gray-100'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-base flex items-center">
                        {service.name}
                        {service.isNew && (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">New</Badge>
                        )}
                        {service.isPopular && (
                          <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" /> {service.duration}
                      </div>
                      
                      {(expandedService === service.id && service.description) && (
                        <p className="text-sm text-gray-600 mt-3">{service.description}</p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">{service.price}</div>
                      <Button 
                        size="sm" 
                        className="mt-2"
                        onClick={() => {
                          // If service has description, toggle expand, else direct to booking
                          if (service.description) {
                            setExpandedService(expandedService === service.id ? null : service.id);
                          } else {
                            // Booking functionality would go here
                            console.log('Book service:', service.name);
                          }
                        }}
                      >
                        {service.description && expandedService !== service.id ? (
                          'Details'
                        ) : service.description && expandedService === service.id ? (
                          'Book Now'
                        ) : (
                          <>
                            Book
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SalonServicesSection;
