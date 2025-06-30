

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('🔥 [DEBUG] create-free-post function called');
  console.log('🔥 [DEBUG] Request method:', req.method);
  console.log('🔥 [DEBUG] Request headers:', Object.fromEntries(req.headers.entries()));
  
  if (req.method === "OPTIONS") {
    console.log('🔥 [DEBUG] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('🔥 [DEBUG] Request body received:', JSON.stringify(requestBody, null, 2));
    
    const { jobData } = requestBody;
    console.log('🆓 [DEBUG] Creating free job post:', jobData);

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    console.log('🔥 [DEBUG] Authorization header present:', !!authHeader);
    
    if (!authHeader) {
      console.error("❌ [DEBUG] No authorization header");
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    console.log('🔑 [DEBUG] Auth token received:', token ? 'present' : 'missing');
    console.log('🔑 [DEBUG] Token length:', token?.length || 0);

    // Create Supabase client with user token for authentication
    console.log('🔥 [DEBUG] Creating Supabase client...');
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    console.log('🔥 [DEBUG] Getting user from token...');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    console.log('🔥 [DEBUG] User auth result:', { 
      hasUser: !!user, 
      userId: user?.id, 
      userError: userError?.message 
    });
    
    if (userError || !user) {
      console.error("❌ [DEBUG] User authentication failed:", userError);
      throw new Error("User not authenticated: " + (userError?.message || "Unknown auth error"));
    }

    console.log('✅ [DEBUG] User authenticated:', user.id);

    // Insert job into database with free pricing tier
    const jobRecord = {
      title: jobData.title || 'Job Title',
      description: jobData.description || '',
      category: jobData.category || 'Other',
      location: jobData.location || '',
      compensation_type: jobData.compensation_type || jobData.employment_type || '',
      compensation_details: jobData.compensation_details || '',
      requirements: Array.isArray(jobData.requirements) 
        ? jobData.requirements.join('\n') 
        : (jobData.requirements || ''),
      contact_info: jobData.contact_info || {},
      pricing_tier: 'free',
      status: 'active',
      user_id: user.id,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    };

    console.log('📝 [DEBUG] Inserting job record:', JSON.stringify(jobRecord, null, 2));

    const { data: insertedJob, error: insertError } = await supabaseClient
      .from('jobs')
      .insert([jobRecord])
      .select()
      .single();

    console.log('📝 [DEBUG] Insert result - data:', JSON.stringify(insertedJob, null, 2));
    console.log('📝 [DEBUG] Insert result - error:', insertError);

    if (insertError) {
      console.error('❌ [DEBUG] Database insert error:', insertError);
      console.error('❌ [DEBUG] Full insert error details:', JSON.stringify(insertError, null, 2));
      throw new Error(`Failed to create job: ${insertError.message}`);
    }

    console.log('✅ [DEBUG] Job created successfully:', insertedJob.id);

    // Log the successful free post
    console.log('📝 [DEBUG] Logging payment record...');
    const { data: paymentLog, error: paymentError } = await supabaseClient
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: insertedJob.id,
        plan_type: 'job',
        pricing_tier: 'free',
        payment_status: 'success',
        expires_at: jobRecord.expires_at
      });

    console.log('📝 [DEBUG] Payment log result:', { paymentLog, paymentError });

    const response = { 
      success: true, 
      jobId: insertedJob.id,
      job: insertedJob
    };
    
    console.log('✅ [DEBUG] Returning success response:', JSON.stringify(response, null, 2));

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("❌ [DEBUG] Error creating free job post:", error);
    console.error("❌ [DEBUG] Error stack trace:", error instanceof Error ? error.stack : 'No stack trace');
    
    const errorResponse = { 
      success: false, 
      error: error.message 
    };
    
    console.log('❌ [DEBUG] Returning error response:', JSON.stringify(errorResponse, null, 2));
    
    return new Response(JSON.stringify(errorResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

