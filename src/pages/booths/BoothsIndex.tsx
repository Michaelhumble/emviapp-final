
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { MapPin, DollarSign } from 'lucide-react';
import { getAllBooths } from '@/utils/featuredContent';
import { Job } from '@/types/job';
import { isNailJob, getNailBoothImage } from '@/utils/nailSalonImages';
import { isBarberJob, getBarberBoothImage } from '@/utils/barberShopImages';

const BoothsIndex = () => {
  const [booths, setBooths] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooths = () => {
      try {
        // Use our premium booths data
        const premiumBooths = getAllBooths();
        setBooths(premiumBooths);
        setLoading(false);
      } catch (error) {
        console.error("Error loading booths:", error);
        setLoading(false);
      }
    };

    fetchBooths();
  }, []);

  // Determine if a booth is for barber services - check this first
  const isBarberBooth = (booth: Job): boolean => {
    return isBarberJob(booth.title || '', booth.description || '') || 
           (booth.specialties?.some(s => s.toLowerCase().includes('barber')) ?? false);
  };

  // Determine if a booth is for nail services - check second
  const isNailBooth = (booth: Job): boolean => {
    return isNailJob(booth.title || '', booth.description || '') || 
           (booth.specialties?.some(s => s.toLowerCase().includes('nail')) ?? false);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Booth Rentals</h1>
          <p className="text-muted-foreground mt-2">
            Find the perfect salon booth to rent for your beauty business
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {booths.map(booth => {
              // Check for barber booth first, then nail booth
              const isBarber = isBarberBooth(booth);
              const isNail = !isBarber && isNailBooth(booth);
              
              return (
                <Card key={booth.id} className="overflow-hidden h-full flex flex-col">
                  <div className="aspect-video w-full overflow-hidden">
                    {isBarber ? (
                      <ImageWithFallback
                        src={getBarberBoothImage()}
                        alt={booth.title || "Barber Booth Rental"}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        priority={true}
                      />
                    ) : isNail ? (
                      <ImageWithFallback
                        src={getNailBoothImage()}
                        alt={booth.title || "Nail Booth Rental"}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        priority={true}
                      />
                    ) : (
                      <ImageWithFallback
                        src={booth.image}
                        alt={booth.title || "Booth Rental"}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        businessName={booth.company || "Salon Booth"}
                      />
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{booth.title || "Booth Rental"}</CardTitle>
                      <Badge 
                        variant={booth.status === "active" ? "outline" : "secondary"} 
                        className={booth.status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}
                      >
                        {booth.status === "active" ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {booth.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-lg font-semibold">
                      <DollarSign className="h-5 w-5 text-primary" />
                      {booth.compensation_details || "Contact for pricing"}
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                      {booth.description?.split('\n')[0] || "Beautiful booth available in a premium salon location."}
                    </p>
                    
                    {booth.company && (
                      <div className="mt-3 flex items-center text-sm">
                        <span className="font-medium">At: </span>
                        <span className="ml-1 text-primary">{booth.company}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link to={`/booths/${booth.id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BoothsIndex;
