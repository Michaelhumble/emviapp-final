import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

const ComparisonTable = () => {
  const features = [
    { feature: 'Commission Rate', emviapp: '30% recurring', typical: '10-15% one-time', highlight: true },
    { feature: 'Cookie Duration', emviapp: '90 days', typical: '30 days', highlight: false },
    { feature: 'Payout Method', emviapp: 'Stripe Connect', typical: 'Wire/Check', highlight: false },
    { feature: 'Tracking', emviapp: 'Real-time', typical: '24hr delay', highlight: false },
    { feature: 'Approval Time', emviapp: '<24 hours', typical: '2-7 days', highlight: false },
    { feature: 'Dashboard', emviapp: 'Advanced analytics', typical: 'Basic stats', highlight: false },
    { feature: 'Support', emviapp: 'Priority DM', typical: 'Email only', highlight: false },
    { feature: 'Marketing Assets', emviapp: 'Professional kit', typical: 'Limited', highlight: false },
    { feature: 'Deep Linking', emviapp: 'Custom campaigns', typical: 'Generic links', highlight: false },
    { feature: 'Minimum Payout', emviapp: '$50', typical: '$100-200', highlight: false },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Why choose us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            EmviApp vs Typical Affiliate Programs
          </h2>
          <p className="text-lg text-[hsl(var(--ink-600))] max-w-2xl mx-auto">
            See why thousands of creators choose our program over traditional options
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-black/5">
              <div className="text-sm font-medium text-[hsl(var(--ink-600))]">
                Feature
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  EmviApp
                </div>
              </div>
              <div className="text-center text-sm font-medium text-[hsl(var(--ink-600))]">
                Typical Programs
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-black/5">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`grid grid-cols-3 gap-4 p-4 md:p-6 hover:bg-purple-50/30 transition-colors ${
                    item.highlight ? 'bg-violet-50/50' : ''
                  }`}
                >
                  {/* Feature name */}
                  <div className="flex items-center text-sm font-medium text-[hsl(var(--ink-900))]">
                    {item.feature}
                    {item.highlight && (
                      <Sparkles className="w-3.5 h-3.5 ml-2 text-violet-600" />
                    )}
                  </div>

                  {/* EmviApp value */}
                  <div className="flex items-center justify-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                      item.highlight 
                        ? 'bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-900 font-semibold'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      <Check className="w-4 h-4 shrink-0" />
                      <span className="text-sm">{item.emviapp}</span>
                    </div>
                  </div>

                  {/* Typical value */}
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600">
                      <X className="w-4 h-4 shrink-0 text-gray-400" />
                      <span className="text-sm">{item.typical}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 border-t border-black/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--ink-900))]">
                    Ready to join the best affiliate program?
                  </p>
                  <p className="text-xs text-[hsl(var(--ink-600))]">
                    Get approved in less than 24 hours and start earning today
                  </p>
                </div>
                <a
                  href="/affiliate/apply"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500
                             text-white font-semibold text-sm
                             hover:shadow-lg hover:shadow-fuchsia-500/30
                             transition-all duration-300 hover:scale-105
                             whitespace-nowrap"
                >
                  Start earning now →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
