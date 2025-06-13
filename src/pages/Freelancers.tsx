import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Heart, 
  MessageSquare, 
  Share, 
  TrendingUp,
  Users,
  Star,
  Zap,
  Calendar,
  Trophy,
  Target,
  Gift,
  Award,
  BookOpen,
  Video,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import new components
import InteractiveStorytelling from '@/components/community/InteractiveStorytelling';
import AchievementLeaderboard from '@/components/community/AchievementLeaderboard';
import CuratedLearningHub from '@/components/community/CuratedLearningHub';
import ExpertLiveQA from '@/components/community/ExpertLiveQA';

const BeautyCommunityPage = () => {
  const [activeSection, setActiveSection] = useState('feed');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for posts
  const mockPosts = [
    {
      id: 1,
      author: "Sarah Kim",
      avatar: "/api/placeholder/40/40",
      timeAgo: "2 hours ago",
      content: "Just completed my first major nail art competition! The experience was incredible and I learned so much from other talented artists. Thank you to everyone who supported me! 💅✨",
      image: "/api/placeholder/300/200",
      likes: 47,
      comments: 12,
      shares: 5,
      tags: ["nailart", "competition", "grateful"]
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "/lovable-uploads/avatar2.jpg",
      time: "4 hours ago",
      content: "Opened my second salon location today! Dreams do come true with hard work and this amazing community's support 💪",
      likes: 89,
      comments: 23,
      category: "wins"
    },
    {
      id: 3,
      author: "Luna Rodriguez",
      avatar: "/lovable-uploads/avatar3.jpg",
      time: "6 hours ago",
      content: "Looking for a nail artist to collaborate on a photoshoot next week in downtown LA. Split the portfolio benefits!",
      likes: 15,
      comments: 12,
      category: "collaboration"
    }
  ];

  const quickStats = [
    { label: "Active Members", value: "12,847", icon: <Users className="h-5 w-5" />, color: "text-blue-600" },
    { label: "Stories Shared", value: "3,291", icon: <Heart className="h-5 w-5" />, color: "text-red-600" },
    { label: "Learning Hours", value: "45,672", icon: <BookOpen className="h-5 w-5" />, color: "text-green-600" },
    { label: "Live Sessions", value: "156", icon: <Video className="h-5 w-5" />, color: "text-purple-600" }
  ];

  const navigationSections = [
    { id: 'feed', label: 'Community Feed', icon: <Users className="h-4 w-4" /> },
    { id: 'stories', label: 'Stories', icon: <Heart className="h-4 w-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="h-4 w-4" /> },
    { id: 'learning', label: 'Learning Hub', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'live-qa', label: 'Live Q&A', icon: <Video className="h-4 w-4" /> },
    { id: 'mentorship', label: 'Mentorship', icon: <Award className="h-4 w-4" /> },
    { id: 'analytics', label: 'My Analytics', icon: <BarChart3 className="h-4 w-4" /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'stories':
        return <InteractiveStorytelling />;
      case 'achievements':
        return <AchievementLeaderboard />;
      case 'learning':
        return <CuratedLearningHub />;
      case 'live-qa':
        return <ExpertLiveQA />;
      case 'mentorship':
        return <MentorshipProgram />;
      case 'analytics':
        return <PersonalAnalytics />;
      default:
        return <CommunityFeed />;
    }
  };

  // Community Feed Component
  const CommunityFeed = () => (
    <div className="space-y-6">
      {/* Quick Post Composer */}
      <Card className="border-2 border-dashed border-purple-200 hover:border-purple-300 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
            <input
              type="text"
              placeholder="Share your journey, ask questions, or celebrate wins..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Success Ticker */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Live Success Feed</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span><strong>Maria R.</strong> just got hired at Elite Nails Salon! 🎉</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span><strong>David K.</strong> earned 500 community points for helping others</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span><strong>Sophie L.</strong> completed Advanced Color Theory course</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Posts */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-900">{post.author}</h4>
                  <p className="text-sm text-gray-500">{post.timeAgo}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              {post.image && (
                <img src={post.image} alt="Post content" className="w-full h-64 object-cover rounded-lg mb-4" />
              )}
              
              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                  <Share className="h-4 w-4" />
                  {post.shares}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Mentorship Program Component
  const MentorshipProgram = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Mentorship Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Connect with experienced professionals or share your knowledge with newcomers. 
            Our mentorship program helps build meaningful professional relationships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Find a Mentor
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Become a Mentor
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Mentor Matching Interface would go here */}
      <div className="text-center py-12 text-gray-500">
        <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Mentorship matching system coming soon!</p>
      </div>
    </div>
  );

  // Personal Analytics Component
  const PersonalAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Your Community Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">247</p>
              <p className="text-sm text-gray-600">Posts Liked</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Stories Shared</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">8.5h</p>
              <p className="text-sm text-gray-600">Learning Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed analytics would go here */}
      <div className="text-center py-12 text-gray-500">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Detailed analytics dashboard coming soon!</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Beauty Community
                </h1>
                <p className="text-gray-600">Connect, learn, and grow together</p>
              </div>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search community..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`${stat.color} mb-2 flex justify-center`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle className="text-lg">Community Sections</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {navigationSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          activeSection === section.id 
                            ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' 
                            : 'text-gray-700'
                        }`}
                      >
                        {section.icon}
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>

          {/* Sponsored Content Section */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Featured Partners
                  </CardTitle>
                  <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">SPONSORED</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">BeautyPro Tools</h3>
                    <p className="text-sm text-gray-600 mb-3">Professional-grade beauty tools at 20% off</p>
                    <Button size="sm" variant="outline">Learn More</Button>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">MasterClass Beauty</h3>
                    <p className="text-sm text-gray-600 mb-3">Advanced courses from industry experts</p>
                    <Button size="sm" variant="outline">Explore Courses</Button>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">CertifyPro</h3>
                    <p className="text-sm text-gray-600 mb-3">Get certified and boost your credentials</p>
                    <Button size="sm" variant="outline">Get Certified</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BeautyCommunityPage;
