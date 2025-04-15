
import { ProfileCompletionGuard } from "@/components/profile/guards/ProfileCompletionGuard";
import { ArtistDashboardWidgets } from "@/components/dashboard/artist/ArtistDashboardWidgets";
import Layout from "@/components/layout/Layout";

export default function ArtistDashboardPage() {
  return (
    <Layout>
      <ProfileCompletionGuard role="artist">
        <ArtistDashboardWidgets />
      </ProfileCompletionGuard>
    </Layout>
  );
}
