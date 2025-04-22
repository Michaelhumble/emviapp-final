
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ClockIcon, InfoIcon, CheckCircle, Loader2 } from "lucide-react";
import ServicesList from "./ServicesList";
import { format } from "date-fns";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
}

interface BookingFormProps {
  artistId: string;
  artistName: string;
  services: Service[];
  onClose: () => void;
}

enum BookingStep {
  SelectService,
  SelectDateTime,
  Confirmation
}

const BookingForm = ({ artistId, artistName, services, onClose }: BookingFormProps) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SelectService);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock available times - in a real app, these would come from the artist's availability
  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(BookingStep.SelectDateTime);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to book an appointment");
      navigate("/auth/signin", { state: { returnTo: window.location.pathname } });
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error("Please select a service, date, and time");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would call an API to create the booking
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API request
      
      toast.success("Booking request sent successfully!");
      setCurrentStep(BookingStep.Confirmation);
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(`https://emvi.app/r/${user?.id}`);
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      {currentStep === BookingStep.SelectService && (
        <>
          <CardHeader>
            <CardTitle>Book with {artistName}</CardTitle>
            <CardDescription>Select a service to begin</CardDescription>
          </CardHeader>
          <CardContent>
            <ServicesList 
              services={services} 
              onSelectService={handleServiceSelect} 
              isSelectable={true} 
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </CardFooter>
        </>
      )}

      {currentStep === BookingStep.SelectDateTime && selectedService && (
        <>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Book {selectedService.name}</CardTitle>
                <CardDescription>Select a date and time</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground"
                onClick={() => setCurrentStep(BookingStep.SelectService)}
              >
                Change Service
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => {
                  // Disable dates in the past
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </div>

            {selectedDate && (
              <>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Available Times</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-primary" : ""}
                        size="sm"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Additional Notes</h3>
                  <Textarea
                    placeholder="Any specific requests or details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="rounded-md bg-muted p-3 text-sm">
                  <div className="flex space-x-2 text-muted-foreground">
                    <InfoIcon className="h-4 w-4 flex-shrink-0" />
                    <div className="space-y-1">
                      <p>Average response time: 2 hours</p>
                      <p>Free cancellation up to 24 hours before appointment</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(BookingStep.SelectService)}
            >
              Back
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedDate || !selectedTime || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </CardFooter>
        </>
      )}

      {currentStep === BookingStep.Confirmation && (
        <>
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl">You're all set!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-1">
              <p className="font-medium">{selectedService?.name}</p>
              {selectedDate && selectedTime && (
                <p className="text-muted-foreground text-sm">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                </p>
              )}
            </div>
            
            <div className="bg-muted rounded-md p-4 text-sm text-center">
              <p className="font-medium mb-1">Invite friends and earn credits!</p>
              <p className="text-muted-foreground text-xs mb-3">Get 500 credits for each friend who books a service</p>
              <Button size="sm" onClick={handleCopyReferralLink}>
                Copy Referral Link
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default BookingForm;
