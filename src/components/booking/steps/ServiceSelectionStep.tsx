import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import { Service } from '@/lib/booking/types';
import { cn } from '@/lib/utils';

interface ServiceSelectionStepProps {
  services: Service[];
  selectedService?: Service;
  onServiceSelect: (service: Service) => void;
  onNext: () => void;
}

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  services,
  selectedService,
  onServiceSelect,
  onNext
}) => {
  const activeServices = services.filter(s => s.is_active);

  if (activeServices.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Services Available</h3>
          <p className="text-sm">
            This artist hasn't set up any services yet.
          </p>
        </div>
      </div>
    );
  }

  const getLocationIcon = (locationType: string) => {
    switch (locationType) {
      case 'in_person':
        return '📍';
      case 'remote':
        return '💻';
      case 'both':
        return '🌐';
      default:
        return '📍';
    }
  };

  const getLocationText = (locationType: string) => {
    switch (locationType) {
      case 'in_person':
        return 'In-person';
      case 'remote':
        return 'Remote';
      case 'both':
        return 'In-person or Remote';
      default:
        return 'In-person';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-2">Select a Service</h3>
        <p className="text-sm text-muted-foreground">
          Choose the service you'd like to book
        </p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeServices.map((service) => (
          <Card
            key={service.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedService?.id === service.id && "ring-2 ring-primary bg-primary/5"
            )}
            onClick={() => onServiceSelect(service)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{service.name}</h4>
                  {service.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                </div>
                {service.price && (
                  <Badge variant="secondary" className="ml-3 font-semibold">
                    ${service.price}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration_minutes} min</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-base leading-none">
                    {getLocationIcon(service.location_type)}
                  </span>
                  <span>{getLocationText(service.location_type)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={onNext}
          disabled={!selectedService}
          className="min-w-24"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};