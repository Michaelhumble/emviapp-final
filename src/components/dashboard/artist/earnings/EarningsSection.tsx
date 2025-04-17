
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EarningsStats } from "./EarningsStats";
import { TransactionsTable } from "./TransactionsTable";
import { EarningsChart } from "./EarningsChart";
import { useEarningsData } from "./useEarningsData";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const EarningsSection = () => {
  const { isLoading, transactions, stats, chartData, sortTransactions } = useEarningsData();

  return (
    <div className="space-y-6">
      <Alert variant="default" className="bg-blue-50 border-blue-200 mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Earnings Info</AlertTitle>
        <AlertDescription>
          This section shows your earnings from completed bookings. You'll see earnings once clients have paid for services.
        </AlertDescription>
      </Alert>
      
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
