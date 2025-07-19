
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Link as LinkIcon } from "lucide-react";

export default function FreelancerShareProfile() {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);

  const profileUrl = `${window.location.origin}/freelancer/${userProfile?.full_name?.toLowerCase().replace(/\s+/g, '-') || 'demo'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Card className="mb-8 border border-purple-100 bg-white/80 p-6">
      <div className="flex items-center gap-3 mb-4">
        <LinkIcon className="h-6 w-6 text-purple-600" />
        <div className="flex-1">
          <span className="font-semibold text-gray-800">Share My Profile</span>
          <p className="text-sm text-gray-500">Share your professional profile with potential clients</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <span className="text-sm text-gray-600 font-mono break-all">{profileUrl}</span>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={handleCopy} className="border-purple-300 flex-1">
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button 
          onClick={() => window.open(profileUrl, '_blank')} 
          className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
}
