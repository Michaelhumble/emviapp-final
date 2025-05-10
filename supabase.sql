
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

-- Create a function to track profile views safely
CREATE OR REPLACE FUNCTION track_profile_view(
  p_viewer_id UUID,
  p_artist_id UUID,
  p_source_page TEXT,
  p_viewer_role TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  viewer_location TEXT;
  viewer_specialty TEXT;
  artist_location TEXT;
  artist_specialty TEXT;
  location_matched BOOLEAN := FALSE;
  specialty_matched BOOLEAN := FALSE;
BEGIN
  -- Get viewer and artist info
  SELECT location, specialty INTO viewer_location, viewer_specialty
  FROM users
  WHERE id = p_viewer_id;
  
  SELECT location, specialty INTO artist_location, artist_specialty
  FROM users
  WHERE id = p_artist_id;
  
  -- Check if location matches
  IF viewer_location IS NOT NULL AND artist_location IS NOT NULL THEN
    location_matched := (viewer_location = artist_location);
  END IF;
  
  -- Check if specialty matches
  IF viewer_specialty IS NOT NULL AND artist_specialty IS NOT NULL THEN
    specialty_matched := (viewer_specialty = artist_specialty);
  END IF;
  
  -- Insert view record with safety for unique constraint
  BEGIN
    INSERT INTO profile_views (
      viewer_id,
      artist_id,
      viewed_at,
      source_page,
      viewer_role,
      location_matched,
      specialty_matched
    ) VALUES (
      p_viewer_id,
      p_artist_id,
      NOW(),
      p_source_page,
      p_viewer_role,
      location_matched,
      specialty_matched
    );
    RETURN TRUE;
  EXCEPTION
    WHEN unique_violation THEN
      -- Already viewed today
      RETURN FALSE;
  END;
END;
$$;
