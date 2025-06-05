
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Image as ImageIcon, MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ServiceWithArtist {
  id: string;
  title: string;
  description: string;
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

const RecommendedServicesSection: React.FC = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { data: recommendedServices, isLoading } = useQuery({
    queryKey: ['recommended-services', user?.id, userProfile?.location],
    queryFn: async () => {
      try {
        // Get user's booking history to understand preferences
        let userPreferences: string[] = [];
        
        if (user) {
          const { data: bookingHistory } = await supabase
            .from('bookings')
            .select('service_type')
            .eq('sender_id', user.id)
            .limit(10);
            
          userPreferences = bookingHistory?.map(b => b.service_type).filter(Boolean) || [];
        }

        // Build query for recommended services
        let query = supabase
          .from('services')
          .select(`
            id,
            title,
            description,
            price,
            duration_minutes,
            user_id,
            image_url,
            user:users!services_user_id_fkey (
              id,
              full_name,
              avatar_url,
              location,
              specialty
            )
          `)
          .eq('is_visible', true)
          .in('users.role', ['artist', 'nail technician/artist', 'freelancer'])
          .order('created_at', { ascending: false });

        // If user has location preference, prioritize local services
        if (userProfile?.location) {
          const userCity = userProfile.location.split(',')[0].trim();
          query = query.ilike('users.location', `%${userCity}%`);
        }

        const { data: services, error } = await query.limit(8);
        
        if (error) throw error;

        // If no local services found, get general recommendations
        if (!services || services.length === 0) {
          const { data: fallbackServices, error: fallbackError } = await supabase
            .from('services')
            .select(`
              id,
              title,
              description,
              price,
              duration_minutes,
              user_id,
              image_url,
              user:users!services_user_id_fkey (
                id,
                full_name,
                avatar_url,
                location,
                specialty
              )
            `)
            .eq('is_visible', true)
            .in('users.role', ['artist', 'nail technician/artist', 'freelancer'])
            .order('created_at', { ascending: false })
            .limit(8);
            
          if (fallbackError) throw fallbackError;
          return fallbackServices as ServiceWithArtist[];
        }

        return services as ServiceWithArtist[];
      } catch (error) {
        console.error('Error fetching recommended services:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleViewService = (service: ServiceWithArtist) => {
    // Navigate to artist profile
    navigate(`/u/${service.user.id}`);
  };

  const handleBookNow = (service: ServiceWithArtist) => {
    if (!user) {
      toast.info('Please sign in to book services');
      navigate('/signup');
      return;
    }
    
    // Navigate to artist profile with booking intent
    navigate(`/u/${service.user.id}?book=${service.id}`);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-5">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className={isMobile 
          ? "flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
          : "grid grid-cols-1 sm:grid-cols-2 gap-4"}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="min-w-[280px] animate-pulse">
              <Card className="overflow-hidden">
                <div className="h-32 bg-gray-200"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendedServices || recommendedServices.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-serif font-bold mb-2 text-gray-800 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Suggested for You
          </h2>
          <p className="text-gray-600">
            Discover amazing services from talented artists in your area
          </p>
        </div>
        
        <Card className="p-8 text-center">
          <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Building Your Recommendations</h3>
          <p className="text-gray-600 mb-4">
            We're curating personalized service suggestions just for you!
          </p>
          <Button onClick={() => navigate('/search')} className="rounded-full">
            Explore All Services <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-5">
        <h2 className="text-2xl font-serif font-bold mb-2 text-gray-800 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-500" />
          Suggested for You
        </h2>
        <p className="text-gray-600">
          Services we think you'll love based on your preferences and location
        </p>
      </div>
      
      <div className={isMobile 
        ? "flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x"
        : "grid grid-cols-1 sm:grid-cols-2 gap-4"}
      >
        {recommendedServices.map((service) => {
          const isLocalService = userProfile?.location && 
            service.user.location?.toLowerCase().includes(userProfile.location.split(',')[0].toLowerCase());
          
          return (
            <Card
              key={service.id}
              className={`group hover:shadow-md transition-shadow border-gray-100 overflow-hidden cursor-pointer ${
                isMobile ? 'min-w-[280px] snap-start' : ''
              }`}
              onClick={() => handleViewService(service)}
            >
              <div className="h-32 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center relative">
                {service.image_url ? (
                  <img 
                    src={service.image_url} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-white/40" />
                )}
                
                {isLocalService && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 border border-emerald-200">
                      <MapPin className="h-3 w-3 mr-1" />
                      Nearby
                    </span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-medium text-lg text-gray-800 mb-1 group-hover:text-purple-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {service.description || 'Professional beauty service'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-purple-700">${service.price}</span>
                    {service.duration_minutes && (
                      <>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.duration_minutes}min
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                {service.user && (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <span>by {service.user.full_name}</span>
                    </div>
                    
                    {service.user.location && (
                      <div className="flex items-center text-xs text-gray-400">
                        <MapPin className="h-3 w-3 mr-1" />
                        {service.user.location.split(',')[0]}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewService(service);
                    }}
                  >
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    className="flex-1 rounded-full bg-purple-600 hover:bg-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(service);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {recommendedServices.length > 0 && (
        <div className="text-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/search')}
            className="rounded-full px-6"
          >
            View All Services <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendedServicesSection;
