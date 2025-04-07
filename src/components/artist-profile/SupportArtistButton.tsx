
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAuth } from '@/context/auth';
import SupportArtistModal from './SupportArtistModal';
import AuthAction from '@/components/common/AuthAction';

interface SupportArtistButtonProps {
  artistId: string;
  artistName: string;
}

const SupportArtistButton: React.FC<SupportArtistButtonProps> = ({ artistId, artistName }) => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const { user } = useAuth();
  
  // Don't show the button if viewing your own profile
  if (user?.id === artistId) {
    return null;
  }
  
  const handleShowModal = async () => {
    if (!user) return false;
    
    setShowSupportModal(true);
    return true;
  };
  
  return (
    <>
      <AuthAction 
        onAction={handleShowModal}
        creditMessage="Support artists to help them grow and earn Emvi credits!"
      >
        <Button 
          variant="outline"
          className="flex items-center gap-2 border-pink-200 hover:bg-pink-50 text-pink-700"
        >
          <Heart className="h-4 w-4 text-pink-500 fill-pink-100" />
          <span className="text-sm">Support This Artist</span>
        </Button>
      </AuthAction>

      <SupportArtistModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        artistId={artistId}
        artistName={artistName}
      />
    </>
  );
};

export default SupportArtistButton;
