
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

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
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';
    
    console.log("🎯 Webhook received - PHASE 1 LISTEN-ONLY MODE");

    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    if (!stripeSecretKey || !webhookSecret) {
      console.error("❌ Missing Stripe configuration");
      return new Response(JSON.stringify({ error: 'Missing Stripe configuration' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("✅ Webhook signature verified successfully");
    } catch (err) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // PHASE 1: LISTEN-ONLY - Process checkout.session.completed events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      console.log("🎉 PAYMENT SUCCESS EVENT DETECTED");
      console.log("📊 Session ID:", session.id);
      console.log("💰 Amount Total:", session.amount_total);
      console.log("💳 Payment Status:", session.payment_status);
      console.log("📧 Customer Email:", session.customer_email);
      
      // Parse metadata for both job and salon payments
      const metadata = session.metadata;
      console.log("🏷️ Payment Metadata:", JSON.stringify(metadata, null, 2));
      
      // Identify payment type and extract relevant data
      if (metadata.pricing_tier || metadata.tier) {
        const paymentType = metadata.salon_name ? 'SALON' : 'JOB';
        const tier = metadata.pricing_tier || metadata.tier;
        
        console.log(`🎯 PAYMENT TYPE: ${paymentType}`);
        console.log(`🏆 TIER/PLAN: ${tier}`);
        
        if (paymentType === 'SALON') {
          console.log("🏢 SALON PAYMENT DETAILS:");
          console.log("  - Salon Name:", metadata.salon_name);
          console.log("  - Asking Price:", metadata.asking_price);
          console.log("  - Featured Addon:", metadata.featured_addon);
          console.log("  - Total Amount:", metadata.total_amount);
        } else if (paymentType === 'JOB') {
          console.log("💼 JOB PAYMENT DETAILS:");
          console.log("  - Job Title:", metadata.jobTitle);
          console.log("  - Duration Months:", metadata.durationMonths);
          console.log("  - User ID:", metadata.userId);
        }
        
        // PHASE 1 SAFETY: Log successful parsing but DO NOT create/update any listings
        console.log("✅ PHASE 1 SUCCESS: Payment data parsed and logged");
        console.log("🛡️ SAFETY MODE: No listings created or updated (waiting for Phase 2 approval)");
        
      } else {
        console.log("⚠️ No tier/pricing metadata found in payment");
      }
      
    } else {
      console.log(`ℹ️ Received event type: ${event.type} (not processing in Phase 1)`);
    }

    return new Response(JSON.stringify({ received: true, phase: "LISTEN_ONLY" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
