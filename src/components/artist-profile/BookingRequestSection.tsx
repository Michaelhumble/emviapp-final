import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { UserProfile } from "@/types/profile";
import { DaySchedule } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import BookingConfirmationModal from "./BookingConfirmationModal";
import { Service } from "@/pages/u/artist-profile/types";

interface BookingTime {
  day: string;
  time: string;
}

interface BookingRequestSectionProps {
  profile: UserProfile;
  services: Service[];
}

const BookingRequestSection = ({ profile, services }: BookingRequestSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user, userRole } = useAuth();
  
  const getAvailabilitySchedule = (): DaySchedule[] => {
    if (!profile?.preferences) return [];
    
    const scheduleString = profile.preferences.find(pref => 
      typeof pref === 'string' && pref.startsWith('schedule:')
    );
    
    if (scheduleString) {
      try {
        return JSON.parse(scheduleString.substring(9));
      } catch (error) {
        console.error('Error parsing schedule data:', error);
      }
    }
    
    return [];
  };
  
  const availabilitySchedule = getAvailabilitySchedule();
  const availableDays = availabilitySchedule
    .filter(day => day.active)
    .map(day => day.day.toLowerCase());
  
  const isDateAvailable = (date: Date) => {
    const day = format(date, 'EEEE').toLowerCase();
    return availableDays.includes(day);
  };
  
  const getAvailableTimeSlots = () => {
    if (!date) return [];
    
    const day = format(date, 'EEEE');
    const matchingDay = availabilitySchedule.find(
      schedule => schedule.day.toLowerCase() === day.toLowerCase() && schedule.active
    );
    
    return matchingDay ? [matchingDay.time] : [];
  };
  
  const getFormattedDate = () => {
    return date ? format(date, 'MMMM d, yyyy') : '';
  };
  
  const getSelectedServiceObject = () => {
    return services.find(service => service.id === selectedService) || null;
  };
  
  const handleSubmitBooking = async () => {
    if (!user || !date || !time || !selectedService) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          sender_id: user.id,
          recipient_id: profile.id,
          date_requested: format(date, 'yyyy-MM-dd'),
          time_requested: time,
          note: note,
          service_id: selectedService,
          status: 'pending'
        });
      
      if (error) throw error;
      
      toast.success("Booking request sent successfully!");
      setIsOpen(false);
      setDate(undefined);
      setTime("");
      setSelectedService("");
      setNote("");
      setStep(1);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to send booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userRole !== 'customer' || !profile.accepts_bookings) {
    return null;
  }
  
  const hasServices = services && services.length > 0;
  const hasSchedule = availabilitySchedule.some(day => day.active);
  
  if (!hasServices || !hasSchedule) {
    return null;
  }
  
  const isVietnamese = profile?.preferred_language === 'vi';
  
  const translations = {
    title: isVietnamese ? "Đặt Lịch Hẹn Với Nghệ Sĩ" : "Request a Booking",
    requestButton: isVietnamese 
      ? `Đặt Lịch Với ${profile.full_name}` 
      : `Request Booking with ${profile.full_name}`,
    chooseService: isVietnamese ? "Chọn Dịch Vụ" : "Choose a Service",
    chooseDate: isVietnamese ? "Chọn Ngày" : "Choose a Date",
    chooseTime: isVietnamese ? "Chọn Thời Gian" : "Choose a Time",
    noteLabel: isVietnamese ? "Ghi Chú" : "Add a Note",
    notePlaceholder: isVietnamese 
      ? "Bạn có yêu cầu đặc biệt không?" 
      : "Anything you'd like to share?",
    submitButton: isVietnamese ? "Gửi Yêu Cầu Đặt Lịch" : "Submit Booking Request",
    next: isVietnamese ? "Tiếp Tục" : "Next",
    back: isVietnamese ? "Quay Lại" : "Back",
    review: isVietnamese ? "Xem Lại & Xác Nhận" : "Review & Confirm"
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-serif font-semibold mb-4">{translations.title}</h2>
      
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white"
      >
        {translations.requestButton}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {translations.title}
            </DialogTitle>
            <DialogDescription>
              {isVietnamese 
                ? `Đặt lịch hẹn với ${profile.full_name}` 
                : `Book time with ${profile.full_name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {translations.chooseService}
                  </label>
                  <Select 
                    value={selectedService} 
                    onValueChange={setSelectedService}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        isVietnamese ? "Chọn dịch vụ..." : "Select a service..."
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{service.title}</span>
                            <span className="text-sm text-gray-500">
                              ${service.price} · {service.duration_minutes} min
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedService}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {translations.next}
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {translations.chooseDate}
                  </label>
                  <div className="border rounded-md p-1 bg-white">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || !isDateAvailable(date);
                      }}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                
                {date && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      <Clock className="inline h-4 w-4 mr-1" />
                      {translations.chooseTime}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {getAvailableTimeSlots().map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          variant={time === timeSlot ? "default" : "outline"}
                          className={time === timeSlot ? "bg-purple-600 text-white" : ""}
                          onClick={() => setTime(timeSlot)}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    {translations.back}
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!date || !time}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {translations.next}
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    {translations.noteLabel}
                  </label>
                  <Textarea
                    placeholder={translations.notePlaceholder}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="resize-none h-24"
                  />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    {translations.back}
                  </Button>
                  <Button
                    onClick={() => setShowConfirmation(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {translations.review}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <BookingConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleSubmitBooking}
        profile={profile}
        selectedService={getSelectedServiceObject()}
        date={date}
        time={time}
        note={note}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BookingRequestSection;
