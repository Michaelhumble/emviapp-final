
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Save } from "lucide-react";
import { useArtistAvailabilityManagement } from "@/hooks/useArtistAvailabilityManagement";
import { BookingStateWrapper } from "@/components/booking/BookingStateWrapper";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return [`${hour}:00`, `${hour}:30`];
}).flat();

export const AvailabilityCalendar = ({ artistId }: { artistId?: string }) => {
  const {
    isLoading,
    error,
    availabilityDays,
    updateDayAvailability,
    saveAvailability
  } = useArtistAvailabilityManagement(artistId);
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveAvailability();
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Availability</CardTitle>
        <Button 
          onClick={handleSave} 
          disabled={isLoading || isSaving}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </CardHeader>
      <CardContent>
        <BookingStateWrapper
          loading={isLoading}
          error={error}
          loadingComponent={<div>Loading your availability settings...</div>}
        >
          <div className="space-y-4">
            {DAYS_OF_WEEK.map((day, index) => {
              const dayData = availabilityDays.find(d => d.day_of_week === index) || {
                day_of_week: index,
                start_time: "09:00",
                end_time: "17:00",
                active: false
              };
              
              return (
                <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 rounded-md border">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={dayData.active}
                      onCheckedChange={(checked) => 
                        updateDayAvailability(availabilityDays.findIndex(d => d.day_of_week === index), 'active', checked)
                      }
                    />
                    <Label className="font-medium">{day}</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Label>Start Time</Label>
                    <Select
                      value={dayData.start_time}
                      onValueChange={(value) => 
                        updateDayAvailability(availabilityDays.findIndex(d => d.day_of_week === index), 'start_time', value)
                      }
                      disabled={!dayData.active}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map(time => (
                          <SelectItem key={`start-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Label>End Time</Label>
                    <Select
                      value={dayData.end_time}
                      onValueChange={(value) => 
                        updateDayAvailability(availabilityDays.findIndex(d => d.day_of_week === index), 'end_time', value)
                      }
                      disabled={!dayData.active}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map(time => (
                          <SelectItem key={`end-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center">
                    {dayData.active ? (
                      <span className="text-sm text-green-600 font-medium">Available</span>
                    ) : (
                      <span className="text-sm text-gray-500">Not Available</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </BookingStateWrapper>
      </CardContent>
    </Card>
  );
};
