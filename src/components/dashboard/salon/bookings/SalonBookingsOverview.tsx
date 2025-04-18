import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarClock, RefreshCcw, UserCheck, CheckCircle, XCircle, AlertCircle, Calendar
} from "lucide-react";
import { useSalonBookings } from "./hooks/useSalonBookings";
import { format } from "date-fns";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SalonBooking } from "../types";
import { 
  Popover, PopoverContent, PopoverTrigger 
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SalonBookingsOverview = () => {
  const {
    bookings,
    loading,
    error,
    artists,
    fetchBookings,
    updateBookingStatus,
    assignArtistToBooking
  } = useSalonBookings();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [artistFilter, setArtistFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  const filteredBookings = bookings.filter(booking => {
    // Filter by status
    if (statusFilter !== "all" && booking.status !== statusFilter) {
      return false;
    }
    
    // Filter by artist
    if (artistFilter !== "all" && booking.assigned_staff_id !== artistFilter) {
      return false;
    }
    
    // Filter by date
    if (dateFilter !== "all") {
      if (!booking.date) return false;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dateFilter === "today") {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate.getTime() !== today.getTime()) return false;
      } else if (dateFilter === "upcoming") {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate.getTime() <= today.getTime()) return false;
      } else if (dateFilter === "past") {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate.getTime() >= today.getTime()) return false;
      }
    }
    
    return true;
  });

  const getInitials = (name: string): string => {
    if (!name) return "?";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "Not scheduled";
    return format(date, "MMM d, yyyy");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>;
      case "accepted":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Accepted</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="text-gray-500">Cancelled</Badge>;
      case "declined":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "accepted":
        return <UserCheck className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
      case "declined":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-serif text-purple-900 flex items-center">
            <CalendarClock className="mr-2 h-5 w-5 text-purple-700" />
            Bookings Overview
          </CardTitle>
          <CardDescription>
            View and manage all client bookings
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="text-purple-600"
          onClick={fetchBookings}
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto">
              <Select value={artistFilter} onValueChange={setArtistFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Filter by artist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Artists</SelectItem>
                  {artists.map(artist => (
                    <SelectItem key={artist.id} value={artist.id}>
                      {artist.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 flex items-center">
            {filteredBookings.length} {filteredBookings.length === 1 ? 'booking' : 'bookings'} found
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-2">{error.message}</p>
            <Button 
              variant="outline" 
              onClick={fetchBookings}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-10 border rounded-md bg-gray-50">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">
              {statusFilter !== "all" || artistFilter !== "all" || dateFilter !== "all" 
                ? "No bookings match your filters" 
                : "No bookings found"}
            </p>
            {(statusFilter !== "all" || artistFilter !== "all" || dateFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setStatusFilter("all");
                  setArtistFilter("all");
                  setDateFilter("all");
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-medium">Client</TableHead>
                  <TableHead className="font-medium">Service</TableHead>
                  <TableHead className="font-medium">Date/Time</TableHead>
                  <TableHead className="font-medium">Artist</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            {getInitials(booking.client_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{booking.client_name}</div>
                          <div className="text-xs text-gray-500">
                            {booking.client_email || booking.client_phone || "No contact info"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.service_name}</div>
                      <div className="text-xs text-gray-500">
                        ${booking.service_price.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{formatDate(booking.date)}</div>
                      <div className="text-xs text-gray-500">{booking.time || "No time set"}</div>
                    </TableCell>
                    <TableCell>
                      {booking.assigned_staff_name ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                              {getInitials(booking.assigned_staff_name)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{booking.assigned_staff_name}</span>
                        </div>
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">Assign Artist</Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-52 p-0">
                            <div className="p-2 border-b">
                              <p className="text-sm font-medium">Select Artist</p>
                            </div>
                            <div className="max-h-60 overflow-auto">
                              {artists.map(artist => (
                                <Button
                                  key={artist.id}
                                  variant="ghost"
                                  className="w-full justify-start px-2"
                                  onClick={() => assignArtistToBooking(booking.id, artist.id, artist.name)}
                                >
                                  <Avatar className="h-7 w-7 mr-2">
                                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                                      {getInitials(artist.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {artist.name}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(booking.status)}
                        {getStatusBadge(booking.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {booking.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "accepted")}>
                                <UserCheck className="h-4 w-4 mr-2 text-blue-500" />
                                Accept Booking
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "declined")}>
                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                Decline Booking
                              </DropdownMenuItem>
                            </>
                          )}
                          {booking.status === "accepted" && (
                            <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "completed")}>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          {booking.status !== "completed" && booking.status !== "cancelled" && booking.status !== "declined" && (
                            <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                              <XCircle className="h-4 w-4 mr-2 text-red-500" />
                              Cancel Booking
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonBookingsOverview;
