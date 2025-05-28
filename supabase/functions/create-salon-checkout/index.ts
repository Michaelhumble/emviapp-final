
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
    let unitAmount = 4900 // Basic plan $49
    let productName = 'Basic Salon Listing'

    if (pricingOptions.selectedPricingTier === 'standard') {
      unitAmount = 9900 // $99
      productName = 'Standard Salon Listing'
    } else if (pricingOptions.selectedPricingTier === 'featured') {
      unitAmount = 19900 // $199
      productName = 'Featured Salon Listing'
    }

    // Apply duration multiplier
    if (pricingOptions.durationMonths > 1) {
      unitAmount *= pricingOptions.durationMonths
      productName += ` (${pricingOptions.durationMonths} months)`
    }

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

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
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
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/salon-listing-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/sell-salon`,
      metadata: {
        user_id: user.id,
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: pricingOptions.durationMonths.toString(),
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
