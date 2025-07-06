
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🆓 [FREE-POST] Function called');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log('🆓 [FREE-POST] Raw request body:', requestBody);

    let payload;
    try {
      payload = JSON.parse(requestBody);
    } catch (parseError) {
      console.error('❌ [FREE-POST] JSON parse error:', parseError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid JSON in request body' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    console.log("🚀 JOB POSTING FUNCTION CALLED with payload:", payload);

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [FREE-POST] Missing environment variables');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Server configuration error' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    // Initialize Supabase with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        title: payload.jobData.title,
        category: payload.jobData.category,
        location: payload.jobData.location,
        description: payload.jobData.description,
        user_id: payload.jobData.user_id,
        status: 'active',
        pricing_tier: 'free'
      })
      .select();

    if (error) {
      console.error("❌ JOB INSERT FAILED:", error);
      return new Response(JSON.stringify({ success: false, error: error.message }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      });
    }

    console.log("✅ JOB INSERT SUCCESSFUL:", data);
    return new Response(JSON.stringify({ success: true, data }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200 
    });

  } catch (error) {
    console.error('💥 [FREE-POST] Unexpected error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
