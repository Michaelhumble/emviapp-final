
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

    // DEBUG: Log secret (REMOVE IN PRODUCTION)
    console.log('🔐 [STRIPE-WEBHOOK] Secret loaded:', webhookSecret ? 'EXISTS' : 'MISSING');
    console.log('🔐 [STRIPE-WEBHOOK] Secret length:', webhookSecret.length);
    console.log('🔐 [STRIPE-WEBHOOK] Signature header:', signature ? 'EXISTS' : 'MISSING');
    console.log('🔐 [STRIPE-WEBHOOK] Body length:', body.length);
    console.log('🔐 [STRIPE-WEBHOOK] Verifying signature...');
    
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

      // Check if this is a salon posting payment
      const salonFormData = metadata.form_data;
      if (salonFormData && metadata.pricing_tier) {
        console.log('🏪 [STRIPE-WEBHOOK] SALON PAYMENT DETECTED - Creating salon listing');
        
        try {
          const parsedSalonData = JSON.parse(salonFormData);
          console.log('📋 [STRIPE-WEBHOOK] Parsed salon data:', {
            salonName: parsedSalonData.salonName,
            askingPrice: parsedSalonData.askingPrice,
            pricingTier: metadata.pricing_tier
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
          if (parsedSalonData.willTrain) features.push('Will Train');
          if (parsedSalonData.hasHousing) features.push('Housing Available');
          if (parsedSalonData.hasWaxRoom) features.push('Wax Room');
          if (parsedSalonData.hasDiningRoom) features.push('Dining Room');
          if (parsedSalonData.hasLaundry) features.push('Laundry');
          if (parsedSalonData.hasParking) features.push('Parking');
          if (parsedSalonData.equipmentIncluded) features.push('Equipment Included');
          if (parsedSalonData.leaseTransferable) features.push('Lease Transferable');
          if (parsedSalonData.sellerFinancing) features.push('Seller Financing');
          if (parsedSalonData.helpWithTransition) features.push('Help with Transition');

          // Parse uploaded photos from the session metadata  
          let photoUrls = [];
          try {
            if (parsedSalonData.uploadedPhotos && Array.isArray(parsedSalonData.uploadedPhotos)) {
              photoUrls = parsedSalonData.uploadedPhotos;
            }
          } catch (photoError) {
            console.log('⚠️ [STRIPE-WEBHOOK] No photos found in form data');
          }

          // Insert salon listing into database
          const { data: newSalon, error: salonError } = await supabase
            .from('salon_sales')
            .insert({
              user_id: metadata.user_id,
              salon_name: parsedSalonData.salonName,
              business_type: parsedSalonData.businessType,
              established_year: parsedSalonData.establishedYear,
              city: parsedSalonData.city,
              state: parsedSalonData.state,
              address: parsedSalonData.address,
              zip_code: parsedSalonData.zipCode,
              neighborhood: parsedSalonData.neighborhood,
              hide_exact_address: parsedSalonData.hideExactAddress,
              asking_price: parseFloat(parsedSalonData.askingPrice.replace(/[^0-9.]/g, '')),
              monthly_rent: parsedSalonData.monthlyRent ? parseFloat(parsedSalonData.monthlyRent.replace(/[^0-9.]/g, '')) : null,
              monthly_revenue: parsedSalonData.monthlyRevenue,
              monthly_profit: parsedSalonData.monthlyProfit,
              number_of_staff: parsedSalonData.numberOfStaff,
              number_of_tables: parsedSalonData.numberOfTables,
              number_of_chairs: parsedSalonData.numberOfChairs,
              square_feet: parsedSalonData.squareFeet,
              yearly_revenue: parsedSalonData.yearlyRevenue,
              gross_revenue: parsedSalonData.grossRevenue,
              net_profit: parsedSalonData.netProfit,
              vietnamese_description: parsedSalonData.vietnameseDescription,
              english_description: parsedSalonData.englishDescription,
              reason_for_selling: parsedSalonData.reasonForSelling,
              virtual_tour_url: parsedSalonData.virtualTourUrl,
              other_notes: parsedSalonData.otherNotes,
              contact_name: parsedSalonData.contactName,
              contact_email: parsedSalonData.contactEmail,
              contact_phone: parsedSalonData.contactPhone,
              contact_facebook: parsedSalonData.contactFacebook,
              contact_zalo: parsedSalonData.contactZalo,
              contact_notes: parsedSalonData.contactNotes,
              will_train: parsedSalonData.willTrain,
              has_housing: parsedSalonData.hasHousing,
              has_wax_room: parsedSalonData.hasWaxRoom,
              has_dining_room: parsedSalonData.hasDiningRoom,
              has_laundry: parsedSalonData.hasLaundry,
              has_parking: parsedSalonData.hasParking,
              equipment_included: parsedSalonData.equipmentIncluded,
              lease_transferable: parsedSalonData.leaseTransferable,
              seller_financing: parsedSalonData.sellerFinancing,
              help_with_transition: parsedSalonData.helpWithTransition,
              selected_pricing_tier: metadata.pricing_tier,
              featured_addon: metadata.featured_addon === 'true',
              is_featured: metadata.featured_addon === 'true',
              is_urgent: false,
              features: features,
              images: photoUrls,
              logo_url: parsedSalonData.logoUrl || null,
              payment_status: 'completed',
              status: 'active',
              expires_at: expiresAt.toISOString()
            })
            .select()
            .single();

          if (salonError) {
            console.error('❌ [STRIPE-WEBHOOK] SALON CREATION FAILED:', salonError);
          } else {
            console.log('✅ [STRIPE-WEBHOOK] SALON SUCCESSFULLY CREATED:', newSalon);
            console.log('✅ [STRIPE-WEBHOOK] PAID SALON NOW VISIBLE ON SALONS PAGE');
          }
        } catch (parseError) {
          console.error('❌ [STRIPE-WEBHOOK] Error parsing salon data:', parseError);
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
