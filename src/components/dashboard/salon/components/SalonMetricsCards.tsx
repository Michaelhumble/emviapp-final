
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, ArrowUp, Clock, Zap, Eye } from "lucide-react";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface SalonMetricsCardsProps {
  salonId: string | undefined;
}

const SalonMetricsCards = ({ salonId }: SalonMetricsCardsProps) => {
  const { userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    applicantsThisMonth: 0,
    activeJobPosts: 0,
    profileViews: 0,
    isBoosted: false,
    boostTimeRemaining: ''
  });

  // Format boost time remaining
  const formatBoostTimeRemaining = (boostedUntil: string | null) => {
    if (!boostedUntil) return '';
    
    const endDate = new Date(boostedUntil);
    const now = new Date();
    
    // If boost time has expired
    if (now > endDate) return 'Expired';
    
    const diffMs = endDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} days left`;
    } else {
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      return `${diffHrs} hours left`;
    }
  };
  
  useEffect(() => {
    const fetchMetrics = async () => {
      if (!salonId) return;
      
      setIsLoading(true);
      
      try {
        // Fetch job applications this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const { count: applicantsCount, error: applicantsError } = await supabase
          .from('job_applications')
          .select('*', { count: 'exact', head: true })
          .eq('job.salon_id', salonId)
          .gte('created_at', startOfMonth.toISOString());
        
        if (applicantsError) console.error('Error fetching applicants:', applicantsError);
        
        // Fetch active job posts
        const { count: jobsCount, error: jobsError } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true })
          .eq('salon_id', salonId)
          .eq('status', 'active');
        
        if (jobsError) console.error('Error fetching jobs:', jobsError);
        
        // Fetch profile info about boost status
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('boosted_until, credits')
          .eq('id', userProfile?.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          // If error, set default values
          setMetrics({
            applicantsThisMonth: applicantsCount || 0,
            activeJobPosts: jobsCount || 0,
            profileViews: 0,
            isBoosted: false,
            boostTimeRemaining: ''
          });
        } else {
          // Set metrics with profile data
          setMetrics({
            applicantsThisMonth: applicantsCount || 0,
            activeJobPosts: jobsCount || 0,
            profileViews: 0, // Using default as profile_views may not exist
            isBoosted: profileData?.boosted_until ? new Date(profileData.boosted_until) > new Date() : false,
            boostTimeRemaining: formatBoostTimeRemaining(profileData?.boosted_until)
          });
        }
      } catch (error) {
        console.error('Error fetching salon metrics:', error);
        // Set default values on error
        setMetrics({
          applicantsThisMonth: 0,
          activeJobPosts: 0,
          profileViews: 0,
          isBoosted: false,
          boostTimeRemaining: ''
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMetrics();
  }, [salonId, userProfile?.id]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white/80 backdrop-blur-sm border border-blue-100 animate-pulse">
            <CardContent className="p-6 h-32"></CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  const metricsData = [
    {
      title: "Job Applicants",
      value: metrics.applicantsThisMonth,
      icon: <Users className="h-5 w-5 text-blue-500" />,
      badge: "This Month",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Active Job Posts",
      value: metrics.activeJobPosts,
      icon: <CalendarDays className="h-5 w-5 text-indigo-500" />,
      badge: "Currently Live",
      badgeColor: "bg-indigo-100 text-indigo-800"
    },
    {
      title: "Visibility Status",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      value: metrics.isBoosted ? "BOOSTED" : "STANDARD",
      badge: metrics.isBoosted ? metrics.boostTimeRemaining : "Increase visibility",
      badgeColor: metrics.isBoosted ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {metricsData.map((metric, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-blue-100 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {metric.icon}
                    <h3 className="text-sm font-medium text-gray-800">{metric.title}</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                </div>
                <Badge variant="secondary" className={metric.badgeColor}>
                  {metric.badge}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default SalonMetricsCards;
