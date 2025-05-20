
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0";

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
    const { sessionId } = await req.json();
    console.log("Verifying checkout session:", sessionId);

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

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session
    console.log("Retrieving Stripe session");
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get metadata from the session
    const metadata = session.metadata || {};
    console.log("Session metadata:", metadata);
    
    // Check if payment is complete
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        error: "Payment not completed", 
        status: session.payment_status 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Find the related payment log
    console.log("Looking for payment log with session ID:", session.id);
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .select('*')
      .eq('stripe_payment_id', session.id)
      .single();

    if (paymentLogError) {
      console.error("Error fetching payment log:", paymentLogError);
    }

    console.log("Payment log found:", paymentLog ? "yes" : "no");

    // Get post ID from metadata or payment log
    let postId = metadata.post_id || paymentLog?.listing_id;
    let job: any = null;
    
    // Check if post exists
    if (postId) {
      console.log("Looking for existing job with ID:", postId);
      const { data: existingJob } = await supabaseAdmin
        .from('jobs')
        .select('*')
        .eq('id', postId)
        .single();
        
      job = existingJob;
      console.log("Existing job found:", job ? "yes" : "no");
    }
    
    // If there's no job record yet, create one from the stored details
    if (!job && metadata.post_type === 'job') {
      try {
        console.log("Creating new job from stored details");
        // Get details from payment log metadata if available
        const postDetails = paymentLog?.metadata?.post_details || {};
        
        const { data: newJob, error: createError } = await supabaseAdmin
          .from('jobs')
          .insert({
            // Use available details or defaults
            title: postDetails.title || 'Job Posting',
            description: postDetails.description || '',
            location: postDetails.location || '',
            user_id: user.id,
            pricing_tier: metadata.pricing_tier,
            status: 'active',
            expires_at: metadata.expires_at,
            post_type: metadata.post_type,
            contact_info: postDetails.contact_info || { email: user.email }
          })
          .select('id')
          .single();
          
        if (createError) {
          console.error("Error creating job record:", createError);
        } else {
          postId = newJob.id;
          console.log("New job created with ID:", postId);
          
          // Update payment log with job ID if it exists
          if (paymentLog?.id) {
            await supabaseAdmin
              .from('payment_logs')
              .update({ listing_id: postId })
              .eq('id', paymentLog.id);
              
            console.log("Updated payment log with job ID");
          }
        }
      } catch (error) {
        console.error("Error creating job record:", error);
      }
    }
    
    // If we have a post_id, update the job status
    if (postId) {
      console.log("Updating job status for ID:", postId);
      const { error: updateJobError } = await supabaseAdmin
        .from('jobs')
        .update({ 
          status: 'active',
          expires_at: metadata.expires_at
        })
        .eq('id', postId);
        
      if (updateJobError) {
        console.error("Error updating job status:", updateJobError);
      } else {
        console.log("Job status updated successfully");
      }
    }
    
    // Update payment log status
    if (paymentLog?.id) {
      console.log("Updating payment log status for ID:", paymentLog.id);
      const { error: updateLogError } = await supabaseAdmin
        .from('payment_logs')
        .update({ payment_status: 'success' })
        .eq('id', paymentLog.id);
        
      if (updateLogError) {
        console.error("Error updating payment log:", updateLogError);
      } else {
        console.log("Payment log updated successfully");
      }
    }

    console.log("Verification completed successfully");
    return new Response(
      JSON.stringify({
        success: true,
        post_id: postId,
        expires_at: metadata.expires_at || paymentLog?.expires_at,
        post_type: metadata.post_type || paymentLog?.plan_type,
        pricing_tier: metadata.pricing_tier,
        payment_log_id: paymentLog?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
