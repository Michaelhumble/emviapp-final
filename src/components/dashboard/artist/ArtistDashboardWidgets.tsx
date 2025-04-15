
import { useArtistDashboardData } from "./hooks/useArtistDashboardData";

export function ArtistDashboardWidgets() {
  const { data, isLoading, error } = useArtistDashboardData();

  if (isLoading) return <div className="p-4">Loading your dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">Something went wrong. Please try again later.</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      <div className="rounded-lg bg-white shadow p-4">
        <h3 className="text-lg font-medium">Total Earnings</h3>
        <p className="text-2xl font-bold">${data.totalEarnings.toFixed(2)}</p>
      </div>

      <div className="rounded-lg bg-white shadow p-4">
        <h3 className="text-lg font-medium">Completed Bookings</h3>
        <p className="text-2xl font-bold">{data.completedBookings}</p>
      </div>

      <div className="rounded-lg bg-white shadow p-4">
        <h3 className="text-lg font-medium">Average Rating</h3>
        <p className="text-2xl font-bold">{data.averageRating.toFixed(1)}</p>
      </div>

      <div className="rounded-lg bg-white shadow p-4">
        <h3 className="text-lg font-medium">Referrals</h3>
        <p className="text-2xl font-bold">{data.referralCount}</p>
      </div>

      <div className="rounded-lg bg-white shadow p-4">
        <h3 className="text-lg font-medium">Pending Payouts</h3>
        <p className="text-2xl font-bold">${data.pendingPayouts.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ArtistDashboardWidgets;
