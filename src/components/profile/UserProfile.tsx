import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Sparkles, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { profileTranslations } from '@/translations/profile';
import PremiumFeatureGate from '@/components/upgrade/PremiumFeatureGate';

const UserProfile = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [isBoosted, setIsBoosted] = useState(false);

  useEffect(() => {
    // Simulate checking if the profile is boosted
    // In a real implementation, you would check against a database or API
    setIsBoosted(Math.random() > 0.5);
  }, []);

  const handleBoostProfile = () => {
    // Simulate boosting the profile
    // In a real implementation, you would call an API to boost the profile
    console.log('Boosting profile...');
    setIsBoosted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-white">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={userProfile?.profile_image || ""} alt={user?.email || "User"} />
        <AvatarFallback>{user?.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{userProfile?.full_name || user?.email}</h2>
      <p className="text-gray-500 mb-4">{userProfile?.bio || "No bio available"}</p>

      <div className="flex space-x-4">
        <Button asChild variant="outline">
          <Link to="/profile/edit" className="flex items-center">
            <Settings className="mr-1 h-4 w-4" />
            {t(profileTranslations.buttons.editProfile)}
          </Link>
        </Button>
        <PremiumFeatureGate feature="boost-visibility">
          <Button
            onClick={handleBoostProfile}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium px-3 py-1 rounded-md border-0"
          >
            <Sparkles className="mr-1 h-4 w-4" />
            {t(profileTranslations.buttons.boostProfile)}
          </Button>
        </PremiumFeatureGate>
      </div>

      {isBoosted && (
        <div className="mt-4 text-green-600">
          <CheckCircle className="inline-block mr-1 h-5 w-5" />
          {t(profileTranslations.status.profileBoosted)}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
