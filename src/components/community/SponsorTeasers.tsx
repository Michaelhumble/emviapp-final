
// COMMUNITY PAGE UPDATE - Enhanced sponsor teasers with premium club feel
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Zap, Crown, Sparkles, Users } from 'lucide-react';
import CTAButton from './CTAButton';
import PremiumTooltips from './PremiumTooltips';

const SponsorTeasers = () => {
  const teasers = [
    {
      id: 1,
      title: "🏆 Elite Artist Contest",
      description: "Showcase your masterpiece and win $1,000 cash prize plus VIP spotlight featuring!",
      gradient: "from-yellow-400 via-orange-400 to-red-500",
      ctaType: "enter_contest" as const,
      ctaText: "Enter Contest",
      prize: "$1,000 Prize",
      badge: "🔥 Hot",
      members: "2.3k entered"
    },
    {
      id: 2,
      title: "⚡ Premium Tools VIP Access",
      description: "Be among the first 100 to experience our revolutionary AI-powered salon management suite.",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      ctaType: "join_waitlist" as const,
      ctaText: "Join VIP List",
      prize: "Exclusive",
      badge: "👑 VIP",
      members: "47 spots left"
    },
    {
      id: 3,
      title: "💎 Founder's Circle Launch",
      description: "Lifetime premium access, priority support, exclusive networking events, and founder-level perks.",
      gradient: "from-blue-500 via-cyan-400 to-teal-500",
      ctaType: "upgrade_premium" as const,
      ctaText: "Join Circle",
      prize: "Lifetime Access",
      badge: "💎 Elite",
      members: "invite only"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Exclusive Opportunities
            </h2>
            <Crown className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Elite opportunities for our most trusted community members. Limited access, unlimited potential.
          </p>
          <motion.div
            animate={{ pulse: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mt-4"
          >
            <Users className="h-4 w-4" />
            <span>3,247 members already joined</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {teasers.map((teaser, index) => (
            <motion.div
              key={teaser.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                y: -12, 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                scale: 1.02
              }}
              className="relative group"
            >
              <PremiumTooltips 
                type={teaser.id === 3 ? 'vip' : 'premium'}
                message={`${teaser.badge} - ${teaser.members}`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden relative h-full">
                  {/* Gradient background overlay */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${teaser.gradient}`} />
                  </div>

                  {/* Badge and Prize */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`bg-gradient-to-r ${teaser.gradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                      {teaser.badge}
                    </div>
                    <div className={`bg-gradient-to-r ${teaser.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {teaser.prize}
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-r ${teaser.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {teaser.id === 1 && <Crown className="h-7 w-7 text-white" />}
                      {teaser.id === 2 && <Zap className="h-7 w-7 text-white" />}
                      {teaser.id === 3 && <Gift className="h-7 w-7 text-white" />}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {teaser.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {teaser.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-2 mb-6">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{teaser.members}</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2" />
                      <span className="text-sm text-green-600 font-medium">Live</span>
                    </div>

                    {/* CTA Button */}
                    <CTAButton
                      type={teaser.ctaType}
                      className={`w-full bg-gradient-to-r ${teaser.gradient} hover:opacity-90 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group-hover:scale-105`}
                    >
                      <span>{teaser.ctaText}</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </CTAButton>

                    {/* Urgency Indicator */}
                    <motion.div 
                      className="mt-4 text-center"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
                        ⏰ Limited Time • {teaser.id === 2 ? 'Spots Filling Fast' : 'Act Now'}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </PremiumTooltips>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Want Access to More Elite Opportunities?
            </h4>
            <p className="text-gray-600 mb-6">
              Join 3,200+ beauty professionals in our exclusive VIP community
            </p>
            <CTAButton
              type="join_waitlist"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl"
            >
              <Crown className="h-4 w-4 mr-2" />
              Join VIP Community
            </CTAButton>
            <p className="text-xs text-gray-500 mt-3">
              🎁 VIP members get early access to all opportunities + exclusive perks
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorTeasers;
