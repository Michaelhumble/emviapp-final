
-- Create a function to append an item to an array only if it doesn't exist already
CREATE OR REPLACE FUNCTION public.array_append_unique(arr text[], item text)
RETURNS text[]
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE 
    WHEN arr IS NULL THEN ARRAY[item]
    WHEN item = ANY(arr) THEN arr
    ELSE arr || item
  END;
$$;
