-- ⚠️ WARNING: This will DELETE ALL USERS from profiles table!
-- Only run this if you want to completely reset user data for investor demo

-- 1. Delete ALL users from profiles table
DELETE FROM public.profiles;

-- 2. Reset any sequences if you have auto-increment user numbers
-- (Uncomment if you have a user_number column with sequence)
-- ALTER SEQUENCE IF EXISTS profiles_user_number_seq RESTART WITH 1;

-- 3. Reset any related tables that track user activity
DELETE FROM public.activity_log;
DELETE FROM public.audit_logs WHERE resource_type = 'profiles';

-- 4. Reset community/social features
DELETE FROM public.community_posts;
DELETE FROM public.community_post_likes;
DELETE FROM public.community_post_comments;
DELETE FROM public.followers;

-- 5. Reset referrals and credits
DELETE FROM public.referrals;
DELETE FROM public.credits_ledger;
DELETE FROM public.customer_credits;

-- 6. Reset bookings and appointments
DELETE FROM public.bookings;
DELETE FROM public.appointments;

-- 7. Reset messages
DELETE FROM public.messages;

-- 8. Reset job applications
DELETE FROM public.artist_job_applications;

-- After this migration, you can check user count with:
-- SELECT COUNT(*) AS total_users FROM public.profiles;
-- SELECT id, email, full_name, created_at FROM public.profiles ORDER BY created_at DESC;