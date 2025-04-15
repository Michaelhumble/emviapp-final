
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { EarningsData } from "../types/ArtistDashboardTypes";
import StatCard from "./StatCard";

interface EarningsSectionProps {
  earningsData: EarningsData;
  isLoading: boolean;
}

const EarningsSection = ({ earningsData, isLoading }: EarningsSectionProps) => {
  return (
    <Card className="shadow-sm border-green-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif">Earnings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
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
              earningsData?.monthly_earnings?.length > 0
                ? earningsData.monthly_earnings[earningsData.monthly_earnings.length - 1].amount
                : 0
            }
            description="Current month earnings"
            loading={isLoading}
            prefix="$"
          />
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium mb-4">Monthly Earnings</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={earningsData?.monthly_earnings || []}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`} 
                  width={60}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsSection;
