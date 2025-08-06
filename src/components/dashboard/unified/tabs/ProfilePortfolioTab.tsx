import React from 'react';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import ArtistPortfolioTab from '../../artist/tabs/ArtistPortfolioTab';

interface ProfilePortfolioTabProps {
  theme: ProfileThemeConfig;
}

const ProfilePortfolioTab: React.FC<ProfilePortfolioTabProps> = ({ theme }) => {
  // For now, reuse the existing ArtistPortfolioTab
  // This can be enhanced later with theme-specific customizations
  return <ArtistPortfolioTab />;
};

export default ProfilePortfolioTab;