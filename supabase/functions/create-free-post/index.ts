
// @ts-nocheck
// ^ This comment disables TypeScript checking for this file since it uses Deno types

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
    const body = await req.json();
    const { postType, postDetails, pricingOptions } = body;
    
    console.log(`🆓 Processing free ${postType} post...`);
    
    if (!postType || !postDetails) {
      console.error("Missing required parameters for free post");
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Initialize Supabase clients
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error("Authentication failed:", userError);
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log(`👤 User authenticated: ${user.id}`);

    // Calculate expiry date (30 days for free posts)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    const expiresAt = expiryDate.toISOString();
    
    // Create post based on post type
    let newPostId;
    let postError;
    
    if (postType === 'job') {
      // Create job post
      const { data: jobData, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert({
          user_id: user.id,
          title: postDetails.title || "",
          description: postDetails.description || "",
          location: postDetails.location || "",
          compensation_type: postDetails.compensation_type,
          compensation_details: postDetails.compensation_details,
          employment_type: postDetails.employment_type,
          requirements: postDetails.requirements,
          contact_info: postDetails.contact_info,
          status: "active",
          expires_at: expiresAt,
          pricingTier: 'free'
        })
        .select('id')
        .single();
      
      newPostId = jobData?.id;
      postError = jobError;
      
    } else if (postType === 'salon') {
      // Create salon sale post
      const { data: salonData, error: salonError } = await supabaseAdmin
        .from('salon_sales')
        .insert({
          user_id: user.id,
          salon_name: postDetails.salon_name || postDetails.title || "",
          city: postDetails.city || postDetails.location || "",
          state: postDetails.state || "",
          description: postDetails.description || "",
          asking_price: postDetails.asking_price || 0,
          is_featured: false,
          is_urgent: false,
          expires_at: expiresAt,
          status: "active"
        })
        .select('id')
        .single();
      
      newPostId = salonData?.id;
      postError = salonError;
    }
    
    if (postError) {
      console.error(`Error creating ${postType} post:`, postError);
      return new Response(JSON.stringify({ error: `Error creating ${postType} post`, details: postError }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Create payment log entry
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from("payment_logs")
      .insert({
        user_id: user.id,
        listing_id: newPostId,
        plan_type: postType,
        payment_status: "success", // Free posts are automatically "paid"
        auto_renew_enabled: false, // Free posts don't have auto-renew
        expires_at: expiresAt
      })
      .select("id")
      .single();
    
    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
      // Non-critical error, continue
    }
    
    console.log(`✅ Created free ${postType} post ID: ${newPostId}`);
    console.log(`📝 Created payment log ID: ${paymentLog?.id}`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      post_id: newPostId,
      payment_log_id: paymentLog?.id,
      expires_at: expiresAt
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error("Error in create-free-post:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
