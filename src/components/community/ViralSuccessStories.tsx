
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Heart, Star, ExternalLink } from 'lucide-react';

const ViralSuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Jessica Park",
      role: "Nail Artist",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
      beforeImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=400",
      afterImage: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=400",
      story: "From doing nails in my kitchen to owning 3 luxury studios in 2 years. EmviApp connected me with celebrity clients and taught me to scale properly.",
      metrics: {
        before: "$2K/month",
        after: "$45K/month",
        growth: "2,150% increase"
      },
      timeframe: "24 months",
      highlight: "Featured in Vogue",
      viral: true
    },
    {
      id: 2,
      name: "Aaliyah Williams",
      role: "Lash Artist",
      location: "Atlanta, GA",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800",
      beforeImage: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=400",
      afterImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400",
      story: "Went from unemployed to booked 6 months out. The community taught me pricing strategies that changed everything. Now I mentor other artists.",
      metrics: {
        before: "$0/month",
        after: "$28K/month",
        growth: "6-month waitlist"
      },
      timeframe: "18 months",
      highlight: "500+ 5-star reviews",
      viral: false
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      role: "Hair Colorist",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
      beforeImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400",
      afterImage: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=400",
      story: "From salon employee to celebrity colorist for A-list clients. The networking here opened doors I never imagined. My DMs are flooded with bookings.",
      metrics: {
        before: "$4K/month",
        after: "$85K/month",
        growth: "2,025% increase"
      },
      timeframe: "30 months",
      highlight: "Celebrity clientele",
      viral: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full mb-6"
          >
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Viral Success Stories</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair"
          >
            Life-Changing Transformations
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Real members, real stories, real transformations that inspire millions
          </motion.p>
        </div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Story Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                      {story.name}
                    </h3>
                    <p className="text-purple-600 font-semibold">{story.role}</p>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <MapPin className="h-4 w-4" />
                      {story.location}
                    </div>
                  </div>
                  {story.viral && (
                    <div className="ml-auto bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      VIRAL
                    </div>
                  )}
                </div>

                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  "{story.story}"
                </blockquote>

                {/* Metrics */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 mb-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Before</div>
                      <div className="text-lg font-bold text-red-600">{story.metrics.before}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">After</div>
                      <div className="text-lg font-bold text-green-600">{story.metrics.after}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Growth</div>
                      <div className="text-lg font-bold text-purple-600">{story.metrics.growth}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {story.timeframe}
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {story.highlight}
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    Read Full Story
                  </button>
                </div>
              </div>

              {/* Before/After Images */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} relative`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <img
                      src={story.beforeImage}
                      alt="Before"
                      className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Before
                    </div>
                  </div>
                  <div className="relative group">
                    <img
                      src={story.afterImage}
                      alt="After"
                      className="w-full h-64 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      After
                    </div>
                  </div>
                </div>
                
                {/* Love Reactions */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">2.4K loves</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViralSuccessStories;
