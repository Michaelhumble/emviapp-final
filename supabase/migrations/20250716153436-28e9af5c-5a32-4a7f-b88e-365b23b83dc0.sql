-- Create storage bucket for job photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('job-photos', 'job-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for job-photos bucket
CREATE POLICY "Job photos are publicly viewable" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'job-photos');

CREATE POLICY "Authenticated users can upload job photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'job-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own job photos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'job-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own job photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'job-photos' AND auth.role() = 'authenticated');