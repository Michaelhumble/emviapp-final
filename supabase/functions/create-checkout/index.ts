
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
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
    // Get the auth header for user authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase clients
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: { headers: { Authorization: authHeader } },
      }
    );

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Parse request body
    const {
      postType,
      postDetails,
      pricingOptions,
      priceData,
      idempotencyKey,
      autoRenew = true, // Default to auto-renew
    } = await req.json();

    // Verify the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "User not authenticated" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Log key information
    console.log("Creating checkout session", {
      userId: user.id,
      postType,
      tier: pricingOptions.selectedPricingTier,
      duration: pricingOptions.durationMonths,
      autoRenew,
      price: priceData.finalPrice
    });

    // Check if the user already has a Stripe customer ID
    const { data: customerData } = await supabaseAdmin
      .from("users")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = customerData?.stripe_customer_id;

    // If no customer ID found, create a new customer in Stripe
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        },
      });
      
      customerId = customer.id;
      
      // Store the customer ID in the database
      await supabaseAdmin
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Calculate expiration date based on duration
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + pricingOptions.durationMonths);

    // Format the product name
    const productName = `${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Post`;

    // Create a payment log entry
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from("payment_logs")
      .insert({
        user_id: user.id,
        plan_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        amount: priceData.finalPrice,
        duration_months: pricingOptions.durationMonths,
        payment_status: "pending",
        auto_renew_enabled: autoRenew,
        expires_at: expiresAt.toISOString(),
        listing_data: postDetails,
        idempotency_key: idempotencyKey,
      })
      .select("id")
      .single();

    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
      throw new Error("Failed to create payment log");
    }

    // Determine payment mode based on auto-renew setting
    const paymentMode = autoRenew ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: `${pricingOptions.durationMonths}-month ${pricingOptions.selectedPricingTier} plan`,
            },
            unit_amount: Math.round(priceData.finalPrice * 100),
            ...(autoRenew
              ? {
                  recurring: {
                    interval: pricingOptions.durationMonths === 1 ? "month" : "year",
                    interval_count: pricingOptions.durationMonths === 1 ? 1 : 1,
                  },
                }
              : {}),
          },
          quantity: 1,
        },
      ],
      mode: paymentMode,
      success_url: `${req.headers.get("origin")}/post-success?payment_log_id=${paymentLog.id}`,
      cancel_url: `${req.headers.get("origin")}/post-canceled`,
      metadata: {
        user_id: user.id,
        post_type: postType,
        payment_log_id: paymentLog.id,
        pricing_tier: pricingOptions.selectedPricingTier,
        expires_at: expiresAt.toISOString(),
        auto_renew: autoRenew.toString(),
      },
    });

    // Update payment log with Stripe session ID
    await supabaseAdmin
      .from("payment_logs")
      .update({ stripe_payment_id: session.id })
      .eq("id", paymentLog.id);

    return new Response(JSON.stringify({ url: session.url, payment_log_id: paymentLog.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
