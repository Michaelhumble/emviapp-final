
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Save } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define types explicitly to avoid excessive type instantiation
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface AvailabilityState {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

const defaultTimeSlots = (): TimeSlot[] => [
  { start: "09:00", end: "12:00", available: true },
  { start: "12:00", end: "17:00", available: true },
  { start: "17:00", end: "21:00", available: false }
];

const defaultAvailability = (): AvailabilityState => ({
  monday: defaultTimeSlots(),
  tuesday: defaultTimeSlots(),
  wednesday: defaultTimeSlots(),
  thursday: defaultTimeSlots(),
  friday: defaultTimeSlots(),
  saturday: defaultTimeSlots(),
  sunday: defaultTimeSlots()
});

const SalonAvailabilityManager = () => {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<AvailabilityState>(defaultAvailability());
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('availability')
          .select('*')
          .eq('artist_id', user.id);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Transform data from database format to state format
          const newAvailability = defaultAvailability();
          
          data.forEach(slot => {
            const day = slot.day_of_week.toLowerCase() as DayOfWeek;
            if (newAvailability[day]) {
              // Find matching time slot and update availability
              const startHour = new Date(slot.start_time).getHours().toString().padStart(2, '0');
              const startMinute = new Date(slot.start_time).getMinutes().toString().padStart(2, '0');
              const startTime = `${startHour}:${startMinute}`;
              
              const existingSlot = newAvailability[day].find(s => s.start === startTime);
              if (existingSlot) {
                existingSlot.available = slot.is_available;
              }
            }
          });
          
          setAvailability(newAvailability);
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
        toast.error("Failed to load availability");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailability();
  }, [user?.id]);
  
  const handleAvailabilityChange = (day: DayOfWeek, index: number, available: boolean) => {
    setAvailability(prev => {
      const newAvailability = { ...prev };
      newAvailability[day] = [...prev[day]];
      newAvailability[day][index] = { ...prev[day][index], available };
      return newAvailability;
    });
  };
  
  const saveAvailability = async () => {
    if (!user?.id) return;
    
    setIsSaving(true);
    try {
      // Delete existing records for this artist
      await supabase
        .from('availability')
        .delete()
        .eq('artist_id', user.id);
      
      // Create new records
      const records = Object.entries(availability).flatMap(([day, slots]) => 
        slots.map(slot => ({
          artist_id: user.id,
          day_of_week: day,
          start_time: slot.start,
          end_time: slot.end,
          is_available: slot.available
        }))
      );
      
      const { error } = await supabase
        .from('availability')
        .insert(records);
        
      if (error) throw error;
      
      toast.success("Availability saved successfully");
    } catch (err) {
      console.error("Error saving availability:", err);
      toast.error("Failed to save availability");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card className="border-blue-100 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Clock className="h-5 w-5 text-blue-500 mr-2" />
          Availability Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {(Object.keys(availability) as DayOfWeek[]).map((day) => (
                <div key={day} className="border rounded-md p-3 bg-white">
                  <h3 className="text-sm font-medium capitalize mb-2">{day}</h3>
                  
                  <div className="space-y-2">
                    {availability[day].map((slot, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          {slot.start} - {slot.end}
                        </span>
                        <button
                          onClick={() => handleAvailabilityChange(day, index, !slot.available)}
                          className={`w-5 h-5 rounded-full ${
                            slot.available ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                          aria-label={`Toggle availability for ${day} from ${slot.start} to ${slot.end}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 text-right">
              <Button 
                onClick={saveAvailability} 
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Availability
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonAvailabilityManager;
