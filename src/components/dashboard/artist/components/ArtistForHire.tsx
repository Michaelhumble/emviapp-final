import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Briefcase, Share2, Edit, Phone, Mail } from 'lucide-react';
import { useArtistProfile } from '@/hooks/artist/useArtistProfile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ArtistForHire = () => {
  const { profile, isLoading } = useArtistProfile();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);

  const handleShareProfile = async () => {
    setIsSharing(true);
    try {
      // Create a demo profile URL for sharing
      const profileUrl = `${window.location.origin}/artist-profile/${profile?.id || 'demo'}`;
      
      if (navigator.share) {
        await navigator.share({
          title: `${profile?.full_name || 'Nail Artist'} - For Hire`,
          text: `Check out my nail art services! ${profile?.specialty || 'Professional nail artist'}`,
          url: profileUrl,
        });
      } else {
        await navigator.clipboard.writeText(profileUrl);
        toast.success("Profile link copied to clipboard!", {
          description: "Share your profile link with potential clients."
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Unable to share profile. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/artist-profile');
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Artist For Hire</CardTitle>
                <p className="text-purple-100 mt-1">Available for on-demand nail services</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
              🎨 AVAILABLE
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="bg-white rounded-lg p-6 border border-purple-200 space-y-6">
            {/* Artist Profile Section */}
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 border-4 border-purple-200">
                <AvatarImage 
                  src={profile?.avatar_url} 
                  alt={profile?.full_name || 'Artist'} 
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-200 to-pink-200 text-purple-700 text-xl font-semibold">
                  {profile?.full_name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">
                  {profile?.full_name || 'Professional Nail Artist'}
                </h3>
                <p className="text-purple-600 font-medium mb-2">
                  {profile?.specialty || 'Nail Artist'} for Hire
                </p>
                
                {/* Rating & Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{profile?.rating || '4.9'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    <span>{profile?.location || 'New York, NY'}</span>
                  </div>
                  <div className="text-purple-600 font-medium">
                    {profile?.years_experience || 3}+ years
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h5 className="font-medium text-gray-700 mb-3">Specialties & Services</h5>
              <div className="flex flex-wrap gap-2">
                {profile?.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-purple-300 text-purple-700">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">Gel Manicures</Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">Nail Art</Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">Acrylics</Badge>
                    <Badge variant="outline" className="border-purple-300 text-purple-700">Pedicures</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Bio/Description */}
            <div className="pt-3 border-t border-purple-100">
              <p className="text-sm text-gray-600 leading-relaxed">
                {profile?.bio || 
                  "Professional nail artist available for salon partnerships, special events, and on-demand services. Bringing creativity, expertise, and reliability to every appointment."
                }
              </p>
            </div>

            {/* Availability Badge */}
            <div className="flex items-center justify-center">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-medium">
                ✨ Available for On-Demand Work
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleShareProfile}
                disabled={isSharing}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {isSharing ? 'Sharing...' : 'Share My Profile'}
              </Button>
              <Button 
                onClick={handleEditProfile}
                variant="outline" 
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistForHire;