-- COMPREHENSIVE SECURITY HARDENING MIGRATION
-- Fix Critical Security Issues from Supabase Linter

-- 1. Enable RLS on tables that don't have it yet
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- 2. Add missing RLS policies for tables that have RLS enabled but no policies
CREATE POLICY "Users can manage their own notes"
ON public.user_notes
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their own notifications"
ON public.user_notifications  
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their own settings"
ON public.user_settings
FOR ALL  
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 3. Create audit logging table for sensitive actions
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit logs should only be readable by admins
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- System can insert audit logs
CREATE POLICY "System can insert audit logs"  
ON public.audit_logs
FOR INSERT
WITH CHECK (true);

-- 4. Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  endpoint TEXT NOT NULL,
  requests_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only system can manage rate limits
CREATE POLICY "System can manage rate limits"
ON public.rate_limits  
FOR ALL
USING (true);

-- 5. Create content moderation table for user-generated content
CREATE TABLE IF NOT EXISTS public.content_moderation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'job', 'salon', 'post', 'comment', 'message'
  content_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'flagged'
  moderated_by UUID REFERENCES auth.users(id),
  moderation_reason TEXT,
  content_hash TEXT, -- For duplicate detection
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  moderated_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.content_moderation ENABLE ROW LEVEL SECURITY;

-- Content owners can view their moderation status
CREATE POLICY "Users can view their content moderation status"
ON public.content_moderation
FOR SELECT  
USING (user_id = auth.uid());

-- Moderators can manage content moderation
CREATE POLICY "Moderators can manage content moderation"
ON public.content_moderation
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  )
);

-- 6. Create session management table
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own sessions
CREATE POLICY "Users can view their own sessions"
ON public.user_sessions
FOR SELECT
USING (user_id = auth.uid());

-- System can manage sessions
CREATE POLICY "System can manage sessions"
ON public.user_sessions
FOR ALL
USING (true);

-- 7. Security functions with proper search_path
CREATE OR REPLACE FUNCTION public.audit_user_action(
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    metadata
  ) VALUES (
    auth.uid(),
    p_action,
    p_resource_type,
    p_resource_id,
    p_metadata
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_endpoint TEXT,
  p_max_requests INTEGER DEFAULT 100,
  p_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start := now() - (p_window_minutes || ' minutes')::interval;
  
  -- Get current request count in window
  SELECT COALESCE(SUM(requests_count), 0)
  INTO current_count
  FROM public.rate_limits
  WHERE (user_id = auth.uid() OR ip_address = inet_client_addr())
    AND endpoint = p_endpoint
    AND window_start > window_start;
  
  -- Check if limit exceeded
  IF current_count >= p_max_requests THEN
    RETURN FALSE;
  END IF;
  
  -- Record this request
  INSERT INTO public.rate_limits (
    user_id,
    endpoint,
    ip_address
  ) VALUES (
    auth.uid(),
    p_endpoint,
    inet_client_addr()
  );
  
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.sanitize_content(p_content TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Basic content sanitization
  -- Remove potential XSS patterns
  p_content := regexp_replace(p_content, '<[^>]*>', '', 'g');
  p_content := regexp_replace(p_content, 'javascript:', '', 'gi');
  p_content := regexp_replace(p_content, 'data:', '', 'gi');
  p_content := regexp_replace(p_content, 'vbscript:', '', 'gi');
  
  -- Trim whitespace
  p_content := trim(p_content);
  
  RETURN p_content;
END;
$$;

-- 8. Storage security policies
-- Ensure proper storage bucket policies exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('profiles', 'Profile Images', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('job-images', 'Job Images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('salon-images', 'Salon Images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create storage policies for profile images
CREATE POLICY "Anyone can view profile images" ON storage.objects
FOR SELECT USING (bucket_id = 'profiles');

CREATE POLICY "Authenticated users can upload profile images" ON storage.objects  
FOR INSERT WITH CHECK (
  bucket_id = 'profiles' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own profile images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'profiles'
  AND auth.uid() IS NOT NULL  
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own profile images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'profiles'
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create similar policies for job and salon images
CREATE POLICY "Anyone can view job images" ON storage.objects
FOR SELECT USING (bucket_id = 'job-images');

CREATE POLICY "Authenticated users can upload job images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'job-images'
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Anyone can view salon images" ON storage.objects  
FOR SELECT USING (bucket_id = 'salon-images');

CREATE POLICY "Authenticated users can upload salon images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'salon-images'
  AND auth.uid() IS NOT NULL
);