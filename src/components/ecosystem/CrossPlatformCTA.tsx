import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Briefcase, 
  Crown,
  Zap,
  TrendingUp,
  Heart,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CrossPlatformCTAProps {
  currentPage: 'community' | 'dashboard' | 'profile' | 'jobs' | 'salons' | 'artists';
  variant?: 'card' | 'inline' | 'floating';
  className?: string;
}

const CrossPlatformCTA: React.FC<CrossPlatformCTAProps> = ({ 
  currentPage, 
  variant = 'card',
  className = '' 
}) => {
  const { user, userRole } = useAuth();

  // Smart CTA generation based on current page and user context
  const getCTAs = () => {
    const baseCTAs = {
      community: [
        {
          title: user ? 'Complete Your Profile' : 'Join the Community',
          description: 'Stand out and get discovered by top salons',
          path: user ? '/profile' : '/sign-up',
          icon: Star,
          color: 'from-purple-500 to-indigo-600',
          priority: 1
        },
        {
          title: 'Browse Job Opportunities', 
          description: 'Find your next career move',
          path: '/jobs',
          icon: Briefcase,
          color: 'from-green-500 to-emerald-600',
          priority: 2
        }
      ],
      dashboard: [
        {
          title: 'Join Community Discussions',
          description: 'Share your success & get inspired',
          path: '/community',
          icon: Users,
          color: 'from-pink-500 to-rose-600',
          priority: 1
        },
        {
          title: 'Upgrade to VIP',
          description: 'Unlock premium features for $10 lifetime',
          path: '/pricing',
          icon: Crown,
          color: 'from-amber-400 to-orange-500',
          priority: 0
        }
      ],
      profile: [
        {
          title: 'Share Your Portfolio',
          description: 'Get discovered in the community',
          path: '/community',
          icon: Heart,
          color: 'from-pink-500 to-red-500',
          priority: 1
        },
        {
          title: 'Find Job Opportunities',
          description: 'Apply to positions that match your skills',
          path: '/jobs',
          icon: TrendingUp,
          color: 'from-blue-500 to-indigo-600',
          priority: 2
        }
      ],
      jobs: [
        {
          title: 'Showcase Your Work',
          description: 'Build your profile to stand out',
          path: '/profile',
          icon: Star,
          color: 'from-purple-500 to-violet-600',
          priority: 1
        },
        {
          title: 'Connect with Peers',
          description: 'Join the beauty community',
          path: '/community',
          icon: MessageSquare,
          color: 'from-green-500 to-teal-600',
          priority: 2
        }
      ],
      salons: [
        {
          title: 'Post Your Salon',
          description: 'Get discovered by top talent',
          path: '/sell-salon',
          icon: Zap,
          color: 'from-indigo-500 to-purple-600',
          priority: 1
        },
        {
          title: 'Find Amazing Artists',
          description: 'Browse portfolios & hire talent',
          path: '/artists',
          icon: Users,
          color: 'from-emerald-500 to-green-600', 
          priority: 2
        }
      ],
      artists: [
        {
          title: 'Book Services',
          description: 'Schedule appointments with top artists',
          path: '/my-bookings',
          icon: Star,
          color: 'from-rose-500 to-pink-600',
          priority: 1
        },
        {
          title: 'Join Artist Community',
          description: 'Share tips and get inspired',
          path: '/community',
          icon: Heart,
          color: 'from-purple-500 to-indigo-600',
          priority: 2
        }
      ]
    };

    const ctas = baseCTAs[currentPage] || [];
    
    // Add role-specific CTAs
    if (user && userRole) {
      if (userRole === 'customer' && currentPage !== 'dashboard') {
        ctas.unshift({
          title: 'My Dashboard',
          description: 'View bookings, reviews & rewards',
          path: '/dashboard/customer',
          icon: TrendingUp,
          color: 'from-blue-500 to-cyan-600',
          priority: 0.5
        });
      }
      
      if ((userRole === 'artist' || userRole === 'nail technician/artist') && currentPage !== 'dashboard') {
        ctas.unshift({
          title: 'Artist Dashboard', 
          description: 'Manage bookings & grow your business',
          path: '/dashboard/artist',
          icon: TrendingUp,
          color: 'from-violet-500 to-purple-600',
          priority: 0.5
        });
      }
    }
    
    return ctas.sort((a, b) => a.priority - b.priority).slice(0, 3);
  };

  const ctas = getCTAs();

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {ctas.slice(0, 2).map((cta, index) => (
          <Link key={index} to={cta.path}>
            <Button 
              size="sm" 
              className={`bg-gradient-to-r ${cta.color} text-white hover:shadow-lg transition-all duration-200`}
            >
              {React.createElement(cta.icon, { className: "h-4 w-4 mr-1" })}
              {cta.title}
            </Button>
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.div 
        className={`fixed bottom-20 right-4 z-50 ${className}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Card className="p-4 bg-white shadow-xl border-l-4 border-l-purple-500 max-w-sm">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${ctas[0]?.color} text-white`}>
              {ctas[0] && React.createElement(ctas[0].icon, { className: "h-5 w-5" })}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{ctas[0]?.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{ctas[0]?.description}</p>
              <Link to={ctas[0]?.path || '/'}>
                <Button size="sm" className="mt-2 h-7 text-xs">
                  Get Started <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Default card variant
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {ctas.map((cta, index) => (
        <Link key={index} to={cta.path}>
          <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500 group cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${cta.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                {React.createElement(cta.icon, { className: "h-6 w-6" })}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                  {cta.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {cta.description}
                </p>
                <div className="flex items-center text-purple-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Get Started <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CrossPlatformCTA;