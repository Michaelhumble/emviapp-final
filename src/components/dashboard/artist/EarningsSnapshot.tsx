
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// Helper to calculate week ranges for the current month
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

const BOOKINGS_PER_WEEK = [2, 1, 1, 1]; // mock: bookings count per week

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
    <div className="rounded-xl bg-white/95 shadow px-4 py-2 border border-[#e5deff] text-sm min-w-[110px]">
      <div className="font-semibold text-emvi-accent mb-0.5">${payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
      <div className="text-xs text-gray-600">
        <span className="block">Bookings: {payload[0].payload.bookings}</span>
      </div>
    </div>
  ) : null;

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
        <Card className="bg-white/60 border-0 shadow-md glassmorphism pb-0 overflow-hidden">
          <CardHeader className="!p-4 xs:!p-5 sm:!p-6 pb-2 xs:pb-3 bg-gradient-to-r from-[#F1F0FB] via-white to-[#E5DEFF] rounded-t-2xl">
            <CardTitle className="font-serif text-lg xs:text-xl font-semibold text-emvi-dark flex items-center gap-2">
              <span className="select-none">💰</span>
              This Month’s Earnings Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-7 px-4 xs:px-5 sm:px-6 pt-3 xs:pt-4 pb-4">
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span
                className="font-playfair text-[2.4rem] xs:text-5xl sm:text-6xl font-extrabold inline-block mb-1 tracking-tight bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text drop-shadow"
                style={{
                  lineHeight: 1.05,
                  letterSpacing: "-.02em",
                }}
              >
                $1,250.00
              </span>
              <span className="text-[13px] xs:text-base text-neutral-500 font-medium mb-1">
                You've completed 5 bookings — Keep up the momentum!
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-[15px] px-3 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] text-white font-semibold rounded-lg shadow hover:from-[#7e69ab] hover:to-[#d6bcfa]/90 transition-all inline-flex gap-1 items-center"
                onClick={handleDetailedReport}
                aria-label="View Full Earnings Breakdown"
                style={{
                  background: "linear-gradient(90deg, #9b87f5 0%, #D6BCFA 100%)",
                  color: "#fff",
                  boxShadow: "0 2px 10px 0 rgba(155,135,245,0.11)",
                }}
              >
                📈 View Full Earnings Breakdown
                <ExternalLink className="h-4 w-4 ml-1 opacity-80" />
              </Button>
            </div>
            <div className="w-full sm:w-1/2 min-w-[160px] xs:min-w-[180px] sm:max-w-[270px] h-20 xs:h-24 sm:h-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  barCategoryGap="38%"
                  margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9b87f5" }}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#E5DEFF85" }} />
                  <Bar
                    dataKey="earnings"
                    fill="url(#EmviEarningsBar)"
                    radius={[7, 7, 0, 0]}
                    maxBarSize={30}
                    isAnimationActive
                  >
                    {/* Custom bar gradient */}
                    <defs>
                      <linearGradient id="EmviEarningsBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9b87f5" />
                        <stop offset="100%" stopColor="#D6BCFA" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default EarningsSnapshot;
