
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AtSign, Calendar, Globe, Instagram, Loader2, Mail, MapPin, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  id: string;
  full_name: string;
  email?: string;
  role?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  specialty?: string;
  instagram?: string;
  website?: string;
  phone?: string;
  salon_name?: string;
  company_name?: string;
  created_at?: string;
}

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // First try to find by username in URL
        let { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', username)
          .single();
        
        // If not found, try searching by full_name
        if (error || !data) {
          const { data: nameData, error: nameError } = await supabase
            .from('users')
            .select('*')
            .ilike('full_name', `%${username}%`)
            .limit(1)
            .single();
          
          if (nameError) {
            setError("User profile not found");
            setLoading(false);
            return;
          }
          
          data = nameData;
        }
        
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [username]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
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
              <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
              <p className="text-gray-500 mb-6">
                The user profile you're looking for doesn't exist or has been removed.
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
  
  const getProfileTitle = () => {
    if (profile.role === 'artist' || profile.role === 'nail technician/artist') {
      return profile.specialty || 'Beauty Artist';
    } else if (profile.role === 'salon' || profile.role === 'owner') {
      return profile.salon_name || 'Salon Owner';
    } else if (profile.role === 'vendor' || profile.role === 'supplier' || profile.role === 'beauty supplier') {
      return profile.company_name || 'Beauty Supplier';
    } else if (profile.role === 'freelancer') {
      return profile.specialty || 'Freelancer';
    }
    return '';
  };
  
  const getProfileType = () => {
    switch (profile.role) {
      case 'artist':
      case 'nail technician/artist':
        return 'Artist';
      case 'salon':
      case 'owner':
        return 'Salon';
      case 'vendor':
      case 'supplier':
      case 'beauty supplier':
        return 'Supplier';
      case 'freelancer':
        return 'Freelancer';
      default:
        return 'Member';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                      {profile.avatar_url ? (
                        <img 
                          src={profile.avatar_url} 
                          alt={profile.full_name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-8 text-gray-300" />
                      )}
                    </div>
                    
                    <Badge className="mb-2">{getProfileType()}</Badge>
                    <h1 className="text-2xl font-bold text-center">{profile.full_name}</h1>
                    <p className="text-muted-foreground text-center">{getProfileTitle()}</p>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    {profile.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    )}
                    
                    {profile.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                    )}
                    
                    {profile.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{profile.email}</span>
                      </div>
                    )}
                    
                    {profile.website && (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-sm text-blue-600 hover:underline truncate">
                          {profile.website}
                        </a>
                      </div>
                    )}
                    
                    {profile.instagram && (
                      <div className="flex items-center">
                        <Instagram className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-sm text-blue-600 hover:underline">
                          @{profile.instagram.replace('@', '')}
                        </a>
                      </div>
                    )}
                    
                    {profile.created_at && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-center pt-2">
                    <Button variant="default" className="w-full">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">About</h2>
                </CardHeader>
                <CardContent>
                  {profile.bio ? (
                    <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
                  ) : (
                    <p className="text-muted-foreground italic">No bio available</p>
                  )}
                </CardContent>
              </Card>
              
              {(profile.role === 'artist' || profile.role === 'freelancer' || profile.role === 'nail technician/artist') && (
                <Card className="mt-6">
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Portfolio</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">Portfolio section coming soon</p>
                  </CardContent>
                </Card>
              )}
              
              {(profile.role === 'salon' || profile.role === 'owner') && (
                <Card className="mt-6">
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Services</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">Services section coming soon</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
