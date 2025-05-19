
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

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
    // Get the request body
    const body = await req.json();
    
    // Extract price, metadata, and URLs
    const { 
      price, 
      success_url, 
      cancel_url, 
      metadata = {} 
    } = body;

    // Validate required parameters
    if (!price) {
      throw new Error("Price is required");
    }

    // Initialize Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Get user info from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid user" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-08-16",
    });

    // Check if a Stripe customer already exists for this user
    let customer;
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0].id;
    } else {
      // Create a new Stripe customer
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      customer = newCustomer.id;
    }

    // Calculate expiration date (default: 30 days)
    const durationMonths = metadata.pricing_options 
      ? JSON.parse(metadata.pricing_options).durationMonths || 1 
      : 1;
      
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

    // Add userId and expiration to metadata
    const enhancedMetadata = {
      ...metadata,
      userId: user.id,
      userEmail: user.email,
      expires_at: expiresAt.toISOString(),
    };

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${metadata.post_type === 'job' ? 'Job Post' : 'Listing'} - ${metadata.pricing_tier || 'Standard'}`,
              description: `${durationMonths} month${durationMonths > 1 ? 's' : ''} plan`,
            },
            unit_amount_decimal: Math.round(price * 100).toString(), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: success_url || `${req.headers.get("origin")}/dashboard?success=true`,
      cancel_url: cancel_url || `${req.headers.get("origin")}/post-job?canceled=true`,
      metadata: enhancedMetadata,
    });

    // Log the created session to Supabase
    await supabaseAdmin.from("payment_logs").insert({
      user_id: user.id,
      stripe_payment_id: session.id,
      plan_type: metadata.post_type || "job",
      payment_status: "pending",
      expires_at: expiresAt.toISOString(),
      auto_renew_enabled: metadata.pricing_options 
        ? JSON.parse(metadata.pricing_options).autoRenew || false 
        : false,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
