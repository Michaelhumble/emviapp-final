import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Little Sunshine ☀️ How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await supabase.functions.invoke('sunshine-chat', {
        body: { message: input }
      });

      const botMessage = { 
        id: Date.now() + 1, 
        text: data?.message || "I'm here to help!", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "I'm having trouble right now, but I'm here to help! Try again!", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center text-xl"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-orange-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">Little Sunshine</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === 'user'
                    ? 'bg-orange-100 ml-auto text-right'
                    : 'bg-gray-100'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 border rounded px-2 py-1"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSystem;