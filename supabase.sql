
-- Create a storage bucket for salon photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('salon_photos', 'Salon Photos', true, 5242880, '{image/png,image/jpeg,image/webp}')
ON CONFLICT (id) DO NOTHING;

-- Set RLS policy to allow anyone to view salon photos
CREATE POLICY "Anyone can view salon photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'salon_photos');

-- Allow authenticated users to upload their own salon photos
CREATE POLICY "Authenticated users can upload salon photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'salon_photos' AND
  auth.uid() = owner
);

-- Allow users to update their own salon photos
CREATE POLICY "Users can update their own salon photos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'salon_photos' AND
  auth.uid() = owner
);

-- Allow users to delete their own salon photos
CREATE POLICY "Users can delete their own salon photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'salon_photos' AND
  auth.uid() = owner
);
