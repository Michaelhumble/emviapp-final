
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Image } from "lucide-react";
import PortfolioUploadModal, { UploadedWork } from "../PortfolioUploadModal";
import { motion, AnimatePresence } from "framer-motion";

// Initial mock
const initialPortfolio = [
  {
    id: "1",
    image: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    caption: "Nail Art",
    previewMode: false
  },
  {
    id: "2",
    image: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    caption: "Signature Design",
    previewMode: false
  },
  {
    id: "3",
    image: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    caption: "Custom Look",
    previewMode: false
  },
  {
    id: "4",
    image: "/lovable-uploads/7d585be5-b70d-4d65-b57f-803de81839ba.png",
    caption: "Minimalist",
    previewMode: false
  },
  {
    id: "5",
    image: "/lovable-uploads/a3c08446-c1cb-492d-a361-7ec4aca18cfd.png",
    caption: "Editorial",
    previewMode: false
  },
  {
    id: "6",
    image: "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
    caption: "Classic",
    previewMode: false
  }
];

// Animation variants for added images
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
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  // Handle new upload (mocked, now with preview and title)
  function handleMockUpload(item: UploadedWork) {
    setPortfolio(prev => [
      {
        id: (Date.now() + Math.random()).toString(),
        image: item.imageUrl,
        caption: item.title,
        previewMode: item.previewMode,
      },
      ...prev,
    ]);
  }

  return (
    <section className="max-w-4xl mx-auto w-full mt-10">
      <PortfolioUploadModal open={uploadOpen} onOpenChange={setUploadOpen} onUploadMock={handleMockUpload} />
      <Card className="border-0 shadow-none bg-white/70">
        <CardHeader className="pb-2 bg-gradient-to-r from-[#F1F0FB] via-white to-[#E5DEFF] rounded-t-lg">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-2xl font-playfair font-semibold text-[#1A1F2C]">
              My Portfolio
            </CardTitle>
            <Button
              className="glassmorphism text-emvi-accent font-medium shadow-md px-4 py-2 flex items-center gap-2 backdrop-blur-sm"
              aria-label="Add New Work"
              type="button"
              onClick={() => setUploadOpen(true)}
            >
              <Plus className="h-5 w-5 mr-1" />
              Add New Work
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-5 pb-7">
          {portfolio.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-purple-50 rounded-full mb-4">
                <Image className="h-8 w-8 text-purple-200" />
              </div>
              <p className="text-lg font-playfair text-gray-400 mb-2">No portfolio items yet.</p>
              <Button
                className="glassmorphism text-emvi-accent font-medium px-6 py-2 mt-4 backdrop-blur-sm"
                aria-label="Add New Work"
                type="button"
                onClick={() => setUploadOpen(true)}
              >
                <Plus className="h-5 w-5 mr-1" />
                Add New Work
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
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
                  >
                    <div className="aspect-square w-full overflow-hidden flex items-center justify-center relative">
                      <img
                        src={item.image}
                        alt={item.caption}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl"
                      />
                      {item.previewMode && (
                        <span className="absolute top-2 right-2 z-20 bg-black/40 text-white text-[11px] px-2.5 py-1 rounded-full font-semibold font-serif shadow">
                          Preview Mode
                        </span>
                      )}
                    </div>
                    <span className="absolute top-3 left-3 bg-white/80 text-[#7E69AB] font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm font-playfair z-10">
                      {item.caption}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistPortfolioSection;
