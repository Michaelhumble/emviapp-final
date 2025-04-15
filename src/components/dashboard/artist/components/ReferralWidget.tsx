
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';
import { Copy, Gift, Check, Heart } from 'lucide-react';

const ReferralWidget = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral link based on user ID
  const referralLink = `https://emviapp.com/invite/${user?.id?.substring(0, 8) || 'demo'}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="shadow-sm border-pink-100 overflow-hidden">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-70" />
      
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-xl font-serif flex items-center">
          <Gift className="h-5 w-5 mr-2 text-pink-500" />
          Invite & Earn
        </CardTitle>
        <CardDescription>
          Share EmviApp and earn rewards
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-3 flex items-center">
            Share your link and earn <span className="font-medium mx-1 text-pink-600">15 credits</span> 
            for every friend who joins EmviApp <Heart className="h-3 w-3 inline text-pink-500 ml-1" />
          </p>
          
          <div className="flex items-center space-x-2">
            <div className="bg-white border rounded-md py-2 px-3 flex-1 text-sm truncate">
              {referralLink}
            </div>
            
            <Button 
              variant={copied ? "outline" : "secondary"}
              className={copied ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-xs text-gray-500">
              You've invited <span className="font-medium">0</span> friends so far
            </div>
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 text-xs"
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
                }}
              >
                Facebook
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 text-xs"
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join me on EmviApp for nail artists!')}`, '_blank');
                }}
              >
                Twitter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="border rounded-lg p-3 text-center">
            <div className="text-2xl font-medium text-purple-600">15</div>
            <div className="text-xs text-gray-500">Credits per referral</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-2xl font-medium text-pink-600">0</div>
            <div className="text-xs text-gray-500">Total Credits Earned</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralWidget;
