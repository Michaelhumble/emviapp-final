import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to get the user ID from the auth token
const getUserIdFromToken = async (supabaseClient: any) => {
  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
  return user?.id;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Get the user ID from the auth token
    const userId = await getUserIdFromToken(supabase);

    // Parse request body
    const { postType, postDetails, pricingOptions } = await req.json();

    // Ensure postType is valid
    if (!['job', 'salon'].includes(postType)) {
      return new Response(JSON.stringify({ error: 'Invalid post type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create a customer if postId is not provided
    let customerId;
    if (postDetails?.customerId) {
      customerId = postDetails.customerId;
    } else {
      const customer = await stripe.customers.create({
        metadata: {
          user_id: userId,
          post_type: postType,
        },
      });
      customerId = customer.id;
    }

    // Calculate the expiry date
    let durationMonths = pricingOptions?.durationMonths || 1;
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths);

    // Create a post in the database
    const { data: postData, error: postError } = await supabase
      .from(postType === 'job' ? 'jobs' : 'salons')
      .insert([
        {
          ...postDetails,
          user_id: userId,
          status: 'pending',
          expires_at: expiryDate.toISOString(),
        },
      ])
      .select()
      .single();

    if (postError) {
      console.error("Post creation error:", postError);
      return new Response(JSON.stringify({ error: 'Failed to create post' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const postId = postData.id;
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Helper function to get the Stripe price ID based on the pricing tier and duration
    const getStripePriceId = (pricingTier: string, durationMonths: number): string => {
      // Map pricing tiers to their Stripe price IDs with proper duration
      // Each pricing tier should have its own unique price ID
      const priceMap: {[key: string]: {[key: number]: string}} = {
        'free': {
          1: 'price_free_monthly',   // Free tier doesn't need Stripe but included for completeness
          3: 'price_free_quarterly',
          6: 'price_free_biannual',
          12: 'price_free_annual'
        },
        'standard': {
          1: 'price_standard_monthly',  // $9.99/month
          3: 'price_standard_quarterly',
          6: 'price_standard_biannual',
          12: 'price_standard_annual'
        },
        'gold': {
          1: 'price_gold_monthly',     // $19.99/month
          3: 'price_gold_quarterly',
          6: 'price_gold_biannual',
          12: 'price_gold_annual'
        },
        'premium': {
          1: 'price_premium_monthly',  // $49.99/month
          3: 'price_premium_quarterly',
          6: 'price_premium_biannual',
          12: 'price_premium_annual'
        },
        'diamond': {
          12: 'price_diamond_annual'   // $1499.99/year (only available annually)
        }
      };

      // Default to the monthly price if the specific duration isn't found
      const tierPrices = priceMap[pricingOptions?.selectedPricingTier] || priceMap['standard'];
      return tierPrices[durationMonths] || tierPrices[1] || 'price_standard_monthly';
    };

    // Get the pricing details from the request
    const pricingTier = pricingOptions?.selectedPricingTier || 'standard';
    durationMonths = pricingOptions?.durationMonths || 1;
    const autoRenew = pricingOptions?.autoRenew === true;

    // Calculate the correct price based on tier and duration
    let priceId = getStripePriceId(pricingTier, durationMonths);

    // For development/testing, use test price IDs - replace these with your actual Stripe test price IDs
    // In production, you'd use the live Stripe price IDs
    const priceAmount = {
      'standard': 999,  // $9.99
      'gold': 1999,     // $19.99
      'premium': 4999,  // $49.99
      'diamond': 149999 // $1499.99
    }[pricingTier] || 999;

    // Create the checkout session with the correct price
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : postDetails?.email,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `EmviApp ${postType === 'job' ? 'Job' : 'Salon'} Post - ${pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)}`,
              description: `${durationMonths}-month ${pricingTier} posting`
            },
            unit_amount: priceAmount,
            recurring: autoRenew ? {
              interval: durationMonths <= 1 ? 'month' : durationMonths === 12 ? 'year' : 'month',
              interval_count: durationMonths <= 1 ? 1 : durationMonths === 12 ? 1 : durationMonths
            } : undefined
          },
          quantity: 1
        }
      ],
      mode: autoRenew ? 'subscription' : 'payment',
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-cancel`,
      metadata: {
        post_id: postId,
        post_type: postType,
        user_id: userId,
        expires_at: expiryDate.toISOString(),
        pricing_tier: pricingTier,
        duration_months: durationMonths.toString(),
        auto_renew: autoRenew.toString()
      }
    });

    // Create payment log
    const { data: paymentLog, error: paymentLogError } = await supabase
      .from('payment_logs')
      .insert([
        {
          user_id: userId,
          listing_id: postId,
          stripe_payment_id: session.payment_intent || session.id,
          payment_status: 'pending',
          plan_type: postType,
          pricing_tier: pricingTier,
          expires_at: expiryDate.toISOString(),
          auto_renew_enabled: autoRenew,
          amount_total: session.amount_total,
        },
      ])
      .select()
      .single();

    if (paymentLogError) {
      console.error("Payment log creation error:", paymentLogError);
      return new Response(JSON.stringify({ error: 'Failed to create payment log' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
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
