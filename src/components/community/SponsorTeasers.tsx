
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Zap, Crown } from 'lucide-react';
import CTAButton from './CTAButton';

const SponsorTeasers = () => {
  const teasers = [
    {
      id: 1,
      title: "🏆 Artist of the Month Contest",
      description: "Showcase your best work and win $500 cash prize plus feature spotlight!",
      gradient: "from-yellow-400 to-orange-500",
      ctaType: "enter_contest" as const,
      ctaText: "Enter Contest",
      prize: "$500 Prize"
    },
    {
      id: 2,
      title: "⚡ Premium Tools Early Access",
      description: "Be first to try our revolutionary AI-powered booking system before anyone else.",
      gradient: "from-purple-500 to-pink-500",
      ctaType: "join_waitlist" as const,
      ctaText: "Join Waitlist",
      prize: "Exclusive Access"
    },
    {
      id: 3,
      title: "💎 VIP Membership Launch",
      description: "Unlock premium features, priority support, and exclusive networking events.",
      gradient: "from-blue-500 to-cyan-500",
      ctaType: "upgrade_premium" as const,
      ctaText: "Upgrade Now",
      prize: "50% Off"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Exclusive Opportunities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't miss out on these limited-time opportunities designed specifically for our community members
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teasers.map((teaser, index) => (
            <motion.div
              key={teaser.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className={`absolute inset-0 bg-gradient-to-br ${teaser.gradient}`} />
              </div>

              {/* Prize Badge */}
              <div className="absolute top-4 right-4">
                <div className={`bg-gradient-to-r ${teaser.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {teaser.prize}
                </div>
              </div>

              <div className="relative">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${teaser.gradient} rounded-xl flex items-center justify-center mb-6`}>
                  {teaser.id === 1 && <Crown className="h-6 w-6 text-white" />}
                  {teaser.id === 2 && <Zap className="h-6 w-6 text-white" />}
                  {teaser.id === 3 && <Gift className="h-6 w-6 text-white" />}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {teaser.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {teaser.description}
                </p>

                {/* CTA Button */}
                <CTAButton
                  type={teaser.ctaType}
                  className={`w-full bg-gradient-to-r ${teaser.gradient} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  {teaser.ctaText}
                  <ArrowRight className="h-4 w-4" />
                </CTAButton>

                {/* Urgency Indicator */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    ⏰ Limited Time Only
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Want to see more exclusive opportunities like these?
          </p>
          <CTAButton
            type="join_waitlist"
            variant="outline"
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full font-semibold"
          >
            Join VIP Community
          </CTAButton>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorTeasers;
