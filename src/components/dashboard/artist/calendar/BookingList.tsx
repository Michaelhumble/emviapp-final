import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { 
  CalendarIcon, 
  Search, 
  ChevronDown, 
  ChevronRight 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  client_name: string;
  service_name: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
  price: number;
  notes?: string;
  paid: boolean;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    client_name: 'Sarah Johnson',
    service_name: 'Gel Manicure',
    date: '2025-04-26',
    time: '10:00 AM',
    status: 'confirmed',
    price: 45,
    paid: true,
    notes: 'Regular client, prefers pastel colors'
  },
  {
    id: '2',
    client_name: 'Michael Chen',
    service_name: 'Full Set Acrylic',
    date: '2025-04-25',
    time: '2:30 PM',
    status: 'completed',
    price: 65,
    paid: true
  },
  {
    id: '3',
    client_name: 'Emma Wilson',
    service_name: 'Pedicure + Nail Art',
    date: '2025-04-27',
    time: '3:15 PM',
    status: 'confirmed',
    price: 75,
    paid: false
  },
  {
    id: '4',
    client_name: 'David Miller',
    service_name: 'Nail Repair',
    date: '2025-04-24',
    time: '11:00 AM',
    status: 'cancelled',
    price: 25,
    paid: false
  },
  {
    id: '5',
    client_name: 'Jessica Taylor',
    service_name: 'Dip Powder',
    date: '2025-04-30',
    time: '4:45 PM',
    status: 'confirmed',
    price: 55,
    paid: true
  },
  {
    id: '6',
    client_name: 'Lisa Wong',
    service_name: 'Gel Polish Removal',
    date: '2025-04-23',
    time: '9:30 AM',
    status: 'completed',
    price: 20,
    paid: true
  }
];

const getStatusBadge = (status: Booking['status']) => {
  switch (status) {
    case 'confirmed':
      return 'bg-blue-100 text-blue-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-gray-100 text-gray-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const formatBookingDate = (dateStr: string) => {
  const date = parseISO(dateStr);
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'MMM d, yyyy');
  }
};

const BookingList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });

  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);

  useEffect(() => {
    let result = [...mockBookings];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.client_name.toLowerCase().includes(query) ||
        booking.service_name.toLowerCase().includes(query)
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    if (dateRange.from) {
      const fromDate = new Date(dateRange.from);
      fromDate.setHours(0, 0, 0, 0);
      
      result = result.filter(booking => {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        
        if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          return bookingDate >= fromDate && bookingDate <= toDate;
        }
        
        return bookingDate >= fromDate;
      });
    }
    
    setFilteredBookings(result);
  }, [searchQuery, statusFilter, dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by client or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left",
                !dateRange.from && "text-muted-foreground"
              )}
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
                <span>Date Range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No bookings found matching your filters.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDateRange({ from: undefined, to: undefined });
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div 
              key={booking.id}
              className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-medium">{booking.client_name}</h3>
                  <Badge className={cn("text-xs", getStatusBadge(booking.status))}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{booking.service_name}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span>{formatBookingDate(booking.date)}</span>
                  <span>{booking.time}</span>
                  <span className={booking.paid ? "text-green-600" : "text-amber-600"}>
                    {booking.paid ? "Paid" : "Unpaid"}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-medium">${booking.price}</span>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;
