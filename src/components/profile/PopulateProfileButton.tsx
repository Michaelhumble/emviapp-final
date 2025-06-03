
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { populateArtistProfileWithTestData } from "@/utils/profileTestData";

interface PopulateProfileButtonProps {
  onComplete?: () => void;
}

const PopulateProfileButton = ({ onComplete }: PopulateProfileButtonProps) => {
  const { user, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePopulateProfile = async () => {
    // Defensive null check for user.id
    if (!user?.id) {
      console.warn('User ID is not available');
      return;
    }
    
    setLoading(true);
    try {
      const success = await populateArtistProfileWithTestData(user.id);
      
      if (success) {
        // Refresh the user profile to show the new data
        await refreshUserProfile();
        
        // Call the onComplete callback if provided
        if (onComplete) {
          onComplete();
        }
      }
    } catch (error) {
      console.error("Error populating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handlePopulateProfile} 
      disabled={loading}
      className="bg-amber-500 hover:bg-amber-600 text-white"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Populating Profile...
        </>
      ) : (
        "Populate Profile with Test Data"
      )}
    </Button>
  );
};

export default PopulateProfileButton;
