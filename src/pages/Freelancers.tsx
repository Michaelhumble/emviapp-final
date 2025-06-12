
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ThumbsUp, 
  Pin, 
  TrendingUp, 
  HelpCircle,
  Users,
  Camera,
  Send,
  Filter,
  MapPin,
  Star,
  Award,
  Clock
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  category: string;
  hashtags: string[];
  likes: number;
  comments: number;
  isPinned?: boolean;
  isHot?: boolean;
  image?: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      role: 'Nail Artist',
      avatar: '/lovable-uploads/avatar1.png',
      verified: true
    },
    content: 'Just finished this amazing chrome set! 💎 Any tips for making chrome last longer? My clients love the look but want better durability. #ChromeNails #NailTech #Help',
    timestamp: '2 hours ago',
    category: 'Advice',
    hashtags: ['ChromeNails', 'NailTech', 'Help'],
    likes: 24,
    comments: 8,
    isHot: true,
    image: '/lovable-uploads/nail-art-chrome.jpg'
  },
  {
    id: '2',
    author: {
      name: 'Miguel Rodriguez',
      role: 'Barber',
      avatar: '/lovable-uploads/avatar2.png',
      verified: false
    },
    content: 'Looking for a talented tattoo artist in LA for a collaboration project. Wedding party wants coordinated hair + ink design. DM me! 🔥 #Collaboration #LA #Wedding',
    timestamp: '4 hours ago',
    category: 'Find Work',
    hashtags: ['Collaboration', 'LA', 'Wedding'],
    likes: 15,
    comments: 12,
    isPinned: true
  },
  {
    id: '3',
    author: {
      name: 'Luna Park',
      role: 'Lash Specialist',
      avatar: '/lovable-uploads/avatar3.png',
      verified: true
    },
    content: 'HUGE WIN! 🎉 Just hit my first $5K month thanks to the referrals from this amazing community. You all inspire me every day! Special shoutout to @Maria for the client recommendation 💕 #Wins #Grateful #LashLife',
    timestamp: '6 hours ago',
    category: 'Wins',
    hashtags: ['Wins', 'Grateful', 'LashLife'],
    likes: 67,
    comments: 23
  },
  {
    id: '4',
    author: {
      name: 'David Kim',
      role: 'Massage Therapist',
      avatar: '/lovable-uploads/avatar4.png',
      verified: true
    },
    content: 'Free workshop this Saturday: "Self-care for service providers" 🧘‍♂️ We give so much to our clients, but who takes care of us? Location: Downtown Community Center. Link in bio! #SelfCare #Workshop #MentalHealth',
    timestamp: '1 day ago',
    category: 'Local Meetups',
    hashtags: ['SelfCare', 'Workshop', 'MentalHealth'],
    likes: 43,
    comments: 16
  }
];

const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      author: 'Maria Santos',
      avatar: '/lovable-uploads/avatar5.png',
      content: 'Try using a quality base coat and let each layer cure completely! Also, avoid oil-based products around the nails.',
      timestamp: '1 hour ago',
      likes: 8
    },
    {
      id: 'c2',
      author: 'Jennifer Liu',
      avatar: '/lovable-uploads/avatar6.png',
      content: 'I use a chrome sealer top coat - game changer! DM me for the brand I recommend.',
      timestamp: '30 min ago',
      likes: 12
    }
  ]
};

const categories = [
  { id: 'all', name: 'All Posts', icon: Users },
  { id: 'advice', name: 'Advice', icon: HelpCircle },
  { id: 'find-work', name: 'Find Work', icon: TrendingUp },
  { id: 'promote', name: 'Promote Yourself', icon: Star },
  { id: 'meetups', name: 'Local Meetups', icon: MapPin },
  { id: 'wins', name: 'Wins & Success', icon: Award }
];

const trendingHashtags = ['#NailArt', '#Collaboration', '#SelfCare', '#BusinessTips', '#ChromeNails', '#Wedding'];

const FreelancersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPostContent, setNewPostContent] = useState('');
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const filteredPosts = selectedCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.category.toLowerCase().replace(' ', '-') === selectedCategory);

  const handleLikePost = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const onlineCount = 47; // Simulated online users

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Beauty Professional Community
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              This is a safe space for all beauty professionals to ask, share, and support each other. No question is too small. ☀️
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
                ))}
              </div>
              <span className="font-medium">{onlineCount} beauty pros online now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Categories
                  </h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Trending */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trendingHashtags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Coming Soon */}
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
                <CardHeader>
                  <h3 className="font-semibold text-purple-800">Coming Soon!</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-purple-700">
                    <p className="font-medium">🔥 Direct Messaging</p>
                    <p className="text-xs">Private chats with pros</p>
                  </div>
                  <div className="text-sm text-purple-700">
                    <p className="font-medium">🎯 Professional Matching</p>
                    <p className="text-xs">Find your perfect collaborator</p>
                  </div>
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                    Join Waitlist
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Create Post */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/lovable-uploads/default-avatar.png" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full text-left justify-start h-12 text-gray-500 bg-gray-50 hover:bg-gray-100"
                          >
                            What's on your mind? Share with the community...
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Share with the Community</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Ask a question, share a win, or start a discussion..."
                              value={newPostContent}
                              onChange={(e) => setNewPostContent(e.target.value)}
                              className="min-h-32"
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Camera className="w-4 h-4 mr-2" />
                                  Photo
                                </Button>
                                <Input placeholder="Add hashtags..." className="w-32" />
                              </div>
                              <Button>
                                <Send className="w-4 h-4 mr-2" />
                                Post
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pinned/Hot Posts Filter */}
              <div className="flex gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Pin className="w-3 h-3" />
                  Pinned
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Hot Now
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  Unanswered
                </Badge>
              </div>

              {/* Posts Feed */}
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.author.name}</h4>
                            {post.author.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500">{post.author.role}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {post.timestamp}
                            {post.isPinned && (
                              <Badge variant="default" className="text-xs">
                                <Pin className="w-3 h-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                            {post.isHot && (
                              <Badge variant="destructive" className="text-xs">
                                🔥 Hot
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-gray-800 leading-relaxed">{post.content}</p>
                        {post.image && (
                          <div className="mt-3 rounded-lg overflow-hidden">
                            <img 
                              src={post.image} 
                              alt="Post content" 
                              className="w-full max-h-64 object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.hashtags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between border-t pt-3">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                            className={likedPosts.has(post.id) ? 'text-red-500' : ''}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>

                      {/* Comments Section */}
                      {showComments === post.id && (
                        <div className="mt-4 border-t pt-4 space-y-3">
                          {mockComments[post.id]?.map(comment => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <p className="font-medium text-sm">{comment.author}</p>
                                  <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                  <span>{comment.timestamp}</span>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <ThumbsUp className="w-3 h-3 mr-1" />
                                    {comment.likes}
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                              <Input
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1"
                              />
                              <Button size="sm">Post</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center py-8">
                <Button variant="outline" size="lg">
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Inspired by Sunshine */}
        <div className="text-center py-6 border-t bg-white/50">
          <p className="text-sm text-gray-600">
            <span className="font-medium bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
              Inspired by Sunshine ☀️
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default FreelancersPage;
