
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import ArtistProfileForm from "./artist/ArtistProfileForm";
import ArtistProfilePhotoUpload from "./artist/ArtistProfilePhotoUpload";
import ProfileProgressTracker from "./artist/ProfileProgressTracker";
import { Palette, Image, User, AwardIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import IndependentBanner from "../artist/IndependentBanner";
import { useAuth } from "@/context/auth";

const ArtistProfileEditor = () => {
  const isMobile = useIsMobile();
  const { userProfile } = useAuth();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Only show independent banner if the property exists and is true */}
      {userProfile?.independent === true && <IndependentBanner />}
      
      <motion.div variants={itemVariants}>
        <ProfileProgressTracker />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-purple-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <div className="flex items-center">
              <Image className="h-5 w-5 text-purple-500 mr-2" />
              <CardTitle>Profile Photo</CardTitle>
            </div>
            <CardDescription>
              Add a professional photo to help clients recognize you
            </CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "p-4" : "p-6"}>
            <ArtistProfilePhotoUpload />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-purple-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <div className="flex items-center">
              <User className="h-5 w-5 text-purple-500 mr-2" />
              <CardTitle>Profile Information</CardTitle>
            </div>
            <CardDescription>
              Complete your profile to attract more clients
            </CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "p-4" : "p-6"}>
            <ArtistProfileForm />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-purple-100 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <div className="flex items-center">
              <AwardIcon className="h-5 w-5 text-purple-500 mr-2" />
              <CardTitle>Profile Enhancements</CardTitle>
            </div>
            <CardDescription>
              Stand out with special additions to your profile
            </CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "p-4" : "p-6"}>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-50 p-2 rounded-md mr-4">
                  <Palette className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Highlight Your Style</h3>
                  <p className="text-sm text-gray-500">
                    Showcase your unique style and specialties to attract your ideal clients.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-pink-50 p-2 rounded-md mr-4">
                  <Image className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Add Portfolio Images</h3>
                  <p className="text-sm text-gray-500">
                    Upload your best work to showcase your skills and attract more clients.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ArtistProfileEditor;
