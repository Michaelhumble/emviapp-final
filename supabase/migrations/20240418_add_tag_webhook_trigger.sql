
-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to call our edge function
CREATE OR REPLACE FUNCTION notify_tag_webhook()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Make HTTP POST request to our edge function
  PERFORM net.http_post(
    url:='https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/handle-user-tag',
    headers:=jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_key')
    ),
    body:=jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', row_to_json(NEW),
      'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END
    )
  );
  
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS user_tags_webhook_trigger ON user_tags;
CREATE TRIGGER user_tags_webhook_trigger
  AFTER INSERT OR UPDATE
  ON user_tags
  FOR EACH ROW
  EXECUTE FUNCTION notify_tag_webhook();
