
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.33.1'

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
    
    // Enable pg_cron and pg_net extensions if not already enabled
    await supabase.rpc('setup_cron_extensions');
    
    // Remove existing job if it exists
    await supabase.rpc('remove_cron_job', { job_name: 'weekly_digest_job' });
    
    // Create new cron job to run weekly digest every Sunday at 6AM UTC
    const { data, error } = await supabase.rpc('create_weekly_digest_job');
    
    if (error) {
      throw error;
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Weekly digest cron job has been set up successfully",
      data
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('Error setting up cron job:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
