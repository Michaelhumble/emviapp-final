
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

interface ErrorLayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const ErrorLayout = ({ children, hideNavbar = false }: ErrorLayoutProps) => {
  return (
    <Layout hideNavbar={hideNavbar}>
      <motion.div 
        className="min-h-[80vh] flex flex-col items-center justify-center p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="max-w-md w-full text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default ErrorLayout;
