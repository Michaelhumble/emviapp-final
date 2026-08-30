-- Anonymous visitors keep read access to all job fields EXCEPT contact_info
REVOKE SELECT ON public.jobs FROM anon;
GRANT SELECT (
  id, title, category, location, description, user_id, status,
  created_at, updated_at, expires_at, pricing_tier, compensation_type,
  compensation_details, requirements, payment_status, image_url,
  vietnamese_title, vietnamese_description, metadata, image_urls,
  photos, seed_tag
) ON public.jobs TO anon;