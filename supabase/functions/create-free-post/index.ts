
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🆓 [FREE-POST] Function called');
  
  // Handle CORS preflight requests  
  if (req.method === 'OPTIONS') {
    console.log('🆓 [FREE-POST] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { jobData } = await req.json();
    console.log('🆓 [FREE-POST] Received job data:', {
      title: jobData?.title,
      category: jobData?.category,
      location: jobData?.location
    });

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [FREE-POST] Missing environment variables');
      throw new Error('Missing Supabase configuration');
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('❌ [FREE-POST] No authorization header');
      throw new Error('Authorization header required');
    }

    // Extract user from token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('❌ [FREE-POST] Auth error:', authError);
      throw new Error('Invalid authentication');
    }

    console.log('✅ [FREE-POST] User authenticated:', user.id);

    // Prepare job data for insertion
    const jobToInsert = {
      title: jobData.title || 'Job Title',
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

    console.log('🆓 [FREE-POST] Inserting job with data:', {
      title: jobToInsert.title,
      category: jobToInsert.category,
      status: jobToInsert.status,
      pricing_tier: jobToInsert.pricing_tier,
      user_id: jobToInsert.user_id
    });

    // Insert the job directly as active
    const { data: newJob, error: insertError } = await supabase
      .from('jobs')
      .insert([jobToInsert])
      .select()
      .single();

    if (insertError) {
      console.error('❌ [FREE-POST] Database insert error:', insertError);
      throw new Error(`Database error: ${insertError.message}`);
    }

    console.log('✅ [FREE-POST] Job created successfully:', newJob.id);

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
    console.error('💥 [FREE-POST] Critical error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
