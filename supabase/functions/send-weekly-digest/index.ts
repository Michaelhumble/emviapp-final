
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.1'
import { format, startOfWeek, endOfWeek, subDays } from 'https://esm.sh/date-fns@2.30.0'

// Define types for our data
interface Booking {
  id: string;
  service_price: number;
  created_at: string;
  date_requested: string;
  recipient_id: string;
}

interface User {
  id: string;
  role: string;
  full_name: string;
}

interface WeeklyStats {
  totalBookings: number;
  totalRevenue: number;
  mostBookedDay: string | null;
  dayBookingCounts: { [key: string]: number };
}

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing environment variables');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Starting weekly digest processing...');
    
    // Get the date range for the past week
    const now = new Date();
    const endDate = endOfWeek(subDays(now, 1)); // End of last week
    const startDate = startOfWeek(endDate); // Start of last week
    
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();
    
    console.log(`Generating digest for: ${startDateString} to ${endDateString}`);
    
    // Get all artists and salon owners
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, role, full_name')
      .in('role', ['artist', 'owner']);
    
    if (usersError) {
      throw new Error(`Error fetching users: ${usersError.message}`);
    }
    
    console.log(`Found ${users?.length || 0} users to process`);
    
    // Process each user
    for (const user of users || []) {
      try {
        // Get completed bookings for this user in the past week
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('id, service_id, date_requested, created_at, status, metadata')
          .eq('recipient_id', user.id)
          .eq('status', 'completed')
          .gte('created_at', startDateString)
          .lte('created_at', endDateString);
          
        if (bookingsError) {
          console.error(`Error fetching bookings for user ${user.id}: ${bookingsError.message}`);
          continue;
        }
        
        // Skip if no bookings
        if (!bookings || bookings.length === 0) {
          console.log(`No bookings for user ${user.id} (${user.full_name}), skipping`);
          continue;
        }
        
        // Collect service IDs from bookings
        const serviceIds = bookings
          .map(booking => booking.service_id)
          .filter(id => id !== null);
          
        // Get services data to calculate revenue
        const { data: services, error: servicesError } = await supabase
          .from('services')
          .select('id, price')
          .in('id', serviceIds);
          
        if (servicesError) {
          console.error(`Error fetching services: ${servicesError.message}`);
          continue;
        }
        
        // Create price lookup map
        const servicePriceMap = new Map();
        services?.forEach(service => {
          servicePriceMap.set(service.id, service.price);
        });
        
        // Calculate weekly stats
        const stats = calculateWeeklyStats(bookings, servicePriceMap);
        
        // Generate the message based on user role
        const message = generateDigestMessage(user, stats);
        
        // Send the notification
        const { error: notificationError } = await supabase
          .from('notifications')
          .insert({
            user_id: user.id,
            type: 'weekly_summary',
            message: message,
            is_read: false,
            link: '/dashboard',
            metadata: {
              start_date: startDateString,
              end_date: endDateString,
              stats: {
                booking_count: stats.totalBookings,
                total_revenue: stats.totalRevenue,
                most_booked_day: stats.mostBookedDay
              }
            }
          });
          
        if (notificationError) {
          console.error(`Error creating notification for user ${user.id}: ${notificationError.message}`);
          continue;
        }
        
        console.log(`Successfully sent digest to user ${user.id} (${user.full_name})`);
      } catch (error) {
        console.error(`Error processing user ${user.id}: ${error.message}`);
      }
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: `Weekly digest sent to ${users?.length || 0} users`,
      timeframe: `${format(startDate, 'MM/dd/yyyy')} - ${format(endDate, 'MM/dd/yyyy')}`
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
    
  } catch (error) {
    console.error(`Error in weekly digest function: ${error.message}`);
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});

function calculateWeeklyStats(bookings: any[], servicePriceMap: Map<string, number>): WeeklyStats {
  let totalBookings = bookings.length;
  let totalRevenue = 0;
  const dayBookingCounts: { [key: string]: number } = {};
  
  // Calculate revenue and count bookings by day
  bookings.forEach(booking => {
    // Add service price to total revenue
    if (booking.service_id && servicePriceMap.has(booking.service_id)) {
      totalRevenue += servicePriceMap.get(booking.service_id) || 0;
    }
    
    // Count bookings by day of week
    if (booking.date_requested) {
      const date = new Date(booking.date_requested);
      const dayOfWeek = format(date, 'EEEE'); // e.g., 'Monday'
      dayBookingCounts[dayOfWeek] = (dayBookingCounts[dayOfWeek] || 0) + 1;
    }
  });
  
  // Find the most booked day
  let mostBookedDay = null;
  let maxBookings = 0;
  
  Object.entries(dayBookingCounts).forEach(([day, count]) => {
    if (count > maxBookings) {
      mostBookedDay = day;
      maxBookings = count;
    }
  });
  
  return {
    totalBookings,
    totalRevenue,
    mostBookedDay,
    dayBookingCounts
  };
}

function generateDigestMessage(user: User, stats: WeeklyStats): string {
  const { totalBookings, totalRevenue, mostBookedDay } = stats;
  const formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalRevenue);
  
  if (user.role === 'artist') {
    return `🎉 You made ${formattedRevenue} this week with ${totalBookings} bookings.\n` +
           `${mostBookedDay ? `⏰ Most booked day: ${mostBookedDay}\n` : ''}` +
           `✨ Don't forget to update your profile to stay visible.`;
  } else if (user.role === 'owner') {
    return `📈 Your team completed ${totalBookings} bookings totaling ${formattedRevenue}.\n` +
           `👀 Boost visibility? Check your available credits.\n` +
           `✅ See full stats in your dashboard`;
  } else {
    return `📊 Your weekly summary: ${totalBookings} bookings totaling ${formattedRevenue}.`;
  }
}
