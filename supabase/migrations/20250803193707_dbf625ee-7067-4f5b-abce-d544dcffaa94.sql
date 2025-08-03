-- Create user sessions table for Sunshine AI memory
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT,
  language TEXT DEFAULT 'en',
  last_question TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat logs table for analytics
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  user_name TEXT,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for user sessions
CREATE POLICY "Users can access their own sessions" 
ON user_sessions 
FOR ALL 
USING (auth.uid()::text = user_id::text);

-- Create policies for chat logs  
CREATE POLICY "Users can access their own chat logs" 
ON chat_logs 
FOR ALL 
USING (auth.uid()::text = user_id::text);

-- Create indexes for better performance
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_chat_logs_user_id ON chat_logs(user_id);
CREATE INDEX idx_chat_logs_timestamp ON chat_logs(timestamp DESC);