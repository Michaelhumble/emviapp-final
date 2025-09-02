-- Extend affiliate_partners table for Stripe Connect
ALTER TABLE affiliate_partners
  ADD COLUMN IF NOT EXISTS stripe_account_id TEXT,
  ADD COLUMN IF NOT EXISTS connect_status TEXT DEFAULT 'not_connected',
  ADD COLUMN IF NOT EXISTS last_connect_check TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS default_currency TEXT;