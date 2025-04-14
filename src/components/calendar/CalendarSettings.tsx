
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalendarSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarSettings: React.FC<CalendarSettingsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    startHour: "8",
    endHour: "20",
    showWeekends: true,
    enableNotifications: true,
    autoConfirmBookings: false
  });
  
  const handleSaveSettings = () => {
    // In a real app, we would save these settings to the user's preferences
    // For phase 1, this is just a placeholder
    
    // Close the dialog
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Calendar Settings</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startHour">Working Hours</Label>
            <div className="flex items-center gap-2">
              <Select 
                value={settings.startHour}
                onValueChange={(value) => setSettings({...settings, startHour: value})}
              >
                <SelectTrigger id="startHour" className="w-full">
                  <SelectValue placeholder="Start time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 6).map(hour => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour % 12 === 0 ? "12" : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <span>to</span>
              
              <Select 
                value={settings.endHour}
                onValueChange={(value) => setSettings({...settings, endHour: value})}
              >
                <SelectTrigger id="endHour" className="w-full">
                  <SelectValue placeholder="End time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 12).map(hour => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour % 12 === 0 ? "12" : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showWeekends">Show Weekends</Label>
              <div className="text-xs text-gray-500">
                Display Saturday and Sunday in calendar view
              </div>
            </div>
            <Switch 
              id="showWeekends"
              checked={settings.showWeekends}
              onCheckedChange={(checked) => setSettings({...settings, showWeekends: checked})}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableNotifications">Booking Notifications</Label>
              <div className="text-xs text-gray-500">
                Receive notifications for new bookings
              </div>
            </div>
            <Switch 
              id="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoConfirmBookings">Auto-Confirm Bookings</Label>
              <div className="text-xs text-gray-500">
                Automatically confirm new booking requests
              </div>
            </div>
            <Switch 
              id="autoConfirmBookings"
              checked={settings.autoConfirmBookings}
              onCheckedChange={(checked) => setSettings({...settings, autoConfirmBookings: checked})}
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarSettings;
