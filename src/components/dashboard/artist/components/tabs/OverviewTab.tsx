
import StatsGrid from "../StatsGrid";
import MainGrid from "../MainGrid";
import LoadingState from "./LoadingState";

const OverviewTab = ({ 
  stats, 
  isLoadingStats, 
  bookings, 
  isLoadingBookings 
}: { 
  stats: any;
  isLoadingStats: boolean;
  bookings: any[];
  isLoadingBookings: boolean;
}) => {
  return (
    <div className="space-y-4">
      {isLoadingStats && isLoadingBookings ? (
        <LoadingState message="Loading your dashboard data..." />
      ) : (
        <>
          <StatsGrid stats={stats} isLoading={isLoadingStats} />
          <MainGrid 
            bookings={bookings}
            isLoadingBookings={isLoadingBookings}
            stats={stats}
          />
        </>
      )}
      {/* Portfolio Highlights section temporarily removed for space optimization */}
      {/* <PortfolioShowcase isPreview={true} /> */}
    </div>
  );
};

export default OverviewTab;
