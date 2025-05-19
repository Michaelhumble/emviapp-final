
-- Create a function to create the diamond_tier_waitlist table if it doesn't exist
CREATE OR REPLACE FUNCTION create_diamond_tier_waitlist_if_not_exists()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if table exists
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'diamond_tier_waitlist'
  ) THEN
    -- Create the table
    CREATE TABLE public.diamond_tier_waitlist (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      post_type TEXT NOT NULL,
      requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      additional_info JSONB DEFAULT '{}'::jsonb,
      status TEXT NOT NULL DEFAULT 'pending',
      notes TEXT,
      processed_at TIMESTAMPTZ,
      processed_by UUID
    );

    -- Enable RLS
    ALTER TABLE public.diamond_tier_waitlist ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view their own waitlist entries"
      ON public.diamond_tier_waitlist
      FOR SELECT
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert their own waitlist entries"
      ON public.diamond_tier_waitlist
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);

    -- Admin policies would be added separately if needed
  END IF;
END;
$$;
