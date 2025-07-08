import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("🎣 Stripe webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      throw new Error("Missing Stripe configuration");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("No Stripe signature");
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    console.log("📧 Event type:", event.type);

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("💳 Payment completed for session:", session.id);
      console.log("📋 Session metadata:", session.metadata);

      // Create Supabase client with service role
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      // Extract job data from metadata
      const metadata = session.metadata;
      if (!metadata || !metadata.user_id) {
        throw new Error("Missing required metadata");
      }

      // Create job in Supabase
      const jobPayload = {
        title: metadata.job_title,
        category: metadata.job_category,
        location: metadata.job_location || null,
        description: metadata.job_description,
        compensation_type: metadata.compensation_type || null,
        compensation_details: metadata.compensation_details || null,
        requirements: metadata.requirements || null,
        contact_info: {
          owner_name: metadata.contact_name || "",
          phone: metadata.contact_phone || "",
          email: metadata.contact_email || "",
          notes: metadata.contact_notes || ""
        },
        user_id: metadata.user_id,
        status: "active",
        pricing_tier: "paid",
        stripe_session_id: session.id,
        payment_status: "completed"
      };

      console.log("💾 Creating job with payload:", jobPayload);

      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .insert([jobPayload])
        .select();

      if (jobError) {
        console.error("❌ Error creating job:", jobError);
        throw jobError;
      }

      console.log("✅ Job created successfully:", jobData[0]);

      // Log payment
      const { error: paymentError } = await supabase
        .from("payment_logs")
        .insert([{
          user_id: metadata.user_id,
          plan_type: "job_posting",
          pricing_tier: "paid",
          stripe_payment_id: session.id,
          payment_status: "success",
          listing_id: jobData[0].id
        }]);

      if (paymentError) {
        console.error("❌ Error logging payment:", paymentError);
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});