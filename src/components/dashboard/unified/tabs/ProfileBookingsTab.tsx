import React from 'react';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import ArtistBookingsTab from '../../artist/tabs/ArtistBookingsTab';

interface ProfileBookingsTabProps {
  theme: ProfileThemeConfig;
}

const ProfileBookingsTab: React.FC<ProfileBookingsTabProps> = ({ theme }) => {
  // For now, reuse the existing ArtistBookingsTab
  // This can be enhanced later with theme-specific customizations
  return <ArtistBookingsTab />;
};

export default ProfileBookingsTab;