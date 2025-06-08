
import { useState } from 'react';
import { Copy, Heart, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

interface InviteBannerProps {
  className?: string;
}

const InviteBanner = ({ className }: InviteBannerProps) => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral link based on user ID
  const referralLink = `https://emviapp.com/invite/${user?.id?.substring(0, 8)}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied to clipboard!');
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={`bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 ${className}`}>
      <div className="flex items-center mb-2">
        <Gift className="h-5 w-5 text-pink-500 mr-2" />
        <h3 className="font-medium text-purple-800">Help EmviApp grow. Earn rewards.</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Share your unique link and earn credits when friends join. Help build our beauty community! <Heart className="h-3 w-3 inline text-red-500" />
      </p>
      
      <div className="flex items-center gap-2">
        <div className="bg-white border border-gray-200 rounded-md px-3 py-2 text-sm flex-1 truncate">
          {referralLink}
        </div>
        <Button 
          size="sm" 
          onClick={handleCopy}
          className="flex items-center gap-1"
          variant={copied ? "outline" : "default"}
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
};

export default InviteBanner;
