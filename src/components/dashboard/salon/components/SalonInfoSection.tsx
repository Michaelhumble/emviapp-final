
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/profile';
import { Pencil, Check, X, MapPin, Link, Instagram, Phone, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface SalonInfoSectionProps {
  profile: UserProfile | null;
  isLoading: boolean;
  onProfileUpdate: () => void;
}

const SalonInfoSection = ({ profile, isLoading, onProfileUpdate }: SalonInfoSectionProps) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const handleEditProfile = () => {
    // For simplicity, we're just navigating to the profile page
    window.location.href = "/profile/salon";
  };
  
  const handleViewPublicProfile = () => {
    // Navigate to public salon profile
    window.location.href = `/salon/${profile?.id}`;
  };
  
  // Mock business hours for display
  const businessHours = [
    { day: t("Monday"), hours: "9:00 AM - 8:00 PM" },
    { day: t("Tuesday"), hours: "9:00 AM - 8:00 PM" },
    { day: t("Wednesday"), hours: "9:00 AM - 8:00 PM" },
    { day: t("Thursday"), hours: "9:00 AM - 8:00 PM" },
    { day: t("Friday"), hours: "9:00 AM - 9:00 PM" },
    { day: t("Saturday"), hours: "9:00 AM - 9:00 PM" },
    { day: t("Sunday"), hours: "10:00 AM - 6:00 PM" }
  ];
  
  return (
    <Card className="overflow-hidden shadow-sm border-blue-100">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Salon Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={profile?.avatar_url || ''} alt={profile?.salon_name || 'Salon'} />
                <AvatarFallback className="bg-blue-600 text-white text-xl">
                  {profile?.salon_name ? getInitials(profile.salon_name) : 'SL'}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold">{profile?.salon_name || t("Your Salon")}</h3>
                <p className="text-gray-600 flex items-center gap-1 mt-1 justify-center md:justify-start">
                  <MapPin className="h-4 w-4" />
                  {profile?.location || t("No location set")}
                </p>
                
                <div className="mt-4 flex gap-2">
                  <Button size="sm" onClick={handleEditProfile} className="flex items-center gap-1">
                    <Pencil className="h-3.5 w-3.5" />
                    {t("Edit Profile")}
                  </Button>
                  
                  <Button size="sm" variant="outline" onClick={handleViewPublicProfile} className="flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" />
                    {t("Public View")}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Salon Contact Information */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 md:mt-0 mt-4">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-500">{t("Contact Information")}</h4>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-md text-blue-700">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t("Phone")}</p>
                    <p className="font-medium">{profile?.phone || t("Not provided")}</p>
                  </div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm">
                  <div className="bg-indigo-100 p-2 rounded-md text-indigo-700">
                    <Link className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t("Website")}</p>
                    <p className="font-medium">{profile?.website || t("Not provided")}</p>
                  </div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 shadow-sm">
                  <div className="bg-pink-100 p-2 rounded-md text-pink-700">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t("Instagram")}</p>
                    <p className="font-medium">{profile?.instagram || t("Not provided")}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-500">{t("Business Hours")}</h4>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {t("View All")}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>{t("Business Hours")}</SheetTitle>
                        <SheetDescription>
                          {t("Set your salon's operating hours.")}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        {businessHours.map((item, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <p className="font-medium">{item.day}</p>
                            <p className="text-gray-600">{item.hours}</p>
                          </div>
                        ))}
                        
                        <Button className="w-full mt-4">
                          {t("Edit Hours")}
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                  {businessHours.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5">
                      <p className="text-sm font-medium">{item.day}</p>
                      <p className="text-sm text-gray-600">{item.hours}</p>
                    </div>
                  ))}
                  {businessHours.length > 3 && (
                    <p className="text-xs text-center text-blue-600 mt-2">
                      {t("+ 4 more days")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonInfoSection;
