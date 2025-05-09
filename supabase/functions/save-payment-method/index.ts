
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";
import Stripe from "https://esm.sh/stripe@14.17.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Get the JWT token from the authorization header
    const token = authHeader.replace('Bearer ', '');
    
    // Get the user from the JWT token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid user" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Parse the request body
    const { paymentMethodId, pricingTier, autoRenew, jobId } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if the customer already exists
    const { data: customers } = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let customerId;
    if (customers.length > 0) {
      customerId = customers[0].id;

      // Attach the payment method to the customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
    } else {
      // Create a new customer
      const customer = await stripe.customers.create({
        email: user.email,
        payment_method: paymentMethodId,
        metadata: {
          user_id: user.id,
        },
      });
      customerId = customer.id;
    }

    // Set the payment method as the default
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Save the customer ID and payment method in Supabase
    await supabaseClient
      .from('user_payment_methods')
      .upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_payment_method_id: paymentMethodId,
        is_default: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    // Update the job with the payment information if jobId is provided
    if (jobId) {
      await supabaseClient
        .from('jobs')
        .update({
          stripe_customer_id: customerId,
          stripe_payment_method_id: paymentMethodId,
          auto_renew: autoRenew,
          pricing_tier: pricingTier,
          updated_at: new Date().toISOString(),
        })
        .eq('id', jobId);
    }

    // Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment method saved successfully", 
        customer_id: customerId 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing payment method:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process payment method" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
