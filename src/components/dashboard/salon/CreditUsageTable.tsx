
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditTransaction } from "@/hooks/useOwnerDashboardData";
import { CreditCard, Download, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";

interface CreditUsageTableProps {
  transactions: CreditTransaction[];
  isLoading: boolean;
}

export function CreditUsageTable({ transactions, isLoading }: CreditUsageTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  const filteredTransactions = transactions.filter(transaction => 
    transaction.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.result.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleExport = () => {
    const csvData = [
      ["Action", "Date", "Credits", "Result"],
      ...filteredTransactions.map(t => [
        t.action,
        format(t.date, "yyyy-MM-dd"),
        t.creditsUsed.toString(),
        t.result
      ])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "credit-history.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Credit Usage History
        </CardTitle>
        <CardDescription>
          Track your credit usage and redemption history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto sm:min-w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-slate-50 rounded-lg"
          >
            <CreditCard className="mx-auto h-12 w-12 text-slate-400 mb-3" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              {searchQuery ? "No matching transactions found" : "No credit transactions yet"}
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              {searchQuery 
                ? "Try using different search terms"
                : "Your credit transaction history will appear here once you earn or use credits"
              }
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.action}</TableCell>
                    <TableCell>{format(transaction.date, "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <span className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">
                        {transaction.creditsUsed} credits
                      </span>
                    </TableCell>
                    <TableCell>{transaction.result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
