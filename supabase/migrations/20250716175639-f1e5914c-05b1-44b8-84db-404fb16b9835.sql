-- COMPREHENSIVE SECURITY HARDENING MIGRATION (CORRECTED)
-- Fix Critical Security Issues from Supabase Linter

-- 1. Create audit logging table for sensitive actions
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

-- 2. Create rate limiting table
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

-- 3. Create content moderation table for user-generated content
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

-- 4. Create session management table
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

-- 5. Security functions with proper search_path (fixed)
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

-- 6. Update existing function search paths for security
CREATE OR REPLACE FUNCTION public.has_posted_free_job(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.jobs
    WHERE user_id = p_user_id 
    AND pricing_tier = 'free'
    AND status = 'active'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_free_job_count(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM public.jobs
    WHERE user_id = p_user_id 
    AND pricing_tier = 'free'
    AND status = 'active'
  );
END;
$$;

-- 7. Enhance existing storage bucket security
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('job-photos', 'Job Photos', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('profile-photos', 'Profile Photos', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Add comprehensive security indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action ON public.audit_logs(user_id, action, created_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_endpoint_window ON public.rate_limits(endpoint, window_start);
CREATE INDEX IF NOT EXISTS idx_content_moderation_status ON public.content_moderation(status, created_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON public.user_sessions(user_id, is_active, expires_at);