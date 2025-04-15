
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalonSelectorDropdown } from "./SalonSelectorDropdown";
import { DateRangeSelector } from "./DateRangeSelector";
import { SalonData } from "@/hooks/useOwnerDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface SalonDashboardHeaderProps {
  salons: SalonData[];
  currentSalon: SalonData | null;
  onSalonSelect: (salonId: string) => void;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
  dateRangeFilter: string;
  onDateRangeChange: (range: string) => void;
}

export function SalonDashboardHeader({
  salons,
  currentSalon,
  onSalonSelect,
  onRefresh,
  isLoading,
  dateRangeFilter,
  onDateRangeChange
}: SalonDashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-serif font-semibold">
                {currentSalon?.salon_name || "Salon Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                {currentSalon?.location
                  ? `Located in ${currentSalon.location}`
                  : "Manage your salon operations and performance"}
              </p>
            </motion.div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <DateRangeSelector 
            value={dateRangeFilter} 
            onChange={onDateRangeChange} 
          />
          
          <SalonSelectorDropdown
            salons={salons}
            currentSalon={currentSalon}
            onSelect={onSalonSelect}
            isLoading={isLoading}
          />
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={onRefresh}
            disabled={isLoading}
            className="h-10 w-10"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>
    </div>
  );
}
