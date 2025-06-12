
import FreelancerDashboardLayout from "@/components/dashboard/freelancer/FreelancerDashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Users, 
  Sparkles, 
  Star, 
  Trophy, 
  Play,
  ChevronRight,
  Calendar,
  Award,
  BookOpen,
  Headphones,
  Camera,
  MessageSquare
} from "lucide-react";
import { useState } from "react";

// Fixed TypeScript interface for posts
interface CommunityPost {
  id: number;
  author: string;
  role: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  trending?: boolean;
  pinned?: boolean;
  unanswered?: boolean;
}

export default function FreelancerDashboard() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [postContent, setPostContent] = useState("");
  const [onlineCount] = useState(2847);

  // Sample community posts with fixed TypeScript structure
  const communityPosts: CommunityPost[] = [
    {
      id: 1,
      author: "Sarah Chen",
      role: "Nail Artist",
      content: "Just finished this gorgeous set! Loving the new chrome technique I learned. Any tips for making it last longer? 💅✨",
      image: "/lovable-uploads/nail-art-example.jpg",
      likes: 124,
      comments: 18,
      timeAgo: "2 hours ago",
      trending: true,
      pinned: true
    },
    {
      id: 2,
      author: "Marcus Rodriguez",
      role: "Hair Stylist",
      content: "Looking for a color specialist to collaborate with in Miami area. I have a client wanting a complex rainbow ombre. Will split the fee 50/50!",
      likes: 89,
      comments: 24,
      timeAgo: "4 hours ago",
      unanswered: true
    },
    {
      id: 3,
      author: "Elena Vasquez",
      role: "Lash Technician",
      content: "CELEBRATION TIME! 🎉 Just hit my first $10K month! Thank you to this amazing community for all the support and advice. You all made this possible!",
      likes: 256,
      comments: 67,
      timeAgo: "6 hours ago",
      trending: true
    },
    {
      id: 4,
      author: "David Kim",
      role: "Barber",
      content: "Question for the experienced barbers: What's your go-to technique for blending on thick, coarse hair? Client coming in tomorrow and I want to nail it!",
      likes: 45,
      comments: 31,
      timeAgo: "8 hours ago",
      unanswered: true
    }
  ];

  const categories = [
    "All Posts", "Advice", "Find Work", "Promote Yourself", 
    "Local Meetups", "Wins & Success", "Collaborations"
  ];

  const trendingHashtags = [
    "#NailArt", "#HairColor", "#LashExtensions", "#BeautyTips", 
    "#ClientWins", "#TechniqueShare", "#ProductReview"
  ];

  // User Spotlights Data
  const userSpotlights = [
    {
      name: "Maria Santos",
      role: "Master Esthetician",
      achievement: "Built 6-figure skincare practice",
      image: "/lovable-uploads/spotlight-1.jpg",
      story: "From working part-time to owning 3 locations"
    },
    {
      name: "James Thompson",
      role: "Celebrity Colorist",
      achievement: "Featured in Vogue Magazine",
      image: "/lovable-uploads/spotlight-2.jpg", 
      story: "Self-taught artist now styling A-list celebrities"
    },
    {
      name: "Aisha Patel",
      role: "Nail Entrepreneur", 
      achievement: "Launched successful nail line",
      image: "/lovable-uploads/spotlight-3.jpg",
      story: "Turned Instagram hobby into million-dollar brand"
    }
  ];

  // Weekly Challenges
  const weeklyChallenge = {
    title: "Holiday Glam Challenge",
    description: "Show us your most festive holiday look!",
    submissions: 156,
    timeLeft: "3 days left",
    prize: "$500 + Feature"
  };

  // Success Feed Data
  const successFeed = [
    "💰 Jessica M. just earned $1,200 this week!",
    "🎉 Carlos got hired at premium salon!",
    "⭐ Rachel reached 1000 Instagram followers!",
    "💎 Michael completed advanced certification!",
    "🏆 Sophia won local beauty competition!"
  ];

  // FAQ Data
  const faqs = [
    {
      question: "How do I get my first clients as a new artist?",
      answer: "Start by offering discounted services to friends and family, build a portfolio on social media, partner with local salons, and always ask satisfied clients for referrals."
    },
    {
      question: "What's the best way to price my services?",
      answer: "Research local market rates, factor in your experience level, costs, and desired profit margin. Start competitive and increase prices as you build clientele and expertise."
    },
    {
      question: "How can I handle difficult clients?",
      answer: "Stay professional, listen actively, set clear boundaries, document everything, and don't hesitate to refer them elsewhere if needed. Your mental health matters."
    },
    {
      question: "Should I work at a salon or go independent?",
      answer: "Salons offer stability and learning opportunities but take commission. Independence offers higher earnings but requires business skills. Consider your experience level and goals."
    },
    {
      question: "How do I build my social media presence?",
      answer: "Post consistently, use relevant hashtags, engage with other artists, share behind-the-scenes content, and always showcase your best work with good lighting."
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentSuccessIndex, setCurrentSuccessIndex] = useState(0);

  // Auto-rotate success feed
  useState(() => {
    const interval = setInterval(() => {
      setCurrentSuccessIndex((prev) => (prev + 1) % successFeed.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <FreelancerDashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Welcome to Your Beauty Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect, Inspire, Learn, and Grow Together
            </p>
            <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 w-fit mx-auto">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">{onlineCount.toLocaleString()} beauty pros online now</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
          {/* Start a Post Section */}
          <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    You
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder="What's on your mind? Share your story or ask a question!"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="mb-4 text-lg border-2 border-purple-200 focus:border-purple-500"
                  />
                  <div className="flex gap-2 justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        Poll
                      </Button>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Post to Community
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-8">
              {/* User Spotlights Carousel */}
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    Community Spotlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {userSpotlights.map((spotlight, index) => (
                      <div key={index} className="text-center p-4 bg-white/60 rounded-lg">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarFallback className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            {spotlight.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold">{spotlight.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{spotlight.role}</p>
                        <Badge variant="outline" className="mb-2">{spotlight.achievement}</Badge>
                        <p className="text-xs text-gray-500">{spotlight.story}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Challenge */}
              <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-emerald-500" />
                    Weekly Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-emerald-700">{weeklyChallenge.title}</h3>
                      <p className="text-gray-600">{weeklyChallenge.description}</p>
                    </div>
                    <Badge className="bg-emerald-500">{weeklyChallenge.prize}</Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span>📸 {weeklyChallenge.submissions} submissions</span>
                    <span>⏰ {weeklyChallenge.timeLeft}</span>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    Submit Entry
                  </Button>
                </CardContent>
              </Card>

              {/* Live Success Feed */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-green-700">Live Success Feed</span>
                  </div>
                  <p className="text-lg font-medium animate-fade-in">
                    {successFeed[currentSuccessIndex]}
                  </p>
                </CardContent>
              </Card>

              {/* Community Feed Filters */}
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category)}
                        className={activeCategory === category ? "bg-purple-500" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
              </Card>

              {/* Community Posts */}
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{post.author}</span>
                            <Badge variant="outline" className="text-xs">{post.role}</Badge>
                            {post.pinned && <Badge className="bg-yellow-500">📌 Pinned</Badge>}
                            {post.trending && <Badge className="bg-red-500">🔥 Trending</Badge>}
                            {post.unanswered && <Badge variant="outline" className="text-orange-600 border-orange-600">❓ Needs Answer</Badge>}
                            <span className="text-sm text-gray-500 ml-auto">{post.timeAgo}</span>
                          </div>
                          <p className="mb-4">{post.content}</p>
                          {post.image && (
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <div className="w-full h-48 bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center text-gray-600">
                                📸 Image Preview
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                              <Share2 className="h-4 w-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Interactive Tutorials Section */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Quick Learning Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/60 rounded-lg cursor-pointer hover:bg-white/80 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Play className="h-8 w-8 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">Perfect Winged Eyeliner</h3>
                          <p className="text-sm text-gray-600">5 min tutorial</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg cursor-pointer hover:bg-white/80 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Play className="h-8 w-8 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">Client Consultation Tips</h3>
                          <p className="text-sm text-gray-600">8 min tutorial</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience Sharing Module */}
              <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    Share Your Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    This is a safe space for all beauty professionals to share stories, lessons learned, and personal journeys. 
                    Your experience could inspire someone else's breakthrough! ✨
                  </p>
                  <Button className="bg-rose-500 hover:bg-rose-600">
                    Share Your Story
                  </Button>
                </CardContent>
              </Card>

              {/* Embedded Podcast Section */}
              <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-5 w-5 text-violet-500" />
                    Beauty Industry Podcast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/60 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Latest Episode: "Building Your Beauty Empire"</h3>
                    <p className="text-sm text-gray-600 mb-4">Featuring successful salon owner Maria Rodriguez sharing her journey from solo artist to multi-location success.</p>
                    <div className="flex items-center gap-4">
                      <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
                        <Play className="h-4 w-4 mr-2" />
                        Play Episode
                      </Button>
                      <span className="text-sm text-gray-500">42 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Q&A Starter Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions - New Member Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.slice(0, 5).map((faq, index) => (
                      <div key={index} className="border rounded-lg">
                        <button
                          className="w-full p-4 text-left hover:bg-gray-50 flex justify-between items-center"
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        >
                          <span className="font-medium">{faq.question}</span>
                          <ChevronRight className={`h-4 w-4 transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                        </button>
                        {expandedFaq === index && (
                          <div className="p-4 pt-0 text-gray-600">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Coming Soon Sections */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-yellow-600" />
                      Live Q&A Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Join weekly live sessions with industry experts!</p>
                    <Badge className="bg-yellow-500 mb-3">Coming Soon</Badge>
                    <br />
                    <Button variant="outline" className="border-yellow-500 text-yellow-700">
                      Join Waitlist
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-cyan-600" />
                      Group Chats & Private Discussions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Connect in specialized groups and private conversations!</p>
                    <Badge className="bg-cyan-500 mb-3">Coming Soon</Badge>
                    <br />
                    <Button variant="outline" className="border-cyan-500 text-cyan-700">
                      Early Access
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sponsored Partners Section */}
              <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
                <CardHeader>
                  <CardTitle className="text-center text-gray-600">
                    💎 Sponsored Partners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500">
                    <p className="mb-4">Premium placement for beauty industry partners</p>
                    <Button variant="outline" className="border-gray-400">
                      Become a Partner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Profiles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Trending Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          U{i}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">User {i}</p>
                        <p className="text-sm text-gray-500">Nail Artist</p>
                      </div>
                      <Button size="sm" variant="outline">Follow</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Hashtags */}
              <Card>
                <CardHeader>
                  <CardTitle>Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trendingHashtags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-purple-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reward System */}
              <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    Your Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500">🏆</Badge>
                      <span className="text-sm">Community Helper</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500">💎</Badge>
                      <span className="text-sm">Early Adopter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">⭐</Badge>  
                      <span className="text-sm">Active Member</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Polls & Trend Voting */}
              <Card>
                <CardHeader>
                  <CardTitle>What's the Next Big Trend?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Glass Skin Makeup", "Sustainable Beauty", "Virtual Consultations", "DIY Beauty Kits"].map((option, index) => (
                      <button key={index} className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="flex justify-between">
                          <span>{option}</span>
                          <span className="text-sm text-gray-500">{Math.floor(Math.random() * 30 + 10)}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Suggest New Trend
                  </Button>
                </CardContent>
              </Card>

              {/* Live Chat Teaser */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    Join the Chat!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Real-time conversations with beauty professionals worldwide.
                  </p>
                  <Badge className="bg-green-500 mb-3">Coming Soon</Badge>
                  <br />
                  <Button variant="outline" className="border-green-500 text-green-700" size="sm">
                    Get Notified
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Motivational Banner */}
        <div className="mt-16 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-8">
          <div className="max-w-4xl mx-auto text-center px-4">
            <p className="text-lg md:text-xl font-medium mb-2">
              "Every expert was once a beginner. Every pro was once an amateur. ✨"
            </p>
            <p className="text-sm opacity-80">Inspired by Sunshine ☀️</p>
          </div>
        </div>
      </div>
    </FreelancerDashboardLayout>
  );
}
