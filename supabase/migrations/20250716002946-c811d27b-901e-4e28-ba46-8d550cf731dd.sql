-- Check and fix salon_staff RLS policies
DROP POLICY IF EXISTS "Salon owners can manage their staff" ON salon_staff;

-- Create a comprehensive RLS policy for salon_staff
CREATE POLICY "Salon owners can manage their staff"
ON salon_staff
FOR ALL
USING (
  salon_id IN (
    SELECT id FROM salons WHERE owner_id = auth.uid()
  )
)
WITH CHECK (
  salon_id IN (
    SELECT id FROM salons WHERE owner_id = auth.uid()
  )
);

-- Ensure RLS is enabled
ALTER TABLE salon_staff ENABLE ROW LEVEL SECURITY;