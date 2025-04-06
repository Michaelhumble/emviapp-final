
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/context/auth/types";
import { User, MapPin, Instagram } from "lucide-react";

interface CustomerDashboardHeaderProps {
  profile: UserProfile;
}

const CustomerDashboardHeader = ({ profile }: CustomerDashboardHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="relative overflow-hidden border-pink-100">
        {/* Cover Image Background */}
        <div className="h-40 md:h-48 bg-gradient-to-r from-pink-400 to-rose-500 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <CardContent className="relative -mt-16 z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Profile Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-300" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{profile?.full_name || 'Beauty Enthusiast'}</h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {profile?.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    
                    {profile?.instagram && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Instagram className="w-4 h-4 mr-1" />
                        <span>@{profile.instagram}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* User Preferences/Tags */}
              {profile?.preferences && profile.preferences.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Beauty Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferences.map((pref, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerDashboardHeader;
