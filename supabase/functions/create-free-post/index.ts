
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('🔥 [DEBUG] create-free-post function called');
  
  if (req.method === "OPTIONS") {
    console.log('🔥 [DEBUG] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('🔥 [DEBUG] Request body received:', JSON.stringify(requestBody, null, 2));
    
    const { jobData } = requestBody;
    console.log('🆓 [DEBUG] Creating free job post:', jobData);

    // Simplified auth header extraction
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("❌ [DEBUG] No authorization header");
      throw new Error("No authorization header");
    }

    // Create Supabase client with simplified auth
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    // Get user from auth header
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
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
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    console.log('📝 [DEBUG] Inserting job record:', JSON.stringify(jobRecord, null, 2));

    const { data: insertedJob, error: insertError } = await supabaseClient
      .from('jobs')
      .insert([jobRecord])
      .select()
      .single();

    if (insertError) {
      console.error('❌ [DEBUG] Database insert error:', insertError);
      throw new Error(`Failed to create job: ${insertError.message}`);
    }

    console.log('✅ [DEBUG] Job created successfully:', insertedJob.id);

    // Log the successful free post
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
    
    const errorResponse = { 
      success: false, 
      error: error.message 
    };
    
    return new Response(JSON.stringify(errorResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
