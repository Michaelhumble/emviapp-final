
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import { Calendar, TrendingUp } from "lucide-react";

const SalonDashboardHeader = () => {
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  
  console.log('🟪 SalonDashboardHeader loaded');

  const salonName = userProfile?.full_name || userProfile?.salon_name || "Your Salon";
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">
            Welcome back, {salonName}! 👋
          </h1>
          <div className="flex items-center text-gray-600 mt-2">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{currentDate}</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center text-blue-700">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span className="font-medium">Your business at a glance</span>
        </div>
      </div>
      
      {/* Debug marker */}
      <div className="mt-3 text-xs text-blue-500">
        🟪 Header Component Active | User: {userProfile?.email || 'Loading...'}
      </div>
    </div>
  );
};

export default SalonDashboardHeader;
