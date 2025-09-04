-- Create indexing_logs table to track Google Indexing API calls
CREATE TABLE public.indexing_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action TEXT NOT NULL,
  url TEXT,
  success BOOLEAN NOT NULL DEFAULT false,
  response JSONB,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for performance
CREATE INDEX idx_indexing_logs_created_at ON public.indexing_logs(created_at DESC);
CREATE INDEX idx_indexing_logs_action ON public.indexing_logs(action);
CREATE INDEX idx_indexing_logs_success ON public.indexing_logs(success);

-- Enable RLS
ALTER TABLE public.indexing_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can manage indexing logs (system use only)
CREATE POLICY "System can manage indexing logs" ON public.indexing_logs
FOR ALL USING (auth.role() = 'service_role');

-- Policy: Admins can view indexing logs 
CREATE POLICY "Admins can view indexing logs" ON public.indexing_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);