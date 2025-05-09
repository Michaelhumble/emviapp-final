
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
    // Parse request body
    const { postType, postDetails, pricingOptions } = await req.json();

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

    // Initialize Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Initialize Supabase client with user token for user-based operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Processing free ${postType} post for user: ${user.id}`);

    // Calculate expiration date (30 days from now for free posts)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    let createdPostId;
    let error;

    // Create the post in the database
    if (postType === 'job') {
      const { data, error: createError } = await supabaseAdmin.from('jobs').insert({
        ...postDetails,
        user_id: user.id,
        expires_at: expiresAt.toISOString(),
        pricingTier: 'free',
        created_at: new Date().toISOString(),
        status: 'active'
      }).select('id').single();

      createdPostId = data?.id;
      error = createError;
    } else if (postType === 'salon') {
      const { data, error: createError } = await supabaseAdmin.from('salons').insert({
        ...postDetails,
        owner_id: user.id,
        expires_at: expiresAt.toISOString(),
        pricingTier: 'free',
        created_at: new Date().toISOString(),
        status: 'active'
      }).select('id').single();

      createdPostId = data?.id;
      error = createError;
    }

    if (error) {
      console.error(`Error creating ${postType} post:`, error);
      return new Response(JSON.stringify({ error: `Failed to create ${postType} post: ${error.message}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert a record in payment_logs table (even for free posts)
    const { data: paymentLog, error: paymentError } = await supabaseAdmin.from('payment_logs').insert({
      user_id: user.id,
      amount: 0,
      currency: 'usd',
      payment_status: 'completed',
      payment_type: postType,
      related_id: createdPostId,
      pricing_tier: 'free',
      auto_renew_enabled: false // Free posts don't auto-renew
    }).select('id').single();

    if (paymentError) {
      console.error('Error logging payment:', paymentError);
      // Don't fail the entire operation if only the payment log fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        post_id: createdPostId,
        expires_at: expiresAt.toISOString(),
        payment_log_id: paymentLog?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing free post:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
