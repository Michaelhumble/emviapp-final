
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('❌ No authorization header provided');
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

    // Authenticate user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.log('❌ User authentication failed:', userError);
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ User authenticated:', user.id);

    // Parse the request
    const { postType, postDetails, pricingOptions, idempotencyKey } = await req.json();
    
    console.log('📝 Received request data:', {
      postType,
      postDetails: JSON.stringify(postDetails, null, 2),
      pricingOptions,
      idempotencyKey,
      userId: user.id
    });
    
    if (!postType || !postDetails || !pricingOptions) {
      console.log('❌ Missing required parameters:', { postType, postDetails: !!postDetails, pricingOptions });
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Verify this is a legitimate free post (either free tier or first post)
    if (pricingOptions.selectedPricingTier !== 'free' && !pricingOptions.isFirstPost) {
      console.log('❌ Not eligible for free post:', pricingOptions);
      return new Response(JSON.stringify({ error: 'Not eligible for free post' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log('✅ Free post eligibility verified');
    
    // Generate expiration date based on free post duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Free posts expire in 7 days
    
    console.log('📅 Setting expiration date:', expiresAt.toISOString());
    
    // Create payment log entry
    const paymentLogData = {
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
    };
    
    console.log('💰 Creating payment log with data:', paymentLogData);
    
    const { data: paymentData, error: paymentError } = await supabaseAdmin
      .from('payment_logs')
      .insert(paymentLogData)
      .select()
      .single();
    
    if (paymentError) {
      console.error('❌ Error creating payment log:', paymentError);
      return new Response(JSON.stringify({ error: 'Failed to create payment record' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log('✅ Payment log created successfully:', paymentData);
    
    // Create the job listing
    const jobData = {
      ...postDetails,
      user_id: user.id,
      status: 'active',
      payment_id: paymentData.id,
      expires_at: expiresAt.toISOString(),
      post_type: postType,
      pricing_tier: pricingOptions.selectedPricingTier
    };
    
    console.log('📋 Creating job with data:', JSON.stringify(jobData, null, 2));
    
    const { data: jobResult, error: jobError } = await supabaseAdmin
      .from('jobs')
      .insert(jobData)
      .select()
      .single();
    
    if (jobError) {
      console.error('❌ Error creating job:', jobError);
      return new Response(JSON.stringify({ error: 'Failed to create job listing' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log('✅ Job created successfully:', jobResult);
    
    // Update the payment log with the listing ID
    const { error: updateError } = await supabaseAdmin
      .from('payment_logs')
      .update({ listing_id: jobResult.id })
      .eq('id', paymentData.id);
    
    if (updateError) {
      console.log('⚠️ Warning: Failed to update payment log with listing ID:', updateError);
    } else {
      console.log('✅ Payment log updated with listing ID:', jobResult.id);
    }
    
    const response = { 
      success: true,
      payment_log_id: paymentData.id,
      job_id: jobResult.id
    };
    
    console.log('🎉 Free job post created successfully:', response);
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('💥 Unexpected error creating free post:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
