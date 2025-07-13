-- Create the salon sale photos storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('salon-sale-photos', 'salon-sale-photos', true);

-- Create policies for public read access
CREATE POLICY "Anyone can view salon sale photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'salon-sale-photos');

-- Create policies for authenticated users to upload photos
CREATE POLICY "Authenticated users can upload salon sale photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'salon-sale-photos' AND auth.role() = 'authenticated');

-- Create policies for authenticated users to update their photos
CREATE POLICY "Authenticated users can update salon sale photos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'salon-sale-photos' AND auth.role() = 'authenticated');

-- Create policies for authenticated users to delete their photos  
CREATE POLICY "Authenticated users can delete salon sale photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'salon-sale-photos' AND auth.role() = 'authenticated');