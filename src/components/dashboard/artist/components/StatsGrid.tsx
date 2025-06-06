
import { DashboardStats } from "../types/ArtistDashboardTypes";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import StatCard from "./StatCard";

interface StatsGridProps {
  stats: DashboardStats;
  isLoading: boolean;
}

const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <FallbackBoundary>
        <StatCard
          title="Bookings"
          value={stats?.booking_count || 0}
          description="Total bookings"
          loading={isLoading}
        />
      </FallbackBoundary>
      <FallbackBoundary>
        <StatCard
          title="Services"
          value={stats?.completed_services || 0}
          description="Completed services"
          loading={isLoading}
        />
      </FallbackBoundary>
      <FallbackBoundary>
        <StatCard
          title="Earnings"
          value={stats?.total_earnings || 0}
          description="Total earnings"
          loading={isLoading}
          prefix="$"
        />
      </FallbackBoundary>
      <FallbackBoundary>
        <StatCard
          title="Referrals"
          value={stats?.referral_count || 0}
          description="Client referrals"
          loading={isLoading}
        />
      </FallbackBoundary>
    </div>
  );
};

export default StatsGrid;
