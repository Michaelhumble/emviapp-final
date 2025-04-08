// Only update the sections with the null checks
export const updateSalonCreditDisplay = (
  creditAmount: number,
  ref: React.RefObject<HTMLElement>
) => {
  if (!ref || !ref.current) return;
  
  ref.current.textContent = `${creditAmount}`;
  
  // Create a temporary div for the animation
  const temp = document.createElement('div');
  if (!ref || !ref.current) return;
  
  temp.className = 'text-green-500 font-medium absolute top-0 left-0 opacity-0';
  temp.textContent = '+25';
  ref.current.appendChild(temp);
  
  // Animate the temporary element
  if (!ref || !ref.current) return;
  
  temp.animate([
    { top: '0', opacity: 1 },
    { top: '-20px', opacity: 0 }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });
  
  // Remove the temporary element after the animation
  setTimeout(() => {
    if (ref.current && temp.parentNode === ref.current) {
      ref.current.removeChild(temp);
    }
  }, 1000);
};

// For the video call reporting issue, we need to correct the table name
export const reportVideoCallEngagement = async (userId: string, duration: number) => {
  try {
    // Get the current date in ISO format
    const currentDate = new Date().toISOString();
    
    // Insert a record into the database
    const { data, error } = await supabase
      .from('video_engagements') // Changed from 'video_call_reporting' to a table that exists
      .insert({
        user_id: userId,
        duration_seconds: duration,
        call_date: currentDate,
        status: 'completed'
      });
      
    if (error) {
      console.error('Error reporting video call:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception reporting video call:', err);
    return false;
  }
};

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Function to award credits to a user
export const awardCredits = async (userId: string, amount: number, reason: string) => {
  try {
    const { data, error } = await supabase
      .from('user_credits')
      .insert([
        { user_id: userId, amount: amount, reason: reason }
      ]);

    if (error) {
      console.error("Error awarding credits:", error);
      toast.error("Failed to award credits.");
      return false;
    }

    toast.success(`Successfully awarded ${amount} credits!`);
    return true;
  } catch (error) {
    console.error("Unexpected error awarding credits:", error);
    toast.error("An unexpected error occurred while awarding credits.");
    return false;
  }
};

// Function to deduct credits from a user
export const deductCredits = async (userId: string, amount: number, reason: string) => {
  try {
    const { data, error } = await supabase
      .from('user_credits')
      .insert([
        { user_id: userId, amount: -amount, reason: reason }
      ]);

    if (error) {
      console.error("Error deducting credits:", error);
      toast.error("Failed to deduct credits.");
      return false;
    }

    toast.success(`Successfully deducted ${amount} credits.`);
    return true;
  } catch (error) {
    console.error("Unexpected error deducting credits:", error);
    toast.error("An unexpected error occurred while deducting credits.");
    return false;
  }
};

// Function to get the total credits for a user
export const getTotalCredits = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('user_credits')
      .select('amount')
      .eq('user_id', userId);

    if (error) {
      console.error("Error fetching credits:", error);
      return 0;
    }

    // Sum the credit amounts
    const totalCredits = data.reduce((sum, item) => sum + item.amount, 0);
    return totalCredits;
  } catch (error) {
    console.error("Unexpected error fetching credits:", error);
    return 0;
  }
};
