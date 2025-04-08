
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '@/context/auth';
import { ArrowRight, Share2 } from 'lucide-react';
import { Button } from '../ui/button';

const AIAffiliateTrackingWidget = () => {
  const { userProfile } = useAuth();
  
  // For now this is just a placeholder for future affiliate tracking functionality
  const referralCode = userProfile?.id?.substring(0, 8) || 'EMVICODE';
  const referralsCount = 0;
  const commissionsEarned = 0;

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-50 to-blue-50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <Share2 className="h-4 w-4 mr-2 text-purple-500" />
              Affiliate Program
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {referralsCount > 0 
                ? `You've invited ${referralsCount} friends and earned $${commissionsEarned}`
                : "Coming soon! Earn rewards by inviting friends to EmviApp"}
            </p>
            <div className="hidden md:flex md:items-center mt-2">
              <Button variant="outline" size="sm" className="opacity-70 cursor-not-allowed" disabled>
                Share Your Code: {referralCode}
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="opacity-70 cursor-not-allowed">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAffiliateTrackingWidget;
