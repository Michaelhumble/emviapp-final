-- Clean up duplicate and unnecessary RLS policies on users table
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Create the single, correct SELECT policy
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid() = id);

-- Create the single, correct UPDATE policy  
CREATE POLICY "Users can update own profile" ON users
FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);