
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Users, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ReferralRevenueData {
  totalReferralClicks: number;
  totalReferralSignups: number;
  estimatedRevenue: number;
}

const ReferralsRevenue = () => {
  const [data, setData] = useState<ReferralRevenueData>({
    totalReferralClicks: 0,
    totalReferralSignups: 0,
    estimatedRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        // Get total referral signups from referrals table
        const { count: signupsCount, error: signupsError } = await supabase
          .from('referrals')
          .select('id', { count: 'exact', head: true });
        
        // For clicks, we would ideally have a separate table tracking clicks
        // For now, we'll estimate it based on signups with a multiplier
        const estimatedClicks = signupsCount ? signupsCount * 5 : 0; // Assuming 20% conversion rate
        
        // Get total credits earned from credit_earnings 
        const { data: creditData, error: creditsError } = await supabase
          .from('credit_earnings')
          .select('amount')
          .eq('type', 'referral');
        
        let totalCredits = 0;
        if (creditData) {
          totalCredits = creditData.reduce((sum, item) => sum + (item.amount || 0), 0);
        }
        
        // Convert credits to dollars (assuming 10 credits = $1)
        const estimatedRevenue = totalCredits / 10;

        if (signupsError || creditsError) {
          console.error("Error fetching referral data", {
            signupsError,
            creditsError
          });
          return;
        }

        setData({
          totalReferralClicks: estimatedClicks,
          totalReferralSignups: signupsCount || 0,
          estimatedRevenue: estimatedRevenue
        });
      } catch (error) {
        console.error("Error fetching referral revenue data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Referrals & Revenue</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Link className="h-4 w-4 mr-2 text-blue-600" />
              Total Referral Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : data.totalReferralClicks}</div>
            <p className="text-xs text-muted-foreground mt-1">Estimated link clicks</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-green-600" />
              Referral Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : data.totalReferralSignups}</div>
            <p className="text-xs text-muted-foreground mt-1">Users who signed up via referral</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-amber-600" />
              Estimated Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${loading ? '-' : data.estimatedRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on credit conversions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralsRevenue;
