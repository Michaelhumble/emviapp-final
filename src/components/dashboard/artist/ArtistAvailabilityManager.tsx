
import React, { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, ChevronDown, Clock, Plus } from 'lucide-react';

interface AvailabilityDay {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  artist_id: string;
}

interface DayOption {
  value: string;
  label: string;
}

const dayOptions: DayOption[] = [
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  const timeValue = `${hour.toString().padStart(2, '0')}:00`;
  const timeLabel = `${hourFormatted}:00 ${ampm}`;
  return { value: timeValue, label: timeLabel };
});

const ArtistAvailabilityManager = () => {
  const { user } = useAuth();
  const [availableDays, setAvailableDays] = useState<AvailabilityDay[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Track selected values for the new availability entry
  const [selectedDay, setSelectedDay] = useState<DayOption | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchAvailability();
    }
  }, [user]);

  const fetchAvailability = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabaseBypass
        .from('availability')
        .select('*')
        .eq('artist_id', user.id as any)
        .order('day_of_week');
      
      if (error) throw error;
      
      // Use type assertion to fix deep type instantiation issue
      const typedData = data as any[];
      
      // Map the data to the correct interface
      const availabilityRecords: AvailabilityDay[] = typedData.map(item => ({
        id: item.id,
        day_of_week: item.day_of_week,
        start_time: item.start_time,
        end_time: item.end_time,
        is_available: item.is_available,
        artist_id: item.artist_id
      }));
      
      setAvailableDays(availabilityRecords);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load your availability');
    } finally {
      setLoading(false);
    }
  };

  const addAvailability = async () => {
    if (!user?.id || !selectedDay || !selectedStartTime || !selectedEndTime) {
      toast.error('Please select day and times');
      return;
    }
    
    try {
      const { data, error } = await supabaseBypass
        .from('availability')
        .insert({
          artist_id: user.id,
          day_of_week: selectedDay.value,
          start_time: selectedStartTime,
          end_time: selectedEndTime,
          is_available: true
        } as any)
        .select()
        .single();
      
      if (error) throw error;
      
      // Add the new availability to the state
      setAvailableDays(prev => [...prev, {
        id: (data as any).id,
        day_of_week: (data as any).day_of_week,
        start_time: (data as any).start_time,
        end_time: (data as any).end_time,
        is_available: (data as any).is_available,
        artist_id: (data as any).artist_id
      }]);
      
      // Reset selections
      setSelectedDay(null);
      setSelectedStartTime(null);
      setSelectedEndTime(null);
      
      toast.success('Availability added');
    } catch (error) {
      console.error('Error adding availability:', error);
      toast.error('Failed to add availability');
    }
  };

  const toggleAvailability = async (id: string, isCurrentlyAvailable: boolean) => {
    try {
      const { error } = await supabaseBypass
        .from('availability')
        .update({ is_available: !isCurrentlyAvailable } as any)
        .eq('id', id as any);
      
      if (error) throw error;
      
      // Update local state
      setAvailableDays(prev => 
        prev.map(day => 
          day.id === id 
            ? { ...day, is_available: !day.is_available } 
            : day
        )
      );
      
      toast.success(`Availability ${isCurrentlyAvailable ? 'paused' : 'resumed'}`);
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Failed to update availability');
    }
  };

  const removeAvailability = async (id: string) => {
    try {
      const { error } = await supabaseBypass
        .from('availability')
        .delete()
        .eq('id', id as any);
      
      if (error) throw error;
      
      // Remove from local state
      setAvailableDays(prev => prev.filter(day => day.id !== id));
      
      toast.success('Availability removed');
    } catch (error) {
      console.error('Error removing availability:', error);
      toast.error('Failed to remove availability');
    }
  };

  const getDayLabel = (dayValue: string) => {
    const day = dayOptions.find(d => d.value === dayValue);
    return day ? day.label : 'Unknown';
  };

  const formatTime = (time: string) => {
    const [hours] = time.split(':');
    const hour = parseInt(hours, 10);
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${hourFormatted}:00 ${ampm}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Availability
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-6 text-center">Loading your availability...</div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {availableDays.length === 0 ? (
                <div className="py-4 text-center text-muted-foreground">
                  No availability added yet. Add your working hours to get bookings.
                </div>
              ) : (
                availableDays.map(day => (
                  <div 
                    key={day.id} 
                    className={`p-3 rounded-md border flex justify-between items-center ${
                      !day.is_available ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        checked={day.is_available}
                        onCheckedChange={() => toggleAvailability(day.id, day.is_available)}
                        id={`available-${day.id}`}
                      />
                      <div>
                        <div className="font-medium">{getDayLabel(day.day_of_week)}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime(day.start_time)} - {formatTime(day.end_time)}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeAvailability(day.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t space-y-3">
              <h3 className="font-medium">Add New Availability</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedDay ? selectedDay.label : 'Select Day'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {dayOptions.map(day => (
                      <DropdownMenuItem 
                        key={day.value}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedStartTime ? formatTime(selectedStartTime) : 'Start Time'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {timeOptions.map(time => (
                      <DropdownMenuItem 
                        key={time.value}
                        onClick={() => setSelectedStartTime(time.value)}
                      >
                        {time.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedEndTime ? formatTime(selectedEndTime) : 'End Time'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {timeOptions.map(time => (
                      <DropdownMenuItem 
                        key={time.value}
                        onClick={() => setSelectedEndTime(time.value)}
                      >
                        {time.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button onClick={addAvailability} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Time Slot
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistAvailabilityManager;
