
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Service } from "@/pages/a/artist-profile/types";

interface ServicesSectionProps {
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  if (!services || services.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    
    return `${hours} hr ${remainingMinutes} min`;
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-serif font-semibold mb-4">Services</h2>
      
      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-medium">{service.title}</h3>
                  <span className="text-lg font-bold">{formatPrice(service.price)}</span>
                </div>
                
                {service.duration_minutes > 0 && (
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{formatDuration(service.duration_minutes)}</span>
                  </div>
                )}
              </div>
              
              {service.description && (
                <div className="p-4 bg-muted/10">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
