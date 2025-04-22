
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/context/auth/types";
import MetricsPanel from "../components/MetricsPanel";
import RecentTestimonials from "../components/RecentTestimonials";
import MessagesPreview from "../components/MessagesPreview";
import MiniCalendar from "../components/MiniCalendar";
import { motion } from "framer-motion";

interface OverviewTabProps {
  profile: UserProfile | null;
}

const OverviewTab = ({ profile }: OverviewTabProps) => {
  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lg:col-span-2 space-y-6">
        <MetricsPanel />
        <RecentTestimonials />
      </div>
      
      <div className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Your Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniCalendar />
          </CardContent>
        </Card>
        
        <MessagesPreview />
      </div>
    </motion.div>
  );
};

export default OverviewTab;
