-- Create a function to automatically activate jobs when payment is completed
CREATE OR REPLACE FUNCTION public.activate_job_on_payment()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is a new payment record and it's completed, activate related jobs
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    -- Update jobs that match this payment
    UPDATE public.jobs 
    SET status = 'active'
    WHERE user_id = NEW.user_id 
      AND status = 'draft' 
      AND payment_status = 'pending'
      AND created_at >= (NEW.created_at - INTERVAL '1 hour'); -- Only jobs created within the last hour
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on payments table
DROP TRIGGER IF EXISTS activate_jobs_on_payment ON public.payments;
CREATE TRIGGER activate_jobs_on_payment
  AFTER INSERT OR UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.activate_job_on_payment();

-- Create a function to automatically activate salon sales when payment is completed
CREATE OR REPLACE FUNCTION public.activate_salon_on_payment()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is a new payment record and it's completed, activate related salon sales
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    -- Update salon_sales that match this payment
    UPDATE public.salon_sales 
    SET status = 'active'
    WHERE user_id = NEW.user_id 
      AND status = 'draft' 
      AND created_at >= (NEW.created_at - INTERVAL '1 hour'); -- Only salons created within the last hour
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for salon sales
DROP TRIGGER IF EXISTS activate_salon_sales_on_payment ON public.payments;
CREATE TRIGGER activate_salon_sales_on_payment
  AFTER INSERT OR UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.activate_salon_on_payment();

-- Create function to handle free job posting activations (for certain tiers)
CREATE OR REPLACE FUNCTION public.activate_free_jobs()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-activate jobs for certain free tiers or demo purposes
  IF NEW.status = 'draft' AND NEW.pricing_tier IN ('free', 'basic') THEN
    NEW.status := 'active';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-activating free jobs
DROP TRIGGER IF EXISTS auto_activate_free_jobs ON public.jobs;
CREATE TRIGGER auto_activate_free_jobs
  BEFORE INSERT OR UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.activate_free_jobs();