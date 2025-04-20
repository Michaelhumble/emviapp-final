
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useSalonBookings } from "./hooks/useSalonBookings";

function formatTimeString(time?: string) {
  if (!time) return "--";
  return time.replace(/^(\d{1,2}:\d{2}).*$/, "$1");
}

export default function BookingsOverviewCard() {
  const { bookings, loading } = useSalonBookings();

  // Only today's bookings (by date)
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const todaysBookings = bookings.filter(
    (b) => b.date && b.date.toISOString().slice(0, 10) === todayStr
  );

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-100 to-white border-0">
      <CardHeader className="pb-2 flex flex-row items-center gap-2">
        <Calendar className="h-6 w-6 text-blue-500" />
        <CardTitle className="text-lg sm:text-xl font-playfair">Today's Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-6 text-center text-gray-400">Loading bookings...</div>
        ) : todaysBookings.length === 0 ? (
          <div className="py-6 text-center text-gray-400">
            No appointments scheduled for today.
          </div>
        ) : (
          <div className="space-y-3">
            {todaysBookings.map((b) => (
              <div
                key={b.id}
                className="rounded-xl bg-white shadow-md px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{b.client_name}</div>
                  <div className="mt-0.5 text-xs text-gray-600">{b.service_name}</div>
                  <div className="mt-0.5 text-xs text-gray-400">
                    {b.date?.toLocaleDateString()} at {formatTimeString(b.time)}
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  {b.assigned_staff_name && (
                    <span className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                      {b.assigned_staff_name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
