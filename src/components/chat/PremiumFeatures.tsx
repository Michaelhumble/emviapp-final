import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mic, Palette, Volume2, Sparkles, Crown, Clock, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isFeatureEnabled, FEATURE_DESCRIPTIONS, type PremiumFeature } from '@/config/premiumFeatures';

interface PremiumFeaturesProps {
  isOpen: boolean;
  onClose: () => void;
  onFeatureSelect: (feature: PremiumFeature) => void;
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ isOpen, onClose, onFeatureSelect }) => {
  const [activeFeature, setActiveFeature] = useState<PremiumFeature | null>(null);

  const featureIcons: Record<PremiumFeature, React.ReactNode> = {
    VOICE_CHAT: <Mic className="w-5 h-5" />,
    PHOTO_UPLOAD: <Camera className="w-5 h-5" />,
    AI_IMAGE_GEN: <Palette className="w-5 h-5" />,
    TEXT_TO_SPEECH: <Volume2 className="w-5 h-5" />,
    ADVANCED_ANALYSIS: <Sparkles className="w-5 h-5" />,
    PREMIUM_VOICES: <Volume2 className="w-5 h-5" />,
    UNLIMITED_MESSAGES: <Crown className="w-5 h-5" />,
    PRIORITY_SUPPORT: <Sparkles className="w-5 h-5" />,
    VIRTUAL_TRY_ON: <Camera className="w-5 h-5" />,
    APPOINTMENT_BOOKING: <Clock className="w-5 h-5" />,
    BEAUTY_COACHING: <Crown className="w-5 h-5" />,
    STYLE_RECOMMENDATIONS: <Sparkles className="w-5 h-5" />
  };

  const coreFeatures: PremiumFeature[] = ['VOICE_CHAT', 'PHOTO_UPLOAD', 'AI_IMAGE_GEN', 'TEXT_TO_SPEECH'];
  const advancedFeatures: PremiumFeature[] = ['ADVANCED_ANALYSIS', 'PREMIUM_VOICES', 'UNLIMITED_MESSAGES', 'PRIORITY_SUPPORT'];
  const comingSoonFeatures: PremiumFeature[] = ['VIRTUAL_TRY_ON', 'APPOINTMENT_BOOKING', 'BEAUTY_COACHING', 'STYLE_RECOMMENDATIONS'];

  const FeatureCard = ({ feature }: { feature: PremiumFeature }) => {
    const enabled = isFeatureEnabled(feature);
    const description = FEATURE_DESCRIPTIONS[feature];
    
    return (
      <motion.div
        whileHover={{ scale: enabled ? 1.02 : 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
          enabled 
            ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg' 
            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
        }`}
        onClick={() => enabled && onFeatureSelect(feature)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2 rounded-lg ${enabled ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
            {featureIcons[feature]}
          </div>
          {enabled ? (
            <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              Coming Soon
            </Badge>
          )}
        </div>
        
        <h3 className={`font-semibold mb-2 ${enabled ? 'text-gray-900' : 'text-gray-500'}`}>
          {description.title}
        </h3>
        
        <p className={`text-sm mb-3 ${enabled ? 'text-gray-600' : 'text-gray-400'}`}>
          {description.description}
        </p>
        
        {!enabled && (
          <div className="flex items-center text-xs text-orange-600">
            <Clock className="w-3 h-3 mr-1" />
            {description.comingSoonDate}
          </div>
        )}
      </motion.div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center">
              <Crown className="w-6 h-6 text-orange-500 mr-2" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Premium Features</h2>
                <p className="text-gray-600 text-sm">Unlock Little Sunshine's full potential</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <Crown className="w-6 h-6 text-orange-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Premium Features</h2>
        </div>
        <p className="text-gray-600 text-sm">Unlock Little Sunshine's full potential</p>
      </div>

      {/* Core Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
          Core Features
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {coreFeatures.map((feature) => (
            <FeatureCard key={feature} feature={feature} />
          ))}
        </div>
      </div>

      {/* Advanced Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <Crown className="w-4 h-4 mr-2 text-purple-500" />
          Advanced Features
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {advancedFeatures.map((feature) => (
            <FeatureCard key={feature} feature={feature} />
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <Clock className="w-4 h-4 mr-2 text-blue-500" />
          Coming Soon
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {comingSoonFeatures.map((feature) => (
            <FeatureCard key={feature} feature={feature} />
          ))}
        </div>
      </div>

      {/* Upgrade Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center"
      >
        <Crown className="w-6 h-6 mx-auto mb-2" />
        <h3 className="font-semibold mb-1">Premium Coming Soon</h3>
        <p className="text-orange-100 text-sm mb-3">
          We're working hard to bring you these amazing features!
        </p>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-white text-orange-600 hover:bg-orange-50"
        >
          Get Notified
        </Button>
      </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PremiumFeatures;