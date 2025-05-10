
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    console.log("Starting expired listings check");
    
    // Find and update all expired jobs
    const { data: expiredJobs, error: jobsError } = await supabaseAdmin
      .from('jobs')
      .update({ status: 'expired' })
      .lt('expires_at', new Date().toISOString())
      .eq('status', 'active')
      .select('id, title');
      
    if (jobsError) {
      console.error("Error updating expired jobs:", jobsError);
      throw jobsError;
    }

    // Find jobs nearing expiration for auto-renewal notification
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const { data: expiringJobs, error: expiringError } = await supabaseAdmin
      .from('jobs')
      .select('id, title, user_id, expires_at, auto_renew')
      .eq('status', 'active')
      .lt('expires_at', threeDaysFromNow.toISOString())
      .eq('auto_renew', true);
    
    if (expiringError) {
      console.error("Error finding expiring jobs:", expiringError);
    }
    
    // Here we could add notification logic for auto-renewal jobs
    // This would be implemented in a later phase
    
    return new Response(
      JSON.stringify({
        success: true,
        expired: expiredJobs?.length || 0,
        expiring_soon: expiringJobs?.length || 0,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in expire-listings function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
