
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EarningsStats } from "./EarningsStats";
import { TransactionsTable } from "./TransactionsTable";
import { EarningsChart } from "./EarningsChart";
import { useEarningsData } from "./useEarningsData";

export const EarningsSection = () => {
  const { isLoading, transactions, stats, chartData, sortTransactions } = useEarningsData();

  return (
    <div className="space-y-6">
      <EarningsStats {...stats} isLoading={isLoading} />
      
      <Card>
        <CardHeader>
          <CardTitle>Earnings Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <EarningsChart data={chartData} isLoading={isLoading} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable 
            transactions={transactions}
            isLoading={isLoading}
            onSort={sortTransactions}
          />
        </CardContent>
      </Card>
    </div>
  );
};
