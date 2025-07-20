-- Fix category assignments for jobs based on title/description keywords
-- Update jobs with proper categories based on their content

-- Update barber jobs
UPDATE jobs 
SET category = 'barber'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%barber%' OR
    LOWER(title) LIKE '%barbershop%' OR
    LOWER(title) LIKE '%men''s grooming%' OR
    LOWER(description) LIKE '%barber%' OR
    LOWER(description) LIKE '%barbershop%'
  );

-- Update hair jobs
UPDATE jobs 
SET category = 'hair'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%hair stylist%' OR
    LOWER(title) LIKE '%hairstylist%' OR
    LOWER(title) LIKE '%hair%' OR
    LOWER(title) LIKE '%stylist%' OR
    LOWER(title) LIKE '%cosmetology%' OR
    LOWER(description) LIKE '%hair%' OR
    LOWER(description) LIKE '%styling%'
  )
  AND NOT (
    LOWER(title) LIKE '%barber%' OR
    LOWER(title) LIKE '%nail%' OR
    LOWER(title) LIKE '%lash%' OR
    LOWER(title) LIKE '%brow%'
  );

-- Update nail jobs
UPDATE jobs 
SET category = 'nails'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%nail%' OR
    LOWER(title) LIKE '%manicure%' OR
    LOWER(title) LIKE '%pedicure%' OR
    LOWER(description) LIKE '%nail%' OR
    LOWER(description) LIKE '%manicure%'
  );

-- Update brow & lash jobs
UPDATE jobs 
SET category = 'brows-lashes'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%lash%' OR
    LOWER(title) LIKE '%brow%' OR
    LOWER(title) LIKE '%eyebrow%' OR
    LOWER(title) LIKE '%microblading%' OR
    LOWER(title) LIKE '%lash extension%' OR
    LOWER(description) LIKE '%lash%' OR
    LOWER(description) LIKE '%brow%' OR
    LOWER(description) LIKE '%microblading%'
  );

-- Update massage jobs
UPDATE jobs 
SET category = 'massage'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%massage%' OR
    LOWER(title) LIKE '%spa%' OR
    LOWER(title) LIKE '%therapist%' OR
    LOWER(description) LIKE '%massage%' OR
    LOWER(description) LIKE '%therapeutic%'
  )
  AND NOT (
    LOWER(title) LIKE '%hair%' OR
    LOWER(title) LIKE '%nail%' OR
    LOWER(title) LIKE '%barber%'
  );

-- Update makeup jobs
UPDATE jobs 
SET category = 'makeup'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%makeup%' OR
    LOWER(title) LIKE '%cosmetic%' OR
    LOWER(title) LIKE '%beauty artist%' OR
    LOWER(description) LIKE '%makeup%' OR
    LOWER(description) LIKE '%cosmetic%'
  );

-- Update tattoo jobs
UPDATE jobs 
SET category = 'tattoo'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%tattoo%' OR
    LOWER(title) LIKE '%ink%' OR
    LOWER(title) LIKE '%piercing%' OR
    LOWER(description) LIKE '%tattoo%' OR
    LOWER(description) LIKE '%ink%'
  );

-- Update skincare/facial jobs
UPDATE jobs 
SET category = 'skincare'
WHERE (category = 'General' OR category = 'general' OR category IS NULL OR category = 'Other' OR category = 'other')
  AND (
    LOWER(title) LIKE '%esthetician%' OR
    LOWER(title) LIKE '%facial%' OR
    LOWER(title) LIKE '%skincare%' OR
    LOWER(title) LIKE '%skin care%' OR
    LOWER(description) LIKE '%facial%' OR
    LOWER(description) LIKE '%skincare%' OR
    LOWER(description) LIKE '%esthetician%'
  )
  AND NOT (
    LOWER(title) LIKE '%massage%' OR
    LOWER(title) LIKE '%hair%' OR
    LOWER(title) LIKE '%nail%'
  );

-- Create enum for valid categories to enforce data integrity
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_category') THEN
        CREATE TYPE job_category AS ENUM (
            'nails',
            'hair', 
            'barber',
            'brows-lashes',
            'massage',
            'makeup',
            'tattoo',
            'skincare',
            'general'
        );
    END IF;
END
$$;

-- Update jobs table to use the enum (this will fail if there are invalid categories)
-- First, let's see what we have after the updates
-- ALTER TABLE jobs ALTER COLUMN category TYPE job_category USING category::job_category;