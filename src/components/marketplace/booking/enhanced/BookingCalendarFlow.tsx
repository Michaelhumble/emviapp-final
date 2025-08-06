import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Star, 
  CreditCard, 
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { useAvailableTimeSlots } from '@/hooks/useAvailableTimeSlots';
import { toast } from 'sonner';

interface Provider {
  id: string;
  name: string;
  avatar_url?: string;
  rating: number;
  reviewCount: number;
  location: string;
  specialty: string;
  isVerified: boolean;
}

interface Service {
  id: string;
  title: string;
  price: number;
  duration: number;
  description: string;
}

interface BookingCalendarFlowProps {
  provider: Provider;
  services: Service[];
  onBookingComplete: (bookingData: any) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingCalendarFlow: React.FC<BookingCalendarFlowProps> = ({
  provider,
  services,
  onBookingComplete,
  isOpen,
  onOpenChange
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { availableTimeSlots, isDateAvailable } = useAvailableTimeSlots(
    provider.id, 
    selectedDate
  );

  const steps = [
    'Select Service',
    'Choose Date & Time', 
    'Review & Pay'
  ];

  const resetFlow = () => {
    setCurrentStep(0);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime('');
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetFlow();
    }
  }, [isOpen]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const handleDateTimeSelect = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }
    setCurrentStep(2);
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    
    try {
      const bookingData = {
        providerId: provider.id,
        serviceId: selectedService?.id,
        date: selectedDate,
        time: selectedTime,
        totalAmount: selectedService?.price || 0
      };
      
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onBookingComplete(bookingData);
      toast.success('Booking confirmed! Payment successful.');
      onOpenChange(false);
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Select a Service</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <Card className="border-2 hover:border-purple-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{service.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{service.duration} min</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-purple-600">${service.price}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(0)}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">Choose Date & Time</h3>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="font-medium">{selectedService?.title}</span>
                  <Badge variant="secondary">${selectedService?.price}</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Select Date</h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || !isDateAvailable(date);
                  }}
                  className="border rounded-lg"
                />
              </div>

              <div>
                <h4 className="font-medium mb-3">Available Times</h4>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {availableTimeSlots.length > 0 ? (
                      availableTimeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(slot)}
                          className="text-sm"
                        >
                          {slot}
                        </Button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 col-span-2">
                        No available times for this date
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Select a date to see available times</p>
                )}
              </div>
            </div>

            <Button
              onClick={handleDateTimeSelect}
              disabled={!selectedDate || !selectedTime}
              className="w-full"
            >
              Continue to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(1)}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">Review & Pay</h3>
            </div>

            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={provider.avatar_url} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {provider.rating} ({provider.reviewCount} reviews)
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {provider.location}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Service:</span>
                    <span className="font-medium">{selectedService?.title}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Date:</span>
                    <span className="font-medium">
                      {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Duration:</span>
                    <span className="font-medium">{selectedService?.duration} minutes</span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-purple-600">${selectedService?.price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Check className="h-4 w-4 text-green-600" />
                  Secure payment powered by Stripe
                </div>
                <Button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ${selectedService?.price} & Confirm Booking
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book with {provider.name}</DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index <= currentStep 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 h-1 mx-2
                    ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 mt-2">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </div>
        </DialogHeader>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCalendarFlow;