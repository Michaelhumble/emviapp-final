-- Fix all existing paid nail jobs by updating their photo URLs and contact info
-- Job ID: 4c6187cc-e86d-439d-ac25-40ae88da5768 (Powder Technician Wanted)
UPDATE public.jobs 
SET 
  image_url = 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.7499106451198028.jpg',
  image_urls = ARRAY['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.7499106451198028.jpg'],
  photos = ARRAY['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.7499106451198028.jpg'],
  metadata = jsonb_set(
    metadata, 
    '{image_urls}', 
    '["https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.7499106451198028.jpg"]'::jsonb
  ),
  metadata = jsonb_set(
    metadata, 
    '{photos}', 
    '["https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.7499106451198028.jpg"]'::jsonb
  )
WHERE id = '4c6187cc-e86d-439d-ac25-40ae88da5768';

-- Job ID: 63925519-efcc-4d14-bafd-3d175016782d (Nail Technician Needed)
UPDATE public.jobs 
SET 
  image_url = 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.14114748592646453.jpg',
  image_urls = ARRAY['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.14114748592646453.jpg'],
  photos = ARRAY['https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.14114748592646453.jpg'],
  metadata = jsonb_set(
    metadata, 
    '{image_urls}', 
    '["https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.14114748592646453.jpg"]'::jsonb
  ),
  metadata = jsonb_set(
    metadata, 
    '{photos}', 
    '["https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/job-photos/job-photos/0.14114748592646453.jpg"]'::jsonb
  )
WHERE id = '63925519-efcc-4d14-bafd-3d175016782d';

-- Fix contact_info for jobs that have incomplete metadata
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
  AND (metadata->>'contact_info' IS NULL OR metadata->'contact_info' = '{}'::jsonb);

-- Remove placeholder values and ensure all paid jobs have proper status
UPDATE public.jobs 
SET image_url = NULL
WHERE image_url = 'photos-uploaded' AND pricing_tier IN ('gold', 'premium', 'diamond');