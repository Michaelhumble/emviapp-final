
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get request body
    const { bookingId, manual = false } = await req.json()
    
    // Initialize Supabase client with Supabase URL and service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // If a specific booking ID is provided
    if (bookingId) {
      const { data: booking, error: bookingError } = await supabaseAdmin
        .from('bookings')
        .select(`
          id, 
          sender_id, 
          recipient_id, 
          service_id, 
          date_requested, 
          time_requested,
          status,
          services:service_id (title)
        `)
        .eq('id', bookingId)
        .eq('status', 'confirmed')
        .single()

      if (bookingError) {
        throw bookingError
      }

      if (!booking) {
        return new Response(
          JSON.stringify({ message: 'Booking not found or not confirmed' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        )
      }

      // Get customer and artist details
      const { data: users, error: usersError } = await supabaseAdmin
        .from('users')
        .select('id, full_name, email')
        .in('id', [booking.sender_id, booking.recipient_id])

      if (usersError) {
        throw usersError
      }

      const customer = users.find(u => u.id === booking.sender_id)
      const artist = users.find(u => u.id === booking.recipient_id)

      // If it's not a manual reminder, check timing (3 hours before)
      if (!manual) {
        const bookingDate = new Date(`${booking.date_requested}T${booking.time_requested}`)
        const now = new Date()
        const hoursDiff = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60)
        
        if (hoursDiff < 2 || hoursDiff > 4) {
          return new Response(
            JSON.stringify({ message: 'Not time to send reminder yet' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
          )
        }
      }

      // Send notification to customer
      if (customer) {
        await supabaseAdmin.from('notifications').insert({
          user_id: customer.id,
          message: `Reminder: Your booking with ${artist?.full_name || 'the artist'} for ${booking.services?.title || 'a service'} is coming up soon.`,
          type: 'info',
          metadata: {
            type: 'booking_reminder',
            booking_id: booking.id,
            artist_name: artist?.full_name,
            service_name: booking.services?.title
          }
        })
      }

      // Send notification to artist
      if (artist) {
        await supabaseAdmin.from('notifications').insert({
          user_id: artist.id,
          message: `Reminder: Your appointment with ${customer?.full_name || 'a customer'} for ${booking.services?.title || 'a service'} is coming up soon.`,
          type: 'info',
          metadata: {
            type: 'booking_reminder',
            booking_id: booking.id,
            customer_name: customer?.full_name,
            service_name: booking.services?.title
          }
        })
      }

      // Update booking to mark reminder as sent
      await supabaseAdmin
        .from('bookings')
        .update({
          reminder_sent: true,
          reminder_sent_at: new Date().toISOString()
        })
        .eq('id', booking.id)

      return new Response(
        JSON.stringify({ message: 'Reminder sent successfully', customer, artist }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    } else {
      // Process all upcoming bookings that need reminders
      const { data: bookings, error: bookingsError } = await supabaseAdmin
        .from('bookings')
        .select(`
          id, 
          sender_id, 
          recipient_id, 
          service_id, 
          date_requested, 
          time_requested,
          status,
          services:service_id (title)
        `)
        .eq('status', 'confirmed')
        .eq('reminder_sent', false)

      if (bookingsError) {
        throw bookingsError
      }

      const remindersToSend = []
      const now = new Date()

      for (const booking of bookings) {
        const bookingDate = new Date(`${booking.date_requested}T${booking.time_requested}`)
        const hoursDiff = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60)
        
        // If it's about 3 hours before the booking
        if (hoursDiff >= 2 && hoursDiff <= 4) {
          remindersToSend.push(booking.id)
        }
      }

      // Return early if no reminders to send
      if (remindersToSend.length === 0) {
        return new Response(
          JSON.stringify({ message: 'No reminders to send at this time' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )
      }

      // Process each reminder
      const results = []
      for (const bookingId of remindersToSend) {
        // Make a recursive call to this function for each booking
        const response = await fetch(req.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.get('Authorization') || ''
          },
          body: JSON.stringify({ bookingId })
        })
        
        results.push(await response.json())
      }

      return new Response(
        JSON.stringify({
          message: `Processed ${results.length} reminders`,
          results
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }
  } catch (error) {
    console.error('Error in send-booking-reminders function:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})
