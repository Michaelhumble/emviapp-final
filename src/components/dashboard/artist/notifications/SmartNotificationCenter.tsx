import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Clock, Mail, Phone, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NotificationPreferences {
  email_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  booking_confirmations: boolean;
  booking_reminders: boolean;
  booking_cancellations: boolean;
  marketing_updates: boolean;
  reminder_timing: number; // hours before appointment
}

export const SmartNotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_enabled: true,
    sms_enabled: false,
    push_enabled: true,
    booking_confirmations: true,
    booking_reminders: true,
    booking_cancellations: true,
    marketing_updates: false,
    reminder_timing: 24
  });
  const [loading, setLoading] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState([]);

  useEffect(() => {
    loadNotificationPreferences();
    loadRecentNotifications();
  }, [user]);

  const loadNotificationPreferences = async () => {
    if (!user?.id) return;

    try {
      // For now, use localStorage until we add the table
      const stored = localStorage.getItem(`notifications_${user.id}`);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const loadRecentNotifications = async () => {
    if (!user?.id) return;

    try {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentNotifications(data || []);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const updatedPrefs = { ...preferences, ...newPreferences };
      
      // Store in localStorage for now
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updatedPrefs));

      setPreferences(updatedPrefs);
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update preferences');
      console.error('Error updating preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const NotificationToggle = ({ 
    label, 
    description, 
    checked, 
    onChange, 
    icon: Icon 
  }: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon: any;
  }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={loading} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotificationToggle
            label="Email Notifications"
            description="Receive booking updates via email"
            checked={preferences.email_enabled}
            onChange={(checked) => updatePreferences({ email_enabled: checked })}
            icon={Mail}
          />
          <NotificationToggle
            label="SMS Notifications"
            description="Get instant text message alerts"
            checked={preferences.sms_enabled}
            onChange={(checked) => updatePreferences({ sms_enabled: checked })}
            icon={Phone}
          />
          <NotificationToggle
            label="Push Notifications"
            description="Browser and mobile push alerts"
            checked={preferences.push_enabled}
            onChange={(checked) => updatePreferences({ push_enabled: checked })}
            icon={Bell}
          />
        </CardContent>
      </Card>

      {/* Booking Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Booking Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NotificationToggle
            label="Booking Confirmations"
            description="Alert when clients confirm appointments"
            checked={preferences.booking_confirmations}
            onChange={(checked) => updatePreferences({ booking_confirmations: checked })}
            icon={MessageSquare}
          />
          <NotificationToggle
            label="Appointment Reminders"
            description="Get reminded about upcoming appointments"
            checked={preferences.booking_reminders}
            onChange={(checked) => updatePreferences({ booking_reminders: checked })}
            icon={Clock}
          />
          <NotificationToggle
            label="Cancellation Alerts"
            description="Instant alerts for booking cancellations"
            checked={preferences.booking_cancellations}
            onChange={(checked) => updatePreferences({ booking_cancellations: checked })}
            icon={Bell}
          />

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium">Reminder Timing</label>
              <Badge variant="secondary">{preferences.reminder_timing} hours before</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              When should you be reminded about upcoming appointments?
            </p>
            <div className="flex gap-2">
              {[1, 4, 12, 24, 48].map((hours) => (
                <Button
                  key={hours}
                  variant={preferences.reminder_timing === hours ? "default" : "outline"}
                  size="sm"
                  onClick={() => updatePreferences({ reminder_timing: hours })}
                >
                  {hours}h
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {recentNotifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent notifications
            </p>
          ) : (
            <div className="space-y-3">
              {recentNotifications.map((notification: any) => (
                <div key={notification.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <Badge variant="default" className="text-xs">New</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};