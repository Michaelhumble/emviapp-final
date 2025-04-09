
import { useAuth } from "@/context/auth";
import { adaptUserProfile } from "@/utils/profileAdapter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Clock, Phone, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const SalonProfileSection = () => {
  const { userProfile } = useAuth();
  const profile = adaptUserProfile(userProfile);
  
  // Default values for missing profile information
  const salonName = profile?.salon_name || profile?.company_name || "Your Salon";
  const location = profile?.location || "Not specified";
  const email = profile?.email || "Not specified";
  const phone = profile?.phone || "Not specified";
  const website = profile?.website || "";
  
  return (
    <Card className="border-blue-100">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-blue-800">{salonName}</h3>
              <div className="flex items-center text-blue-500 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{location}</span>
              </div>
            </div>
            
            <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-700">
              <Link to="/profile/salon">
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Business Hours</h4>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-blue-400" />
                  <p className="text-sm">Mon-Fri: 9:00 AM - 8:00 PM</p>
                </div>
                <div className="flex items-center text-gray-700 mt-1 ml-6">
                  <p className="text-sm">Sat-Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Contact</h4>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-blue-400" />
                  <p className="text-sm">{phone}</p>
                </div>
                <div className="flex items-center text-gray-700 mt-1">
                  <Mail className="h-4 w-4 mr-2 text-blue-400" />
                  <p className="text-sm">{email}</p>
                </div>
                {website && (
                  <div className="flex items-center text-gray-700 mt-1">
                    <Globe className="h-4 w-4 mr-2 text-blue-400" />
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{website}</a>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Profile Completion</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-gray-500">Complete your profile to attract more artists</p>
              </div>
              
              <div className="mt-4">
                <Button asChild size="sm" variant="outline" className="w-full border-blue-200 text-blue-700">
                  <Link to="/profile/salon/edit">Complete Your Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonProfileSection;
