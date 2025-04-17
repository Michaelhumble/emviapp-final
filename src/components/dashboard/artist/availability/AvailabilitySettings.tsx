
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { TimePicker } from "@/components/ui/time-picker";
import { useArtistAvailability } from "./hooks/useArtistAvailability";
import { AvailabilityDay, TimeOffPeriod } from "./types";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock, Calendar as CalendarIcon, Plus, X } from "lucide-react";

export const AvailabilitySettings = () => {
  const {
    isLoading,
    availabilityDays,
    timeOffPeriods,
    saveAvailability,
    saveTimeOff,
    deleteTimeOff
  } = useArtistAvailability();

  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});
  const [dayTimes, setDayTimes] = useState<Record<string, { start: Date; end: Date }>>({});
  const [showTimeOffDialog, setShowTimeOffDialog] = useState(false);
  const [timeOffStart, setTimeOffStart] = useState<Date>();
  const [timeOffEnd, setTimeOffEnd] = useState<Date>();
  const [timeOffReason, setTimeOffReason] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const handleSaveAvailability = () => {
    const availability: AvailabilityDay[] = days
      .filter(day => selectedDays[day])
      .map(day => ({
        day_of_week: day,
        start_time: format(dayTimes[day]?.start || new Date(), 'HH:mm'),
        end_time: format(dayTimes[day]?.end || new Date(), 'HH:mm'),
        is_available: true
      }));

    saveAvailability(availability);
  };

  const handleSaveTimeOff = () => {
    if (!timeOffStart || !timeOffEnd) return;

    const timeOff: TimeOffPeriod = {
      start_date: timeOffStart,
      end_date: timeOffEnd,
      reason: timeOffReason
    };

    saveTimeOff(timeOff);
    setShowTimeOffDialog(false);
    setTimeOffStart(undefined);
    setTimeOffEnd(undefined);
    setTimeOffReason("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {days.map((day) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-40">
                  <Checkbox
                    id={day}
                    checked={selectedDays[day]}
                    onCheckedChange={(checked) =>
                      setSelectedDays(prev => ({ ...prev, [day]: !!checked }))
                    }
                  />
                  <Label htmlFor={day} className="ml-2">
                    {day}
                  </Label>
                </div>
                
                {selectedDays[day] && (
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <TimePicker
                      label="Start Time"
                      date={dayTimes[day]?.start}
                      setDate={(date) =>
                        setDayTimes(prev => ({
                          ...prev,
                          [day]: { ...prev[day], start: date || new Date() }
                        }))
                      }
                    />
                    <TimePicker
                      label="End Time"
                      date={dayTimes[day]?.end}
                      setDate={(date) =>
                        setDayTimes(prev => ({
                          ...prev,
                          [day]: { ...prev[day], end: date || new Date() }
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            
            <Button
              onClick={handleSaveAvailability}
              className="mt-4 bg-purple-600 hover:bg-purple-700"
            >
              Save Weekly Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-purple-600" />
              Time Off & Vacations
            </div>
            <Button
              onClick={() => setShowTimeOffDialog(true)}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Time Off
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeOffPeriods.map((period) => (
              <div
                key={period.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <div>
                  <div className="font-medium">
                    {format(period.start_date, 'MMM d, yyyy')} -{' '}
                    {format(period.end_date, 'MMM d, yyyy')}
                  </div>
                  {period.reason && (
                    <div className="text-sm text-muted-foreground">
                      {period.reason}
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => period.id && deleteTimeOff(period.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showTimeOffDialog} onOpenChange={setShowTimeOffDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Time Off Period</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Select Dates</Label>
                <Calendar
                  mode="range"
                  selected={{
                    from: timeOffStart,
                    to: timeOffEnd
                  }}
                  onSelect={(range) => {
                    setTimeOffStart(range?.from);
                    setTimeOffEnd(range?.to);
                  }}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-2">
                <Label>Reason (Optional)</Label>
                <Input
                  placeholder="e.g., Vacation, Personal Day"
                  value={timeOffReason}
                  onChange={(e) => setTimeOffReason(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowTimeOffDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTimeOff}
                disabled={!timeOffStart || !timeOffEnd}
              >
                Save Time Off
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvailabilitySettings;
