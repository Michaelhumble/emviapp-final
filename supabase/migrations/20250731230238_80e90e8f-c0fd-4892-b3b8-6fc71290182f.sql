-- Fix salon_staff RLS policies to allow salon owners to view their staff
DROP POLICY IF EXISTS "Salon owners can view their staff" ON salon_staff;
DROP POLICY IF EXISTS "Salon staff can view salon staff" ON salon_staff;

CREATE POLICY "Salon owners can view their staff" ON salon_staff
FOR SELECT USING (
  salon_id IN (
    SELECT id FROM salons 
    WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Salon staff can view own record" ON salon_staff
FOR SELECT USING (
  user_id = auth.uid() OR
  salon_id IN (
    SELECT id FROM salons 
    WHERE owner_id = auth.uid()
  )
);

-- Fix salon_reviews table and relationships
-- First, let's create a proper reviews table structure if it doesn't exist correctly
CREATE TABLE IF NOT EXISTS salon_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'flagged')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on salon_reviews
ALTER TABLE salon_reviews ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies for salon_reviews
DROP POLICY IF EXISTS "Anyone can view active salon reviews" ON salon_reviews;
DROP POLICY IF EXISTS "Salon owners can view all reviews" ON salon_reviews;
DROP POLICY IF EXISTS "Customers can create reviews" ON salon_reviews;

CREATE POLICY "Anyone can view active salon reviews" ON salon_reviews
FOR SELECT USING (status = 'active');

CREATE POLICY "Salon owners can view all reviews" ON salon_reviews
FOR SELECT USING (
  salon_id IN (
    SELECT id FROM salons 
    WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "Customers can create reviews" ON salon_reviews
FOR INSERT WITH CHECK (
  customer_id = auth.uid()
);

-- Add error tracking table for monitoring 404s and other issues
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  error_type TEXT NOT NULL,
  error_message TEXT,
  route TEXT,
  user_agent TEXT,
  ip_address INET,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on error_logs
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can insert error logs" ON error_logs
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own error logs" ON error_logs
FOR SELECT USING (user_id = auth.uid());