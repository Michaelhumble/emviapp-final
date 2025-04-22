
import StatsGrid from "../StatsGrid";
import MainGrid from "../MainGrid";
import PortfolioShowcase from "./PortfolioShowcase";

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
      <StatsGrid stats={stats} isLoading={isLoadingStats} />
      <MainGrid 
        bookings={bookings}
        isLoadingBookings={isLoadingBookings}
        stats={stats}
      />
      <PortfolioShowcase />
    </div>
  );
};

export default OverviewTab;
