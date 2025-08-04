-- Create conversion tracking table for Sunshine chatbot analytics
CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  source TEXT NOT NULL,
  user_type TEXT NOT NULL,
  language TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;

-- Create policies for conversion events
CREATE POLICY "Users can access their own conversion events" 
ON conversion_events 
FOR ALL 
USING (true); -- System needs full access for analytics

-- Create indexes for better performance
CREATE INDEX idx_conversion_events_user_id ON conversion_events(user_id);
CREATE INDEX idx_conversion_events_event_type ON conversion_events(event_type);
CREATE INDEX idx_conversion_events_timestamp ON conversion_events(timestamp DESC);
CREATE INDEX idx_conversion_events_source ON conversion_events(source);

-- Add comments for documentation
COMMENT ON TABLE conversion_events IS 'Tracks conversion events from Sunshine chatbot interactions for analytics and optimization';
COMMENT ON COLUMN conversion_events.event_type IS 'Type of conversion event: chat_opened, job_posted, salon_listed, signup_completed, etc.';
COMMENT ON COLUMN conversion_events.source IS 'Source of the event: auto_popup, manual_click, chat_action';
COMMENT ON COLUMN conversion_events.user_type IS 'User type: new or returning';
COMMENT ON COLUMN conversion_events.language IS 'Language preference: en or vi';
COMMENT ON COLUMN conversion_events.metadata IS 'Additional event-specific data like revenue, greeting variant, etc.';