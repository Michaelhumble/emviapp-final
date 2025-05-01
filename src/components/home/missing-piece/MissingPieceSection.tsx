
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import SectionTitle from "./SectionTitle";
import ContentCard from "./ContentCard";
import LanguageToggleButton from "./LanguageToggleButton";

// Simple error boundary fallback
const ErrorFallback = () => (
  <div className="py-16 text-center">
    <p className="text-gray-500">This section encountered an error. Please reload the page.</p>
  </div>
);

// Error boundary component
class MissingPieceSectionErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("MissingPieceSection Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

const MissingPieceSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  // Get language from context or preference
  const { lang, setLanguage } = useTranslation();
  const [language, setLocalLanguage] = useState<"en" | "vi">("en"); // Default to English

  useEffect(() => {
    // Safely set language with fallback
    try {
      if (lang && (lang === "en" || lang === "vi")) {
        setLocalLanguage(lang);
      }
    } catch (err) {
      console.error("Error setting language:", err);
      setLocalLanguage("en"); // Fallback to English
    }
  }, [lang]);
  
  const handleLanguageChange = (newLanguage: "en" | "vi") => {
    try {
      setLocalLanguage(newLanguage);
      if (setLanguage) {
        setLanguage(newLanguage);
      }
    } catch (err) {
      console.error("Error changing language:", err);
    }
  };

  return (
    <MissingPieceSectionErrorBoundary>
      <section id="experience-emviapp" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50/70">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Section Title */}
            <SectionTitle language={language} itemVariants={itemVariants} />
            
            {/* Language Toggle */}
            <LanguageToggleButton 
              language={language} 
              setLanguage={handleLanguageChange} 
              itemVariants={itemVariants} 
            />
            
            {/* Content Card - Content switches based on language */}
            <ContentCard 
              language={language}
              itemVariants={itemVariants}
            />
          </motion.div>
        </div>
      </section>
    </MissingPieceSectionErrorBoundary>
  );
};

export default MissingPieceSection;
