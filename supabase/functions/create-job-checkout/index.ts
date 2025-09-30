import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

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

    // Parse and validate request body
    const BodySchema = z.object({
      jobData: z.object({
        title: z.string().min(1).max(200),
        category: z.string().max(100),
        location: z.string().max(200).optional().nullable(),
        description: z.string().max(5000),
        vietnamese_title: z.string().max(200).optional().nullable(),
        vietnamese_description: z.string().max(5000).optional().nullable(),
        compensationType: z.string().max(100).optional().nullable(),
        compensationDetails: z.string().max(500).optional().nullable(),
        compensation_details: z.string().max(500).optional().nullable(),
        requirements: z.union([z.string(), z.array(z.string())]).optional().nullable(),
        contactName: z.string().max(100).optional(),
        contactPhone: z.string().max(30).optional(),
        contactEmail: z.string().email().max(254).optional(),
        contactNotes: z.string().max(500).optional(),
        salonName: z.string().max(200).optional(),
        selectedPlan: z.string().max(50).optional(),
        selectedPrice: z.number().optional(),
        selectedDuration: z.number().int().optional(),
        image_url: z.string().url().max(2048).optional().nullable(),
        image_urls: z.array(z.string().url().max(2048)).optional().nullable(),
        photos: z.array(z.string().url().max(2048)).optional().nullable(),
        contact_info: z.any().optional(),
        metadata: z.any().optional()
      }),
      tier: z.string().max(50).optional(),
      finalPrice: z.number().min(0).optional(),
      durationMonths: z.number().int().min(1).max(24).optional()
    });

    const raw = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      console.error("❌ Request validation failed:", parsed.error);
      return new Response(
        JSON.stringify({ error: "invalid_request" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const requestBody = parsed.data;
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

    // Get selected plan details and pricing from request body
    console.log('🔍 [PRICE-DEBUG] Request body structure:', {
      tier: requestBody.tier,
      finalPrice: requestBody.finalPrice,
      durationMonths: requestBody.durationMonths,
      jobDataKeys: Object.keys(jobData || {})
    });
    
    const selectedPlan = requestBody.tier || jobData.selectedPlan || 'premium';
    const selectedPrice = requestBody.finalPrice || jobData.selectedPrice || 39.99;
    const selectedDuration = requestBody.durationMonths || jobData.selectedDuration || 1;
    
    // Block free tier from checkout
    const tier = (requestBody?.tier ?? '').toString().toLowerCase();
    if (tier === 'free' || selectedPlan?.toLowerCase() === 'free') {
      return new Response(JSON.stringify({ error: 'FREE_TIER_NOT_CHECKOUTABLE' }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    
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
    console.log('🔍 [JOB-PAYLOAD-DEBUG] Job data received for processing:', {
      title: jobData.title,
      vietnamese_title: jobData.vietnamese_title,
      contact_info: jobData.contact_info,
      image_url: jobData.image_url,
      image_urls: jobData.image_urls,
      photos: jobData.photos
    });
    
    // CRITICAL FIX: Properly store photos in multiple database fields
    const photoUrls = jobData.image_urls || jobData.photos || [];
    const validPhotoUrls = Array.isArray(photoUrls) ? photoUrls.filter(url => url && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')) : [];
    
    console.log('🔍 [EDGE-FUNCTION-PHOTO-DEBUG] Photo URLs from frontend:', {
      'jobData.image_urls': jobData.image_urls,
      'jobData.photos': jobData.photos,
      'jobData.image_url': jobData.image_url,
      'jobData.metadata.photos': jobData.metadata?.photos,
      'jobData.metadata.image_urls': jobData.metadata?.image_urls,
      'validPhotoUrls': validPhotoUrls,
      'photoUrlsCount': validPhotoUrls.length
    });

    const draftJobPayload = {
      title: jobData.title,
      category: jobData.category,
      location: jobData.location || null,
      description: jobData.description,
      // FIXED: Add Vietnamese fields for nail jobs
      vietnamese_title: jobData.vietnamese_title || null,
      vietnamese_description: jobData.vietnamese_description || null,
      // CRITICAL FIX: Store photos in ALL database fields immediately
      image_url: validPhotoUrls.length > 0 ? validPhotoUrls[0] : null,
      image_urls: validPhotoUrls.length > 0 ? validPhotoUrls : null,
      photos: validPhotoUrls.length > 0 ? validPhotoUrls : null,
      // CRITICAL: Add metadata field to store additional photo URLs and contact info
      metadata: {
        image_urls: validPhotoUrls,
        photos: validPhotoUrls,
        contact_info: jobData.contact_info || {
          owner_name: jobData.contactName || "",
          phone: jobData.contactPhone || "",
          email: jobData.contactEmail || "",
          notes: jobData.contactNotes || "",
          salon_name: jobData.salonName || ""
        }
      },
      compensation_type: jobData.compensationType || null,
      compensation_details: jobData.compensationDetails || jobData.compensation_details || null,
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements.join("\n") : jobData.requirements || null,
      contact_info: jobData.contact_info || {
        owner_name: jobData.contactName || "",
        phone: jobData.contactPhone || "",
        email: jobData.contactEmail || "",
        notes: jobData.contactNotes || "",
        salon_name: jobData.salonName || ""
      },
      user_id: user.id,
      status: "draft", // Important: Create as draft first
      pricing_tier: selectedPlan,
      payment_status: "pending"
    };
    
    console.log('🔍 [EDGE-FUNCTION-JOB-PAYLOAD-DEBUG] Final job payload being saved to database:', {
      ...draftJobPayload,
      photoDebug: {
        image_url: draftJobPayload.image_url,
        image_urls: draftJobPayload.image_urls,
        photos: draftJobPayload.photos,
        'metadata.photos': draftJobPayload.metadata?.photos,
        'metadata.image_urls': draftJobPayload.metadata?.image_urls,
        'metadata.contact_info': draftJobPayload.metadata?.contact_info
      }
    });

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
      success_url: `${req.headers.get("origin")}/nails?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/nails?payment=canceled`,
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