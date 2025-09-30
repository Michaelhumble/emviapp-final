import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔍 [SALON-CHECKOUT] Function started');

    // Get Stripe secret key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error('❌ [SALON-CHECKOUT] STRIPE_SECRET_KEY not found');
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    console.log('✅ [SALON-CHECKOUT] Stripe key found');

    // Create Supabase client using both anon and service role keys
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Retrieve authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error('❌ [SALON-CHECKOUT] No authorization header');
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabaseClient.auth.getUser(token);
    if (error || !data.user?.email) {
      console.error('❌ [SALON-CHECKOUT] User authentication failed:', error);
      throw new Error("User not authenticated or email not available");
    }

    const user = data.user;
    console.log('✅ [SALON-CHECKOUT] User authenticated:', user.email);

    // Parse and validate request body
    const BodySchema = z.object({
      pricingOptions: z.object({
        selectedPricingTier: z.enum(['basic', 'gold', 'premium', 'annual']),
        featuredAddon: z.boolean().optional()
      }),
      formData: z.object({
        salonName: z.string().min(1).max(200),
        businessType: z.string().max(100).optional().nullable(),
        establishedYear: z.number().int().optional().nullable(),
        address: z.string().max(300).optional().nullable(),
        city: z.string().max(100),
        state: z.string().max(50),
        zipCode: z.string().max(20).optional().nullable(),
        neighborhood: z.string().max(100).optional().nullable(),
        hideExactAddress: z.boolean().optional(),
        askingPrice: z.string().max(50),
        monthlyRent: z.union([z.string(), z.number()]).optional().nullable(),
        monthlyRevenue: z.string().max(50).optional().nullable(),
        monthlyProfit: z.string().max(50).optional().nullable(),
        numberOfStaff: z.number().int().optional().nullable(),
        numberOfTables: z.number().int().optional().nullable(),
        numberOfChairs: z.number().int().optional().nullable(),
        squareFeet: z.number().int().optional().nullable(),
        vietnameseDescription: z.string().max(5000).optional().nullable(),
        englishDescription: z.string().max(5000).optional().nullable(),
        reasonForSelling: z.string().max(1000).optional().nullable(),
        virtualTourUrl: z.string().url().max(2048).optional().nullable(),
        otherNotes: z.string().max(2000).optional().nullable(),
        contactName: z.string().max(100).optional().nullable(),
        contactEmail: z.string().email().max(254).optional().nullable(),
        contactPhone: z.string().max(30).optional().nullable(),
        contactFacebook: z.string().max(200).optional().nullable(),
        contactZalo: z.string().max(200).optional().nullable(),
        contactNotes: z.string().max(500).optional().nullable(),
        willTrain: z.boolean().optional(),
        hasHousing: z.boolean().optional(),
        hasWaxRoom: z.boolean().optional(),
        hasDiningRoom: z.boolean().optional(),
        hasLaundry: z.boolean().optional(),
        hasParking: z.boolean().optional(),
        equipmentIncluded: z.boolean().optional(),
        leaseTransferable: z.boolean().optional(),
        sellerFinancing: z.boolean().optional(),
        helpWithTransition: z.boolean().optional(),
        photoUrls: z.array(z.string().url().max(2048)).optional()
      })
    });

    const raw = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      console.error('❌ [SALON-CHECKOUT] Request validation failed:', parsed.error);
      return new Response(
        JSON.stringify({ error: "invalid_request" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const body = parsed.data;
    console.log('📦 [SALON-CHECKOUT] Request body received with keys:', Object.keys(body));

    const { pricingOptions, formData } = body;

    console.log('📋 [SALON-CHECKOUT] Form data summary:', {
      salonName: formData.salonName,
      askingPrice: formData.askingPrice,
      city: formData.city,
      state: formData.state,
      pricingTier: pricingOptions.selectedPricingTier,
      photoCount: formData.photoUrls?.length || 0
    });

    // ✅ STEP 1: Save the full form data to pending_salons table FIRST
    console.log('💾 [SALON-CHECKOUT] Saving form data to pending_salons table...');
    
    const { data: pendingSalon, error: pendingError } = await supabaseAdmin
      .from('pending_salons')
      .insert({
        user_id: user.id,
        salon_name: formData.salonName || 'Unnamed Salon',
        business_type: formData.businessType,
        established_year: formData.establishedYear,
        address: formData.address,
        city: formData.city || '',
        state: formData.state || '',
        zip_code: formData.zipCode,
        neighborhood: formData.neighborhood,
        hide_exact_address: formData.hideExactAddress || false,
        asking_price: parseFloat(formData.askingPrice?.replace(/,/g, '') || '0'),
        monthly_rent: formData.monthlyRent ? parseFloat(formData.monthlyRent) : null,
        monthly_revenue: formData.monthlyRevenue,
        monthly_profit: formData.monthlyProfit,
        number_of_staff: formData.numberOfStaff,
        number_of_tables: formData.numberOfTables,
        number_of_chairs: formData.numberOfChairs,
        square_feet: formData.squareFeet,
        vietnamese_description: formData.vietnameseDescription,
        english_description: formData.englishDescription,
        description_combined: formData.vietnameseDescription || formData.englishDescription || 'No description provided',
        reason_for_selling: formData.reasonForSelling,
        virtual_tour_url: formData.virtualTourUrl,
        other_notes: formData.otherNotes,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        contact_facebook: formData.contactFacebook,
        contact_zalo: formData.contactZalo,
        contact_notes: formData.contactNotes,
        will_train: formData.willTrain || false,
        has_housing: formData.hasHousing || false,
        has_wax_room: formData.hasWaxRoom || false,
        has_dining_room: formData.hasDiningRoom || false,
        has_laundry: formData.hasLaundry || false,
        has_parking: formData.hasParking || false,
        equipment_included: formData.equipmentIncluded || false,
        lease_transferable: formData.leaseTransferable || false,
        seller_financing: formData.sellerFinancing || false,
        help_with_transition: formData.helpWithTransition || false,
        selected_pricing_tier: pricingOptions.selectedPricingTier,
        featured_addon: pricingOptions.featuredAddon || false,
        images: formData.photoUrls || [],
        status: 'pending'
      })
      .select()
      .single();

    if (pendingError) {
      console.error('❌ [SALON-CHECKOUT] Failed to save pending salon:', pendingError);
      throw new Error("Failed to save salon data: " + pendingError.message);
    }

    console.log('✅ [SALON-CHECKOUT] Pending salon saved with ID:', pendingSalon.id);

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });
    console.log('✅ [SALON-CHECKOUT] Stripe initialized');

    // Check if a Stripe customer record exists for this user
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log('✅ [SALON-CHECKOUT] Existing customer found:', customerId);
    } else {
      console.log('ℹ️ [SALON-CHECKOUT] No existing customer found');
    }

    // Calculate pricing based on tier - MUST match frontend prices in salonPricing.ts
    let baseAmount = 0;
    let description = "Salon Listing";

    switch (pricingOptions.selectedPricingTier) {
      case 'basic':
        baseAmount = 1999; // $19.99 - FIXED to match frontend
        description = "Basic Salon Listing";
        break;
      case 'gold':
        baseAmount = 5999; // $59.99
        description = "Gold Salon Listing";
        break;
      case 'premium':
        baseAmount = 9999; // $99.99
        description = "Premium Salon Listing";
        break;
      case 'annual':
        baseAmount = 14900; // $149.00 - FIXED to match frontend
        description = "Annual Salon Listing";
        break;
      default:
        console.error('❌ [SALON-CHECKOUT] Invalid pricing tier:', pricingOptions.selectedPricingTier);
        throw new Error("Invalid pricing tier");
    }

    // Create line items
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: { 
            name: description,
            description: `Salon: ${formData.salonName || 'Unnamed Salon'}`
          },
          unit_amount: baseAmount,
        },
        quantity: 1,
      }
    ];

    let totalAmount = baseAmount;

    // Add featured addon if selected
    if (pricingOptions.featuredAddon) {
      const featuredAmount = 1000; // $10.00 - FIXED to match frontend
      totalAmount += featuredAmount;
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Featured Listing Add-on",
            description: "Premium placement for your salon listing",
          },
          unit_amount: featuredAmount,
        },
        quantity: 1,
      });
    }

    console.log('💰 [SALON-CHECKOUT] Total amount:', totalAmount, 'cents for:', description);

    // ✅ STEP 2: Create Stripe session with ONLY the pending salon ID (under 500 chars)
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/salon-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/sell-salon`,
      metadata: {
        pending_salon_id: pendingSalon.id, // ✅ ONLY 36 characters - well under 500 limit!
        user_id: user.id,
        pricing_tier: pricingOptions.selectedPricingTier,
        featured_addon: pricingOptions.featuredAddon ? "true" : "false"
      }
    });

    // Update pending salon with Stripe session ID
    await supabaseAdmin
      .from('pending_salons')
      .update({ stripe_session_id: session.id })
      .eq('id', pendingSalon.id);

    console.log('✅ [SALON-CHECKOUT] Stripe session created:', session.id);
    console.log('🌐 [SALON-CHECKOUT] Checkout URL:', session.url);
    console.log('🎯 [SALON-CHECKOUT] Metadata size check - pending_salon_id:', pendingSalon.id.length, 'chars');

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('❌ [SALON-CHECKOUT] Error:', error.message);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to create checkout session" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});