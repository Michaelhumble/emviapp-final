
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const FounderMessage = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Heart className="w-5 h-5 text-pink-300 mr-2" />
            <span className="text-pink-100 font-medium">A Personal Message</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Why I Built EmviApp
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
            <div className="text-xl md:text-2xl leading-relaxed space-y-6">
              <p>
                "I watched my sister struggle to find the right nail salon job for months. 
                Endless applications, no responses, mismatched expectations."
              </p>
              
              <p>
                "That's when I realized the beauty industry needed something different. 
                Not another job board, but a platform that truly understands what makes 
                a perfect match between talent and opportunity."
              </p>
              
              <p className="text-yellow-200 font-semibold">
                "EmviApp isn't just a business to me—it's personal. Every artist who finds their dream job, 
                every salon that discovers amazing talent, that's why we're here."
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">Alex Chen</div>
                  <div className="text-purple-200">Founder & CEO, EmviApp</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-lg text-purple-100">
            <p>
              Every feature we build, every algorithm we train, every partnership we form—
              it all comes back to making your career journey a little bit easier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
