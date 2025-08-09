-- Optimize queries used for FOMO gating
CREATE INDEX IF NOT EXISTS idx_artist_for_hire_available_updated
  ON public.artist_for_hire_profiles (available_for_work, updated_at DESC);

-- Seed 50 Artist For Hire profiles (25 available/active recent, 25 unavailable/stale)
-- Note: Names are generated in UI; we only store profile metadata here
WITH seed AS (
  -- 25 AVAILABLE (updated within last 30 days)
  SELECT gen_random_uuid()::uuid AS user_id, 'Nails'::text AS specialties, 'Houston, TX'::text AS location, 'Available for Work'::text AS headline, true AS available_for_work, (now() - interval '3 days') AS updated_at
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'San Jose, CA', 'Accepting new clients', true, now() - interval '7 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Orange County, CA', 'Graduated from OC Beauty Academy', true, now() - interval '10 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Atlanta, GA', 'Available for Work', true, now() - interval '12 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'New York, NY', 'Open to new clients', true, now() - interval '15 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Boston, MA', 'Available for Work', true, now() - interval '18 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Miami, FL', 'Accepting new clients', true, now() - interval '20 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Orlando, FL', 'Available for Work', true, now() - interval '22 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Tampa, FL', 'Open to new clients', true, now() - interval '25 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Chicago, IL', 'Available for Work', true, now() - interval '6 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Dallas, TX', 'Available for Work', true, now() - interval '8 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Austin, TX', 'Open to new clients', true, now() - interval '9 days'
  UNION ALL SELECT gen_random_uuid(), 'Lashes', 'Phoenix, AZ', 'Available for Work', true, now() - interval '13 days'
  UNION ALL SELECT gen_random_uuid(), 'Makeup', 'Seattle, WA', 'Accepting new clients', true, now() - interval '11 days'
  UNION ALL SELECT gen_random_uuid(), 'Massage', 'Portland, OR', 'Available for Work', true, now() - interval '5 days'
  UNION ALL SELECT gen_random_uuid(), 'Skin', 'Denver, CO', 'Open to new clients', true, now() - interval '14 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Las Vegas, NV', 'Available for Work', true, now() - interval '2 days'
  UNION ALL SELECT gen_random_uuid(), 'Lashes', 'San Diego, CA', 'Available for Work', true, now() - interval '4 days'
  UNION ALL SELECT gen_random_uuid(), 'Makeup', 'San Francisco, CA', 'Graduated from SF Beauty Institute', true, now() - interval '16 days'
  UNION ALL SELECT gen_random_uuid(), 'Massage', 'Sacramento, CA', 'Available for Work', true, now() - interval '17 days'
  UNION ALL SELECT gen_random_uuid(), 'Skin', 'Minneapolis, MN', 'Accepting new clients', true, now() - interval '19 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Detroit, MI', 'Available for Work', true, now() - interval '21 days'
  UNION ALL SELECT gen_random_uuid(), 'Lashes', 'Columbus, OH', 'Open to new clients', true, now() - interval '23 days'
  UNION ALL SELECT gen_random_uuid(), 'Makeup', 'Nashville, TN', 'Available for Work', true, now() - interval '24 days'
  UNION ALL SELECT gen_random_uuid(), 'Massage', 'Charlotte, NC', 'Accepting new clients', true, now() - interval '26 days'
  
  -- 25 UNAVAILABLE (older than 60 days)
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Raleigh, NC', 'Recently Hired', false, now() - interval '90 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Washington, DC', 'Booked out', false, now() - interval '120 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Baltimore, MD', 'Recently Hired', false, now() - interval '75 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Philadelphia, PA', 'Booked out', false, now() - interval '80 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Pittsburgh, PA', 'Recently Hired', false, now() - interval '130 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'New Orleans, LA', 'Recently Hired', false, now() - interval '95 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Birmingham, AL', 'Booked out', false, now() - interval '100 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Memphis, TN', 'Recently Hired', false, now() - interval '110 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Salt Lake City, UT', 'Recently Hired', false, now() - interval '85 days'
  UNION ALL SELECT gen_random_uuid(), 'Nails', 'Boise, ID', 'Booked out', false, now() - interval '140 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Albuquerque, NM', 'Recently Hired', false, now() - interval '70 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Kansas City, MO', 'Booked out', false, now() - interval '62 days'
  UNION ALL SELECT gen_random_uuid(), 'Lashes', 'St. Louis, MO', 'Recently Hired', false, now() - interval '66 days'
  UNION ALL SELECT gen_random_uuid(), 'Makeup', 'Indianapolis, IN', 'Booked out', false, now() - interval '72 days'
  UNION ALL SELECT gen_random_uuid(), 'Massage', 'Cleveland, OH', 'Recently Hired', false, now() - interval '78 days'
  UNION ALL SELECT gen_random_uuid(), 'Skin', 'Cincinnati, OH', 'Recently Hired', false, now() - interval '88 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Louisville, KY', 'Booked out', false, now() - interval '96 days'
  UNION ALL SELECT gen_random_uuid(), 'Lashes', 'Madison, WI', 'Recently Hired', false, now() - interval '102 days'
  UNION ALL SELECT gen_random_uuid(), 'Makeup', 'Milwaukee, WI', 'Booked out', false, now() - interval '108 days'
  UNION ALL SELECT gen_random_uuid(), 'Massage', 'Honolulu, HI', 'Recently Hired', false, now() - interval '115 days'
  UNION ALL SELECT gen_random_uuid(), 'Skin', 'San Antonio, TX', 'Booked out', false, now() - interval '82 days'
  UNION ALL SELECT gen_random_uuid(), 'Hair', 'Fort Worth, TX', 'Recently Hired', false, now() - interval '97 days'
  UNION ALL SELECT gen_random_uuid(), 'Lashes', 'Fresno, CA', 'Booked out', false, now() - interval '105 days'
  UNION ALL SELECT gen_random_uuid(), 'Makeup', 'Tulsa, OK', 'Recently Hired', false, now() - interval '112 days'
  UNION ALL SELECT gen_random_uuid(), 'Massage', 'Omaha, NE', 'Recently Hired', false, now() - interval '118 days'
)
INSERT INTO public.artist_for_hire_profiles (
  user_id, specialties, location, headline, available_for_work, updated_at, created_at, hourly_rate, bio, avatar_url, shifts_available, years_experience
)
SELECT 
  user_id, specialties, location, headline, available_for_work, updated_at, updated_at,
  NULL::text AS hourly_rate,
  NULL::text AS bio,
  NULL::text AS avatar_url,
  NULL::text AS shifts_available,
  NULL::text AS years_experience
FROM seed;