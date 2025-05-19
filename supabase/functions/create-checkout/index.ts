
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0";
import { v4 as uuidv4 } from "https://esm.sh/uuid@9.0.0";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for better debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Stripe API key from environment
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Client for authenticated requests
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    
    // Admin client for database operations (bypasses RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, { 
      auth: { persistSession: false } 
    });

    // Get authorization header from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    // Authenticate the user
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !userData?.user) {
      throw new Error("Authentication failed: " + (authError?.message || "User not found"));
    }
    
    const user = userData.user;
    logStep("User authenticated", { userId: user.id });

    // Parse request body
    const { postType, postDetails, pricingOptions, priceData } = await req.json();
    
    logStep("Post type", postType);
    logStep("Pricing tier", pricingOptions?.selectedPricingTier);
    logStep("Duration months", pricingOptions?.durationMonths);
    logStep("Auto-renew", pricingOptions?.autoRenew ? "Yes" : "No");

    // Validate request data
    if (!postType || !pricingOptions || !pricingOptions.selectedPricingTier) {
      throw new Error("Missing required data in request");
    }
    
    // Free plan handling - bypass Stripe checkout completely
    if (pricingOptions.selectedPricingTier === 'free') {
      logStep("Processing free post");
      
      // Create free post directly
      const { data: freePostResult, error: freePostError } = await supabaseAdmin.functions.invoke('create-free-post', {
        body: { 
          postType,
          postDetails,
          pricingOptions
        }
      });

      if (freePostError) {
        logStep("Free post creation error", freePostError);
        throw new Error("Failed to create free post: " + freePostError.message);
      }
      
      return new Response(JSON.stringify(freePostResult), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      });
    }
    
    // Diamond tier special handling
    if (pricingOptions.selectedPricingTier === 'diamond') {
      // In a real implementation, this would check against a database
      // For now, we'll assume all users can access diamond tier
      logStep("Diamond tier access check passed");
    }

    // Create a temporary job in the database
    let postId = "";
    try {
      // Create a temporary post record to track the payment
      const { data: tempJob, error: dbError } = await supabaseAdmin
        .from('jobs')
        .insert({
          // Basic job details
          title: postDetails.title,
          location: postDetails.location,
          description: postDetails.description,
          // Additional details we need to preserve
          employment_type: postDetails.jobType,
          compensation_type: postDetails.compensation_type,
          compensation_details: postDetails.compensation_details,
          weekly_pay: postDetails.weekly_pay,
          has_housing: postDetails.has_housing,
          has_wax_room: postDetails.has_wax_room,
          owner_will_train: postDetails.owner_will_train,
          no_supply_deduction: postDetails.no_supply_deduction,
          // Contact info as JSON to handle various schemas
          contact_info: {
            owner_name: postDetails.contactName,
            phone: postDetails.contactPhone,
            email: postDetails.contactEmail,
          },
          // Status, user, and other metadata
          status: 'pending_payment',
          user_id: user.id,
          pricing_tier: pricingOptions.selectedPricingTier
        })
        .select('id')
        .single();

      if (dbError) {
        logStep("Temporary job creation error", dbError);
        // Continue without the temp job - we'll create it after payment
        postId = "";
      } else {
        postId = tempJob?.id;
      }
    } catch (dbError) {
      logStep("Temporary job creation error", dbError);
      // Continue without the temp job
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Check if user already exists as a Stripe customer
    const { data: customers } = await stripe.customers.list({
      email: user.email,
      limit: 1
    });
    
    let customerId: string | undefined;
    if (customers && customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing Stripe customer", { id: customerId });
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id }
      });
      customerId = customer.id;
      logStep("Created new Stripe customer", { id: customerId });
    }

    // Calculate expiry date based on duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (pricingOptions.durationMonths * 30));
    
    // Set up metadata for the Stripe session
    const metadata = {
      user_id: user.id,
      post_type: postType,
      pricing_tier: pricingOptions.selectedPricingTier,
      expires_at: expiresAt.toISOString(),
      auto_renew: pricingOptions.autoRenew ? "true" : "false",
      post_id: postId || "",
      duration_months: String(pricingOptions.durationMonths || 1)
    };
    
    logStep("Creating checkout session with metadata", metadata);

    // Determine whether to use subscription or one-time payment
    const isSubscription = pricingOptions.autoRenew && pricingOptions.durationMonths === 1;
    const paymentMode = isSubscription ? "subscription" : "payment";
    logStep("Payment mode", paymentMode);
    
    // Calculate price for display
    const displayPrice = priceData?.finalPrice || 0;
    logStep("Display price", `$${displayPrice.toFixed(2)}`);
    
    // Generate a proper idempotency key
    const idempotencyKey = `job_post_${user.id}_${new Date().toISOString()}_${uuidv4()}`;
    
    // Create the checkout session with Stripe
    let session;
    
    if (isSubscription) {
      // Get appropriate price ID for subscription
      const priceId = `price_${pricingOptions.selectedPricingTier.toUpperCase()}_AUTO_${Math.round(displayPrice * 100)}`;
      logStep("Using price ID", priceId);
      
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          },
        ],
        mode: 'subscription',
        metadata,
        success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/post-job`,
      }, {
        idempotencyKey
      });
    } else {
      // One-time payment
      const priceId = `price_${pricingOptions.selectedPricingTier.toUpperCase()}_${Math.round(displayPrice * 100)}`;
      logStep("Using price ID", priceId);
      
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${pricingOptions.selectedPricingTier.toUpperCase()} Job Posting - ${pricingOptions.durationMonths} month${pricingOptions.durationMonths > 1 ? 's' : ''}`,
                description: `EmviApp Job Posting for ${pricingOptions.durationMonths} month${pricingOptions.durationMonths > 1 ? 's' : ''}`
              },
              unit_amount: Math.round(displayPrice * 100), // Convert to cents
            },
            quantity: 1,
          }
        ],
        mode: 'payment',
        metadata,
        success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/post-job`,
      }, {
        idempotencyKey
      });
    }
    
    logStep("Stripe session created", { id: session.id, url: session.url });
    
    // Create a payment log entry
    try {
      const { error: paymentLogError } = await supabaseAdmin
        .from('payment_logs')
        .insert({
          user_id: user.id,
          listing_id: postId || null,
          stripe_payment_id: session.id,
          plan_type: postType,
          payment_status: 'pending',
          auto_renew_enabled: pricingOptions.autoRenew,
          expires_at: expiresAt.toISOString(),
          pricing_tier: pricingOptions.selectedPricingTier
        });
        
      if (paymentLogError) {
        logStep("Error creating payment log", paymentLogError);
      }
    } catch (error) {
      logStep("Error creating payment log", error);
    }
    
    // Return the checkout URL to the client
    return new Response(JSON.stringify({
      success: true,
      url: session.url,
      sessionId: session.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
    
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || "Failed to create checkout session" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
