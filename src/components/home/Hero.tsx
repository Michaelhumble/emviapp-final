
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            The Future of Hiring for the Beauty Industry
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl">
            EmviApp is AI-powered, built with love, and funded by those who care. 
            This is the platform every salon & beauty artist has been waiting for.
          </p>
          <div className="mt-6">
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 w-full">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute top-20 right-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
                alt="Beauty professional at work" 
                className="relative rounded-lg shadow-2xl max-h-[500px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
