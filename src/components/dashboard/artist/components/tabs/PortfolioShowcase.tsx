
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const PortfolioShowcase = () => {
  const placeholderImages = Array(6).fill(null);
  
  return (
    <Card className="p-6 bg-white/80">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 font-serif">Portfolio Showcase</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholderImages.map((_, index) => (
            <div
              key={`portfolio-${index}`}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/20" />
              <div className="w-full h-full transition-transform duration-300 group-hover:scale-105 bg-purple-100/50" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={() => window.location.href = '/dashboard/artist/portfolio'}
        >
          <span>View Full Portfolio</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default PortfolioShowcase;
