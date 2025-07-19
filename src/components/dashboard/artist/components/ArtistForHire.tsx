import React, { useState } from 'react';
import { toast } from 'sonner';
import ArtistForHireCard from './ArtistForHireCard';
import ArtistForHireEditModal from './ArtistForHireEditModal';

const ArtistForHire = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleShareProfile = async () => {
    setIsSharing(true);
    try {
      const profileUrl = `${window.location.origin}/artist-for-hire/demo`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Artist For Hire - EmviApp',
          text: 'Check out my professional nail art services and availability!',
          url: profileUrl,
        });
      } else {
        await navigator.clipboard.writeText(profileUrl);
        toast.success("Profile link copied to clipboard! 🔗", {
          description: "Share your for-hire profile with potential clients."
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
    setIsEditModalOpen(true);
  };

  return (
    <>
      <ArtistForHireCard 
        onShareProfile={handleShareProfile}
        onEditProfile={handleEditProfile}
        isSharing={isSharing}
      />
      
      <ArtistForHireEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default ArtistForHire;