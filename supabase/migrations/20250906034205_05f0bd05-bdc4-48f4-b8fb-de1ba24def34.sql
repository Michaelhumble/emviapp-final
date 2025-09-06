-- Create HubSpot counters table for daily limits tracking
CREATE TABLE hubspot_counters (
  date date PRIMARY KEY,
  contacts_created integer DEFAULT 0,
  deals_created integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create HubSpot events table for logging and idempotency
CREATE TABLE hubspot_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  type text NOT NULL, -- 'contact', 'deal', 'form', 'event'
  status text NOT NULL, -- 'ok', 'warn', 'error', 'soft_blocked'
  email_hash text, -- SHA256 of email
  email_domain text, -- domain part of email
  idempotency_key text UNIQUE NOT NULL,
  contact_id text,
  deal_id text,
  message text,
  payload jsonb DEFAULT '{}',
  attempts integer DEFAULT 1
);

-- Create indexes for performance
CREATE INDEX idx_hubspot_events_created_at ON hubspot_events (created_at DESC);
CREATE INDEX idx_hubspot_events_type ON hubspot_events (type);
CREATE INDEX idx_hubspot_events_status ON hubspot_events (status);
CREATE INDEX idx_hubspot_events_idempotency ON hubspot_events (idempotency_key);

-- Enable RLS
ALTER TABLE hubspot_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE hubspot_events ENABLE ROW LEVEL SECURITY;

-- Only service role can manage these tables (for edge functions)
CREATE POLICY "Service role can manage counters" ON hubspot_counters FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage events" ON hubspot_events FOR ALL USING (auth.role() = 'service_role');

-- Function to clean up old events (180+ days)
CREATE OR REPLACE FUNCTION cleanup_old_hubspot_events()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM hubspot_events 
  WHERE created_at < (now() - INTERVAL '180 days');
END;
$$;

-- Create trigger for updating hubspot_counters updated_at
CREATE OR REPLACE FUNCTION update_hubspot_counters_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_hubspot_counters_updated_at
  BEFORE UPDATE ON hubspot_counters
  FOR EACH ROW
  EXECUTE FUNCTION update_hubspot_counters_updated_at();