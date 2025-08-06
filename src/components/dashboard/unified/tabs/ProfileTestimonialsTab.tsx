import React from 'react';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import ArtistTestimonialsTab from '../../artist/tabs/ArtistTestimonialsTab';

interface ProfileTestimonialsTabProps {
  theme: ProfileThemeConfig;
}

const ProfileTestimonialsTab: React.FC<ProfileTestimonialsTabProps> = ({ theme }) => {
  // For now, reuse the existing ArtistTestimonialsTab
  // This can be enhanced later with theme-specific customizations
  return <ArtistTestimonialsTab />;
};

export default ProfileTestimonialsTab;