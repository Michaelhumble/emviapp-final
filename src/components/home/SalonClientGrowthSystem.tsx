
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            We See You. We Know the Real Struggles.
          </h2>
          <p className="text-lg text-muted-foreground font-inter">
            Behind every empty chair, there's a story—let's talk about yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-lg border ${
                answeredQuestion === index ? "border-primary shadow-lg" : "border-gray-200"
              } transition-all duration-300`}
            >
              <h3 className="text-xl font-inter font-medium text-foreground mb-4">{q.question}</h3>
              
              {answeredQuestion === index ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="space-y-4"
                >
                  <motion.p variants={itemVariants} className="text-foreground font-inter">
                    {q.answer}
                  </motion.p>
                  
                  <motion.div variants={itemVariants}>
                    <a 
                      href="http://emviapp-final.lovable.app/auth/signup?redirect=%2F" 
                      onClick={handleCtaClick}
                      className="block w-full"
                    >
                      <Button className="w-full mt-2 font-inter font-medium">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full font-inter font-medium"
                  onClick={() => setAnsweredQuestion(index)}
                >
                  Select This Question
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalonClientGrowthSystem;
