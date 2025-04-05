
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';

interface ProfileContextType {
  loading: boolean;
  profileData: any | null;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType>({
  loading: true,
  profileData: null,
  refreshProfile: async () => {}
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, userProfile, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any | null>(null);

  useEffect(() => {
    if (userProfile) {
      setProfileData(userProfile);
      setLoading(false);
    } else if (!user) {
      setLoading(false);
    }
  }, [user, userProfile]);

  const refreshProfile = async () => {
    setLoading(true);
    await refreshUser();
    setLoading(false);
  };

  return (
    <ProfileContext.Provider value={{ loading, profileData, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
