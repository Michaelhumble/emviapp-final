-- Fix security warnings by properly dropping and recreating functions with search_path
DROP TRIGGER IF EXISTS update_affiliate_partners_updated_at ON public.affiliate_partners CASCADE;
DROP TRIGGER IF EXISTS update_affiliate_links_updated_at ON public.affiliate_links CASCADE;
DROP FUNCTION IF EXISTS public.update_affiliate_partners_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.update_affiliate_links_updated_at() CASCADE;

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

-- Recreate the triggers
CREATE TRIGGER update_affiliate_partners_updated_at
  BEFORE UPDATE ON public.affiliate_partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_affiliate_partners_updated_at();

CREATE TRIGGER update_affiliate_links_updated_at
  BEFORE UPDATE ON public.affiliate_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_affiliate_links_updated_at();

-- Also fix the generate_affiliate_slug function
DROP FUNCTION IF EXISTS public.generate_affiliate_slug(TEXT);

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