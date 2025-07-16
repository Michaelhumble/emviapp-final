import React from 'react';
import { motion } from 'framer-motion';
import ArtistProfileEditor from '@/components/profile/ArtistProfileEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, User, Bell, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Simple toggle component for settings
const Toggle = ({ defaultChecked = false, ...props }) => {
  const [checked, setChecked] = React.useState(defaultChecked);
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        checked ? 'bg-purple-600' : 'bg-gray-200'
      }`}
      {...props}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const ArtistSettingsTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">Booking Notifications</div>
                <div className="text-sm text-muted-foreground">Get notified of new bookings</div>
              </div>
            </div>
            <Toggle defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">Profile Privacy</div>
                <div className="text-sm text-muted-foreground">Control who can see your profile</div>
              </div>
            </div>
            <Toggle defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-purple-500" />
              <div>
                <div className="font-medium">Auto-Accept Bookings</div>
                <div className="text-sm text-muted-foreground">Automatically accept valid bookings</div>
              </div>
            </div>
            <Toggle />
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArtistProfileEditor />
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Deactivate Account</div>
              <div className="text-sm text-muted-foreground">Temporarily disable your profile</div>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              Deactivate
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-muted-foreground">Permanently delete your account and data</div>
            </div>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistSettingsTab;