
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey || '', {
      apiVersion: '2023-08-16',
    });

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret || '');
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      supabaseUrl || '',
      supabaseServiceKey || ''
    );

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Get metadata from the session
      const userId = session.metadata?.user_id;
      const pricingTier = session.metadata?.pricing_tier;
      const salonName = session.metadata?.salon_name;
      const featuredAddon = session.metadata?.featured_addon === 'true';
      
      console.log(`Processing successful salon payment for user ${userId}: ${pricingTier} tier, featured: ${featuredAddon}`);
      
      if (userId && pricingTier && salonName) {
        // Calculate expiration date (30 days for basic, 90 days for premium/gold, 365 days for annual)
        const expiresAt = new Date();
        if (pricingTier === 'annual') {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        } else if (pricingTier === 'premium' || pricingTier === 'gold') {
          expiresAt.setMonth(expiresAt.getMonth() + 3);
        } else {
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        }
        
        // Set featured expiration (if featured addon was purchased)
        const featuredUntil = featuredAddon ? new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)) : null; // 30 days
        
        // Create the salon listing in the salon_listings table
        const { data: salonData, error: salonError } = await supabase
          .from('salon_listings')
          .insert({
            user_id: userId,
            salon_name: salonName,
            description: session.metadata?.description || '',
            location: session.metadata?.location || '',
            address: session.metadata?.address || '',
            phone: session.metadata?.phone || '',
            email: session.metadata?.email || '',
            website: session.metadata?.website || '',
            instagram: session.metadata?.instagram || '',
            pricing_tier: pricingTier,
            status: 'active',
            expires_at: expiresAt.toISOString(),
            is_featured: featuredAddon,
            featured_until: featuredUntil?.toISOString(),
            contact_info: {
              phone: session.metadata?.phone || '',
              email: session.metadata?.email || '',
              owner_name: session.metadata?.owner_name || '',
            },
            services: JSON.parse(session.metadata?.services || '[]'),
            business_hours: JSON.parse(session.metadata?.business_hours || '{}'),
            specialties: JSON.parse(session.metadata?.specialties || '[]')
          })
          .select()
          .single();
          
        if (salonError) {
          console.error('Error creating salon listing:', salonError);
          return new Response(JSON.stringify({ error: 'Failed to create salon listing' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log('Salon listing created successfully:', salonData);
        
        // Log the payment
        const { error: paymentLogError } = await supabase
          .from('payment_logs')
          .insert({
            user_id: userId,
            plan_type: 'salon_listing',
            pricing_tier: pricingTier,
            listing_id: salonData.id,
            payment_status: 'success',
            stripe_payment_id: session.id,
            expires_at: expiresAt.toISOString()
          });
          
        if (paymentLogError) {
          console.error('Error logging payment:', paymentLogError);
        }
        
        console.log(`Salon listing created and payment logged for user ${userId}`);
      } else {
        console.error('Missing required metadata:', { userId, pricingTier, salonName });
        return new Response(JSON.stringify({ error: 'Missing required metadata' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
