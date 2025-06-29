
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tier, finalPrice, durationMonths, jobData } = await req.json();
    console.log('💰 Creating paid job checkout:', { tier, finalPrice, jobData: jobData?.title });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: { persistSession: false }
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    console.log('✅ User authenticated:', user.id);

    // First, create the job record in draft status
    const jobRecord = {
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
      status: 'draft', // Will be activated after payment
      user_id: user.id,
      expires_at: new Date(Date.now() + (durationMonths * 30 * 24 * 60 * 60 * 1000)).toISOString()
    };

    console.log('📝 Creating draft job record');

    const { data: insertedJob, error: insertError } = await supabaseClient
      .from('jobs')
      .insert([jobRecord])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Database insert error:', insertError);
      throw new Error(`Failed to create job: ${insertError.message}`);
    }

    console.log('✅ Draft job created:', insertedJob.id);

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session
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
            unit_amount: Math.round(finalPrice * 100), // Convert to cents
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
        post_id: insertedJob.id, // Link to the job record
        post_type: 'job',
        pricing_tier: tier,
        expires_at: jobRecord.expires_at
      },
    });

    // Log the payment attempt
    await supabaseClient
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: insertedJob.id,
        plan_type: 'job',
        pricing_tier: tier,
        payment_status: 'pending',
        stripe_payment_id: session.id,
        expires_at: jobRecord.expires_at
      });

    console.log('✅ Stripe session created:', session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
