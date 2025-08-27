import type { Variants, Transition } from "framer-motion";

// Shared motion variants
export const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const fadeInScale: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export const sparkle: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.4, 1, 0.4],
    rotate: [0, 180, 360],
  }
};

// Shared transitions
export const tSpring: Transition = { 
  type: "spring", 
  stiffness: 300, 
  damping: 24 
};

export const tEase: Transition = { 
  duration: 0.6, 
  ease: "easeOut" 
};

export const tFast: Transition = { 
  duration: 0.3, 
  ease: "easeOut" 
};

export const tSlow: Transition = { 
  duration: 0.8, 
  ease: "easeOut" 
};

export const sparkleTransition: Transition = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut"
};

export const staggerTransition: Transition = {
  delayChildren: 0.1,
  staggerChildren: 0.1
};