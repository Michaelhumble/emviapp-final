
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('💰 [CHECKOUT] ===== JOB CHECKOUT FUNCTION CALLED =====');
  console.log('💰 [CHECKOUT] Request method:', req.method);
  console.log('💰 [CHECKOUT] Request headers:', Object.fromEntries(req.headers.entries()));
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Environment variables check
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    console.log('💰 [CHECKOUT] Environment check:');
    console.log('💰 [CHECKOUT] SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING');
    console.log('💰 [CHECKOUT] SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'MISSING');
    console.log('💰 [CHECKOUT] SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'SET' : 'MISSING');
    console.log('💰 [CHECKOUT] STRIPE_SECRET_KEY:', stripeSecretKey ? 'SET' : 'MISSING');

    const requestBody = await req.json();
    console.log('💰 [CHECKOUT] Raw request body:', JSON.stringify(requestBody, null, 2));

    const { tier, finalPrice, durationMonths, jobData, jobId } = requestBody;
    console.log('💰 [CHECKOUT] Extracted parameters:', { tier, finalPrice, durationMonths, jobId });
    console.log('💰 [CHECKOUT] Job data:', JSON.stringify(jobData, null, 2));

    // Initialize Stripe
    console.log('💰 [CHECKOUT] Initializing Stripe...');
    const stripe = new Stripe(stripeSecretKey || "", {
      apiVersion: "2023-10-16",
    });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    console.log('💰 [CHECKOUT] Authorization header:', authHeader ? 'PRESENT' : 'MISSING');
    
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    console.log('💰 [CHECKOUT] Creating Supabase client for user authentication...');
    const supabaseClient = createClient(
      supabaseUrl ?? "",
      supabaseAnonKey ?? "",
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    console.log('💰 [CHECKOUT] Getting user from auth...');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError) {
      console.error('❌ [CHECKOUT] User authentication error:', userError);
      throw new Error("User authentication failed: " + userError.message);
    }
    
    if (!user?.email) {
      console.error('❌ [CHECKOUT] No user or email found');
      throw new Error("User not authenticated or email not available");
    }

    console.log('✅ [CHECKOUT] User authenticated:', {
      id: user.id,
      email: user.email
    });

    // Create draft job FIRST
    console.log('💰 [CHECKOUT] Creating service role client for database operations...');
    const supabaseService = createClient(
      supabaseUrl ?? "",
      supabaseServiceKey ?? "",
      { auth: { persistSession: false } }
    );

    // Only create draft job if jobId is not provided (new job flow)
    let draftJobId = jobId;
    
    if (!jobId) {
      console.log('💰 [CHECKOUT] No jobId provided, creating draft job...');
      
      const draftJobRecord = {
        title: jobData.title || 'Job Title',
        description: jobData.description || '',
        category: jobData.category || 'Other',
        location: jobData.location || '',
        compensation_type: jobData.compensation_type || jobData.employment_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: Array.isArray(jobData.requirements) 
          ? jobData.requirements.join('\n') 
          : (jobData.requirements || ''),
        contact_info: jobData.contact_info || {},
        pricing_tier: tier,
        status: 'draft',
        user_id: user.id,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      console.log('💰 [CHECKOUT] Draft job record:', JSON.stringify(draftJobRecord, null, 2));

      const { data: draftJob, error: draftError } = await supabaseService
        .from('jobs')
        .insert([draftJobRecord])
        .select()
        .single();

      if (draftError) {
        console.error('❌ [CHECKOUT] Draft job creation error:', {
          message: draftError.message,
          details: draftError.details,
          hint: draftError.hint,
          code: draftError.code
        });
        throw new Error(`Failed to create draft job: ${draftError.message}`);
      }

      if (!draftJob) {
        console.error('❌ [CHECKOUT] No draft job returned from insert');
        throw new Error('Failed to create draft job: No job returned');
      }

      draftJobId = draftJob.id;
      console.log('✅ [CHECKOUT] Draft job created successfully:', {
        id: draftJob.id,
        title: draftJob.title,
        status: draftJob.status,
        pricing_tier: draftJob.pricing_tier
      });
    } else {
      console.log('💰 [CHECKOUT] Using existing jobId:', jobId);
    }

    // Check if customer exists
    console.log('💰 [CHECKOUT] Checking for existing Stripe customer...');
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log('💰 [CHECKOUT] Found existing customer:', customerId);
    } else {
      console.log('💰 [CHECKOUT] No existing customer found');
    }

    // Create checkout session with comprehensive metadata
    console.log('💰 [CHECKOUT] Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Job Posting`,
              description: `${durationMonths} month job posting - ${jobData?.title || 'Job Posting'}`
            },
            unit_amount: Math.round(finalPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post-canceled`,
      metadata: {
        tier,
        durationMonths: durationMonths.toString(),
        jobTitle: jobData?.title || '',
        userId: user.id,
        job_id: draftJobId,
        post_id: draftJobId,
        post_type: 'job',
        pricing_tier: tier
      },
    });

    console.log('✅ [CHECKOUT] Stripe session created:', {
      id: session.id,
      url: session.url ? 'SET' : 'MISSING',
      metadata: session.metadata
    });

    // Log the payment attempt
    console.log('💰 [CHECKOUT] Creating payment log entry...');
    const { error: logError } = await supabaseService
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: draftJobId,
        plan_type: 'job',
        pricing_tier: tier,
        payment_status: 'pending',
        stripe_payment_id: session.id,
        expires_at: new Date(Date.now() + (durationMonths * 30 * 24 * 60 * 60 * 1000)).toISOString()
      });

    if (logError) {
      console.error('❌ [CHECKOUT] Error logging payment:', logError);
    } else {
      console.log('✅ [CHECKOUT] Payment logged successfully');
    }

    const response = { url: session.url };
    console.log('🎉 [CHECKOUT] Returning response:', response);
    console.log('💰 [CHECKOUT] ===== JOB CHECKOUT FUNCTION COMPLETED SUCCESSFULLY =====');

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("💥 [CHECKOUT] CRITICAL ERROR:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
