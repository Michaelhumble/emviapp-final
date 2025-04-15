
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StatCard from "./StatCard";
import { EarningsData } from "../types/ArtistDashboardTypes";

interface EarningsSectionProps {
  earningsData: EarningsData | null;
  isLoading: boolean;
}

const EarningsSection = ({ earningsData, isLoading }: EarningsSectionProps) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Earnings"
          value={earningsData?.total_earnings || 0}
          description="Lifetime earnings"
          loading={isLoading}
          prefix="$"
        />
        <StatCard
          title="Pending Payout"
          value={earningsData?.pending_payouts || 0}
          description="To be paid out"
          loading={isLoading}
          prefix="$"
        />
        <StatCard
          title="This Month"
          value={
            earningsData?.monthly_earnings && earningsData.monthly_earnings.length > 0
              ? earningsData.monthly_earnings[earningsData.monthly_earnings.length - 1].amount
              : 0
          }
          description="Current month earnings"
          loading={isLoading}
          prefix="$"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
          <CardDescription>
            Your earnings over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="h-[300px]">
              <div className="flex items-end justify-between h-full pt-6">
                {(earningsData?.monthly_earnings || Array(6).fill({ month: '', amount: 0 }))
                  .slice(0, 6)
                  .map((month, i) => {
                    const maxAmount = Math.max(
                      ...(earningsData?.monthly_earnings || [])
                        .map(m => m.amount || 0)
                    ) || 1;
                    
                    const heightPercentage = ((month.amount || 0) / maxAmount) * 200;
                    const safeHeight = Math.max(heightPercentage, 20);
                    
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div 
                          className="w-12 bg-primary rounded-t-md" 
                          style={{ height: `${safeHeight}px` }}
                        ></div>
                        <span className="text-xs mt-2">{month.month || `Month ${i+1}`}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EarningsSection;
