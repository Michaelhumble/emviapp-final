
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PremiumHeroSection = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });

  const liveStats = [
    { icon: Users, count: "847", label: "beauty pros online now" },
    { icon: TrendingUp, count: "23", label: "new members joined today" },
    { icon: Star, count: "156", label: "success stories shared this week" }
  ];

  const handleJoinCommunity = () => {
    setShowJoinModal(true);
  };

  const handleSubmitJoin = () => {
    if (!joinForm.name.trim() || !joinForm.email.trim()) {
      alert('Please fill in your name and email');
      return;
    }

    // Simulate joining the community
    alert(`Welcome to the community, ${joinForm.name}! We'll be in touch soon.`);
    setJoinForm({ name: '', email: '', role: '', message: '' });
    setShowJoinModal(false);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 py-20">
      {/* Hero Background Image */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1926&auto=format&fit=crop')`
          }}
        />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Beauty Community
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-6">
            Where talent meets opportunity. <span className="text-yellow-400 font-semibold">Authentically.</span>
          </p>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Join thousands of beauty professionals sharing their journey, supporting each other, and building genuine connections that last.
          </p>
        </motion.div>

        {/* Live Stats Ticker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {liveStats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
              <div className="flex items-center gap-2 text-white">
                <stat.icon className="h-5 w-5 text-yellow-400" />
                <span className="text-lg font-bold text-yellow-400">{stat.count}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <button 
            onClick={handleJoinCommunity}
            className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Join Our Inspiring Community
          </button>
        </motion.div>
      </div>

      {/* Join Community Modal */}
      <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Join Our Beauty Community</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Your name"
              value={joinForm.name}
              onChange={(e) => setJoinForm(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={joinForm.email}
              onChange={(e) => setJoinForm(prev => ({ ...prev, email: e.target.value }))}
            />
            <Input
              placeholder="Your role (e.g., Makeup Artist, Hair Stylist)"
              value={joinForm.role}
              onChange={(e) => setJoinForm(prev => ({ ...prev, role: e.target.value }))}
            />
            <Textarea
              placeholder="Tell us about yourself and why you'd like to join..."
              value={joinForm.message}
              onChange={(e) => setJoinForm(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSubmitJoin}
                disabled={!joinForm.name.trim() || !joinForm.email.trim()}
                className="flex-1"
              >
                Join Community
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowJoinModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PremiumHeroSection;
