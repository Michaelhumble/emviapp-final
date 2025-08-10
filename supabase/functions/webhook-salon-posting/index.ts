
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const enablePendingFallback = (Deno.env.get('WEBHOOK_PENDING_FALLBACK') ?? 'true').toLowerCase() === 'true';

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey || '', {
      apiVersion: '2023-08-16',
    });

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret || '');
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      supabaseUrl || '',
      supabaseServiceKey || ''
    );

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Get metadata from the session
      const metadata = session.metadata || {};
      const userId = metadata.user_id;
      const pricingTier = metadata.pricing_tier;
      const featuredAddon = metadata.featured_addon === 'true';
      
      // Parse the full form data from metadata or fallback to pending_salons
      let formData: any = {};
      if (metadata.form_data) {
        try {
          formData = JSON.parse(metadata.form_data || '{}');
        } catch (e) {
          console.error('Error parsing form data from session metadata:', e);
        }
      } else if (enablePendingFallback && metadata.pending_salon_id) {
        // Fallback: read from pending_salons when form_data is absent
        const { data: pendingSalon, error: pendingError } = await supabase
          .from('pending_salons')
          .select('*')
          .eq('id', metadata.pending_salon_id)
          .maybeSingle();
        
        if (pendingError) {
          console.error('Error fetching pending salon for fallback:', pendingError);
        } else if (pendingSalon) {
          formData = {
            salonName: pendingSalon.salon_name,
            englishDescription: pendingSalon.english_description,
            vietnameseDescription: pendingSalon.vietnamese_description,
            reasonForSelling: pendingSalon.reason_for_selling,
            contactName: pendingSalon.contact_name,
            contactPhone: pendingSalon.contact_phone,
            contactEmail: pendingSalon.contact_email,
            contactFacebook: pendingSalon.contact_facebook,
            contactZalo: pendingSalon.contact_zalo,
            contactNotes: pendingSalon.contact_notes,
            address: pendingSalon.address,
            city: pendingSalon.city,
            state: pendingSalon.state,
            zipCode: pendingSalon.zip_code,
            businessType: pendingSalon.business_type,
            establishedYear: pendingSalon.established_year,
            askingPrice: pendingSalon.asking_price,
            monthlyRent: pendingSalon.monthly_rent,
            monthlyRevenue: pendingSalon.monthly_revenue,
            monthlyProfit: pendingSalon.monthly_profit,
            numberOfStaff: pendingSalon.number_of_staff,
            numberOfTables: pendingSalon.number_of_tables,
            numberOfChairs: pendingSalon.number_of_chairs,
            squareFeet: pendingSalon.square_feet,
            willTrain: pendingSalon.will_train,
            hasHousing: pendingSalon.has_housing,
            hasWaxRoom: pendingSalon.has_wax_room,
            hasDiningRoom: pendingSalon.has_dining_room,
            hasLaundry: pendingSalon.has_laundry,
            hasParking: pendingSalon.has_parking,
            equipmentIncluded: pendingSalon.equipment_included,
            leaseTransferable: pendingSalon.lease_transferable,
            sellerFinancing: pendingSalon.seller_financing,
            helpWithTransition: pendingSalon.help_with_transition,
            virtualTourUrl: pendingSalon.virtual_tour_url,
            photoUrls: pendingSalon.images || []
          };
        }
      }
      
      const salonName = formData.salonName || metadata.salon_name || '';
      
      console.log(`Processing successful salon payment for user ${userId}: ${pricingTier} tier, featured: ${featuredAddon}`);
      console.log('Form data received:', formData);
      
      // Idempotency: if we've already logged this Stripe session, skip creating duplicates
      const { data: existingLog } = await supabase
        .from('payment_logs')
        .select('id')
        .eq('stripe_payment_id', session.id)
        .eq('plan_type', 'salon_listing')
        .maybeSingle();
      if (existingLog) {
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (userId && pricingTier && salonName) {
        // Calculate expiration date (30 days for basic, 90 days for premium/gold, 365 days for annual)
        const expiresAt = new Date();
        if (pricingTier === 'annual') {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        } else if (pricingTier === 'premium' || pricingTier === 'gold') {
          expiresAt.setMonth(expiresAt.getMonth() + 3);
        } else {
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        }
        
        // Set featured expiration (if featured addon was purchased)
        const featuredUntil = featuredAddon ? new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)) : null; // 30 days
        
        try {
          // Build the description using bilingual content
          let fullDescription = '';
          if (formData.englishDescription) {
            fullDescription += formData.englishDescription;
          }
          if (formData.vietnameseDescription) {
            if (fullDescription) fullDescription += '\n\n--- Tiếng Việt ---\n\n';
            fullDescription += formData.vietnameseDescription;
          }
          
          // Build contact info from form data
          const contactInfo = {
            owner_name: formData.contactName || '',
            phone: formData.contactPhone || '',
            email: formData.contactEmail || '',
            facebook: formData.contactFacebook || '',
            zalo: formData.contactZalo || '',
            notes: formData.contactNotes || ''
          };
          
          // Build location string
          const fullLocation = [
            formData.address,
            formData.city,
            formData.state,
            formData.zipCode
          ].filter(Boolean).join(', ');
          
          // Create the salon listing in the salon_listings table
          const { data: salonData, error: salonError } = await supabase
            .from('salon_listings')
            .insert({
              user_id: userId,
              salon_name: salonName,
              description: fullDescription || formData.reasonForSelling || 'Premium salon for sale',
              location: fullLocation || formData.city || '',
              address: formData.address || '',
              phone: formData.contactPhone || '',
              email: formData.contactEmail || '',
              website: formData.virtualTourUrl || '',
              pricing_tier: pricingTier,
              status: 'active',
              expires_at: expiresAt.toISOString(),
              is_featured: featuredAddon,
              featured_until: featuredUntil?.toISOString(),
              contact_info: contactInfo,
              // Store complete form data in a structured way
              business_hours: {
                business_type: formData.businessType || '',
                established_year: formData.establishedYear || '',
                asking_price: formData.askingPrice || '',
                monthly_rent: formData.monthlyRent || '',
                monthly_revenue: formData.monthlyRevenue || '',
                monthly_profit: formData.monthlyProfit || '',
                number_of_staff: formData.numberOfStaff || '',
                number_of_tables: formData.numberOfTables || '',
                number_of_chairs: formData.numberOfChairs || '',
                square_feet: formData.squareFeet || '',
                // Include photos in business hours since it's a JSON field
                photos: formData.photoUrls || formData.photos || []
              },
              services: {
                features: {
                  will_train: formData.willTrain || false,
                  has_housing: formData.hasHousing || false,
                  has_wax_room: formData.hasWaxRoom || false,
                  has_dining_room: formData.hasDiningRoom || false,
                  has_laundry: formData.hasLaundry || false,
                  has_parking: formData.hasParking || false,
                  equipment_included: formData.equipmentIncluded || false,
                  lease_transferable: formData.leaseTransferable || false,
                  seller_financing: formData.sellerFinancing || false,
                  help_with_transition: formData.helpWithTransition || false
                },
                descriptions: {
                  english: formData.englishDescription || '',
                  vietnamese: formData.vietnameseDescription || '',
                  reason_for_selling: formData.reasonForSelling || '',
                  other_notes: formData.otherNotes || ''
                },
                // Also store photos in services for redundancy  
                photos: formData.photoUrls || formData.photos || []
              }
            })
            .select()
            .single();
            
          // If salon listing was created successfully, also create salon_photos records
          if (salonData && !salonError && (formData.photoUrls || formData.photos)) {
            const photoUrls = formData.photoUrls || formData.photos || [];
            
            if (photoUrls.length > 0) {
              console.log(`Creating ${photoUrls.length} salon photo records for salon ${salonData.id}`);
              
              const photoRecords = photoUrls.map((url, index) => ({
                salon_id: salonData.id,
                photo_url: url,
                order_number: index + 1
              }));
              
              const { error: photoError } = await supabase
                .from('salon_photos')
                .insert(photoRecords);
                
              if (photoError) {
                console.error('Error creating salon photo records:', photoError);
                // Don't fail the whole process, just log the error
              } else {
                console.log(`Successfully created ${photoUrls.length} salon photo records`);
              }
            }
          }
            
          if (salonError) {
            console.error('Error creating salon listing:', salonError);
            
            // Log the error for admin review
            await supabase
              .from('listing_validation_logs')
              .insert({
                listing_id: session.id,
                listing_type: 'salon_creation_error',
                user_id: userId,
                error_reason: salonError.message,
                ip_address: 'webhook'
              });
              
            return new Response(JSON.stringify({ error: 'Failed to create salon listing' }), {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          
          console.log('Salon listing created successfully:', salonData);
          
          // Log the payment - THIS MUST HAPPEN AFTER SALON CREATION
          const { error: paymentLogError } = await supabase
            .from('payment_logs')
            .insert({
              user_id: userId,
              plan_type: 'salon_listing',
              pricing_tier: pricingTier,
              listing_id: salonData.id, // Use the actual salon ID
              payment_status: 'success',
              stripe_payment_id: session.id,
              expires_at: expiresAt.toISOString()
            });
            
          if (paymentLogError) {
            console.error('Error logging payment:', paymentLogError);
            
            // Log the error but don't fail the whole process since salon was created
            await supabase
              .from('listing_validation_logs')
              .insert({
                listing_id: salonData.id,
                listing_type: 'payment_log_error',
                user_id: userId,
                error_reason: paymentLogError.message,
                ip_address: 'webhook'
              });
          } else {
            console.log(`Salon listing payment logged successfully for user ${userId}`);
          }
          
        } catch (error) {
          console.error('Unexpected error in salon creation:', error);
          
          // Log the error for admin review
          await supabase
            .from('listing_validation_logs')
            .insert({
              listing_id: session.id,
              listing_type: 'salon_webhook_error',
              user_id: userId,
              error_reason: error.message,
              ip_address: 'webhook'
            });
            
          return new Response(JSON.stringify({ error: 'Unexpected error in salon creation' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        console.error('Missing required metadata:', { userId, pricingTier, salonName });
        
        // Log the error for admin review
        await supabase
          .from('listing_validation_logs')
          .insert({
            listing_id: session.id,
            listing_type: 'salon_metadata_error',
            error_reason: 'Missing required metadata: userId, pricingTier, or salonName',
            ip_address: 'webhook'
          });
          
        return new Response(JSON.stringify({ error: 'Missing required metadata' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    // Log the error for admin review
    try {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') || '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
      );
      
      await supabase
        .from('listing_validation_logs')
        .insert({
          listing_id: 'unknown',
          listing_type: 'salon_webhook_fatal_error',
          error_reason: error.message,
          ip_address: 'webhook'
        });
    } catch (logError) {
      console.error('Failed to log webhook error:', logError);
    }
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
