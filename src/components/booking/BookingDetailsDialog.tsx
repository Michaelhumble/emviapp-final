import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, User, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface BookingDetailsDialogProps {
  booking: any;
  open: boolean;
  onClose: () => void;
  onAccept?: (id: string) => Promise<void>;
  onDecline?: (id: string) => Promise<void>;
  onCancel?: (id: string) => Promise<void>;
  loading?: boolean;
}

export const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({
  booking,
  open,
  onClose,
  onAccept,
  onDecline,
  onCancel,
  loading = false
}) => {
  if (!booking) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM do, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Booking Details
            <Badge className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Client Information */}
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Client Information
            </h4>
            <div className="pl-6 space-y-1 text-sm">
              <p><strong>Name:</strong> {booking.client_name || 'Guest'}</p>
              {booking.metadata?.client_email && (
                <p className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  {booking.metadata.client_email}
                </p>
              )}
              {booking.metadata?.client_phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  {booking.metadata.client_phone}
                </p>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-2">
            <h4 className="font-semibold">Service Details</h4>
            <div className="pl-6 space-y-1 text-sm">
              <p><strong>Service:</strong> {booking.metadata?.service_name || 'Not specified'}</p>
              {booking.metadata?.price && (
                <p><strong>Price:</strong> ${booking.metadata.price}</p>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-2">
            <h4 className="font-semibold">Appointment Details</h4>
            <div className="pl-6 space-y-1 text-sm">
              {booking.date_requested && (
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-3 w-3" />
                  {formatDate(booking.date_requested)}
                </p>
              )}
              {booking.time_requested && (
                <p className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {booking.time_requested}
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          {booking.note && (
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Notes
              </h4>
              <div className="pl-6 text-sm bg-gray-50 p-3 rounded-lg">
                {booking.note}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {booking.status === 'pending' && (onAccept || onDecline) && (
            <div className="flex gap-2 pt-4">
              {onAccept && (
                <Button
                  onClick={() => onAccept(booking.id)}
                  disabled={loading}
                  className="flex-1"
                >
                  Accept
                </Button>
              )}
              {onDecline && (
                <Button
                  variant="outline"
                  onClick={() => onDecline(booking.id)}
                  disabled={loading}
                  className="flex-1"
                >
                  Decline
                </Button>
              )}
            </div>
          )}

          {booking.status === 'accepted' && onCancel && (
            <div className="pt-4">
              <Button
                variant="destructive"
                onClick={() => onCancel(booking.id)}
                disabled={loading}
                className="w-full"
              >
                Cancel Booking
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};