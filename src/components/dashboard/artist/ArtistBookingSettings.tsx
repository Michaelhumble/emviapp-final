
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useArtistData } from "./context/ArtistDataContext";
import { Check, Calendar, Clock } from "lucide-react";

// Define the schedule type
type DaySchedule = {
  day: string;
  time: string;
  active: boolean;
};

// Days of the week
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

// Common time slots
const timeSlots = [
  "9AM - 5PM",
  "10AM - 6PM",
  "9AM - 12PM",
  "1PM - 5PM",
  "7PM - 10PM",
  "10AM - 4PM",
  "By appointment"
];

const ArtistBookingSettings = () => {
  const { artistProfile, refreshArtistProfile } = useArtistData();
  const [acceptsBookings, setAcceptsBookings] = useState(false);
  const [saving, setSaving] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(timeSlots[0]);
  
  // Vietnamese translation state
  const isVietnamese = artistProfile?.preferred_language === 'vi';
  
  const translations = {
    title: isVietnamese ? "Lịch Hẹn Của Bạn" : "Booking Availability",
    toggleLabel: isVietnamese ? "Bật chế độ nhận đặt lịch" : "Accept Bookings",
    saveButton: isVietnamese ? "Lưu Lịch Làm Việc" : "Save Schedule",
    scheduleTitle: isVietnamese ? "Chọn ngày và giờ làm việc" : "Select Your Working Days",
    timeSlotTitle: isVietnamese ? "Giờ làm việc" : "Working Hours",
    savedSuccess: isVietnamese ? "Đã lưu lịch làm việc!" : "Booking schedule saved!",
  };

  // Initialize schedule from user profile
  useEffect(() => {
    if (artistProfile) {
      setAcceptsBookings(artistProfile.accepts_bookings || false);
      
      // Initialize schedule from profile if it exists
      const storedSchedule = artistProfile.preferences?.find(pref => 
        typeof pref === 'string' && pref.startsWith('schedule:')
      );
      
      if (storedSchedule) {
        try {
          const scheduleData = JSON.parse(storedSchedule.substring(9));
          setSchedule(scheduleData);
        } catch (error) {
          console.error('Error parsing schedule data:', error);
          initializeDefaultSchedule();
        }
      } else {
        initializeDefaultSchedule();
      }
    }
  }, [artistProfile]);

  // Initialize default schedule with all days inactive
  const initializeDefaultSchedule = () => {
    const defaultSchedule = daysOfWeek.map(day => ({
      day,
      time: timeSlots[0],
      active: false
    }));
    setSchedule(defaultSchedule);
  };

  // Toggle day selection
  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].active = !newSchedule[index].active;
    
    // Set the currently selected time for this day
    if (newSchedule[index].active) {
      newSchedule[index].time = selectedTimeSlot;
    }
    
    setSchedule(newSchedule);
  };

  // Handle time slot change
  const handleTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    
    // Update all active days with the new time slot
    const newSchedule = schedule.map(day => ({
      ...day,
      time: day.active ? timeSlot : day.time
    }));
    
    setSchedule(newSchedule);
  };

  // Save booking settings
  const saveBookingSettings = async () => {
    if (!artistProfile) return;
    
    setSaving(true);
    
    try {
      // Convert schedule to string for storage in preferences array
      const scheduleString = `schedule:${JSON.stringify(schedule)}`;
      
      // Get current preferences array or initialize it
      let preferences = [...(artistProfile.preferences || [])];
      
      // Remove any existing schedule preference
      preferences = preferences.filter(pref => 
        typeof pref !== 'string' || !pref.startsWith('schedule:')
      );
      
      // Add new schedule preference
      preferences.push(scheduleString);
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          accepts_bookings: acceptsBookings,
          preferences: preferences
        })
        .eq('id', artistProfile.id);
      
      if (error) throw error;
      
      toast.success(translations.savedSuccess);
      refreshArtistProfile();
    } catch (error) {
      console.error('Error saving booking settings:', error);
      toast.error(isVietnamese ? "Lỗi khi lưu cài đặt" : "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          {translations.title}
        </CardTitle>
        <CardDescription>
          {isVietnamese 
            ? "Cho khách hàng biết khi nào bạn có thể nhận đặt lịch" 
            : "Let clients know when you're available for bookings"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Accept Bookings Toggle */}
        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col">
            <span className="font-medium">{translations.toggleLabel}</span>
            <span className="text-sm text-gray-500">
              {isVietnamese 
                ? "Khi bật, khách có thể đặt lịch với bạn" 
                : "When enabled, clients can book appointments"}
            </span>
          </div>
          <Switch 
            checked={acceptsBookings} 
            onCheckedChange={setAcceptsBookings}
            className="data-[state=checked]:bg-purple-600"
          />
        </div>

        {/* Schedule Section - only show if accepting bookings */}
        {acceptsBookings && (
          <>
            <div className="mt-4 space-y-3">
              <h3 className="font-medium text-base">
                {translations.scheduleTitle}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {schedule.map((day, index) => (
                  <Toggle
                    key={day.day}
                    pressed={day.active}
                    onPressedChange={() => toggleDay(index)}
                    className={`border ${
                      day.active 
                        ? 'bg-purple-100 border-purple-300 text-purple-800' 
                        : 'bg-white hover:bg-gray-50'
                    } transition-all`}
                  >
                    {day.day.substring(0, 3)}
                    {day.active && <Check className="h-3 w-3 ml-1" />}
                  </Toggle>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <h3 className="font-medium text-base flex items-center gap-1">
                <Clock className="h-4 w-4 text-purple-600" />
                {translations.timeSlotTitle}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map(slot => (
                  <Toggle
                    key={slot}
                    pressed={selectedTimeSlot === slot}
                    onPressedChange={() => handleTimeSlotChange(slot)}
                    className={`border ${
                      selectedTimeSlot === slot 
                        ? 'bg-purple-100 border-purple-300 text-purple-800' 
                        : 'bg-white hover:bg-gray-50'
                    } transition-all`}
                  >
                    {slot}
                  </Toggle>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="pt-4">
          <Button 
            onClick={saveBookingSettings} 
            disabled={saving}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isVietnamese ? "Đang lưu..." : "Saving..."}
              </span>
            ) : translations.saveButton}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistBookingSettings;
