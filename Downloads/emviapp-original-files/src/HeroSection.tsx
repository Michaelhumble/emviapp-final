
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import TailwindDebug from "./components/TailwindDebug";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Add scroll parallax effect
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const section = sectionRef.current;
        
        // Apply slight parallax to background elements
        const bgElements = section.querySelectorAll('.bg-element');
        bgElements.forEach((el: any, i) => {
          const speed = i % 2 === 0 ? 0.05 : 0.03;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/50 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[80px] animate-pulse"></div>
        <div className="bg-element absolute bottom-0 -right-20 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="bg-element absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[50px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-[20%] left-[15%] w-8 h-8 bg-purple-300/20 rounded-full blur-sm animate-float"></div>
        <div className="absolute bottom-[15%] right-[25%] w-6 h-6 bg-indigo-300/30 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[60%] left-[60%] w-4 h-4 bg-pink-300/20 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div 
        className={`
          relative z-10 transition-all duration-1000 max-w-4xl text-center
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        `}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent">
            Transform Your Beauty Career
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-100/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          EmviApp connects beauty professionals with premium salons, clients, and career opportunities.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-5">
          <Link 
            to="/salons" 
            className="
              inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl
              bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:from-purple-500 hover:to-indigo-500
              text-white shadow-lg shadow-purple-500/30
              transform hover:-translate-y-1 transition-all duration-300 w-full md:w-auto
            "
          >
            Find Your Perfect Salon
            <ArrowRight size={20} className="ml-2" />
          </Link>
          
          <Link 
            to="/jobs" 
            className="
              inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl
              border border-purple-300/20 bg-white/5 backdrop-blur-sm hover:bg-white/10
              shadow-lg hover:shadow-purple-500/20
              transform hover:-translate-y-1 transition-all duration-300 w-full md:w-auto
            "
          >
            Browse Opportunities
            <Sparkles size={20} className="ml-2 text-purple-300" />
          </Link>
        </div>
        
        <div className="
          mt-16 flex flex-wrap justify-center gap-8
          transition-all duration-700 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ">
          <div className="flex items-center glass-effect px-4 py-2 rounded-full">
            <span className="text-lg font-medium text-purple-100">10,000+</span>
            <span className="ml-2 text-sm text-purple-200/80">Beauty Professionals</span>
          </div>
          <div className="flex items-center glass-effect px-4 py-2 rounded-full">
            <span className="text-lg font-medium text-purple-100">2,500+</span>
            <span className="ml-2 text-sm text-purple-200/80">Premium Salons</span>
          </div>
          <div className="flex items-center glass-effect px-4 py-2 rounded-full">
            <span className="text-lg font-medium text-purple-100">95%</span>
            <span className="ml-2 text-sm text-purple-200/80">Placement Rate</span>
          </div>
        </div>
      </div>
      
      {/* Maintain the debug component for development */}
      {process.env.NODE_ENV === 'development' && <TailwindDebug />}
    </section>
  );
};

export default HeroSection;
