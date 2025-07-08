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
    console.log("🚀 Job checkout function invoked");
    
    // Check environment variables first
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    console.log("🔧 Environment check:", {
      hasSupabaseUrl: !!supabaseUrl,
      hasAnonKey: !!supabaseAnonKey,
      hasServiceKey: !!supabaseServiceKey,
      hasStripeKey: !!stripeKey
    });

    if (!stripeKey) {
      console.error("❌ STRIPE_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ 
          error: "STRIPE_SECRET_KEY not configured. Please add your Stripe secret key to the Edge Function secrets." 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      console.error("❌ Missing Supabase configuration");
      return new Response(
        JSON.stringify({ 
          error: "Missing Supabase configuration" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request body" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const { jobData } = requestBody;
    console.log("📝 Job data received:", jobData);

    if (!jobData) {
      console.error("❌ No jobData provided");
      return new Response(
        JSON.stringify({ 
          error: "Missing jobData in request" 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Create Supabase client for auth
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;
    console.log("👤 User authenticated:", user.email);

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Create Supabase client with service role to create draft job
    const supabaseServiceClient = createClient(
      supabaseUrl,
      supabaseServiceKey,
      { auth: { persistSession: false } }
    );

    // Get selected plan details and pricing
    const selectedPlan = jobData.selectedPlan || 'premium';
    const selectedPrice = jobData.selectedPrice || 39.99;
    const selectedDuration = jobData.selectedDuration || 1;
    
    // Convert price to cents for Stripe
    const priceInCents = Math.round(selectedPrice * 100);
    
    console.log('💳 Creating checkout with plan details:', {
      selectedPlan,
      selectedPrice,
      selectedDuration,
      priceInCents
    });

    // Step 1: Create a draft job in the database first
    console.log('📝 Creating draft job first...');
    const draftJobPayload = {
      title: jobData.title,
      category: jobData.category,
      location: jobData.location || null,
      description: jobData.description,
      compensation_type: jobData.compensationType || null,
      compensation_details: jobData.compensationDetails || null,
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements.join("\n") : jobData.requirements || null,
      contact_info: {
        owner_name: jobData.contactName || "",
        phone: jobData.contactPhone || "",
        email: jobData.contactEmail || "",
        notes: jobData.contactNotes || ""
      },
      user_id: user.id,
      status: "draft", // Important: Create as draft first
      pricing_tier: selectedPlan,
      payment_status: "pending"
    };

    const { data: draftJobData, error: draftJobError } = await supabaseServiceClient
      .from("jobs")
      .insert([draftJobPayload])
      .select()
      .single();

    if (draftJobError) {
      console.error("❌ Error creating draft job:", draftJobError);
      throw new Error(`Failed to create draft job: ${draftJobError.message}`);
    }

    console.log("✅ Draft job created with ID:", draftJobData.id);
    const jobId = draftJobData.id;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Job Posting: ${jobData.title}`,
              description: `${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} job posting for ${jobData.category} position (${selectedDuration} month${selectedDuration > 1 ? 's' : ''})`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      metadata: {
        job_id: jobId, // Critical: This is what the webhook needs
        user_id: user.id,
        selected_plan: selectedPlan,
        selected_price: selectedPrice.toString(),
        selected_duration: selectedDuration.toString(),
        pricing_tier: 'paid'
      },
      success_url: `${req.headers.get("origin")}/jobs?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post-job?payment=canceled`,
    });

    console.log("✅ Stripe checkout session created:", session.id);

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Error creating job checkout:", error);
    console.error("❌ Error stack:", error instanceof Error ? error.stack : "No stack trace");
    
    // Provide more specific error messages
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Handle specific Stripe errors
      if (error.message.includes("Invalid API Key")) {
        errorMessage = "Invalid Stripe API key. Please check your STRIPE_SECRET_KEY configuration.";
      } else if (error.message.includes("network")) {
        errorMessage = "Network error connecting to Stripe. Please try again.";
      }
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.message : "No details available"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});