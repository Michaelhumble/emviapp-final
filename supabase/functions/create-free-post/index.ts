
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
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
    console.log("Creating free job post - START");
    
    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
    
    // Initialize Supabase admin client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
    // Initialize client with user token for getting user info
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );
    
    // Get user from token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error("Authentication failed: " + (userError?.message || "User not found"));
    }
    
    console.log("User authenticated:", user.id);
    
    // Parse request body
    const { postType, postDetails, pricingOptions } = await req.json();
    
    // Calculate expiration date based on duration
    const durationMonths = pricingOptions?.durationMonths || 0.5; // Default to 14 days (0.5 months)
    const expiresAt = new Date(Date.now() + (durationMonths * 30 * 24 * 60 * 60 * 1000)).toISOString();
    
    console.log("Creating free job post with expiration:", expiresAt);
    
    // Create job in database with 'active' status
    const jobData = {
      ...postDetails,
      user_id: user.id,
      status: 'active',
      expires_at: expiresAt,
      pricingTier: pricingOptions?.selectedPricingTier || 'free',
      post_type: postType
    };
    
    // Insert job
    const { data: jobInsertData, error: jobInsertError } = await supabaseAdmin
      .from('jobs')
      .insert([jobData])
      .select();
    
    if (jobInsertError) {
      console.error("Error inserting job:", jobInsertError);
      throw new Error("Failed to create job post: " + jobInsertError.message);
    }
    
    const jobId = jobInsertData?.[0]?.id;
    console.log("Job post created successfully with ID:", jobId);
    
    // Record the free transaction in payment_logs
    const { data: paymentLogData, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert([{
        user_id: user.id,
        amount: 0,
        currency: 'usd',
        payment_method: 'free',
        payment_status: 'success',
        plan_type: postType,
        listing_id: jobId,
        pricing_tier: pricingOptions?.selectedPricingTier || 'free',
        expires_at: expiresAt
      }])
      .select();
    
    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
      // Continue even if payment log fails
    }
    
    const paymentLogId = paymentLogData?.[0]?.id;
    console.log("Payment log created with ID:", paymentLogId);
    
    return new Response(
      JSON.stringify({
        success: true,
        post_id: jobId,
        payment_log_id: paymentLogId,
        expires_at: expiresAt
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in create-free-post:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
