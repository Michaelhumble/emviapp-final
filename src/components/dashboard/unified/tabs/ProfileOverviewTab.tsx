import React from 'react';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import ArtistOverviewTab from '../../artist/tabs/ArtistOverviewTab';

interface ProfileOverviewTabProps {
  theme: ProfileThemeConfig;
}

const ProfileOverviewTab: React.FC<ProfileOverviewTabProps> = ({ theme }) => {
  // For now, reuse the existing ArtistOverviewTab
  // This can be enhanced later with theme-specific customizations
  return <ArtistOverviewTab />;
};

export default ProfileOverviewTab;