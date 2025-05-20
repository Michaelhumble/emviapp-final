
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const {
      postType,
      postDetails,
      pricingOptions,
      idempotencyKey
    } = await req.json();
    
    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract token from Auth header
    const token = authHeader.replace("Bearer ", "");

    // Initialize Supabase client with user token
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );

    // Initialize Supabase admin client for service operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Calculate expires_at (for free tier, typically 7 days)
    const expiresAt = new Date();
    
    // For standard tier with first post discount, give a full 30 days
    if (pricingOptions.selectedPricingTier === 'standard' && pricingOptions.isFirstPost) {
      expiresAt.setDate(expiresAt.getDate() + 30);
    } else {
      // Free tier gets 7 days
      expiresAt.setDate(expiresAt.getDate() + 7);
    }

    // Create a payment log entry for tracking (even though it's free)
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        plan_type: postType,
        payment_status: 'success', // It's free, so payment is successful by default
        auto_renew_enabled: false,  // No auto-renew for free tier
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();
      
    if (paymentLogError) {
      return new Response(JSON.stringify({ error: "Failed to create payment log" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create the job/post entry directly with "active" status
    let listingId;
    if (postType === 'job') {
      const { data: jobData, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert({
          ...postDetails,
          user_id: user.id,
          status: 'active', // Free posts are immediately active
          pricing_tier: pricingOptions.selectedPricingTier,
          expires_at: expiresAt.toISOString(),
          salonName: postDetails.salonName || 'Unknown Salon' // Include salonName with fallback
        })
        .select('id')
        .single();
        
      if (jobError) {
        return new Response(JSON.stringify({ error: "Failed to create job entry" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      listingId = jobData.id;
      
      // Update the payment log with the listing ID
      await supabaseAdmin
        .from('payment_logs')
        .update({ listing_id: listingId })
        .eq('id', paymentLog.id);
    } else {
      // Handle other post types if needed
    }
    
    // For first-time posters, update their stats
    if (pricingOptions.isFirstPost) {
      // This would update some user stats or activity log
      // (implementation depends on your schema)
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true,
      listing_id: listingId,
      payment_log_id: paymentLog.id,
      expires_at: expiresAt.toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating free post:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
