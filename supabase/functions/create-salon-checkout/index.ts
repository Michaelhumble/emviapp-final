
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { pricingOptions, formData } = await req.json()
    
    console.log('Creating salon checkout session for:', pricingOptions)

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get the authenticated user
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data } = await supabaseClient.auth.getUser(token)
    const user = data.user

    if (!user?.email) {
      throw new Error('User not authenticated')
    }

    // Calculate pricing based on options
    const planPrices = {
      basic: 1999,    // $19.99
      gold: 4999,     // $49.99
      premium: 9999,  // $99.99
      annual: 14900   // $149.00
    }

    let unitAmount = planPrices[pricingOptions.selectedPricingTier] || planPrices.basic
    let productName = `${pricingOptions.selectedPricingTier?.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier?.slice(1)} Salon Listing`

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1
    })

    let customerId
    if (customers.data.length > 0) {
      customerId = customers.data[0].id
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id
        }
      })
      customerId = customer.id
    }

    // Create line items
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
            description: `Salon listing for ${formData?.salonName || 'your salon'}`
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ]

    // Add featured addon if selected
    if (pricingOptions.featuredAddon) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Featured Listing Add-on',
            description: 'Get 5x more views and inquiries'
          },
          unit_amount: 1000, // $10.00
        },
        quantity: 1,
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/salon-listing-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/sell-salon`,
      metadata: {
        user_id: user.id,
        pricing_tier: pricingOptions.selectedPricingTier,
        featured_addon: pricingOptions.featuredAddon ? 'true' : 'false',
        salon_name: formData?.salonName || '',
        asking_price: formData?.askingPrice || ''
      }
    })

    console.log('Checkout session created:', session.id)

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create checkout session' 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
