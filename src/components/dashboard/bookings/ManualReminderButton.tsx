
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";

interface ManualReminderButtonProps {
  booking: Booking;
  onSuccess?: () => void;
}

const ManualReminderButton = ({ booking, onSuccess }: ManualReminderButtonProps) => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);

  const sendManualReminder = async () => {
    if (sending) return;
    
    setSending(true);
    try {
      // Call the edge function to send a reminder
      const { error } = await supabase.functions.invoke("send-booking-reminders", {
        body: { 
          bookingId: booking.id,
          manual: true
        }
      });
      
      if (error) throw error;
      
      // Update booking record to mark reminder as sent
      await supabase
        .from("bookings")
        .update({
          reminder_sent: true,
          reminder_sent_at: new Date().toISOString()
        })
        .eq("id", booking.id);
      
      toast.success(t({
        english: "Reminder sent successfully",
        vietnamese: "Đã gửi nhắc nhở thành công"
      }));
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error sending manual reminder:", error);
      toast.error(t({
        english: "Failed to send reminder",
        vietnamese: "Không thể gửi nhắc nhở"
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="flex items-center gap-1"
      onClick={sendManualReminder}
      disabled={sending}
    >
      {sending ? (
        <div className="h-3 w-3 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
      ) : (
        <Bell className="h-3 w-3" />
      )}
      {t({
        english: "Send Reminder",
        vietnamese: "Gửi nhắc nhở"
      })}
    </Button>
  );
};

export default ManualReminderButton;
