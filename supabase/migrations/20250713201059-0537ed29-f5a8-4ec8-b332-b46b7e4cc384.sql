-- CRITICAL FIX: Update salon_sales table to match form schema
-- Add all missing fields from the posting form

-- First, add all the missing columns to salon_sales table
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS business_type TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS established_year TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS neighborhood TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS hide_exact_address BOOLEAN DEFAULT false;

-- Financial/Business details
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS monthly_revenue TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS monthly_profit TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS number_of_staff TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS number_of_tables TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS number_of_chairs TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS square_feet TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS yearly_revenue TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS gross_revenue TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS net_profit TEXT;

-- Descriptions
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS vietnamese_description TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS english_description TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS reason_for_selling TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS virtual_tour_url TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS other_notes TEXT;

-- Contact Information
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS contact_facebook TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS contact_zalo TEXT;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS contact_notes TEXT;

-- Features and amenities (Boolean fields)
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS will_train BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS has_housing BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS has_wax_room BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS has_dining_room BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS has_laundry BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS has_parking BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS equipment_included BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS lease_transferable BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS seller_financing BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS help_with_transition BOOLEAN DEFAULT false;

-- Pricing and payment info
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS selected_pricing_tier TEXT DEFAULT 'basic';
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS featured_addon BOOLEAN DEFAULT false;
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

-- CRITICAL: Photo storage - array of image URLs
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Update existing description column to be more specific
ALTER TABLE public.salon_sales RENAME COLUMN description TO description_combined;

-- Create a computed column for features array
ALTER TABLE public.salon_sales ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Add RLS policies for salon_sales if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'salon_sales' 
    AND policyname = 'Users can view active salon sales'
  ) THEN
    CREATE POLICY "Users can view active salon sales" 
    ON public.salon_sales 
    FOR SELECT 
    USING (status = 'active');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'salon_sales' 
    AND policyname = 'Users can create their own salon sales'
  ) THEN
    CREATE POLICY "Users can create their own salon sales" 
    ON public.salon_sales 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'salon_sales' 
    AND policyname = 'Users can update their own salon sales'
  ) THEN
    CREATE POLICY "Users can update their own salon sales" 
    ON public.salon_sales 
    FOR UPDATE 
    USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'salon_sales' 
    AND policyname = 'Service role can manage salon sales'
  ) THEN
    CREATE POLICY "Service role can manage salon sales" 
    ON public.salon_sales 
    FOR ALL 
    USING (auth.role() = 'service_role');
  END IF;
END $$;