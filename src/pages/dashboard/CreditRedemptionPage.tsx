
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { 
  Award, 
  BadgeDollarSign, 
  FileDown, 
  Rocket, 
  Megaphone, 
  Briefcase, 
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface RedemptionOption {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: React.ElementType;
  actionType: string;
}

const CreditRedemptionPage = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processingOption, setProcessingOption] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<RedemptionOption | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const credits = userProfile?.credits || 0;

  useEffect(() => {
    if (!user) {
      navigate("/auth/signin");
    }
    
    document.title = "Redeem Credits | EmviApp";
  }, [user, navigate]);

  const redemptionOptions: RedemptionOption[] = [
    {
      id: "feature-profile",
      title: "Feature Your Profile",
      description: "Promote your profile at the top of search results for 7 days",
      cost: 10,
      icon: Megaphone,
      actionType: "profile_feature"
    },
    {
      id: "boost-listing",
      title: "Boost Job/Salon Listing",
      description: "Get more visibility for your listing for 7 days",
      cost: 10,
      icon: Rocket,
      actionType: "listing_boost"
    },
    {
      id: "verified-badge",
      title: "Verified Badge",
      description: "Get a permanent verified badge on your profile",
      cost: 25,
      icon: Award,
      actionType: "verified_badge"
    },
    {
      id: "subscription-discount",
      title: "$10 Off Subscription",
      description: "Get $10 off your next subscription renewal",
      cost: 20,
      icon: BadgeDollarSign,
      actionType: "subscription_discount"
    },
    {
      id: "premium-download",
      title: "Premium Templates",
      description: "Access our premium tools and templates",
      cost: 10,
      icon: FileDown,
      actionType: "premium_download"
    },
    {
      id: "job-post",
      title: "Free Job Post",
      description: "Post a job without paying the standard fee",
      cost: 15,
      icon: Briefcase,
      actionType: "job_post"
    }
  ];

  const handleRedeemCredits = async (option: RedemptionOption) => {
    setSelectedOption(option);
    setConfirmDialogOpen(true);
  };

  const confirmRedemption = async () => {
    if (!selectedOption || !user) return;
    
    setProcessingOption(selectedOption.id);
    setLoading(true);
    
    try {
      // First, check if user has enough credits
      if (credits < selectedOption.cost) {
        toast.error(`You need ${selectedOption.cost} credits for this option. You have ${credits} credits.`);
        setConfirmDialogOpen(false);
        return;
      }
      
      // Deduct credits from user's account
      const { error: deductError } = await supabase
        .from('users')
        .update({ 
          credits: credits - selectedOption.cost,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (deductError) throw deductError;
      
      // Record the redemption in customer_credits table
      const { error: logError } = await supabase
        .from('customer_credits')
        .insert({
          user_id: user.id,
          action_type: `redemption_${selectedOption.actionType}`,
          value: -selectedOption.cost,
          description: `Redeemed for ${selectedOption.title}`
        });
        
      if (logError) throw logError;
      
      // Apply the benefit based on the option type
      if (selectedOption.actionType === 'profile_feature' || selectedOption.actionType === 'listing_boost') {
        const boostUntil = new Date();
        boostUntil.setDate(boostUntil.getDate() + 7); // 7 days in the future
        
        // Update the boosted_until field in the users table
        const { error: updateError } = await supabase
          .from('users')
          .update({
            boosted_until: boostUntil.toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (updateError) throw updateError;
      } else if (selectedOption.actionType === 'verified_badge') {
        // Add verified badge to user's profile badges
        const currentBadges = userProfile?.badges || [];
        
        // Check if user already has the verified badge
        if (!currentBadges.some((badge: any) => badge.type === 'verified')) {
          const updatedBadges = [
            ...currentBadges,
            { 
              type: 'verified', 
              awarded_at: new Date().toISOString(), 
              name: 'Verified Account' 
            }
          ];
          
          const { error: badgeError } = await supabase
            .from('users')
            .update({
              badges: updatedBadges,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
            
          if (badgeError) throw badgeError;
        }
      }
      
      // Add notification
      await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          type: 'credit_redemption',
          message: `You successfully redeemed ${selectedOption.cost} credits for ${selectedOption.title}`,
          metadata: {
            option_id: selectedOption.id,
            credits_used: selectedOption.cost
          }
        });
      
      // Refresh user profile to get updated credit balance
      await refreshUserProfile();
      
      toast.success(`You've successfully redeemed ${selectedOption.cost} credits for ${selectedOption.title}!`);
    } catch (error) {
      console.error("Error redeeming credits:", error);
      toast.error("Failed to redeem credits. Please try again.");
    } finally {
      setLoading(false);
      setProcessingOption(null);
      setConfirmDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Credit Redemption</h1>
            <p className="text-gray-500">Use your credits to unlock premium features and rewards</p>
          </div>
          
          {/* Credit Balance Card */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-purple-900">Your Credit Balance</h3>
                  <div className="flex items-center mt-1">
                    <BadgeDollarSign className="h-6 w-6 text-purple-500 mr-2" />
                    <span className="text-2xl font-bold text-purple-700">{credits}</span>
                    <span className="text-purple-600 ml-2">credits</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => navigate("/referrals")}
                >
                  Earn More Credits
                </Button>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-700">Progress to next reward</span>
                  <span className="text-purple-800 font-medium">
                    {credits % 25}/25 credits
                  </span>
                </div>
                <Progress value={(credits % 25) * 4} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          {/* Redemption Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {redemptionOptions.map((option) => (
              <CreditRedemptionOption
                key={option.id}
                option={option}
                userCredits={credits}
                onRedeem={() => handleRedeemCredits(option)}
                isProcessing={processingOption === option.id}
              />
            ))}
          </div>
          
          {/* Confirmation Dialog */}
          <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Credit Redemption</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to redeem {selectedOption?.cost} credits for {selectedOption?.title}?
                </AlertDialogDescription>
              </AlertDialogHeader>
              
              <div className="flex items-start space-x-3 py-3">
                <div className="mt-1">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Please note:</p>
                  <ul className="list-disc pl-4 mt-1 text-muted-foreground">
                    <li>This action cannot be undone</li>
                    <li>Credits will be deducted immediately</li>
                    {selectedOption?.actionType === 'verified_badge' && (
                      <li>The verified badge is a permanent profile addition</li>
                    )}
                    {(selectedOption?.actionType === 'profile_feature' || selectedOption?.actionType === 'listing_boost') && (
                      <li>Boost benefits will last for 7 days</li>
                    )}
                  </ul>
                </div>
              </div>
              
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => setConfirmDialogOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmRedemption}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {loading ? "Processing..." : "Confirm Redemption"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Layout>
  );
};

// Separate component for credit redemption option cards
const CreditRedemptionOption = ({
  option,
  userCredits,
  onRedeem,
  isProcessing
}: {
  option: RedemptionOption;
  userCredits: number;
  onRedeem: () => void;
  isProcessing: boolean;
}) => {
  const Icon = option.icon;
  const hasEnoughCredits = userCredits >= option.cost;
  
  return (
    <Card className="overflow-hidden border-muted transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex items-center space-x-1 text-sm font-medium">
            <span>{option.cost}</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
        </div>
        <CardTitle className="text-lg mt-3">{option.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
        <Button 
          className="w-full"
          disabled={!hasEnoughCredits || isProcessing}
          onClick={onRedeem}
          variant={hasEnoughCredits ? "default" : "outline"}
        >
          {isProcessing ? (
            <>
              <span className="mr-2">Processing</span>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            </>
          ) : hasEnoughCredits ? (
            "Redeem Credits"
          ) : (
            `Need ${option.cost - userCredits} more credits`
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditRedemptionPage;
