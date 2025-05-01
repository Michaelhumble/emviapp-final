
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Coins as CoinsIcon, Star as StarIcon } from 'lucide-react';
import { useSafeQuery } from '@/hooks/useSafeQuery';
import { useAuth } from '@/context/auth';
import { Skeleton } from "@/components/ui/skeleton";

// Define the shape of the dashboard data
interface SalonDashboardData {
  credits: number;
  teamSize: number;
  postViews: number;
  localReach: number;
  isPremium: boolean;
  revenueData: {
    month: string;
    revenue: number;
  }[];
}

export const SalonOwnerDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  // Fetch dashboard data
  const { data, isLoading, isError } = useSafeQuery<SalonDashboardData>({
    queryKey: ['salon-dashboard', userProfile?.id],
    queryFn: async () => {
      // Mock data for now - would normally come from a real API call
      return {
        credits: userProfile?.credits || 0,
        teamSize: 5,
        postViews: 128,
        localReach: 85,
        isPremium: Boolean(userProfile?.boosted_until && new Date(userProfile.boosted_until) > new Date()),
        revenueData: [
          { month: 'Jan', revenue: 1200 },
          { month: 'Feb', revenue: 1800 },
          { month: 'Mar', revenue: 1600 },
          { month: 'Apr', revenue: 2100 },
          { month: 'May', revenue: 1900 },
        ]
      };
    },
    customErrorMessage: 'Failed to load salon dashboard data',
    initialData: {
      credits: userProfile?.credits || 0,
      teamSize: 0,
      postViews: 0,
      localReach: 0,
      isPremium: false,
      revenueData: []
    }
  });

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  if (isError) {
    return <div>Error loading dashboard data. Please refresh.</div>;
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CoinsIcon className="w-4 h-4 mr-2 text-yellow-500" />
            <span className="text-2xl font-bold">{data.credits}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <StarIcon className={`w-4 h-4 mr-2 ${data.isPremium ? 'text-purple-500' : 'text-gray-400'}`} />
            <span className="text-lg font-medium">{data.isPremium ? 'Premium' : 'Standard'}</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Additional widgets here */}
    </div>
  );
};
