-- Repopulate queue with all current content (correct column names)
-- First clear old entries
TRUNCATE seo_reindex_queue;

-- Enqueue all active jobs
INSERT INTO seo_reindex_queue (url, type, hash, status, tries, lastmod)
SELECT 
  'https://www.emvi.app/jobs/' || 
  lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' ||
  lower(regexp_replace(regexp_replace(COALESCE(location, 'remote'), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' ||
  id AS url,
  'job' AS type,
  md5(title || COALESCE(description, '') || COALESCE(location, '') || updated_at::text) AS hash,
  'queued' AS status,
  0 AS tries,
  NOW() AS lastmod
FROM jobs
WHERE status = 'active';

-- Enqueue all salons
INSERT INTO seo_reindex_queue (url, type, hash, status, tries, lastmod)
SELECT 
  'https://www.emvi.app/salons/' || 
  lower(regexp_replace(regexp_replace(salon_name, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || id AS url,
  'salon' AS type,
  md5(salon_name || COALESCE(about, '') || updated_at::text) AS hash,
  'queued' AS status,
  0 AS tries,
  NOW() AS lastmod
FROM salons;

-- Enqueue all active artists with complete profiles
INSERT INTO seo_reindex_queue (url, type, hash, status, tries, lastmod)
SELECT 
  'https://www.emvi.app/artists/' || 
  lower(regexp_replace(regexp_replace(COALESCE(full_name, 'artist'), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || id AS url,
  'artist' AS type,
  md5(COALESCE(full_name, '') || COALESCE(bio, '') || updated_at::text) AS hash,
  'queued' AS status,
  0 AS tries,
  NOW() AS lastmod
FROM profiles
WHERE role IN ('artist', 'nail technician/artist')
AND full_name IS NOT NULL;