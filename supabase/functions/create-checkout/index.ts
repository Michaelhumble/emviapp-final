
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRICES = {
  job: {
    first: 500, // $5.00
    additional: 1000 // $10.00
  },
  salon: {
    any: 2500 // $25.00
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request data
    const { postType } = await req.json();
    
    // Get auth user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }} = await supabaseClient.auth.getUser(token);
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Check if it's their first post of this type
    const { data: existingPosts } = await supabaseClient
      .from('posts')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_type', postType);
    
    const isFirstPost = !existingPosts || existingPosts.length === 0;
    
    // Calculate price based on post type and whether it's first post
    const amount = postType === 'job' 
      ? (isFirstPost ? PRICES.job.first : PRICES.job.additional)
      : PRICES.salon.any;

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${postType === 'job' ? 'Job Post' : 'Salon Listing'} ${isFirstPost ? '(First)' : ''}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post-canceled`,
      metadata: {
        user_id: user.id,
        post_type: postType,
        is_first_post: isFirstPost ? 'true' : 'false'
      }
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});
