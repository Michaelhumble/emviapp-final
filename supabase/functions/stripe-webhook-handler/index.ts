
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
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';
    
    console.log("🎯 Webhook received - LISTING CREATION MODE");

    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error("❌ Missing required configuration");
      return new Response(JSON.stringify({ error: 'Missing configuration' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Initialize Supabase with service role key for database writes
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Process checkout.session.completed events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      console.log("🎉 PAYMENT SUCCESS EVENT DETECTED");
      console.log("📊 Session ID:", session.id);
      console.log("💰 Amount Total:", session.amount_total);
      console.log("💳 Payment Status:", session.payment_status);
      console.log("📧 Customer Email:", session.customer_email);
      
      // Only proceed if payment is fully completed
      if (session.payment_status !== 'paid') {
        console.log("⚠️ Payment not completed, skipping listing creation");
        return new Response(JSON.stringify({ received: true, skipped: "payment_not_completed" }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Parse metadata for both job and salon payments
      const metadata = session.metadata;
      console.log("🏷️ Payment Metadata:", JSON.stringify(metadata, null, 2));
      
      // Check if listing already exists for this session to prevent duplicates
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('id')
        .eq('stripe_session_id', session.id)
        .single();
        
      if (existingPayment) {
        console.log("⚠️ Listing already created for this session, skipping");
        return new Response(JSON.stringify({ received: true, skipped: "already_processed" }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Identify payment type and extract relevant data
      if (metadata.pricing_tier || metadata.tier) {
        const paymentType = metadata.salon_name ? 'SALON' : 'JOB';
        const tier = metadata.pricing_tier || metadata.tier;
        const userId = metadata.userId;
        
        if (!userId) {
          console.error("❌ No user ID found in metadata");
          return new Response(JSON.stringify({ error: 'No user ID in metadata' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.log(`🎯 PAYMENT TYPE: ${paymentType}`);
        console.log(`🏆 TIER/PLAN: ${tier}`);
        console.log(`👤 USER ID: ${userId}`);
        
        try {
          let listingResult;
          
          if (paymentType === 'SALON') {
            console.log("🏢 CREATING SALON LISTING:");
            console.log("  - Salon Name:", metadata.salon_name);
            console.log("  - Asking Price:", metadata.asking_price);
            console.log("  - Featured Addon:", metadata.featured_addon);
            console.log("  - Total Amount:", metadata.total_amount);
            
            // Create salon listing
            const salonData = {
              user_id: userId,
              salon_name: metadata.salon_name || 'New Salon',
              description: metadata.description || '',
              location: metadata.location || '',
              pricing_tier: tier,
              status: 'active',
              contact_info: {
                owner_name: metadata.owner_name || '',
                phone: metadata.phone || '',
                email: session.customer_email || '',
                asking_price: metadata.asking_price || ''
              },
              services: JSON.parse(metadata.services || '[]'),
              specialties: metadata.specialties ? metadata.specialties.split(',') : [],
              is_featured: metadata.featured_addon === 'true',
              featured_until: metadata.featured_addon === 'true' ? 
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null
            };
            
            const { data: salonListing, error: salonError } = await supabase
              .from('salon_listings')
              .insert(salonData)
              .select()
              .single();
              
            if (salonError) {
              console.error("❌ Error creating salon listing:", salonError);
              throw salonError;
            }
            
            listingResult = salonListing;
            console.log("✅ SALON LISTING CREATED:", listingResult.id);
            
          } else if (paymentType === 'JOB') {
            console.log("💼 CREATING JOB LISTING:");
            console.log("  - Job Title:", metadata.jobTitle);
            console.log("  - Duration Months:", metadata.durationMonths);
            
            // Create job listing
            const jobData = {
              user_id: userId,
              title: metadata.jobTitle || 'New Job Posting',
              description: metadata.description || '',
              location: metadata.location || '',
              pricing_tier: tier,
              status: 'active',
              contact_info: {
                owner_name: metadata.owner_name || '',
                phone: metadata.phone || '',
                email: session.customer_email || ''
              },
              compensation_type: metadata.compensation_type || '',
              compensation_details: metadata.compensation_details || '',
              requirements: metadata.requirements || '',
              expires_at: new Date(Date.now() + (parseInt(metadata.durationMonths || '1') * 30 * 24 * 60 * 60 * 1000)).toISOString()
            };
            
            const { data: jobListing, error: jobError } = await supabase
              .from('jobs')
              .insert(jobData)
              .select()
              .single();
              
            if (jobError) {
              console.error("❌ Error creating job listing:", jobError);
              throw jobError;
            }
            
            listingResult = jobListing;
            console.log("✅ JOB LISTING CREATED:", listingResult.id);
          }
          
          // Record the payment
          const { error: paymentError } = await supabase
            .from('payments')
            .insert({
              user_id: userId,
              stripe_session_id: session.id,
              amount: session.amount_total / 100, // Convert from cents
              payment_type: paymentType.toLowerCase(),
              status: 'completed',
              metadata: metadata
            });
            
          if (paymentError) {
            console.error("❌ Error recording payment:", paymentError);
            // Don't throw here as listing was created successfully
          }
          
          console.log("✅ LISTING CREATION SUCCESS");
          console.log("🎯 Listing ID:", listingResult.id);
          console.log("🏆 Tier:", tier);
          console.log("👤 User:", userId);
          console.log("💳 Payment Status: COMPLETED");
          
        } catch (error) {
          console.error("💥 Error creating listing:", error);
          return new Response(JSON.stringify({ error: 'Failed to create listing', details: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
      } else {
        console.log("⚠️ No tier/pricing metadata found in payment");
      }
      
    } else {
      console.log(`ℹ️ Received event type: ${event.type} (not processing)`);
    }

    return new Response(JSON.stringify({ received: true, status: "processed" }), {
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
