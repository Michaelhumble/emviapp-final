
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

// Async webhook signature verification for Edge Functions
async function verifyStripeSignature(payload: string, signature: string, secret: string): Promise<boolean> {
  try {
    const elements = signature.split(',');
    const signatureHash = elements.find(el => el.startsWith('v1='))?.split('=')[1];
    const timestamp = elements.find(el => el.startsWith('t='))?.split('=')[1];
    
    if (!signatureHash || !timestamp) {
      console.error('❌ [STRIPE-WEBHOOK] Missing signature hash or timestamp');
      return false;
    }
    
    // Validate timestamp (prevent replay attacks)
    const webhookTimestamp = parseInt(timestamp, 10);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = Math.abs(currentTime - webhookTimestamp);
    
    // Reject if timestamp is more than 5 minutes old
    if (timeDifference > 300) {
      console.error('❌ [STRIPE-WEBHOOK] Timestamp too old:', timeDifference, 'seconds');
      return false;
    }
    
    // Create the signed payload
    const signedPayload = `${timestamp}.${payload}`;
    
    // Convert secret to key using async crypto
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    // Generate signature using async crypto
    const signature_bytes = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(signedPayload)
    );
    
    // Convert to hex
    const expectedSignature = Array.from(new Uint8Array(signature_bytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const isValid = expectedSignature === signatureHash;
    console.log(isValid ? '✅ [STRIPE-WEBHOOK] Signature matches' : '❌ [STRIPE-WEBHOOK] Signature mismatch');
    
    return isValid;
  } catch (error) {
    console.error('❌ [STRIPE-WEBHOOK] Signature verification error:', error);
    return false;
  }
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // CRITICAL: Get the raw body as ArrayBuffer first, then convert to string
    const bodyBuffer = await req.arrayBuffer();
    const body = new TextDecoder().decode(bodyBuffer);
    
    const signature = req.headers.get('stripe-signature') || '';
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    
    // Verify the webhook signature using async crypto
    const isValidSignature = await verifyStripeSignature(body, signature, webhookSecret);
    
    if (!isValidSignature) {
      console.error('❌ [STRIPE-WEBHOOK] Invalid signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ [STRIPE-WEBHOOK] Signature verified');

    // Parse the event manually since we can't use constructEvent
    const event = JSON.parse(body);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );
    
    // Log the webhook event for auditing
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: event.type,
        event_id: event.id,
        status: 'received',
        details: event.data.object
      });

    // Handle successful checkout
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const durationMonths = Number(metadata.duration_months || 1);
      
      console.log('💳 [STRIPE-WEBHOOK] Processing completed checkout session:', {
        sessionId: session.id,
        metadata: metadata,
        paymentStatus: session.payment_status
      });

      // ✅ NEW: Check if this is a salon posting payment via pending_salon_id
      const pendingSalonId = metadata.pending_salon_id;
      if (pendingSalonId && metadata.pricing_tier) {
        console.log('🏪 [STRIPE-WEBHOOK] SALON PAYMENT DETECTED - Activating pending salon:', pendingSalonId);
        
        try {
          // Get the pending salon data from the database
          const { data: pendingSalon, error: pendingError } = await supabase
            .from('pending_salons')
            .select('*')
            .eq('id', pendingSalonId)
            .eq('stripe_session_id', session.id)
            .single();

          if (pendingError || !pendingSalon) {
            console.error('❌ [STRIPE-WEBHOOK] Failed to find pending salon:', pendingError);
            throw new Error('Pending salon not found: ' + pendingError?.message);
          }

          console.log('📋 [STRIPE-WEBHOOK] Found pending salon data:', {
            salonName: pendingSalon.salon_name,
            askingPrice: pendingSalon.asking_price,
            pricingTier: metadata.pricing_tier,
            imageCount: pendingSalon.images?.length || 0
          });

          // Calculate expiration date based on pricing tier
          const expiresAt = new Date();
          const tierDuration = {
            basic: 30,
            gold: 60,
            premium: 90,
            annual: 365
          };
          const duration = tierDuration[metadata.pricing_tier] || 30;
          expiresAt.setDate(expiresAt.getDate() + duration);

          // Create features array from boolean fields
          const features = [];
          if (pendingSalon.will_train) features.push('Will Train');
          if (pendingSalon.has_housing) features.push('Housing Available');
          if (pendingSalon.has_wax_room) features.push('Wax Room');
          if (pendingSalon.has_dining_room) features.push('Dining Room');
          if (pendingSalon.has_laundry) features.push('Laundry');
          if (pendingSalon.has_parking) features.push('Parking');
          if (pendingSalon.equipment_included) features.push('Equipment Included');
          if (pendingSalon.lease_transferable) features.push('Lease Transferable');
          if (pendingSalon.seller_financing) features.push('Seller Financing');
          if (pendingSalon.help_with_transition) features.push('Help with Transition');

          // ✅ Transfer pending salon to live salon_sales table
          console.log('💾 [STRIPE-WEBHOOK] Creating salon_sales entry...');
          
          // ✅ Handle pricing tier urgency logic
          const isUrgent = metadata.pricing_tier === 'annual'; // "Until Sold" plan gets urgent badge
          
          // ✅ Create complete salon data object
          const salonData = {
            user_id: pendingSalon.user_id,
            salon_name: pendingSalon.salon_name,
            business_type: pendingSalon.business_type,
            established_year: pendingSalon.established_year,
            city: pendingSalon.city,
            state: pendingSalon.state,
            address: pendingSalon.address,
            zip_code: pendingSalon.zip_code,
            neighborhood: pendingSalon.neighborhood,
            hide_exact_address: pendingSalon.hide_exact_address,
            asking_price: pendingSalon.asking_price,
            size: pendingSalon.square_feet, // Map to size field as well
            monthly_rent: pendingSalon.monthly_rent,
            monthly_revenue: pendingSalon.monthly_revenue,
            monthly_profit: pendingSalon.monthly_profit,
            number_of_staff: pendingSalon.number_of_staff,
            number_of_tables: pendingSalon.number_of_tables,
            number_of_chairs: pendingSalon.number_of_chairs,
            square_feet: pendingSalon.square_feet,
            vietnamese_description: pendingSalon.vietnamese_description,
            english_description: pendingSalon.english_description,
            description_combined: pendingSalon.description_combined,
            reason_for_selling: pendingSalon.reason_for_selling,
            virtual_tour_url: pendingSalon.virtual_tour_url,
            other_notes: pendingSalon.other_notes,
            contact_name: pendingSalon.contact_name,
            contact_email: pendingSalon.contact_email,
            contact_phone: pendingSalon.contact_phone,
            contact_facebook: pendingSalon.contact_facebook,
            contact_zalo: pendingSalon.contact_zalo,
            contact_notes: pendingSalon.contact_notes,
            will_train: pendingSalon.will_train,
            has_housing: pendingSalon.has_housing,
            has_wax_room: pendingSalon.has_wax_room,
            has_dining_room: pendingSalon.has_dining_room,
            has_laundry: pendingSalon.has_laundry,
            has_parking: pendingSalon.has_parking,
            equipment_included: pendingSalon.equipment_included,
            lease_transferable: pendingSalon.lease_transferable,
            seller_financing: pendingSalon.seller_financing,
            help_with_transition: pendingSalon.help_with_transition,
            selected_pricing_tier: metadata.pricing_tier,
            featured_addon: metadata.featured_addon === 'true',
            is_featured: metadata.featured_addon === 'true' || metadata.pricing_tier === 'premium' || metadata.pricing_tier === 'gold',
            is_urgent: isUrgent,
            is_private: false, // Paid listings are public
            features: features,
            images: pendingSalon.images || [],
            payment_status: 'completed',
            status: 'active',
            expires_at: expiresAt.toISOString()
          };
          
          console.log('🔥 [STRIPE-WEBHOOK] Creating salon with data:', JSON.stringify(salonData, null, 2));
          console.log('📸 [STRIPE-WEBHOOK] Images to transfer:', pendingSalon.images);
          
          const { data: newSalon, error: salonError } = await supabase
            .from('salon_sales')
            .insert(salonData)
            .select()
            .single();

          if (salonError) {
            console.error('❌ [STRIPE-WEBHOOK] SALON CREATION FAILED:', salonError);
            console.error('❌ [STRIPE-WEBHOOK] Error details:', JSON.stringify(salonError, null, 2));
            
            // Still mark as completed to avoid infinite retries
            await supabase
              .from('pending_salons')
              .update({ status: 'failed', other_notes: salonError.message })
              .eq('id', pendingSalonId);
              
          } else {
            console.log('✅ [STRIPE-WEBHOOK] SALON SUCCESSFULLY CREATED:', newSalon);
            console.log('✅ [STRIPE-WEBHOOK] PAID SALON NOW VISIBLE ON SALONS PAGE');
            console.log('🏆 [STRIPE-WEBHOOK] SALON ID:', newSalon?.id);
            console.log('🏆 [STRIPE-WEBHOOK] SALON NAME:', newSalon?.salon_name);
            console.log('🏆 [STRIPE-WEBHOOK] PRICING TIER:', newSalon?.selected_pricing_tier);
            
            // ✅ Mark pending salon as completed
            const { error: updateError } = await supabase
              .from('pending_salons')
              .update({ status: 'completed' })
              .eq('id', pendingSalonId);
              
            if (updateError) {
              console.error('❌ [STRIPE-WEBHOOK] Failed to update pending salon status:', updateError);
            } else {
              console.log('✅ [STRIPE-WEBHOOK] Pending salon marked as completed');
            }
          }
        } catch (salonError) {
          console.error('❌ [STRIPE-WEBHOOK] Error processing salon:', salonError);
        }
      }

      // Check if this is a job posting payment
      const jobId = metadata.job_id;
      if (jobId) {
        console.log('🎯 [STRIPE-WEBHOOK] JOB PAYMENT DETECTED - Activating job:', jobId);
        
        // First, check if the job exists and is in draft status
        const { data: existingJob, error: checkError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (checkError) {
          console.error('❌ [STRIPE-WEBHOOK] Error checking for existing job:', checkError);
        } else if (!existingJob) {
          console.error('❌ [STRIPE-WEBHOOK] No job found with ID:', jobId);
        } else {
          console.log('📋 [STRIPE-WEBHOOK] Found job to activate:', {
            id: existingJob.id,
            title: existingJob.title,
            status: existingJob.status,
            pricing_tier: existingJob.pricing_tier
          });

          // FIXED: Update job status from draft to active and handle metadata
          const updateData: any = { 
            status: 'active',
            payment_status: 'completed',
            updated_at: new Date().toISOString()
          };

          // CRITICAL FIX: Extract photos from BOTH metadata AND existing database fields
          let validUrls: string[] = [];
          
          console.log('🔍 [STRIPE-WEBHOOK] Job analysis:', {
            'hasMetadata': !!existingJob.metadata,
            'existing_image_url': existingJob.image_url,
            'existing_image_urls': existingJob.image_urls,
            'existing_photos': existingJob.photos,
            'metadata': existingJob.metadata
          });
          
          // PRIORITY 1: Check existing database fields first (from draft creation)
          if (existingJob.image_urls && Array.isArray(existingJob.image_urls)) {
            validUrls = existingJob.image_urls.filter((url: string) => 
              url && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
            );
            console.log('🔍 [STRIPE-WEBHOOK] Found photos in image_urls field:', validUrls);
          }
          
          // PRIORITY 2: Check photos field if image_urls is empty
          if (validUrls.length === 0 && existingJob.photos && Array.isArray(existingJob.photos)) {
            validUrls = existingJob.photos.filter((url: string) => 
              url && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
            );
            console.log('🔍 [STRIPE-WEBHOOK] Found photos in photos field:', validUrls);
          }
          
          // PRIORITY 3: Check metadata as fallback
          if (validUrls.length === 0 && existingJob.metadata) {
            if (existingJob.metadata.image_urls && Array.isArray(existingJob.metadata.image_urls)) {
              validUrls = existingJob.metadata.image_urls.filter((url: string) => 
                url && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
              );
              console.log('🔍 [STRIPE-WEBHOOK] Found photos in metadata.image_urls:', validUrls);
            }
            
            if (validUrls.length === 0 && existingJob.metadata.photos && Array.isArray(existingJob.metadata.photos)) {
              validUrls = existingJob.metadata.photos.filter((url: string) => 
                url && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
              );
              console.log('🔍 [STRIPE-WEBHOOK] Found photos in metadata.photos:', validUrls);
            }
          }
          
          // CRITICAL: Always preserve existing photos if found
          if (validUrls.length > 0) {
            console.log('✅ [STRIPE-WEBHOOK] Preserving photo URLs:', validUrls);
            updateData.image_url = validUrls[0];
            updateData.image_urls = validUrls;
            updateData.photos = validUrls;
          } else {
            console.log('⚠️ [STRIPE-WEBHOOK] No valid photos found - job will be active without images');
          }
          
          // CRITICAL: Handle contact info (preserve existing or extract from metadata)
          if (existingJob.contact_info) {
            console.log('✅ [STRIPE-WEBHOOK] Preserving existing contact info:', existingJob.contact_info);
            updateData.contact_info = existingJob.contact_info;
          } else if (existingJob.metadata?.contact_info) {
            console.log('✅ [STRIPE-WEBHOOK] Extracting contact info from metadata:', existingJob.metadata.contact_info);
            updateData.contact_info = existingJob.metadata.contact_info;
          } else {
            console.log('⚠️ [STRIPE-WEBHOOK] No contact info found - keeping existing null value');
          }
          
          // Update metadata to be consistent
          if (existingJob.metadata || validUrls.length > 0 || updateData.contact_info) {
            updateData.metadata = {
              ...existingJob.metadata,
              photos: validUrls,
              image_urls: validUrls,
              contact_info: updateData.contact_info
            };
          }

          const { data: updatedJob, error: updateError } = await supabase
            .from('jobs')
            .update(updateData)
            .eq('id', jobId)
            .eq('status', 'draft')
            .select();

          if (updateError) {
            console.error('❌ [STRIPE-WEBHOOK] JOB ACTIVATION FAILED:', updateError);
          } else if (!updatedJob || updatedJob.length === 0) {
            console.error('❌ [STRIPE-WEBHOOK] No job was updated - may not be in draft status');
          } else {
            console.log('✅ [STRIPE-WEBHOOK] JOB SUCCESSFULLY ACTIVATED:', updatedJob[0]);
            console.log('✅ [STRIPE-WEBHOOK] PAID JOB NOW VISIBLE ON JOBS PAGE');
          }
        }
      }
      
      // Calculate expiration date based on duration
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (durationMonths * 30)); // Approximate months as 30 days
      
      // Insert payment record into payment_logs table
      await supabase
        .from('payment_logs')
        .insert({
          user_id: metadata.user_id,
          listing_id: metadata.listing_id,
          plan_type: metadata.plan_type || 'standard',
          payment_status: 'success',
          stripe_payment_id: session.id,
          auto_renew_enabled: metadata.auto_renew === 'true',
          payment_date: new Date().toISOString(),
          expires_at: expiresAt.toISOString()
        });

      // Also insert into payments table for backward compatibility
      const { error } = await supabase
        .from('payments')
        .insert({
          user_id: metadata.user_id,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          payment_type: metadata.post_type || 'unknown',
          stripe_session_id: session.id,
          metadata: JSON.stringify(metadata)
        });

      if (error) {
        console.error('Error inserting payment:', error);
        await supabase
          .from('webhook_logs')
          .insert({
            event_type: event.type,
            event_id: event.id,
            status: 'error',
            details: { error: error.message }
          });
      }
    }
    
    // Handle subscription events
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      
      // Check if this is a subscription invoice
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        const metadata = subscription.metadata || {};
        
        // Calculate new expiry date based on billing period
        const periodEnd = new Date(subscription.current_period_end * 1000);
        
        // Update payment_logs for subscription renewal
        if (metadata.user_id) {
          await supabase
            .from('payment_logs')
            .insert({
              user_id: metadata.user_id,
              listing_id: metadata.listing_id,
              plan_type: metadata.plan_type || 'standard',
              payment_status: 'success',
              stripe_payment_id: invoice.id,
              auto_renew_enabled: true,
              payment_date: new Date().toISOString(),
              expires_at: periodEnd.toISOString()
            });
        }
      }
    }
    
    // Handle payment disputes and refunds
    if (event.type === 'charge.dispute.created') {
      const dispute = event.data.object;
      const charge = dispute.charge;
      
      // Update payment status to dispute_open
      await handlePaymentStatusUpdate(supabase, charge, 'dispute_open');
      
      // Flag user with disputes
      await flagUserWithDisputeOrRefund(supabase, dispute.metadata?.user_id);
    }
    
    if (event.type === 'charge.dispute.closed') {
      const dispute = event.data.object;
      const charge = dispute.charge;
      const status = dispute.status === 'won' ? 'dispute_won' : 'dispute_lost';
      
      // Update payment status based on dispute outcome
      await handlePaymentStatusUpdate(supabase, charge, status);
    }
    
    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      
      // Update payment status to refunded
      await handlePaymentStatusUpdate(supabase, charge.id, 'refunded');
      
      // Flag user with refunds
      await flagUserWithDisputeOrRefund(supabase, charge.metadata?.user_id);
    }
    
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      
      // Update payment status to payment_failed
      await handlePaymentStatusUpdate(supabase, paymentIntent.id, 'payment_failed');
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Helper function to update payment status in payment_logs
async function handlePaymentStatusUpdate(
  supabase: any, 
  stripePaymentId: string, 
  newStatus: string
) {
  // First try to find by stripe_payment_id
  let { data, error } = await supabase
    .from('payment_logs')
    .update({ payment_status: newStatus })
    .eq('stripe_payment_id', stripePaymentId);
  
  if (error || !data) {
    // If not found, log the issue
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: 'payment_status_update',
        status: 'error',
        details: { 
          error: error?.message || 'Payment not found', 
          stripe_payment_id: stripePaymentId 
        }
      });
  }
}

// Helper function to flag users with multiple disputes or refunds
async function flagUserWithDisputeOrRefund(supabase: any, userId: string) {
  if (!userId) return;
  
  // Count disputes and refunds for this user
  const { data, error } = await supabase
    .from('payment_logs')
    .select('payment_status', { count: 'exact' })
    .eq('user_id', userId)
    .in('payment_status', ['refunded', 'dispute_open', 'dispute_lost']);
  
  // If multiple issues, flag the user
  if (!error && data && data.count >= 2) {
    await supabase
      .from('users')
      .update({ flagged: true })
      .eq('id', userId);
  }
}
