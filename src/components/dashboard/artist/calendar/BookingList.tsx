
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock, Search, X, Edit2, Trash2 } from "lucide-react";
import { format, parseISO, isAfter, isBefore, startOfDay } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import BookingModal from './BookingModal';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

// Mock data for bookings
const mockBookings = [
  {
    id: '1',
    clientName: 'Emma Thompson',
    serviceId: '4',
    serviceName: 'Bridal Makeup',
    date: '2025-05-15T00:00:00.000Z',
    time: '2025-05-15T14:00:00.000Z',
    price: 250,
    status: 'confirmed',
    paymentStatus: 'paid',
    notes: 'Wedding at Grand Hotel'
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    serviceId: '1',
    serviceName: 'Makeup Session',
    date: '2025-05-10T00:00:00.000Z',
    time: '2025-05-10T10:30:00.000Z',
    price: 120,
    status: 'completed',
    paymentStatus: 'paid',
    notes: 'Corporate photoshoot'
  },
  {
    id: '3',
    clientName: 'Jessica Brown',
    serviceId: '3',
    serviceName: 'Full Glam Package',
    date: '2025-05-20T00:00:00.000Z',
    time: '2025-05-20T16:00:00.000Z',
    price: 200,
    status: 'confirmed',
    paymentStatus: 'unpaid',
    notes: 'Birthday party'
  },
  {
    id: '4',
    clientName: 'Lisa Wilson',
    serviceId: '2',
    serviceName: 'Hair Styling',
    date: '2025-04-05T00:00:00.000Z',
    time: '2025-04-05T13:00:00.000Z',
    price: 80,
    status: 'cancelled',
    paymentStatus: 'refunded',
    notes: 'Cancelled due to illness'
  },
  {
    id: '5',
    clientName: 'Rachel Green',
    serviceId: '1',
    serviceName: 'Makeup Session',
    date: '2025-05-25T00:00:00.000Z',
    time: '2025-05-25T11:00:00.000Z',
    price: 120,
    status: 'confirmed',
    paymentStatus: 'partial',
    notes: 'Graduation ceremony'
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'unpaid':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'partial':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'refunded':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const BookingList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [editBooking, setEditBooking] = useState<any | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  const today = startOfDay(new Date());

  const filteredBookings = useMemo(() => {
    return mockBookings.filter(booking => {
      // Search query filter
      if (searchQuery && !booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && booking.status !== statusFilter) {
        return false;
      }
      
      // Date range filter
      if (dateRange.from && isBefore(parseISO(booking.date), startOfDay(dateRange.from))) {
        return false;
      }
      
      if (dateRange.to && isAfter(parseISO(booking.date), startOfDay(dateRange.to))) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, statusFilter, dateRange]);
  
  const upcomingBookings = filteredBookings.filter(booking => 
    isAfter(parseISO(booking.date), today) && booking.status !== 'cancelled'
  );
  
  const pastBookings = filteredBookings.filter(booking => 
    isBefore(parseISO(booking.date), today) || booking.status === 'cancelled'
  );

  const handleDeleteBooking = (id: string) => {
    // In a real app, this would be an API call
    console.log('Deleting booking:', id);
    toast.success('Booking deleted successfully');
    setDeleteConfirmation(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by client or service"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery('')}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
              <div className="flex items-center justify-between p-3 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {dateRange.from && dateRange.to
                    ? `${dateRange.to.getDate() - dateRange.from.getDate() + 1} days`
                    : "Select date range"}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateRange({ from: undefined, to: undefined })}
                >
                  Reset
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {(searchQuery || statusFilter !== 'all' || dateRange.from || dateRange.to) && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="hidden md:flex">
            <X className="mr-2 h-4 w-4" /> Clear filters
          </Button>
        )}
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <CalendarIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
          <p className="text-gray-500">
            {searchQuery || statusFilter !== 'all' || dateRange.from
              ? "Try adjusting your search or filters"
              : "Start by adding new appointments to your calendar"}
          </p>
        </div>
      ) : (
        <>
          {upcomingBookings.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upcoming Bookings</h3>
              {upcomingBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white rounded-lg border border-gray-100 p-4 hover:border-purple-200 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{booking.clientName}</h4>
                        <Badge className={cn("font-normal", getStatusColor(booking.status))}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                        <Badge className={cn("font-normal", getPaymentStatusColor(booking.paymentStatus))}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{booking.serviceName}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                        {format(parseISO(booking.date), 'MMMM d, yyyy')}
                        <Clock className="h-3.5 w-3.5 ml-3 mr-1.5" />
                        {format(parseISO(booking.time), 'h:mm a')}
                      </div>
                      {booking.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">"{booking.notes}"</p>
                      )}
                    </div>
                    
                    <div className="flex items-center md:items-start gap-3">
                      <div className="text-right min-w-20">
                        <div className="font-medium">${booking.price}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEditBooking(booking)} 
                        className="h-8 w-8"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setDeleteConfirmation(booking.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {pastBookings.length > 0 && (
            <div className="space-y-4 mt-8">
              <h3 className="text-lg font-medium">Past Bookings</h3>
              {pastBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white/80 rounded-lg border border-gray-100 p-4"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{booking.clientName}</h4>
                        <Badge className={cn("font-normal", getStatusColor(booking.status))}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                        <Badge className={cn("font-normal", getPaymentStatusColor(booking.paymentStatus))}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{booking.serviceName}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                        {format(parseISO(booking.date), 'MMMM d, yyyy')}
                        <Clock className="h-3.5 w-3.5 ml-3 mr-1.5" />
                        {format(parseISO(booking.time), 'h:mm a')}
                      </div>
                      {booking.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">"{booking.notes}"</p>
                      )}
                    </div>
                    
                    <div className="flex items-center md:items-start gap-3">
                      <div className="text-right min-w-20">
                        <div className="font-medium">${booking.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {editBooking && (
        <BookingModal
          open={!!editBooking}
          onClose={() => setEditBooking(null)}
          existingBooking={editBooking}
        />
      )}
      
      <Dialog open={!!deleteConfirmation} onOpenChange={() => setDeleteConfirmation(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirmation(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteConfirmation && handleDeleteBooking(deleteConfirmation)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingList;
