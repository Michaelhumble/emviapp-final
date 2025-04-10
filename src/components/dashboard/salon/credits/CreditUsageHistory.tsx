
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CreditCard, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface CreditTransaction {
  id: string;
  action: string;
  date: Date;
  creditsUsed: number;
  result: string;
}

const CreditUsageHistory: React.FC = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCreditHistory = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      
      try {
        // In a real app, this would be a query to the customer_credits table
        // For now, we'll use mock data if no customer_credits table exists
        const { data, error } = await supabase
          .from("customer_credits")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Format real data
          const formattedData = data.map(item => ({
            id: item.id,
            action: item.action_type || "Unknown Action",
            date: new Date(item.created_at),
            creditsUsed: Math.abs(item.value),
            result: item.description || (item.value > 0 ? "Credits earned" : "Credits spent")
          }));
          
          setTransactions(formattedData);
        } else {
          // Use mock data if no real data exists
          setTransactions([
            {
              id: "1",
              action: "Purchased Credits",
              date: new Date(2025, 3, 8), // April 8, 2025
              creditsUsed: 20,
              result: "Added to account"
            },
            {
              id: "2",
              action: "Promoted Post",
              date: new Date(2025, 3, 6), // April 6, 2025
              creditsUsed: 5,
              result: "Post boosted for 7 days"
            },
            {
              id: "3",
              action: "Featured Listing",
              date: new Date(2025, 3, 2), // April 2, 2025
              creditsUsed: 10,
              result: "Featured for 14 days"
            },
            {
              id: "4",
              action: "Referral Bonus",
              date: new Date(2025, 2, 25), // March 25, 2025
              creditsUsed: 15,
              result: "New salon referral"
            },
            {
              id: "5",
              action: "Job Post Extension",
              date: new Date(2025, 2, 15), // March 15, 2025
              creditsUsed: 8,
              result: "Extended for 30 days"
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching credit history:", err);
        // Use mock data as fallback
        setTransactions([
          {
            id: "1",
            action: "Purchased Credits",
            date: new Date(2025, 3, 8),
            creditsUsed: 20,
            result: "Added to account"
          },
          {
            id: "2",
            action: "Promoted Post",
            date: new Date(2025, 3, 6),
            creditsUsed: 5,
            result: "Post boosted for 7 days"
          },
          {
            id: "3",
            action: "Featured Listing",
            date: new Date(2025, 3, 2),
            creditsUsed: 10,
            result: "Featured for 14 days"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCreditHistory();
  }, [user?.id]);
  
  const filteredTransactions = transactions.filter(transaction => 
    transaction.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border-green-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <CreditCard className="h-5 w-5 text-green-500 mr-2" />
          Credit Usage History
        </CardTitle>
        
        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? "No transactions matching your search" : "No credit transactions found"}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium">{transaction.action}</div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <Clock className="mr-1 h-3 w-3" />
                    {format(transaction.date, "MMM d, yyyy")}
                  </div>
                </div>
                
                <div className="flex items-center mt-2 md:mt-0">
                  <div className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-1 mr-4">
                    {transaction.creditsUsed} credits
                  </div>
                  <div className="text-sm">{transaction.result}</div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="text-sm">
                <Download className="mr-2 h-4 w-4" />
                Export History
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditUsageHistory;
