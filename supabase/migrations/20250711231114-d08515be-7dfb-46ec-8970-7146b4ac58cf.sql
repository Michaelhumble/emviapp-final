-- Check existing policies for job-photos bucket
-- and create proper ones if they don't exist

-- First, drop any conflicting policies
DROP POLICY IF EXISTS "Anyone can view job photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload job photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own job photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own job photos" ON storage.objects;

-- Create correct policies for the job-photos bucket (using correct bucket ID)
CREATE POLICY "Job photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'job-photos');

CREATE POLICY "Authenticated users can upload job photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'job-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update job photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'job-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete job photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'job-photos' AND auth.role() = 'authenticated');