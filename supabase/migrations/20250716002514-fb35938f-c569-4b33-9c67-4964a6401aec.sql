-- Fix salon_staff RLS policies to allow salon owners and managers to access their team members

-- First drop existing policies to clean up
DROP POLICY IF EXISTS "Salon owners can view their staff" ON salon_staff;
DROP POLICY IF EXISTS "Salon owners can insert staff" ON salon_staff;
DROP POLICY IF EXISTS "Salon owners can update staff" ON salon_staff;
DROP POLICY IF EXISTS "Salon owners can delete staff" ON salon_staff;

-- Create proper RLS policies for salon_staff table
CREATE POLICY "Salon owners can manage their staff"
ON salon_staff
FOR ALL
USING (
  salon_id IN (
    SELECT id FROM salons WHERE owner_id = auth.uid()
    UNION
    SELECT salon_id FROM user_salon_access 
    WHERE user_id = auth.uid() 
    AND access_type = ANY(ARRAY['owner', 'manager'])
  )
)
WITH CHECK (
  salon_id IN (
    SELECT id FROM salons WHERE owner_id = auth.uid()
    UNION
    SELECT salon_id FROM user_salon_access 
    WHERE user_id = auth.uid() 
    AND access_type = ANY(ARRAY['owner', 'manager'])
  )
);

-- Enable RLS on salon_staff table if not already enabled
ALTER TABLE salon_staff ENABLE ROW LEVEL SECURITY;

-- Insert test data for the current user's salon if none exists
DO $$
DECLARE
    salon_uuid UUID := '726a4454-a597-49f4-a4e6-42be6ba3da84';
BEGIN
    -- Check if salon exists and create if not
    IF NOT EXISTS (SELECT 1 FROM salons WHERE id = salon_uuid) THEN
        INSERT INTO salons (id, owner_id, salon_name, created_at, updated_at)
        VALUES (
            salon_uuid,
            '726a4454-a597-49f4-a4e6-42be6ba3da84',
            'My Salon',
            NOW(),
            NOW()
        );
    END IF;

    -- Insert sample team members for testing (only if they don't exist)
    IF NOT EXISTS (SELECT 1 FROM salon_staff WHERE salon_id = salon_uuid AND email = 'sarah@test.com') THEN
        INSERT INTO salon_staff (
            salon_id,
            full_name,
            email,
            role,
            status,
            specialty,
            commission_rate,
            created_at,
            updated_at
        ) VALUES (
            salon_uuid,
            'Sarah Johnson',
            'sarah@test.com',
            'technician',
            'active',
            'Nail Art',
            60,
            NOW(),
            NOW()
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM salon_staff WHERE salon_id = salon_uuid AND email = 'mike@test.com') THEN
        INSERT INTO salon_staff (
            salon_id,
            full_name,
            email,
            role,
            status,
            specialty,
            commission_rate,
            created_at,
            updated_at
        ) VALUES (
            salon_uuid,
            'Mike Chen',
            'mike@test.com',
            'manager',
            'pending',
            'Manicures',
            70,
            NOW(),
            NOW()
        );
    END IF;
END
$$;