
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const mockData = {
  monthEarnings: 1450,
  completedBookings: 12,
};

export default function EarningsSummaryCard() {
  return (
    <section className="w-full mb-2 md:mb-4" aria-label="Earnings Summary">
      <Card className="flex flex-col gap-0 rounded-2xl border-0 shadow-md bg-gradient-to-br from-[#F1F0FB] via-[#E5DEFF]/70 to-white px-0 md:px-2 py-3">
        <CardContent className="flex flex-col sm:flex-row items-center sm:justify-between px-4 py-6 sm:py-7 sm:px-8 gap-6">
          <div className="flex items-center gap-4 w-full">
            <span className="flex items-center justify-center shrink-0 h-14 w-14 rounded-full bg-[#ede9fe]">
              <DollarSign className="h-7 w-7 text-[#9b87f5]" strokeWidth={2.2} />
            </span>
            <div className="flex flex-col">
              <span className="font-playfair text-3xl md:text-4xl font-bold text-emvi-dark tracking-tight">
                ${mockData.monthEarnings.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm md:text-base font-medium mt-0.5">
                This Month
              </span>
              <span className="text-xs text-emvi-accent mt-1">
                {mockData.completedBookings} Completed
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between h-full min-w-[130px] mt-4 sm:mt-0">
            <Link
              to="#"
              tabIndex={-1}
              className="w-fit inline-block px-3 py-1.5 rounded-lg text-emvi-accent text-[15px] font-semibold tracking-wide bg-emvi-accent/10 hover:bg-emvi-accent/20 transition"
            >
              View Details
            </Link>
            <span className="text-xs text-gray-400 font-serif mt-3 sm:mt-5 text-right">
              Payouts processed every Friday
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
