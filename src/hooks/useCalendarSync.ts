import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}

export const useCalendarSync = () => {
  const [syncing, setSyncing] = useState(false);

  const generateICalString = useCallback((events: CalendarEvent[]) => {
    const icalLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EmviApp//Booking Calendar//EN',
      'CALSCALE:GREGORIAN',
    ];

    events.forEach(event => {
      const start = event.start.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const end = event.end.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const uid = `${event.id}@emviapp.com`;

      icalLines.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description || ''}`,
        `LOCATION:${event.location || ''}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });

    icalLines.push('END:VCALENDAR');
    return icalLines.join('\r\n');
  }, []);

  const exportToIcal = useCallback((bookings: any[], filename = 'emviapp-bookings.ics') => {
    try {
      setSyncing(true);

      const events: CalendarEvent[] = bookings.map(booking => ({
        id: booking.id,
        title: `${booking.service_name || 'Appointment'} - ${booking.client_name}`,
        start: new Date(`${booking.date_requested}T${booking.time_requested}`),
        end: new Date(new Date(`${booking.date_requested}T${booking.time_requested}`).getTime() + (booking.duration_minutes || 60) * 60000),
        description: booking.note || '',
        location: booking.location || ''
      }));

      const icalString = generateICalString(events);
      const blob = new Blob([icalString], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      analytics.trackCustomEvent('calendar_export', {
        format: 'ical',
        events_count: events.length
      });

      toast.success('Calendar exported successfully!', {
        description: `Downloaded ${events.length} appointments to ${filename}`
      });
    } catch (error) {
      console.error('iCal export error:', error);
      toast.error('Failed to export calendar');
    } finally {
      setSyncing(false);
    }
  }, [generateICalString]);

  const generateGoogleCalendarUrl = useCallback((booking: any) => {
    const startDate = new Date(`${booking.date_requested}T${booking.time_requested}`);
    const endDate = new Date(startDate.getTime() + (booking.duration_minutes || 60) * 60000);
    
    const formatDateForGoogle = (date: Date) => 
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `${booking.service_name || 'Appointment'} - ${booking.client_name}`,
      dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
      details: booking.note || 'Appointment booked via EmviApp',
      location: booking.location || ''
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, []);

  const addToGoogleCalendar = useCallback((booking: any) => {
    try {
      const url = generateGoogleCalendarUrl(booking);
      window.open(url, '_blank');

      analytics.trackCustomEvent('google_calendar_add', {
        booking_id: booking.id,
        service_name: booking.service_name
      });

      toast.success('Opening Google Calendar...');
    } catch (error) {
      console.error('Google Calendar error:', error);
      toast.error('Failed to open Google Calendar');
    }
  }, [generateGoogleCalendarUrl]);

  const generateCalendarLinks = useCallback((booking: any) => {
    const googleUrl = generateGoogleCalendarUrl(booking);
    
    // Generate Outlook URL
    const startDate = new Date(`${booking.date_requested}T${booking.time_requested}`);
    const endDate = new Date(startDate.getTime() + (booking.duration_minutes || 60) * 60000);
    
    const outlookParams = new URLSearchParams({
      subject: `${booking.service_name || 'Appointment'} - ${booking.client_name}`,
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
      body: booking.note || 'Appointment booked via EmviApp',
      location: booking.location || ''
    });
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?${outlookParams.toString()}`;

    return {
      google: googleUrl,
      outlook: outlookUrl,
      ical: () => {
        const events = [{
          id: booking.id,
          title: `${booking.service_name || 'Appointment'} - ${booking.client_name}`,
          start: startDate,
          end: endDate,
          description: booking.note || '',
          location: booking.location || ''
        }];
        const icalString = generateICalString(events);
        const blob = new Blob([icalString], { type: 'text/calendar' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `appointment-${booking.id}.ics`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    };
  }, [generateGoogleCalendarUrl, generateICalString]);

  return {
    syncing,
    exportToIcal,
    addToGoogleCalendar,
    generateCalendarLinks,
    generateGoogleCalendarUrl
  };
};