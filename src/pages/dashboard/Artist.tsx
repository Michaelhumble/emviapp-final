
import { ProfileCompletionGuard } from "@/components/profile/guards/ProfileCompletionGuard";
import { ArtistDashboardWidgets } from "@/components/dashboard/artist/ArtistDashboardWidgets";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";

export default function ArtistDashboardPage() {
  const { userRole } = useAuth();
  
  return (
    <Layout>
      <ProfileCompletionGuard role={userRole || 'artist'}>
        <ArtistDashboardWidgets />
      </ProfileCompletionGuard>
    </Layout>
  );
}
