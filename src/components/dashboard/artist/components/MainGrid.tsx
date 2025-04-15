
import { BookingWithDetails, DashboardStats } from "../types/ArtistDashboardTypes";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import RecentActivity from "./RecentActivity";
import PerformanceMetrics from "./PerformanceMetrics";

interface MainGridProps {
  bookings: BookingWithDetails[];
  isLoadingBookings: boolean;
  stats: DashboardStats;
}

const MainGrid = ({ bookings, isLoadingBookings, stats }: MainGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <FallbackBoundary>
        <RecentActivity 
          bookings={bookings || []}
          isLoading={isLoadingBookings}
        />
      </FallbackBoundary>
      <FallbackBoundary>
        <PerformanceMetrics stats={stats} />
      </FallbackBoundary>
    </div>
  );
};

export default MainGrid;
