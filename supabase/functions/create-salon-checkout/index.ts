import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    const { pricingOptions, formData } = await req.json();
    console.log('🔥 [SALON-CHECKOUT] Starting checkout with:', { pricingOptions, formDataKeys: Object.keys(formData || {}) });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the user from the authorization header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user?.email) {
      console.error('❌ [SALON-CHECKOUT] User authentication failed:', userError);
      throw new Error("User not authenticated");
    }

    console.log('✅ [SALON-CHECKOUT] User authenticated:', user.email);

    // Calculate amount based on pricing tier
    const getBaseAmount = (tier: string) => {
      switch (tier) {
        case 'basic': return 2999; // $29.99
        case 'gold': return 5999; // $59.99  
        case 'premium': return 9999; // $99.99
        case 'annual': return 29999; // $299.99
        default: return 2999;
      }
    };

    const baseAmount = getBaseAmount(pricingOptions.selectedPricingTier);
    let totalAmount = baseAmount;

    // Create line items
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Salon Listing - ${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} Plan`,
            description: `Salon for sale listing: ${formData?.salonName || 'Salon'}`,
          },
          unit_amount: baseAmount,
        },
        quantity: 1,
      },
    ];

    // Add featured add-on if selected
    if (pricingOptions.featuredAddon) {
      const featuredAmount = 1999; // $19.99
      totalAmount += featuredAmount;
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Featured Listing Add-on",
            description: "Premium placement for your salon listing",
          },
          unit_amount: featuredAmount,
        },
        quantity: 1,
      });
    }

    console.log('💰 [SALON-CHECKOUT] Total amount:', totalAmount, 'Line items:', lineItems.length);

    // Check if customer exists
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log('👤 [SALON-CHECKOUT] Existing customer found:', customerId);
    } else {
      console.log('👤 [SALON-CHECKOUT] Creating new customer for:', user.email);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/salon-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/sell-salon`,
      metadata: {
        user_id: user.id,
        pricing_tier: pricingOptions.selectedPricingTier,
        featured_addon: pricingOptions.featuredAddon ? "true" : "false",
        salon_name: formData?.salonName || "",
        contact_email: formData?.contactEmail || "",
        contact_phone: formData?.contactPhone || "",
        form_data: JSON.stringify(formData),
        total_amount: totalAmount.toString(),
      },
    });

    console.log('✅ [SALON-CHECKOUT] Checkout session created:', session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('❌ [SALON-CHECKOUT] Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to create checkout session" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});