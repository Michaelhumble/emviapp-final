
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useArtistProfileData } from './artist-profile/hooks/useArtistProfileData';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Instagram, 
  Star, 
  Eye,
  Calendar,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

const ArtistPublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { profile, loading, error, incrementViewCount } = useArtistProfileData(username || '');

  useEffect(() => {
    if (profile) {
      incrementViewCount();
    }
  }, [profile, incrementViewCount]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return <Navigate to="/404" replace />;
  }

  // Convert string array to expected object format for portfolio images
  const portfolioImages = Array.isArray(profile.gallery) 
    ? profile.gallery.map((url, index) => ({
        id: `img-${index}`,
        url: typeof url === 'string' ? url : ''
      })).filter(img => img.url)
    : [];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header Card */}
            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                      {profile.full_name?.charAt(0) || 'A'}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {profile.full_name}
                        </h1>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="capitalize">
                            {profile.role?.replace('-', ' ')}
                          </Badge>
                          {profile.experience_years && (
                            <Badge variant="outline">
                              <Award className="h-3 w-3 mr-1" />
                              {profile.experience_years} years exp
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {profile.bio && (
                      <p className="text-gray-600 mb-4">{profile.bio}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </div>
                      )}
                      {profile.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {profile.phone}
                        </div>
                      )}
                      {profile.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                      {profile.instagram && (
                        <div className="flex items-center gap-1">
                          <Instagram className="h-4 w-4" />
                          <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Instagram
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Gallery */}
            {portfolioImages.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolioImages.map((image) => (
                      <div key={image.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={image.url}
                          alt="Portfolio work"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Services & Specialties */}
            {profile.specialties && profile.specialties.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                  Ready to book an appointment or learn more about my services?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {profile.phone && (
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  )}
                  {profile.booking_url && (
                    <Button size="lg" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Online
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ArtistPublicProfile;
