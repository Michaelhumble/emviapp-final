-- Fix security warnings for affiliate functions by setting search_path
DROP FUNCTION IF EXISTS public.update_affiliate_partners_updated_at();
DROP FUNCTION IF EXISTS public.update_affiliate_links_updated_at();
DROP FUNCTION IF EXISTS public.generate_affiliate_slug(TEXT);

-- Recreate functions with proper search_path security
CREATE OR REPLACE FUNCTION public.update_affiliate_partners_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_affiliate_links_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_affiliate_slug(base_name TEXT)
RETURNS TEXT 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Clean base name: lowercase, replace spaces with hyphens, remove special chars
  slug := lower(regexp_replace(base_name, '[^a-zA-Z0-9\s-]', '', 'g'));
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := trim(slug, '-');
  
  -- Ensure minimum length
  IF length(slug) < 3 THEN
    slug := slug || '-affiliate';
  END IF;
  
  -- Check uniqueness and add counter if needed
  WHILE EXISTS (SELECT 1 FROM public.affiliate_partners WHERE affiliate_partners.slug = slug) LOOP
    counter := counter + 1;
    slug := regexp_replace(slug, '-\d+$', '') || '-' || counter;
  END LOOP;
  
  RETURN slug;
END;
$$;