
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SalonClientGrowthSystem = () => {
  // State to track which question has been answered
  const [answeredQuestion, setAnsweredQuestion] = useState<number | null>(null);

  // Questions for the interactive section
  const questions = [
    {
      question: "The sleepless nights counting empty chairs. The stress of covering payroll while your best talent walks away. The dream of building something lasting, slipping through your fingers—we see the weight you carry.",
      answer: "Every salon owner knows this pain intimately. The 3am worries, the constant hustle just to survive another month. You didn't open your doors to struggle—you had a vision. EmviApp bridges that gap between your dream and reality, connecting you with artists who share your passion and commitment. You're not alone in this journey—we built this because you deserve better.",
    },
    {
      question: "The exhaustion of pouring your heart into every client, only to feel invisible. Working weekends while others rest, questioning if your artistry will ever be truly valued—your passion shouldn't feel like punishment.",
      answer: "We know the sacrifice. The missed family dinners, the ache in your hands, the moments you wonder if anyone sees your gift. Your talent deserves recognition, not just survival. EmviApp puts your artistry where it belongs—in front of people who understand quality and are willing to pay for excellence. You are an artist, not just a service provider. We're here to remind the world.",
    },
    {
      question: "The disappointment of another ruined special occasion. The frustration of never finding someone who truly listens. The longing to walk into a place and feel genuinely cared for—you deserve to feel beautiful, not stressed.",
      answer: "Your time is precious. Your trust is sacred. You shouldn't have to gamble with either. Every disappointing appointment represents more than just money—it's your confidence, your special moments, your self-care that gets compromised. EmviApp ensures every visit honors your worth. You deserve artists who see you, hear you, and make you feel like the best version of yourself. That's not too much to ask—it's everything.",
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Handle click events to prevent propagation issues
  const handleCtaClick = (e: React.MouseEvent) => {
    // Prevent any potential event bubbling issues
    e.stopPropagation();
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-purple-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20"></div>
      <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-tl from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="max-w-5xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">💙</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              We See You. We Know the Real Struggles.
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">💜</span>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Behind every empty chair, there's a story—let's talk about yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {questions.map((q, index) => {
            const gradients = [
              {
                border: "border-blue-400",
                bg: "from-blue-50 to-cyan-50",
                iconBg: "from-blue-500 to-cyan-600",
                buttonBg: "from-blue-600 to-cyan-700"
              },
              {
                border: "border-purple-400", 
                bg: "from-purple-50 to-violet-50",
                iconBg: "from-purple-500 to-violet-600",
                buttonBg: "from-purple-600 to-violet-700"
              },
              {
                border: "border-pink-400",
                bg: "from-pink-50 to-rose-50", 
                iconBg: "from-pink-500 to-rose-600",
                buttonBg: "from-pink-600 to-rose-700"
              }
            ];
            
            const currentGradient = gradients[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  y: answeredQuestion === index ? 0 : -8,
                  scale: answeredQuestion === index ? 1 : 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`
                  bg-gradient-to-br ${currentGradient.bg} 
                  rounded-3xl shadow-lg hover:shadow-2xl 
                  transition-all duration-300 border-l-4 ${currentGradient.border}
                  ${answeredQuestion === index ? "ring-2 ring-purple-300 shadow-2xl transform scale-105" : ""}
                  overflow-hidden group cursor-pointer
                `}
              >
                <div className="p-8 h-full flex flex-col">
                  {/* Icon header */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${currentGradient.iconBg} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl text-white">
                        {index === 0 ? "🏪" : index === 1 ? "✨" : "💕"}
                      </span>
                    </div>
                  </div>

                  {/* Question text */}
                  <div className="flex-grow mb-6">
                    <p className="text-lg text-gray-800 leading-relaxed font-medium">
                      {q.question}
                    </p>
                  </div>
                  
                  {answeredQuestion === index ? (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                      className="space-y-6"
                    >
                      {/* Answer section */}
                      <motion.div 
                        variants={itemVariants} 
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50"
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-800 leading-relaxed font-medium">
                            {q.answer}
                          </p>
                        </div>
                      </motion.div>
                      
                      {/* CTA button */}
                      <motion.div variants={itemVariants}>
                        <a 
                          href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F" 
                          onClick={handleCtaClick}
                          className="block w-full"
                        >
                          <Button 
                            className={`
                              w-full py-4 px-6 rounded-2xl text-lg font-bold 
                              bg-gradient-to-r ${currentGradient.buttonBg}
                              hover:shadow-xl transition-all duration-300
                              text-white border-0 group
                            `}
                          >
                            <span className="flex items-center justify-center">
                              <span className="mr-3">💪 Start Your Transformation</span>
                              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                          </Button>
                        </a>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <Button
                      variant="outline"
                      className={`
                        w-full py-4 px-6 rounded-2xl text-lg font-semibold
                        border-2 ${currentGradient.border} 
                        hover:bg-white hover:shadow-lg 
                        transition-all duration-300 group
                        text-gray-700 hover:text-gray-900
                      `}
                      onClick={() => setAnsweredQuestion(index)}
                    >
                      <span className="flex items-center justify-center">
                        <span className="mr-2">Select This Question</span>
                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                          {index === 0 ? "🤔" : index === 1 ? "💭" : "❓"}
                        </span>
                      </span>
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Struggles End Here
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Every successful artist started exactly where you are now. The only difference? They found the right platform.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <a 
                href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F"
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-purple-900 hover:bg-gray-50 font-bold px-12 py-6 rounded-2xl text-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="flex items-center">
                    <span className="mr-3">🚀 Break Free Today</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SalonClientGrowthSystem;
