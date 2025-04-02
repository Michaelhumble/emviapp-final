
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="text-primary">Beauty</span> Professional Connections & Opportunities
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Connect with top salons, find exciting job opportunities,
              and build your career in the beauty industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/salons">
                <Button size="lg" className="font-medium px-8">
                  Find Salons
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="font-medium px-8">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-first md:order-last">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-20 right-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
                alt="Beauty professional at work" 
                className="relative rounded-lg shadow-2xl max-h-[500px] object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
