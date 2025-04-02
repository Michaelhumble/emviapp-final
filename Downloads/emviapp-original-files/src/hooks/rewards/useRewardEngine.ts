
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import { User } from "../../types/user";

interface Badge {
  name: string;
  description: string;
  icon: string;
}

// Updated interface to include functions
export interface RewardEngine {
  rewardMessage: string;
  showToast: boolean;
  hideToast: () => void;
}

export const useRewardEngine = (profile: User | null): RewardEngine => {
  const [rewardMessage, setRewardMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const hasRun = useRef(false);
  
  useEffect(() => {
    if (!profile || hasRun.current) return;
    
    const checkAndGrantRewards = async () => {
      hasRun.current = true;
      
      try {
        if (!profile) return;
        
        let userBadges: Badge[] = [];
        if (profile.badges && Array.isArray(profile.badges)) {
          userBadges = profile.badges;
        } else if (typeof profile.badges === 'string') {
          try {
            userBadges = JSON.parse(profile.badges);
          } catch (e) {
            console.error("Error parsing badges:", e);
          }
        }
        
        const badgesToAdd: Badge[] = [];
        let creditsToAdd = 0;
        
        if (profile.avatar_url && !hasBadge(userBadges, "Profile Pro")) {
          badgesToAdd.push({
            name: "Profile Pro",
            description: "Completed your profile with a professional photo",
            icon: "🎨"
          });
          creditsToAdd += 3;
        }
        
        if (
          profile.bio && 
          profile.location && 
          profile.specialty &&
          !hasBadge(userBadges, "Polished Presence")
        ) {
          badgesToAdd.push({
            name: "Polished Presence",
            description: "Completed your full professional profile",
            icon: "📖"
          });
          creditsToAdd += 5;
        }
        
        // Check for referrals
        if (profile.referred_by && !profile.referral_reward_claimed) {
          // User was referred, give them a bonus if they haven't claimed it yet
          creditsToAdd += 5; // Reward for being referred
          
          // Mark as claimed in a separate update to avoid race conditions
          await supabase
            .from("users")
            .update({ referral_reward_claimed: true })
            .eq("id", profile.id);
            
          // Add the "Invited" badge for joining via referral
          if (!hasBadge(userBadges, "Invited")) {
            badgesToAdd.push({
              name: "Invited",
              description: "Joined EmviApp through a friend's invitation",
              icon: "🎟️"
            });
          }
        }
        
        if (badgesToAdd.length > 0 || creditsToAdd > 0) {
          const newBadges = [...userBadges, ...badgesToAdd];
          
          await supabase
            .from("users")
            .update({
              badges: newBadges,
              credits: (profile.credits || 0) + creditsToAdd,
              updated_at: new Date().toISOString()
            })
            .eq("id", profile.id);
          
          let message = "🎉 You just earned ";
          
          if (creditsToAdd > 0) {
            message += `${creditsToAdd} credits`;
            if (badgesToAdd.length > 0) {
              message += " and ";
            }
          }
          
          if (badgesToAdd.length > 0) {
            message += `unlocked ${badgesToAdd.length} badge${badgesToAdd.length > 1 ? 's' : ''}`;
            message += "!";
          }
          
          setRewardMessage(message);
          setShowToast(true);
        }
      } catch (error) {
        console.error("Error in reward engine:", error);
      }
    };
    
    checkAndGrantRewards();
  }, [profile]);
  
  const hideToast = () => {
    setShowToast(false);
  };
  
  const hasBadge = (badges: Badge[], badgeName: string): boolean => {
    return badges.some(badge => badge.name === badgeName);
  };
  
  return {
    rewardMessage,
    showToast,
    hideToast
  };
};

export default useRewardEngine;
