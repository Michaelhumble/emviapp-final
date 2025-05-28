
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

    // Create Supabase client with service role for draft listing creation
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Get the authenticated user
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )
    const { data } = await supabaseClient.auth.getUser(token)
    const user = data.user

    if (!user?.email) {
      throw new Error('User not authenticated')
    }

    // CRITICAL: Create DRAFT salon listing first - NEVER LIVE
    const { data: draftListing, error: listingError } = await supabaseAdmin
      .from('salon_listings')
      .insert({
        user_id: user.id,
        salon_name: formData?.salonName || '',
        business_type: formData?.businessType || 'Nail Salon',
        address: formData?.address || '',
        city: formData?.city || '',
        state: formData?.state || '',
        zip_code: formData?.zipCode || '',
        asking_price: formData?.askingPrice || '',
        monthly_rent: formData?.monthlyRent || '',
        description_vietnamese: formData?.vietnameseDescription || '',
        description_english: formData?.englishDescription || '',
        is_live: false, // CRITICAL: ALWAYS FALSE - NEVER LIVE WITHOUT PAYMENT
        status: 'draft',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (listingError) {
      console.error('Error creating draft listing:', listingError)
      throw new Error('Failed to create draft listing')
    }

    console.log('Draft listing created:', draftListing.id)

    // Calculate pricing based on options with FOMO pricing
    let unitAmount = 1999 // Basic plan $19.99
    let productName = 'Basic Salon Listing'

    if (pricingOptions.selectedPricingTier === 'featured') {
      unitAmount = 2999 // Featured plan $29.99 (+$10)
      productName = 'Featured Salon Listing'
    }

    // Apply duration pricing with FOMO discounts
    if (pricingOptions.durationMonths === 3) {
      unitAmount = pricingOptions.selectedPricingTier === 'featured' ? 5999 : 4999
    } else if (pricingOptions.durationMonths === 6) {
      unitAmount = pricingOptions.selectedPricingTier === 'featured' ? 10999 : 9999
    } else if (pricingOptions.durationMonths === 12) {
      unitAmount = pricingOptions.selectedPricingTier === 'featured' ? 15999 : 14999
    }

    if (pricingOptions.durationMonths > 1) {
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

    // Create checkout session with DRAFT LISTING ID in metadata
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
        draft_listing_id: draftListing.id, // CRITICAL: Pass draft listing ID
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: pricingOptions.durationMonths.toString(),
        salon_name: formData?.salonName || '',
        asking_price: formData?.askingPrice || '',
        post_type: 'salon'
      }
    })

    console.log('Checkout session created with draft listing ID:', session.id, draftListing.id)

    return new Response(
      JSON.stringify({ 
        url: session.url,
        draft_listing_id: draftListing.id 
      }),
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
