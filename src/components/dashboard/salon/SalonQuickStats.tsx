import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, BadgeDollarSign, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import { useSalonStats } from "@/hooks/useSalonStats";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import SalonErrorState from "@/components/dashboard/salon/SalonErrorState";
import SalonProfileCompletionCard from "@/components/dashboard/salon/SalonProfileCompletionCard";

const SalonQuickStats = () => {
  const { t } = useTranslation();
  const { stats, loading, lastFetched, refresh, error } = useSalonStats();
  
  const getErrorMessage = () => {
    if (!error) return "Something went wrong, please try again later.";
    
    if (typeof error === 'string') return error;
    
    if (error instanceof Error) return error.message;
    
    try {
      return JSON.stringify(error, null, 2);
    } catch (e) {
      console.error("Failed to stringify error:", e);
      return "An unexpected error occurred. Please try again.";
    }
  };
  
  if (error) {
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-medium mb-2">Quick Statistics</h2>
        <SalonErrorState 
          error={new Error(getErrorMessage())} 
          retryAction={refresh} 
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Quick Statistics</h2>
        {lastFetched && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">
              Updated {formatDistanceToNow(lastFetched, { addSuffix: true })}
            </span>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0" 
              onClick={() => refresh()}
              disabled={loading}
              title="Refresh stats"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="bg-blue-50 p-3 rounded-full mb-3">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <div className="text-2xl font-bold">{stats.applicantsThisMonth}</div>
            )}
            <div className="text-sm text-gray-500">{t("Applicants This Month")}</div>
          </CardContent>
        </Card>
        
        <Card className="border-indigo-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="bg-indigo-50 p-3 rounded-full mb-3">
              <Briefcase className="h-8 w-8 text-indigo-500" />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <div className="text-2xl font-bold">{stats.activeJobPosts}</div>
            )}
            <div className="text-sm text-gray-500">{t("Active Job Posts")}</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-100 hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="bg-purple-50 p-3 rounded-full mb-3">
              <BadgeDollarSign className="h-8 w-8 text-purple-500" />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <div className="text-2xl font-bold">{stats.creditsRemaining}</div>
            )}
            <div className="text-sm text-gray-500">{t("Credits Remaining")}</div>
          </CardContent>
        </Card>
      </div>
      
      {stats.profileCompletion.percentage === 100 && (
        <SalonProfileCompletionCard 
          completionPercentage={stats.profileCompletion.percentage}
          incompleteFields={stats.profileCompletion.incompleteFields}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SalonQuickStats;
