
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { MessageCircle, X } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import toast from "react-hot-toast";

// Define types for our chat messages
interface ChatMessage {
  isUser: boolean;
  text: string;
  timestamp: Date;
}

// Quick responses for common questions
const knowledgeBase: Record<string, string> = {
  "apply": "To apply for a job, go to the Jobs section, find a position you're interested in, and click the 'Apply' button. Make sure your profile is complete for better chances!",
  "job": "Browse available job openings in the Jobs section. You can filter by location, role, and pay rate. Complete your profile to stand out to employers!",
  "salon": "To post a salon listing, go to your profile, click on 'My Business', then 'Add Salon'. Fill in all details including photos for maximum visibility.",
  "credit": "You can earn Emvi Credits by completing your profile, referring friends, posting job listings, and engaging with the community. Credits unlock special features!",
  "profile": "Update your profile by clicking on the Profile link in the navigation bar. Complete all sections to increase your visibility to potential employers.",
  "help": "I'm Sunshine, your support assistant! Ask me anything about EmviApp, jobs, salons, or your profile. If I can't help, I'll forward your question to the team."
};

// FAQ buttons that users can click for quick answers
const faqButtons = [
  { text: "How do I apply to a job?", key: "apply" },
  { text: "How do I post a salon listing?", key: "salon" },
  { text: "Where can I earn more credits?", key: "credit" }
];

const SupportAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Add initial greeting when chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = user?.email
        ? `Hi${user?.email ? " there" : ""}! 👋 I'm Sunshine Support 🌞\n\nHow can I help you today? You can ask me about jobs, salons, credits, or anything else about EmviApp.`
        : "Welcome! 👋 I'm Sunshine Support 🌞\n\nHow can I help you today? You can ask me about jobs, salons, credits, or anything else about EmviApp.";
      
      setMessages([
        {
          isUser: false,
          text: greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, user]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const generateResponse = (query: string): string => {
    // Convert to lowercase for matching
    const lowerQuery = query.toLowerCase();
    
    // Check for keywords in the knowledge base
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerQuery.includes(keyword)) {
        // Show toast for successful match
        toast.success("👍 Got it!");
        return response;
      }
    }

    // Default response if no keywords match
    return "Thanks! I'll forward this to the Emvi team and get back to you soon.";
  };

  const logQuestion = async (question: string) => {
    if (!user) return;
    
    try {
      await supabase.from("support_logs").insert({
        user_id: user.id,
        question: question,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Failed to log support question:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      isUser: true,
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Log the question to Supabase
    logQuestion(inputValue);
    
    // Clear input
    setInputValue("");

    // Simulate AI thinking and response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        isUser: false,
        text: generateResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  const handleFaqClick = (key: string) => {
    // Add user message with the FAQ question
    const faqQuestion = faqButtons.find(btn => btn.key === key)?.text || "";
    
    const userMessage: ChatMessage = {
      isUser: true,
      text: faqQuestion,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // Log the question to Supabase
    logQuestion(faqQuestion);

    // Simulate AI thinking and response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        isUser: false,
        text: knowledgeBase[key] || "I'm not sure about that. Let me get a human to help you.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      
      // Show toast for successful match
      toast.success("👍 Got it!");
    }, 500);
  };

  // Only show for authenticated users
  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Support Chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-purple-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">Sunshine Support 🌞</h3>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 ${message.isUser ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg max-w-[80%] ${
                    message.isUser
                      ? "bg-purple-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {message.text.split("\n").map((text, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>{text}</p>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
            
            {/* FAQ buttons - show only when there are few messages */}
            {messages.length <= 1 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Quick help:</p>
                <div className="space-y-2">
                  {faqButtons.map((btn) => (
                    <button
                      key={btn.key}
                      onClick={() => handleFaqClick(btn.key)}
                      className="w-full text-left px-3 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {btn.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your question here..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SupportAgent;
