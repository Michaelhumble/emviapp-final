import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, User, Phone, Mail, MapPin, Plus, Download, Settings, RefreshCw } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO, addDays, startOfDay, endOfDay } from 'date-fns';
import { useArtistBookings } from '@/hooks/artist/useArtistBookings';
import { useAuth } from '@/context/auth';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Booking } from '@/lib/booking/types';
import { bookingToCalendarEvent, eventToICS } from '@/lib/booking/mappers';

interface ArtistCalendarProps {
  className?: string;
}

export const ArtistCalendar: React.FC<ArtistCalendarProps> = ({ className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const { user } = useAuth();
  
  const { 
    bookings, 
    loading, 
    error, 
    handleAccept,
    handleDecline,
    refresh 
  } = useArtistBookings();

  // Get current week dates
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Convert legacy bookings to unified format and filter for current week
  const weekBookings = useMemo(() => {
    if (!bookings) return [];
    
    return bookings
      .map(booking => ({
        id: booking.id,
        sender_id: '',
        recipient_id: user?.id || '',
        client_name: booking.client_name,
        client_email: undefined,
        client_phone: undefined,
        service_type: booking.service_type,
        date_requested: booking.appointment_date,
        time_requested: booking.appointment_time,
        starts_at: booking.appointment_date && booking.appointment_time ? 
          `${booking.appointment_date}T${booking.appointment_time}:00.000Z` : undefined,
        ends_at: booking.appointment_date && booking.appointment_time ? 
          new Date(new Date(`${booking.appointment_date}T${booking.appointment_time}:00.000Z`).getTime() + 60 * 60 * 1000).toISOString() : undefined,
        status: booking.status as Booking['status'],
        source: 'web' as const,
        note: undefined,
        created_at: new Date().toISOString(),
      } as Booking))
      .filter(booking => {
        if (!booking.starts_at) return false;
        const bookingDate = parseISO(booking.starts_at);
        return bookingDate >= weekStart && bookingDate <= weekEnd;
      });
  }, [bookings, weekStart, weekEnd, user?.id]);

  // Group bookings by day
  const bookingsByDay = useMemo(() => {
    const grouped: Record<string, Booking[]> = {};
    
    weekDays.forEach(day => {
      const dateKey = format(day, 'yyyy-MM-dd');
      grouped[dateKey] = weekBookings.filter(booking => {
        if (!booking.starts_at) return false;
        return isSameDay(parseISO(booking.starts_at), day);
      }).sort((a, b) => {
        if (!a.starts_at || !b.starts_at) return 0;
        return new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime();
      });
    });
    
    return grouped;
  }, [weekBookings, weekDays]);

  const handleStatusUpdate = async (bookingId: string, newStatus: 'accepted' | 'declined') => {
    try {
      if (newStatus === 'accepted') {
        await handleAccept(bookingId);
      } else {
        await handleDecline(bookingId);
      }
      toast.success(`Booking ${newStatus} successfully`);
      setShowBookingDetails(false);
    } catch (error) {
      toast.error(`Failed to ${newStatus} booking`);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'accepted': 
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': 
      case 'declined': return 'destructive';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled':
      case 'declined': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const generateICS = () => {
    const events = weekBookings
      .filter(booking => booking.starts_at && booking.status !== 'cancelled')
      .map(booking => bookingToCalendarEvent(booking));

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EmviApp//Artist Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${user?.email || 'Artist'} Bookings
X-WR-TIMEZONE:America/New_York
${events.map(eventToICS).join('\n')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'artist-bookings.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Calendar exported successfully');
  };

  const copyICSLink = () => {
    // In a real implementation, this would be a public URL to the artist's calendar feed
    const feedUrl = `https://emviapp.com/api/artists/${user?.id}/calendar.ics`;
    navigator.clipboard.writeText(feedUrl);
    toast.success('Calendar feed URL copied to clipboard');
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please sign in to view your calendar</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Artist Calendar
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your bookings and availability
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refresh}
                disabled={loading}
              >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={generateICS}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={copyICSLink}
              >
                <Settings className="h-4 w-4 mr-2" />
                Feed URL
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </h3>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(addDays(currentDate, -7))}
              >
                Previous
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(addDays(currentDate, 7))}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Week View */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const dateKey = format(day, 'yyyy-MM-dd');
              const dayBookings = bookingsByDay[dateKey] || [];
              const isToday = isSameDay(day, new Date());
              
              return (
                <div
                  key={index}
                  className={cn(
                    "min-h-32 border rounded-lg p-2 bg-background",
                    isToday && "bg-primary/5 border-primary/20"
                  )}
                >
                  <div className="text-center mb-2">
                    <div className="text-xs text-muted-foreground">
                      {format(day, 'EEE')}
                    </div>
                    <div className={cn(
                      "text-sm font-medium",
                      isToday && "text-primary font-semibold"
                    )}>
                      {format(day, 'd')}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {dayBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        className="text-xs p-1 rounded bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowBookingDetails(true);
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <div className={cn("w-2 h-2 rounded-full", getStatusColor(booking.status || 'pending'))} />
                          <span className="truncate font-medium">
                            {booking.client_name || 'Anonymous'}
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          {booking.starts_at && format(parseISO(booking.starts_at), 'HH:mm')}
                        </div>
                      </div>
                    ))}
                    
                    {dayBookings.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{dayBookings.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{selectedBooking.client_name || 'Anonymous'}</h4>
                <Badge variant={getStatusBadgeVariant(selectedBooking.status || 'pending')}>
                  {selectedBooking.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                {selectedBooking.client_email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedBooking.client_email}</span>
                  </div>
                )}
                
                {selectedBooking.client_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedBooking.client_phone}</span>
                  </div>
                )}
                
                {selectedBooking.starts_at && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(parseISO(selectedBooking.starts_at), 'PPP')} at{' '}
                      {format(parseISO(selectedBooking.starts_at), 'h:mm a')}
                    </span>
                  </div>
                )}
                
                {selectedBooking.note && (
                  <div className="bg-muted p-2 rounded">
                    <p className="text-muted-foreground text-xs mb-1">Notes:</p>
                    <p>{selectedBooking.note}</p>
                  </div>
                )}
              </div>
              
              {selectedBooking.status === 'pending' && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'declined')}
                    className="flex-1"
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'accepted')}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};