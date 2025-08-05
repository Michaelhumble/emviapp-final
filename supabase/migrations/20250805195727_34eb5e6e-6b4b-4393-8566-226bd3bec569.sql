-- Enable real-time updates for jobs table
ALTER TABLE public.jobs REPLICA IDENTITY FULL;

-- Add jobs table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;

-- Add industry auto-tagging trigger
CREATE OR REPLACE FUNCTION auto_tag_job_industry()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-tag industry if not provided or is generic
  IF NEW.category IS NULL OR NEW.category = '' OR NEW.category = 'Other' OR NEW.category = 'General' THEN
    -- Analyze title and description for industry keywords
    IF NEW.title ILIKE ANY(ARRAY['%nail%', '%manicure%', '%pedicure%']) OR 
       NEW.description ILIKE ANY(ARRAY['%nail%', '%manicure%', '%pedicure%']) THEN
      NEW.category = 'nails';
    ELSIF NEW.title ILIKE ANY(ARRAY['%hair%', '%stylist%', '%colorist%']) OR 
          NEW.description ILIKE ANY(ARRAY['%hair%', '%stylist%', '%colorist%']) THEN
      NEW.category = 'hair';
    ELSIF NEW.title ILIKE ANY(ARRAY['%barber%', '%fade%', '%beard%']) OR 
          NEW.description ILIKE ANY(ARRAY['%barber%', '%fade%', '%beard%']) THEN
      NEW.category = 'barber';
    ELSIF NEW.title ILIKE ANY(ARRAY['%massage%', '%therapist%']) OR 
          NEW.description ILIKE ANY(ARRAY['%massage%', '%therapist%']) THEN
      NEW.category = 'massage';
    ELSIF NEW.title ILIKE ANY(ARRAY['%esthetic%', '%facial%', '%skincare%']) OR 
          NEW.description ILIKE ANY(ARRAY['%esthetic%', '%facial%', '%skincare%']) THEN
      NEW.category = 'skincare';
    ELSIF NEW.title ILIKE ANY(ARRAY['%makeup%', '%mua%']) OR 
          NEW.description ILIKE ANY(ARRAY['%makeup%', '%mua%']) THEN
      NEW.category = 'makeup';
    ELSIF NEW.title ILIKE ANY(ARRAY['%lash%', '%brow%', '%eyebrow%']) OR 
          NEW.description ILIKE ANY(ARRAY['%lash%', '%brow%', '%eyebrow%']) THEN
      NEW.category = 'brows-lashes';
    ELSIF NEW.title ILIKE ANY(ARRAY['%tattoo%', '%ink%']) OR 
          NEW.description ILIKE ANY(ARRAY['%tattoo%', '%ink%']) THEN
      NEW.category = 'tattoo';
    ELSE
      NEW.category = 'Other Beauty';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-tagging on insert and update
DROP TRIGGER IF EXISTS trigger_auto_tag_job_industry ON public.jobs;
CREATE TRIGGER trigger_auto_tag_job_industry
  BEFORE INSERT OR UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION auto_tag_job_industry();