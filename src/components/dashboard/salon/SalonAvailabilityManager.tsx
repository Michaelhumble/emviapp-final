
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Define explicit types to avoid deep type inference issues
interface AvailabilityRecord {
  id: string;
  salon_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

interface SalonAvailabilityManagerProps {
  salonId: string;
}

export const SalonAvailabilityManager = ({ salonId }: SalonAvailabilityManagerProps) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityRecord[]>([]);
  const [activeTab, setActiveTab] = useState("weekday");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // Fetch availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!salonId) return;
      
      try {
        setLoading(true);
        
        // Using 'availability' table which exists in the database
        const { data, error } = await supabase
          .from('availability')
          .select('*')
          .eq('artist_id', salonId);
        
        if (error) {
          throw error;
        }
        
        // Type assertion to handle the type conversion safely
        setAvailabilityData((data || []) as unknown as AvailabilityRecord[]);
      } catch (error) {
        console.error('Error fetching availability:', error);
        toast.error('Failed to load availability settings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailability();
  }, [salonId]);
  
  // Save availability changes
  const saveAvailability = async () => {
    if (!salonId) return;
    
    try {
      setSaving(true);
      
      // Logic to save availability data to Supabase
      // This would involve upserting the availabilityData to the availability table
      for (const record of availabilityData) {
        // Only save records with the current salon_id
        if (record.salon_id === salonId) {
          await supabase
            .from('availability')
            .upsert({
              id: record.id.startsWith('new-') ? undefined : record.id,
              salon_id: salonId,
              day_of_week: record.day_of_week,
              start_time: record.start_time,
              end_time: record.end_time,
              is_available: record.is_available
            });
        }
      }
      
      toast.success('Availability settings saved successfully');
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Failed to save availability settings');
    } finally {
      setSaving(false);
    }
  };
  
  // Toggle a time slot's availability
  const toggleTimeSlot = (dayIndex: number, timeSlot: string, isAvailable: boolean) => {
    // Update availability data based on user interaction
    setAvailabilityData(prev => {
      const newData = [...prev];
      const existingIndex = newData.findIndex(
        item => item.day_of_week === dayIndex && item.start_time === timeSlot
      );
      
      if (existingIndex >= 0) {
        newData[existingIndex].is_available = isAvailable;
      } else {
        newData.push({
          id: `new-${dayIndex}-${timeSlot}`,
          salon_id: salonId,
          day_of_week: dayIndex,
          start_time: timeSlot,
          end_time: calculateEndTime(timeSlot),
          is_available: isAvailable,
          created_at: new Date().toISOString()
        });
      }
      
      return newData;
    });
  };
  
  // Calculate end time based on start time (e.g., 30 min or 1 hour later)
  const calculateEndTime = (startTime: string): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = minutes + 30 >= 60 ? hours + 1 : hours;
    const endMinutes = (minutes + 30) % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading availability settings...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="weekday">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="specific">Specific Dates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekday">
            {/* Weekly availability grid */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="border rounded-md p-3">
                  <h3 className="font-medium text-center mb-2">{day}</h3>
                  {/* Time slots would go here */}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="specific">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md"
                />
              </div>
              
              <div className="border rounded-md p-4">
                {selectedDate && (
                  <div>
                    <h3 className="font-medium mb-4">
                      Availability for {selectedDate.toLocaleDateString()}
                    </h3>
                    {/* Specific date time slots would go here */}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button onClick={saveAvailability} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Availability
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonAvailabilityManager;
