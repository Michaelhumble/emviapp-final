
-- Add flagged column to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS flagged BOOLEAN DEFAULT false;

-- Add index for faster lookups on flagged users
CREATE INDEX IF NOT EXISTS users_flagged_idx ON public.users (flagged);

-- Add comment on column
COMMENT ON COLUMN public.users.flagged IS 'Flag for users with multiple payment disputes or refunds';
