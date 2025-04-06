
import ArtistLoadingState from "./components/ArtistLoadingState";
import ArtistErrorState from "./components/ArtistErrorState";
import ArtistDashboardContent from "./components/ArtistDashboardContent";
import { ArtistDataProvider, useArtistData } from "./context/ArtistDataContext";

const ArtistDashboardInner = () => {
  const { loading, error, refreshArtistProfile } = useArtistData();
  
  // Show loading state
  if (loading) {
    return <ArtistLoadingState />;
  }
  
  // Show error state
  if (error) {
    return <ArtistErrorState errorMessage={error} onRetry={refreshArtistProfile} />;
  }
  
  // Show dashboard content
  return <ArtistDashboardContent />;
};

const ArtistDashboard = () => {
  return (
    <ArtistDataProvider>
      <ArtistDashboardInner />
    </ArtistDataProvider>
  );
};

export default ArtistDashboard;
