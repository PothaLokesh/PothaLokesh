import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send, Sparkles, X, ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const PRESETS = [
  { label: "Brief Background", query: "Tell me about Lokesh's background." },
  { label: "Muno AI Internship", query: "What did he do at Muno AI?" },
  { label: "Learning Platform Project", query: "Explain the AI-Powered Learning Platform project." },
  { label: "ChatCalSpot Project", query: "Tell me about ChatCalSpot." },
  { label: "Key Skills", query: "What are his technical skills?" },
  { label: "Contact Info", query: "How can I contact Lokesh?" },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! I'm Lokesh's AI agent. Ask me anything about his experience, technical skills, or projects!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("background") || q.includes("who is") || q.includes("about lokesh") || q.includes("education")) {
      return `Potha Lokesh is a Software Engineer Intern and B.Tech graduate in Electronics and Communication Engineering from JNTUA College of Engineering, Anantapur (CGPA: 7.78/10, Graduated in 2026). He specializes in Full-Stack development and AI systems, and has a strong problem-solving background (400+ DSA problems solved on LeetCode & GeeksforGeeks).`;
    }
    
    if (q.includes("muno") || q.includes("internship") || q.includes("work") || q.includes("experience")) {
      return `Lokesh worked as a Software Engineer Intern at Muno AI Private Limited (Feb 2026 - May 2026, Remote). During his internship, he:
• Reduced code redundancy by 50% by building reusable React UI components.
• Designed, tested, and debugged 30+ REST API endpoints using Postman (latencies under 20ms).
• Developed 40% of the Employee and Manager dashboards using React & TypeScript.
• Built the Node.js backend for marketing automation using Nodemailer (emails dispatched in under 3s).
• Implemented JWT authentication, request validation, and centralized error handling for protected routes.`;
    }

    if (q.includes("learning") || q.includes("platform") || q.includes("rag") || q.includes("online learning")) {
      return `Lokesh architected the "AI-Powered Online Learning Platform". Key aspects:
• Next.js 16 frontend and Express microservices backend with 3 Docker replicas behind an Nginx load balancer (increased AI query throughput by 300%).
• Retrieval-Augmented Generation (RAG) pipeline built using Google Gemini embeddings and PostgreSQL pgvector (sub-50ms vector retrieval).
• Implemented short-term conversational memory and query rewriting.
• Configured automated CI/CD deployment on AWS EC2 using GitHub Actions and Docker Compose.`;
    }

    if (q.includes("chatcalspot") || q.includes("chat") || q.includes("cal") || q.includes("spot")) {
      return `ChatCalSpot is a real-time messaging platform built by Lokesh with Gemini AI integration. Key features:
• Real-time Socket.IO chat with JWT authentication, media sharing, and presence tracking.
• Custom Gemini AI integration that detects meeting intent from conversations and extracts details (title, date, time, location).
• AI-assisted scheduling workflow that creates Google Calendar events directly from chat previews.`;
    }

    if (q.includes("skills") || q.includes("technologies") || q.includes("languages") || q.includes("stack")) {
      return `Lokesh's core technical skills include:
• Languages: Java, JavaScript, Python, SQL, C
• Frontend: React.js, Next.js, TypeScript, Tailwind CSS
• Backend: Node.js, Express.js, Microservices, REST APIs
• Databases: PostgreSQL, MongoDB, pgvector
• DevOps/Cloud: Git, GitHub Actions, Docker, Nginx, AWS EC2, Postman
• AI/ML: RAG, Vector Embeddings, Google Gemini API
• Core CS: Data Structures & Algorithms (DSA), OOP, DBMS, OS`;
    }

    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("social")) {
      return `You can connect with Lokesh here:
• Email: lokesh941222@gmail.com
• Phone: +91 63030 90094
• LinkedIn: https://www.linkedin.com/in/lokesh-potha-7b0942253/
• GitHub: https://github.com/PothaLokesh
• Location: Andhra Pradesh, India.
Feel free to send a message using the form at the bottom of the page!`;
    }

    if (q.includes("leetcode") || q.includes("dsa") || q.includes("certification") || q.includes("rank") || q.includes("achievement")) {
      return `Here are Lokesh's certifications and competitive accomplishments:
• Solved 400+ DSA problems on LeetCode/GeeksforGeeks.
• Foundational Certificate in Data Science from IIT Madras (2024).
• Java Object-Oriented Programming Professional Certificate from Codio (edX).
• Secured State Rank 42 in APECET (7,000+ candidates) and State Rank 1357 in POLYCET (80,000+ candidates).`;
    }

    return `That's an interesting question! While I don't have that specific detail in my resume logs, Lokesh would love to talk about it with you! 
    
You can reach out to him via email at lokesh941222@gmail.com, or leave your details in the contact section below!`;
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getAIResponse(textToSend);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan text-white shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border-0 outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Ask Lokesh AI"
        >
          <div className="absolute inset-0 rounded-full bg-brand-purple blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageSquare className="w-6 h-6 relative z-10" />}
          <span className="absolute -top-12 right-0 bg-black/80 text-brand-cyan text-xs font-bold px-3 py-1.5 rounded-lg border border-brand-cyan/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 pointer-events-none shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-pulse" /> Ask Lokesh AI
          </span>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[550px] rounded-3xl glass border border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-purple/80 to-brand-pink/80 px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center border border-white/20 shadow-md">
                  <Bot className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-1">
                    Lokesh AI <Sparkles className="w-3 h-3 text-brand-cyan animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-white/70 font-medium">Assistant Agent • Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 rounded-full h-8 w-8"
              >
                <ChevronDown className="w-5 h-5" />
              </Button>
            </div>

            {/* Message History area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 border ${
                        msg.sender === "user"
                          ? "bg-brand-pink/20 border-brand-pink/30 text-brand-pink"
                          : "bg-brand-cyan/20 border-brand-cyan/30 text-brand-cyan"
                      }`}
                    >
                      {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-brand-purple text-white rounded-tr-none shadow-md shadow-brand-purple/20"
                          : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none shadow-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center">
                    <div className="w-7 h-7 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Presets Prompt Section */}
            <div className="px-4 py-3 bg-black/50 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(preset.query)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:border-brand-cyan/30 text-gray-300 hover:text-brand-cyan hover:bg-brand-cyan/5 transition-all duration-300 whitespace-nowrap"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Chat Input Footer */}
            <div className="p-4 bg-black/60 border-t border-white/10 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask about skills, projects, background..."
                className="bg-white/5 border-white/10 focus-visible:ring-brand-purple rounded-full text-white text-sm placeholder:text-gray-500"
              />
              <Button
                size="icon"
                onClick={() => handleSend(input)}
                className="rounded-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 hover:scale-105 transition-all flex-shrink-0 text-white border-0"
              >
                <Send className="w-4.5 h-4.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
