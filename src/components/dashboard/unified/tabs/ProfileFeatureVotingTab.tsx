import React from 'react';
import { ProfileThemeConfig } from '@/utils/profileThemes';
import ArtistFeatureVotingTab from '../../artist/tabs/ArtistFeatureVotingTab';

interface ProfileFeatureVotingTabProps {
  theme: ProfileThemeConfig;
}

const ProfileFeatureVotingTab: React.FC<ProfileFeatureVotingTabProps> = ({ theme }) => {
  // For now, reuse the existing ArtistFeatureVotingTab
  // This can be enhanced later with theme-specific customizations
  return <ArtistFeatureVotingTab />;
};

export default ProfileFeatureVotingTab;