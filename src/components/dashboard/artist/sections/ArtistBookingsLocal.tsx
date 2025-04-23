
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ClockIcon } from "lucide-react";
import { useLocalBookings } from "@/components/artist-profile/hooks/useLocalBookings";

const statusClasses =
  "rounded-full bg-gradient-to-r from-yellow-200 to-yellow-100 text-yellow-700 px-3 py-1 text-xs font-semibold shadow border-0";

const ArtistBookingsLocal = () => {
  const { bookings } = useLocalBookings();

  if (!bookings.length) return null;

  return (
    <Card className="border-purple-100 shadow-sm mt-6">
      <CardHeader className="bg-gradient-to-r from-soft-gray to-white border-b border-purple-50">
        <CardTitle className="text-lg font-serif flex items-center gap-2">
          Incoming Bookings (Local Demo)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-100">
          {bookings
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((b) => (
              <li key={b.id} className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-soft-gray transition rounded">
                <div className="flex-1">
                  <div className="font-medium text-base">{b.clientName}</div>
                  <div className="flex items-center gap-5 text-sm text-gray-600">
                    <span>{b.service}</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{b.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{b.time}</span>
                    </span>
                  </div>
                  {b.note && (
                    <div className="mt-1 text-xs italic text-muted-foreground">
                      "{b.note}"
                    </div>
                  )}
                </div>
                <span className={statusClasses + " mt-3 md:mt-0 md:ml-4"}>
                  {b.status}
                </span>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ArtistBookingsLocal;
