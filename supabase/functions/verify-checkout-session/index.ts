
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Initialize Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if payment is complete
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        error: "Payment not completed", 
        status: session.payment_status 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get metadata from the session
    const metadata = session.metadata || {};
    const draftListingId = metadata.draft_listing_id;
    
    if (!draftListingId) {
      return new Response(JSON.stringify({ error: "No draft listing ID found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log('Payment verified, publishing listing:', draftListingId);

    // CRITICAL: ONLY BACKEND CAN SET isLive = true
    // This is the ONLY place where a listing becomes live
    const { data: publishedListing, error: publishError } = await supabaseAdmin
      .from('salon_listings')
      .update({
        is_live: true, // ONLY BACKEND CAN SET THIS
        status: 'active',
        published_at: new Date().toISOString(),
        stripe_session_id: sessionId,
        payment_verified: true
      })
      .eq('id', draftListingId)
      .eq('is_live', false) // Extra safety: only update if still draft
      .select()
      .single();

    if (publishError) {
      console.error('Error publishing listing:', publishError);
      return new Response(JSON.stringify({ error: "Failed to publish listing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log('Listing successfully published:', publishedListing.id);

    // Log the payment and publication
    await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: metadata.user_id,
        stripe_session_id: sessionId,
        listing_id: draftListingId,
        amount: session.amount_total,
        currency: session.currency,
        payment_status: 'success',
        plan_type: 'salon',
        expires_at: new Date(Date.now() + (parseInt(metadata.duration_months || '1') * 30 * 24 * 60 * 60 * 1000)).toISOString()
      });

    return new Response(
      JSON.stringify({
        success: true,
        listing_id: draftListingId,
        published: true
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
