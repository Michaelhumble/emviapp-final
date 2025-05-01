
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

interface ReminderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define interfaces for notification settings
interface NotificationSettings {
  id?: string;
  user_id: string;
  email_reminders_enabled: boolean;
  sms_reminders_enabled: boolean;
  reminder_hours_before?: number;
  created_at?: string;
  updated_at?: string;
}

const ReminderSettingsModal = ({ isOpen, onClose }: ReminderSettingsModalProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      loadSettings();
    }
  }, [isOpen, user]);

  const loadSettings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Use type assertion to tell TypeScript this is okay
      const { data, error } = await supabase
        .from("notification_settings" as any)
        .select("email_reminders_enabled, sms_reminders_enabled")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        // Type assertion to access the properties
        const settings = data as any;
        setEmailReminders(settings.email_reminders_enabled !== false);
        setSmsReminders(settings.sms_reminders_enabled !== false);
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Check if settings exist for this user
      const { data: existingSettings, error: selectError } = await supabase
        .from("notification_settings" as any)
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (selectError) throw selectError;
      
      const settings: NotificationSettings = {
        user_id: user.id,
        email_reminders_enabled: emailReminders,
        sms_reminders_enabled: smsReminders,
        updated_at: new Date().toISOString()
      };
      
      let error;
      
      // Properly access the id with safer type checking
      const existingSettingsData = existingSettings as any;
      
      if (existingSettingsData && existingSettingsData.id) {
        // Update existing settings
        const { error: updateError } = await supabase
          .from("notification_settings" as any)
          .update(settings)
          .eq("id", existingSettingsData.id);
        
        error = updateError;
      } else {
        // Insert new settings
        const { error: insertError } = await supabase
          .from("notification_settings" as any)
          .insert(settings);
        
        error = insertError;
      }
      
      if (error) throw error;
      
      toast.success(t({
        english: "Notification settings saved",
        vietnamese: "Đã lưu cài đặt thông báo"
      }));
      
      onClose();
    } catch (error) {
      console.error("Error saving notification settings:", error);
      toast.error(t({
        english: "Failed to save settings",
        vietnamese: "Không thể lưu cài đặt"
      }));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t({
              english: "Reminder Settings",
              vietnamese: "Cài đặt nhắc nhở"
            })}
          </DialogTitle>
          <DialogDescription>
            {t({
              english: "Configure how you'd like to receive booking reminders",
              vietnamese: "Cấu hình cách bạn muốn nhận nhắc nhở đặt lịch"
            })}
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email-reminders"
                checked={emailReminders}
                onCheckedChange={(checked) => setEmailReminders(checked === true)}
              />
              <Label htmlFor="email-reminders">
                {t({
                  english: "Email reminders (24 hours before)",
                  vietnamese: "Nhắc nhở qua email (24 giờ trước)"
                })}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sms-reminders"
                checked={smsReminders}
                onCheckedChange={(checked) => setSmsReminders(checked === true)}
              />
              <Label htmlFor="sms-reminders">
                {t({
                  english: "SMS reminders (24 hours before)",
                  vietnamese: "Nhắc nhở qua SMS (24 giờ trước)"
                })}
              </Label>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            {t({
              english: "Cancel",
              vietnamese: "Hủy"
            })}
          </Button>
          <Button 
            onClick={saveSettings}
            disabled={isSaving || isLoading}
          >
            {isSaving ? (
              <div className="h-4 w-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></div>
            ) : null}
            {t({
              english: "Save Settings",
              vietnamese: "Lưu cài đặt"
            })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderSettingsModal;
