
import React from 'react';
import EmviLogo from '@/components/branding/EmviLogo';
import { Card } from '@/components/ui/card';

const EmviAppPremiumAd = () => {
  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <Card className="relative overflow-hidden rounded-2xl shadow-xl w-full max-w-5xl">
            <div className="relative h-[600px] md:h-[700px]">
              {/* Background with elegant lighting gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white"></div>
              
              {/* EmviApp Logo */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                <EmviLogo size="large" />
              </div>
              
              {/* Premium Hand with Phone Mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative mt-16 w-full max-w-lg">
                  {/* Hand holding phone image */}
                  <div className="relative w-full h-full">
                    <img 
                      src="/lovable-uploads/78b629b2-e8fc-45ba-9955-fe9d0e1266f7.png" 
                      alt="Hand holding smartphone with EmviApp"
                      className="object-contain w-full max-w-md mx-auto"
                    />
                    
                    {/* Phone Screen Overlay */}
                    <div className="absolute top-[18%] left-[50%] transform -translate-x-1/2 w-[60%] h-[60%] rounded-3xl overflow-hidden">
                      {/* App UI Mockup */}
                      <img
                        src="/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png"
                        alt="EmviApp interface showing job listings"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Highlight Text Elements */}
              <div className="absolute top-[25%] right-[5%] md:right-[15%] space-y-5">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <p className="text-xl md:text-2xl font-bold text-amber-500">$2,000/week</p>
                  <p className="text-sm font-medium text-gray-600">Top earning artists</p>
                </div>
                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <p className="text-xl md:text-2xl font-bold text-green-600">$8k–$12k/month</p>
                  <p className="text-sm font-medium text-gray-600">Salon revenue increase</p>
                </div>
              </div>
              
              {/* Call-to-action buttons */}
              <div className="absolute bottom-[20%] left-[10%] space-y-3">
                <div className="bg-amber-500 text-white px-4 py-3 rounded-lg shadow-md font-medium">
                  Salon Hiring Now
                </div>
                <div className="bg-white text-gray-800 px-4 py-3 rounded-lg shadow-md font-medium border border-gray-100">
                  Explore Artists
                </div>
                <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-md font-medium">
                  Top Nail Jobs
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmviAppPremiumAd;
