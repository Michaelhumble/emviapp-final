import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const earningsData = [
  { week: "Week 1", earnings: 250 },
  { week: "Week 2", earnings: 400 },
  { week: "Week 3", earnings: 350 },
  { week: "Week 4", earnings: 250 }
];

const CustomTooltip = ({ active, payload }: any) =>
  active && payload && payload.length ? (
    <div className="rounded-lg bg-white/90 shadow px-3 py-1 text-xs text-[#1A1F2C] font-medium border border-[#F1F0FB]">
      ${payload[0].value?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
      className="w-full max-w-2xl mx-auto px-2 xs:px-0 mb-4"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Card className="bg-white/60 glassmorphism border-0 shadow-md pb-0 overflow-hidden">
          <CardHeader className="!p-4 xs:!p-5 sm:!p-6 pb-2 xs:pb-3 bg-gradient-to-r from-[#F1F0FB] via-white to-[#E5DEFF] rounded-t-2xl">
            <CardTitle className="font-serif text-lg xs:text-xl font-semibold text-emvi-dark">
              Your Earnings This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-7 px-4 xs:px-5 sm:px-6 pt-3 xs:pt-4 pb-4">
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="font-playfair text-2xl xs:text-3xl sm:text-4xl font-bold text-emvi-accent mb-0.5 xs:mb-1">
                $1,250.00
              </span>
              <span className="text-xs xs:text-sm text-neutral-500 font-medium mb-0.5 xs:mb-1">
                5 completed bookings
              </span>
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto mt-1 text-emvi-accent font-medium underline decoration-emvi-accent text-xs hover:text-primary hover:opacity-90"
                onClick={handleDetailedReport}
                aria-label="View Detailed Report"
              >
                View Detailed Report
                <ExternalLink className="h-3.5 w-3.5 xs:h-4 xs:w-4 ml-1 opacity-60" />
              </Button>
            </div>
            <div className="w-full sm:w-1/2 min-w-[160px] xs:min-w-[180px] sm:max-w-[270px] h-20 xs:h-24 sm:h-28 mb-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData} barCategoryGap="40%">
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#A690D9" }}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#E5DEFF66" }} />
                  <Bar
                    dataKey="earnings"
                    fill="#9b87f5"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                    isAnimationActive
                  />
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
