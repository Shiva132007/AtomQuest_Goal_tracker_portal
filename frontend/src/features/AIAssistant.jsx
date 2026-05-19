import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, X, ChevronUp, Send } from "lucide-react";
import { Card, CardContent } from "../Components/ui/Card";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI Productivity Coach. I can help you prioritize goals and stay motivated. What are we focusing on today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const mockResponses = [
    "Based on your recent activity, I suggest breaking down your 'Q3 Sales Target' into smaller weekly milestones.",
    "You've been very consistent this week! Take a 5-minute Pomodoro break to maintain peak focus.",
    "Pro Tip: Time-blocking your morning for deep work will increase your productivity score by 15%.",
    "I've analyzed your goals. You're 80% likely to achieve your sprint goal if you dedicate 2 hours today to coding."
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 shadow-elevation magic-border rounded-2xl"
          >
            <Card className="border-0 shadow-none glass-panel overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <span className="font-semibold">AI Coach</span>
                  <Sparkles size={14} className="text-yellow-300 animate-pulse" />
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                  <X size={18} />
                </button>
              </div>
              
              <CardContent className="p-4 h-64 overflow-y-auto flex flex-col gap-3 bg-neutral-50/50 dark:bg-neutral-900/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.role === "user" ? "bg-primary-500 text-white rounded-tr-none" : "bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-tl-none"}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-neutral-800 p-3 rounded-2xl rounded-tl-none border border-neutral-100 dark:border-neutral-700 flex gap-1">
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for advice..."
                  className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button onClick={handleSend} className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-xl transition">
                  <Send size={16} />
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-600 text-white rounded-full flex items-center justify-center shadow-elevation hover:shadow-lg transition-all absolute right-0 bottom-0 z-50"
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-neutral-900"></span>
        )}
      </motion.button>
    </div>
  );
}
