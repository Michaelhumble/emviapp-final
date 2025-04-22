
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, DollarSign } from "lucide-react";

/**
 * Mock stats values for quick stats widget.
 * Edit these values as needed for demonstration.
 */
const STATS = [
  {
    icon: <Calendar className="w-7 h-7 text-[#9b87f5]" aria-hidden="true" />,
    value: 24,
    label: "Total Bookings",
    sublabel: "This Month",
  },
  {
    icon: <Eye className="w-7 h-7 text-[#7E69AB]" aria-hidden="true" />,
    value: 150,
    label: "Profile Views",
    sublabel: "This Month",
  },
  {
    icon: <DollarSign className="w-7 h-7 text-[#6E59A5]" aria-hidden="true" />,
    value: "$1,250",
    label: "Earnings",
    sublabel: "This Month",
  },
];

const cardBase =
  "flex-1 min-w-[150px] xs:min-w-[180px] bg-gradient-to-br from-[#F1F0FB]/80 via-[#E5DEFF]/70 to-white " +
  "rounded-2xl border-0 shadow-[0_4px_20px_0_rgba(155,135,245,0.05)] px-3 xs:px-4 py-4 xs:py-5 " +
  "flex flex-col items-center gap-2 transition-all hover:scale-[1.03] hover:shadow-md duration-200 ease-in-out";

const labelStyle =
  "text-[11px] xs:text-xs md:text-sm font-medium text-gray-500 mt-1 tracking-wide";

const valueStyle =
  "font-playfair text-2xl xs:text-3xl md:text-4xl font-bold text-emvi-dark mb-0.5";

const sublabelStyle =
  "text-[11px] xs:text-xs text-emvi-accent mt-1 opacity-80";

const ArtistQuickStats: React.FC = () => (
  <div className="w-full mb-4 xs:mb-6">
    <div
      className="flex flex-col xs:flex-row xs:items-stretch gap-3 xs:gap-4 w-full sm:grid sm:grid-cols-3"
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
