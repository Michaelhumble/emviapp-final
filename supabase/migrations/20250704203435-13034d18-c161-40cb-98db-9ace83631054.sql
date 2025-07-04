
-- Simplify jobs table RLS policies to allow proper INSERT by authenticated users
-- Remove conflicting policies and create clear, simple ones

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Anyone can view active job postings" ON public.jobs;
DROP POLICY IF EXISTS "Anyone can view active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Salon owners can manage their own job postings" ON public.jobs;
DROP POLICY IF EXISTS "Users can create their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can delete their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can insert their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can update their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Users can view their own jobs" ON public.jobs;

-- Create simplified, clear policies
CREATE POLICY "Anyone can view active jobs" 
ON public.jobs 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Authenticated users can create jobs" 
ON public.jobs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own jobs" 
ON public.jobs 
FOR ALL 
USING (auth.uid() = user_id);
