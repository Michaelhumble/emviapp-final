import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, User, Clock, DollarSign, BookOpen, Calendar, ExternalLink, Mail, Phone, Instagram, Globe } from 'lucide-react';
import { toast } from "sonner";
import ProAccessGate from "@/components/pro-access/ProAccessGate";
import { useAuth } from "@/context/auth";

import { UserProfile } from "@/types/profile";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}

const ArtistPublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userRole } = useAuth();
  
  const isSalonOwner = userRole === 'salon' || userRole === 'owner';
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        let { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', username)
          .maybeSingle();
        
        if (userError || !userData) {
          const { data: nameData, error: nameError } = await supabase
            .from('users')
            .select('*')
            .ilike('full_name', `%${username}%`)
            .limit(1)
            .maybeSingle();
          
          if (nameError || !nameData) {
            setError("Artist profile not found");
            setLoading(false);
            return;
          }
          
          userData = nameData;
        }
        
        setProfile(userData as UserProfile);
        
        if (userData) {
          const { data: servicesData, error: servicesError } = await supabase
            .from("services")
            .select("*")
            .eq("user_id", userData.id)
            .eq("is_visible", true);
          
          if (servicesError) throw servicesError;
          setServices(servicesData as Service[] || []);
          
          if (userData.portfolio_urls && userData.portfolio_urls.length > 0) {
            const images = userData.portfolio_urls.map((url, index) => ({
              id: `portfolio-${index}`,
              url,
              name: `Portfolio Image ${index + 1}`
            }));
            setPortfolioImages(images);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load artist profile");
        toast.error("Failed to load artist profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [username]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="h-16 w-16 rounded-full animate-pulse bg-purple-100"></div>
            <div className="h-8 w-64 animate-pulse bg-gray-200 rounded"></div>
            <div className="h-4 w-48 animate-pulse bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !profile) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <Card className="max-w-lg mx-auto">
            <CardContent className="pt-6 text-center py-12">
              <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Artist Not Found</h1>
              <p className="text-gray-500 mb-6">
                The artist profile you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/">
                <Button>Return to Homepage</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  const handleBooking = () => {
    if (profile?.booking_url) {
      window.open(profile.booking_url, '_blank');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name || ""} />
                ) : (
                  <AvatarFallback className="bg-purple-100 text-purple-800 text-xl">
                    {profile.full_name?.charAt(0) || "A"}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-serif font-bold mb-2">{profile.full_name}</h1>
                <p className="text-purple-700 font-medium">{profile.specialty || "Nail Artist"}</p>
                {profile.location && (
                  <p className="text-gray-500 mt-1">
                    {isSalonOwner ? (
                      <ProAccessGate blur={false}>
                        {profile.location}
                      </ProAccessGate>
                    ) : (
                      profile.location
                    )}
                  </p>
                )}
                
                <div className="mt-6">
                  {profile.accepts_bookings && profile.booking_url ? (
                    isSalonOwner ? (
                      <ProAccessGate>
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={handleBooking}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Me
                          <ExternalLink className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      </ProAccessGate>
                    ) : (
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={handleBooking}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Me
                        <ExternalLink className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    )
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Button className="bg-purple-600 hover:bg-purple-700" disabled>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Booking Coming Soon
                            </Button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Online booking will be available soon!</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
            
            {profile.bio && (
              <div className="mt-8">
                <h2 className="text-lg font-medium mb-2">About Me</h2>
                <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
              </div>
            )}
          </div>
          
          {portfolioImages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolioImages.map((image) => (
                  <div key={image.id} className="aspect-square rounded-md overflow-hidden border">
                    <img 
                      src={image.url} 
                      alt={image.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">Services</h2>
            
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="h-full">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      
                      {service.description && (
                        <p className="text-gray-600 text-sm mt-1 mb-3">{service.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="space-y-1">
                          <div className="flex items-center text-purple-700 font-medium">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 2
                            }).format(service.price)}
                          </div>
                          
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {formatDuration(service.duration_minutes)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-50 border-dashed border p-8 text-center">
                <CardContent className="p-0">
                  <p className="text-gray-500">This artist hasn't added any services yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-serif font-semibold">Get In Touch</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Contact Information</h3>
                  
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {isSalonOwner ? (
                        <ProAccessGate tooltipText="Email is available to Emvi Pro salon owners">
                          <span>{profile.email}</span>
                        </ProAccessGate>
                      ) : (
                        <span>{profile.email}</span>
                      )}
                    </div>
                  )}
                  
                  {profile.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {isSalonOwner ? (
                        <ProAccessGate tooltipText="Phone number is available to Emvi Pro salon owners">
                          <span>{profile.phone}</span>
                        </ProAccessGate>
                      ) : (
                        <span>{profile.phone}</span>
                      )}
                    </div>
                  )}
                  
                  {profile.instagram && (
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-muted-foreground" />
                      {isSalonOwner ? (
                        <ProAccessGate tooltipText="Instagram profile is available to Emvi Pro salon owners">
                          <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-blue-600 hover:underline">
                            @{profile.instagram.replace('@', '')}
                          </a>
                        </ProAccessGate>
                      ) : (
                        <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">
                          @{profile.instagram.replace('@', '')}
                        </a>
                      )}
                    </div>
                  )}
                  
                  {profile.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      {isSalonOwner ? (
                        <ProAccessGate tooltipText="Website is available to Emvi Pro salon owners">
                          <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-blue-600 hover:underline truncate">
                            {profile.website}
                          </a>
                        </ProAccessGate>
                      ) : (
                        <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-600 hover:underline truncate">
                          {profile.website}
                        </a>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-center items-center md:items-end space-y-3">
                  {isSalonOwner ? (
                    <ProAccessGate tooltipText="Direct messaging is available to Emvi Pro salon owners" blur={false}>
                      <Button variant="outline" className="w-full md:w-auto">
                        Send Message
                      </Button>
                    </ProAccessGate>
                  ) : (
                    <Button variant="outline" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  )}
                  <p className="text-xs text-muted-foreground text-center md:text-right">
                    Usually responds within 24 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistPublicProfile;
