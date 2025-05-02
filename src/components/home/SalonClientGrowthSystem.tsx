
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
      question: "Do you struggle with clients not returning after their first visit?",
      answer: "Clients often don't return because they don't feel appreciated or remembered. EmviApp's client system creates personalized follow-ups that make them feel valued.",
    },
    {
      question: "Is your booking system causing you to lose potential clients?",
      answer: "Complex booking processes lose 35% of potential clients. EmviApp's streamlined booking reduces this friction, allowing clients to book in under 30 seconds.",
    },
    {
      question: "Do you spend too much time on administrative tasks instead of clients?",
      answer: "Most salon owners spend 15+ hours weekly on admin tasks. EmviApp automates these processes, giving you back that time to focus on clients and growth.",
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
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-800 mb-4">
            What's Really Keeping Your Salon From Growing?
          </h2>
          <p className="text-lg text-gray-600">
            Select a question below to uncover the hidden barriers to your salon's success
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
              <h3 className="text-xl font-medium mb-4">{q.question}</h3>
              
              {answeredQuestion === index ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="space-y-4"
                >
                  <motion.p variants={itemVariants} className="text-gray-700">
                    {q.answer}
                  </motion.p>
                  
                  <motion.div variants={itemVariants}>
                    <Link 
                      to="/auth/signup" 
                      onClick={handleCtaClick}
                      className="block w-full"
                    >
                      <Button className="w-full mt-2">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
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
