-- Create function to get community leaderboard data
CREATE OR REPLACE FUNCTION public.get_community_leaderboard(
  period_start timestamp with time zone,
  limit_count integer DEFAULT 10
)
RETURNS TABLE(
  id uuid,
  full_name text,
  avatar_url text,
  total_likes bigint,
  total_posts bigint,
  ai_posts bigint,
  points integer,
  level text,
  first_ai_user boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  SET search_path = public;
  RETURN QUERY
  WITH user_stats AS (
    SELECT 
      p.id,
      p.full_name,
      p.avatar_url,
      COALESCE(SUM(cp.likes_count), 0) as total_likes,
      COUNT(cp.id) as total_posts,
      COUNT(cp.id) FILTER (WHERE 'AI' = ANY(cp.tags)) as ai_posts,
      -- Points calculation: 1 point per post, 2 points per like, 5 bonus for AI posts
      (COUNT(cp.id) + (COALESCE(SUM(cp.likes_count), 0) * 2) + (COUNT(cp.id) FILTER (WHERE 'AI' = ANY(cp.tags)) * 5))::integer as points,
      -- Simple level calculation based on points
      CASE 
        WHEN (COUNT(cp.id) + (COALESCE(SUM(cp.likes_count), 0) * 2) + (COUNT(cp.id) FILTER (WHERE 'AI' = ANY(cp.tags)) * 5)) > 1000 THEN 'Diamond'
        WHEN (COUNT(cp.id) + (COALESCE(SUM(cp.likes_count), 0) * 2) + (COUNT(cp.id) FILTER (WHERE 'AI' = ANY(cp.tags)) * 5)) > 500 THEN 'Platinum'
        WHEN (COUNT(cp.id) + (COALESCE(SUM(cp.likes_count), 0) * 2) + (COUNT(cp.id) FILTER (WHERE 'AI' = ANY(cp.tags)) * 5)) > 200 THEN 'Gold'
        WHEN (COUNT(cp.id) + (COALESCE(SUM(cp.likes_count), 0) * 2) + (COUNT(cp.id) FILTER (WHERE 'AI' = ANY(cp.tags)) * 5)) > 50 THEN 'Silver'
        ELSE 'Bronze'
      END as level,
      -- Check if user was among first 10 to use AI feature
      EXISTS(
        SELECT 1 FROM community_posts cp2 
        WHERE cp2.user_id = p.id 
        AND 'AI' = ANY(cp2.tags)
        AND cp2.created_at <= (
          SELECT cp3.created_at 
          FROM community_posts cp3 
          WHERE 'AI' = ANY(cp3.tags) 
          ORDER BY cp3.created_at 
          LIMIT 1 OFFSET 9
        )
      ) as first_ai_user
    FROM profiles p
    LEFT JOIN community_posts cp ON cp.user_id = p.id 
      AND cp.created_at >= period_start
    GROUP BY p.id, p.full_name, p.avatar_url
    HAVING COUNT(cp.id) > 0  -- Only include users with posts in the period
  )
  SELECT 
    user_stats.id,
    user_stats.full_name,
    user_stats.avatar_url,
    user_stats.total_likes,
    user_stats.total_posts,
    user_stats.ai_posts,
    user_stats.points,
    user_stats.level,
    user_stats.first_ai_user
  FROM user_stats
  ORDER BY user_stats.points DESC, user_stats.total_likes DESC
  LIMIT limit_count;
END;
$$;

-- Create function to get user rank
CREATE OR REPLACE FUNCTION public.get_user_rank(
  target_user_id uuid,
  period_start timestamp with time zone
)
RETURNS TABLE(
  rank bigint,
  points integer
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  SET search_path = public;
  RETURN QUERY
  WITH user_stats AS (
    SELECT 
      p.id,
      (COUNT(cp.id) + (COALESCE(SUM(cp.likes_count), 0) * 2) + (COUNT(cp.id) FILTER (WHERE 'AI' = ANY(cp.tags)) * 5))::integer as points
    FROM profiles p
    LEFT JOIN community_posts cp ON cp.user_id = p.id 
      AND cp.created_at >= period_start
    GROUP BY p.id
  ),
  ranked_users AS (
    SELECT 
      id,
      points,
      ROW_NUMBER() OVER (ORDER BY points DESC) as user_rank
    FROM user_stats
    WHERE points > 0
  )
  SELECT 
    ranked_users.user_rank as rank,
    ranked_users.points
  FROM ranked_users
  WHERE ranked_users.id = target_user_id;
END;
$$;