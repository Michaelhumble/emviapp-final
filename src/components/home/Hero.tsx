
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="h-screen w-full flex items-center justify-center overflow-hidden bg-black relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/b8dd2904-7dc6-412d-89be-c962ca4ae5f8.png')] bg-cover bg-center opacity-40 z-0"></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-10"></div>

      {/* Content container */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-5xl mx-auto">
          The Beauty Industry's Missing Piece — We Just Built It.
        </h1>
        
        <p className="text-white text-lg md:text-xl mb-6 max-w-3xl mx-auto">
          Hair, Nails, Makeup, Tattoos, Brows, Barbers, Booth Rentals — All in One Powerful App. Finally.
        </p>
        
        <p className="text-pink-200 italic text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Chúng tôi nói tiếng Việt — EmviApp là ngôi nhà mới cho cộng đồng làm đẹp của bạn.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
          <Link to="/auth/signup">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="w-full md:w-auto font-medium px-8 py-6 text-lg bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-lg"
            >
              Join The Movement
            </Button>
          </Link>
          
          <Link to="/jobs">
            <Button 
              size={isMobile ? "default" : "lg"} 
              variant="outline" 
              className="w-full md:w-auto font-medium px-8 py-6 text-lg text-white border-white hover:bg-white hover:text-black transition-colors rounded-xl"
            >
              Find My Next Opportunity
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
