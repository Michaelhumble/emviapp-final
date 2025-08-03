import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sun, Settings, RotateCcw, Moon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatWindowProps {
  onClose: () => void;
  children: React.ReactNode;
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  language: 'en' | 'vi';
  fontSize: 'small' | 'normal' | 'large';
  isDarkMode: boolean;
  setFontSize: (size: 'small' | 'normal' | 'large') => void;
  setIsDarkMode: (isDark: boolean) => void;
  onClearChat: () => void;
}

const ChatWindow = ({ 
  onClose, 
  children, 
  inputValue, 
  setInputValue, 
  sendMessage, 
  isLoading, 
  language, 
  fontSize, 
  isDarkMode, 
  setFontSize, 
  setIsDarkMode, 
  onClearChat 
}: ChatWindowProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className={`fixed ${isMobile ? 'inset-4 top-8' : 'bottom-4 right-4 w-[420px] h-[65vh] max-h-[600px]'} bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      {/* Compact Header */}
      <div className={`p-3 border-b flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gradient-to-r from-orange-50 to-yellow-50'
      }`}>
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center"
          >
            <Sun size={12} className="text-white" />
          </motion.div>
          <div>
            <h3 className={`font-semibold text-xs ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Sunshine AI
            </h3>
            <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Your beauty industry guide ☀️
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Compact Settings Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(!showMenu)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-300' 
                  : 'hover:bg-white/50 text-gray-600'
              }`}
            >
              <Settings size={14} />
            </motion.button>
            
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className={`absolute top-full right-0 mt-1 w-40 rounded-lg shadow-lg border z-10 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="p-2 space-y-1">
                    {/* Font Size */}
                    <div className={`px-2 py-1 text-[10px] font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Font Size
                    </div>
                    <div className="flex gap-1">
                      {(['small', 'normal', 'large'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setFontSize(size)}
                          className={`flex-1 px-1.5 py-1 text-[10px] rounded ${
                            fontSize === size
                              ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                              : (isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600')
                          }`}
                        >
                          {size === 'small' ? 'S' : size === 'normal' ? 'M' : 'L'}
                        </button>
                      ))}
                    </div>
                    
                    {/* Dark Mode Toggle */}
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
                      {isDarkMode ? 'Light' : 'Dark'}
                    </button>
                    
                    {/* Clear Chat */}
                    <button
                      onClick={onClearChat}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <RotateCcw size={12} />
                      Clear
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-white/50 text-gray-600'
            }`}
          >
            <X size={14} />
          </motion.button>
        </div>
      </div>

      {/* Messages Container - Optimized for mobile */}
      <div className={`flex-1 overflow-y-auto p-3 space-y-2 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        {children}
      </div>

      {/* Fixed Input at Bottom */}
      <div className={`p-3 border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
            disabled={isLoading}
            className={`flex-1 px-3 py-2 text-sm rounded-lg border resize-none ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
            } focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-50`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-3 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
