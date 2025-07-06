
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('🆓 [FREE-POST] ===== FREE JOB POSTING FUNCTION CALLED =====');
  console.log('🆓 [FREE-POST] Request method:', req.method);
  console.log('🆓 [FREE-POST] Request headers:', Object.fromEntries(req.headers.entries()));
  
  if (req.method === "OPTIONS") {
    console.log('🆓 [FREE-POST] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Environment variables check
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    console.log('🆓 [FREE-POST] Environment check:');
    console.log('🆓 [FREE-POST] SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
    console.log('🆓 [FREE-POST] SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
    console.log('🆓 [FREE-POST] SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'SET' : 'MISSING');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [FREE-POST] Missing required environment variables');
      throw new Error('Missing required environment variables');
    }

    const requestBody = await req.json();
    console.log('🆓 [FREE-POST] Raw request body received:', JSON.stringify(requestBody, null, 2));
    
    const { jobData } = requestBody;
    console.log('🆓 [FREE-POST] Extracted jobData:', JSON.stringify(jobData, null, 2));

    if (!jobData) {
      console.error('❌ [FREE-POST] No jobData in request body');
      throw new Error('No jobData provided in request');
    }

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    console.log('🆓 [FREE-POST] Authorization header:', authHeader ? 'PRESENT' : 'MISSING');
    
    if (!authHeader) {
      console.error("❌ [FREE-POST] No authorization header");
      throw new Error("No authorization header");
    }

    // Create Supabase client for user auth
    console.log('🆓 [FREE-POST] Creating Supabase client for user authentication...');
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    console.log('🆓 [FREE-POST] Getting user from auth...');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError) {
      console.error("❌ [FREE-POST] User authentication error:", userError);
      throw new Error("User authentication failed: " + userError.message);
    }
    
    if (!user) {
      console.error("❌ [FREE-POST] No user returned from auth");
      throw new Error("User not authenticated: No user returned");
    }

    console.log('✅ [FREE-POST] User authenticated successfully:', {
      id: user.id,
      email: user.email,
      role: user.role
    });

    // Use service role for database operations to bypass RLS
    console.log('🆓 [FREE-POST] Creating service role client for database operations...');
    const supabaseService = createClient(
      supabaseUrl,
      supabaseServiceKey,
      { auth: { persistSession: false } }
    );

    // Prepare job record with all required fields
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

    console.log('📝 [FREE-POST] Prepared job record for insertion:', JSON.stringify(jobRecord, null, 2));

    // Attempt database insert
    console.log('🆓 [FREE-POST] Attempting to insert job into database...');
    const { data: insertedJob, error: insertError } = await supabaseService
      .from('jobs')
      .insert([jobRecord])
      .select()
      .single();

    if (insertError) {
      console.error('❌ [FREE-POST] Database insert error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      throw new Error(`Failed to create job: ${insertError.message}`);
    }

    if (!insertedJob) {
      console.error('❌ [FREE-POST] No job returned from insert operation');
      throw new Error('No job returned from insert operation');
    }

    console.log('✅ [FREE-POST] Job inserted successfully:', {
      id: insertedJob.id,
      title: insertedJob.title,
      status: insertedJob.status,
      pricing_tier: insertedJob.pricing_tier,
      user_id: insertedJob.user_id
    });

    // Verify the job was created as active
    console.log('🔍 [FREE-POST] Verifying job insertion...');
    const { data: verifyJob, error: verifyError } = await supabaseService
      .from('jobs')
      .select('id, title, status, pricing_tier, user_id, category')
      .eq('id', insertedJob.id)
      .single();

    if (verifyError) {
      console.error('⚠️ [FREE-POST] Could not verify job creation:', verifyError);
    } else {
      console.log('🔍 [FREE-POST] Job verification successful:', verifyJob);
    }

    // Log the successful free post
    console.log('🆓 [FREE-POST] Creating payment log entry...');
    const { error: paymentLogError } = await supabaseService
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: insertedJob.id,
        plan_type: 'job',
        pricing_tier: 'free',
        payment_status: 'success',
        expires_at: jobRecord.expires_at
      });

    if (paymentLogError) {
      console.error('⚠️ [FREE-POST] Error logging payment (non-critical):', paymentLogError);
    } else {
      console.log('✅ [FREE-POST] Payment logged successfully');
    }

    const response = { 
      success: true, 
      jobId: insertedJob.id,
      job: insertedJob,
      status: insertedJob.status
    };
    
    console.log('🎉 [FREE-POST] Returning success response:', JSON.stringify(response, null, 2));
    console.log('🆓 [FREE-POST] ===== FREE JOB POSTING FUNCTION COMPLETED SUCCESSFULLY =====');

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("💥 [FREE-POST] CRITICAL ERROR:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    const errorResponse = { 
      success: false, 
      error: error.message,
      details: error.stack
    };
    
    return new Response(JSON.stringify(errorResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
