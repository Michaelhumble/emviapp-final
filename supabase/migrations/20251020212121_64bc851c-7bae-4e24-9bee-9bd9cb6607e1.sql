-- Fix triggers - recreate with proper configuration
DROP TRIGGER IF EXISTS trigger_auto_enqueue_job_reindex ON jobs;
DROP TRIGGER IF EXISTS trigger_auto_enqueue_salon_reindex ON salons;
DROP TRIGGER IF EXISTS trigger_auto_enqueue_artist_reindex ON profiles;

-- Recreate triggers
CREATE TRIGGER trigger_auto_enqueue_job_reindex
  AFTER INSERT OR UPDATE OF title, description, location, status ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION auto_enqueue_job_reindex();

CREATE TRIGGER trigger_auto_enqueue_salon_reindex
  AFTER INSERT OR UPDATE OF salon_name, about ON salons
  FOR EACH ROW
  EXECUTE FUNCTION auto_enqueue_salon_reindex();

CREATE TRIGGER trigger_auto_enqueue_artist_reindex
  AFTER INSERT OR UPDATE OF full_name, bio, role ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_enqueue_artist_reindex();