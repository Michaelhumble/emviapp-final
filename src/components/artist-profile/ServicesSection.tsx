
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-serif font-semibold mb-4">Services</h2>
      
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="h-full">
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg">{service.title}</h3>
                
                {service.description && (
                  <p className="text-gray-600 text-sm mt-1 mb-3">{service.description}</p>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <div className="space-y-1">
                    <div className="flex items-center text-purple-700 font-medium">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2
                      }).format(service.price)}
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatDuration(service.duration_minutes)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50 border-dashed border p-8 text-center">
          <CardContent className="p-0">
            <p className="text-gray-500">This artist hasn't added any services yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicesSection;
