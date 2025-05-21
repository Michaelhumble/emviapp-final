
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

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
    
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing session ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

    console.log("User authenticated:", user.id);

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: "Stripe key missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (stripeError) {
      console.error("Stripe error:", stripeError);
      return new Response(JSON.stringify({ error: "Invalid session ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get metadata from the session
    const metadata = session.metadata || {};
    
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
    
    console.log("Payment is complete, updating records...");
    
    // Find the related payment log
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .select('*')
      .eq('stripe_payment_id', session.id)
      .single();

    if (paymentLogError) {
      console.error("Error fetching payment log:", paymentLogError);
    }

    if (!paymentLog) {
      console.log("Payment log not found, creating new job record");
      
      // If we have a post_id in metadata, update the job status
      if (metadata.post_id) {
        console.log("Updating job status for post_id:", metadata.post_id);
        const { error: updateJobError } = await supabaseAdmin
          .from('jobs')
          .update({ 
            status: 'active',
            expires_at: metadata.expires_at
          })
          .eq('id', metadata.post_id);
          
        if (updateJobError) {
          console.error("Error updating job status:", updateJobError);
          return new Response(JSON.stringify({ error: "Failed to update job status" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      } else {
        // If no existing job, create one based on metadata
        if (metadata.job_details) {
          try {
            const jobDetails = JSON.parse(metadata.job_details);
            const { data: jobData, error: jobError } = await supabaseAdmin
              .from('jobs')
              .insert({
                ...jobDetails,
                user_id: user.id,
                status: 'active',
                expires_at: metadata.expires_at,
                pricing_tier: metadata.pricing_tier,
                payment_id: session.id
              })
              .select()
              .single();
              
            if (jobError) {
              console.error("Error creating job:", jobError);
              return new Response(JSON.stringify({ error: "Failed to create job record" }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            }
            
            metadata.post_id = jobData.id;
          } catch (parseError) {
            console.error("Error parsing job details from metadata:", parseError);
          }
        }
      }
    } else {
      // Update payment log status
      const { error: updateLogError } = await supabaseAdmin
        .from('payment_logs')
        .update({ payment_status: 'success' })
        .eq('id', paymentLog.id);
        
      if (updateLogError) {
        console.error("Error updating payment log:", updateLogError);
      }
      
      // Update job status if we have a listing ID
      if (paymentLog.listing_id) {
        const { error: updateJobError } = await supabaseAdmin
          .from('jobs')
          .update({ status: 'active' })
          .eq('id', paymentLog.listing_id);
          
        if (updateJobError) {
          console.error("Error updating job status:", updateJobError);
        }
        
        metadata.post_id = paymentLog.listing_id;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        post_id: metadata.post_id || paymentLog?.listing_id,
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
