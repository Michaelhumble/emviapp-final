
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalFounderCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-5 h-5 mr-2 text-blue-200" />
              <span className="text-sm font-medium">10,000+ Professionals</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-medium">🚀 AI-Powered</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Beauty Career?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed max-w-3xl mx-auto">
            Join thousands of beauty professionals who've already discovered their perfect match. 
            Your dream opportunity is waiting.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <Link to="/auth/signup" className="flex items-center">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 text-lg">
              <Link to="/artists">
                Browse Opportunities
              </Link>
            </Button>
          </div>
          
          {/* Social proof */}
          <div className="text-center">
            <p className="text-purple-200 mb-4">Trusted by beauty professionals nationwide</p>
            <div className="flex justify-center items-center space-x-2">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-white ml-4">+10,000 more professionals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalFounderCTA;
