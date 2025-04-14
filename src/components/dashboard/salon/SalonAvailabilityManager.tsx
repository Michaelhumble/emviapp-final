import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Calendar, Clock, Building, MapPin, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AvailabilityDay, AvailabilityRecord } from "@/types/availability";

const DAYS_OF_WEEK = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 }
];

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

const formatTimeDisplay = (hour: number, minute: number) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
};

const TIME_OPTIONS = generateTimeOptions();

// Define a simple interface for the raw database records to avoid complex typing issues
interface DatabaseAvailabilityRecord {
  id: string;
  artist_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean | null;
  location?: string | null;
  user_id?: string;
  role?: string;
}

const SalonAvailabilityManager = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);
  const [location, setLocation] = useState(userProfile?.location || '');
  
  useEffect(() => {
    if (user) {
      initializeAvailability();
      fetchExistingAvailability();
    }
  }, [user]);

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

  const fetchExistingAvailability = async () => {
    try {
      setLoading(true);
      
      if (!user) return;
      
      const response = await supabase
        .from('availability')
        .select('*')
        .eq('user_id', user.id)
        .order('day_of_week');
      
      const data = response.data as DatabaseAvailabilityRecord[] | null;
      const error = response.error;
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        if (data[0].location) {
          setLocation(data[0].location);
        }
        
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
      toast.error('Failed to load your salon hours');
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (index: number) => {
    const newAvailability = [...availability];
    newAvailability[index].active = !newAvailability[index].active;
    setAvailability(newAvailability);
  };

  const updateTime = (index: number, field: 'start_time' | 'end_time', value: string) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  const copyToWeekdays = () => {
    const mondaySettings = availability.find(day => day.day_of_week === 1);
    if (!mondaySettings) return;
    
    const newAvailability = [...availability];
    [1, 2, 3, 4, 5].forEach(dayValue => {
      const index = newAvailability.findIndex(day => day.day_of_week === dayValue);
      if (index !== -1) {
        newAvailability[index] = {
          ...newAvailability[index],
          start_time: mondaySettings.start_time,
          end_time: mondaySettings.end_time,
          active: mondaySettings.active
        };
      }
    });
    
    setAvailability(newAvailability);
  };

  const saveAvailability = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const activeDays = availability.filter(day => day.active);
      
      if (activeDays.length === 0) {
        toast.warning('Please select at least one day when your salon is open');
        setSaving(false);
        return;
      }

      const { error: deleteError } = await supabase
        .from('availability')
        .delete()
        .eq('user_id', user.id);
        
      if (deleteError) throw deleteError;
      
      const availabilityRecords: AvailabilityRecord[] = activeDays.map(day => ({
        user_id: user.id,
        artist_id: user.id,
        role: 'salon',
        day_of_week: day.day_of_week.toString(),
        start_time: day.start_time,
        end_time: day.end_time,
        location: location || userProfile?.location || null,
        is_available: true
      }));
      
      const { error: insertError } = await supabase
        .from('availability')
        .insert(availabilityRecords);
        
      if (insertError) throw insertError;
      
      if (location !== userProfile?.location) {
        const { error: updateError } = await supabase
          .from('users')
          .update({ location })
          .eq('id', user.id);
          
        if (updateError) throw updateError;
      }
      
      toast.success('Salon hours saved successfully!');
    } catch (error) {
      console.error('Error saving salon hours:', error);
      toast.error('Failed to save salon hours');
    } finally {
      setSaving(false);
    }
  };

  const isTimeValid = (startTime: string, endTime: string) => {
    return startTime < endTime;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Building className="mr-2 h-5 w-5 text-primary" />
          Salon Hours
        </CardTitle>
        <CardDescription>
          Set your salon's regular business hours to help clients book appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" /> Salon Location
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your salon location"
                  className="max-w-md"
                />
              </div>
              
              <Tabs defaultValue="weekly">
                <TabsList>
                  <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
                  <TabsTrigger value="quick">Quick Setup</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availability.map((day, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${day.active ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">{DAYS_OF_WEEK[index].name}</h3>
                          <Toggle 
                            pressed={day.active} 
                            onPressedChange={() => toggleDay(index)}
                            aria-label={`Toggle ${DAYS_OF_WEEK[index].name}`}
                          >
                            {day.active ? 'Open' : 'Closed'}
                          </Toggle>
                        </div>
                        
                        {day.active && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label htmlFor={`start-time-${index}`} className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" /> Open
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
                                  <Clock className="mr-1 h-3 w-3" /> Close
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
                              <p className="text-sm text-red-500">Closing time must be after opening time</p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="quick" className="space-y-4 pt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium mb-4">Monday Settings</h3>
                          <div className="flex items-center justify-between mb-4">
                            <span>Open/Closed</span>
                            <Toggle 
                              pressed={availability[1].active} 
                              onPressedChange={() => toggleDay(1)}
                            >
                              {availability[1].active ? 'Open' : 'Closed'}
                            </Toggle>
                          </div>
                          
                          {availability[1].active && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="monday-start">Opening Time</Label>
                                <Select
                                  value={availability[1].start_time}
                                  onValueChange={(value) => updateTime(1, 'start_time', value)}
                                >
                                  <SelectTrigger id="monday-start">
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {TIME_OPTIONS.map((time) => (
                                      <SelectItem key={`monday-start-${time.value}`} value={time.value}>
                                        {time.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="monday-end">Closing Time</Label>
                                <Select
                                  value={availability[1].end_time}
                                  onValueChange={(value) => updateTime(1, 'end_time', value)}
                                >
                                  <SelectTrigger id="monday-end">
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {TIME_OPTIONS.map((time) => (
                                      <SelectItem key={`monday-end-${time.value}`} value={time.value}>
                                        {time.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          
                          <Button 
                            onClick={copyToWeekdays}
                            className="mt-4 w-full"
                            variant="outline"
                          >
                            Copy Monday Settings to All Weekdays
                          </Button>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <p className="text-sm text-muted-foreground">Weekend settings can be adjusted individually in the Weekly Schedule tab.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
                  Save Salon Hours
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonAvailabilityManager;
