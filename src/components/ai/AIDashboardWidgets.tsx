
import { useAuth } from "@/context/AuthContext";
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
  const showPostPerformance = userRole === 'artist' || 
                             userRole === 'salon' || 
                             userRole === 'freelancer' || 
                             userRole === 'vendor';
  
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
