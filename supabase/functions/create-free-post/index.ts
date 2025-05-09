
// @ts-nocheck

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    // Get authorization header from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client with anonymous key (for user authentication)
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Create Admin Supabase client with service role (for database operations)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Get the user from the auth header
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unable to get user" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the request body
    const { postType, postDetails, pricingOptions } = await req.json();
    
    console.log("Processing free post for:", postType);
    
    // Verify that this is actually a free post
    if (pricingOptions?.selectedPricingTier !== "free") {
      return new Response(JSON.stringify({ error: "Invalid pricing tier for free post" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user is eligible for a free post (first time poster)
    const { data: existingPosts, error: queryError } = await supabaseAdmin
      .from('payment_logs')
      .select('id')
      .eq('user_id', user.id)
      .eq('plan_type', postType)
      .limit(1);
      
    if (queryError) {
      console.error("Error checking existing posts:", queryError);
    }
    
    const isFirstPost = !existingPosts || existingPosts.length === 0;
    
    // Only allow free posts for first-time posters
    if (!isFirstPost && !pricingOptions?.isFirstPost) {
      return new Response(JSON.stringify({ error: "Free tier is only available for first-time posts" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Calculate expiration date (30 days for free tier)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days for free tier

    // Create the post
    const { data: newPost, error: postError } = await supabaseAdmin
      .from('jobs')
      .insert({
        ...postDetails,
        user_id: user.id,
        status: 'active',
        post_type: postType,
        pricingTier: 'free',
        expires_at: expiresAt.toISOString()
      })
      .select('id')
      .single();
      
    if (postError) {
      console.error("Error creating free post:", postError);
      return new Response(JSON.stringify({ error: "Failed to create free post" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create payment log entry for the free post
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: newPost.id,
        plan_type: postType,
        payment_status: 'free',
        expires_at: expiresAt.toISOString(),
        auto_renew_enabled: false
      })
      .select('id')
      .single();

    if (paymentLogError) {
      console.error("Error creating payment log for free post:", paymentLogError);
    }

    // Return success with post data
    return new Response(
      JSON.stringify({ 
        success: true, 
        post_id: newPost.id,
        payment_log_id: paymentLog?.id,
        expires_at: expiresAt.toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Free post creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
