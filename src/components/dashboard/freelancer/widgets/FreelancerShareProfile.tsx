
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Link as LinkIcon } from "lucide-react";

export default function FreelancerShareProfile() {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);

  // Added optional chaining and fallback using ID as backup for username
  const profileUrl = userProfile?.username
    ? `${window.location.origin}/a/${userProfile.username}`
    : userProfile?.id
    ? `${window.location.origin}/a/${userProfile.id}`
    : "";

  const handleCopy = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Card className="mb-8 border border-purple-100 bg-white/80 p-6 flex items-center gap-5">
      <LinkIcon className="h-6 w-6 text-purple-600" />
      <div className="flex flex-col flex-1">
        <span className="font-semibold">Share My Profile</span>
        <span className="text-sm text-gray-500 truncate">{profileUrl}</span>
      </div>
      <Button variant="outline" onClick={handleCopy} className="border-purple-300">
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </Card>
  );
}
