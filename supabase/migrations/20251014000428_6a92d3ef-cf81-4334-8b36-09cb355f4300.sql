
-- Add metadata column to seo_indexing_logs for comprehensive tracking
ALTER TABLE seo_indexing_logs 
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

COMMENT ON COLUMN seo_indexing_logs.metadata IS 'Extended tracking: Google Indexing API stats, IndexNow status codes, sitemap ping results';
