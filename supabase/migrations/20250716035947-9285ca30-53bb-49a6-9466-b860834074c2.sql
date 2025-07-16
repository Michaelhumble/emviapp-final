-- Create offers/pokes table for salon to artist communication
CREATE TABLE IF NOT EXISTS public.artist_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL,
  artist_id UUID NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  offer_type TEXT DEFAULT 'poke' CHECK (offer_type IN ('poke', 'job_offer', 'collaboration')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '7 days')
);

-- Enable RLS
ALTER TABLE public.artist_offers ENABLE ROW LEVEL SECURITY;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_artist_offers_artist_id ON public.artist_offers(artist_id);
CREATE INDEX IF NOT EXISTS idx_artist_offers_salon_id ON public.artist_offers(salon_id);
CREATE INDEX IF NOT EXISTS idx_artist_offers_status ON public.artist_offers(status);