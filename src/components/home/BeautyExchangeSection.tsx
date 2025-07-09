
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import IndustryPreviewSection from './IndustryPreviewSection';

const BeautyExchangeSection = () => {
  // Sparkle animation keyframes
  const sparkleVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.6, 1, 0.6],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/10 relative overflow-hidden">
      {/* Animated luxury sparkles around headline */}
      <motion.div
        className="absolute top-32 left-1/4 text-amber-400 text-2xl z-10"
        variants={sparkleVariants}
        animate="animate"
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-20 right-1/3 text-purple-400 text-xl z-10"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/4 text-rose-400 text-lg z-10"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: "3s" }}
      >
        ✨
      </motion.div>

      <div className="container mx-auto px-4 relative z-20">
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-800 leading-tight">
              The Future of Beauty Starts Here
            </h2>
            
            {/* Premium gradient underline */}
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
              style={{
                width: "70%",
                background: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
                boxShadow: "0 2px 8px rgba(139, 92, 246, 0.4)"
              }}
            />
          </div>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto">
            Emvi Beauty Connections™ unlocks instant access to the people, opportunities, and success you've always dreamed of—powered by AI, trusted by top salons, and loved by artists and clients everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* For Artists Card */}
          <motion.div 
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div 
              className="relative p-8 md:p-10 rounded-3xl backdrop-blur-xl border border-white/40 transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(252,248,255,0.9) 100%)",
                boxShadow: "0 20px 50px rgba(139,92,246,0.12), 0 0 0 1px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.4)"
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-20 w-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">✨</span>
                </div>
                
                <h3 className="font-playfair font-bold text-2xl md:text-3xl text-gray-800 mb-4 text-center leading-tight">
                  Become the Star—Never Settle for Less
                </h3>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium text-center mb-8 flex-grow">
                  Get discovered by dream salons, fill your calendar, set your rates, and finally earn what you're worth—no more "dead days" or feeling invisible.
                </p>
                
                <div className="text-center mt-auto">
                  <Link to="/auth/signup">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-2xl border-2 border-purple-200 hover:border-purple-400 bg-white/80 hover:bg-purple-50 transition-all duration-300 hover:scale-105"
                    >
                      Join Today <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Premium border glow on hover */}
              <div className="absolute inset-0 rounded-3xl border border-purple-300/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* For Salon Owners Card */}
          <motion.div 
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div 
              className="relative p-8 md:p-10 rounded-3xl backdrop-blur-xl border border-white/40 transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(248,250,255,0.9) 100%)",
                boxShadow: "0 20px 50px rgba(59,130,246,0.12), 0 0 0 1px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.4)"
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-20 w-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🏢</span>
                </div>
                
                <h3 className="font-playfair font-bold text-2xl md:text-3xl text-gray-800 mb-4 text-center leading-tight">
                  Build Your Dream Team, Fill Every Chair
                </h3>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium text-center mb-8 flex-grow">
                  Hire top talent on demand, grow loyal clientele, and unlock new revenue with smart automation—stop chasing, start thriving.
                </p>
                
                <div className="text-center mt-auto">
                  <Link to="/auth/signup">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-2xl border-2 border-blue-200 hover:border-blue-400 bg-white/80 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                    >
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Premium border glow on hover */}
              <div className="absolute inset-0 rounded-3xl border border-blue-300/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
          
          {/* For Clients Card */}
          <motion.div 
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div 
              className="relative p-8 md:p-10 rounded-3xl backdrop-blur-xl border border-white/40 transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(255,248,252,0.9) 100%)",
                boxShadow: "0 20px 50px rgba(236,72,153,0.12), 0 0 0 1px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.4)"
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-20 w-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">👤</span>
                </div>
                
                <h3 className="font-playfair font-bold text-2xl md:text-3xl text-gray-800 mb-4 text-center leading-tight">
                  Beauty On Your Terms, Every Time
                </h3>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium text-center mb-8 flex-grow">
                  Book trusted artists, explore the best salons near you, and enjoy flawless experiences—VIP beauty, tailored just for you.
                </p>
                
                <div className="text-center mt-auto">
                  <Link to="/auth/signup">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-2xl border-2 border-pink-200 hover:border-pink-400 bg-white/80 hover:bg-pink-50 transition-all duration-300 hover:scale-105"
                    >
                      Find Services <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Premium border glow on hover */}
              <div className="absolute inset-0 rounded-3xl border border-pink-300/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>

        {/* Industry Preview Sections */}
        <div className="space-y-16">
          {/* Nail Jobs Preview */}
          <IndustryPreviewSection
            industryName="Nail"
            displayName="Nail Tech"
            jobs={[
              {
                id: "nail-1",
                title: "TIM THỢ NAILS – Clawson, MI",
                location: "Clawson, MI",
                salary: "$1,200–$1,800/tuần",
                type: "gold",
                summary: "Khu Downtown, khách Mỹ trắng, tip hậu",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png"
              },
              {
                id: "nail-2", 
                title: "TIM THỢ NAILS – Humble, TX",
                location: "Humble, TX",
                salary: ">$2,000/tuần",
                type: "gold",
                summary: "Tiệm lớn nhất, chuyên design, 60 người",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-12.png"
              },
              {
                id: "nail-3",
                title: "Houston Premium Nails", 
                location: "Houston, TX",
                salary: "$800-$1,000/tuần",
                type: "premium",
                summary: "Full/part time, không cạnh tranh, vui vẻ",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(01).png"
              },
              {
                id: "nail-4",
                title: "Lake Tahoe Nails",
                location: "South Lake Tahoe, CA", 
                salary: "$1,600-$2,500+/tuần",
                type: "gold",
                summary: "Khách du lịch, giá cao, tip $3,000+/tháng",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png"
              }
            ]}
            routePath="/jobs"
            gradientColors="from-pink-50 to-purple-50"
            icon="💅"
          />

          {/* Hair Stylist Preview */}
          <IndustryPreviewSection
            industryName="Hair"
            displayName="Hair Stylist"
            jobs={[
              {
                id: "hair-1",
                title: "Senior Hair Stylist – Beverly Hills",
                location: "Beverly Hills, CA",
                salary: "$80,000-$120,000/year",
                type: "gold",
                summary: "Luxury salon, celebrity clientele, commission + tips",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated-hair-1.png"
              },
              {
                id: "hair-2",
                title: "Color Specialist – Manhattan",
                location: "New York, NY", 
                salary: "$60,000-$90,000/year",
                type: "premium",
                summary: "High-end salon, expert colorist needed",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated-hair-2.png"
              },
              {
                id: "hair-3",
                title: "Hair Stylist – Miami Beach",
                location: "Miami, FL",
                salary: "$45,000-$70,000/year", 
                type: "premium",
                summary: "Beachfront salon, fashion-forward styles",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated-hair-3.png"
              },
              {
                id: "hair-4",
                title: "Master Stylist – Austin",
                location: "Austin, TX",
                salary: "$50,000-$75,000/year",
                type: "gold", 
                summary: "Creative salon, music scene, artistic freedom",
                imageUrl: "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated-hair-4.png"
              }
            ]}
            routePath="/jobs/hair"
            gradientColors="from-blue-50 to-indigo-50"
            icon="✂️"
          />

          {/* All Industries CTA */}
          <motion.div 
            className="text-center bg-gradient-to-br from-gray-50 to-slate-100 rounded-3xl p-8 md:p-12 border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">
              🏢 Every Beauty Industry
            </h3>
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
              Barber, Makeup, Skincare, Tattoo, Eyebrow & Lash, Massage, and more. Discover opportunities across the entire beauty ecosystem.
            </p>
            <Link to="/jobs">
              <Button variant="outline" className="border-2 border-gray-400 text-gray-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300">
                Explore All Industries 🚀
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
