import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";

interface AnalyticsStat {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: string;
  loading: boolean;
}

const SalonAnalyticsCards = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AnalyticsStat[]>([
    { 
      title: "Applicants This Week", 
      value: 0, 
      icon: <Users className="h-5 w-5 text-blue-500" />,
      loading: true
    },
    { 
      title: "Profile Views", 
      value: 0, 
      icon: <Eye className="h-5 w-5 text-purple-500" />,
      change: "+5% this week",
      loading: true
    },
    { 
      title: "Job Post Clicks", 
      value: 0, 
      icon: <MousePointerClick className="h-5 w-5 text-amber-500" />,
      loading: true
    },
    { 
      title: "Growth Trend", 
      value: 0, 
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      change: "Increasing",
      loading: true
    }
  ]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?.id) return;

      try {
        // Fetch job application counts
        const { data: applicationsData, error: applicationsError } = await supabase
          .from('job_applications')
          .select('created_at, job_id')
          .eq('applicant_id', user.id)
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

        // Set up updated stats
        const updatedStats = [...stats];
        
        // Update applicants this week
        if (!applicationsError) {
          updatedStats[0] = { 
            ...updatedStats[0], 
            value: applicationsData?.length || 0,
            loading: false
          };
        }

        // For now, use mock data for other metrics
        // In a real implementation, you would fetch from Supabase tables
        updatedStats[1] = { 
          ...updatedStats[1], 
          value: Math.floor(Math.random() * 25) + 10,
          loading: false
        };
        
        updatedStats[2] = { 
          ...updatedStats[2], 
          value: Math.floor(Math.random() * 40) + 5,
          loading: false
        };
        
        updatedStats[3] = { 
          ...updatedStats[3], 
          value: Math.floor(Math.random() * 10) + 1,
          loading: false
        };
        
        setStats(updatedStats);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        
        // If error, set loading to false but keep values at 0
        const updatedStats = stats.map(stat => ({
          ...stat,
          loading: false
        }));
        
        setStats(updatedStats);
      }
    };

    fetchAnalytics();
  }, [user]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 p-2 rounded-full mb-2">
                {stat.icon}
              </div>
              <div className="text-center">
                {stat.loading ? (
                  <div className="h-6 w-12 bg-gray-200 animate-pulse rounded mx-auto mb-1"></div>
                ) : (
                  <p className="text-xl font-bold">{stat.value}</p>
                )}
                <p className="text-xs text-gray-500 mb-1">{stat.title}</p>
                {stat.change && (
                  <p className="text-xs text-emerald-600">{stat.change}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SalonAnalyticsCards;
