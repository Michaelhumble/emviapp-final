-- Create tables for AI usage tracking and abuse protection

-- Table to track AI usage and rate limiting
CREATE TABLE public.ai_usage_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  response TEXT,
  prompt_hash TEXT NOT NULL, -- For detecting repetitive prompts
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  flagged_reason TEXT, -- Auto-flagged reason if any
  admin_reviewed BOOLEAN DEFAULT false,
  admin_action TEXT, -- approved, rejected, warning
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Table to track reported content (posts and AI answers)
CREATE TABLE public.content_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reported_content_type TEXT NOT NULL, -- 'post', 'ai_answer', 'comment'
  reported_content_id UUID NOT NULL, -- ID of the reported content
  report_reason TEXT NOT NULL, -- spam, inappropriate, abuse, etc.
  report_details TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, reviewed, dismissed, action_taken
  admin_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_usage_logs
CREATE POLICY "Users can view their own AI usage logs"
  ON public.ai_usage_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage AI usage logs"
  ON public.ai_usage_logs
  FOR ALL
  USING (auth.role() = 'service_role');

-- RLS policies for content_reports
CREATE POLICY "Users can create reports"
  ON public.content_reports
  FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports"
  ON public.content_reports
  FOR SELECT
  USING (auth.uid() = reporter_id);

CREATE POLICY "Service role can manage all reports"
  ON public.content_reports
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create indexes for performance
CREATE INDEX idx_ai_usage_logs_user_id_created_at ON public.ai_usage_logs(user_id, created_at DESC);
CREATE INDEX idx_ai_usage_logs_prompt_hash ON public.ai_usage_logs(prompt_hash);
CREATE INDEX idx_ai_usage_logs_flagged_reason ON public.ai_usage_logs(flagged_reason) WHERE flagged_reason IS NOT NULL;
CREATE INDEX idx_content_reports_status ON public.content_reports(status);
CREATE INDEX idx_content_reports_content_type_id ON public.content_reports(reported_content_type, reported_content_id);

-- Function to check AI rate limits
CREATE OR REPLACE FUNCTION public.check_ai_rate_limit(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  minute_count INTEGER;
  daily_count INTEGER;
  result JSONB;
BEGIN
  SET search_path = public;
  
  -- Check last minute (5 requests max)
  SELECT COUNT(*) INTO minute_count
  FROM ai_usage_logs
  WHERE user_id = p_user_id 
    AND created_at > (NOW() - INTERVAL '1 minute');
  
  -- Check last 24 hours (25 requests max)
  SELECT COUNT(*) INTO daily_count
  FROM ai_usage_logs
  WHERE user_id = p_user_id 
    AND created_at > (NOW() - INTERVAL '24 hours');
  
  result := jsonb_build_object(
    'minute_count', minute_count,
    'daily_count', daily_count,
    'minute_limit_exceeded', minute_count >= 5,
    'daily_limit_exceeded', daily_count >= 25,
    'rate_limited', minute_count >= 5 OR daily_count >= 25
  );
  
  RETURN result;
END;
$$;

-- Function to detect abusive/repetitive prompts
CREATE OR REPLACE FUNCTION public.detect_prompt_abuse(p_user_id UUID, p_prompt TEXT, p_prompt_hash TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  recent_identical_count INTEGER;
  recent_similar_count INTEGER;
  flagged_reason TEXT;
BEGIN
  SET search_path = public;
  
  -- Check for identical prompts in last hour
  SELECT COUNT(*) INTO recent_identical_count
  FROM ai_usage_logs
  WHERE user_id = p_user_id 
    AND prompt_hash = p_prompt_hash
    AND created_at > (NOW() - INTERVAL '1 hour');
  
  -- Check for similar patterns (same user asking very similar questions)
  SELECT COUNT(*) INTO recent_similar_count
  FROM ai_usage_logs
  WHERE user_id = p_user_id 
    AND LENGTH(prompt) BETWEEN LENGTH(p_prompt) - 20 AND LENGTH(p_prompt) + 20
    AND created_at > (NOW() - INTERVAL '2 hours');
  
  -- Determine if this should be flagged
  IF recent_identical_count >= 3 THEN
    flagged_reason := 'identical_repetitive';
  ELSIF recent_similar_count >= 8 THEN
    flagged_reason := 'similar_repetitive';
  ELSIF LENGTH(p_prompt) < 10 THEN
    flagged_reason := 'too_short';
  ELSIF p_prompt ~* '(spam|test|asdf|qwerty|111|aaa)' THEN
    flagged_reason := 'spam_pattern';
  END IF;
  
  RETURN flagged_reason;
END;
$$;