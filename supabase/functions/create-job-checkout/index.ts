
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
    const { tier, finalPrice, durationMonths, jobData, jobId } = await req.json();
    console.log('💰 Creating paid job checkout:', { tier, finalPrice, jobId });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: { persistSession: false }
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    console.log('✅ User authenticated:', user.id);

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session with job ID in metadata for webhook activation
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Job Posting`,
              description: `${durationMonths} month job posting - ${jobData?.title || 'Job Posting'}`
            },
            unit_amount: Math.round(finalPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post-canceled`,
      metadata: {
        tier,
        durationMonths: durationMonths.toString(),
        jobTitle: jobData?.title || '',
        userId: user.id,
        post_id: jobId, // This is the key - the draft job ID to activate
        post_type: 'job',
        pricing_tier: tier,
        job_id: jobId // Also store as job_id for webhook compatibility
      },
    });

    // Log the payment attempt with the draft job ID
    await supabaseClient
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: jobId, // Reference the draft job
        plan_type: 'job',
        pricing_tier: tier,
        payment_status: 'pending',
        stripe_payment_id: session.id,
        expires_at: new Date(Date.now() + (durationMonths * 30 * 24 * 60 * 60 * 1000)).toISOString()
      });

    console.log('✅ Stripe session created:', session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
