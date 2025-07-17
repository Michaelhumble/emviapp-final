-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);

-- Ensure RLS is enabled on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;