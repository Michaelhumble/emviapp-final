
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GalleryHorizontal } from "lucide-react";

// Static beauty-related placeholder images (public domain)
const PLACEHOLDER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1515548212235-40c1c7fbde06?w=600&q=80",
    alt: "Modern nails with subtle gradient",
    label: "Gradient Nails"
  },
  {
    url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80",
    alt: "Woman getting makeup applied",
    label: "Makeup Artistry"
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    alt: "Body of water surrounded by trees (soothing luxury mood)",
    label: "Luxury Calm"
  },
  {
    url: "https://images.unsplash.com/photo-1519415943484-cfb6d3c87958?w=600&q=80",
    alt: "Professional hair styling with waves",
    label: "Hairstyling"
  },
  {
    url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
    alt: "Orange flowers (artistic beauty accent)",
    label: "Bloom Accent"
  },
  {
    url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&q=80",
    alt: "String lights in trees (elegance and detail)",
    label: "Elegant Details"
  },
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
