import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Dynamic date range helpers
function getWeekRangesOfMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const weeks = [];
  let week = 1;
  while (date.getMonth() === month) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(start.getDate() + 6 - start.getDay());
    if (end.getMonth() !== month) end.setDate(new Date(year, month + 1, 0).getDate());
    weeks.push({
      label: `${start.toLocaleString("en-US", { month: "short" })} ${start.getDate()}-${end.getDate()}`,
      week: `Week ${week}`,
      start: new Date(start),
      end: new Date(end),
    });
    date.setDate(end.getDate() + 1);
    week++;
  }
  return weeks.slice(0, 4); // always 4 weeks for graph
}

const BOOKINGS_PER_WEEK = [2, 1, 1, 1];
const earningsData = [250, 400, 350, 250].map((amt, i) => ({
  earnings: amt,
  bookings: BOOKINGS_PER_WEEK[i],
}));

const now = new Date();
const weeks = getWeekRangesOfMonth(now.getFullYear(), now.getMonth());
const data = weeks.map((range, i) => ({
  ...earningsData[i],
  week: range.label,
}));

const CustomTooltip = ({ active, payload }: any) =>
  active && payload && payload.length ? (
    <div className="rounded-xl bg-white/95 shadow px-4 py-2 border border-[#e5deff] text-sm min-w-[126px]">
      <div className="font-semibold text-emvi-accent mb-0.5">
        ${payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
      <div className="text-xs text-gray-600">
        <span className="block">Bookings: {payload[0].payload.bookings}</span>
      </div>
    </div>
  ) : null;

const goal = 2000;
const earned = 1250;
const progressPct = Math.min((earned / goal) * 100, 100);

const EarningsSnapshot: React.FC = () => {
  const handleDetailedReport = () => {
    toast.info("Detailed Report Coming Soon", {
      description: "Advanced financial insights are in development.",
      duration: 3000,
    });
  };

  return (
    <motion.section
      aria-label="Earnings Snapshot"
      className="w-full max-w-2xl mx-auto px-2 xs:px-0 mb-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Card 
          className="bg-purple-50/50 backdrop-blur-md border-0 shadow-lg rounded-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-purple-200/30 opacity-50 pointer-events-none" />
          
          <CardHeader className="!p-5 xs:!p-6 pb-1 relative z-10">
            <div className="absolute right-4 top-4 opacity-20 pointer-events-none">
              <TrendingUp className="w-16 h-16 text-purple-500" />
            </div>
            <CardTitle className="font-serif text-lg xs:text-xl font-semibold text-emvi-dark flex items-center gap-2">
              💰 This Month's Earnings Snapshot
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10 px-5 xs:px-6 pt-3 xs:pt-4 pb-4">
            <div className="text-xs xs:text-sm text-purple-600 font-semibold uppercase tracking-wide mb-2 text-center">
              Great Job, You're Building Momentum!
            </div>
            
            <div 
              className="font-playfair text-[2.6rem] xs:text-[2.9rem] sm:text-[3rem] font-extrabold inline-block mb-1 tracking-tight 
              bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text text-center w-full"
            >
              $1,250.00
            </div>
            
            <div className="text-[13px] xs:text-base text-neutral-600 text-center mb-4">
              $1,250.00 earned from 5 bookings this month — let's aim higher!
            </div>
            
            <div className="mt-3 w-full max-w-md mx-auto">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-emvi-dark/90">Goal: $2,000</span>
                <span className="text-xs text-gray-500">63%</span>
              </div>
              <div className="w-full rounded-full bg-purple-100 h-2.5 xs:h-3 shadow-inner overflow-hidden relative">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                  style={{ width: '63%' }}
                />
              </div>
              <div className="block mt-1 text-xs text-gray-500 text-center">
                $750 more to reach your goal
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 gap-2"
                onClick={handleDetailedReport}
              >
                <TrendingUp className="h-4 w-4" />
                View Full Earnings Breakdown
              </Button>
            </div>
            
            <div className="flex justify-center mt-4 space-x-2">
              {['Apr 1-5', 'Apr 6-12', 'Apr 13-19', 'Apr 20-26'].map((range) => (
                <span 
                  key={range} 
                  className="text-xs text-gray-500 px-2 py-1 rounded-full hover:bg-purple-100 cursor-pointer"
                >
                  {range}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default EarningsSnapshot;
