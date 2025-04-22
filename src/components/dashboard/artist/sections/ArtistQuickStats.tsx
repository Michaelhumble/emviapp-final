
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, DollarSign } from "lucide-react";

/**
 * Mock stats values for quick stats widget.
 * Edit these values as needed for demonstration.
 */
const STATS = [
  {
    icon: <Calendar className="w-6 h-6 xs:w-7 xs:h-7 text-[#9b87f5]" aria-hidden="true" />,
    value: 24,
    label: "Total Bookings",
    sublabel: "This Month",
  },
  {
    icon: <Eye className="w-6 h-6 xs:w-7 xs:h-7 text-[#7E69AB]" aria-hidden="true" />,
    value: 150,
    label: "Profile Views",
    sublabel: "This Month",
  },
  {
    icon: <DollarSign className="w-6 h-6 xs:w-7 xs:h-7 text-[#6E59A5]" aria-hidden="true" />,
    value: "$1,250",
    label: "Earnings",
    sublabel: "This Month",
  },
];

const cardBase =
  "flex-1 min-w-[130px] xs:min-w-[150px] sm:min-w-[180px] bg-gradient-to-br from-[#F1F0FB]/80 via-[#E5DEFF]/70 to-white " +
  "rounded-2xl border-0 shadow-[0_4px_20px_0_rgba(155,135,245,0.05)] px-2 xs:px-3 sm:px-4 py-3 xs:py-4 sm:py-5 " +
  "flex flex-col items-center gap-1.5 xs:gap-2 transition-all hover:scale-[1.03] hover:shadow-md duration-200 ease-in-out";

const labelStyle =
  "text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium text-gray-500 mt-0.5 xs:mt-1 tracking-wide";

const valueStyle =
  "font-playfair text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-emvi-dark";

const sublabelStyle =
  "text-[9px] xs:text-[10px] sm:text-xs text-emvi-accent mt-0.5 xs:mt-1 opacity-80";

const ArtistQuickStats: React.FC = () => (
  <div className="w-full px-2 xs:px-0 mb-3 xs:mb-4 sm:mb-6">
    <div
      className="flex flex-col xs:flex-row xs:items-stretch gap-2 xs:gap-3 sm:gap-4 w-full sm:grid sm:grid-cols-3"
    >
      {STATS.map((stat, i) => (
        <Card key={stat.label} className={cardBase}>
          <CardContent className="flex flex-col items-center justify-center p-0">
            <span className="mb-1">{stat.icon}</span>
            <div className={valueStyle} aria-label={stat.label}>{stat.value}</div>
            <div className={labelStyle}>{stat.label}</div>
            <div className={sublabelStyle}>{stat.sublabel}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ArtistQuickStats;
