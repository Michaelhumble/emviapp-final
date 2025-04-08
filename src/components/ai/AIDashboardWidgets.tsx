
import { useAuth } from "@/context/auth";
import AIWelcomeAssistant from "./AIWelcomeAssistant";
import AIRecommendations from "./AIRecommendations";
import AISmartReminder from "./AISmartReminder";
import AIPostPerformance from "./AIPostPerformance";
import { isRoleEquivalent } from "@/utils/roleUtils";

interface AIDashboardWidgetsProps {
  className?: string;
}

const AIDashboardWidgets = ({ className = "" }: AIDashboardWidgetsProps) => {
  const { user, userRole } = useAuth();
  
  if (!user) return null;
  
  // Determine which components to show based on user role
  const showPostPerformance = isRoleEquivalent(userRole, [
    'artist',
    'salon',
    'owner',
    'salon_owner',
    'freelancer',
    'vendor',
    'supplier',
    'beauty supplier'
  ]);
  
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
