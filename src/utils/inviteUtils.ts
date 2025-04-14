
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Generate a proper invite link
export const generateInviteLink = (salonId: string, role: string = 'artist') => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/signup?salon_id=${salonId}&role=${role}`;
};

// Copy invite link to clipboard
export const copyInviteLink = async (salonId: string, role: string = 'artist') => {
  try {
    const link = generateInviteLink(salonId, role);
    await navigator.clipboard.writeText(link);
    toast.success("Invitation link copied to clipboard!");
    return true;
  } catch (err) {
    console.error("Failed to copy invite link:", err);
    toast.error("Failed to copy link. Please try again.");
    return false;
  }
};

// Send invite via email (for future implementation)
export const sendInviteEmail = async (email: string, salonId: string, salonName: string, role: string = 'artist') => {
  try {
    // This would connect to an edge function that sends an email
    // For now, we'll just show a toast
    toast.success(`Invitation will be sent to ${email}`);
    
    // Record the invite in the database for tracking
    // We'll use salon_staff table instead of salon_invites since it doesn't exist
    const { error } = await supabase
      .from('salon_staff')
      .insert({
        salon_id: salonId,
        email: email,
        role: role,
        status: 'pending',
        full_name: 'Invited User' // Required field in salon_staff
      });
      
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error("Failed to send invitation email:", err);
    toast.error("Failed to send invitation. Please try again.");
    return false;
  }
};
