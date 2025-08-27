import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const artistId = url.pathname.split('/').pop()?.replace('.ics', '');

    if (!artistId) {
      return new Response('Artist ID required', { status: 400 });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch artist bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services:service_id (
          name,
          duration_minutes
        )
      `)
      .eq('recipient_id', artistId)
      .in('status', ['confirmed', 'completed'])
      .not('starts_at', 'is', null)
      .not('ends_at', 'is', null)
      .order('starts_at', { ascending: true });

    if (error) {
      console.error('Error fetching bookings:', error);
      return new Response('Error fetching calendar data', { status: 500 });
    }

    // Fetch artist info
    const { data: artist } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', artistId)
      .single();

    const artistName = artist?.full_name || artist?.email || 'Artist';

    // Generate ICS content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EmviApp//Artist Calendar Feed//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${artistName} Bookings
X-WR-TIMEZONE:America/New_York
X-WR-CALDESC:Appointment bookings for ${artistName}
${bookings?.map(booking => {
  const start = new Date(booking.starts_at);
  const end = new Date(booking.ends_at);
  const serviceName = booking.services?.name || 'Appointment';
  
  return `BEGIN:VEVENT
UID:${booking.id}@emviapp.com
DTSTART:${start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${serviceName}${booking.client_name ? ` - ${booking.client_name}` : ''}
DESCRIPTION:Booking Status: ${booking.status}${booking.note ? `\\nNotes: ${booking.note}` : ''}${booking.client_phone ? `\\nPhone: ${booking.client_phone}` : ''}
STATUS:${booking.status === 'confirmed' ? 'CONFIRMED' : 'TENTATIVE'}
TRANSP:OPAQUE
CATEGORIES:APPOINTMENT
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${serviceName} appointment in 15 minutes
END:VALARM
END:VEVENT`;
}).join('\n') || ''}
END:VCALENDAR`;

    return new Response(icsContent, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="${artistName.replace(/[^a-zA-Z0-9]/g, '_')}_calendar.ics"`,
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error: any) {
    console.error('Error in artist-calendar-feed:', error);
    return new Response('Internal server error', { status: 500 });
  }
});