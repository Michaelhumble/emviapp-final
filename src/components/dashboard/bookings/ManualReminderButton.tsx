
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useTranslation, Translation } from "@/hooks/useTranslation";
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
        } as any) // Use type assertion to bypass TypeScript check temporarily
        .eq("id", booking.id);
      
      toast.success(t({
        english: "Reminder sent",
        vietnamese: "Đã gửi nhắc nhở"
      }), {
        duration: 3000,
        position: "bottom-right"
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error sending manual reminder:", error);
      toast.error(t({
        english: "Failed to send",
        vietnamese: "Không thể gửi"
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="flex items-center gap-1 h-6 px-2 text-xs"
      onClick={sendManualReminder}
      disabled={sending}
    >
      {sending ? (
        <div className="h-2.5 w-2.5 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
      ) : (
        <Bell className="h-2.5 w-2.5" />
      )}
      {t({
        english: "Send",
        vietnamese: "Gửi"
      })}
    </Button>
  );
};

export default ManualReminderButton;
