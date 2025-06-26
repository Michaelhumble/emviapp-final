
import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const SectionTitle = ({ language, itemVariants }: SectionTitleProps) => {
  // This component is now empty since we removed the duplicate section title
  // The main hero title is now handled directly in ContentCard
  return null;
};

export default SectionTitle;
