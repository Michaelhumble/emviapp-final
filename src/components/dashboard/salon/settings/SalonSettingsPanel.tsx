import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSalon } from "@/context/salon/SalonContext";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreditCard, Users, Bell, Star, Shield, Settings, AlertTriangle } from "lucide-react";
import { PlanFeatures } from "./PlanFeatures";
import { StaffCountSync } from "./StaffCountSync";
import { OwnerAccountForm } from "./OwnerAccountForm";
import { PlanCard } from "./PlanCard";
import { useSalonPlan } from "./useSalonPlan";

const SalonSettingsPanel = () => {
  const { currentSalon } = useSalon();
  const { user, userProfile } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { currentPlan, activePlan, staffCount, planOptions, needsUpgrade, switchPlan } = useSalonPlan();
  
  // Toggle for email notifications
  const handleToggleNotifications = async (checked: boolean) => {
    setNotificationsEnabled(checked);
    
    try {
      // Update user notification preferences
      const { error } = await supabase
        .from('notification_settings')
        .upsert({
          user_id: user?.id,
          email_reminders_enabled: checked
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
      
      toast.success(`Email notifications ${checked ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error updating notification settings:', error);
      toast.error('Failed to update notification settings');
      // Revert UI state if update failed
      setNotificationsEnabled(!checked);
    }
  };
  
  // Load notification settings on component mount
  useEffect(() => {
    const loadNotificationSettings = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('notification_settings')
          .select('email_reminders_enabled')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        
        // If settings exist, use them, otherwise keep defaults
        if (data) {
          setNotificationsEnabled(data.email_reminders_enabled);
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    };
    
    loadNotificationSettings();
  }, [user?.id]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Salon Settings</h1>
          <p className="text-muted-foreground">
            Manage your subscription and preferences
          </p>
        </div>
        {needsUpgrade && (
          <div className="mt-2 md:mt-0">
            <Badge variant="destructive" className="flex items-center gap-2">
              <AlertTriangle size={14} />
              Staff count exceeds plan limit
            </Badge>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Subscription</span>
            <span className="inline sm:hidden">Plan</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Team Management</span>
            <span className="inline sm:hidden">Team</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Account Settings</span>
            <span className="inline sm:hidden">Account</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription" className="space-y-6 mt-6">
          {/* Current Plan Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Current Plan</CardTitle>
              <CardDescription>
                Your salon is currently on the {activePlan?.name} plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="space-y-1">
                  <p className="text-3xl font-bold">${activePlan?.price}/month</p>
                  <p className="text-muted-foreground">
                    {activePlan?.staffLimit === Infinity 
                      ? "Unlimited staff members" 
                      : `Up to ${activePlan?.staffLimit} staff members`}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Current Staff: {staffCount}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Available Plans */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {planOptions.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isActive={plan.id === currentPlan}
                  needsUpgrade={needsUpgrade && staffCount > (activePlan?.staffLimit || 0)}
                  onSelect={() => switchPlan(plan.id)}
                  staffCount={staffCount}
                />
              ))}
            </div>
          </div>
          
          {/* Plan Features Comparison */}
          <PlanFeatures />
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6 mt-6">
          <StaffCountSync />
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6 mt-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Email Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive booking and appointment reminders via email
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={handleToggleNotifications}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Owner Account Form */}
          <OwnerAccountForm user={user} userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalonSettingsPanel;
