-- Ensure portfolio storage bucket exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for portfolio bucket - users can insert their own files
CREATE POLICY "Users can upload portfolio images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'portfolio' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Users can view all portfolio images (public)
CREATE POLICY "Portfolio images are publicly viewable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'portfolio');

-- Users can delete their own portfolio images
CREATE POLICY "Users can delete own portfolio images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'portfolio' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Also ensure portfolio_images bucket exists (for compatibility)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio_images', 'portfolio_images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for portfolio_images bucket
CREATE POLICY "Users can upload portfolio_images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'portfolio_images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Portfolio_images are publicly viewable" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'portfolio_images');

CREATE POLICY "Users can delete own portfolio_images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'portfolio_images' AND auth.uid()::text = (storage.foldername(name))[1]);