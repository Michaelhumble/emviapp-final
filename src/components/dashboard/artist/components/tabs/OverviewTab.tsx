
import ProfileCompletionWarning from "../overview/ProfileCompletionWarning";
import ArtistStats from "../ArtistStats";
import ViewAllBookingsButton from "../overview/ViewAllBookingsButton";

const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <ProfileCompletionWarning />
      <ArtistStats />
      <ViewAllBookingsButton />
    </div>
  );
};

export default OverviewTab;
