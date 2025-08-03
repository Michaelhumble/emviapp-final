import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { RouteConfirmation } from './RouteConfirmation';

import { LinkButton } from './LinkButton';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  links?: Array<{
    url: string;
    label: string;
    description?: string;
  }>;
  quickActions?: Array<{
    id: string;
    label: string;
    action: () => void;
  }>;
  routeConfirmation?: {
    destination: string;
    title: string;
    requiresAuth?: boolean;
  };
  authFlow?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  index: number;
  isDarkMode: boolean;
  fontSize: 'small' | 'normal' | 'large';
  language: 'en' | 'vi';
  userName: string;
  showAuthFlow: boolean;
  onRouteConfirm: (destination: string, requiresAuth: boolean) => void;
  onRemoveRouteConfirm: (messageId: string) => void;
  onAuthSuccess: () => void;
  onAuthCancel: () => void;
}

const fontSizeClasses = {
  small: 'text-xs',
  normal: 'text-sm',
  large: 'text-base'
};

export const MessageBubble = ({
  message,
  index,
  isDarkMode,
  fontSize,
  language,
  userName,
  showAuthFlow,
  onRouteConfirm,
  onRemoveRouteConfirm,
  onAuthSuccess,
  onAuthCancel
}: MessageBubbleProps) => {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.02, 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg relative backdrop-blur-sm ${
        message.isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border border-blue-400/30' 
          : isDarkMode
            ? 'bg-gray-800/90 text-gray-100 border border-gray-600/30'
            : 'bg-white/90 text-gray-800 border border-orange-100/50'
      }`}>
        {/* Message Text */}
        <p className={`${fontSizeClasses[fontSize]} leading-relaxed whitespace-pre-wrap`}>
          {message.text}
        </p>
        
        {/* Links */}
        {message.links && message.links.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.links.map((link, index) => (
              <LinkButton
                key={index}
                href={link.url}
                label={link.label}
                description={link.description}
              />
            ))}
          </div>
        )}
        
        {/* Route Confirmation */}
        {message.routeConfirmation && (
          <RouteConfirmation
            title={language === 'vi' 
              ? `Chuyển đến "${message.routeConfirmation.title}"`
              : `Go to "${message.routeConfirmation.title}"`
            }
            description={language === 'vi' 
              ? 'Anh/chị có muốn em dẫn qua trang này không? Em sẽ ở đây chờ để giúp tiếp!'
              : 'Would you like me to take you there? I\'ll be here waiting to help when you return!'
            }
            onConfirm={() => onRouteConfirm(
              message.routeConfirmation!.destination, 
              message.routeConfirmation!.requiresAuth || false
            )}
            onCancel={() => onRemoveRouteConfirm(message.id)}
            language={language}
          />
        )}


        {/* Quick Actions */}
        {message.quickActions && message.quickActions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.quickActions.map((action) => (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md font-medium"
              >
                {action.label}
              </motion.button>
            ))}
          </div>
        )}
        
        {/* Sunshine Avatar for Bot Messages */}
        {!message.isUser && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-sm border border-white/30"
          >
            <Sun size={10} className="text-white" />
          </motion.div>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 ${
          message.isUser ? 'text-blue-100' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};