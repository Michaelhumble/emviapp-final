
import { useAuth } from "@/context/auth";
import { getPersonalizedGreeting } from "@/utils/navigation";

interface DashboardGreetingProps {
  className?: string;
}

const DashboardGreeting = ({ className = "" }: DashboardGreetingProps) => {
  const { userProfile } = useAuth();
  const firstName = userProfile?.full_name?.split(' ')[0] || userProfile?.email?.split('@')[0] || 'there';
  
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-3xl md:text-4xl font-serif mb-4">
        {getPersonalizedGreeting(firstName, userProfile?.role)}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {userProfile?.role === 'artist' && "Create your profile, apply for jobs, and start growing your beauty career."}
        {userProfile?.role === 'freelancer' && "Turn passion into your path — with EmviApp."}
        {userProfile?.role === 'salon' && "Post jobs, manage your salon, and connect with top artists."}
        {userProfile?.role === 'owner' && "Post jobs, manage your salon, and connect with top artists."}
        {userProfile?.role === 'vendor' && "Every salon needs great tools — make sure they see yours."}
        {userProfile?.role === 'supplier' && "Every salon needs great tools — make sure they see yours."}
        {userProfile?.role === 'beauty supplier' && "Every salon needs great tools — make sure they see yours."}
        {userProfile?.role === 'customer' && "Great artists are one click away."}
        {userProfile?.role === 'other' && "Tell us more so we can guide your journey."}
        {!userProfile?.role && "Welcome to EmviApp."}
      </p>
    </div>
  );
};

export default DashboardGreeting;
