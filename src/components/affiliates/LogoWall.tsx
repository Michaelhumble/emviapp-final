import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Video, Globe } from 'lucide-react';

const LogoWall = () => {
  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { name: 'YouTube', icon: Youtube, color: 'from-red-600 to-red-500' },
    { name: 'TikTok', icon: Video, color: 'from-black to-teal-500' },
    { name: 'Beauty Blogs', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <section className="py-12 border-y border-black/5 bg-gradient-to-r from-purple-50/30 via-white to-fuchsia-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Header */}
          <p className="text-sm font-medium text-[hsl(var(--ink-600))] mb-8">
            Trusted by creators from leading platforms
          </p>

          {/* Logo grid */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex items-center gap-3 px-6 py-3 rounded-2xl
                           bg-white/60 backdrop-blur-sm
                           border border-black/5
                           hover:border-black/10
                           hover:shadow-xl hover:shadow-black/5
                           transition-all duration-300
                           hover:scale-110"
                >
                  {/* Icon with gradient */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} 
                                   flex items-center justify-center
                                   shadow-md group-hover:shadow-lg
                                   transition-shadow`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Platform name */}
                  <span className="text-base font-semibold text-[hsl(var(--ink-900))]">
                    {platform.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-sm text-[hsl(var(--ink-600))]"
          >
            Join creators earning an average of{' '}
            <span className="font-semibold text-violet-600">$3,240/month</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default LogoWall;
