-- Remove image URLs and clean up content from community posts
-- Remove emoji flags and photo references

UPDATE community_posts 
SET 
  image_urls = '{}',
  content = REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(content, '🇺🇸', ''),
            '🇬🇧', ''),
          '🇰🇷', ''),
        '🇯🇵', ''),
      '🇨🇦', ''),
    '🇦🇺', '');

-- Also remove any other flag emojis that might exist
UPDATE community_posts 
SET content = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(content, '🇩🇪', ''),
        '🇮🇪', ''),
      '🇸🇪', ''),
    '- Jess from LA', '- Jess'),
  '- Emma, Manchester', '- Emma');

-- Clean up location references 
UPDATE community_posts 
SET content = REGEXP_REPLACE(content, '- [^,]+, [A-Za-z ]+( \s+)?🏴|🇺🇸|🇬🇧|🇰🇷|🇯🇵|🇨🇦|🇦🇺|🇩🇪|🇮🇪|🇸🇪', '- Beauty Pro', 'g');

-- Remove any remaining flag emojis
UPDATE community_posts 
SET content = REGEXP_REPLACE(content, '\s+🏴[‍🏳️⚧️🏴‍☠️]*|[🇦-🇿]{2}', '', 'g');