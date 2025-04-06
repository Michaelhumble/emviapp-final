
-- Add boosted_until column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = 'boosted_until'
    ) THEN
        ALTER TABLE public.users 
        ADD COLUMN boosted_until TIMESTAMP WITH TIME ZONE DEFAULT NULL;
    END IF;
END $$;
