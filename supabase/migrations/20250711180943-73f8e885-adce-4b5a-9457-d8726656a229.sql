-- Fix contact_info in metadata for all paid jobs
UPDATE public.jobs 
SET 
  metadata = jsonb_set(
    COALESCE(metadata, '{}'::jsonb), 
    '{contact_info}', 
    contact_info::jsonb
  )
WHERE 
  pricing_tier IN ('gold', 'premium', 'diamond') 
  AND payment_status = 'completed'
  AND contact_info IS NOT NULL
  AND (metadata IS NULL OR metadata->>'contact_info' IS NULL OR metadata->'contact_info' = '{}'::jsonb);

-- Remove placeholder image_url values for remaining jobs
UPDATE public.jobs 
SET image_url = NULL
WHERE image_url = 'photos-uploaded' AND pricing_tier IN ('gold', 'premium', 'diamond');