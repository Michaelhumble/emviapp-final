import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('🚀 [PROCESS-PENDING] Starting migration of pending salons...');

    // Get all pending salons with Stripe sessions
    const { data: pendingSalons, error: fetchError } = await supabase
      .from('pending_salons')
      .select('*')
      .eq('status', 'pending')
      .not('stripe_session_id', 'is', null);

    if (fetchError) {
      console.error('❌ Error fetching pending salons:', fetchError);
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📋 Found ${pendingSalons?.length || 0} pending salons to process`);

    if (!pendingSalons || pendingSalons.length === 0) {
      return new Response(JSON.stringify({ message: 'No pending salons to process' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const results = [];

    for (const pendingSalon of pendingSalons) {
      try {
        console.log(`🔄 Processing salon: ${pendingSalon.salon_name} (${pendingSalon.id})`);

        // Build features array
        const features = [];
        if (pendingSalon.will_train) features.push('Training Provided');
        if (pendingSalon.has_housing) features.push('Housing Available');
        if (pendingSalon.has_wax_room) features.push('Wax Room');
        if (pendingSalon.has_dining_room) features.push('Dining Room');
        if (pendingSalon.has_laundry) features.push('Laundry');
        if (pendingSalon.has_parking) features.push('Parking Available');
        if (pendingSalon.equipment_included) features.push('Equipment Included');
        if (pendingSalon.lease_transferable) features.push('Lease Transferable');
        if (pendingSalon.seller_financing) features.push('Seller Financing');
        if (pendingSalon.help_with_transition) features.push('Help with Transition');

        // Determine pricing tier and features
        const pricingTier = pendingSalon.selected_pricing_tier || 'basic';
        const featuredAddon = pendingSalon.featured_addon || false;
        const isUrgent = pricingTier === 'annual'; // "Until Sold" plan gets urgent badge
        const isFeatured = featuredAddon || pricingTier === 'premium' || pricingTier === 'gold';

        // Set expiration date based on pricing tier
        const now = new Date();
        let expiresAt = new Date(now);
        switch (pricingTier) {
          case 'annual':
            expiresAt.setFullYear(now.getFullYear() + 2); // 2 years for "until sold"
            break;
          case 'gold':
            expiresAt.setDate(now.getDate() + 90); // 90 days
            break;
          case 'premium':
            expiresAt.setDate(now.getDate() + 60); // 60 days
            break;
          default:
            expiresAt.setDate(now.getDate() + 30); // 30 days for basic
        }

        // Create complete salon data object
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
          selected_pricing_tier: pricingTier,
          featured_addon: featuredAddon,
          is_featured: isFeatured,
          is_urgent: isUrgent,
          is_private: false, // Paid listings are public
          features: features,
          images: pendingSalon.images || [],
          payment_status: 'completed',
          status: 'active',
          expires_at: expiresAt.toISOString()
        };

        console.log(`📸 Processing images for ${pendingSalon.salon_name}:`, pendingSalon.images);

        // Insert into salon_sales
        const { data: newSalon, error: salonError } = await supabase
          .from('salon_sales')
          .insert(salonData)
          .select()
          .single();

        if (salonError) {
          console.error(`❌ Failed to create salon ${pendingSalon.salon_name}:`, salonError);
          results.push({
            salon_name: pendingSalon.salon_name,
            status: 'failed',
            error: salonError.message
          });
        } else {
          console.log(`✅ Successfully created salon: ${newSalon.salon_name} (ID: ${newSalon.id})`);
          console.log(`📸 Images transferred:`, newSalon.images);

          // Mark pending salon as completed
          await supabase
            .from('pending_salons')
            .update({ status: 'completed' })
            .eq('id', pendingSalon.id);

          results.push({
            salon_name: pendingSalon.salon_name,
            status: 'success',
            salon_id: newSalon.id,
            images_count: newSalon.images?.length || 0
          });
        }
      } catch (error) {
        console.error(`❌ Error processing salon ${pendingSalon.salon_name}:`, error);
        results.push({
          salon_name: pendingSalon.salon_name,
          status: 'error',
          error: error.message
        });
      }
    }

    console.log('🎉 Migration complete. Results:', results);

    return new Response(JSON.stringify({
      message: 'Migration completed',
      processed: results.length,
      results: results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});