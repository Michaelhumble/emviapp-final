
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Calendar, Clock, Check, Save } from "lucide-react";
import { AvailabilityDay, AvailabilityRecord } from "@/types/availability";

// Days of the week
const DAYS_OF_WEEK = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 }
];

// Generate time options in 30-minute increments
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      const time = `${h}:${m}`;
      const label = formatTimeDisplay(hour, minute);
      times.push({ value: time, label });
    }
  }
  return times;
};

// Format time for display (e.g., "9:00 AM")
const formatTimeDisplay = (hour: number, minute: number) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
};

const TIME_OPTIONS = generateTimeOptions();

const ArtistAvailabilityManager = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);
  
  useEffect(() => {
    if (user) {
      initializeAvailability();
      fetchExistingAvailability();
    }
  }, [user]);

  // Initialize default availability (all days, 9 AM to 5 PM, inactive)
  const initializeAvailability = () => {
    const defaultAvailability: AvailabilityDay[] = DAYS_OF_WEEK.map(day => ({
      day_of_week: day.value,
      start_time: '09:00',
      end_time: '17:00',
      active: false,
      location: userProfile?.location || null
    }));
    setAvailability(defaultAvailability);
  };

  // Fetch existing availability from Supabase
  const fetchExistingAvailability = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('availability')
        .select('*')
        .eq('user_id', user!.id)
        .order('day_of_week', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map the data to our format
        const existingDays = DAYS_OF_WEEK.map(day => {
          const existingDay = data.find(d => d.day_of_week === day.value.toString());
          if (existingDay) {
            return {
              id: existingDay.id,
              day_of_week: day.value,
              start_time: existingDay.start_time,
              end_time: existingDay.end_time,
              active: true,
              location: existingDay.location
            } as AvailabilityDay;
          } else {
            return {
              day_of_week: day.value,
              start_time: '09:00',
              end_time: '17:00',
              active: false,
              location: userProfile?.location || null
            } as AvailabilityDay;
          }
        });
        setAvailability(existingDays);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load your availability settings');
    } finally {
      setLoading(false);
    }
  };

  // Toggle day selection
  const toggleDay = (index: number) => {
    const newAvailability = [...availability];
    newAvailability[index].active = !newAvailability[index].active;
    setAvailability(newAvailability);
  };

  // Update time value
  const updateTime = (index: number, field: 'start_time' | 'end_time', value: string) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  // Save availability to Supabase
  const saveAvailability = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Get only active days
      const activeDays = availability.filter(day => day.active);
      
      if (activeDays.length === 0) {
        toast.warning('Please select at least one available day');
        setSaving(false);
        return;
      }

      // Delete existing records first
      const { error: deleteError } = await supabase
        .from('availability')
        .delete()
        .eq('user_id', user.id);
        
      if (deleteError) throw deleteError;
      
      // Insert new records
      const availabilityRecords: AvailabilityRecord[] = activeDays.map(day => ({
        user_id: user.id,
        artist_id: user.id, // Required field for database schema
        role: userProfile?.role || 'artist',
        day_of_week: day.day_of_week.toString(), // Convert to string for DB
        start_time: day.start_time,
        end_time: day.end_time,
        location: day.location || userProfile?.location || null,
        is_available: true
      }));
      
      const { error: insertError } = await supabase
        .from('availability')
        .insert(availabilityRecords);
        
      if (insertError) throw insertError;
      
      toast.success('Availability saved successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Failed to save availability');
    } finally {
      setSaving(false);
    }
  };

  // Check if times are valid (end time should be after start time)
  const isTimeValid = (startTime: string, endTime: string) => {
    return startTime < endTime;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          My Availability
        </CardTitle>
        <CardDescription>
          Set your working hours to help clients book appointments during your available times
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availability.map((day, index) => (
                <div key={index} className={`p-4 rounded-lg border ${day.active ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{DAYS_OF_WEEK[index].name}</h3>
                    <Toggle 
                      pressed={day.active} 
                      onPressedChange={() => toggleDay(index)}
                      aria-label={`Toggle ${DAYS_OF_WEEK[index].name}`}
                    >
                      {day.active ? 'Available' : 'Unavailable'}
                    </Toggle>
                  </div>
                  
                  {day.active && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor={`start-time-${index}`} className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" /> Start Time
                          </Label>
                          <Select
                            value={day.start_time}
                            onValueChange={(value) => updateTime(index, 'start_time', value)}
                            disabled={!day.active}
                          >
                            <SelectTrigger id={`start-time-${index}`}>
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                            <SelectContent>
                              {TIME_OPTIONS.map((time) => (
                                <SelectItem key={`start-${index}-${time.value}`} value={time.value}>
                                  {time.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`end-time-${index}`} className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" /> End Time
                          </Label>
                          <Select
                            value={day.end_time}
                            onValueChange={(value) => updateTime(index, 'end_time', value)}
                            disabled={!day.active}
                          >
                            <SelectTrigger id={`end-time-${index}`}>
                              <SelectValue placeholder="Select end time" />
                            </SelectTrigger>
                            <SelectContent>
                              {TIME_OPTIONS.map((time) => (
                                <SelectItem key={`end-${index}-${time.value}`} value={time.value}>
                                  {time.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {!isTimeValid(day.start_time, day.end_time) && (
                        <p className="text-sm text-red-500">End time must be after start time</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button
              onClick={saveAvailability}
              disabled={saving || availability.some(day => day.active && !isTimeValid(day.start_time, day.end_time))}
              className="mt-4"
            >
              {saving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Availability
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistAvailabilityManager;
