
import { useAuth } from "@/context/auth";
import ArtistDashboardWidgets from "./ArtistDashboardWidgets";
import ArtistAssignmentStats from "./widgets/ArtistAssignmentStats";
import { AppointmentsSection } from "./appointments/AppointmentsSection";

export default function ArtistDashboard() {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-8">
      <ArtistDashboardWidgets />
      {userProfile?.role === "artist" && userProfile?.independent === false && (
        <ArtistAssignmentStats />
      )}
      <AppointmentsSection />
    </div>
  );
}
