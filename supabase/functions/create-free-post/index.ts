
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
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse the request
    const { postType, postDetails, pricingOptions, idempotencyKey } = await req.json();
    
    if (!postType || !postDetails || !pricingOptions) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check for idempotency - prevent duplicate posts
    if (idempotencyKey) {
      const { data: existingPayment } = await supabaseAdmin
        .from('payment_logs')
        .select('id')
        .eq('idempotency_key', idempotencyKey)
        .single();
      
      if (existingPayment) {
        return new Response(JSON.stringify({ 
          message: 'This post has already been processed',
          payment_log_id: existingPayment.id 
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Verify this is a legitimate free post (either free tier or first post)
    if (pricingOptions.selectedPricingTier !== 'free' && !pricingOptions.isFirstPost) {
      return new Response(JSON.stringify({ error: 'Not eligible for free post' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Generate expiration date based on free post duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Free posts expire in 7 days
    
    // Check for required fields in postDetails
    if (!postDetails.title || !postDetails.location) {
      return new Response(JSON.stringify({ error: 'Missing required job details' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      // Create payment log entry
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
      
      if (paymentError) {
        console.error('Error creating payment log:', paymentError);
        throw new Error('Failed to create payment record');
      }
      
      // Create the job listing
      const { data: jobData, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert({
          ...postDetails,
          user_id: user.id,
          status: 'active',
          payment_id: paymentData.id,
          expires_at: expiresAt.toISOString(),
          post_type: postType,
          pricing_tier: pricingOptions.selectedPricingTier
        })
        .select()
        .single();
      
      if (jobError) {
        console.error('Error creating job:', jobError);
        throw new Error('Failed to create job listing');
      }
      
      // Update the payment log with the listing ID
      await supabaseAdmin
        .from('payment_logs')
        .update({ listing_id: jobData.id })
        .eq('id', paymentData.id);
      
      return new Response(JSON.stringify({ 
        success: true,
        payment_log_id: paymentData.id,
        job_id: jobData.id
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Database operation failed:', error);
      throw error;
    }
    
  } catch (error) {
    console.error('Error creating free post:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
