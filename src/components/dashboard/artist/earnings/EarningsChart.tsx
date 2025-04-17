
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsData {
  date: string;
  amount: number;
}

interface EarningsChartProps {
  data: EarningsData[];
  isLoading?: boolean;
}

export const EarningsChart = ({ data, isLoading }: EarningsChartProps) => {
  if (isLoading) {
    return <div className="w-full h-[300px] bg-gray-50 rounded-lg animate-pulse" />;
  }

  return (
    <Card className="p-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Earnings']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
