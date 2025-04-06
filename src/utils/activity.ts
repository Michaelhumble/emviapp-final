
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type ActivityType = 
  | 'credit_earned' 
  | 'profile_boosted' 
  | 'referral_completed'
  | 'portfolio_upload'
  | 'service_added'
  | 'profile_updated';

export interface LogActivityParams {
  userId: string;
  activityType: ActivityType;
  description: string;
  metadata?: Record<string, any>;
}

/**
 * Logs a user activity to the activity_log table
 */
export const logActivity = async ({
  userId,
  activityType,
  description,
  metadata = {}
}: LogActivityParams): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('activity_log')
      .insert({
        user_id: userId,
        activity_type: activityType,
        description,
        metadata
      });
    
    if (error) {
      console.error("Error logging activity:", error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error("Exception logging activity:", err);
    return false;
  }
};

/**
 * Logs a credit earning activity
 */
export const logCreditEarned = async (userId: string, amount: number, source: string): Promise<void> => {
  const description = `You earned ${amount} Emvi Credit${amount !== 1 ? 's' : ''} for ${source}.`;
  
  await logActivity({
    userId,
    activityType: 'credit_earned',
    description,
    metadata: { credits: amount, source }
  });
};

/**
 * Logs a profile boost activity
 */
export const logProfileBoosted = async (userId: string, durationDays: number): Promise<void> => {
  const description = `Your profile was boosted for ${durationDays} days.`;
  
  await logActivity({
    userId,
    activityType: 'profile_boosted',
    description,
    metadata: { duration_days: durationDays }
  });
};

/**
 * Logs a successful referral activity
 */
export const logReferralCompleted = async (userId: string, creditsEarned: number, referralType: string): Promise<void> => {
  const description = `A new ${referralType} joined using your invite link. +${creditsEarned} credits.`;
  
  await logActivity({
    userId,
    activityType: 'referral_completed',
    description,
    metadata: { credits: creditsEarned, referral_type: referralType }
  });
};
