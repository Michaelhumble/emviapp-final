
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Copy, CheckCircle2, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";

const UserActionButtons = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  
  // Generate a shareable affiliate link (in production this would come from backend)
  const affiliateLink = user ? `https://emviapp.com/invite?ref=${user.id?.substring(0, 8)}` : "";
  
  const handleCopyLink = () => {
    if (!affiliateLink) return;
    
    navigator.clipboard.writeText(affiliateLink)
      .then(() => {
        setCopied(true);
        toast.success("Affiliate link copied to clipboard!");
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy link. Please try again.");
      });
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <Link to="/profile/edit" className="flex-1">
        <Button variant="outline" className="w-full">
          <Edit3 className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </Link>
      
      <Button 
        variant="outline" 
        className="flex-1" 
        onClick={handleCopyLink}
        disabled={copied || !affiliateLink}
      >
        {copied ? (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy My Affiliate Link
          </>
        )}
      </Button>
    </div>
  );
};

export default UserActionButtons;
