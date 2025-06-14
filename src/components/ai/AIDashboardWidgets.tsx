
import { useAuth } from "@/context/auth";
import AIWelcomeAssistant from "./AIWelcomeAssistant";
import AIRecommendations from "./AIRecommendations";
import AISmartReminder from "./AISmartReminder";
import AIPostPerformance from "./AIPostPerformance";

interface AIDashboardWidgetsProps {
  className?: string;
}

const AIDashboardWidgets = ({ className = "" }: AIDashboardWidgetsProps) => {
  const { user, userRole } = useAuth();
  
  if (!user) return null;
  
  // Determine which components to show based on user role
  const showPostPerformance = userRole === 'nail-artist' || 
                             userRole === 'hair-stylist' ||
                             userRole === 'lash-tech' ||
                             userRole === 'barber' ||
                             userRole === 'esthetician' ||
                             userRole === 'massage-therapist' ||
                             userRole === 'salon' || 
                             userRole === 'salon-owner' ||
                             userRole === 'freelancer' || 
                             userRole === 'vendor' ||
                             userRole === 'owner' ||
                             userRole === 'supplier' ||
                             userRole === 'beauty-supplier';
  
  return (
    <div className={`space-y-6 ${className}`}>
      <AISmartReminder />
      <AIWelcomeAssistant />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIRecommendations />
        {showPostPerformance && <AIPostPerformance />}
      </div>
    </div>
  );
};

export default AIDashboardWidgets;
