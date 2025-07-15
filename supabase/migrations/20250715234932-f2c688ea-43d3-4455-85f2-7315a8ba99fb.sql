-- Temporarily allow salon owner updates for data setup
CREATE OR REPLACE FUNCTION public.setup_salon_owner(
  p_salon_id UUID,
  p_owner_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update salon with owner_id if it's currently NULL
  UPDATE public.salons
  SET owner_id = p_owner_id
  WHERE id = p_salon_id AND owner_id IS NULL;
  
  RETURN FOUND;
END;
$$;

-- Fix the current salon's ownership
SELECT public.setup_salon_owner('726a4454-a597-49f4-a4e6-42be6ba3da84', '726a4454-a597-49f4-a4e6-42be6ba3da84');

-- Verify the fix
SELECT id, salon_name, owner_id FROM public.salons WHERE id = '726a4454-a597-49f4-a4e6-42be6ba3da84';