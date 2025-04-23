
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GalleryHorizontal } from "lucide-react";

const PLACEHOLDER_IMAGES = [
  {
    url: "/lovable-uploads/ac97ca70-1589-41f2-b35b-f17345583c7d.png",
    alt: "Professional facial treatment with soft lighting",
    label: "Facial Therapy"
  },
  {
    url: "/lovable-uploads/5f8eaed6-4a17-4992-a270-6394aad0f43b.png",
    alt: "Nail artist applying elegant dark nail polish",
    label: "Nail Design"
  },
  {
    url: "/lovable-uploads/5f4b0b9e-d1c2-43ad-a85c-92c4b6c61441.png",
    alt: "Close-up of makeup brushes and beauty tools",
    label: "Professional Makeup"
  },
  {
    url: "/lovable-uploads/be0807fc-786e-4491-8fa9-00b4ad0f201f.png",
    alt: "Relaxing spa massage treatment",
    label: "Wellness Massage"
  },
  {
    url: "/lovable-uploads/fe0bd314-25aa-4296-bf38-80dddf69b992.png",
    alt: "Detailed nail polish application",
    label: "Precision Manicure"
  },
  {
    url: "/lovable-uploads/b428f0c9-5145-4620-9400-4fa8d534c639.png",
    alt: "Beauty professional performing a relaxing treatment",
    label: "Spa Techniques"
  }
];

const ArtistPortfolioPreview = () => {
  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <GalleryHorizontal className="h-5 w-5 mr-2 text-purple-500" />
          Portfolio Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PLACEHOLDER_IMAGES.map((img, idx) => (
            <div
              key={img.url}
              className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm group"
              style={{
                boxShadow: '0 4px 24px 0 #F1F0FB',
                borderRadius: '1.25rem',
              }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                style={{ borderRadius: '1.25rem' }}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/45 via-transparent to-transparent px-3 py-2">
                <span className="text-white text-xs font-semibold drop-shadow">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioPreview;

