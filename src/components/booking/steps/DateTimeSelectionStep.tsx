import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { format, addDays, isBefore, isToday, parseISO, addMinutes } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import { useSlotGeneration } from '@/hooks/useSlotGeneration';
import { cn } from '@/lib/utils';

interface DateTimeSelectionStepProps {
  artistId: string;
  serviceId?: string;
  selectedDate?: Date;
  selectedTime?: string;
  timezone: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string, starts_at: string, ends_at: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({
  artistId,
  serviceId,
  selectedDate,
  selectedTime,
  timezone,
  onDateSelect,
  onTimeSelect,
  onNext,
  onPrevious
}) => {
  const {
    availableTimeSlots,
    loading,
    error,
    isDateAvailable,
    getSlotByTime,
    service
  } = useSlotGeneration({
    artistId,
    serviceId,
    selectedDate,
    timezone
  });

  const handleTimeSelect = (time: string) => {
    if (!selectedDate) return;

    const slot = getSlotByTime(time);
    if (!slot) return;

    onTimeSelect(time, slot.start, slot.end);
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, new Date()) && !isToday(date) || !isDateAvailable(date);
  };

  const maxDate = addDays(new Date(), 60); // 2 months ahead

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-2">Select Date & Time</h3>
        <p className="text-sm text-muted-foreground">
          Choose when you'd like your appointment
        </p>
      </div>

      {/* Service Summary */}
      {service && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{service.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {service.duration_minutes} minutes
                </p>
              </div>
              {service.price && (
                <Badge variant="secondary" className="font-semibold">
                  ${service.price}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Date Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span className="font-medium">Select Date</span>
        </div>
        
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateSelect(date)}
            disabled={isDateDisabled}
            fromDate={new Date()}
            toDate={maxDate}
            className={cn("rounded-md border pointer-events-auto")}
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
              day_today: "bg-accent text-accent-foreground",
            }}
          />
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Select Time</span>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Loading available times...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <p className="text-sm text-destructive">
                Error loading times. Please try again.
              </p>
            </div>
          ) : availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-sm h-10",
                    selectedTime === time && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <h4 className="font-medium mb-1">No Available Times</h4>
              <p className="text-sm">
                {format(selectedDate, 'PPPP')} has no available time slots.
              </p>
              <p className="text-sm">Please select another date.</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="min-w-24"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="min-w-24"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};