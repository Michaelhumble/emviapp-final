
import { Booking } from './types';
import { addDays, format } from 'date-fns';

const today = new Date();

export const mockBookings: Booking[] = [
  {
    id: '1',
    clientName: 'Emma Thompson',
    serviceName: 'Full Manicure',
    date: format(today, 'yyyy-MM-dd'),
    time: '10:00',
    status: 'confirmed',
    notes: 'Preferred light colors'
  },
  {
    id: '2',
    clientName: 'James Wilson',
    serviceName: 'Haircut & Style',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: '14:30',
    status: 'confirmed'
  },
  {
    id: '3',
    clientName: 'Sophia Chen',
    serviceName: 'Full Makeup',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    time: '11:15',
    status: 'pending'
  },
  {
    id: '4',
    clientName: 'Michelle Rodriguez',
    serviceName: 'Hair Coloring',
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    time: '16:00',
    status: 'confirmed'
  }
];

export const mockServices = [
  'Full Manicure', 
  'Haircut & Style', 
  'Full Makeup', 
  'Hair Coloring',
  'Facial Treatment',
  'Nail Art',
  'Pedicure',
  'Brow Shaping'
];
