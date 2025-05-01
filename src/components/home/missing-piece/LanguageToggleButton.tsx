
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LanguageToggleButtonProps {
  language: "en" | "vi";
  setLanguage: (language: "en" | "vi") => void;
  itemVariants: any;
}

const LanguageToggleButton = ({ language, setLanguage, itemVariants }: LanguageToggleButtonProps) => {
  return (
    <motion.div
      className="flex justify-center"
      variants={itemVariants}
    >
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button
          type="button"
          variant={language === "en" ? "default" : "outline"}
          className="rounded-l-md rounded-r-none"
          onClick={() => setLanguage("en")}
        >
          English
        </Button>
        <Button
          type="button"
          variant={language === "vi" ? "default" : "outline"}
          className="rounded-r-md rounded-l-none"
          onClick={() => setLanguage("vi")}
        >
          Tiếng Việt
        </Button>
      </div>
    </motion.div>
  );
};

export default LanguageToggleButton;
