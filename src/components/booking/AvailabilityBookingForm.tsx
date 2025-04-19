
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAvailableTimeSlots } from "@/hooks/useAvailableTimeSlots";
import { useAvailabilityValidation } from "@/hooks/useAvailabilityValidation";
import { BookingStateWrapper } from "./BookingStateWrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { Service } from "@/pages/u/artist-profile/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useBookingErrorHandler } from "@/hooks/useBookingErrorHandler";

interface AvailabilityBookingFormProps {
  artistId: string;
  profile: UserProfile;
  selectedService?: Service | null;
  onBookingSuccess?: () => void;
  onCancel?: () => void;
}

export const AvailabilityBookingForm = ({
  artistId,
  profile,
  selectedService,
  onBookingSuccess,
  onCancel
}: AvailabilityBookingFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { availableTimeSlots, isDateAvailable } = useAvailableTimeSlots(artistId, selectedDate);
  const { isValidating, validateTimeSlot } = useAvailabilityValidation();
  const { handleBookingError } = useBookingErrorHandler();

  // Reset selected time when date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  const handleSubmit = async () => {
    if (!artistId || !selectedDate || !selectedTime || !selectedService) {
      toast.error("Please select a date, time, and service before booking");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate the slot one more time before submitting
      const isAvailable = await validateTimeSlot(artistId, selectedDate, selectedTime);
      
      if (!isAvailable) {
        throw new Error("This time slot is no longer available. Please select another time.");
      }

      // Format the date for database storage
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // Create booking in Supabase
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          recipient_id: artistId,
          sender_id: null, // Will be filled by auth.uid() in RLS
          service_id: selectedService.id,
          date_requested: formattedDate,
          time_requested: selectedTime,
          note: notes,
          status: "pending",
          metadata: {
            service_name: selectedService.title,
            service_price: selectedService.price
          }
        });

      if (error) throw error;
      
      toast.success("Booking request submitted successfully!");
      if (onBookingSuccess) onBookingSuccess();
    } catch (err) {
      handleBookingError(err);
      setError(err instanceof Error ? err : new Error("Failed to submit booking"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book with {profile.full_name}</CardTitle>
        <CardDescription>
          Select a date and time for your appointment
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <BookingStateWrapper 
          loading={isValidating || isSubmitting}
          error={error}
          loadingComponent={<div className="p-8 text-center">Loading availability...</div>}
        >
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-sm font-medium">Select Date</div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  // Disable past dates
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today || !isDateAvailable(date);
                }}
                className="border rounded-md"
              />
            </div>

            {selectedDate && (
              <div>
                <div className="mb-2 text-sm font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Available Times
                </div>
                
                {availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-blue-500 text-white" : ""}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>
                      No availability for this day. Please select another date.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {selectedTime && (
              <div>
                <div className="mb-2 text-sm font-medium">Notes for {profile.full_name} (optional)</div>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests or information?"
                  className="resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>
        </BookingStateWrapper>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedDate || !selectedTime || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Request Booking"}
        </Button>
      </CardFooter>
    </Card>
  );
};
