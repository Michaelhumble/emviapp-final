import React from 'react';
import { Lock, Eye, Star, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';

const TeaserLocked = () => {
  const { isSignedIn } = useAuth();

  // Don't show if user is signed in
  if (isSignedIn) {
    return null;
  }

  const lockedJobs = [
    {
      title: "Senior Nail Technician - Luxury Spa",
      location: "Beverly Hills, CA",
      company: "Elite Beauty Lounge",
      preview: "We're looking for an experienced nail technician with 3+ years...",
      compensation: "UNLOCK TO VIEW",
      contact: "UNLOCK TO VIEW",
      features: ["Premium Salon", "High-end Clientele", "Competitive Pay"],
      views: 127,
      applications: 23
    },
    {
      title: "Master Hair Stylist - High-End Salon",
      location: "Manhattan, NYC",
      company: "Signature Salon & Spa",
      preview: "Join our award-winning team of stylists in the heart of...",
      compensation: "UNLOCK TO VIEW",
      contact: "UNLOCK TO VIEW",
      features: ["Celebrity Clients", "Commission + Tips", "Full Benefits"],
      views: 95,
      applications: 18
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full mb-4">
          <Lock className="w-5 h-5 text-purple-500" />
          <span className="text-purple-600 font-semibold text-sm">EXCLUSIVE ACCESS</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
          Premium Jobs for Serious Professionals
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Sign in to unlock salary details and contact information for these exclusive opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {lockedJobs.map((job, index) => (
          <Card key={index} className="relative overflow-hidden border-2 border-purple-200/50 bg-gradient-to-br from-white to-purple-50/20 dark:from-slate-800 dark:to-slate-700">
            <CardContent className="p-6">
              {/* Premium badge */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Premium Job
                </Badge>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                  🔥 Hot
                </Badge>
              </div>

              {/* Job title and company */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {job.title}
              </h3>
              <p className="text-purple-600 font-semibold mb-1">{job.company}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">📍 {job.location}</p>

              {/* Preview description */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {job.preview}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    ✨ {feature}
                  </Badge>
                ))}
              </div>

              {/* Locked sections */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <div className="bg-gray-100 dark:bg-slate-600 p-4 rounded-lg border-2 border-dashed border-purple-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">💰 Salary Range:</span>
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-500" />
                        <span className="text-purple-600 font-bold">{job.compensation}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gray-100 dark:bg-slate-600 p-4 rounded-lg border-2 border-dashed border-purple-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">📞 Contact Info:</span>
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-purple-500" />
                        <span className="text-purple-600 font-bold">{job.contact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{job.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{job.applications} applied</span>
                  </div>
                </div>
              </div>

              {/* Unlock CTA */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-center text-white">
                <Lock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-bold text-lg mb-2">Sign In to Unlock</h4>
                <p className="text-sm mb-4 opacity-90">
                  Sign in to view direct contact info and apply instantly. All listings are real and privacy-protected.
                </p>
                <p className="text-xs mb-4 opacity-75">
                  EmviApp only allows direct connection between verified members. No spam. No fakes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex-1">
                    Sign In
                  </button>
                  <button className="bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-900 transition-colors flex-1">
                    Create Account
                  </button>
                </div>
              </div>
            </CardContent>

            {/* Blur overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none"></div>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border border-purple-200/50 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Unlock Your Dream Job?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of beauty professionals who found their perfect match on EmviApp
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Sign Up Free - View All Jobs
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Sample positions shown for illustration. Sign in to see live, real opportunities now.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeaserLocked;