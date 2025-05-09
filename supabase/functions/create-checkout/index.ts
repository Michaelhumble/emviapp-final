
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Important CORS headers for browser requests
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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured in Supabase secrets");
    }
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });
    
    // Get request body
    const { postType, postDetails, pricingOptions } = await req.json();
    console.log("Request received:", { postType, pricingDetails: !!postDetails, pricingOptions });
    
    if (!postType || !pricingOptions) {
      throw new Error("Missing required fields in request body");
    }
    
    // Create Supabase client with service role key to access restricted resources
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
    // Get user information from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("Invalid user token");
    }
    
    const user = userData.user;
    console.log("User authenticated:", { id: user.id, email: user.email });
    
    // Determine pricing based on selected options
    let amount = 4900; // Default price $49.00
    let productName = "Standard Listing";
    
    if (pricingOptions.selectedPricingTier === "premium") {
      amount = 9900; // $99.00
      productName = "Premium Listing";
    } else if (pricingOptions.selectedPricingTier === "diamond") {
      amount = 14900; // $149.00
      productName = "Diamond Listing";
    }
    
    // Apply duration discount if applicable
    if (pricingOptions.durationMonths && pricingOptions.durationMonths > 1) {
      // 10% discount for 3 months, 15% for 6 months, 20% for 12 months
      const discountPercent = pricingOptions.durationMonths >= 12 ? 0.2 : 
                             pricingOptions.durationMonths >= 6 ? 0.15 : 
                             pricingOptions.durationMonths >= 3 ? 0.1 : 0;
      
      if (discountPercent > 0) {
        // Apply discount and adjust for multiple months
        const discountedMonthly = Math.round(amount * (1 - discountPercent));
        amount = discountedMonthly * pricingOptions.durationMonths;
      } else {
        // Just multiply by months if no discount
        amount = amount * pricingOptions.durationMonths;
      }
    }
    
    // Create or retrieve Stripe customer
    let customerId;
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing Stripe customer:", customerId);
    } else {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        },
      });
      customerId = newCustomer.id;
      console.log("Created new Stripe customer:", customerId);
    }
    
    // Store payment intent in database for tracking
    const { data: paymentLogData, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        post_type: postType,
        amount: amount,
        status: 'pending',
        pricing_tier: pricingOptions.selectedPricingTier,
        post_details: postDetails || {},
        pricing_options: pricingOptions
      })
      .select('id')
      .single();
      
    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
      throw new Error("Failed to create payment record");
    }
    
    const payment_log_id = paymentLogData.id;
    console.log("Created payment log:", { payment_log_id });
    
    // Success and cancel URLs with payment log ID
    const origin = new URL(req.url).origin;
    const success_url = new URL('/post-success', origin).toString();
    const cancel_url = new URL('/post-canceled', origin).toString();
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${productName} - ${postType.charAt(0).toUpperCase() + postType.slice(1)}`,
              description: `${pricingOptions.durationMonths || 1} month${pricingOptions.durationMonths > 1 ? 's' : ''} listing`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${success_url}?payment_log_id=${payment_log_id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancel_url}?payment_log_id=${payment_log_id}`,
      metadata: {
        payment_log_id: payment_log_id,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        user_id: user.id,
      },
    });
    
    console.log("Checkout session created:", { id: session.id, url: session.url });
    
    // Update payment log with session ID
    await supabaseAdmin
      .from('payment_logs')
      .update({ 
        stripe_session_id: session.id,
        checkout_url: session.url
      })
      .eq('id', payment_log_id);
    
    // Return success with URL for redirection
    return new Response(
      JSON.stringify({
        success: true,
        url: session.url,
        session_id: session.id,
        payment_log_id: payment_log_id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in create-checkout:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Unknown error occurred",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
