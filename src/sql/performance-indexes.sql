-- Performance optimization indexes for jobs page
-- These indexes will dramatically improve query performance at scale

-- Index for active jobs filtering (most common query)
CREATE INDEX IF NOT EXISTS idx_jobs_status_expires_performance ON jobs (status, expires_at) 
WHERE status = 'active' AND expires_at > NOW();

-- Compound index for category and location filtering with pagination
CREATE INDEX IF NOT EXISTS idx_jobs_category_location_created ON jobs (category, location, created_at DESC) 
WHERE status = 'active';

-- Index for pricing tier ordering (premium jobs first)
CREATE INDEX IF NOT EXISTS idx_jobs_pricing_tier_created ON jobs (
  CASE pricing_tier 
    WHEN 'diamond' THEN 1
    WHEN 'premium' THEN 2  
    WHEN 'gold' THEN 3
    WHEN 'free' THEN 4
    ELSE 5
  END,
  created_at DESC
) WHERE status = 'active';

-- Text search index for title and description
CREATE INDEX IF NOT EXISTS idx_jobs_search_text ON jobs USING GIN (
  to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, ''))
) WHERE status = 'active';

-- Index for location-based searches (supports ILIKE queries)
CREATE INDEX IF NOT EXISTS idx_jobs_location_text ON jobs USING GIN (location gin_trgm_ops)
WHERE status = 'active' AND location IS NOT NULL;

-- Partial index for user's own jobs (for dashboard)
CREATE INDEX IF NOT EXISTS idx_jobs_user_status ON jobs (user_id, status, created_at DESC);

-- Index for job expiration cleanup (background processes)
CREATE INDEX IF NOT EXISTS idx_jobs_expires_at ON jobs (expires_at) 
WHERE status = 'active';

-- Enable trigram extension for fast text searching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Composite index for the most common filter combinations
CREATE INDEX IF NOT EXISTS idx_jobs_optimized_listing ON jobs (
  status,
  expires_at,
  category,
  pricing_tier,
  created_at DESC
) WHERE status = 'active' AND expires_at > NOW();

-- Analyze tables to update statistics
ANALYZE jobs;