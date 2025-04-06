
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const CREDITS_NEEDED = 15;

const PostJobButton = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isRedeeming, setIsRedeeming] = useState(false);
  
  const userCredits = userProfile?.credits || 0;
  const hasEnoughCredits = userCredits >= CREDITS_NEEDED;
  
  const handlePostJob = async () => {
    if (!userProfile || !hasEnoughCredits) {
      toast.error(`You need ${CREDITS_NEEDED} Emvi Credits to post a job for free.`);
      return;
    }
    
    setIsRedeeming(true);
    
    try {
      // Update the user's credits in the database
      const { error } = await supabase
        .from("users")
        .update({
          credits: userCredits - CREDITS_NEEDED,
          updated_at: new Date().toISOString()
        })
        .eq("id", userProfile.id);
      
      if (error) {
        throw error;
      }
      
      // Refresh the user profile to get the updated credit count
      await refreshUserProfile();
      
      // Show success message
      toast.success("✅ You're all set! Your credits were applied.");
      
      // Redirect to job creation page
      navigate("/post/job");
    } catch (error) {
      console.error("Error redeeming credits for job posting:", error);
      toast.error("Failed to redeem credits. Please try again.");
    } finally {
      setIsRedeeming(false);
    }
  };
  
  return (
    <Button
      onClick={handlePostJob}
      disabled={!hasEnoughCredits || isRedeeming}
      variant={hasEnoughCredits ? "default" : "outline"}
      className={`w-full ${!hasEnoughCredits ? "opacity-70" : ""}`}
    >
      {isRedeeming ? "Processing..." : `Post a Job for Free (${CREDITS_NEEDED} Credits)`}
    </Button>
  );
};

export default PostJobButton;
