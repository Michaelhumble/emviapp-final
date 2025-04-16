
import React from 'react';
import ProfileCompletionWarning from "../overview/ProfileCompletionWarning";
import ArtistStats from "../ArtistStats";
import ViewAllBookingsButton from "../overview/ViewAllBookingsButton";
import ReferralWidget from "../ReferralWidget"; // We'll create this component

const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <ProfileCompletionWarning />
      <ArtistStats />
      <ReferralWidget />
      <ViewAllBookingsButton />
    </div>
  );
};

export default OverviewTab;
