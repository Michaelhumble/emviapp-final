
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, MapPin, Users, Crown, ArrowRight, Sparkles } from "lucide-react";

const FeaturedSalons = () => {
  const featuredSalons = [
    {
      id: 1,
      name: "Luxury Nails & Spa",
      location: "Beverly Hills, CA",
      rating: 4.9,
      reviews: 324,
      specialties: ["Luxury Manicures", "Spa Treatments", "Nail Art"],
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
      isPremium: true,
      hiringNow: true,
      industry: "nails"
    },
    {
      id: 2,
      name: "The Beauty Collective",
      location: "New York, NY",
      rating: 4.8,
      reviews: 256,
      specialties: ["Hair Styling", "Color", "Extensions"],
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      isPremium: false,
      hiringNow: true,
      industry: "hair"
    },
    {
      id: 3,
      name: "Gentleman's Barber Co.",
      location: "Austin, TX",
      rating: 4.9,
      reviews: 189,
      specialties: ["Classic Cuts", "Beard Grooming", "Hot Towel Shaves"],
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop",
      isPremium: true,
      hiringNow: false,
      industry: "barber"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Number Badge */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-full px-6 py-3 shadow-sm">
            <span className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
              8
            </span>
            <span className="text-emerald-700 font-semibold text-sm font-primary tracking-wide">
              Featured Opportunities
            </span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Featured Beauty{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Salons
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-primary">
            Discover exceptional salons with opportunities for talented beauty professionals
          </p>
        </motion.div>

        {/* Featured Salon Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredSalons.map((salon) => (
            <motion.div
              key={salon.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={salon.image}
                    alt={salon.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {salon.isPremium && (
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        Premium
                      </div>
                    )}
                    {salon.hiringNow && (
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Hiring Now
                      </div>
                    )}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="text-sm font-bold text-slate-900">{salon.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                    {salon.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-primary">{salon.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-primary">{salon.reviews} reviews</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {salon.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300"
                    >
                      View Opportunities
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                    
                    {/* Industry-specific CTA */}
                    <Link 
                      to={`/${salon.industry}`}
                      className="block"
                    >
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                      >
                        🔥 Claim Your Spot in {salon.industry === 'nails' ? 'Nails' : salon.industry === 'hair' ? 'Hair' : 'Barber'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-white to-emerald-50/50 p-8 md:p-12 rounded-3xl shadow-xl border border-emerald-100/60 max-w-2xl mx-auto">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex justify-center mb-6"
            >
              <Sparkles className="h-12 w-12 text-emerald-600" />
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4">
              Ready to find your dream salon?
            </h3>
            <p className="text-lg text-slate-600 mb-8 font-primary leading-relaxed">
              Explore hundreds of verified salons actively seeking talented professionals like you
            </p>
            
            <Link to="/salons">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="lg"
                  className="font-primary font-bold px-10 py-5 text-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <span>Explore All Salons</span>
                    <ArrowRight className="h-6 w-6" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSalons;
