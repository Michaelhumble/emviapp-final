
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MapPin, 
  Star, 
  Clock, 
  User,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Local interface for this component only
interface ServiceWithArtistLocal {
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
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceWithArtistLocal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedServices = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch services with user data
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
          setServices([]);
          setLoading(false);
          return;
        }

        if (!servicesData || servicesData.length === 0) {
          setServices([]);
          setLoading(false);
          return;
        }

        // Fetch user details for each service
        const userIds = [...new Set(servicesData.map(service => service.user_id))];
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, full_name, avatar_url, location, specialty')
          .in('id', userIds);

        if (usersError) {
          console.error('Error fetching users:', usersError);
          setServices([]);
          setLoading(false);
          return;
        }

        // Safely map services with artist data
        const servicesWithArtists: ServiceWithArtistLocal[] = servicesData
          .map(service => {
            const artist = usersData?.find(u => u.id === service.user_id);
            
            // Only include services where we have valid artist data
            if (!artist) return null;

            return {
              id: service.id,
              title: service.title || 'Beauty Service',
              description: service.description || undefined,
              price: service.price || 0,
              duration_minutes: service.duration_minutes || 60,
              image_url: service.image_url || undefined,
              artist: {
                id: artist.id || '',
                full_name: artist.full_name || 'Beauty Professional',
                avatar_url: artist.avatar_url || undefined,
                location: artist.location || undefined,
                specialty: artist.specialty || undefined
              }
            };
          })
          .filter((service): service is ServiceWithArtistLocal => service !== null);

        setServices(servicesWithArtists);
      } catch (error) {
        console.error('Error in fetchRecommendedServices:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedServices();
  }, [user]);

  const handleViewService = (service: ServiceWithArtistLocal) => {
    // Navigate to artist profile with service focus
    navigate(`/u/${service.artist.full_name.toLowerCase().replace(/\s+/g, '')}`);
    toast.success(`Viewing ${service.artist.full_name}'s profile`);
  };

  const handleBookService = (service: ServiceWithArtistLocal) => {
    // Navigate to booking page or artist profile
    navigate(`/u/${service.artist.full_name.toLowerCase().replace(/\s+/g, '')}`);
    toast.success(`Ready to book with ${service.artist.full_name}!`);
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            Suggested for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (services.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            Suggested for You
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <TrendingUp className="h-12 w-12 text-purple-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Discover Amazing Services</h3>
          <p className="text-gray-600 mb-4">
            We're building your personalized recommendations based on your preferences.
          </p>
          <Button 
            onClick={() => navigate('/search')}
            className="bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Explore Services
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            Suggested for You
          </CardTitle>
          <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-0">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        </div>
        <p className="text-gray-600 mt-2">
          Personalized recommendations based on your location and preferences
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-100/50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-purple-400" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-purple-700 border-0 shadow-md">
                      ${service.price}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      {service.artist.avatar_url ? (
                        <img
                          src={service.artist.avatar_url}
                          alt={service.artist.full_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-2 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {service.title}
                      </h3>
                      <p className="text-sm text-purple-600 font-medium">
                        {service.artist.full_name}
                      </p>
                    </div>
                  </div>
                  
                  {service.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.duration_minutes} min
                    </div>
                    {service.artist.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {service.artist.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewService(service)}
                      className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBookService(service)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-md"
                    >
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/search')}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            View All Services
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedServicesSection;
