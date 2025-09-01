import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase with service role
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } }
);

// Initialize Stripe
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

// Parse attribution cookie
async function parseAttributionCookie(cookieValue: string): Promise<{ affiliateId: string; timestamp: number } | null> {
  try {
    const [affiliateId, timestamp, signature] = cookieValue.split('|');
    const data = `${affiliateId}|${timestamp}`;
    
    // Verify HMAC signature
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(Deno.env.get('AFFILIATE_HMAC_SECRET') || 'default-secret'),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    const signatureBytes = new Uint8Array(signature.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
    const dataBytes = new TextEncoder().encode(data);
    
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, dataBytes);
    
    if (!isValid) return null;
    
    // Check if attribution is within 30-day window
    const attributionAge = Date.now() - parseInt(timestamp);
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    
    if (attributionAge > thirtyDaysMs) return null;
    
    return { affiliateId, timestamp: parseInt(timestamp) };
  } catch {
    return null;
  }
}

// Get user ID from Stripe customer
async function getUserFromCustomer(customerId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();
    
    return error ? null : data?.id;
  } catch {
    return null;
  }
}

// Record affiliate conversion
async function recordConversion(
  affiliateId: string,
  userId: string,
  eventType: string,
  revenueAmount: number,
  stripeSessionId: string,
  stripeCustomerId: string
) {
  console.log(`[AFFILIATE WEBHOOK] Recording conversion for affiliate ${affiliateId}`);

  // Get affiliate's commission rate
  const { data: affiliate } = await supabase
    .from('affiliate_partners')
    .select('commission_rate')
    .eq('id', affiliateId)
    .single();
  
  const commissionRate = affiliate?.commission_rate || 0.30;
  const commissionAmount = revenueAmount * commissionRate;

  // Check for duplicate conversion
  const { data: existing } = await supabase
    .from('affiliate_conversions')
    .select('id')
    .eq('stripe_session_id', stripeSessionId)
    .single();
  
  if (existing) {
    console.log('[AFFILIATE WEBHOOK] Conversion already recorded');
    return;
  }

  // Record conversion
  const { error: conversionError } = await supabase
    .from('affiliate_conversions')
    .insert({
      affiliate_id: affiliateId,
      user_id: userId,
      event_type: eventType,
      revenue_amount: revenueAmount,
      commission_amount: commissionAmount,
      stripe_session_id: stripeSessionId,
      stripe_customer_id: stripeCustomerId,
      metadata: { commission_rate: commissionRate }
    });

  if (conversionError) {
    console.error('[AFFILIATE WEBHOOK] Conversion recording error:', conversionError);
    return;
  }

  // Update affiliate totals
  const { error: updateError } = await supabase.rpc('increment', {
    table_name: 'affiliate_partners',
    row_id: affiliateId,
    increment_columns: {
      total_conversions: 1,
      total_commissions: commissionAmount
    }
  }).catch(() => {
    // Fallback to manual update if RPC doesn't exist
    return supabase
      .from('affiliate_partners')
      .update({
        total_conversions: supabase.raw('total_conversions + 1'),
        total_commissions: supabase.raw(`total_commissions + ${commissionAmount}`)
      } as any)
      .eq('id', affiliateId);
  });

  if (updateError) {
    console.error('[AFFILIATE WEBHOOK] Affiliate totals update error:', updateError);
  }

  console.log(`[AFFILIATE WEBHOOK] Conversion recorded: $${commissionAmount} commission`);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature', { status: 400, headers: corsHeaders });
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!webhookSecret) {
      console.error('[AFFILIATE WEBHOOK] No webhook secret configured');
      return new Response('Webhook secret not configured', { status: 500, headers: corsHeaders });
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('[AFFILIATE WEBHOOK] Signature verification failed:', err);
      return new Response('Invalid signature', { status: 400, headers: corsHeaders });
    }

    console.log(`[AFFILIATE WEBHOOK] Processing event: ${event.type}`);

    // Handle different event types
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      
      // Get attribution from session metadata (should be set by frontend)
      const attributionCookie = session.metadata?.af_attr;
      if (!attributionCookie) {
        console.log('[AFFILIATE WEBHOOK] No attribution found in session metadata');
        return new Response('ok', { headers: corsHeaders });
      }

      const attribution = await parseAttributionCookie(attributionCookie);
      if (!attribution) {
        console.log('[AFFILIATE WEBHOOK] Invalid attribution cookie');
        return new Response('ok', { headers: corsHeaders });
      }

      // Get user ID from customer
      const userId = await getUserFromCustomer(session.customer);
      if (!userId) {
        console.log('[AFFILIATE WEBHOOK] Could not find user for customer:', session.customer);
        return new Response('ok', { headers: corsHeaders });
      }

      // Determine event type and revenue
      const eventType = session.mode === 'subscription' ? 'first_payment' : 'first_payment';
      const revenueAmount = session.amount_total / 100; // Convert from cents

      await recordConversion(
        attribution.affiliateId,
        userId,
        eventType,
        revenueAmount,
        session.id,
        session.customer
      );

    } else if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as any;
      
      // Only process subscription renewals (not first payments)
      if (invoice.billing_reason === 'subscription_cycle') {
        // Find existing conversion for this customer
        const { data: existingConversion } = await supabase
          .from('affiliate_conversions')
          .select('affiliate_id')
          .eq('stripe_customer_id', invoice.customer)
          .eq('event_type', 'first_payment')
          .single();

        if (existingConversion) {
          const userId = await getUserFromCustomer(invoice.customer);
          if (userId) {
            await recordConversion(
              existingConversion.affiliate_id,
              userId,
              'recurring_payment',
              invoice.amount_paid / 100,
              invoice.id,
              invoice.customer
            );
          }
        }
      }
    }

    return new Response('ok', { headers: corsHeaders });

  } catch (error) {
    console.error('[AFFILIATE WEBHOOK] Unexpected error:', error);
    return new Response('Internal server error', { status: 500, headers: corsHeaders });
  }
});