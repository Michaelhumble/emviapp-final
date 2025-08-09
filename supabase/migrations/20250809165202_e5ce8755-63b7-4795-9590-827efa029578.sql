-- Optimize availability queries
CREATE INDEX IF NOT EXISTS idx_artist_for_hire_available_updated
  ON public.artist_for_hire_profiles (available_for_work, updated_at DESC);

-- Seed up to 50 Artist For Hire profiles by mapping to existing profiles
WITH seed AS (
  SELECT * FROM (VALUES
    -- ===== AVAILABLE (<= 25 rows; updated within last 60 days) =====
    -- 1-15: Nails (60% overall target; 15 here, 15 in unavailable)
    ('Nails','Houston, TX','Available for Work', true,  '2025-08-05'::date),
    ('Nails','San Jose, CA','Accepting new clients', true, '2025-08-04'::date),
    ('Nails','Orange County, CA','Graduated from OC Beauty Academy', true, '2025-07-30'::date),
    ('Nails','Atlanta, GA','Currently accepting salon offers', true, '2025-08-02'::date),
    ('Nails','New York, NY','Open for booth rental', true, '2025-07-28'::date),
    ('Nails','Boston, MA','Available for Work', true, '2025-07-26'::date),
    ('Nails','Miami, FL','Accepting new clients', true, '2025-08-01'::date),
    ('Nails','Orlando, FL','Portfolio ready — Available now', true, '2025-07-25'::date),
    ('Nails','Tampa, FL','Available for Work', true, '2025-07-24'::date),
    ('Nails','Chicago, IL','Open to full-time or part-time', true, '2025-08-03'::date),
    ('Nails','Seattle, WA','Accepting new clients', true, '2025-07-31'::date),
    ('Nails','Phoenix, AZ','Available for Work', true, '2025-07-29'::date),
    ('Nails','Denver, CO','Graduated from Elevate Beauty Institute', true, '2025-07-27'::date),
    ('Nails','Las Vegas, NV','Available for Work', true, '2025-08-06'::date),
    ('Nails','San Diego, CA','Accepting new clients', true, '2025-08-07'::date),
    -- 16-25: Other categories (2 each: Hair, Lashes, Makeup, Massage, Skin)
    ('Hair','Dallas, TX','Color specialist — Available now', true, '2025-08-04'::date),
    ('Hair','Austin, TX','Open to new clients', true, '2025-07-30'::date),
    ('Lashes','Portland, OR','Classic & Volume — Available', true, '2025-07-29'::date),
    ('Lashes','Sacramento, CA','Accepting new clients', true, '2025-07-27'::date),
    ('Makeup','San Francisco, CA','Graduated from SF Beauty Institute', true, '2025-07-26'::date),
    ('Makeup','Nashville, TN','Bridal specialist — Available', true, '2025-08-01'::date),
    ('Massage','Charlotte, NC','Deep tissue — Available now', true, '2025-07-25'::date),
    ('Massage','Minneapolis, MN','Accepting new clients', true, '2025-07-24'::date),
    ('Skin','Detroit, MI','Licensed esthetician — Available', true, '2025-07-23'::date),
    ('Skin','Columbus, OH','Dermaplaning & facials — Available', true, '2025-07-22'::date),

    -- ===== UNAVAILABLE (<= 25 rows; updated older than 60 days) =====
    -- 26-40: Nails (15 entries)
    ('Nails','Raleigh, NC','Recently Hired', false, '2025-05-01'::date),
    ('Nails','Washington, DC','Booked out', false, '2025-04-15'::date),
    ('Nails','Baltimore, MD','Waitlist only', false, '2025-04-28'::date),
    ('Nails','Philadelphia, PA','Recently Hired', false, '2025-05-05'::date),
    ('Nails','Pittsburgh, PA','Booked out', false, '2025-03-20'::date),
    ('Nails','New Orleans, LA','Recently Hired', false, '2025-05-10'::date),
    ('Nails','Birmingham, AL','Contracted through summer', false, '2025-04-05'::date),
    ('Nails','Memphis, TN','Booked out', false, '2025-03-30'::date),
    ('Nails','Salt Lake City, UT','Recently Hired', false, '2025-04-22'::date),
    ('Nails','Boise, ID','Booked out', false, '2025-03-15'::date),
    ('Nails','Cleveland, OH','Waitlist only', false, '2025-04-18'::date),
    ('Nails','Cincinnati, OH','Recently Hired', false, '2025-05-06'::date),
    ('Nails','Madison, WI','Booked out', false, '2025-04-08'::date),
    ('Nails','Milwaukee, WI','Recently Hired', false, '2025-05-12'::date),
    ('Nails','Honolulu, HI','Booked out', false, '2025-03-25'::date),
    -- 41-50: Other categories (2 each)
    ('Hair','Kansas City, MO','Booked out', false, '2025-04-02'::date),
    ('Hair','Fort Worth, TX','Recently Hired', false, '2025-04-20'::date),
    ('Lashes','St. Louis, MO','Waitlist only', false, '2025-04-12'::date),
    ('Lashes','Fresno, CA','Booked out', false, '2025-03-28'::date),
    ('Makeup','Indianapolis, IN','Recently Hired', false, '2025-04-24'::date),
    ('Makeup','Tulsa, OK','Booked out', false, '2025-04-10'::date),
    ('Massage','Omaha, NE','Recently Hired', false, '2025-04-05'::date),
    ('Massage','San Antonio, TX','Booked out', false, '2025-04-30'::date),
    ('Skin','Albuquerque, NM','Recently Hired', false, '2025-04-14'::date),
    ('Skin','Louisville, KY','Waitlist only', false, '2025-03-22'::date)
  ) AS t(specialties, location, headline, available_for_work, updated_at)
),
-- Free profiles without an existing for-hire record
candidates AS (
  SELECT p.id AS user_id,
         ROW_NUMBER() OVER (ORDER BY p.created_at DESC) AS rn
  FROM public.profiles p
  LEFT JOIN public.artist_for_hire_profiles a ON a.user_id = p.id
  WHERE a.user_id IS NULL
),
numbered_seed AS (
  SELECT s.*, ROW_NUMBER() OVER () AS rn
  FROM seed s
),
ins AS (
  INSERT INTO public.artist_for_hire_profiles (
    user_id, specialties, location, headline, available_for_work, updated_at
  )
  SELECT c.user_id,
         ns.specialties,
         ns.location,
         ns.headline,
         ns.available_for_work,
         ns.updated_at
  FROM numbered_seed ns
  JOIN candidates c ON c.rn = ns.rn
  RETURNING 1
)
SELECT COUNT(*) AS inserted_rows FROM ins;