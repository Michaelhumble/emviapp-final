import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Star
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useArtistBookings } from '../hooks/useArtistBookings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AutomationRule {
  id: string;
  name: string;
  trigger: 'booking_confirmed' | 'booking_reminder' | 'booking_completed' | 'no_show';
  action: 'send_email' | 'send_sms' | 'create_follow_up' | 'request_review';
  delay_hours: number;
  enabled: boolean;
  template: string;
}

interface AutomationStats {
  total_sent: number;
  response_rate: number;
  reviews_generated: number;
  follow_ups_created: number;
}

export const AutomatedFollowUpSystem: React.FC = () => {
  const { user } = useAuth();
  const { bookings } = useArtistBookings();
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [stats, setStats] = useState<AutomationStats>({
    total_sent: 0,
    response_rate: 0,
    reviews_generated: 0,
    follow_ups_created: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAutomationRules();
    calculateStats();
  }, [user]);

  const defaultRules: Omit<AutomationRule, 'id'>[] = [
    {
      name: 'Booking Confirmation',
      trigger: 'booking_confirmed',
      action: 'send_email',
      delay_hours: 0,
      enabled: true,
      template: 'Hi {{client_name}}! Your appointment for {{service_name}} on {{date}} at {{time}} is confirmed. We look forward to seeing you!'
    },
    {
      name: '24hr Reminder',
      trigger: 'booking_reminder',
      action: 'send_sms',
      delay_hours: 24,
      enabled: true,
      template: 'Reminder: You have an appointment tomorrow at {{time}} for {{service_name}}. Reply CONFIRM to confirm or RESCHEDULE to change.'
    },
    {
      name: 'Post-Appointment Follow-up',
      trigger: 'booking_completed',
      action: 'request_review',
      delay_hours: 2,
      enabled: true,
      template: 'Thank you for visiting us today! We hope you love your {{service_name}}. Would you mind leaving us a quick review?'
    },
    {
      name: 'Rebooking Campaign',
      trigger: 'booking_completed',
      action: 'create_follow_up',
      delay_hours: 168, // 7 days
      enabled: false,
      template: 'Hi {{client_name}}! Hope you\'re still loving your {{service_name}}. Ready to book your next appointment?'
    }
  ];

  const loadAutomationRules = async () => {
    try {
      // For now, use localStorage until we add the table
      const stored = localStorage.getItem(`automation_${user?.id}`);
      if (stored) {
        setAutomationRules(JSON.parse(stored));
      } else {
        // Create default rules for new users
        const rulesWithIds = defaultRules.map(rule => ({
          ...rule,
          id: `rule-${Date.now()}-${Math.random()}`
        }));
        setAutomationRules(rulesWithIds);
      }
    } catch (error) {
      console.error('Error loading automation rules:', error);
      // Fallback to default rules
      const rulesWithIds = defaultRules.map(rule => ({
        ...rule,
        id: `rule-${Date.now()}-${Math.random()}`
      }));
      setAutomationRules(rulesWithIds);
    }
  };

  const calculateStats = () => {
    // Mock stats calculation based on bookings
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    setStats({
      total_sent: completedBookings * 2, // Assuming 2 automated messages per completed booking
      response_rate: 78, // Mock response rate
      reviews_generated: Math.floor(completedBookings * 0.65), // 65% review generation rate
      follow_ups_created: Math.floor(completedBookings * 0.45) // 45% follow-up creation rate
    });
  };

  const updateRule = async (ruleId: string, updates: Partial<AutomationRule>) => {
    setLoading(true);
    try {
      const updatedRules = automationRules.map(rule =>
        rule.id === ruleId ? { ...rule, ...updates } : rule
      );
      setAutomationRules(updatedRules);
      
      // Store in localStorage for now
      localStorage.setItem(`automation_${user?.id}`, JSON.stringify(updatedRules));
      
      toast.success('Automation rule updated');
    } catch (error) {
      toast.error('Failed to update rule');
    } finally {
      setLoading(false);
    }
  };

  const triggerOptions = [
    { value: 'booking_confirmed', label: 'Booking Confirmed' },
    { value: 'booking_reminder', label: 'Booking Reminder' },
    { value: 'booking_completed', label: 'Booking Completed' },
    { value: 'no_show', label: 'No Show' }
  ];

  const actionOptions = [
    { value: 'send_email', label: 'Send Email' },
    { value: 'send_sms', label: 'Send SMS' },
    { value: 'create_follow_up', label: 'Create Follow-up' },
    { value: 'request_review', label: 'Request Review' }
  ];

  const delayOptions = [
    { value: 0, label: 'Immediately' },
    { value: 1, label: '1 hour' },
    { value: 2, label: '2 hours' },
    { value: 24, label: '24 hours' },
    { value: 48, label: '2 days' },
    { value: 168, label: '1 week' }
  ];

  const AutomationRuleCard = ({ rule }: { rule: AutomationRule }) => (
    <Card className={`${rule.enabled ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            {rule.enabled ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-gray-400" />
            )}
            {rule.name}
          </CardTitle>
          <Switch
            checked={rule.enabled}
            onCheckedChange={(enabled) => updateRule(rule.id, { enabled })}
            disabled={loading}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Trigger</label>
            <Select
              value={rule.trigger}
              onValueChange={(trigger) => updateRule(rule.id, { trigger: trigger as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {triggerOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Action</label>
            <Select
              value={rule.action}
              onValueChange={(action) => updateRule(rule.id, { action: action as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {actionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Delay</label>
          <Select
            value={rule.delay_hours.toString()}
            onValueChange={(delay) => updateRule(rule.id, { delay_hours: parseInt(delay) })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {delayOptions.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Message Template</label>
          <div className="p-3 bg-muted rounded text-sm">
            {rule.template}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Send className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Messages Sent</span>
            </div>
            <p className="text-2xl font-bold">{stats.total_sent}</p>
            <Badge variant="secondary" className="mt-1">This month</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Response Rate</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{stats.response_rate}%</p>
            <Badge variant="secondary" className="mt-1">+5% from last month</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Reviews Generated</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.reviews_generated}</p>
            <Badge variant="secondary" className="mt-1">65% conversion</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Follow-ups Created</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.follow_ups_created}</p>
            <Badge variant="secondary" className="mt-1">45% rebooking</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Automation Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {automationRules.map((rule) => (
              <AutomationRuleCard key={rule.id} rule={rule} />
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-blue-900">Pro Tip</span>
            </div>
            <p className="text-sm text-blue-800">
              Customize your message templates with variables like &#123;&#123;client_name&#125;&#125;, &#123;&#123;service_name&#125;&#125;, &#123;&#123;date&#125;&#125;, and &#123;&#123;time&#125;&#125; for personalized communication.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};