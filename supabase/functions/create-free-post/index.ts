
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🆓 [FREE-POST] Function called with method:', req.method);
  
  // Handle CORS preflight requests  
  if (req.method === 'OPTIONS') {
    console.log('🆓 [FREE-POST] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const requestBody = await req.text();
    console.log('🆓 [FREE-POST] Raw request body:', requestBody);
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (parseError) {
      console.error('❌ [FREE-POST] JSON parse error:', parseError);
      throw new Error('Invalid JSON in request body');
    }
    
    const { jobData } = parsedBody;
    console.log('🆓 [FREE-POST] Parsed job data:', {
      title: jobData?.title,
      category: jobData?.category,
      location: jobData?.location,
      hasDescription: !!jobData?.description,
      hasContactInfo: !!jobData?.contact_info
    });

    if (!jobData) {
      console.error('❌ [FREE-POST] Missing jobData in request');
      throw new Error('Missing job data in request');
    }

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('🆓 [FREE-POST] Environment check:', {
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey
    });
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [FREE-POST] Missing environment variables');
      throw new Error('Missing Supabase configuration');
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    console.log('🆓 [FREE-POST] Auth header present:', !!authHeader);
    
    if (!authHeader) {
      console.error('❌ [FREE-POST] No authorization header');
      throw new Error('Authorization header required');
    }

    // Extract user from token using anon client first
    const anonClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') || '');
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await anonClient.auth.getUser(token);
    
    console.log('🆓 [FREE-POST] Auth result:', {
      hasUser: !!user,
      userId: user?.id,
      userEmail: user?.email,
      authError: authError?.message
    });
    
    if (authError || !user) {
      console.error('❌ [FREE-POST] Auth error:', authError);
      throw new Error('Invalid authentication: ' + (authError?.message || 'No user found'));
    }

    console.log('✅ [FREE-POST] User authenticated:', user.id);

    // Prepare job data for insertion with explicit required fields
    const jobToInsert = {
      title: jobData.title || 'Untitled Job',
      description: jobData.description || '',
      category: jobData.category || 'Other',
      location: jobData.location || '',
      compensation_type: jobData.compensation_type || jobData.employment_type || '',
      compensation_details: jobData.compensation_details || '',
      requirements: Array.isArray(jobData.requirements) 
        ? jobData.requirements.join('\n') 
        : (jobData.requirements || ''),
      contact_info: typeof jobData.contact_info === 'object' && jobData.contact_info 
        ? jobData.contact_info 
        : {},
      user_id: user.id,
      pricing_tier: 'free',
      status: 'active', // Free jobs are immediately active
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('🆓 [FREE-POST] Job data prepared for insertion:', {
      title: jobToInsert.title,
      category: jobToInsert.category,
      status: jobToInsert.status,
      pricing_tier: jobToInsert.pricing_tier,
      user_id: jobToInsert.user_id,
      expires_at: jobToInsert.expires_at
    });

    // Insert the job directly as active using service role
    console.log('🆓 [FREE-POST] Attempting database insert...');
    const { data: newJob, error: insertError } = await supabase
      .from('jobs')
      .insert([jobToInsert])
      .select()
      .single();

    console.log('🆓 [FREE-POST] Insert result:', {
      success: !insertError,
      jobId: newJob?.id,
      insertError: insertError?.message,
      insertErrorDetails: insertError?.details,
      insertErrorHint: insertError?.hint,
      insertErrorCode: insertError?.code
    });

    if (insertError) {
      console.error('❌ [FREE-POST] Database insert error:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      throw new Error(`Database error: ${insertError.message}`);
    }

    if (!newJob) {
      console.error('❌ [FREE-POST] No job returned from insert');
      throw new Error('Job insert failed - no data returned');
    }

    console.log('✅ [FREE-POST] Job created successfully:', {
      id: newJob.id,
      title: newJob.title,
      status: newJob.status,
      user_id: newJob.user_id
    });

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      jobId: newJob.id,
      status: newJob.status,
      message: 'Free job posted successfully'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 [FREE-POST] Critical error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Unknown error occurred',
      details: 'Check edge function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
