
-- Enable real-time for users table to support profile synchronization
-- This allows changes to be broadcast to all connected clients
ALTER TABLE public.users REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
