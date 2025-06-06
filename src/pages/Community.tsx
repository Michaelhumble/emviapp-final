
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Crown, TrendingUp, Star, MessageCircle, Heart, Award, Zap, Target, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Community = () => {
  const [memberCount, setMemberCount] = useState(12847);
  const [revenue, setRevenue] = useState(2847392);
  const [posts, setPosts] = useState(1284);

  // Animate live counters
  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount(prev => prev + Math.floor(Math.random() * 3));
      setRevenue(prev => prev + Math.floor(Math.random() * 150));
      setPosts(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Nail Artist",
      avatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      content: "This community changed my life! I went from $3K to $15K monthly revenue in just 6 months.",
      earnings: "+400% revenue"
    },
    {
      name: "Maria Rodriguez",
      role: "Salon Owner",
      avatar: "/lovable-uploads/c25453c7-588e-4544-99da-5b21cf64bf20.png",
      content: "The networking here is incredible. I've partnered with 5 artists who are now my top performers.",
      earnings: "5 new hires"
    },
    {
      name: "Jessica Kim",
      role: "Lash Artist",
      avatar: "/lovable-uploads/d1abc88d-ed4e-4e7f-91d7-04104efd6ce6.png",
      content: "From struggling freelancer to booked solid for 3 months ahead. The strategies here work!",
      earnings: "Booked 3 months"
    }
  ];

  const benefits = [
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Exclusive Access",
      description: "VIP-only strategies and insider secrets from top 1% earners"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Proven Growth Methods",
      description: "Step-by-step blueprints that guarantee 300%+ revenue increase"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Elite Network",
      description: "Connect with millionaire salon owners and top-earning artists"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Daily Masterclasses",
      description: "Live training sessions with industry legends and success coaches"
    }
  ];

  const stats = [
    {
      label: "Active Members",
      value: memberCount.toLocaleString(),
      change: "+847 this week",
      icon: <Users className="h-5 w-5" />
    },
    {
      label: "Total Revenue Generated",
      value: `$${revenue.toLocaleString()}`,
      change: "+$12K today",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      label: "Success Stories",
      value: posts.toLocaleString(),
      change: "+23 today",
      icon: <Star className="h-5 w-5" />
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <motion.section 
          className="relative px-4 py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-indigo-600/10 rounded-3xl mx-4" />
          
          <div className="relative max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-lg">
              <Crown className="w-4 h-4 mr-2" />
              Exclusive Beauty Billionaires Club
            </Badge>
            
            <h1 className="text-6xl font-playfair font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Join the Elite 1%
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The most exclusive community for beauty professionals who refuse to settle for average. 
              Transform your passion into a million-dollar empire alongside industry legends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                <Crown className="w-5 h-5 mr-2" />
                Apply for Membership
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full">
                Watch Success Stories
              </Button>
            </div>

            {/* Scarcity Banner */}
            <motion.div 
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full inline-block font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥 Only 153 spots left this month - Applications close in 72 hours
            </motion.div>
          </div>
        </motion.section>

        {/* Live Stats */}
        <motion.section 
          className="px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-center mb-12">
              Live Community Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white">
                          {stat.icon}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                      <p className="text-gray-600 mb-2">{stat.label}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {stat.change}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section 
          className="px-4 py-16 bg-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">
              What Makes Us Different
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white flex-shrink-0">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          className="px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-playfair font-bold text-center mb-4">
              Success Stories That Inspire
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16">
              Real results from real members who dared to dream bigger
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full bg-gradient-to-br from-white to-indigo-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                      
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {testimonial.earnings}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="px-4 py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-playfair font-bold mb-6">
              Your Empire Awaits
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              Stop dreaming about success and start building it. Join the most exclusive beauty community today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl">
                <Crown className="w-5 h-5 mr-2" />
                Start Your Application
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full">
                Schedule Call with Expert
              </Button>
            </div>

            <p className="text-sm opacity-75">
              💎 Lifetime access • 🔥 30-day money-back guarantee • 👑 VIP support included
            </p>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Community;
