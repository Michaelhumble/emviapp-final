import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArtistProfile } from '@/hooks/artist/useArtistProfile';
import { toast } from 'sonner';
import PremiumForHireCard from '@/components/shared/PremiumForHireCard';

const ArtistForHire = () => {
  const { profile, isLoading } = useArtistProfile();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);

  const handleShareProfile = async () => {
    setIsSharing(true);
    try {
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
    navigate('/profile/edit');
  };

  if (isLoading) {
    return <PremiumForHireCard mode="artist" />;
  }

  return (
    <PremiumForHireCard 
      mode="artist" 
      onShareProfile={handleShareProfile}
      onEditProfile={handleEditProfile}
    />
  );
};

export default ArtistForHire;