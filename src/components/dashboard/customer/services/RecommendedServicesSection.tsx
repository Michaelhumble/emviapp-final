
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Local type for this component only
interface ServiceWithArtistData {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration_minutes: number;
  image_url?: string;
  artist: {
    id: string;
    full_name: string;
    avatar_url?: string;
    location?: string;
    specialty?: string;
  };
}

const RecommendedServicesSection = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['recommended-services'],
    queryFn: async () => {
      // Get services with basic user info
      const { data: servicesData, error } = await supabase
        .from('services')
        .select(`
          id,
          title,
          description,
          price,
          duration_minutes,
          image_url,
          user_id
        `)
        .eq('is_visible', true)
        .limit(6);

      if (error) {
        console.error('Error fetching services:', error);
        return [];
      }

      // Get user info separately for each service
      const servicesWithArtists: ServiceWithArtistData[] = [];
      
      for (const service of servicesData || []) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, full_name, avatar_url, location, bio')
          .eq('id', service.user_id)
          .single();

        servicesWithArtists.push({
          ...service,
          artist: {
            id: userData?.id || service.user_id,
            full_name: userData?.full_name || 'Artist',
            avatar_url: userData?.avatar_url || undefined,
            location: userData?.location || undefined,
            specialty: userData?.bio || undefined
          }
        });
      }

      return servicesWithArtists;
    },
  });

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recommended Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!services || services.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recommended Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No services available at the moment.</p>
            <Button className="mt-4" onClick={() => window.location.href = '/search'}>
              Browse All Services
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Recommended Services</CardTitle>
        <Button variant="outline" onClick={() => window.location.href = '/search'}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {service.image_url && (
                <div className="h-48 bg-gray-100 relative">
                  <img 
                    src={service.image_url} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{service.title}</h3>
                  <Badge variant="secondary">${service.price}</Badge>
                </div>
                
                {service.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{service.artist.full_name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration_minutes} min</span>
                  </div>
                  {service.artist.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{service.artist.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Book Now
                  </Button>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedServicesSection;
