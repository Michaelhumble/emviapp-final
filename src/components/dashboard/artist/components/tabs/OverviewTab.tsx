
import { useAuth } from "@/context/auth";
import ArtistStats from "../ArtistStats";
import { Button } from "@/components/ui/button";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";

const OverviewTab = () => {
  const { userProfile } = useAuth();

  // Render profile completion warning if profile is incomplete
  const renderProfileCompletion = () => {
    if (userProfile && (!userProfile.bio || !userProfile.specialty || !userProfile.avatar_url)) {
      return (
        <div className="mb-6">
          <ProfileCompletionCard />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {renderProfileCompletion()}
      <ArtistStats />
      <div className="flex justify-center mt-6">
        <Button variant="outline">View All Bookings</Button>
      </div>
    </div>
  );
};

export default OverviewTab;
