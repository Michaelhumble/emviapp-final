
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Scissors, PenTool, Wand2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StyleSignatureProps {
  specialties: string[];
  style?: string;
}

const StyleSignature: React.FC<StyleSignatureProps> = ({ 
  specialties = [],
  style = "I specialize in creating natural, effortless looks that enhance your unique features. My approach blends classic techniques with modern trends for results that are both timeless and fresh."
}) => {
  const getIconForSpecialty = (specialty: string) => {
    const lowerCaseSpecialty = specialty.toLowerCase();
    if (lowerCaseSpecialty.includes('cut') || lowerCaseSpecialty.includes('style')) return Scissors;
    if (lowerCaseSpecialty.includes('color') || lowerCaseSpecialty.includes('highlight')) return Palette;
    if (lowerCaseSpecialty.includes('nail') || lowerCaseSpecialty.includes('design')) return PenTool;
    if (lowerCaseSpecialty.includes('makeup')) return Wand2;
    return Sparkles;
  };

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Palette className="mr-2 h-5 w-5 text-purple-500" />
          My Style & Signature
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {specialties.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {specialties.map((specialty, index) => {
                const Icon = getIconForSpecialty(specialty);
                
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Badge className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-100 hover:from-purple-100 hover:to-pink-100">
                      <Icon className="h-3.5 w-3.5 mr-1.5" />
                      {specialty}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.p 
              className="text-gray-600 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {style}
            </motion.p>
          </>
        ) : (
          <div className="text-center py-6">
            <Palette className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-gray-500">No specialties listed yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StyleSignature;
