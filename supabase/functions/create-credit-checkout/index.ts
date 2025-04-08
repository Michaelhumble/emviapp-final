
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.1.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { creditPackage, userId } = await req.json();
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-08-16',
    });

    // Define credit packages and their prices
    const creditPackages = {
      small: { credits: 5, amount: 500, name: "5 Credits" }, // $5
      medium: { credits: 10, amount: 1000, name: "10 Credits" }, // $10
      large: { credits: 20, amount: 1800, name: "20 Credits (Best Value)" }, // $18
    };

    // Make sure the requested package is valid
    if (!creditPackages[creditPackage]) {
      return new Response(
        JSON.stringify({ error: "Invalid credit package" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const selectedPackage = creditPackages[creditPackage];
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPackage.name,
              description: `Purchase ${selectedPackage.credits} Emvi Credits`,
            },
            unit_amount: selectedPackage.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard/salon?credits=success&package=${creditPackage}`,
      cancel_url: `${req.headers.get('origin')}/dashboard/salon?credits=canceled`,
      metadata: {
        userId: userId,
        creditsAmount: selectedPackage.credits.toString(),
        package: creditPackage,
      },
    });

    // Return the checkout URL for the frontend to redirect to
    return new Response(
      JSON.stringify({ checkoutUrl: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
