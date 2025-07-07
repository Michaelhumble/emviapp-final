
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🆓 [FREE-POST] Function called with method:', req.method);
  
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

    console.log("🚀 [FREE-POST] Function called with payload:", payload);

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

    // Validate required fields
    if (!payload.jobData || !payload.jobData.title || !payload.jobData.user_id) {
      console.error('❌ [FREE-POST] Missing required fields:', {
        hasJobData: !!payload.jobData,
        hasTitle: !!(payload.jobData && payload.jobData.title),
        hasUserId: !!(payload.jobData && payload.jobData.user_id)
      });
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields: title and user_id are required' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Prepare job data for insertion
    const jobInsertData = {
      title: payload.jobData.title,
      category: payload.jobData.category || 'Other',
      location: payload.jobData.location || '',
      description: payload.jobData.description || '',
      compensation_type: payload.jobData.compensation_type || '',
      compensation_details: payload.jobData.compensation_details || '',
      requirements: payload.jobData.requirements || '',
      user_id: payload.jobData.user_id,
      status: 'active',
      pricing_tier: 'free',
      contact_info: payload.jobData.contact_info || {}
    };

    console.log('✅ [FREE-POST] Inserting job with data:', jobInsertData);

    const { data, error } = await supabase
      .from('jobs')
      .insert([jobInsertData])
      .select()
      .single();

    if (error) {
      console.error("❌ [FREE-POST] JOB INSERT FAILED:", error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      });
    }

    console.log("✅ [FREE-POST] JOB INSERT SUCCESSFUL:", data);
    return new Response(JSON.stringify({ 
      success: true, 
      data: data 
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200 
    });

  } catch (error) {
    console.error('💥 [FREE-POST] Unexpected error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
