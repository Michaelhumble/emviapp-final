
import React from "react";
import { UserProfile } from "@/context/auth/types";
import { useNavigate } from "react-router-dom";
import { Edit, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ArtistProfileFormCard from "./ArtistProfileFormCard";
import PersonalMessageBanner from "./PersonalMessageBanner";
import ProfileHighlights from "./ProfileHighlights";
import StyleSignature from "./StyleSignature";

interface PremiumArtistProfileProps {
  userProfile: UserProfile;
}

const PremiumArtistProfile: React.FC<PremiumArtistProfileProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  // Extract specialties from the userProfile if they exist, or use an empty array
  const specialties = Array.isArray(userProfile?.skills) ? userProfile.skills : [];
  
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Premium Artist Banner */}
      <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 relative">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Profile Header - Fixed layout issues */}
            <div className="flex flex-col md:flex-row p-4 md:p-6 pb-6 md:pb-8 items-center md:items-start">
              <div className="relative -mt-16 flex-shrink-0">
                {userProfile?.avatar_url ? (
                  <img 
                    src={userProfile.avatar_url} 
                    alt={userProfile.full_name} 
                    className="h-32 w-32 rounded-full border-4 border-white shadow-md object-cover"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center text-4xl font-bold text-purple-500 border-4 border-white shadow-md">
                    {userProfile?.full_name?.charAt(0) || "A"}
                  </div>
                )}
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600 border border-white">
                  Artist
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left w-full"> {/* Added w-full for proper sizing */}
                <h1 className="text-2xl font-bold text-gray-800">{userProfile?.full_name || "Artist Profile"}</h1>
                <p className="text-gray-600 mt-1">{userProfile?.specialty || "Nail Artist"}</p>
                
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  {userProfile?.location && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      {userProfile.location}
                    </span>
                  )}
                  
                  {/* Use optional chaining for years_experience */}
                  {userProfile?.years_experience !== undefined && (
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                      {userProfile?.years_experience} years experience
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <Button size="sm" variant="outline" onClick={() => navigate('/profile/edit')}>
                    <Edit className="h-3.5 w-3.5 mr-1.5" />
                    Edit Profile
                  </Button>
                  
                  <Button size="sm">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    View Bookings
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-4 md:p-6 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <PersonalMessageBanner artistName={userProfile.full_name} />
                  
                  <ProfileHighlights stats={{
                    rating: 4.9,
                    clients: userProfile?.credits || 0,
                    completionRate: 98,
                    responseTime: "< 2 hrs",
                    repeatClients: 15,
                    experience: userProfile?.years_experience ? `${userProfile?.years_experience}+ years` : "3+ years"
                  }} />
                  
                  <StyleSignature specialties={specialties} />
                </div>
                
                <div className="lg:col-span-1">
                  <ArtistProfileFormCard
                    title="Portfolio"
                    description="Showcase your best work"
                    icon={<Calendar className="h-5 w-5 text-purple-500" />}
                    className="h-full"
                  >
                    <div className="text-center py-4">
                      <p className="text-gray-500 mb-4">Add photos of your best work to attract new clients</p>
                      <Button variant="outline" onClick={() => navigate('/profile/portfolio')}>
                        Upload Portfolio
                      </Button>
                    </div>
                  </ArtistProfileFormCard>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumArtistProfile;
