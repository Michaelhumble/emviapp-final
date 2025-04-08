
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ArtistWelcomeHeaderProps {
  name: string;
}

const ArtistWelcomeHeader = ({ name }: ArtistWelcomeHeaderProps) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    // Navigate to public profile page - would be implemented with actual user ID
    navigate('/profile');
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
            Welcome back, {name}! Let's grow your beauty career today.
          </h1>
          
          {/* Vietnamese and English welcome text */}
          <p className="text-gray-600 mb-2">
            Manage your profile, bookings, and client communications all in one place.
          </p>
          <p className="text-gray-500 text-sm italic">
            <span className="block">Chúng tôi ở đây để giúp bạn phát triển sự nghiệp làm đẹp.</span>
            <span className="block">We're here to help you grow your beauty career.</span>
          </p>
        </div>
        
        <Button 
          onClick={handleViewProfile}
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

export default ArtistWelcomeHeader;
