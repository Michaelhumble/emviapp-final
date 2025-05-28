
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
    const { sessionId } = await req.json()
    
    console.log('Publishing salon listing after payment verification:', sessionId)

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Initialize Supabase with service role (admin access)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Verify the payment session
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed')
    }

    const draftListingId = session.metadata?.draft_listing_id
    if (!draftListingId) {
      throw new Error('No draft listing ID found in payment metadata')
    }

    console.log('Payment verified, publishing listing:', draftListingId)

    // BACKEND-ONLY: Set listing to LIVE after successful payment
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
      .single()

    if (publishError) {
      console.error('Error publishing listing:', publishError)
      throw new Error('Failed to publish listing')
    }

    console.log('Listing successfully published:', publishedListing.id)

    // Log the payment and publication
    await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: session.metadata?.user_id,
        stripe_session_id: sessionId,
        listing_id: draftListingId,
        amount: session.amount_total,
        currency: session.currency,
        payment_status: 'success',
        plan_type: 'salon',
        expires_at: new Date(Date.now() + (parseInt(session.metadata?.duration_months || '1') * 30 * 24 * 60 * 60 * 1000)).toISOString()
      })

    return new Response(
      JSON.stringify({ 
        success: true,
        listing_id: draftListingId,
        published: true
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error publishing salon listing:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to publish listing',
        success: false 
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
