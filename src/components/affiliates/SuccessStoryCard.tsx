import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle, TrendingUp } from 'lucide-react';

interface SuccessStoryCardProps {
  name: string;
  role: string;
  avatar: string;
  earnings: string;
  quote: string;
  verified?: boolean;
  highlight?: boolean;
  index?: number;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({
  name,
  role,
  avatar,
  earnings,
  quote,
  verified = true,
  highlight = false,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-6 md:p-8 rounded-2xl
                  ${highlight 
                    ? 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 border-2 border-violet-200' 
                    : 'bg-white border border-black/10'
                  }
                  hover:shadow-2xl hover:shadow-purple-500/10
                  transition-all duration-300
                  hover:-translate-y-1`}
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-16 h-16 text-violet-600" />
      </div>

      {/* Earnings badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold mb-4 shadow-lg shadow-emerald-500/30">
        <TrendingUp className="w-4 h-4" />
        {earnings} earned
      </div>

      {/* Quote */}
      <blockquote className="relative text-base md:text-lg text-[hsl(var(--ink-700))] leading-relaxed mb-6 italic">
        "{quote}"
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-lg"
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
              <CheckCircle className="w-3 h-3 text-white" fill="currentColor" />
            </div>
          )}
        </div>

        {/* Name and role */}
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-[hsl(var(--ink-900))]">
              {name}
            </h4>
          </div>
          <p className="text-sm text-[hsl(var(--ink-600))]">
            {role}
          </p>
        </div>
      </div>

      {/* Hover gradient effect */}
      {highlight && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </motion.div>
  );
};

export default SuccessStoryCard;
