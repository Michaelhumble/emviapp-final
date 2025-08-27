import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Service } from '@/types/booking-enhanced';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { cn } from '@/lib/utils';

interface BookableServiceCardProps {
  service: Service;
  artistId: string;
  artistName: string;
  artistAvatar?: string;
  services: Service[];
  className?: string;
}

export const BookableServiceCard: React.FC<BookableServiceCardProps> = ({
  service,
  artistId,
  artistName,
  artistAvatar,
  services,
  className
}) => {
  const [showBookingWidget, setShowBookingWidget] = useState(false);

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
    <>
      <Card className={cn("hover:shadow-lg transition-all duration-200", className)}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              {service.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {service.description}
                </p>
              )}
            </div>
            {service.price && (
              <Badge variant="secondary" className="ml-3 text-lg font-bold">
                ${service.price}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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

          <Button
            onClick={() => setShowBookingWidget(true)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
            size="lg"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </CardContent>
      </Card>

      <BookingWidget
        isOpen={showBookingWidget}
        onOpenChange={setShowBookingWidget}
        artistId={artistId}
        artistName={artistName}
        artistAvatar={artistAvatar}
        services={services}
      />
    </>
  );
};