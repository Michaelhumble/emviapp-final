
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types/authTypes";

interface DashboardGreetingProps {
  className?: string;
}

// Helper function to get a personalized greeting based on user role
const getPersonalizedGreeting = (name: string, role: UserRole): string => {
  const defaultGreeting = `Welcome back, ${name}!`;
  
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      return `Welcome to your artist dashboard, ${name}!`;
    case 'customer':
      return `Welcome, ${name}!`;
    case 'salon':
    case 'owner':
      return `Welcome to your salon dashboard, ${name}!`;
    case 'freelancer':
      return `Welcome, Freelancer ${name}!`;
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return `Welcome to your supplier dashboard, ${name}!`;
    default:
      return defaultGreeting;
  }
};

const DashboardGreeting = ({ className = "" }: DashboardGreetingProps) => {
  const { userProfile, userRole } = useAuth();
  
  const name = userProfile?.full_name || "there";
  const greeting = getPersonalizedGreeting(name, userRole);
  
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-3xl font-serif font-bold mb-2">{greeting}</h1>
      <p className="text-gray-600">Your personalized dashboard is ready for you.</p>
    </div>
  );
};

export default DashboardGreeting;
