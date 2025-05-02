import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Users, Building, SquareDot, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Salon } from '@/types/salon';
import Layout from '@/components/layout/Layout';
import { determineSalonCategory } from '@/utils/salonImageFallbacks';

interface SalonDetailPageParams {
  salonId: string;
}

const SimpleSalonDetailPage: React.FC = () => {
  const { salonId } = useParams<SalonDetailPageParams>();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalonDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!salonId) {
          setError('Salon ID is missing.');
          return;
        }

        const response = await fetch(`/api/salons/${salonId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch salon details: ${response.status}`);
        }

        const data = await response.json();
        setSalon(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch salon details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalonDetails();
  }, [salonId]);

  if (isLoading) {
    return <Layout><div className="container mx-auto p-4">Loading salon details...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="container mx-auto p-4 text-red-500">Error: {error}</div></Layout>;
  }

  if (!salon) {
    return <Layout><div className="container mx-auto p-4">Salon not found.</div></Layout>;
  }

  const getSalonImage = () => {
    try {
      if (salon.image && typeof salon.image === 'string' && salon.image.trim() !== '') {
        return salon.image;
      }
      
      if (salon.imageUrl && typeof salon.imageUrl === 'string' && salon.imageUrl.trim() !== '') {
        return salon.imageUrl;
      }
      
      const category = salon.category || determineSalonCategory(salon.description, salon.name);
      return `/img/salon-images/${category || 'generic'}.jpg`;
    } catch (error) {
      console.error('Error getting salon image:', error);
      return '/img/salon-images/generic.jpg';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Card className="overflow-hidden">
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden">
              <ImageWithFallback
                src={getSalonImage()}
                alt={salon.name || 'Salon listing'}
                className="w-full h-full object-cover"
                businessName={salon.name || 'Salon'}
                category={salon.category}
                showPremiumBadge={salon.isPremium}
                priority={true}
              />
            </div>
            {salon.featured && (
              <Badge variant="outline" className="absolute top-2 right-2 bg-amber-50 text-amber-600 border-amber-200 uppercase text-xs">
                Featured
              </Badge>
            )}
          </div>

          <CardContent className="p-6">
            <h1 className="text-2xl font-semibold mb-4">{salon.name}</h1>
            <Tabs defaultvalue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                {salon.services && (
                  <TabsTrigger value="services">Services</TabsTrigger>
                )}
                {salon.amenities && (
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                )}
                {salon.hours && (
                  <TabsTrigger value="hours">Hours</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="details">
                <SalonDetailsContent salon={salon} />
              </TabsContent>
              {salon.services && (
                <TabsContent value="services">
                  <SalonServicesContent services={salon.services} />
                </TabsContent>
              )}
              {salon.amenities && (
                <TabsContent value="amenities">
                  <SalonAmenitiesContent amenities={salon.amenities} />
                </TabsContent>
              )}
              {salon.hours && (
                <TabsContent value="hours">
                  <SalonHoursContent hours={salon.hours} />
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

const SalonDetailsContent = ({ salon }: { salon: Salon }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Salon Details</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span>{salon.location}</span>
          </div>
          
          {salon.monthlyRent && (
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2 text-gray-500" />
              <span>Monthly Rent: ${Number(salon.monthlyRent).toLocaleString()}</span>
            </div>
          )}
          
          {salon.square_feet && (
            <div className="flex items-center">
              <SquareDot className="h-4 w-4 mr-2 text-gray-500" />
              <span>Area: {Number(salon.square_feet).toLocaleString()} sq ft</span>
            </div>
          )}
          
          {salon.staff && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <span>Staff: {salon.staff}</span>
            </div>
          )}
          
          {(salon.revenue || salon.monthly_revenue || salon.yearly_revenue) && (
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
              <span>
                Revenue: {
                  salon.revenue ? `$${Number(salon.revenue).toLocaleString()}` :
                  salon.monthly_revenue ? `$${salon.monthly_revenue}/month` :
                  salon.yearly_revenue ? `$${salon.yearly_revenue}/year` : 'Contact for details'
                }
              </span>
            </div>
          )}
          
          {salon.willTrain !== undefined && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span>{salon.willTrain ? 'Training available for new owner' : 'No training included'}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mt-6 mb-2">Asking Price</h3>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
          <span className="text-xl font-bold text-emerald-700">
            {salon.asking_price ? `$${Number(salon.asking_price).toLocaleString()}` : salon.price ? `$${Number(salon.price).toLocaleString()}` : 'Contact for price'}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700 whitespace-pre-line">{salon.description}</p>
        
        {salon.features && salon.features.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {salon.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {feature}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SalonServicesContent = ({ services }: { services: string[] }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Services Offered</h3>
      <ul className="list-disc list-inside text-gray-700">
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </div>
  );
};

const SalonAmenitiesContent = ({ amenities }: { amenities: string[] }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Amenities</h3>
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <Badge key={index} variant="secondary">{amenity}</Badge>
        ))}
      </div>
    </div>
  );
};

const SalonHoursContent = ({ hours }: { hours: { [key: string]: string } }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(hours).map(([day, time]) => (
          <div key={day} className="flex justify-between">
            <span className="font-medium capitalize">{day}:</span>
            <span>{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleSalonDetailPage;
