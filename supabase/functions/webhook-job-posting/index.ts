
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
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier;
      const jobTitle = session.metadata?.jobTitle;
      const durationMonths = parseInt(session.metadata?.durationMonths || '1', 10);
      
      console.log(`Processing successful job payment for user ${userId}: ${tier} tier, ${durationMonths} months`);
      
      if (userId && tier && jobTitle) {
        // Calculate expiration date
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + durationMonths);
        
        try {
          // Create the job listing in the jobs table
          const { data: jobData, error: jobError } = await supabase
            .from('jobs')
            .insert({
              user_id: userId,
              title: jobTitle,
              description: session.metadata?.description || '',
              location: session.metadata?.location || '',
              pricing_tier: tier,
              status: 'active',
              expires_at: expiresAt.toISOString(),
              contact_info: {
                phone: session.metadata?.phone || '',
                email: session.metadata?.email || '',
              },
              compensation_type: session.metadata?.compensationType || '',
              compensation_details: session.metadata?.compensationDetails || '',
              requirements: session.metadata?.requirements || ''
            })
            .select()
            .single();
            
          if (jobError) {
            console.error('Error creating job listing:', jobError);
            
            // Log the error for admin review
            await supabase
              .from('listing_validation_logs')
              .insert({
                listing_id: session.id,
                listing_type: 'job_creation_error',
                user_id: userId,
                error_reason: jobError.message,
                ip_address: 'webhook'
              });
              
            return new Response(JSON.stringify({ error: 'Failed to create job listing' }), {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          
          console.log('Job listing created successfully:', jobData);
          
          // Log the payment - THIS MUST HAPPEN AFTER JOB CREATION
          const { error: paymentLogError } = await supabase
            .from('payment_logs')
            .insert({
              user_id: userId,
              plan_type: 'job_posting',
              pricing_tier: tier,
              listing_id: jobData.id, // Use the actual job ID
              payment_status: 'success',
              stripe_payment_id: session.id,
              expires_at: expiresAt.toISOString()
            });
            
          if (paymentLogError) {
            console.error('Error logging payment:', paymentLogError);
            
            // Log the error but don't fail the whole process since job was created
            await supabase
              .from('listing_validation_logs')
              .insert({
                listing_id: jobData.id,
                listing_type: 'payment_log_error',
                user_id: userId,
                error_reason: paymentLogError.message,
                ip_address: 'webhook'
              });
          } else {
            console.log(`Job posting payment logged successfully for user ${userId}`);
          }
          
        } catch (error) {
          console.error('Unexpected error in job creation:', error);
          
          // Log the error for admin review
          await supabase
            .from('listing_validation_logs')
            .insert({
              listing_id: session.id,
              listing_type: 'job_webhook_error',
              user_id: userId,
              error_reason: error.message,
              ip_address: 'webhook'
            });
            
          return new Response(JSON.stringify({ error: 'Unexpected error in job creation' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        console.error('Missing required metadata:', { userId, tier, jobTitle });
        
        // Log the error for admin review
        await supabase
          .from('listing_validation_logs')
          .insert({
            listing_id: session.id,
            listing_type: 'job_metadata_error',
            error_reason: 'Missing required metadata: userId, tier, or jobTitle',
            ip_address: 'webhook'
          });
          
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
    
    // Log the error for admin review
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') || '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
      );
      
      await supabase
        .from('listing_validation_logs')
        .insert({
          listing_id: 'unknown',
          listing_type: 'job_webhook_fatal_error',
          error_reason: error.message,
          ip_address: 'webhook'
        });
    } catch (logError) {
      console.error('Failed to log webhook error:', logError);
    }
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
