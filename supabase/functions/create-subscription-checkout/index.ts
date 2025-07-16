import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SUBSCRIPTION-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not configured");
    logStep("Stripe key verified");

    // Create Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Create service role client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const { planId, planName, priceAmount, interval = "month" } = await req.json();
    if (!planId || !planName || !priceAmount) {
      throw new Error("Missing required plan data");
    }
    logStep("Plan data received", { planId, planName, priceAmount, interval });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if customer exists in Stripe
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
          plan_id: planId
        }
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Create or retrieve price for this plan
    let priceId;
    
    // Try to find existing price first
    const prices = await stripe.prices.list({
      product: `emvi_${planId}`,
      active: true,
      limit: 1
    });

    if (prices.data.length > 0) {
      priceId = prices.data[0].id;
      logStep("Found existing price", { priceId });
    } else {
      // Create product first
      const product = await stripe.products.create({
        id: `emvi_${planId}`,
        name: planName,
        description: `EmviApp ${planName} subscription plan`
      });

      // Create price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(priceAmount * 100), // Convert to cents
        currency: "usd",
        recurring: {
          interval: interval as "month" | "year"
        }
      });
      priceId = price.id;
      logStep("Created new product and price", { productId: product.id, priceId });
    }

    // Create Stripe checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
      metadata: {
        user_id: user.id,
        plan_id: planId,
        plan_name: planName
      }
    });

    logStep("Stripe session created", { sessionId: session.id, url: session.url });

    // Store subscription intent in database
    await supabaseAdmin.from("subscription_intents").insert({
      user_id: user.id,
      stripe_session_id: session.id,
      plan_id: planId,
      plan_name: planName,
      amount: priceAmount,
      interval: interval,
      status: "pending"
    });

    logStep("Subscription intent recorded");

    return new Response(JSON.stringify({
      url: session.url,
      sessionId: session.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-subscription-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});