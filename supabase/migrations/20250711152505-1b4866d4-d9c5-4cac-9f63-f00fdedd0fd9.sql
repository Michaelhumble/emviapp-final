-- Create storage bucket for job photos
INSERT INTO storage.buckets (id, name, public) VALUES ('job-photos', 'Job Photos', true);

-- Create policies for job photo uploads
CREATE POLICY "Anyone can view job photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'job-photos');

CREATE POLICY "Authenticated users can upload job photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'job-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own job photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'job-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own job photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'job-photos' AND auth.uid()::text = (storage.foldername(name))[1]);