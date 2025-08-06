import React from 'react';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import ArtistSettingsTab from '../../artist/tabs/ArtistSettingsTab';

interface ProfileSettingsTabProps {
  theme: ProfileThemeConfig;
}

const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({ theme }) => {
  // For now, reuse the existing ArtistSettingsTab
  // This can be enhanced later with theme-specific customizations
  return <ArtistSettingsTab />;
};

export default ProfileSettingsTab;