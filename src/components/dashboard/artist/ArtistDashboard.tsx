
import { useAuth } from "@/context/auth";
import ArtistDashboardWidgets from "./ArtistDashboardWidgets";
import ArtistAssignmentStats from "./widgets/ArtistAssignmentStats";

export default function ArtistDashboard() {
  const { userProfile } = useAuth();

  return (
    <div>
      <ArtistDashboardWidgets />
      {userProfile?.role === "artist" && userProfile?.independent === false && (
        <ArtistAssignmentStats />
      )}
    </div>
  );
}
