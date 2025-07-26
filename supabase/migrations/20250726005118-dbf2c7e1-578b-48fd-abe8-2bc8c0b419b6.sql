-- Enable RLS and add policies only for critical existing tables

-- Check and enable RLS for core tables
DO $$
BEGIN
    -- Enable RLS for jobs table if it exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'jobs') THEN
        ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Anyone can view public job postings" ON public.jobs;
        DROP POLICY IF EXISTS "Users can create their own job postings" ON public.jobs;
        DROP POLICY IF EXISTS "Users can manage their own job postings" ON public.jobs;
        DROP POLICY IF EXISTS "Users can delete their own job postings" ON public.jobs;
        
        -- Create new policies
        CREATE POLICY "Anyone can view public job postings" ON public.jobs
          FOR SELECT USING (status = 'active');
        CREATE POLICY "Users can create their own job postings" ON public.jobs
          FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY "Users can manage their own job postings" ON public.jobs
          FOR UPDATE USING (auth.uid() = user_id);
        CREATE POLICY "Users can delete their own job postings" ON public.jobs
          FOR DELETE USING (auth.uid() = user_id);
    END IF;

    -- Enable RLS for profiles table if it exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Anyone can view public profiles" ON public.profiles;
        DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
        DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
        
        -- Create new policies
        CREATE POLICY "Anyone can view public profiles" ON public.profiles
          FOR SELECT USING (true);
        CREATE POLICY "Users can update their own profile" ON public.profiles
          FOR UPDATE USING (auth.uid() = id);
        CREATE POLICY "Users can create their own profile" ON public.profiles
          FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;

    -- Enable RLS for users table if it exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "System can manage users table" ON public.users;
        DROP POLICY IF EXISTS "Users can view their own user record" ON public.users;
        DROP POLICY IF EXISTS "Users can update their own user record" ON public.users;
        
        -- Create new policies
        CREATE POLICY "System can manage users table" ON public.users
          FOR ALL USING (true);
        CREATE POLICY "Users can view their own user record" ON public.users
          FOR SELECT USING (auth.uid() = id);
        CREATE POLICY "Users can update their own user record" ON public.users
          FOR UPDATE USING (auth.uid() = id);
    END IF;

    -- Enable RLS for salons table if it exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'salons') THEN
        ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Anyone can view public salons" ON public.salons;
        DROP POLICY IF EXISTS "Users can create salons" ON public.salons;
        DROP POLICY IF EXISTS "Salon owners can update their salons" ON public.salons;
        
        -- Create new policies
        CREATE POLICY "Anyone can view public salons" ON public.salons
          FOR SELECT USING (true);
        CREATE POLICY "Users can create salons" ON public.salons
          FOR INSERT WITH CHECK (auth.uid() = owner_id);
        CREATE POLICY "Salon owners can update their salons" ON public.salons
          FOR UPDATE USING (auth.uid() = owner_id);
    END IF;
END
$$;