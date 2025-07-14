-- Create additional tables for comprehensive community features

-- Community posts (enhanced version of community_stories)
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_urls TEXT[] DEFAULT '{}',
    video_url TEXT,
    post_type TEXT DEFAULT 'story' CHECK (post_type IN ('story', 'tip', 'tutorial', 'showcase', 'question')),
    tags TEXT[] DEFAULT '{}',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    category TEXT DEFAULT 'general' CHECK (category IN ('nails', 'hair', 'makeup', 'skincare', 'lashes', 'brows', 'massage', 'barber', 'tattoo', 'general')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post likes (track individual likes)
CREATE TABLE IF NOT EXISTS public.community_post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Enhanced comments for posts
CREATE TABLE IF NOT EXISTS public.community_post_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES public.community_post_comments(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community events
CREATE TABLE IF NOT EXISTS public.community_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type TEXT DEFAULT 'livestream' CHECK (event_type IN ('livestream', 'workshop', 'challenge', 'competition', 'meetup')),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    host_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    max_participants INTEGER,
    is_free BOOLEAN DEFAULT TRUE,
    price DECIMAL(10,2),
    image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event participants
CREATE TABLE IF NOT EXISTS public.community_event_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.community_events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'no_show')),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- User achievements and badges
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL,
    achievement_name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Community leaderboard
CREATE TABLE IF NOT EXISTS public.community_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    points INTEGER DEFAULT 0,
    posts_count INTEGER DEFAULT 0,
    likes_received INTEGER DEFAULT 0,
    comments_given INTEGER DEFAULT 0,
    referrals_count INTEGER DEFAULT 0,
    level_name TEXT DEFAULT 'Bronze',
    week_start DATE NOT NULL,
    month_start DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, week_start, month_start)
);

-- Enable RLS on all tables
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_leaderboard ENABLE ROW LEVEL SECURITY;

-- RLS Policies for community_posts
CREATE POLICY "Anyone can view community posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for community_post_likes
CREATE POLICY "Anyone can view post likes" ON public.community_post_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like posts" ON public.community_post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove their own likes" ON public.community_post_likes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for community_post_comments
CREATE POLICY "Anyone can view comments" ON public.community_post_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.community_post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.community_post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.community_post_comments FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for community_events
CREATE POLICY "Anyone can view events" ON public.community_events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON public.community_events FOR INSERT WITH CHECK (auth.uid() = host_user_id);
CREATE POLICY "Event hosts can update their events" ON public.community_events FOR UPDATE USING (auth.uid() = host_user_id);
CREATE POLICY "Event hosts can delete their events" ON public.community_events FOR DELETE USING (auth.uid() = host_user_id);

-- RLS Policies for community_event_participants
CREATE POLICY "Anyone can view event participants" ON public.community_event_participants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can register for events" ON public.community_event_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registrations" ON public.community_event_participants FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can cancel their own registrations" ON public.community_event_participants FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_achievements
CREATE POLICY "Anyone can view achievements" ON public.user_achievements FOR SELECT USING (true);
CREATE POLICY "System can award achievements" ON public.user_achievements FOR INSERT WITH CHECK (true);

-- RLS Policies for community_leaderboard
CREATE POLICY "Anyone can view leaderboard" ON public.community_leaderboard FOR SELECT USING (true);
CREATE POLICY "System can update leaderboard" ON public.community_leaderboard FOR INSERT WITH CHECK (true);
CREATE POLICY "System can update leaderboard data" ON public.community_leaderboard FOR UPDATE USING (true);

-- Create indexes for performance
CREATE INDEX idx_community_posts_user_id ON public.community_posts(user_id);
CREATE INDEX idx_community_posts_category ON public.community_posts(category);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at DESC);
CREATE INDEX idx_community_posts_trending ON public.community_posts(is_trending, created_at DESC);
CREATE INDEX idx_community_post_likes_post_id ON public.community_post_likes(post_id);
CREATE INDEX idx_community_post_comments_post_id ON public.community_post_comments(post_id);
CREATE INDEX idx_community_events_start_time ON public.community_events(start_time);
CREATE INDEX idx_community_leaderboard_points ON public.community_leaderboard(points DESC);

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post_comments;