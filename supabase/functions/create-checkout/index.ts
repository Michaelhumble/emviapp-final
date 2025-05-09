
// @ts-nocheck
// This comment disables TypeScript checking for this file because it uses Deno types

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";
import { addMonths } from "https://esm.sh/date-fns@2.30.0";

// CORS headers for cross-origin requests
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
    // Get request data and auth header
    const requestData = await req.json();
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");

    // Initialize the Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: { headers: { Authorization: `Bearer ${token}` } }
      }
    );

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error("Authentication failed:", userError);
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Authenticated user: ${user.id}`);

    // Extract request parameters
    const { postType, postDetails, pricingOptions } = requestData;
    console.log(`Creating checkout for ${postType} with pricing tier: ${pricingOptions.selectedPricingTier}`);

    // Handle free posts separately (should be handled by different endpoint)
    if (pricingOptions.selectedPricingTier === "free") {
      return new Response(
        JSON.stringify({ error: "Free posts should use the create-free-post endpoint" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Calculate pricing details
    const pricingDetails = calculatePricing(pricingOptions);
    console.log("Pricing details:", pricingDetails);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-08-16",
    });

    // Create the payment mode
    const paymentMode = pricingOptions.autoRenew ? "subscription" : "payment";
    console.log(`Payment mode: ${paymentMode}`);

    // Initialize Supabase admin client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Create a placeholder post record
    console.log("Creating placeholder post record...");
    const { data: post, error: postError } = await createPlaceholderPost(
      supabaseAdmin,
      postType,
      postDetails,
      pricingOptions,
      user.id
    );

    if (postError) {
      console.error(`Error creating ${postType} record:`, postError);
      return new Response(JSON.stringify({ error: `Failed to create ${postType} record` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Created placeholder ${postType} with ID: ${post?.id}`);

    // Calculate the expiration date
    const expiresAt = addMonths(new Date(), pricingOptions.durationMonths || 1).toISOString();

    // Create a payment log record
    console.log("Creating payment log record...");
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from("payment_logs")
      .insert({
        user_id: user.id,
        listing_id: post?.id,
        listing_type: postType,
        payment_type: paymentMode,
        amount: pricingDetails.amountInCents / 100,
        currency: "usd",
        payment_status: "pending",
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: pricingOptions.durationMonths,
        auto_renew: pricingOptions.autoRenew || false,
        expires_at: expiresAt,
        metadata: { 
          originalPrice: pricingDetails.basePrice,
          discountPercentage: pricingDetails.discountPercentage,
          finalPrice: pricingDetails.finalPrice
        }
      })
      .select()
      .single();

    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
      // Continue anyway - the payment log is not critical
    } else {
      console.log(`Created payment log with ID: ${paymentLog.id}`);
    }

    // Create product name based on post type and pricing tier
    let productName = `${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Listing`;
    if (pricingOptions.durationMonths > 1) {
      productName += ` (${pricingOptions.durationMonths} months)`;
    }

    // Create Stripe Checkout Session
    console.log("Creating Stripe checkout session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
            },
            unit_amount: pricingDetails.amountInCents,
            recurring: paymentMode === "subscription" ? {
              interval: "year",
              interval_count: 1
            } : undefined,
          },
          quantity: 1,
        },
      ],
      mode: paymentMode,
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post-cancel?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        post_id: post?.id,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: pricingOptions.durationMonths,
        auto_renew: pricingOptions.autoRenew || false,
        expires_at: expiresAt,
        payment_log_id: paymentLog?.id || null
      },
    });

    console.log(`✅ Created checkout session with ID: ${session.id} and URL: ${session.url}`);

    // Update payment log with Stripe session ID if available
    if (paymentLog && session.id) {
      await supabaseAdmin
        .from("payment_logs")
        .update({ stripe_payment_id: session.id })
        .eq("id", paymentLog.id);
      
      console.log(`Updated payment log ${paymentLog.id} with Stripe session ID: ${session.id}`);
    }

    return new Response(
      JSON.stringify({
        url: session.url,
        session_id: session.id,
        post_id: post?.id,
        payment_log_id: paymentLog?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Calculate pricing details based on options
function calculatePricing(pricingOptions) {
  // Get base price per month based on selected tier
  let basePricePerMonth = 0;
  
  switch (pricingOptions.selectedPricingTier) {
    case "standard":
      basePricePerMonth = 9.99;
      break;
    case "gold":
      basePricePerMonth = 19.99;
      break;
    case "premium":
      basePricePerMonth = 49.99;
      break;
    case "diamond":
      basePricePerMonth = 124.99; // $1,499.99 yearly or $999.99 with promo
      break;
    default:
      basePricePerMonth = 9.99; // Default to standard
  }

  // Calculate duration discount
  let discountPercentage = 0;
  
  // Apply duration-based discount (except for Diamond tier)
  if (pricingOptions.selectedPricingTier !== "diamond") {
    switch (pricingOptions.durationMonths) {
      case 3:
        discountPercentage = 10;
        break;
      case 6:
        discountPercentage = 20;
        break;
      case 12:
        discountPercentage = 30;
        break;
      default:
        discountPercentage = 0;
    }
  } else {
    // Special pricing for Diamond tier
    // 12-month diamond plan has a promotional price of $999.99 instead of $1,499.99
    discountPercentage = pricingOptions.durationMonths === 12 ? 33 : 0; // ~33% discount
  }

  // Calculate the original price (before discount)
  let basePrice = basePricePerMonth * pricingOptions.durationMonths;
  
  // Apply discount
  let finalPrice = basePrice * (1 - (discountPercentage / 100));
  
  // If it's diamond plan with 12-month duration, set the exact promo price
  if (pricingOptions.selectedPricingTier === "diamond" && pricingOptions.durationMonths === 12) {
    finalPrice = 999.99; // Special promotional price
    basePrice = 1499.99; // Original yearly price
  }
  
  // Round to 2 decimal places and convert to cents for Stripe
  finalPrice = Math.round(finalPrice * 100) / 100;
  const amountInCents = Math.round(finalPrice * 100);
  
  return {
    basePrice,
    finalPrice,
    discountPercentage,
    amountInCents,
    durationMonths: pricingOptions.durationMonths
  };
}

// Create a placeholder post record with pending status
async function createPlaceholderPost(supabase, postType, postDetails, pricingOptions, userId) {
  // Common fields for all post types
  const commonFields = {
    user_id: userId,
    status: "pending_payment",
    pricingTier: pricingOptions.selectedPricingTier,
    is_featured: ["premium", "diamond"].includes(pricingOptions.selectedPricingTier),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // Get the appropriate table name based on post type
  let tableName;
  if (postType === "job") {
    tableName = "jobs";
  } else if (postType === "salon") {
    tableName = "salons";
  } else if (postType === "booth") {
    tableName = "booths";
  } else if (postType === "supply") {
    tableName = "supplies";
  } else {
    throw new Error(`Invalid post type: ${postType}`);
  }

  // Merge the post details with common fields
  const postData = {
    ...postDetails,
    ...commonFields
  };

  // Insert the record and return the ID
  return await supabase.from(tableName).insert(postData).select().single();
}
