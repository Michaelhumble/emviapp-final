
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
    console.log("Creating free post - START");
    
    // Parse request body
    const { postType, postDetails, pricingOptions } = await req.json();
    console.log("Request data:", { postType, pricingOptions });
    
    // Get auth header for user identification
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized - Must be logged in" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401 
        }
      );
    }
    
    // Extract token from Auth header
    const token = authHeader.replace("Bearer ", "");
    
    // Initialize Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
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
    
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error("Authentication failed:", userError);
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401 
        }
      );
    }
    
    console.log("User authenticated:", user.id);
    
    // Calculate expiration date based on duration
    const durationMonths = pricingOptions?.durationMonths || 0.5; // Default to 14 days (0.5 months)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (durationMonths * 30));
    
    // Create job posting directly
    if (postType === 'job') {
      // Add user_id to job details
      const jobData = {
        ...postDetails,
        user_id: user.id,
        status: 'active',
        expires_at: expiresAt.toISOString(),
        pricingTier: pricingOptions?.selectedPricingTier || 'free',
        created_at: new Date().toISOString()
      };
      
      console.log("Creating job post:", jobData);
      
      // Insert into jobs table
      const { data: job, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert(jobData)
        .select()
        .single();
      
      if (jobError) {
        console.error("Error creating job:", jobError);
        return new Response(
          JSON.stringify({ error: "Failed to create job posting", details: jobError.message }),
          { 
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500 
          }
        );
      }
      
      console.log("Job created successfully:", job.id);
      
      // Add entry to payment logs for tracking
      const { data: paymentLog, error: logError } = await supabaseAdmin
        .from('payment_logs')
        .insert({
          user_id: user.id,
          listing_id: job.id,
          payment_type: 'free',
          payment_status: 'success',
          amount: 0,
          plan_type: 'job',
          expires_at: expiresAt.toISOString()
        })
        .select()
        .single();
      
      if (logError) {
        console.error("Error creating payment log:", logError);
      } else {
        console.log("Payment log created:", paymentLog.id);
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          post_id: job.id,
          payment_log_id: paymentLog?.id,
          expires_at: expiresAt.toISOString()
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported post type" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }
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
