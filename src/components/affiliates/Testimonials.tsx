import React from 'react';
import { motion } from 'framer-motion';
import SuccessStoryCard from './SuccessStoryCard';

const testimonials = [
  {
    name: "Maria Chen",
    role: "Salon Owner & Beauty Blogger",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2338bdf8'/%3e%3cstop offset='100%25' stop-color='%230284c7'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23a)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    earnings: "$12.4K",
    quote: "The EmviApp affiliate program is transparent and profitable. Monthly payouts are predictable. I've been able to scale my referrals from 5 to 40+ per month just by sharing with my salon network.",
    verified: true,
    highlight: true,
  },
  {
    name: "James Rodriguez",
    role: "Beauty Influencer (180K followers)",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='b' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2310b981'/%3e%3cstop offset='100%25' stop-color='%23059669'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23b)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    earnings: "$8.2K",
    quote: "Tracking just works, and commissions are always on time. The dashboard gives me real-time insights into what's converting. Best affiliate program I've ever promoted.",
    verified: true,
  },
  {
    name: "Sarah Kim",
    role: "Content Creator & Educator",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='c' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%238b5cf6'/%3e%3cstop offset='100%25' stop-color='%237c3aed'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23c)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    earnings: "$5.6K",
    quote: "It's the easiest way I've ever added income to my salon business. Setup took less than 10 minutes, and I got my first commission within 48 hours. The 90-day cookie window is unbeatable.",
    verified: true,
  },
  {
    name: "Alex Thompson",
    role: "Marketing Director",
    avatar: "data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='d' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23f59e0b'/%3e%3cstop offset='100%25' stop-color='%23d97706'/%3e%3c/linearGradient%3e%3c/defs%3e%3ccircle cx='32' cy='32' r='32' fill='url(%23d)'/%3e%3ccircle cx='32' cy='26' r='8' fill='white' opacity='0.9'/%3e%3cellipse cx='32' cy='45' rx='12' ry='8' fill='white' opacity='0.9'/%3e%3c/svg%3e",
    earnings: "$9.8K",
    quote: "Best affiliate program in the beauty space. Setup was incredibly simple. The deep linking features let me create targeted campaigns that convert 3x better than generic links.",
    verified: true,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Beauty Professionals
          </h2>
          <p className="text-lg text-[hsl(var(--ink-600))] max-w-2xl mx-auto">
            Real success stories from creators and salon owners growing their income
          </p>
        </motion.div>

        {/* Success Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <SuccessStoryCard
              key={index}
              {...testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-[hsl(var(--ink-600))]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">1,247+ Active Affiliates</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-black/10"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">$2.4M+ Paid Out</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-black/10"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">99.9% Uptime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;