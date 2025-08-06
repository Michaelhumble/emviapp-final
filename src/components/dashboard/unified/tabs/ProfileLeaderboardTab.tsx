import React from 'react';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import ArtistLeaderboardTab from '../../artist/tabs/ArtistLeaderboardTab';

interface ProfileLeaderboardTabProps {
  theme: ProfileThemeConfig;
}

const ProfileLeaderboardTab: React.FC<ProfileLeaderboardTabProps> = ({ theme }) => {
  // For now, reuse the existing ArtistLeaderboardTab
  // This can be enhanced later with theme-specific customizations
  return <ArtistLeaderboardTab />;
};

export default ProfileLeaderboardTab;