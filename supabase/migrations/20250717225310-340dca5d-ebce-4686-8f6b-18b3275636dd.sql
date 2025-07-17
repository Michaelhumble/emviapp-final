-- Add missing columns to profiles table that are referenced in the codebase
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS portfolio_urls text[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS completed_profile_tasks text[];

-- Create a simplified profile completion view that calculates completion percentage
-- This replaces the non-existent profile_completion_view
CREATE OR REPLACE VIEW public.profile_completion_status AS
SELECT 
  p.id,
  p.role,
  -- Calculate completion based on filled fields
  CASE 
    WHEN p.role = 'artist' THEN 
      (CASE WHEN p.full_name IS NOT NULL AND p.full_name != '' THEN 20 ELSE 0 END +
       CASE WHEN p.bio IS NOT NULL AND p.bio != '' THEN 20 ELSE 0 END +
       CASE WHEN p.specialty IS NOT NULL AND p.specialty != '' THEN 20 ELSE 0 END +
       CASE WHEN p.location IS NOT NULL AND p.location != '' THEN 20 ELSE 0 END +
       CASE WHEN p.avatar_url IS NOT NULL AND p.avatar_url != '' THEN 20 ELSE 0 END)
    WHEN p.role = 'salon' THEN
      (CASE WHEN p.full_name IS NOT NULL AND p.full_name != '' THEN 25 ELSE 0 END +
       CASE WHEN p.bio IS NOT NULL AND p.bio != '' THEN 25 ELSE 0 END +
       CASE WHEN p.location IS NOT NULL AND p.location != '' THEN 25 ELSE 0 END +
       CASE WHEN p.avatar_url IS NOT NULL AND p.avatar_url != '' THEN 25 ELSE 0 END)
    ELSE
      (CASE WHEN p.full_name IS NOT NULL AND p.full_name != '' THEN 50 ELSE 0 END +
       CASE WHEN p.location IS NOT NULL AND p.location != '' THEN 50 ELSE 0 END)
  END as calculated_completion,
  -- Determine if profile is complete (80% threshold)
  CASE 
    WHEN p.role = 'artist' THEN 
      (CASE WHEN p.full_name IS NOT NULL AND p.full_name != '' THEN 20 ELSE 0 END +
       CASE WHEN p.bio IS NOT NULL AND p.bio != '' THEN 20 ELSE 0 END +
       CASE WHEN p.specialty IS NOT NULL AND p.specialty != '' THEN 20 ELSE 0 END +
       CASE WHEN p.location IS NOT NULL AND p.location != '' THEN 20 ELSE 0 END +
       CASE WHEN p.avatar_url IS NOT NULL AND p.avatar_url != '' THEN 20 ELSE 0 END) >= 80
    WHEN p.role = 'salon' THEN
      (CASE WHEN p.full_name IS NOT NULL AND p.full_name != '' THEN 25 ELSE 0 END +
       CASE WHEN p.bio IS NOT NULL AND p.bio != '' THEN 25 ELSE 0 END +
       CASE WHEN p.location IS NOT NULL AND p.location != '' THEN 25 ELSE 0 END +
       CASE WHEN p.avatar_url IS NOT NULL AND p.avatar_url != '' THEN 25 ELSE 0 END) >= 75
    ELSE
      (CASE WHEN p.full_name IS NOT NULL AND p.full_name != '' THEN 50 ELSE 0 END +
       CASE WHEN p.location IS NOT NULL AND p.location != '' THEN 50 ELSE 0 END) >= 100
  END as is_complete,
  -- Required fields array based on role
  CASE 
    WHEN p.role = 'artist' THEN ARRAY['full_name', 'bio', 'specialty', 'location', 'avatar_url']
    WHEN p.role = 'salon' THEN ARRAY['full_name', 'bio', 'location', 'avatar_url']
    ELSE ARRAY['full_name', 'location']
  END as required_fields,
  -- Optional fields
  ARRAY['phone', 'website'] as optional_fields,
  80 as min_completion_percentage
FROM public.profiles p;