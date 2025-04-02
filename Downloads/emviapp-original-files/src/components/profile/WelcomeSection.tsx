
import { useState, useEffect } from "react";

// Array of motivational messages
const motivationalMessages = [
  "Behind every beautiful set is hustle. You don't have to hustle alone.",
  "You're not just a stylist. You're a business.",
  "Welcome back! Ready to find your next opportunity?",
  "Every chair tells a story. Let's help you fill yours.",
  "The industry doesn't wait — good thing you're already here.",
  "Your clients don't just want service. They want your unique vision.",
  "The difference between good and great? It's in the details you notice.",
  "Building your brand one satisfied client at a time.",
  "Your art speaks volumes. We're here to amplify your voice."
];

export interface WelcomeSectionProps {
  profile: any;
  loading: boolean;
}

const WelcomeSection = ({ profile, loading }: WelcomeSectionProps) => {
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  // Use the profile object to potentially personalize the message in the future
  const isLoading = loading;
  const userProfile = profile;

  useEffect(() => {
    // Set a random motivational message
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    setMotivationalMessage(motivationalMessages[randomIndex]);
    
    // Add a slight delay before showing the content for a smoother animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        bg-gradient-to-r from-purple-900/80 via-indigo-900/70 to-purple-800/80 
        p-8 md:p-10 rounded-2xl mb-8 text-center 
        shadow-[0_10px_40px_-5px_rgba(147,51,234,0.3)] 
        border border-purple-500/30 backdrop-blur-lg 
        transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        hover:shadow-purple-500/20 hover:border-purple-400/40
        relative overflow-hidden
      `}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <div className="animate-pulse flex space-x-4">
            <div className="h-2.5 w-48 bg-purple-300/30 rounded"></div>
          </div>
        </div>
      ) : (
        <h2 className={`
          text-2xl md:text-3xl lg:text-4xl font-light italic 
          bg-gradient-to-r from-white via-purple-100 to-purple-200
          bg-clip-text text-transparent
          mb-2 leading-relaxed tracking-wide
          transform transition-all duration-1000 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {motivationalMessage}
        </h2>
      )}
      
      {/* Decorative divider */}
      <div className={`
        w-24 h-1 mx-auto my-2 
        bg-gradient-to-r from-purple-500/60 to-indigo-500/60 
        rounded-full transform transition-all duration-1000 delay-500
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
      `}></div>
      
      {userProfile && process.env.NODE_ENV === 'development' && (
        <div className="hidden">User ID: {userProfile.id}</div>
      )}
    </div>
  );
};

export default WelcomeSection;
