
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

export interface Transaction {
  id: string;
  date: string;
  clientName: string;
  serviceName: string;
  price: number;
  status: 'paid' | 'pending' | 'cancelled';
}

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onSort: (key: keyof Transaction) => void;
}

export const TransactionsTable = ({ 
  transactions,
  isLoading,
  onSort
}: TransactionsTableProps) => {
  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-amber-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return <div className="w-full h-64 bg-gray-50 rounded-lg animate-pulse" />;
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort('date')} className="h-8 px-2">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort('price')} className="h-8 px-2">
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{format(new Date(transaction.date), 'MMM d, yyyy')}</TableCell>
              <TableCell>{transaction.clientName}</TableCell>
              <TableCell>{transaction.serviceName}</TableCell>
              <TableCell>${transaction.price.toFixed(2)}</TableCell>
              <TableCell className={getStatusColor(transaction.status)}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
