
// @ts-nocheck
// ^ This comment disables TypeScript checking for this file since it uses Deno types

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
    console.log("🔄 Starting create-checkout function");
    
    // Parse request body
    const body = await req.json();
    const { postType, pricing, postDetails, pricingOptions } = body;
    
    if (!postType || !pricing || !postDetails) {
      console.error("❌ Missing required parameters:", { postType, pricing: !!pricing, postDetails: !!postDetails });
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log(`📝 Request info - Type: ${postType}, Tier: ${pricing.tier}, Mode: ${pricing.mode}`);

    // Authentication check 
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("❌ No authorization header");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract token from Auth header
    const token = authHeader.replace("Bearer ", "");
    
    // Initialize supabase client with the user's token
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    
    // Initialize Supabase admin client for service role operations
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error("❌ Authentication failed:", userError);
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log(`👤 User authenticated: ${user.id}`);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if a customer record exists for this user
    let customerId;
    try {
      const customers = await stripe.customers.list({ 
        email: user.email, 
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log(`👥 Existing Stripe customer found: ${customerId}`);
      } else {
        // Create a new customer
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: {
            user_id: user.id
          }
        });
        customerId = newCustomer.id;
        console.log(`👥 Created new Stripe customer: ${customerId}`);
      }
    } catch (stripeError) {
      console.error("❌ Stripe customer error:", stripeError);
      return new Response(JSON.stringify({ error: "Failed to find or create customer" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine plan name based on tier and type
    const getPlanName = () => {
      const tierNames = {
        free: "Free",
        standard: "Standard",
        gold: "Gold Featured",
        premium: "Premium",
        diamond: "Diamond Featured"
      };
      
      return `${tierNames[pricing.tier] || "Standard"} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Listing`;
    };

    // Calculate expiry date based on duration
    const calculateExpiryDate = (durationMonths) => {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + durationMonths);
      return expiryDate.toISOString();
    };
    
    const expiresAt = calculateExpiryDate(pricing.durationMonths);
    console.log(`📅 Calculated expiry date: ${expiresAt}`);

    // Create a temporary job post record to track this checkout
    let temporaryPostId;
    try {
      // Insert temporary post record
      const { data: tempPost, error: tempPostError } = await supabaseAdmin
        .from(postType === 'job' ? 'jobs' : 'salon_sales')
        .insert({
          user_id: user.id,
          title: postDetails.title || "Pending Payment",
          location: postDetails.location || "",
          status: "pending_payment", 
          expires_at: expiresAt,
          // Include other fields from postDetails
          ...(postType === 'job' ? {
            description: postDetails.description,
            compensation_type: postDetails.compensation_type,
            compensation_details: postDetails.compensation_details
          } : {
            salon_name: postDetails.salon_name || postDetails.title || "",
            description: postDetails.description,
            asking_price: postDetails.asking_price || 0
          }),
        })
        .select("id")
        .single();
        
      if (tempPostError) {
        console.error("❌ Failed to create temporary post record:", tempPostError);
      } else if (tempPost) {
        temporaryPostId = tempPost.id;
        console.log(`✅ Created temporary ${postType} record: ${temporaryPostId}`);
      }
    } catch (dbError) {
      console.error("❌ Database error creating temporary post:", dbError);
      // Continue even if this fails, it's not critical
    }
    
    // Create a payment log entry
    let paymentLogId;
    try {
      const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
        .from("payment_logs")
        .insert({
          user_id: user.id,
          listing_id: temporaryPostId,
          plan_type: postType,
          payment_status: "pending",
          auto_renew_enabled: pricing.autoRenew,
          expires_at: expiresAt
        })
        .select("id")
        .single();
        
      if (paymentLogError) {
        console.error("❌ Failed to create payment log:", paymentLogError);
      } else if (paymentLog) {
        paymentLogId = paymentLog.id;
        console.log(`✅ Created payment log: ${paymentLogId}`);
      }
    } catch (dbError) {
      console.error("❌ Database error creating payment log:", dbError);
      // Continue even if this fails, it's not critical
    }

    // Build metadata for the checkout session
    const metadata = {
      user_id: user.id,
      post_type: postType,
      pricing_tier: pricing.tier,
      duration_months: pricing.durationMonths.toString(),
      expires_at: expiresAt,
      post_id: temporaryPostId || "",
      payment_log_id: paymentLogId || "",
      auto_renew: pricing.autoRenew ? "true" : "false"
    };
    
    // Extract base URL for success and cancel redirects
    const origin = req.headers.get("origin") || "https://emviapp.com";
    
    // Set success and cancel URLs, ensuring they include the payment log ID
    const successUrl = `${origin}/post-success?session_id={CHECKOUT_SESSION_ID}&payment_log_id=${paymentLogId || ""}`;
    const cancelUrl = `${origin}/post-canceled?payment_log_id=${paymentLogId || ""}`;
    
    let lineItems = [];
    let session;
    
    if (pricing.mode === 'subscription') {
      console.log("💰 Creating subscription-based checkout");
      
      // Create a price for this subscription (needed for recurring billing)
      // In a production system, you'd typically have predefined prices
      const price = await stripe.prices.create({
        unit_amount: pricing.amountInCents,
        currency: 'usd',
        recurring: { interval: 'year' },
        product_data: {
          name: getPlanName(),
          metadata: {
            tier: pricing.tier,
            post_type: postType
          }
        },
        metadata: {
          tier: pricing.tier,
          post_type: postType
        }
      });
      
      lineItems = [{
        price: price.id,
        quantity: 1,
      }];
      
      // Create a subscription-based checkout session
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        line_items: lineItems,
        metadata,
        success_url: successUrl,
        cancel_url: cancelUrl,
        subscription_data: {
          metadata,
        }
      });
    } else {
      console.log("💰 Creating one-time payment checkout");
      
      // Create one-time payment checkout
      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: getPlanName(),
            metadata: {
              tier: pricing.tier,
              post_type: postType
            }
          },
          unit_amount: pricing.amountInCents,
        },
        quantity: 1,
      }];
      
      // Create a payment-based checkout session
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'payment',
        line_items: lineItems,
        metadata,
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
    }
    
    console.log(`✅ Created Stripe checkout session: ${session.id}`);
    
    // Update the payment log with the Stripe session ID
    if (paymentLogId) {
      try {
        await supabaseAdmin
          .from("payment_logs")
          .update({ 
            stripe_payment_id: session.id,
            payment_status: "pending"
          })
          .eq("id", paymentLogId);
        
        console.log(`✅ Updated payment log with session ID: ${session.id}`);
      } catch (dbError) {
        console.error("❌ Failed to update payment log with session ID:", dbError);
        // Not critical, proceed
      }
    }
    
    console.log(`🚀 Returning checkout URL: ${session.url}`);
    
    return new Response(JSON.stringify({ 
      url: session.url,
      session_id: session.id,
      payment_log_id: paymentLogId,
      post_id: temporaryPostId
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Unhandled error in create-checkout:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
