import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, BellRing, Calendar, Gift, Heart, Star, 
  Zap, TrendingUp, Users, Award, Settings, 
  Smartphone, Clock, Target, MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from '@/types/supabase-bypass';

interface NotificationSettings {
  id: string;
  category: string;
  title: string;
  description: string;
  enabled: boolean;
  pushEnabled: boolean;
  inAppEnabled: boolean;
  icon: React.ComponentType<{ className?: string }>;
  priority: 'low' | 'medium' | 'high';
}

interface ScheduledNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  scheduledFor: string;
  status: 'pending' | 'sent' | 'failed';
  metadata: Record<string, any>;
}

interface PushNotificationCenterProps {
  onSettingsChange?: (settings: NotificationSettings[]) => void;
}

const PushNotificationCenter: React.FC<PushNotificationCenterProps> = ({ 
  onSettingsChange 
}) => {
  const { user } = useAuth();
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>([]);
  const [scheduledNotifications, setScheduledNotifications] = useState<ScheduledNotification[]>([]);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>('default');
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const defaultSettings: NotificationSettings[] = [
    {
      id: 'booking-reminders',
      category: 'Bookings',
      title: 'Booking Reminders',
      description: 'Reminders about upcoming appointments',
      enabled: true,
      pushEnabled: true,
      inAppEnabled: true,
      icon: Calendar,
      priority: 'high'
    },
    {
      id: 'rebooking-suggestions',
      category: 'Smart Reminders',
      title: 'Rebooking Suggestions',
      description: 'Smart suggestions based on your booking history',
      enabled: true,
      pushEnabled: true,
      inAppEnabled: true,
      icon: Clock,
      priority: 'medium'
    },
    {
      id: 'streak-reminders',
      category: 'Engagement',
      title: 'Streak Reminders',
      description: 'Keep your beauty streak alive',
      enabled: true,
      pushEnabled: true,
      inAppEnabled: true,
      icon: Zap,
      priority: 'medium'
    },
    {
      id: 'achievement-unlocked',
      category: 'Achievements',
      title: 'Achievement Unlocked',
      description: 'Celebrate your beauty journey milestones',
      enabled: true,
      pushEnabled: true,
      inAppEnabled: true,
      icon: Award,
      priority: 'high'
    },
    {
      id: 'challenge-updates',
      category: 'Challenges',
      title: 'Challenge Updates',
      description: 'Updates on social challenges and competitions',
      enabled: true,
      pushEnabled: false,
      inAppEnabled: true,
      icon: Target,
      priority: 'medium'
    },
    {
      id: 'special-offers',
      category: 'Promotions',
      title: 'Special Offers',
      description: 'Exclusive deals and limited-time offers',
      enabled: true,
      pushEnabled: false,
      inAppEnabled: true,
      icon: Gift,
      priority: 'low'
    },
    {
      id: 'social-activity',
      category: 'Social',
      title: 'Social Activity',
      description: 'Comments, likes, and social interactions',
      enabled: false,
      pushEnabled: false,
      inAppEnabled: true,
      icon: Heart,
      priority: 'low'
    },
    {
      id: 'trending-alerts',
      category: 'Discovery',
      title: 'Trending Alerts',
      description: 'New trending styles and popular services',
      enabled: false,
      pushEnabled: false,
      inAppEnabled: true,
      icon: TrendingUp,
      priority: 'low'
    }
  ];

  useEffect(() => {
    setNotificationSettings(defaultSettings);
    checkPushPermission();
    loadScheduledNotifications();
  }, []);

  const checkPushPermission = () => {
    if ('Notification' in window) {
      setPushPermission(Notification.permission);
    }
  };

  const requestPushPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPushPermission(permission);
        
        if (permission === 'granted') {
          toast.success('Push notifications enabled! 🔔');
          await registerServiceWorker();
        } else {
          toast.error('Push notifications disabled');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        toast.error('Failed to enable push notifications');
      }
    }
  };

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        // Register service worker for push notifications
        // This would be implemented with actual service worker registration
        console.log('Service worker registration would go here');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }
  };

  const loadScheduledNotifications = () => {
    // Mock scheduled notifications
    const mockScheduled: ScheduledNotification[] = [
      {
        id: '1',
        type: 'rebooking-reminder',
        title: 'Time for a touch-up?',
        message: 'Your last nail appointment was 3 weeks ago. Maya Chen has availability this week!',
        scheduledFor: '2024-01-15T14:00:00Z',
        status: 'pending',
        metadata: { providerId: '1', lastBookingDate: '2023-12-25' }
      },
      {
        id: '2',
        type: 'streak-reminder',
        title: 'Keep your streak alive! 🔥',
        message: 'You\'re on a 6-day beauty streak! Book today to keep it going.',
        scheduledFor: '2024-01-15T18:00:00Z',
        status: 'pending',
        metadata: { currentStreak: 6 }
      }
    ];
    
    setScheduledNotifications(mockScheduled);
  };

  const updateNotificationSetting = (settingId: string, field: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => {
      const updated = prev.map(setting => 
        setting.id === settingId 
          ? { ...setting, [field]: value }
          : setting
      );
      onSettingsChange?.(updated);
      return updated;
    });
  };

  const sendTestNotification = async () => {
    if (pushPermission !== 'granted') {
      toast.error('Push notifications not enabled');
      return;
    }

    try {
      new Notification('EmviApp Test', {
        body: 'Push notifications are working perfectly! 🎉',
        icon: '/android-chrome-192x192.png',
        badge: '/android-chrome-192x192.png',
        tag: 'test-notification'
      });
      
      setTestNotificationSent(true);
      toast.success('Test notification sent!');
      
      setTimeout(() => setTestNotificationSent(false), 3000);
    } catch (error) {
      console.error('Failed to send test notification:', error);
      toast.error('Failed to send test notification');
    }
  };

  const scheduleSmartReminder = async (type: string, delay: number) => {
    if (!user?.id) return;
    
    try {
      const scheduledFor = new Date(Date.now() + delay * 1000).toISOString();
      
      await supabaseBypass
        .from('smart_reminders')
        .insert({
          user_id: user.id,
          reminder_type: type,
          scheduled_for: scheduledFor,
          status: 'pending',
          metadata: { source: 'manual_trigger' }
        });
      
      toast.success('Smart reminder scheduled!');
    } catch (error) {
      console.error('Error scheduling reminder:', error);
      toast.error('Failed to schedule reminder');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const groupedSettings = notificationSettings.reduce((groups, setting) => {
    const category = setting.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(setting);
    return groups;
  }, {} as Record<string, NotificationSettings[]>);

  return (
    <div className="space-y-6">
      {/* Push Notification Status */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-200/30">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Bell className="h-5 w-5 mr-2" />
            Push Notification Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${pushPermission === 'granted' ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                <Smartphone className={`h-5 w-5 ${pushPermission === 'granted' ? 'text-green-400' : 'text-yellow-400'}`} />
              </div>
              <div>
                <h3 className="font-medium text-white">Push Notifications</h3>
                <p className="text-sm text-gray-300">
                  Status: {pushPermission === 'granted' ? 'Enabled' : pushPermission === 'denied' ? 'Blocked' : 'Not Enabled'}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {pushPermission !== 'granted' && (
                <Button
                  onClick={requestPushPermission}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Enable Push
                </Button>
              )}
              {pushPermission === 'granted' && (
                <Button
                  variant="outline"
                  onClick={sendTestNotification}
                  disabled={testNotificationSent}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {testNotificationSent ? (
                    <>
                      <BellRing className="h-4 w-4 mr-2 animate-pulse" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4 mr-2" />
                      Test
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings by Category */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Settings className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedSettings).map(([category, settings]) => (
            <div key={category}>
              <h3 className="font-medium text-white mb-4 flex items-center">
                {category}
                <Badge className="ml-2 bg-white/10 text-white">
                  {settings.filter(s => s.enabled).length}/{settings.length}
                </Badge>
              </h3>
              <div className="space-y-3">
                {settings.map((setting) => (
                  <div key={setting.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${getPriorityColor(setting.priority)}`}>
                          <setting.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-white">{setting.title}</h4>
                            <Badge className={`text-xs bg-gradient-to-r ${getPriorityColor(setting.priority)} text-white`}>
                              {setting.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300">{setting.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">Enable</span>
                          <Switch
                            checked={setting.enabled}
                            onCheckedChange={(checked) => 
                              updateNotificationSetting(setting.id, 'enabled', checked)
                            }
                          />
                        </div>
                        {setting.enabled && (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">Push</span>
                              <Switch
                                checked={setting.pushEnabled}
                                onCheckedChange={(checked) => 
                                  updateNotificationSetting(setting.id, 'pushEnabled', checked)
                                }
                                disabled={pushPermission !== 'granted'}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">In-App</span>
                              <Switch
                                checked={setting.inAppEnabled}
                                onCheckedChange={(checked) => 
                                  updateNotificationSetting(setting.id, 'inAppEnabled', checked)
                                }
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {category !== Object.keys(groupedSettings)[Object.keys(groupedSettings).length - 1] && (
                <Separator className="my-6 bg-white/10" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scheduled Notifications */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Clock className="h-5 w-5 mr-2" />
            Upcoming Smart Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scheduledNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              className="p-3 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                  <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={`text-xs ${
                      notification.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      notification.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {notification.status}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {new Date(notification.scheduledFor).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {scheduledNotifications.length === 0 && (
            <div className="text-center py-6">
              <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">No upcoming reminders</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Zap className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => scheduleSmartReminder('rebooking', 3600)} // 1 hour
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Clock className="h-4 w-4 mr-2" />
              Schedule Rebooking Reminder
            </Button>
            <Button
              variant="outline"
              onClick={() => scheduleSmartReminder('streak', 86400)} // 24 hours
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Zap className="h-4 w-4 mr-2" />
              Schedule Streak Reminder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PushNotificationCenter;