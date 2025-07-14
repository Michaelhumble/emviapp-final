-- Create salon-logos storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
SELECT 'salon-logos', 'salon-logos', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'salon-logos'
);

-- Create policies for salon logo uploads
CREATE POLICY "Salon logos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'salon-logos');

CREATE POLICY "Users can upload their salon logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'salon-logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their salon logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'salon-logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their salon logos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'salon-logos' AND auth.uid()::text = (storage.foldername(name))[1]);