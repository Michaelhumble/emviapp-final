
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Clock, Shield, Sparkles } from "lucide-react";

const InvestorMetricsSection = () => {
  const metrics = [
    {
      label: "Average Daily Time",
      value: "27 minutes",
      icon: <Clock className="h-6 w-6" />,
      trend: "+15%",
      color: "purple"
    },
    {
      label: "Weekly Retention",
      value: "89%",
      icon: <TrendingUp className="h-6 w-6" />,
      trend: "+12%",
      color: "green"
    },
    {
      label: "Active Members",
      value: "12.5K",
      icon: <Users className="h-6 w-6" />,
      trend: "+23%",
      color: "blue"
    },
    {
      label: "Monthly Growth",
      value: "34%",
      icon: <BarChart3 className="h-6 w-6" />,
      trend: "+8%",
      color: "orange"
    }
  ];

  const trustedLogos = [
    { name: "Glam Studios", logo: "✨" },
    { name: "Beauty Collective", logo: "💄" },
    { name: "Luxe Salon Group", logo: "👑" },
    { name: "Elite Beauty Co.", logo: "💎" },
    { name: "Prestige Salons", logo: "🌟" },
    { name: "Beauty Pros Network", logo: "🎨" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Engagement Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            Network Effects in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Real engagement metrics that prove our community's value and stickiness
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`text-${metric.color}-600 mb-3 flex justify-center`}>
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                <div className="text-green-600 text-sm font-semibold">{metric.trend} vs last month</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trusted Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-12"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-blue-700">Industry Trust</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Trusted by Top Salons & Talent
            </h3>
            <p className="text-gray-600">Leading beauty businesses choose EmviApp for their teams</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {trustedLogos.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-2">{partner.logo}</div>
                <p className="text-xs font-medium text-gray-700">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Investment Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center"
        >
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-3xl font-playfair font-bold mb-4">
            The Future of Beauty Community
          </h3>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
            We're not just building a platform—we're creating the cultural foundation for the next generation of beauty professionals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">Network Effect</div>
              <p className="text-sm opacity-90">More members = exponentially more value</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">Viral Growth</div>
              <p className="text-sm opacity-90">Members become advocates and recruiters</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
              <div className="text-2xl font-bold mb-1">Retention Engine</div>
              <p className="text-sm opacity-90">Community creates unbreakable bonds</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorMetricsSection;
