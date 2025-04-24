import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon } from "lucide-react";
import PortfolioUploadModal from "../portfolio/PortfolioUploadModal";
import { motion, AnimatePresence } from "framer-motion";
import { useArtistPortfolio } from "@/hooks/useArtistPortfolio";
import { Link } from "react-router-dom";

const itemVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 }
  }
};

const ArtistPortfolioSection = () => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const {
    portfolio,
    isLoading,
    addPortfolioItem,
    uploading
  } = useArtistPortfolio();

  return (
    <section className="max-w-4xl mx-auto w-full px-2 xs:px-0 mt-6 sm:mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <PortfolioUploadModal
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          onUpload={addPortfolioItem}
          loading={uploading}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          className="border-0 shadow-none bg-white/70"
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <CardHeader className="pb-2 bg-gradient-to-r from-[#F1F0FB] via-white to-[#E5DEFF] rounded-t-lg flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-xl xs:text-2xl font-playfair font-semibold text-[#1A1F2C]">
                My Portfolio
              </CardTitle>
              <div className="flex items-center gap-3">
                <Link to="/dashboard/artist/portfolio">
                  <Button
                    className="glassmorphism text-emvi-accent font-medium shadow-md px-3 xs:px-4 py-2 flex items-center gap-2 backdrop-blur-sm"
                    variant="outline"
                  >
                    🎨 View Full Portfolio
                  </Button>
                </Link>
                <Button
                  className="glassmorphism text-emvi-accent font-medium shadow-md px-3 xs:px-4 py-2 flex items-center gap-2 backdrop-blur-sm"
                  aria-label="Add New Work"
                  type="button"
                  onClick={() => setUploadOpen(true)}
                >
                  <Plus className="h-4 w-4 xs:h-5 xs:w-5 mr-1" />
                  <span className="text-sm xs:text-base">Add New Work</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 xs:pt-5 pb-6 xs:pb-7 px-3 xs:px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 xs:gap-6">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : portfolio.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="text-center py-12 xs:py-16">
                  <div className="mx-auto w-14 h-14 xs:w-16 xs:h-16 flex items-center justify-center bg-purple-50 rounded-full mb-4">
                    <ImageIcon className="h-7 w-7 xs:h-8 xs:w-8 text-purple-200" />
                  </div>
                  <p className="text-base xs:text-lg font-playfair text-gray-400 mb-2">Your portfolio is empty. Start showcasing your best work!</p>
                  <Button
                    className="glassmorphism text-emvi-accent font-medium px-4 xs:px-6 py-2 mt-4 backdrop-blur-sm"
                    aria-label="Add New Work"
                    type="button"
                    onClick={() => setUploadOpen(true)}
                  >
                    <Plus className="h-4 w-4 xs:h-5 xs:w-5 mr-1" />
                    Add New Work
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 xs:gap-6">
                <AnimatePresence initial={false}>
                  {portfolio.map(item => (
                    <motion.div
                      key={item.id}
                      className="rounded-xl bg-gradient-to-br from-purple-50 to-white shadow-sm overflow-hidden relative flex flex-col group"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={itemVariants}
                      layout
                      whileHover={{ scale: 1.045 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="aspect-square w-full overflow-hidden flex items-center justify-center relative">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl"
                        />
                      </div>
                      <span className="absolute top-2 xs:top-3 left-2 xs:left-3 bg-white/80 text-[#7E69AB] font-semibold text-[10px] xs:text-xs px-2 xs:px-3 py-1 xs:py-1.5 rounded-full shadow-sm backdrop-blur-sm font-playfair z-10">
                        {item.title}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ArtistPortfolioSection;
