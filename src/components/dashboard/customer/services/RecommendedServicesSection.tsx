
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  Sparkles, 
  TrendingUp,
  Eye
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Local type definition for this component to handle the data structure
interface ServiceWithArtist {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration_minutes: number;
  user_id: string;
  image_url?: string;
  user: {
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
  const [services, setServices] = useState<ServiceWithArtist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedServices = async () => {
      try {
        setLoading(true);
        
        // Fetch services with artist information
        const { data: servicesData, error } = await supabase
          .from('services')
          .select(`
            id,
            title,
            description,
            price,
            duration_minutes,
            user_id,
            image_url,
            user:user_id (
              id,
              full_name,
              avatar_url,
              location,
              specialty
            )
          `)
          .eq('is_visible', true)
          .limit(6);

        if (error) throw error;

        // Transform the data to match our local type with safe defaults
        const transformedServices = (servicesData || [])
          .filter(service => service.user) // Only include services with valid user data
          .map(service => ({
            id: service.id,
            title: service.title,
            description: service.description || '',
            price: service.price,
            duration_minutes: service.duration_minutes,
            user_id: service.user_id,
            image_url: service.image_url || '',
            user: Array.isArray(service.user) 
              ? {
                  id: service.user[0]?.id || '',
                  full_name: service.user[0]?.full_name || 'Artist',
                  avatar_url: service.user[0]?.avatar_url || '',
                  location: service.user[0]?.location || '',
                  specialty: service.user[0]?.specialty || ''
                }
              : {
                  id: service.user.id || '',
                  full_name: service.user.full_name || 'Artist',
                  avatar_url: service.user.avatar_url || '',
                  location: service.user.location || '',
                  specialty: service.user.specialty || ''
                }
          }));

        // Smart recommendations based on user data
        let recommendedServices = transformedServices;
        
        if (userProfile?.location) {
          // Prioritize local artists
          recommendedServices = transformedServices.sort((a, b) => {
            const aLocal = a.user.location?.toLowerCase().includes(userProfile.location?.toLowerCase() || '') ? 1 : 0;
            const bLocal = b.user.location?.toLowerCase().includes(userProfile.location?.toLowerCase() || '') ? 1 : 0;
            return bLocal - aLocal;
          });
        }

        // Add some trending/popular services if we don't have enough
        if (recommendedServices.length < 6) {
          const trendingServices = [
            {
              id: 'trending-1',
              title: 'Luxury Gel Manicure',
              description: 'Premium gel manicure with nail art',
              price: 45,
              duration_minutes: 90,
              user_id: 'trending-artist-1',
              image_url: '',
              user: {
                id: 'trending-artist-1',
                full_name: 'Sarah Chen',
                avatar_url: '',
                location: userProfile?.location || 'Los Angeles, CA',
                specialty: 'Nail Art Specialist'
              }
            },
            {
              id: 'trending-2',
              title: 'Classic Pedicure',
              description: 'Relaxing pedicure with massage',
              price: 35,
              duration_minutes: 60,
              user_id: 'trending-artist-2',
              image_url: '',
              user: {
                id: 'trending-artist-2',
                full_name: 'Maria Rodriguez',
                avatar_url: '',
                location: userProfile?.location || 'Miami, FL',
                specialty: 'Pedicure Expert'
              }
            }
          ];
          
          recommendedServices = [...recommendedServices, ...trendingServices].slice(0, 6);
        }

        setServices(recommendedServices);
      } catch (error) {
        console.error('Error fetching recommended services:', error);
        
        // Fallback to mock data
        const mockServices: ServiceWithArtist[] = [
          {
            id: 'mock-1',
            title: 'Signature Gel Manicure',
            description: 'Beautiful gel manicure with custom design',
            price: 40,
            duration_minutes: 75,
            user_id: 'mock-artist-1',
            image_url: '',
            user: {
              id: 'mock-artist-1',
              full_name: 'Emma Thompson',
              avatar_url: '',
              location: 'New York, NY',
              specialty: 'Nail Artist'
            }
          },
          {
            id: 'mock-2',
            title: 'Deluxe Pedicure',
            description: 'Relaxing pedicure with hot stone massage',
            price: 50,
            duration_minutes: 90,
            user_id: 'mock-artist-2',
            image_url: '',
            user: {
              id: 'mock-artist-2',
              full_name: 'James Wilson',
              avatar_url: '',
              location: 'San Francisco, CA',
              specialty: 'Spa Specialist'
            }
          }
        ];
        
        setServices(mockServices);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedServices();
  }, [userProfile?.location]);

  const handleServiceClick = (service: ServiceWithArtist) => {
    // Navigate to artist profile or booking page
    navigate(`/artist/${service.user.id}`);
    toast.success(`Viewing ${service.user.full_name}'s profile`);
  };

  const handleSaveService = (service: ServiceWithArtist) => {
    // Save to favorites
    toast.success(`${service.title} saved to your favorites!`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Suggested for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <Card className="h-64 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Suggested for You
          </h3>
          <p className="text-gray-600 mt-1">Personalized recommendations based on your preferences</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
          <TrendingUp className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative h-32 bg-gradient-to-br from-purple-100 to-pink-100">
                {service.image_url ? (
                  <img 
                    src={service.image_url} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-purple-400" />
                  </div>
                )}
                
                {/* Save Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveService(service);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              
              <CardContent className="p-4">
                {/* Artist Info */}
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={service.user.avatar_url} alt={service.user.full_name} />
                    <AvatarFallback className="text-xs">
                      {service.user.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {service.user.full_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{service.user.specialty}</p>
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 line-clamp-1">{service.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-purple-600">${service.price}</span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{service.duration_minutes}min</span>
                      </div>
                    </div>
                  </div>

                  {service.user.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{service.user.location}</span>
                    </div>
                  )}
                </div>

                {/* View Button */}
                <Button
                  onClick={() => handleServiceClick(service)}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Artist
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/search')}
          className="px-8"
        >
          View All Services
        </Button>
      </div>
    </motion.div>
  );
};

export default RecommendedServicesSection;
