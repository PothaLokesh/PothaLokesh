import { useState } from "react";
import { Layout, Server, BrainCircuit, Terminal, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillItem {
  name: string;
  level: number; // 0 - 100
  desc: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  summary: string;
  items: SkillItem[];
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const categories: SkillCategory[] = [
    {
      title: "Frontend Stack",
      icon: <Layout className="w-5 h-5" />,
      summary: "Crafting beautiful, responsive, and highly interactive user interfaces using modern React frameworks and utility systems.",
      items: [
        { name: "React.js", level: 90, desc: "State management, Hooks, reusable component architectures." },
        { name: "Next.js", level: 85, desc: "App router, SSR/ISR optimization, Server Components." },
        { name: "TypeScript", level: 85, desc: "Type safety, custom interfaces, scalable structures." },
        { name: "Tailwind CSS", level: 90, desc: "Utility-first CSS, custom variables, responsive grid design." },
      ],
    },
    {
      title: "Backend & Databases",
      icon: <Server className="w-5 h-5" />,
      summary: "Architecting decoupled microservices, secure RESTful APIs, and optimizing database indices and transactions.",
      items: [
        { name: "Node.js", level: 90, desc: "Event-driven asynchronous backend workflows, Nodemailer email engines." },
        { name: "Express.js", level: 90, desc: "Routing, middleware systems, custom authentication filters." },
        { name: "PostgreSQL", level: 80, desc: "Relational queries, index optimization, custom triggers." },
        { name: "MongoDB", level: 85, desc: "Document storage, aggregation frameworks, schema-less records." },
        { name: "REST APIs & Microservices", level: 90, desc: "Inter-service RPC communication, JWT route tokens, latencies < 20ms." },
      ],
    },
    {
      title: "AI Integration & CS Core",
      icon: <BrainCircuit className="w-5 h-5" />,
      summary: "Merging Artificial Intelligence and Retrieval-Augmented Generation with core computer science principles.",
      items: [
        { name: "RAG & Vector Search", level: 85, desc: "Gemini embeddings pipelines, pgvector indices, sub-50ms vector query retrieval." },
        { name: "Google Gemini AI", level: 85, desc: "Prompt optimization, chat intent detectors, structured LLM-extraction." },
        { name: "Data Structures (DSA)", level: 90, desc: "400+ problems solved on LeetCode & GeeksforGeeks." },
        { name: "OOP / DBMS / OS", level: 85, desc: "Solid Java Object-Oriented design, normalization, process allocation." },
      ],
    },
    {
      title: "DevOps, Cloud & Languages",
      icon: <Terminal className="w-5 h-5" />,
      summary: "Managing containerized applications, automating CI/CD routines, and deploying scalable servers.",
      items: [
        { name: "Docker & Nginx", level: 80, desc: "Multi-replica containers, Nginx reverse proxy load-balancers." },
        { name: "AWS EC2 & DevOps", level: 80, desc: "Cloud server allocation, automated CI/CD via GitHub Actions." },
        { name: "Java & Python", level: 85, desc: "Object-oriented architectures, data analytics, automation scripts." },
        { name: "SQL & C", level: 80, desc: "Complex queries, memory allocation basics, low-level pointers." },
      ],
    },
  ];

  return (
    <div className="w-full grid lg:grid-cols-12 gap-8 items-start">
      {/* Category Selection Sidebar */}
      <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none w-full">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`w-full text-left p-4 rounded-2xl flex items-center justify-between border transition-all duration-300 flex-shrink-0 lg:flex-shrink ${
              activeTab === idx
                ? "bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 border-brand-purple/40 text-white cyber-glow-pink"
                : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl ${
                activeTab === idx ? "bg-brand-purple/20 text-brand-purple" : "bg-white/5 text-gray-400"
              }`}>
                {cat.icon}
              </div>
              <span className="font-bold text-sm md:text-base whitespace-nowrap">{cat.title}</span>
            </div>
            <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 hidden md:block ${
              activeTab === idx ? "rotate-45 text-brand-pink" : "opacity-0"
            }`} />
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="lg:col-span-8 glass p-6 md:p-8 rounded-3xl border border-white/10 min-h-[380px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-bold text-brand-cyan bg-brand-cyan/15 rounded-full border border-brand-cyan/20 mb-3 uppercase tracking-wider">
                  Skill Focus
                </span>
                <h3 className="text-2xl font-extrabold text-white mb-2">{categories[activeTab].title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{categories[activeTab].summary}</p>
              </div>

              {/* Grid of Skill Items */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {categories[activeTab].items.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-end text-sm">
                      <span className="font-bold text-white text-sm md:text-base">{skill.name}</span>
                      <span className="font-medium text-brand-cyan">{skill.level}%</span>
                    </div>
                    {/* Glowing Progress bar */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink rounded-full"
                      />
                    </div>
                    <p className="text-[11px] md:text-xs text-gray-400 font-light italic leading-normal">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick tag indicators */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
              {categories[activeTab].items.map((skill, sIdx) => (
                <span key={sIdx} className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md bg-white/5 text-gray-400 border border-white/5">
                  #{skill.name.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
