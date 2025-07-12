import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, DollarSign, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SuccessStoriesCarousel = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const successStories = [
    {
      name: "Maria Rodriguez",
      role: "Senior Nail Technician",
      avatar: "👩🏻‍💼",
      story: "Found my dream salon in just 2 days! The posting was so detailed and the owner reached out immediately.",
      stats: { days: 2, salary: "$65k+", location: "Beverly Hills" },
      highlight: "Hired in 2 days!"
    },
    {
      name: "Jessica Chen",
      role: "Hair Stylist",
      avatar: "👩🏻‍🦱",
      story: "EmviApp connected me with an upscale salon that values creativity. My income doubled!",
      stats: { days: 5, salary: "$80k+", location: "Manhattan" },
      highlight: "Doubled income!"
    },
    {
      name: "Ashley Thompson",
      role: "Lash Artist",
      avatar: "👩🏼‍💻",
      story: "The quality of salons on EmviApp is amazing. I found the perfect team that shares my passion.",
      stats: { days: 3, salary: "$55k+", location: "Miami" },
      highlight: "Perfect team match!"
    },
    {
      name: "Sophia Williams",
      role: "Massage Therapist",
      avatar: "👩🏽‍⚕️",
      story: "Within a week, I had 4 offers! The platform made it so easy to showcase my skills.",
      stats: { days: 7, salary: "$70k+", location: "Austin" },
      highlight: "4 offers in 1 week!"
    },
    {
      name: "Emma Johnson",
      role: "Esthetician",
      avatar: "👩🏻‍🔬",
      story: "Found an amazing spa that offered signing bonus and full benefits. Best career move ever!",
      stats: { days: 4, salary: "$60k+", location: "Seattle" },
      highlight: "Signing bonus included!"
    }
  ];

  // Auto-rotate stories
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 rounded-full mb-4">
          <Star className="w-5 h-5 text-green-500" />
          <span className="text-green-600 font-semibold text-sm">SUCCESS STORIES</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
          Real People, Real Results
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          See how EmviApp is changing careers and lives in the beauty industry
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Card className="overflow-hidden border-2 border-green-200/50 bg-gradient-to-br from-white to-green-50/30 dark:from-slate-800 dark:to-slate-700 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              {/* Avatar and name */}
              <div className="mb-6">
                <div className="text-6xl mb-4">{story.avatar}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{story.name}</h3>
                <p className="text-lg text-green-600 font-semibold">{story.role}</p>
              </div>

              {/* Highlight badge */}
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                ⚡ {story.highlight}
              </div>

              {/* Story */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic leading-relaxed mb-8 max-w-3xl mx-auto">
                "{story.story}"
              </blockquote>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-700/50 p-4 rounded-xl border border-green-200">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">{story.stats.days} days</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">to hire</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-700/50 p-4 rounded-xl border border-green-200">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">{story.stats.salary}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">annual</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-700/50 p-4 rounded-xl border border-green-200">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">{story.stats.location}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">location</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <button
          onClick={prevStory}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 p-3 rounded-full shadow-lg border border-gray-200 dark:border-slate-600 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={nextStory}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 p-3 rounded-full shadow-lg border border-gray-200 dark:border-slate-600 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {successStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStory
                  ? 'bg-green-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground text-center mt-6">
          Testimonials are representative examples.
        </p>
      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;