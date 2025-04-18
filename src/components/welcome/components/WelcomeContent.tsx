
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { UserRole } from "@/context/auth/types";
import { getWelcomeImage } from "../utils/roleUtils";

interface WelcomeContentProps {
  userRole: UserRole;
  onContinue: () => void;
  onSkip: () => void;
}

export const WelcomeContent = ({ userRole, onContinue, onSkip }: WelcomeContentProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
      <img 
        src={getWelcomeImage(userRole)}
        alt="Welcome to EmviApp" 
        className="w-full h-64 object-cover rounded-lg mb-8"
      />
      
      <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
        We've built EmviApp just for you
      </h2>
      <p className="text-gray-600 mb-6">
        Our platform is designed to make your experience in the beauty industry more connected, 
        efficient, and rewarding. Let us show you how our AI-powered tools can help you succeed.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          size="lg" 
          onClick={onContinue}
          className="font-medium px-6"
        >
          Discover AI Features <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={onSkip}
          className="font-medium px-6"
        >
          Skip to Dashboard
        </Button>
      </div>
    </div>
  );
};
