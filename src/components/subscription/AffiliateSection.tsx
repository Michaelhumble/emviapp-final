
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Copy, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import FeatureGate from "./FeatureGate";

const AffiliateSection = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a placeholder affiliate link
  const affiliateLink = `https://emviapp.com/ref/${user?.id?.substring(0, 8) || "yourcode"}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink).then(() => {
      setCopied(true);
      toast.success("Affiliate link copied to clipboard");
      setTimeout(() => setCopied(false), 3000);
    });
  };
  
  return (
    <FeatureGate requiredPlan="basic">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Link2 className="h-5 w-5 mr-2 text-primary" />
            Your Affiliate Link
          </CardTitle>
          <CardDescription>
            Share EmviApp and earn Emvi Credits when friends subscribe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input 
              value={affiliateLink}
              readOnly
              className="font-mono text-sm"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopy}
            >
              {copied ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="space-y-3 mt-4">
            <p className="text-sm text-muted-foreground">
              <Users className="h-4 w-4 inline mr-2 text-primary" />
              <span className="font-medium">0</span> referrals this month
            </p>
            
            <div className="text-xs text-muted-foreground">
              <p>Earn Emvi Credits for each friend who subscribes!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </FeatureGate>
  );
};

export default AffiliateSection;
