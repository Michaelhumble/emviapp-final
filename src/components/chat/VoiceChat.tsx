import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';
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
          className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl">☀️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Little Sunshine</h2>
            <Badge 
              variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
              className={`${
                connectionStatus === 'connected' 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : connectionStatus === 'connecting'
                  ? 'bg-orange-100 text-orange-700 border-orange-200'
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              {connectionStatus === 'connected' && '🟢 Connected'}
              {connectionStatus === 'connecting' && '🟡 Connecting...'}
              {connectionStatus === 'disconnected' && '⚪ Ready to connect'}
            </Badge>
          </div>

          {/* Coming Soon Notice */}
          {!isFeatureEnabled('VOICE_CHAT') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-center"
            >
              <div className="text-orange-600 font-semibold mb-1">🚀 Coming Soon!</div>
              <p className="text-orange-700 text-sm">
                Voice chat with Little Sunshine will be available in Q2 2025. Get ready for natural voice conversations!
              </p>
            </motion.div>
          )}

          {/* Audio Visualization */}
          <div className="flex justify-center mb-6">
            <div className="flex items-end space-x-1 h-12">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 rounded-full ${
                    isRecording || isSpeaking ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  animate={{
                    height: isRecording || isSpeaking 
                      ? `${20 + (audioLevel * 0.3) + (Math.random() * 20)}px`
                      : '8px'
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Status Text */}
          <div className="text-center mb-6">
            {!isConnected && connectionStatus === 'disconnected' && (
              <p className="text-gray-600">Tap the call button to start voice chat</p>
            )}
            {connectionStatus === 'connecting' && (
              <p className="text-orange-600">Connecting to Little Sunshine...</p>
            )}
            {isConnected && !isRecording && !isSpeaking && (
              <p className="text-green-600">Connected! Tap mic to speak</p>
            )}
            {isRecording && (
              <p className="text-orange-600">Listening... speak now</p>
            )}
            {isSpeaking && (
              <p className="text-blue-600">Little Sunshine is speaking...</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            {!isConnected ? (
              <Button
                onClick={handleStartCall}
                disabled={!isFeatureEnabled('VOICE_CHAT') || connectionStatus === 'connecting'}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16"
              >
                <Phone className="w-6 h-6" />
              </Button>
            ) : (
              <>
                {/* Microphone Toggle */}
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? 'default' : 'outline'}
                  className={`rounded-full w-16 h-16 ${
                    isRecording 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'hover:bg-orange-50 text-orange-600 border-orange-300'
                  }`}
                >
                  {isRecording ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </Button>

                {/* End Call */}
                <Button
                  onClick={handleEndCall}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>

          {/* Features List */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Voice Chat Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Natural voice conversations</li>
              <li>• Real-time beauty advice</li>
              <li>• Multiple language support</li>
              <li>• Hands-free interaction</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceChat;