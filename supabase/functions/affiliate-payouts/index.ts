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

// Calculate payout period (previous week: Monday to Sunday)
function getPayoutPeriod() {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate days to subtract to get to previous Monday
  const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1; // Handle Sunday (0)
  const previousMonday = new Date(now);
  previousMonday.setDate(now.getDate() - daysToSubtract - 7); // Go back one more week
  previousMonday.setHours(0, 0, 0, 0);
  
  const previousSunday = new Date(previousMonday);
  previousSunday.setDate(previousMonday.getDate() + 6);
  previousSunday.setHours(23, 59, 59, 999);
  
  return {
    start: previousMonday.toISOString().split('T')[0],
    end: previousSunday.toISOString().split('T')[0]
  };
}

// Process payouts for a specific affiliate
async function processAffiliatePayout(affiliateId: string, periodStart: string, periodEnd: string) {
  console.log(`[PAYOUTS] Processing payout for affiliate ${affiliateId}, period ${periodStart} to ${periodEnd}`);

  // Get affiliate info
  const { data: affiliate, error: affiliateError } = await supabase
    .from('affiliate_partners')
    .select('user_id, stripe_connect_account_id')
    .eq('id', affiliateId)
    .single();

  if (affiliateError || !affiliate) {
    console.error('[PAYOUTS] Affiliate not found:', affiliateError);
    return false;
  }

  if (!affiliate.stripe_connect_account_id) {
    console.log(`[PAYOUTS] Affiliate ${affiliateId} has no Stripe Connect account`);
    return false;
  }

  // Calculate total commission for the period
  const { data: conversions, error: conversionsError } = await supabase
    .from('affiliate_conversions')
    .select('commission_amount')
    .eq('affiliate_id', affiliateId)
    .gte('created_at', periodStart)
    .lte('created_at', periodEnd + 'T23:59:59.999Z');

  if (conversionsError) {
    console.error('[PAYOUTS] Error fetching conversions:', conversionsError);
    return false;
  }

  const totalCommission = conversions?.reduce((sum, conv) => sum + (conv.commission_amount || 0), 0) || 0;
  const minimumPayout = 50; // $50 minimum

  if (totalCommission < minimumPayout) {
    console.log(`[PAYOUTS] Commission $${totalCommission} below minimum $${minimumPayout}`);
    return false;
  }

  // Check if payout already exists for this period
  const { data: existingPayout } = await supabase
    .from('affiliate_payouts')
    .select('id')
    .eq('affiliate_id', affiliateId)
    .eq('period_start', periodStart)
    .eq('period_end', periodEnd)
    .single();

  if (existingPayout) {
    console.log(`[PAYOUTS] Payout already exists for affiliate ${affiliateId}, period ${periodStart}-${periodEnd}`);
    return false;
  }

  // Create payout record
  const { data: payoutRecord, error: payoutError } = await supabase
    .from('affiliate_payouts')
    .insert({
      affiliate_id: affiliateId,
      period_start: periodStart,
      period_end: periodEnd,
      commission_amount: totalCommission,
      status: 'processing'
    })
    .select()
    .single();

  if (payoutError || !payoutRecord) {
    console.error('[PAYOUTS] Error creating payout record:', payoutError);
    return false;
  }

  try {
    // Create Stripe payout
    const payout = await stripe.transfers.create({
      amount: Math.round(totalCommission * 100), // Convert to cents
      currency: 'usd',
      destination: affiliate.stripe_connect_account_id,
      description: `Affiliate commission for ${periodStart} to ${periodEnd}`,
      metadata: {
        affiliate_id: affiliateId,
        payout_id: payoutRecord.id,
        period_start: periodStart,
        period_end: periodEnd
      }
    });

    // Update payout record with Stripe payout ID
    const { error: updateError } = await supabase
      .from('affiliate_payouts')
      .update({
        status: 'paid',
        stripe_payout_id: payout.id,
        paid_at: new Date().toISOString()
      })
      .eq('id', payoutRecord.id);

    if (updateError) {
      console.error('[PAYOUTS] Error updating payout record:', updateError);
    }

    console.log(`[PAYOUTS] Successfully processed payout: $${totalCommission} to ${affiliate.stripe_connect_account_id}`);
    return true;

  } catch (stripeError: any) {
    console.error('[PAYOUTS] Stripe payout failed:', stripeError.message);

    // Update payout record with failure
    await supabase
      .from('affiliate_payouts')
      .update({
        status: 'failed',
        failure_reason: stripeError.message || 'Unknown Stripe error'
      })
      .eq('id', payoutRecord.id);

    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('[PAYOUTS] Starting scheduled payout process');

    // Get payout period (previous week)
    const period = getPayoutPeriod();
    console.log(`[PAYOUTS] Processing period: ${period.start} to ${period.end}`);

    // Get all approved affiliates with conversions in this period
    const { data: affiliatesWithConversions, error: affiliatesError } = await supabase
      .from('affiliate_conversions')
      .select('affiliate_id')
      .gte('created_at', period.start)
      .lte('created_at', period.end + 'T23:59:59.999Z');

    if (affiliatesError) {
      console.error('[PAYOUTS] Error fetching affiliates with conversions:', affiliatesError);
      return new Response('Error fetching affiliates', { status: 500, headers: corsHeaders });
    }

    // Get unique affiliate IDs
    const affiliateIds = [...new Set(affiliatesWithConversions?.map(conv => conv.affiliate_id) || [])];
    console.log(`[PAYOUTS] Found ${affiliateIds.length} affiliates with conversions in period`);

    let processedCount = 0;
    let successCount = 0;

    // Process each affiliate
    for (const affiliateId of affiliateIds) {
      processedCount++;
      const success = await processAffiliatePayout(affiliateId, period.start, period.end);
      if (success) successCount++;
      
      // Add small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`[PAYOUTS] Completed: ${successCount}/${processedCount} payouts processed successfully`);

    return new Response(JSON.stringify({
      success: true,
      period: period,
      processed: processedCount,
      successful: successCount,
      failed: processedCount - successCount
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[PAYOUTS] Unexpected error:', error);
    return new Response('Internal server error', { status: 500, headers: corsHeaders });
  }
});