import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Clock, Calendar, Bell, BellRing, Zap, Star, 
  Heart, Gift, TrendingUp, Target, User, 
  MapPin, Sparkles, Brain, MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from '@/types/supabase-bypass';
import { formatDistanceToNow } from 'date-fns';

interface SmartReminder {
  id: string;
  type: 'rebooking' | 'streak' | 'offer' | 'achievement' | 'social' | 'wellness';
  title: string;
  message: string;
  scheduled_for: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'sent' | 'dismissed' | 'snoozed';
  metadata: Record<string, any>;
  ai_personalized: boolean;
  trigger_conditions: string[];
}

interface ReminderTemplate {
  id: string;
  type: string;
  title: string;
  description: string;
  ai_enabled: boolean;
  frequency: string;
  conditions: string[];
}

interface SmartReminderEngineProps {
  onReminderTriggered?: (reminder: SmartReminder) => void;
}

const SmartReminderEngine: React.FC<SmartReminderEngineProps> = ({ 
  onReminderTriggered 
}) => {
  const { user, userProfile } = useAuth();
  const [reminders, setReminders] = useState<SmartReminder[]>([]);
  const [templates, setTemplates] = useState<ReminderTemplate[]>([]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'settings'>('upcoming');

  const reminderTemplates: ReminderTemplate[] = [
    {
      id: 'rebooking-nails',
      type: 'rebooking',
      title: 'Nail Maintenance Reminder',
      description: 'Reminds when it\'s time for nail touch-ups based on your booking history',
      ai_enabled: true,
      frequency: '3-4 weeks',
      conditions: ['last_service_type:nails', 'days_since_last:21']
    },
    {
      id: 'rebooking-hair',
      type: 'rebooking',
      title: 'Hair Appointment Reminder',
      description: 'Smart reminders for hair maintenance based on service type',
      ai_enabled: true,
      frequency: '6-8 weeks',
      conditions: ['last_service_type:hair', 'days_since_last:42']
    },
    {
      id: 'streak-maintenance',
      type: 'streak',
      title: 'Beauty Streak Keeper',
      description: 'Helps maintain your beauty routine streak',
      ai_enabled: true,
      frequency: 'daily',
      conditions: ['streak_risk:high', 'days_without_activity:7']
    },
    {
      id: 'personalized-offers',
      type: 'offer',
      title: 'Personalized Offers',
      description: 'AI-curated deals based on your preferences and history',
      ai_enabled: true,
      frequency: 'weekly',
      conditions: ['new_offers_available', 'user_preferences_match']
    },
    {
      id: 'achievement-celebration',
      type: 'achievement',
      title: 'Achievement Celebrations',
      description: 'Celebrate milestones and unlock new badges',
      ai_enabled: false,
      frequency: 'event-based',
      conditions: ['achievement_unlocked', 'milestone_reached']
    },
    {
      id: 'social-engagement',
      type: 'social',
      title: 'Social Engagement',
      description: 'Reminders to share your beauty journey and connect',
      ai_enabled: true,
      frequency: 'bi-weekly',
      conditions: ['low_social_activity', 'new_achievements_to_share']
    }
  ];

  useEffect(() => {
    setTemplates(reminderTemplates);
    loadReminders();
    generateAIReminders();
  }, []);

  const loadReminders = async () => {
    setLoading(true);
    try {
      // Mock reminders data
      const mockReminders: SmartReminder[] = [
        {
          id: '1',
          type: 'rebooking',
          title: 'Time for a nail refresh! 💅',
          message: 'Your gorgeous nails from Maya Chen are due for a touch-up! She has availability this week with a 15% returning client discount.',
          scheduled_for: '2024-01-15T10:00:00Z',
          priority: 'medium',
          status: 'pending',
          metadata: {
            last_service_date: '2023-12-18',
            provider_id: '1',
            provider_name: 'Maya Chen',
            service_type: 'Nail Art',
            discount_offered: 15
          },
          ai_personalized: true,
          trigger_conditions: ['days_since_last:28', 'provider_available']
        },
        {
          id: '2',
          type: 'streak',
          title: 'Keep your 6-day streak alive! 🔥',
          message: 'You\'re doing amazing! Don\'t let your beauty streak break. Book a quick touch-up or self-care session to keep the momentum going.',
          scheduled_for: '2024-01-15T18:00:00Z',
          priority: 'high',
          status: 'pending',
          metadata: {
            current_streak: 6,
            streak_type: 'beauty_routine',
            suggested_actions: ['book_service', 'complete_self_care', 'share_progress']
          },
          ai_personalized: true,
          trigger_conditions: ['streak_at_risk', 'day_6_reached']
        },
        {
          id: '3',
          type: 'offer',
          title: 'Special offer just for you! ✨',
          message: 'Based on your love for innovative nail art, here\'s an exclusive 25% off chrome nail designs from top-rated artists in your area.',
          scheduled_for: '2024-01-16T12:00:00Z',
          priority: 'low',
          status: 'pending',
          metadata: {
            offer_type: 'personalized_discount',
            discount_percentage: 25,
            service_category: 'nail_art',
            expires_at: '2024-01-23T23:59:59Z',
            eligible_providers: ['maya-chen', 'elena-vasquez']
          },
          ai_personalized: true,
          trigger_conditions: ['user_preference_match', 'low_activity_period']
        }
      ];
      
      setReminders(mockReminders);
    } catch (error) {
      console.error('Error loading reminders:', error);
      toast.error('Failed to load reminders');
    } finally {
      setLoading(false);
    }
  };

  const generateAIReminders = async () => {
    if (!aiEnabled || !user?.id) return;
    
    try {
      // AI would analyze user behavior, booking history, preferences, etc.
      console.log('AI analyzing user behavior for personalized reminders...');
    } catch (error) {
      console.error('Error generating AI reminders:', error);
    }
  };

  const dismissReminder = async (reminderId: string) => {
    try {
      setReminders(prev => prev.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, status: 'dismissed' as const }
          : reminder
      ));

      if (user?.id) {
        await supabaseBypass
          .from('smart_reminders')
          .update({ status: 'dismissed' })
          .eq('id', reminderId);
      }

      toast.success('Reminder dismissed');
    } catch (error) {
      console.error('Error dismissing reminder:', error);
      toast.error('Failed to dismiss reminder');
    }
  };

  const snoozeReminder = async (reminderId: string, hours: number = 24) => {
    try {
      const newScheduledTime = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
      
      setReminders(prev => prev.map(reminder =>
        reminder.id === reminderId
          ? { 
              ...reminder, 
              status: 'snoozed' as const,
              scheduled_for: newScheduledTime
            }
          : reminder
      ));

      toast.success(`Reminder snoozed for ${hours} hours`);
    } catch (error) {
      console.error('Error snoozing reminder:', error);
      toast.error('Failed to snooze reminder');
    }
  };

  const handleReminderAction = async (reminder: SmartReminder, action: string) => {
    try {
      switch (action) {
        case 'book_now':
          if (reminder.metadata.provider_id) {
            window.location.href = `/artists/${reminder.metadata.provider_id}`;
          } else {
            window.location.href = '/explore/artists';
          }
          break;
        case 'view_offer':
          toast.success('Redirecting to special offer...');
          break;
        case 'share_achievement':
          toast.success('Opening share modal...');
          break;
        default:
          console.log('Unknown action:', action);
      }

      onReminderTriggered?.(reminder);
    } catch (error) {
      console.error('Error handling reminder action:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-red-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-yellow-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rebooking': return Calendar;
      case 'streak': return Zap;
      case 'offer': return Gift;
      case 'achievement': return Star;
      case 'social': return Heart;
      case 'wellness': return Sparkles;
      default: return Bell;
    }
  };

  const upcomingReminders = reminders.filter(r => r.status === 'pending');
  const reminderHistory = reminders.filter(r => ['sent', 'dismissed', 'snoozed'].includes(r.status));

  return (
    <div className="space-y-6">
      {/* AI Engine Header */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-200/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-white">
                <Brain className="h-5 w-5 mr-2" />
                Smart Reminder Engine
              </CardTitle>
              <p className="text-blue-200 text-sm mt-1">
                AI-powered personalized reminders for your beauty journey
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white">AI Enabled</span>
              <Switch
                checked={aiEnabled}
                onCheckedChange={setAiEnabled}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{upcomingReminders.length}</div>
              <div className="text-sm text-blue-200">Upcoming</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {reminders.filter(r => r.ai_personalized).length}
              </div>
              <div className="text-sm text-blue-200">AI Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {templates.filter(t => t.ai_enabled).length}
              </div>
              <div className="text-sm text-blue-200">Smart Templates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-2">
        {[
          { key: 'upcoming', label: 'Upcoming', icon: Clock },
          { key: 'history', label: 'History', icon: MessageSquare },
          { key: 'settings', label: 'Templates', icon: Target }
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeTab === key ? 'default' : 'ghost'}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex items-center space-x-2 ${
              activeTab === key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-white/10 hover:bg-white/20 border-white/20'
            } text-white`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Button>
        ))}
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'upcoming' && (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {upcomingReminders.map((reminder) => {
              const TypeIcon = getTypeIcon(reminder.type);
              return (
                <motion.div
                  key={reminder.id}
                  className="bg-white/10 backdrop-blur-lg border-white/20 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className={`h-1 bg-gradient-to-r ${getPriorityColor(reminder.priority)}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${getPriorityColor(reminder.priority)}`}>
                          <TypeIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-white">{reminder.title}</h3>
                            {reminder.ai_personalized && (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                <Brain className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            )}
                            <Badge className={`text-xs bg-gradient-to-r ${getPriorityColor(reminder.priority)} text-white`}>
                              {reminder.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{reminder.message}</p>
                          <div className="text-xs text-gray-400">
                            Scheduled for {formatDistanceToNow(new Date(reminder.scheduled_for), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {reminder.type === 'rebooking' && (
                          <Button
                            size="sm"
                            onClick={() => handleReminderAction(reminder, 'book_now')}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          >
                            Book Now
                          </Button>
                        )}
                        {reminder.type === 'offer' && (
                          <Button
                            size="sm"
                            onClick={() => handleReminderAction(reminder, 'view_offer')}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            View Offer
                          </Button>
                        )}
                        {reminder.type === 'achievement' && (
                          <Button
                            size="sm"
                            onClick={() => handleReminderAction(reminder, 'share_achievement')}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                          >
                            Share Achievement
                          </Button>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => snoozeReminder(reminder.id)}
                          className="text-gray-300 hover:bg-white/10"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Snooze
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissReminder(reminder.id)}
                          className="text-gray-300 hover:bg-white/10"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {upcomingReminders.length === 0 && !loading && (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Upcoming Reminders</h3>
                  <p className="text-gray-400">
                    Your AI assistant is monitoring your beauty journey and will notify you when it's time for your next step.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {templates.map((template) => (
              <Card key={template.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-white">{template.title}</h3>
                        {template.ai_enabled && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            <Brain className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                          {template.frequency}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.conditions.map((condition) => (
                          <Badge key={condition} className="bg-white/10 text-white text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white mt-2">Loading smart reminders...</p>
        </div>
      )}
    </div>
  );
};

export default SmartReminderEngine;