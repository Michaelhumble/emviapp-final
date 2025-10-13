import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, DollarSign, ArrowRight } from 'lucide-react';

interface InlineCTAProps {
  variant: 'explore-jobs' | 'find-artists' | 'check-salon-worth' | 'browse-salons';
}

const InlineCTA: React.FC<InlineCTAProps> = ({ variant }) => {
  const variants = {
    'explore-jobs': {
      icon: Briefcase,
      title: 'Ready to Hire Top Talent?',
      description: 'Post your job opening and connect with qualified nail technicians actively looking for opportunities in your area.',
      buttonText: 'Explore Jobs',
      buttonLink: '/jobs',
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    'find-artists': {
      icon: Users,
      title: 'Looking for Your Next Opportunity?',
      description: 'Browse salon openings, build your professional profile, and connect with top salons hiring in your specialty.',
      buttonText: 'Find Artists',
      buttonLink: '/artists',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    'check-salon-worth': {
      icon: DollarSign,
      title: 'What\'s Your Salon Worth?',
      description: 'Get a free, data-driven valuation of your salon based on revenue, reviews, location, and market conditions.',
      buttonText: 'Check Your Salon\'s Worth',
      buttonLink: '/salon-worth',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    'browse-salons': {
      icon: Users,
      title: 'Discover Successful Salons',
      description: 'Browse verified salon profiles, learn from top-rated businesses, and see what makes them successful.',
      buttonText: 'Browse Salons',
      buttonLink: '/salons',
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`my-12 bg-gradient-to-r ${config.bgGradient} border-2 border-opacity-20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${config.gradient} rounded-full flex items-center justify-center`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            {config.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {config.description}
          </p>
        </div>

        <Link 
          to={config.buttonLink}
          className={`flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r ${config.gradient} text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold whitespace-nowrap shadow-md`}
        >
          {config.buttonText}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default InlineCTA;
