
import { useAuth } from "@/context/auth";
import { getPersonalizedGreeting } from "@/utils/navigation";

interface DashboardGreetingProps {
  className?: string;
}

const DashboardGreeting = ({ className = "" }: DashboardGreetingProps) => {
  const { userProfile, userRole } = useAuth();
  
  try {
    // Defensive null check for full_name
    const name = userProfile?.full_name || "there";
    const greeting = getPersonalizedGreeting(userRole, name);
    
    return (
      <div className={`mb-6 ${className}`}>
        <h1 className="text-3xl font-serif font-bold mb-2">{greeting}</h1>
        <p className="text-gray-600">Your personalized dashboard is ready for you.</p>
      </div>
    );
  } catch (error) {
    console.error("Error in DashboardGreeting:", error);
    return (
      <div className={`mb-6 ${className}`}>
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome</h1>
        <p className="text-gray-600">Your personalized dashboard is ready for you.</p>
      </div>
    );
  }
};

export default DashboardGreeting;
