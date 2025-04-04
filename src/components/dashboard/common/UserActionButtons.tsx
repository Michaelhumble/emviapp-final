
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";

interface UserActionButtonsProps {
  className?: string;
}

const UserActionButtons = ({ className = "" }: UserActionButtonsProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const copyAffiliateLink = () => {
    // Generate an affiliate link based on user ID
    const affiliateLink = `${window.location.origin}/?ref=${user?.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(affiliateLink)
      .then(() => {
        toast({
          title: "Affiliate link copied!",
          description: "Share it with friends to earn rewards.",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Please try again or copy manually.",
        });
      });
  };
  
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <Link to="/profile/edit" className="flex-1">
        <Button variant="outline" className="w-full flex items-center justify-center">
          <User className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </Link>
      <Button 
        variant="secondary" 
        className="flex-1 flex items-center justify-center"
        onClick={copyAffiliateLink}
      >
        <Copy className="mr-2 h-4 w-4" /> Copy Affiliate Link
      </Button>
    </div>
  );
};

export default UserActionButtons;
