
import { useState } from "react";
import { copyReferralLink } from "../../utils/referralUtils";
import { Link, Copy, Share2, Users } from "lucide-react";
import toast from "react-hot-toast";

interface ReferralStats {
  count: number;
  loading: boolean;
}

export interface ReferralSectionProps {
  profile?: any; // Made optional to prevent type errors
}

const ReferralSection = ({}: ReferralSectionProps) => {
  const [copied, setCopied] = useState(false);
  const [referralStats] = useState<ReferralStats>({
    count: 0,
    loading: true
  });
  
  // Helper function to render badge requirements
  const renderBadgeRequirement = (count: number, name: string, icon: string, threshold: number) => {
    const achieved = count >= threshold;
    
    return (
      <div className={`flex items-center gap-2 ${achieved ? 'text-purple-300' : 'text-gray-400'}`}>
        <span className="text-lg">{icon}</span>
        <span>
          {name}
          {!achieved && <span className="text-xs ml-1">({threshold - count} more needed)</span>}
        </span>
        {achieved && <span className="text-xs bg-purple-900/50 px-1.5 py-0.5 rounded ml-1">Earned!</span>}
      </div>
    );
  };
  
  const handleCopyLink = async () => {
    const demoReferralCode = "EMVI123";
    
    const success = await copyReferralLink(demoReferralCode);
    
    if (success) {
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy link. Try again.");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join me on EmviApp',
          text: 'I think you\'ll love EmviApp! Join using my referral link:',
          url: `${window.location.origin}/signup?ref=EMVI123`,
        });
      } else {
        // Fallback to copy if Web Share API is not available
        handleCopyLink();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-3 text-purple-300 flex items-center gap-2">
        <Link size={18} className="text-purple-400" />
        Invite Friends & Earn Rewards
      </h3>
      
      <div className="mb-4">
        <p className="text-gray-300 mb-3">
          Share your unique invite code and earn 5 credits for each new friend that joins!
        </p>
        
        <div className="space-y-4">
          {/* Referral Stats Box */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-medium text-purple-200 mb-2 flex items-center gap-2">
              <Users size={16} className="text-purple-400" />
              Your Referral Stats
            </h4>
            
            {referralStats.loading ? (
              <div className="flex items-center justify-center h-16">
                <div className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Referrals:</span>
                  <span className="font-bold text-purple-300 text-lg">{referralStats.count}</span>
                </div>
                
                <div className="h-px bg-gray-600 my-2"></div>
                
                <div className="space-y-1 text-sm">
                  <h5 className="text-xs uppercase text-gray-400 mb-1">Badge Progress:</h5>
                  {renderBadgeRequirement(
                    referralStats.count, 
                    "Community Builder", 
                    "👥", 
                    3
                  )}
                  {renderBadgeRequirement(
                    referralStats.count, 
                    "Emvi Ambassador", 
                    "🌟", 
                    5
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Invite Code */}
          <div className="bg-gray-700 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Your invite code</p>
                <p className="text-purple-300 font-mono font-medium">EMVI123</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded flex items-center gap-2 transition-colors"
                >
                  <Share2 size={16} />
                  Share
                </button>
                <button
                  onClick={handleCopyLink}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded flex items-center gap-2 transition-colors"
                >
                  <Copy size={16} />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>How it works:</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Share your invite link with friends</li>
              <li>When they sign up, you each earn rewards</li>
              <li>Collect badges and credits to unlock perks</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
