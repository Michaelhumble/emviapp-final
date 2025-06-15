
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, Heart, Trophy } from 'lucide-react';

const SpotlightStories = () => {
  const stories = [
    {
      id: 1,
      name: "Maria Santos",
      role: "Hair Colorist",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=1926&auto=format&fit=crop",
      quote: "From struggling freelancer to booked 3 months out. EmviApp changed my entire life and gave me the confidence to charge what I'm worth.",
      achievement: "3x Revenue Growth",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      name: "Aaliyah Johnson",
      role: "Lash Artist",
      location: "Atlanta, GA",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1926&auto=format&fit=crop",
      quote: "I went from my bedroom to opening my own studio in 8 months. This community believed in me when I didn't believe in myself.",
      achievement: "Opened Dream Studio",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Isabella Chen",
      role: "Makeup Artist",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1926&auto=format&fit=crop",
      quote: "From wedding makeup to celebrity red carpets. The connections I made here opened doors I never imagined possible.",
      achievement: "Celebrity Clientele",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      name: "Sophia Rodriguez",
      role: "Nail Artist",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=1926&auto=format&fit=crop",
      quote: "My nail art went viral and now I have a waiting list of 200+ clients. This community taught me to dream bigger.",
      achievement: "200+ Waitlist",
      gradient: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Spotlight Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real members, real transformations, real success. These are the faces of the beauty revolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Achievement Badge */}
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${story.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                    <Trophy className="h-3 w-3" />
                    {story.achievement}
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-pink-300" />
                    <span className="text-pink-300 text-sm">{story.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                  <p className="text-pink-200 text-sm mb-3">{story.role}</p>
                  
                  <blockquote className="text-sm leading-relaxed italic">
                    "{story.quote}"
                  </blockquote>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Heart className="mr-2 h-5 w-5 inline" />
            Read More Success Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpotlightStories;
