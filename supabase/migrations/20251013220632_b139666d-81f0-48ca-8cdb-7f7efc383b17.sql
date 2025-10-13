-- Create seo_reindex_queue table for tracking URLs that need re-indexing
CREATE TABLE IF NOT EXISTS public.seo_reindex_queue (
  url TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('job', 'salon', 'artist', 'blog', 'page')),
  lastmod TIMESTAMPTZ NOT NULL DEFAULT now(),
  hash TEXT,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'error')),
  tries INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for efficient queue processing
CREATE INDEX IF NOT EXISTS idx_seo_reindex_queue_status_lastmod 
  ON public.seo_reindex_queue(status, lastmod) 
  WHERE status = 'queued' AND tries < 5;

-- Create index for type filtering
CREATE INDEX IF NOT EXISTS idx_seo_reindex_queue_type 
  ON public.seo_reindex_queue(type);

-- Enable RLS
ALTER TABLE public.seo_reindex_queue ENABLE ROW LEVEL SECURITY;

-- Policy: Allow system/service role to manage queue
CREATE POLICY "System can manage reindex queue"
  ON public.seo_reindex_queue
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_seo_reindex_queue_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER trigger_seo_reindex_queue_updated_at
  BEFORE UPDATE ON public.seo_reindex_queue
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_reindex_queue_updated_at();

-- Add comment
COMMENT ON TABLE public.seo_reindex_queue IS 'Queue for tracking content changes that need search engine re-indexing';