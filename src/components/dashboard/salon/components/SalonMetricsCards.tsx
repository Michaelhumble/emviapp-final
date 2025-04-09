
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { CalendarClock, Users, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const SalonMetricsCards = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    applicantsThisMonth: 0,
    activeJobPosts: 0, 
    profileViews: 0,
    boostedStatus: false
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        // Fetch active job posts
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('id, created_at')
          .eq('salon_id', user.id)
          .eq('status', 'active');
          
        if (jobsError) throw jobsError;
        
        // Fetch job applications this month
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        
        const { data: applicationsData, error: applicationsError } = await supabase
          .from('job_applications')
          .select('id, job_id, jobs!inner(*)')
          .eq('jobs.salon_id', user.id)
          .gte('created_at', firstDayOfMonth.toISOString());
          
        if (applicationsError) throw applicationsError;
        
        // Fetch user profile for profile views and boosted status
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('profile_views, boosted_until')
          .eq('id', user.id)
          .single();
          
        if (profileError) throw profileError;
        
        // Update metrics
        setMetrics({
          applicantsThisMonth: applicationsData?.length || 0,
          activeJobPosts: jobsData?.length || 0,
          profileViews: profileData?.profile_views || 0,
          boostedStatus: profileData?.boosted_until ? new Date(profileData.boosted_until) > new Date() : false
        });
      } catch (error) {
        console.error('Error fetching salon metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [user?.id]);
  
  // Array of metric cards
  const metricCards = [
    {
      title: t("Applicants This Month"),
      value: metrics.applicantsThisMonth,
      icon: <Users className="h-5 w-5 text-blue-600" />,
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100",
      valueColor: "text-blue-700",
      loading: loading
    },
    {
      title: t("Active Job Posts"),
      value: metrics.activeJobPosts,
      icon: <CalendarClock className="h-5 w-5 text-indigo-600" />,
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100",
      valueColor: "text-indigo-700",
      loading: loading
    },
    {
      title: t("Profile Views"),
      value: metrics.profileViews,
      icon: <Eye className="h-5 w-5 text-violet-600" />,
      bgColor: "bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-100",
      valueColor: "text-violet-700",
      loading: loading
    },
    {
      title: t("Visibility Status"),
      value: metrics.boostedStatus ? t("Boosted") : t("Normal"),
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      bgColor: metrics.boostedStatus 
        ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100" 
        : "bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200",
      valueColor: metrics.boostedStatus ? "text-emerald-700" : "text-gray-700",
      loading: loading
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className={`rounded-xl border ${card.bgColor} p-4 shadow-sm backdrop-blur-md h-full`}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <div className="rounded-full p-1.5 bg-white/80 shadow-sm backdrop-blur-sm">
                {card.icon}
              </div>
            </div>
            
            <div className="mt-2">
              {card.loading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <p className={`text-2xl font-bold ${card.valueColor}`}>
                  {card.value}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SalonMetricsCards;
