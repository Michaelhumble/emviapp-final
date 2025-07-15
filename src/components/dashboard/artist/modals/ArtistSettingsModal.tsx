import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, Bell, Shield, Calendar, Clock, 
  DollarSign, Globe, Moon, Sun, Monitor,
  Save, MapPin, Phone, Mail, Link
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ArtistSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArtistSettingsModal: React.FC<ArtistSettingsModalProps> = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    // Business Settings
    business_name: '',
    business_address: '',
    business_phone: '',
    business_email: '',
    business_website: '',
    tax_id: '',
    
    // Availability Settings
    is_available_for_hire: true,
    vacation_mode: false,
    auto_accept_bookings: false,
    booking_lead_time: 24, // hours
    max_advance_booking: 30, // days
    
    // Working Hours
    working_hours: {
      monday: { enabled: true, start: '09:00', end: '17:00' },
      tuesday: { enabled: true, start: '09:00', end: '17:00' },
      wednesday: { enabled: true, start: '09:00', end: '17:00' },
      thursday: { enabled: true, start: '09:00', end: '17:00' },
      friday: { enabled: true, start: '09:00', end: '17:00' },
      saturday: { enabled: true, start: '10:00', end: '16:00' },
      sunday: { enabled: false, start: '10:00', end: '16:00' },
    },
    
    // Pricing Settings
    base_hourly_rate: 50,
    consultation_fee: 25,
    travel_fee: 15,
    cancellation_fee: 20,
    rush_order_multiplier: 1.5,
    
    // Notification Settings
    email_notifications: true,
    sms_notifications: true,
    booking_reminders: true,
    payment_alerts: true,
    marketing_emails: false,
    
    // Privacy Settings
    show_phone_publicly: false,
    show_email_publicly: false,
    show_location_publicly: true,
    allow_direct_messaging: true,
    require_booking_approval: true,
    
    // App Settings
    theme: 'system' as 'light' | 'dark' | 'system',
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD',
  });

  useEffect(() => {
    if (userProfile) {
      // Load existing settings from user profile
      setSettings(prev => ({
        ...prev,
        business_name: userProfile.business_name || '',
        business_address: userProfile.business_address || '',
        business_phone: userProfile.business_phone || userProfile.phone || '',
        business_email: userProfile.business_email || userProfile.email || '',
        business_website: userProfile.business_website || userProfile.website || '',
        base_hourly_rate: userProfile.hourly_rate || 50,
        // Other settings would be loaded from a separate settings table
      }));
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!userProfile?.id) return;

    setLoading(true);
    try {
      // Update user profile fields  
      const { error: profileError } = await supabase
        .from('users')
        .update({
          phone: settings.business_phone,
          email: settings.business_email,
          website: settings.business_website,
          hourly_rate: settings.base_hourly_rate,
        })
        .eq('id', userProfile.id);

      if (profileError) throw profileError;

      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const weekDays = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="settings-modal-title"
      >
        <DialogHeader>
          <DialogTitle id="settings-modal-title" className="flex items-center gap-3 text-2xl">
            <Settings className="h-6 w-6 text-purple-600" />
            Artist Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Business Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input
                    id="business_name"
                    value={settings.business_name}
                    onChange={(e) => setSettings(prev => ({ ...prev, business_name: e.target.value }))}
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <Label htmlFor="tax_id">Tax ID / EIN</Label>
                  <Input
                    id="tax_id"
                    value={settings.tax_id}
                    onChange={(e) => setSettings(prev => ({ ...prev, tax_id: e.target.value }))}
                    placeholder="Tax identification number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="business_address">Business Address</Label>
                <Input
                  id="business_address"
                  value={settings.business_address}
                  onChange={(e) => setSettings(prev => ({ ...prev, business_address: e.target.value }))}
                  placeholder="Full business address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business_phone">Business Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="business_phone"
                      value={settings.business_phone}
                      onChange={(e) => setSettings(prev => ({ ...prev, business_phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="business_email">Business Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="business_email"
                      type="email"
                      value={settings.business_email}
                      onChange={(e) => setSettings(prev => ({ ...prev, business_email: e.target.value }))}
                      placeholder="business@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="business_website">Business Website</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="business_website"
                    value={settings.business_website}
                    onChange={(e) => setSettings(prev => ({ ...prev, business_website: e.target.value }))}
                    placeholder="https://yourwebsite.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Availability Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>Available for Hire</Label>
                    <p className="text-sm text-gray-600">Show as available in marketplace</p>
                  </div>
                  <Switch
                    checked={settings.is_available_for_hire}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, is_available_for_hire: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>Vacation Mode</Label>
                    <p className="text-sm text-gray-600">Temporarily unavailable</p>
                  </div>
                  <Switch
                    checked={settings.vacation_mode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, vacation_mode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label>Auto-Accept Bookings</Label>
                    <p className="text-sm text-gray-600">Automatically approve requests</p>
                  </div>
                  <Switch
                    checked={settings.auto_accept_bookings}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, auto_accept_bookings: checked }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="booking_lead_time">Minimum Lead Time (hours)</Label>
                  <Input
                    id="booking_lead_time"
                    type="number"
                    value={settings.booking_lead_time}
                    onChange={(e) => setSettings(prev => ({ ...prev, booking_lead_time: parseInt(e.target.value) }))}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="max_advance_booking">Maximum Advance Booking (days)</Label>
                  <Input
                    id="max_advance_booking"
                    type="number"
                    value={settings.max_advance_booking}
                    onChange={(e) => setSettings(prev => ({ ...prev, max_advance_booking: parseInt(e.target.value) }))}
                    min="1"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Working Hours</h4>
                <div className="space-y-3">
                  {weekDays.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-20">
                        <Switch
                          checked={settings.working_hours[key as keyof typeof settings.working_hours].enabled}
                          onCheckedChange={(checked) => setSettings(prev => ({
                            ...prev,
                            working_hours: {
                              ...prev.working_hours,
                              [key]: { ...prev.working_hours[key as keyof typeof prev.working_hours], enabled: checked }
                            }
                          }))}
                        />
                      </div>
                      <div className="w-24 font-medium">{label}</div>
                      {settings.working_hours[key as keyof typeof settings.working_hours].enabled && (
                        <div className="flex gap-2 items-center">
                          <Input
                            type="time"
                            value={settings.working_hours[key as keyof typeof settings.working_hours].start}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              working_hours: {
                                ...prev.working_hours,
                                [key]: { ...prev.working_hours[key as keyof typeof prev.working_hours], start: e.target.value }
                              }
                            }))}
                            className="w-32"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={settings.working_hours[key as keyof typeof settings.working_hours].end}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              working_hours: {
                                ...prev.working_hours,
                                [key]: { ...prev.working_hours[key as keyof typeof prev.working_hours], end: e.target.value }
                              }
                            }))}
                            className="w-32"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing Configuration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="base_hourly_rate">Base Hourly Rate ($)</Label>
                  <Input
                    id="base_hourly_rate"
                    type="number"
                    value={settings.base_hourly_rate}
                    onChange={(e) => setSettings(prev => ({ ...prev, base_hourly_rate: parseFloat(e.target.value) }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="consultation_fee">Consultation Fee ($)</Label>
                  <Input
                    id="consultation_fee"
                    type="number"
                    value={settings.consultation_fee}
                    onChange={(e) => setSettings(prev => ({ ...prev, consultation_fee: parseFloat(e.target.value) }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="travel_fee">Travel Fee ($)</Label>
                  <Input
                    id="travel_fee"
                    type="number"
                    value={settings.travel_fee}
                    onChange={(e) => setSettings(prev => ({ ...prev, travel_fee: parseFloat(e.target.value) }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="cancellation_fee">Cancellation Fee ($)</Label>
                  <Input
                    id="cancellation_fee"
                    type="number"
                    value={settings.cancellation_fee}
                    onChange={(e) => setSettings(prev => ({ ...prev, cancellation_fee: parseFloat(e.target.value) }))}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rush_order_multiplier">Rush Order Multiplier</Label>
                <Input
                  id="rush_order_multiplier"
                  type="number"
                  value={settings.rush_order_multiplier}
                  onChange={(e) => setSettings(prev => ({ ...prev, rush_order_multiplier: parseFloat(e.target.value) }))}
                  min="1"
                  step="0.1"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Multiplier for rush orders (e.g., 1.5 = 50% surcharge)
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </h3>

              <div className="space-y-4">
                {[
                  { key: 'email_notifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'sms_notifications', label: 'SMS Notifications', desc: 'Receive text message alerts' },
                  { key: 'booking_reminders', label: 'Booking Reminders', desc: 'Get reminded about upcoming appointments' },
                  { key: 'payment_alerts', label: 'Payment Alerts', desc: 'Notifications about payments received' },
                  { key: 'marketing_emails', label: 'Marketing Emails', desc: 'Tips, updates, and promotional content' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                    <Switch
                      checked={settings[key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </h3>

              <div className="space-y-4">
                {[
                  { key: 'show_phone_publicly', label: 'Show Phone Number', desc: 'Display your phone number on your public profile' },
                  { key: 'show_email_publicly', label: 'Show Email Address', desc: 'Display your email on your public profile' },
                  { key: 'show_location_publicly', label: 'Show Location', desc: 'Display your location on your public profile' },
                  { key: 'allow_direct_messaging', label: 'Allow Direct Messages', desc: 'Let clients message you directly' },
                  { key: 'require_booking_approval', label: 'Require Booking Approval', desc: 'Manually approve all booking requests' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                    <Switch
                      checked={settings[key as keyof typeof settings] as boolean}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <select
                    id="theme"
                    value={settings.theme}
                    onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="vi">Vietnamese</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {loading ? 'Saving...' : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistSettingsModal;
