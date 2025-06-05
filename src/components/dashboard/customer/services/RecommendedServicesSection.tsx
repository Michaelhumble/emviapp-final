
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Star,
  Heart,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useQuery } from '@tanstack/react-query';

// Local interface for this component only
interface ServiceWithArtistLocal {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration_minutes: number;
  image_url?: string;
  artist?: {
    id?: string;
    full_name?: string;
    avatar_url?: string;
    location?: string;
    specialty?: string;
  };
}

const RecommendedServicesSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['recommendedServices', user?.id],
    queryFn: async (): Promise<ServiceWithArtistLocal[]> => {
      if (!user) return [];

      try {
        const { data, error } = await supabase
          .from('services')
          .select(`
            id,
            title,
            description,
            price,
            duration_minutes,
            image_url,
            user:user_id (
              id,
              full_name,
              avatar_url,
              location,
              specialty
            )
          `)
          .limit(6);

        if (error) {
          console.error('Error fetching services:', error);
          return [];
        }

        // Transform data to match our local interface
        return (data || []).map(service => ({
          id: service.id,
          title: service.title || 'Beauty Service',
          description: service.description || 'Professional beauty service',
          price: service.price || 0,
          duration_minutes: service.duration_minutes || 60,
          image_url: service.image_url || '',
          artist: service.user ? {
            id: service.user.id || '',
            full_name: service.user.full_name || 'Beauty Professional',
            avatar_url: service.user.avatar_url || '',
            location: service.user.location || 'Location not specified',
            specialty: service.user.specialty || 'Beauty Specialist'
          } : {
            id: '',
            full_name: 'Beauty Professional',
            avatar_url: '',
            location: 'Location not specified',
            specialty: 'Beauty Specialist'
          }
        }));
      } catch (error) {
        console.error('Error in recommendedServices query:', error);
        return [];
      }
    },
    enabled: !!user
  });

  const handleServiceClick = (service: ServiceWithArtistLocal) => {
    if (service.artist?.id) {
      navigate(`/artist/${service.artist.id}`);
      toast.success(`View ${service.artist.full_name}'s profile`);
    } else {
      navigate('/search');
      toast.info('Discover more amazing services!');
    }
  };

  const handleBookService = (service: ServiceWithArtistLocal) => {
    if (service.artist?.id) {
      navigate(`/artist/${service.artist.id}?service=${service.id}`);
      toast.success('Ready to book your service!');
    } else {
      navigate('/search');
      toast.info('Find the perfect service for you!');
    }
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Suggested for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-t-2 border-purple-600 rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Suggested for You
          </CardTitle>
          <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
            Personalized
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-purple-200 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No services available right now</p>
            <Button 
              onClick={() => navigate('/search')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg"
            >
              Explore Services
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="border border-purple-100 hover:border-purple-300 transition-all duration-300 overflow-hidden">
                  {/* Service Image */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100">
                    {service.image_url ? (
                      <img 
                        src={service.image_url} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Sparkles className="h-12 w-12 text-purple-300" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/80 hover:bg-white text-purple-600 rounded-full p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success('Added to favorites!');
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Artist Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                        {service.artist?.avatar_url ? (
                          <img 
                            src={service.artist.avatar_url} 
                            alt={service.artist.full_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-sm font-medium">
                            {service.artist?.full_name?.charAt(0) || 'B'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {service.artist?.full_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {service.artist?.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Service Details */}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Service Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{service.duration_minutes}min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{service.artist?.location}</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-purple-600">
                          ${service.price}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleServiceClick(service)}
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBookService(service)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-md"
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {services.length > 0 && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/search')}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              View All Services
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedServicesSection;
