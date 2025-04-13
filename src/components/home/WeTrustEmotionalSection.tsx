
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLanguagePreference } from "@/utils/languagePreference";
import { Shield, Users, Heart, Home, Lock } from "lucide-react";

const WeTrustEmotionalSection = () => {
  const [language, setLanguage] = useState<"en" | "vi">(getLanguagePreference());

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Get initial language preference
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage === 'vi' || storedLanguage === 'en') {
      setLanguage(storedLanguage as "en" | "vi");
    }
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f9f7f4]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            {language === "en" ? (
              "Let's Make Salon Life Easier — Together"
            ) : (
              "Hãy Cùng Nhau Trải Nghiệm Emviapp"
            )}
          </h2>
          
          {language === "en" ? (
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed font-serif text-gray-800">
                  We help bring customers straight to your salon.<br />
                  We help you find experienced technicians, send them irresistible offers, and manage your shop smoothly and efficiently — all in one place.
                </p>
                
                <p className="text-xl font-medium text-primary mt-8 flex flex-col items-center">
                  <span className="inline-flex items-center">
                    <span className="mr-2 text-2xl">💡</span> Let EmviApp's smart A.I. handle the heavy lifting —
                  </span>
                  <span>so you can focus on doing what you love and growing what's yours.</span>
                </p>
                
                <p className="text-xl font-semibold text-gray-800 mt-8">
                  If you don't use EmviApp...<br />
                  <span className="text-primary">Let's just say your competitors might beat you to it. <span className="text-2xl">😌</span></span><br />
                  <span className="text-gray-700">Try it now and feel the difference — instantly.</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif font-semibold mb-4 flex items-center justify-center">
                  <span className="text-orange-500 mr-2">🧡</span> Why Artists & Salons Trust Us
                </h3>
                <p className="text-lg mb-6">We're building a community that puts your needs first.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="flex flex-col items-center text-center p-3">
                    <div className="p-2 rounded-full bg-primary/5 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-semibold text-xl mb-1">3,000+</p>
                    <p className="text-gray-600 text-sm">Verified Salons</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-3">
                    <div className="p-2 rounded-full bg-primary/5 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-semibold text-xl mb-1">Thousands</p>
                    <p className="text-gray-600 text-sm">Active Artists</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-3">
                    <div className="p-2 rounded-full bg-primary/5 mb-2">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-semibold text-xl mb-1">100%</p>
                    <p className="text-gray-600 text-sm">Built by Artists, Not Corporations</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-3">
                    <div className="p-2 rounded-full bg-primary/5 mb-2">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-semibold text-xl mb-1">4 States</p>
                    <p className="text-gray-600 text-sm">Trusted in GA, CA, TX & FL</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-3">
                    <div className="p-2 rounded-full bg-primary/5 mb-2">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-semibold text-xl mb-1">Secure</p>
                    <p className="text-gray-600 text-sm">Payments & AI Matching</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => {
                const newLanguage = language === "en" ? "vi" : "en";
                setLanguage(newLanguage);
                localStorage.setItem('emvi_language_preference', newLanguage);
                window.dispatchEvent(new CustomEvent('languageChanged', { 
                  detail: { language: newLanguage } 
                }));
              }}
              className="px-4 py-2 rounded-full bg-white shadow-sm text-gray-700 text-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              {language === "en" ? "EN / VI" : "VI / EN"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeTrustEmotionalSection;
