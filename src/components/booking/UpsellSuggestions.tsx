
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UpsellService } from '@/hooks/useServiceUpsells';
import { Plus, X, DollarSign, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UpsellSuggestionsProps {
  upsells: UpsellService[];
  onAddUpsell: (upsell: UpsellService) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

export const UpsellSuggestions = ({ 
  upsells, 
  onAddUpsell, 
  onSkip, 
  isLoading = false
}: UpsellSuggestionsProps) => {
  if (upsells.length === 0 && !isLoading) return null;
  
  return (
    <AnimatePresence>
      {upsells.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Card className="border-blue-100 bg-blue-50/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Recommended for your appointment
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onSkip}
                  className="h-8 w-8 p-0"
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {upsells.map((upsell) => (
                  <div 
                    key={upsell.id}
                    className="bg-white rounded-lg p-3 border border-blue-100 flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{upsell.title}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <DollarSign className="h-3.5 w-3.5 mr-1 text-green-600" />
                        <span className="text-green-600 font-medium">${upsell.price}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{upsell.duration_minutes} min</span>
                      </div>
                      {upsell.description && (
                        <p className="text-xs text-gray-500 mt-1">{upsell.description}</p>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="ml-3 border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => onAddUpsell(upsell)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
