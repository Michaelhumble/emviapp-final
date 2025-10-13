-- SEO Automation: Auto-enqueue triggers for content reindexing
-- This migration creates triggers that automatically enqueue URLs for reindexing
-- when content is created or updated, ensuring 100% SEO automation

-- Helper function: Enqueue a URL for reindexing with content hash deduplication
CREATE OR REPLACE FUNCTION enqueue_reindex_url(
  p_content_type TEXT,
  p_content_id UUID,
  p_content_data JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_hash TEXT;
  v_url TEXT;
BEGIN
  -- Compute MD5 hash of content for deduplication
  v_hash := md5(p_content_data::text);
  
  -- Generate URL based on content type
  CASE p_content_type
    WHEN 'job' THEN
      v_url := 'https://www.emvi.app/jobs/' || p_content_id;
    WHEN 'salon' THEN
      v_url := 'https://www.emvi.app/salon-for-sale/' || p_content_id;
    WHEN 'artist' THEN
      v_url := 'https://www.emvi.app/profile/' || p_content_id;
    WHEN 'blog' THEN
      v_url := 'https://www.emvi.app/blog/' || (p_content_data->>'slug');
    ELSE
      RETURN FALSE;
  END CASE;
  
  -- Upsert into queue (only if hash changed or new entry)
  INSERT INTO seo_reindex_queue (url, type, hash, status, tries, lastmod)
  VALUES (v_url, p_content_type, v_hash, 'queued', 0, NOW())
  ON CONFLICT (url) 
  DO UPDATE SET
    hash = EXCLUDED.hash,
    status = CASE 
      WHEN seo_reindex_queue.hash != EXCLUDED.hash THEN 'queued'
      ELSE seo_reindex_queue.status
    END,
    tries = CASE 
      WHEN seo_reindex_queue.hash != EXCLUDED.hash THEN 0
      ELSE seo_reindex_queue.tries
    END,
    lastmod = NOW()
  WHERE seo_reindex_queue.hash != EXCLUDED.hash;
  
  RETURN TRUE;
END;
$$;

-- Trigger function: Auto-enqueue job reindex
CREATE OR REPLACE FUNCTION auto_enqueue_job_reindex()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only enqueue for active jobs
  IF NEW.status = 'active' THEN
    PERFORM enqueue_reindex_url(
      'job',
      NEW.id,
      jsonb_build_object(
        'title', NEW.title,
        'description', NEW.description,
        'location', NEW.location,
        'category', NEW.category,
        'status', NEW.status,
        'updated_at', NEW.updated_at
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger function: Auto-enqueue salon reindex
CREATE OR REPLACE FUNCTION auto_enqueue_salon_reindex()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only enqueue for active salon listings
  IF NEW.status = 'active' THEN
    PERFORM enqueue_reindex_url(
      'salon',
      NEW.id,
      jsonb_build_object(
        'salon_name', NEW.salon_name,
        'description_combined', NEW.description_combined,
        'city', NEW.city,
        'state', NEW.state,
        'business_type', NEW.business_type,
        'asking_price', NEW.asking_price,
        'status', NEW.status,
        'updated_at', NEW.updated_at
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger function: Auto-enqueue artist profile reindex
CREATE OR REPLACE FUNCTION auto_enqueue_artist_reindex()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only enqueue for artist profiles
  IF NEW.role IN ('artist', 'nail technician/artist', 'freelancer') THEN
    PERFORM enqueue_reindex_url(
      'artist',
      NEW.id,
      jsonb_build_object(
        'full_name', NEW.full_name,
        'bio', NEW.bio,
        'specialty', NEW.specialty,
        'location', NEW.location,
        'years_experience', NEW.years_experience,
        'role', NEW.role,
        'updated_at', NEW.updated_at
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Install trigger on jobs table
DROP TRIGGER IF EXISTS trigger_auto_enqueue_job ON jobs;
CREATE TRIGGER trigger_auto_enqueue_job
  AFTER INSERT OR UPDATE OF title, description, location, category, status
  ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION auto_enqueue_job_reindex();

-- Install trigger on salon_sales table
DROP TRIGGER IF EXISTS trigger_auto_enqueue_salon ON salon_sales;
CREATE TRIGGER trigger_auto_enqueue_salon
  AFTER INSERT OR UPDATE OF salon_name, description_combined, city, state, status
  ON salon_sales
  FOR EACH ROW
  EXECUTE FUNCTION auto_enqueue_salon_reindex();

-- Install trigger on profiles table (for artists)
DROP TRIGGER IF EXISTS trigger_auto_enqueue_artist ON profiles;
CREATE TRIGGER trigger_auto_enqueue_artist
  AFTER INSERT OR UPDATE OF full_name, bio, specialty, location, years_experience, role
  ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_enqueue_artist_reindex();

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION enqueue_reindex_url TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION auto_enqueue_job_reindex TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION auto_enqueue_salon_reindex TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION auto_enqueue_artist_reindex TO authenticated, service_role;