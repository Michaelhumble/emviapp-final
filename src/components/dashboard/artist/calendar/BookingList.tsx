
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock booking data (to be replaced with real data)
const mockBookings = [
  {
    id: '1',
    client: 'Emma Thompson',
    service: 'Bridal Makeup',
    date: 'April 26, 2025',
    time: '2:00 PM',
    status: 'confirmed'
  },
  {
    id: '2',
    client: 'Sarah Johnson',
    service: 'Makeup Session',
    date: 'April 27, 2025',
    time: '10:30 AM',
    status: 'completed'
  },
  {
    id: '3',
    client: 'Jessica Brown',
    service: 'Full Glam Package',
    date: 'April 28, 2025',
    time: '4:00 PM',
    status: 'pending'
  }
];

const BookingList: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {booking.client}
                </div>
              </TableCell>
              <TableCell>{booking.service}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {booking.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {booking.time}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === 'confirmed'
                      ? 'default'
                      : booking.status === 'completed'
                      ? 'success'
                      : 'outline'
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {mockBookings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No bookings found.
        </div>
      )}
    </motion.div>
  );
};

export default BookingList;
