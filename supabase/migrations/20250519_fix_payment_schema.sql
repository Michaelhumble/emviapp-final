
-- First check if jobs table has contact_info column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'contact_info'
  ) THEN
    -- Add contact_info column to jobs table
    ALTER TABLE jobs 
    ADD COLUMN IF NOT EXISTS contact_info JSONB DEFAULT '{}';
  END IF;
END $$;

-- Check if payment_logs table has pricing_tier column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'payment_logs' AND column_name = 'pricing_tier'
  ) THEN
    -- Add pricing_tier column to payment_logs table
    ALTER TABLE payment_logs 
    ADD COLUMN IF NOT EXISTS pricing_tier TEXT;
  END IF;
END $$;

-- Check if webhook_logs table exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'webhook_logs'
  ) THEN
    -- Create webhook_logs table for tracking subscription events
    CREATE TABLE webhook_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'received',
      details JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  END IF;
END $$;
