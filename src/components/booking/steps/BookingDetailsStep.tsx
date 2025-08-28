import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Loader2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { useBookingSubmission } from '@/hooks/useEnhancedBookingSubmission';
import { BookingRequest } from '@/types/booking-enhanced';

interface BookingData {
  service?: any;
  date?: Date;
  time?: string;
  starts_at?: string;
  ends_at?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes: string;
}

interface BookingDetailsStepProps {
  bookingData: BookingData;
  onUpdateData: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  setBookingId: (id: string | null) => void;
  setCurrentStep: (step: string) => void;
  artistId: string;
}

export const BookingDetailsStep: React.FC<BookingDetailsStepProps> = ({
  bookingData,
  onUpdateData,
  onNext,
  onPrevious,
  isSubmitting,
  setIsSubmitting,
  setBookingId,
  setCurrentStep,
  artistId
}) => {
  const { submitBooking } = useBookingSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingData.starts_at || !bookingData.ends_at) return;

    setIsSubmitting(true);

    const bookingRequest: BookingRequest = {
      artist_id: artistId,
      service_id: bookingData.service?.id,
      client_name: bookingData.client_name,
      client_email: bookingData.client_email,
      client_phone: bookingData.client_phone,
      starts_at: bookingData.starts_at,
      ends_at: bookingData.ends_at,
      notes: bookingData.notes,
      source: 'web' as const
    };

    try {
      const result = await submitBooking(bookingRequest);
      if (result.success && result.booking_id) {
        setBookingId(result.booking_id);
        setCurrentStep('confirmation');
      }
    } catch (error) {
      console.error('Booking submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return !!(
      bookingData.client_name.trim() &&
      bookingData.client_email.trim() &&
      bookingData.client_phone.trim()
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-2">Your Details</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your contact information
        </p>
      </div>

      {/* Booking Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{bookingData.service?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">
                {bookingData.date && format(bookingData.date, 'PPP')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{bookingData.service?.duration_minutes} min</span>
            </div>
            {bookingData.service?.price && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <Badge variant="secondary" className="font-semibold">
                  ${bookingData.service.price}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client_name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="client_name"
              value={bookingData.client_name}
              onChange={(e) => onUpdateData({ client_name: e.target.value })}
              placeholder="Enter your full name"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client_phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="client_phone"
              type="tel"
              value={bookingData.client_phone}
              onChange={(e) => onUpdateData({ client_phone: e.target.value })}
              placeholder="(555) 123-4567"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="client_email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address *
          </Label>
          <Input
            id="client_email"
            type="email"
            value={bookingData.client_email}
            onChange={(e) => onUpdateData({ client_email: e.target.value })}
            placeholder="your@email.com"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Special Requests (Optional)
          </Label>
          <Textarea
            id="notes"
            value={bookingData.notes}
            onChange={(e) => onUpdateData({ notes: e.target.value })}
            placeholder="Any special requests or notes for your appointment..."
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          By booking, you agree to receive confirmation emails and SMS updates about your appointment. 
          Your information will be shared with the service provider for appointment coordination.
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={isSubmitting}
            className="min-w-24"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="min-w-32 bg-gradient-to-r from-primary to-primary/80"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              'Complete Booking'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};