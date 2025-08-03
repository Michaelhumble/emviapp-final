import React from 'react';
import { MessageType } from './types';
import { BookingMatch } from '@/services/assistantService';

interface OldMessageBubbleProps {
  message: MessageType;
  onBookingConfirm?: (match: BookingMatch) => void;
}

export const OldMessageBubble = ({ message, onBookingConfirm }: OldMessageBubbleProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] p-3 rounded-lg ${
        isUser 
          ? 'bg-blue-500 text-white rounded-br-sm' 
          : 'bg-white text-gray-800 rounded-bl-sm shadow-md'
      }`}>
        {message.isTyping ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            
            {/* Booking matches */}
            {message.bookingMatches && message.bookingMatches.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.bookingMatches.map((match, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded border">
                    <p className="font-semibold text-xs">{match.name}</p>
                    <p className="text-xs text-gray-600">{match.service}</p>
                    <p className="text-xs text-gray-500">{match.date} at {match.time}</p>
                    {onBookingConfirm && (
                      <button
                        onClick={() => onBookingConfirm(match)}
                        className="mt-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Action suggestions */}
            {message.actionSuggestions && message.actionSuggestions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.actionSuggestions.map((action) => (
                  <a
                    key={action.id}
                    href={action.href}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};