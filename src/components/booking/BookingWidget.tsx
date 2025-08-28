import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Service } from '@/types/booking-enhanced';
import { ServiceSelectionStep } from './steps/ServiceSelectionStep';
import { DateTimeSelectionStep } from './steps/DateTimeSelectionStep';
import { BookingDetailsStep } from './steps/BookingDetailsStep';
import { BookingConfirmationStep } from './steps/BookingConfirmationStep';

interface BookingWidgetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  artistId: string;
  artistName: string;
  artistAvatar?: string;
  services: Service[];
  timezone?: string;
}

type BookingStep = 'service' | 'datetime' | 'details' | 'confirmation';

interface BookingData {
  service?: Service;
  date?: Date;
  time?: string;
  starts_at?: string;
  ends_at?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  isOpen,
  onOpenChange,
  artistId,
  artistName,
  artistAvatar,
  services,
  timezone = 'America/New_York'
}) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [bookingData, setBookingData] = useState<BookingData>({
    client_name: '',
    client_email: '',
    client_phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const steps: { key: BookingStep; title: string; icon: React.ReactNode }[] = [
    { key: 'service', title: 'Service', icon: <User className="h-4 w-4" /> },
    { key: 'datetime', title: 'Date & Time', icon: <Calendar className="h-4 w-4" /> },
    { key: 'details', title: 'Details', icon: <Clock className="h-4 w-4" /> },
    { key: 'confirmation', title: 'Confirmation', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const goToNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const goToPrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 'service':
        return !!bookingData.service;
      case 'datetime':
        return !!bookingData.date && !!bookingData.time;
      case 'details':
        return !!(bookingData.client_name && bookingData.client_email && bookingData.client_phone);
      default:
        return false;
    }
  };

  const resetBooking = () => {
    setCurrentStep('service');
    setBookingData({
      client_name: '',
      client_email: '',
      client_phone: '',
      notes: ''
    });
    setBookingId(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after a delay to avoid visual glitch
    setTimeout(resetBooking, 300);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'service':
        return (
          <ServiceSelectionStep
            services={services}
            selectedService={bookingData.service}
            onServiceSelect={(service) => updateBookingData({ service })}
            onNext={goToNext}
          />
        );
      case 'datetime':
        return (
          <DateTimeSelectionStep
            artistId={artistId}
            serviceId={bookingData.service?.id}
            selectedDate={bookingData.date}
            selectedTime={bookingData.time}
            timezone={timezone}
            onDateSelect={(date) => updateBookingData({ date })}
            onTimeSelect={(time, starts_at, ends_at) => 
              updateBookingData({ time, starts_at, ends_at })
            }
            onNext={goToNext}
            onPrevious={goToPrevious}
          />
        );
      case 'details':
        return (
          <BookingDetailsStep
            bookingData={bookingData}
            onUpdateData={updateBookingData}
            onNext={goToNext}
            onPrevious={goToPrevious}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            setBookingId={setBookingId}
            setCurrentStep={(step: BookingStep) => setCurrentStep(step)}
            artistId={artistId}
          />
        );
      case 'confirmation':
        return (
          <BookingConfirmationStep
            bookingData={bookingData}
            artistName={artistName}
            bookingId={bookingId}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader className="relative">
          <button
            onClick={handleClose}
            className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <DialogTitle className="text-xl font-serif mb-2">
            Book with {artistName}
          </DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const isActive = currentStep === step.key;
              const isCompleted = index < currentStepIndex;
              const isAccessible = index <= currentStepIndex;
              
              return (
                <div key={step.key} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
                      isActive && "bg-primary border-primary text-primary-foreground",
                      isCompleted && "bg-primary border-primary text-primary-foreground",
                      !isActive && !isCompleted && !isAccessible && "border-muted bg-muted text-muted-foreground",
                      !isActive && !isCompleted && isAccessible && "border-border bg-background"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 w-12 mx-2 transition-colors duration-200",
                        isCompleted ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Step Title */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-muted-foreground">
              Step {currentStepIndex + 1} of {steps.length}
            </h3>
            <p className="text-base font-semibold mt-1">
              {steps[currentStepIndex]?.title}
            </p>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};