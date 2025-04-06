
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArtistData } from "./context/ArtistDataContext";

interface ArtistWelcomeBannerProps {
  firstName: string;
}

const ArtistWelcomeBanner = ({ firstName }: ArtistWelcomeBannerProps) => {
  const navigate = useNavigate();
  const { artistProfile } = useArtistData();
  
  const handlePreviewProfile = () => {
    // Navigate to public profile page using user ID
    if (artistProfile?.id) {
      navigate(`/u/${artistProfile.id}`);
    }
  };
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 rounded-2xl p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold mb-2">
            Welcome back, {firstName || 'Artist'}!
          </h1>
          <p className="text-gray-600">
            Manage your profile, bookings, and client communications all in one place.
          </p>
        </div>
        
        <Button 
          onClick={handlePreviewProfile}
          className="whitespace-nowrap"
          variant="outline"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview My Profile
        </Button>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeBanner;
