import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Heart, Users, Star, Award, BookOpen, MessageCircle, Camera, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CommunityAboutRulesProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommunityAboutRules: React.FC<CommunityAboutRulesProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'rules' | 'values'>('about');

  const communityStats = {
    members: "15,000+",
    posts: "45,000+",
    salons: "500+",
    artists: "3,200+"
  };

  const rules = [
    {
      icon: Heart,
      title: "Be Kind & Respectful",
      description: "Treat everyone with kindness and respect. We're all here to learn and grow together in the beauty community."
    },
    {
      icon: Camera,
      title: "Share Quality Content",
      description: "Post clear, relevant photos and meaningful captions. Share your work, tips, and inspiration with the community."
    },
    {
      icon: Shield,
      title: "No Spam or Self-Promotion",
      description: "Avoid excessive self-promotion. Share your work naturally and engage genuinely with others."
    },
    {
      icon: Users,
      title: "Support Each Other",
      description: "Give constructive feedback, celebrate others' success, and help newcomers feel welcome."
    },
    {
      icon: BookOpen,
      title: "Stay On Topic",
      description: "Keep posts relevant to beauty, nail art, hair, makeup, skincare, and salon life."
    },
    {
      icon: Flag,
      title: "Report Issues",
      description: "If you see content that violates our guidelines, please report it to help keep our community safe."
    }
  ];

  const values = [
    {
      icon: Star,
      title: "Excellence",
      description: "We celebrate craftsmanship, creativity, and the pursuit of excellence in beauty arts."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in lifting each other up, sharing knowledge, and growing together."
    },
    {
      icon: Heart,
      title: "Inclusivity",
      description: "Everyone is welcome here, regardless of skill level, background, or experience."
    },
    {
      icon: Award,
      title: "Recognition",
      description: "We celebrate achievements, milestones, and the unique talents of our members."
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-playfair font-bold mb-3 text-foreground">EmviApp Community</h2>
              <p className="text-xl font-inter text-primary font-medium mb-2">
                Welcome to the most supportive, professional, and inspiring beauty community in the world.
              </p>
              <p className="text-muted-foreground font-inter">Learn about our community guidelines and values</p>
            </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mt-6">
              {[
                { key: 'about', label: 'About', icon: Users },
                { key: 'rules', label: 'Community Rules', icon: Shield },
                { key: 'values', label: 'Our Values', icon: Heart }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.key}
                    variant={activeTab === tab.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab(tab.key as any)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full font-inter font-medium transition-all duration-300"
                  >
                    <IconComponent size={18} />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Community Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-2xl font-bold text-primary">{communityStats.members}</div>
                      <div className="text-sm text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/5 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{communityStats.artists}</div>
                      <div className="text-sm text-muted-foreground">Artists</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/5 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{communityStats.salons}</div>
                      <div className="text-sm text-muted-foreground">Salons</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/5 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{communityStats.posts}</div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                  </div>

                  <Card className="p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 border-0 shadow-lg">
                    <div className="text-center mb-6">
                      <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">Welcome to EmviApp Community</h3>
                      <p className="text-xl font-inter text-primary font-medium">
                        Welcome to the most supportive, professional, and inspiring beauty community in the world.
                      </p>
                    </div>
                    <div className="space-y-6 text-muted-foreground font-inter text-lg leading-relaxed">
                      <p>
                        EmviApp is the ultimate social platform for beauty professionals, artists, and enthusiasts. 
                        Our community brings together nail artists, hair stylists, makeup artists, salon owners, 
                        and beauty lovers from around the world.
                      </p>
                      <p>
                        Whether you're showcasing your latest creation, seeking inspiration, looking for career 
                        opportunities, or simply celebrating the art of beauty, you'll find your tribe here.
                      </p>
                      <p className="font-medium text-foreground">
                        We believe that beauty is an art form that deserves recognition, and every artist has a 
                        story worth sharing. Join us in building a supportive, inspiring, and inclusive community 
                        where creativity thrives.
                      </p>
                    </div>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Camera className="mr-2 text-primary" size={20} />
                        Share Your Art
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Post your nail art, hair creations, makeup looks, and salon transformations. 
                        Get feedback, inspire others, and build your following.
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Users className="mr-2 text-purple-500" size={20} />
                        Connect & Network
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Connect with other professionals, find collaboration opportunities, 
                        and build meaningful relationships in the beauty industry.
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <BookOpen className="mr-2 text-blue-500" size={20} />
                        Learn & Grow
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Access tutorials, tips, and educational content from industry experts. 
                        Participate in challenges and workshops to improve your skills.
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Award className="mr-2 text-yellow-500" size={20} />
                        Get Recognized
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Win weekly challenges, earn badges, climb leaderboards, and get featured 
                        in our spotlight sections for outstanding work.
                      </p>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeTab === 'rules' && (
                <motion.div
                  key="rules"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-10">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">Community Guidelines</h3>
                    <p className="text-lg font-inter text-muted-foreground">
                      These guidelines help us maintain a positive, supportive environment for everyone
                    </p>
                  </div>

                  <div className="space-y-4">
                    {rules.map((rule, index) => {
                      const IconComponent = rule.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start space-x-4">
                              <div className="p-3 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex-shrink-0 shadow-md">
                                <IconComponent className="text-white" size={20} />
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-playfair font-bold text-lg text-foreground">{rule.title}</h4>
                                <p className="font-inter text-muted-foreground leading-relaxed">{rule.description}</p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Card className="p-4 bg-yellow-50 border-yellow-200">
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="text-yellow-600 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Questions?</h4>
                        <p className="text-sm text-yellow-700">
                          If you have questions about our guidelines or need help with anything, 
                          please reach out to our community moderators or support team.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'values' && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-10">
                    <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-playfair font-bold mb-4 text-foreground">Our Core Values</h3>
                    <p className="text-lg font-inter text-muted-foreground">
                      These values guide everything we do and shape our community culture
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {values.map((value, index) => {
                      const IconComponent = value.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-8 h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="text-center">
                              <div className="p-4 bg-gradient-to-br from-primary to-purple-600 rounded-full inline-flex mb-6 shadow-lg">
                                <IconComponent className="text-white" size={32} />
                              </div>
                              <h4 className="font-playfair font-bold text-xl mb-4 text-foreground">{value.title}</h4>
                              <p className="font-inter text-muted-foreground leading-relaxed">{value.description}</p>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Card className="p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 text-center border-0 shadow-lg">
                    <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h4 className="font-playfair font-bold text-2xl mb-4 text-foreground">Join Our Mission</h4>
                    <p className="font-inter text-muted-foreground text-lg leading-relaxed mb-6">
                      Help us build the most supportive and inspiring beauty community in the world. 
                      Every post, like, comment, and share contributes to our shared vision.
                    </p>
                    <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 font-inter font-medium px-8 py-3 rounded-full shadow-lg">
                      Start Contributing Today
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommunityAboutRules;