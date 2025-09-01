import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase with service role for database operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  { auth: { persistSession: false } }
);

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AFFILIATE-PAYOUTS-CRON] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting weekly affiliate payouts batch job");
    
    const isDryRun = Deno.env.get('DRY_RUN') === 'true';
    logStep("Dry run mode", { enabled: isDryRun });

    // Get current date for payout period calculation
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    logStep("Payout period calculated", { 
      weekStart: weekStart.toISOString(), 
      weekEnd: weekEnd.toISOString() 
    });

    // Find affiliates eligible for payouts (minimum $50 threshold)
    const { data: eligibleAffiliates, error: affiliatesError } = await supabase
      .from('affiliate_partners')
      .select(`
        id,
        slug,
        user_id,
        total_commissions,
        stripe_connect_account_id
      `)
      .eq('status', 'approved')
      .gte('total_commissions', 50)
      .not('stripe_connect_account_id', 'is', null);

    if (affiliatesError) {
      throw new Error(`Failed to fetch eligible affiliates: ${affiliatesError.message}`);
    }

    logStep("Eligible affiliates found", { count: eligibleAffiliates?.length || 0 });

    const payoutSummary = {
      totalAffiliates: eligibleAffiliates?.length || 0,
      totalAmount: 0,
      processedPayouts: [],
      errors: []
    };

    // Process each affiliate
    for (const affiliate of eligibleAffiliates || []) {
      try {
        // Check if payout already exists for this period
        const { data: existingPayout } = await supabase
          .from('affiliate_payouts')
          .select('id')
          .eq('affiliate_id', affiliate.id)
          .eq('period_start', weekStart.toISOString().split('T')[0])
          .single();

        if (existingPayout) {
          logStep(`Payout already exists for affiliate ${affiliate.slug}`);
          continue;
        }

        // Calculate payout amount (could be more sophisticated)
        const payoutAmount = Math.min(affiliate.total_commissions, 1000); // Cap at $1000 for safety

        if (isDryRun) {
          logStep(`[DRY RUN] Would create payout`, {
            affiliate: affiliate.slug,
            amount: payoutAmount,
            stripeAccount: affiliate.stripe_connect_account_id
          });
          
          payoutSummary.processedPayouts.push({
            affiliateId: affiliate.id,
            amount: payoutAmount,
            status: 'dry_run'
          });
        } else {
          // Create payout record
          const { error: payoutError } = await supabase
            .from('affiliate_payouts')
            .insert({
              affiliate_id: affiliate.id,
              period_start: weekStart.toISOString().split('T')[0],
              period_end: weekEnd.toISOString().split('T')[0],
              commission_amount: payoutAmount,
              status: 'pending'
            });

          if (payoutError) {
            throw new Error(`Failed to create payout record: ${payoutError.message}`);
          }

          payoutSummary.processedPayouts.push({
            affiliateId: affiliate.id,
            amount: payoutAmount,
            status: 'pending'
          });

          logStep(`Payout created`, {
            affiliate: affiliate.slug,
            amount: payoutAmount
          });
        }

        payoutSummary.totalAmount += payoutAmount;

      } catch (error) {
        const errorMsg = `Error processing affiliate ${affiliate.slug}: ${error.message}`;
        logStep("ERROR", { error: errorMsg });
        payoutSummary.errors.push(errorMsg);
      }
    }

    // Send Slack notification if webhook URL is configured
    const slackWebhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    if (slackWebhookUrl && !isDryRun) {
      try {
        await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🤑 Weekly Affiliate Payouts Processed`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Weekly Affiliate Payouts Summary*\n• Affiliates: ${payoutSummary.totalAffiliates}\n• Total Amount: $${payoutSummary.totalAmount.toFixed(2)}\n• Errors: ${payoutSummary.errors.length}`
                }
              }
            ]
          })
        });
        logStep("Slack notification sent");
      } catch (error) {
        logStep("Failed to send Slack notification", { error: error.message });
      }
    }

    logStep("Payouts batch job completed", payoutSummary);

    return new Response(JSON.stringify({
      ok: true,
      message: isDryRun ? 'Dry run completed successfully' : 'Payouts processed successfully',
      summary: payoutSummary
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("CRITICAL ERROR", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      ok: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});