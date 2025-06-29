
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🚀 create-free-post function called');
  console.log('📥 Request method:', req.method);
  console.log('📥 Request headers:', Object.fromEntries(req.headers.entries()));

  if (req.method === 'OPTIONS') {
    console.log('✅ Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header for user authentication
    const authHeader = req.headers.get('Authorization');
    console.log('🔐 Auth header present:', !!authHeader);
    
    if (!authHeader) {
      console.error('❌ No authorization header provided');
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create Supabase clients
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: { headers: { Authorization: authHeader } }
      }
    );
    
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    console.log('🔧 Supabase clients created');

    // Authenticate user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('👤 User authentication result:', { 
      hasUser: !!user, 
      userId: user?.id,
      userEmail: user?.email,
      error: userError 
    });

    if (userError || !user) {
      console.error('❌ User authentication failed:', userError);
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse the request body
    const requestBody = await req.json();
    const { postType, postDetails, pricingOptions, idempotencyKey } = requestBody;
    
    console.log('📋 Request payload:', {
      postType,
      hasPostDetails: !!postDetails,
      postDetailsKeys: postDetails ? Object.keys(postDetails) : [],
      postTitle: postDetails?.title,
      postCategory: postDetails?.category,
      pricingOptions,
      idempotencyKey
    });
    
    if (!postType || !postDetails || !pricingOptions) {
      console.error('❌ Missing required parameters:', {
        hasPostType: !!postType,
        hasPostDetails: !!postDetails,
        hasPricingOptions: !!pricingOptions
      });
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Verify this is a legitimate free post
    if (pricingOptions.selectedPricingTier !== 'free' && !pricingOptions.isFirstPost) {
      console.error('❌ Not eligible for free post:', pricingOptions);
      return new Response(JSON.stringify({ error: 'Not eligible for free post' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Generate expiration date based on free post duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Free posts expire in 7 days
    
    console.log('📅 Expiration date calculated:', expiresAt.toISOString());

    // Create payment log entry
    console.log('💳 Creating payment log entry...');
    const { data: paymentData, error: paymentError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        amount: 0,
        currency: 'usd',
        plan_type: postType,
        plan_duration: 7, // 7 days for free posts
        payment_status: 'success',
        payment_method: 'free',
        idempotency_key: idempotencyKey,
        pricing_tier: pricingOptions.selectedPricingTier,
        expires_at: expiresAt.toISOString(),
        is_free: true,
        auto_renew_enabled: false
      })
      .select()
      .single();
    
    console.log('💳 Payment log result:', {
      data: paymentData,
      error: paymentError,
      hasData: !!paymentData
    });

    if (paymentError) {
      console.error('❌ Error creating payment log:', paymentError);
      return new Response(JSON.stringify({ error: 'Failed to create payment record' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Create the job listing
    console.log('📝 Creating job listing...');
    const jobInsertData = {
      ...postDetails,
      user_id: user.id,
      status: 'active',
      payment_id: paymentData.id,
      expires_at: expiresAt.toISOString(),
      post_type: postType,
      pricing_tier: pricingOptions.selectedPricingTier,
      category: postDetails.category || 'Other'
    };

    console.log('📝 Job insert data:', jobInsertData);

    const { data: jobData, error: jobError } = await supabaseAdmin
      .from('jobs')
      .insert(jobInsertData)
      .select()
      .single();
    
    console.log('📝 Job creation result:', {
      data: jobData,
      error: jobError,
      hasData: !!jobData
    });

    if (jobError) {
      console.error('❌ Error creating job:', jobError);
      return new Response(JSON.stringify({ error: 'Failed to create job listing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Update the payment log with the listing ID
    console.log('🔗 Updating payment log with listing ID...');
    const { error: updateError } = await supabaseAdmin
      .from('payment_logs')
      .update({ listing_id: jobData.id })
      .eq('id', paymentData.id);

    if (updateError) {
      console.warn('⚠️ Warning: Failed to update payment log with listing ID:', updateError);
      // Don't fail the entire operation for this
    }
    
    console.log('✅ Free post created successfully!');
    return new Response(JSON.stringify({ 
      success: true,
      payment_log_id: paymentData.id,
      job_id: jobData.id,
      job_data: jobData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('💥 Unexpected error in create-free-post:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message,
      stack: error.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
