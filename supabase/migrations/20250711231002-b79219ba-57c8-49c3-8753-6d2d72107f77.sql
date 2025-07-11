-- Create the missing 'Job Photos' storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('Job Photos', 'Job Photos', true);

-- Create storage policies for job photos to allow uploads
CREATE POLICY "Anyone can view job photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'Job Photos');

CREATE POLICY "Authenticated users can upload job photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'Job Photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own job photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'Job Photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own job photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'Job Photos' AND auth.role() = 'authenticated');