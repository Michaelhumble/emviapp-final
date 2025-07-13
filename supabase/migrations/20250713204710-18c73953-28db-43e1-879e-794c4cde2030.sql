-- Create the storage bucket for salon sale photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('salon-sale-photos', 'salon-sale-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for the bucket
CREATE POLICY "Anyone can view salon sale photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'salon-sale-photos');

CREATE POLICY "Authenticated users can upload salon sale photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'salon-sale-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own salon sale photos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'salon-sale-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own salon sale photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'salon-sale-photos' AND auth.uid()::text = (storage.foldername(name))[1]);