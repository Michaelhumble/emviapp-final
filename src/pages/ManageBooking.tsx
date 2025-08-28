import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { verifyManageToken, canRescheduleBooking, canCancelBooking } from '@/lib/booking/tokens';
import { supabase } from '@/integrations/supabase/client';
import type { Booking, Service, LocationType } from '@/lib/booking/types';
import { RescheduleDialog } from '@/components/booking/manage/RescheduleDialog';
import { CancellationDialog } from '@/components/booking/manage/CancellationDialog';
import { format } from 'date-fns';

export default function ManageBooking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const bookingId = searchParams.get('id');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!bookingId || !token) {
      toast.error('Invalid booking link');
      navigate('/');
      return;
    }

    verifyAndLoadBooking();
  }, [bookingId, token]);

  const verifyAndLoadBooking = async () => {
    if (!bookingId || !token) return;

    try {
      setLoading(true);

      // Verify token
      const isValid = await verifyManageToken(token, bookingId);
      if (!isValid) {
        toast.error('This booking link has expired or is invalid');
        navigate('/');
        return;
      }

      setVerified(true);

      // Load booking details
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (bookingError || !bookingData) {
        toast.error('Booking not found');
        navigate('/');
        return;
      }

      setBooking(bookingData as Booking);

      // Load service details if available
      if (bookingData.service_id) {
        const { data: serviceData } = await supabase
          .from('services')
          .select('*')
          .eq('id', bookingData.service_id)
          .single();

        if (serviceData) {
          setService({
            ...serviceData,
            name: serviceData.title,
            artist_id: serviceData.user_id,
            is_active: serviceData.is_visible,
            location_type: 'in_person' as LocationType
          });
        }
      }
    } catch (error) {
      console.error('Error loading booking:', error);
      toast.error('Failed to load booking details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleRescheduleSuccess = () => {
    setShowReschedule(false);
    verifyAndLoadBooking(); // Reload booking data
    toast.success('Booking rescheduled successfully');
  };

  const handleCancelSuccess = () => {
    setShowCancel(false);
    verifyAndLoadBooking(); // Reload booking data
    toast.success('Booking cancelled successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="animate-pulse">Loading booking details...</div>
      </div>
    );
  }

  if (!verified || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h1 className="text-xl font-semibold mb-2">Invalid Booking Link</h1>
            <p className="text-muted-foreground mb-4">
              This booking link has expired or is no longer valid.
            </p>
            <Button onClick={() => navigate('/')}>
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canReschedule = canRescheduleBooking(booking.starts_at || '');
  const canCancel = canCancelBooking(booking.starts_at || '');
  const isActive = booking.status === 'confirmed' || booking.status === 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Your Booking</h1>
          <p className="text-muted-foreground">
            View details and make changes to your appointment
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Booking Details
              </CardTitle>
              <Badge variant={booking.status === 'confirmed' ? 'default' : 
                             booking.status === 'cancelled' ? 'destructive' : 
                             booking.status === 'rescheduled' ? 'secondary' : 'outline'}>
                {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{booking.client_name}</p>
                  <p className="text-sm text-muted-foreground">{booking.client_email}</p>
                </div>
              </div>

              {service && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{service.title || service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.duration_minutes} minutes • ${service.price}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {booking.date_requested ? format(new Date(booking.date_requested), 'EEEE, MMMM d, yyyy') : 'Date TBD'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.time_requested || 'Time TBD'}
                  </p>
                </div>
              </div>

              {booking.note && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Notes</p>
                    <p className="text-sm text-muted-foreground">{booking.note}</p>
                  </div>
                </div>
              )}
            </div>

            {booking.cancellation_reason && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-destructive mb-1">Cancellation Reason</p>
                <p className="text-sm text-muted-foreground">{booking.cancellation_reason}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {isActive && (
          <Card>
            <CardHeader>
              <CardTitle>Manage Booking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button
                  onClick={() => setShowReschedule(true)}
                  disabled={!canReschedule}
                  className="w-full"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Reschedule Booking
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={() => setShowCancel(true)}
                  disabled={!canCancel}
                  className="w-full"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Cancel Booking
                </Button>
              </div>

              {(!canReschedule || !canCancel) && (
                <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                  <p className="font-medium mb-1">Time restrictions:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Reschedule: Up to 2 hours before appointment</li>
                    <li>• Cancel: Up to 1 hour before appointment</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dialogs */}
        <RescheduleDialog
          open={showReschedule}
          onOpenChange={setShowReschedule}
          booking={booking}
          service={service}
          onSuccess={handleRescheduleSuccess}
        />

        <CancellationDialog
          open={showCancel}
          onOpenChange={setShowCancel}
          booking={booking}
          service={service}
          onSuccess={handleCancelSuccess}
        />
      </div>
    </div>
  );
}