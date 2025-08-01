import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Briefcase } from 'lucide-react';

interface CTARepeaterProps {
  variant?: 'primary' | 'secondary' | 'jobs' | 'minimal';
  title?: string;
  subtitle?: string;
  className?: string;
}

const CTARepeater = ({ 
  variant = 'primary', 
  title,
  subtitle,
  className = '' 
}: CTARepeaterProps) => {
  
  const configs = {
    primary: {
      bgClass: "bg-gradient-to-r from-purple-600 to-pink-600",
      title: title || "Ready to Transform Your Beauty Career?",
      subtitle: subtitle || "Join thousands of professionals who've already found their perfect match on EmviApp.",
      icon: Sparkles,
      buttonText: "Start Your Journey",
      buttonClass: "bg-white text-purple-600 hover:bg-gray-100",
      link: "/auth/signup"
    },
    secondary: {
      bgClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
      title: title || "Don't Miss Out on Your Next Opportunity",
      subtitle: subtitle || "Browse hundreds of beauty jobs and find the perfect role for your skills.",
      icon: Users,
      buttonText: "Explore Opportunities",
      buttonClass: "bg-white text-emerald-600 hover:bg-gray-100",
      link: "/jobs"
    },
    jobs: {
      bgClass: "bg-gradient-to-r from-amber-500 to-orange-600",
      title: title || "Looking for Talented Beauty Professionals?",
      subtitle: subtitle || "Post your job and connect with qualified candidates in your area.",
      icon: Briefcase,
      buttonText: "Post a Job",
      buttonClass: "bg-white text-amber-600 hover:bg-gray-100",
      link: "/post-job"
    },
    minimal: {
      bgClass: "bg-gray-900",
      title: title || "Take the Next Step",
      subtitle: subtitle || "Your beauty career breakthrough is just one click away.",
      icon: ArrowRight,
      buttonText: "Get Started",
      buttonClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
      link: "/auth/signup"
    }
  };

  const config = configs[variant];
  const IconComponent = config.icon;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`py-12 ${config.bgClass} ${className}`}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <IconComponent className="h-8 w-8 text-white mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {config.title}
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {config.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={config.link}>
              <Button 
                size="lg"
                className={`
                  ${config.buttonClass} 
                  px-8 py-4 text-lg font-semibold 
                  shadow-xl hover:shadow-2xl 
                  transition-all duration-300 
                  transform hover:scale-105 
                  rounded-full
                  min-w-[200px]
                `}
              >
                {config.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            {variant === 'primary' && (
              <Link to="/jobs">
                <Button 
                  variant="outline"
                  size="lg"
                  className="
                    border-2 border-white/30 text-white 
                    hover:bg-white/10 hover:border-white/50
                    px-8 py-4 text-lg font-semibold 
                    transition-all duration-300 
                    rounded-full
                    min-w-[200px]
                    backdrop-blur-sm
                  "
                >
                  Browse Jobs
                </Button>
              </Link>
            )}
          </div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-8 text-white/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>10,000+ Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>500+ Active Jobs</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>100% Free to Join</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 transform -rotate-12"></div>
      </div>
    </motion.section>
  );
};

export default CTARepeater;