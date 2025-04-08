
import React from "react";
import { BookingCounts } from "../types/ArtistDashboardTypes";
import { useTranslation } from "@/hooks/useTranslation";

interface BookingCountsDisplayProps {
  counts: BookingCounts;
}

const BookingCountsDisplay = ({ counts }: BookingCountsDisplayProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex gap-4 mt-2 md:mt-0">
      <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-amber-800 text-sm">
        {t({
          english: "Pending",
          vietnamese: "Đang Chờ"
        })}: {counts.pending}
      </div>
      <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 text-sm">
        {t({
          english: "Upcoming",
          vietnamese: "Sắp Tới"
        })}: {counts.upcoming}
      </div>
    </div>
  );
};

export default BookingCountsDisplay;
