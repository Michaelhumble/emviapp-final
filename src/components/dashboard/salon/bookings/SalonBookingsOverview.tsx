
import React from 'react';
import { motion } from 'framer-motion';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useSalonBookings } from './hooks/useSalonBookings';
import BookingStatusBadge from './components/BookingStatusBadge';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import BookingLoadingState from './components/BookingLoadingState';
import BookingErrorState from './components/BookingErrorState';
import EmptyBookingState from './EmptyBookingState';

interface SalonBookingsOverviewProps {
  className?: string;
}

const SalonBookingsOverview: React.FC<SalonBookingsOverviewProps> = ({ className = '' }) => {
  const { bookings, loading, error, refetch } = useSalonBookings();

  if (loading) {
    return <BookingLoadingState />;
  }

  if (error) {
    return <BookingErrorState error={error} onRetry={refetch} />;
  }

  if (!bookings || bookings.length === 0) {
    return <EmptyBookingState />;
  }

  return (
    <Card className={`overflow-hidden border rounded-lg shadow-sm ${className}`}>
      <div className="responsive-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.slice(0, 5).map((booking, index) => (
              <TableRow key={booking.id || index}>
                <TableCell className="font-medium">{booking.client_name}</TableCell>
                <TableCell>{booking.service_name}</TableCell>
                <TableCell>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</TableCell>
                <TableCell>{format(new Date(booking.booking_date), 'h:mm a')}</TableCell>
                <TableCell>
                  <BookingStatusBadge status={booking.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default SalonBookingsOverview;
