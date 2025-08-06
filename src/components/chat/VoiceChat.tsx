import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isFeatureEnabled } from '@/config/premiumFeatures';

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // Simulate audio level for animation
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isRecording]);

  const handleStartCall = async () => {
    if (!isFeatureEnabled('VOICE_CHAT')) {
      // Show coming soon message
      return;
    }
    
    setConnectionStatus('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setConnectionStatus('connected');
      setIsConnected(true);
    }, 2000);
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setIsRecording(false);
    setIsSpeaking(false);
    setConnectionStatus('disconnected');
    onClose();
  };

  const toggleRecording = () => {
    if (!isConnected) return;
    setIsRecording(!isRecording);
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
          className="bg-white rounded-2xl p-4 w-full max-w-sm mx-auto relative"
        >
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Compact Header */}
          <div className="text-center mb-4">
            <motion.div 
              className="w-16 h-16 mx-auto mb-2 flex items-center justify-center relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated Rays */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-4 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
                    style={{
                      left: '50%',
                      top: '-8px',
                      originX: 0.5,
                      originY: '40px',
                      transform: `rotate(${i * 45}deg) translateX(-50%)`
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Central Sun */}
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg relative z-10"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 165, 0, 0.5)",
                    "0 0 30px rgba(255, 165, 0, 0.8)",
                    "0 0 20px rgba(255, 165, 0, 0.5)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.span 
                  className="text-white text-xl font-bold"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ☀
                </motion.span>
              </motion.div>
            </motion.div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Little Sunshine</h2>
            <Badge 
              variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
              className={`text-xs ${
                connectionStatus === 'connected' 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : connectionStatus === 'connecting'
                  ? 'bg-orange-100 text-orange-700 border-orange-200'
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              {connectionStatus === 'connected' && '🟢 Connected'}
              {connectionStatus === 'connecting' && '🟡 Connecting...'}
              {connectionStatus === 'disconnected' && '⚪ Ready'}
            </Badge>
          </div>

          {/* Coming Soon Notice */}
          {!isFeatureEnabled('VOICE_CHAT') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4 text-center"
            >
              <div className="text-orange-600 font-medium text-sm mb-1">🚀 Coming Q2 2025!</div>
              <p className="text-orange-700 text-xs">
                Natural voice conversations with Little Sunshine
              </p>
            </motion.div>
          )}

          {/* Compact Audio Visualization */}
          <div className="flex justify-center mb-4">
            <div className="flex items-end space-x-1 h-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1.5 rounded-full ${
                    isRecording || isSpeaking ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  animate={{
                    height: isRecording || isSpeaking 
                      ? `${12 + (audioLevel * 0.2) + (Math.random() * 12)}px`
                      : '6px'
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Compact Status Text */}
          <div className="text-center mb-4">
            {!isConnected && connectionStatus === 'disconnected' && (
              <p className="text-gray-600 text-sm">Tap to start voice chat</p>
            )}
            {connectionStatus === 'connecting' && (
              <p className="text-orange-600 text-sm">Connecting...</p>
            )}
            {isConnected && !isRecording && !isSpeaking && (
              <p className="text-green-600 text-sm">Tap mic to speak</p>
            )}
            {isRecording && (
              <p className="text-orange-600 text-sm">Listening...</p>
            )}
            {isSpeaking && (
              <p className="text-blue-600 text-sm">Speaking...</p>
            )}
          </div>

          {/* Compact Controls */}
          <div className="flex justify-center space-x-3 mb-4">
            {!isConnected ? (
              <Button
                onClick={handleStartCall}
                disabled={!isFeatureEnabled('VOICE_CHAT') || connectionStatus === 'connecting'}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12"
              >
                <Phone className="w-5 h-5" />
              </Button>
            ) : (
              <>
                {/* Microphone Toggle */}
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? 'default' : 'outline'}
                  className={`rounded-full w-12 h-12 ${
                    isRecording 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'hover:bg-orange-50 text-orange-600 border-orange-300'
                  }`}
                >
                  {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>

                {/* End Call */}
                <Button
                  onClick={handleEndCall}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12"
                >
                  <PhoneOff className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {/* Compact Features List */}
          <div className="bg-gray-50 rounded-xl p-3">
            <h4 className="font-medium text-gray-800 mb-2 text-sm">Voice Features:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Natural conversations</li>
              <li>• Real-time advice</li>
              <li>• Multiple languages</li>
              <li>• Hands-free interaction</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceChat;