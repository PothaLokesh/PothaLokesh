import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Briefcase,
  Trophy,
  Smartphone,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Mail,
  MapPin,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Send,
  Eye,
  Heart,
  Github
} from "lucide-react";
import {
  SiLinkedin,
  SiGithub,
  SiLeetcode,
  SiGeeksforgeeks
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Import custom interactive widgets
import SkillsSection from "@/components/portfolio/SkillsSection";
import ArchitectureDiagram from "@/components/portfolio/ArchitectureDiagram";
import AIAssistant from "@/components/portfolio/AIAssistant";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { toast } = useToast();

  const LINKS = {
    linkedin: "https://www.linkedin.com/in/lokesh-potha-7b0942253/",
    github: "https://github.com/PothaLokesh",
    leetcode: "https://leetcode.com/u/lokesh941222/",
    email: "lokesh941222@gmail.com",
    phone: "+91 63030 90094",
    resume: "https://drive.google.com/file/d/12UIXekdkXQoAsKV2FwKpA3wgfsVm3EkJ/view",
  };

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const toggleLike = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening modal
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const onContactSubmit = (values: z.infer<typeof contactSchema>) => {
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for reaching out, Lokesh's agent has dispatched this to him.",
    });
    form.reset();
  };

  const munoExperienceBullets = [
    "Reduced code redundancy by 50% by designing reusable UI components, improving maintainability, consistency, and development efficiency across the application.",
    "Developed 40% of the Employee and Manager dashboards using TypeScript, delivering scalable and responsive frontend features.",
    "Designed, tested, and debugged 30+ REST API endpoints using Postman, maintaining API response latencies of under 20ms.",
    "Built the backend for Muno AI’s marketing website using Node.js, handling user form submissions and automating email workflows with Nodemailer, achieving email dispatch times of under 3 seconds.",
    "Implemented JWT-based authentication, request validation, and centralized error handling to secure protected routes and improve API reliability.",
    "Collaborated on a microservices-based architecture, contributing to backend service development, API integration, and inter-service communication across multiple services."
  ];

  const projects = [
    {
      id: "learning",
      title: "AI‑Powered Online Learning Platform",
      shortDescription: "Decoupled Next.js 16/Express microservices e-learning site with pgvector RAG semantic search.",
      longDescription: "A fully scaled educational platform hosting AI course generation. Architected a decoupled Express microservices backend operating behind an Nginx load balancer to support heavy traffic, coupled with a Retrieval-Augmented Generation (RAG) system for precise information extraction.",
      tags: ["Next.js 16", "Express.js", "PostgreSQL", "pgvector", "Docker", "Nginx", "AWS EC2", "Gemini Embeddings"],
      image: "/a futuristic digital.png",
      live: "https://online-learning-platform-git-main-lokeshs-projects-a2d34815.vercel.app/",
      github: "https://github.com/PothaLokesh",
      achievements: [
        "Architected an Express microservices backend with 3 Docker replicas behind an Nginx load balancer, increasing throughput by 300%.",
        "Built a Retrieval-Augmented Generation (RAG) pipeline using Gemini embeddings and PostgreSQL pgvector, achieving sub-50ms vector query retrieval.",
        "Implemented query rewriting and conversational memory to preserve context across follow-up questions.",
        "Automated CI/CD workflows utilizing GitHub Actions, Docker Compose, and AWS EC2 with exponential backoff handlers for API rate limits."
      ]
    },
    {
      id: "chatcal",
      title: "ChatCalSpot (AI Agent Scheduler)",
      shortDescription: "Real-time chat integrating Socket.IO messaging with Gemini AI scheduling automation.",
      longDescription: "A real-time communication platform built to streamline scheduling. By running an automated LLM extraction pipeline on active conversations, the system detects meeting intent and instantly formats calendar events.",
      tags: ["React.js", "Node.js", "Express.js", "Socket.IO", "MongoDB", "Google Gemini AI"],
      image: "/QuickApp.png",
      live: "https://chat-app-front-zeta.vercel.app/",
      github: "https://github.com/PothaLokesh",
      achievements: [
        "Integrated Google Gemini AI to analyze active chats, detect event intentions, and extract parameters (title, date, time, location).",
        "Engineered an LLM structured extraction pipeline transforming raw text into event-compliant JSON metadata.",
        "Created an AI scheduling wizard converting parsed data into event templates for direct Google Calendar synchronization.",
        "Developed custom WebSockets using Socket.IO featuring active user presence, media transfer, and JWT-secured chat routes."
      ]
    },
    {
      id: "marketpulse",
      title: "MarketPulse Dashboard",
      shortDescription: "A real-time financial tracking platform featuring Cloudflare Workers and interactive charts.",
      longDescription: "A high-performance financial tracker rendering active stocks, technical analysis charts, and automated global news feeds.",
      tags: ["Next.js", "TypeScript", "Cloudflare Workers", "MongoDB", "Recharts"],
      image: "/marketpulse.png",
      live: "https://marketpulse-dashboard-front.vercel.app/",
      github: "https://github.com/PothaLokesh",
      achievements: [
        "Constructed custom ticker sockets feeding stock prices directly to interactive Recharts interfaces.",
        "Utilized Cloudflare Workers to serve serverless news feed caches with minimal latency.",
        "Configured secure user wallets and portfolio allocations mapped on MongoDB clusters."
      ]
    }
  ];

  const certifications = [
    {
      title: "Foundational Certificate in Data Science",
      issuer: "IIT Madras",
      year: "2024",
      icon: <Award className="w-6 h-6 text-brand-cyan" />,
      detail: "Rigorous curriculum focused on statistical analysis, linear algebra, Python data modeling, and machine learning structures."
    },
    {
      title: "Java Object-Oriented Programming",
      issuer: "Codio (via edX)",
      year: "2024",
      icon: <BookOpen className="w-6 h-6 text-brand-purple" />,
      detail: "Professional cert validating advanced software engineering design patterns, inheritance frameworks, and memory profiling in Java."
    },
    {
      title: "DSA Accomplishments",
      issuer: "LeetCode & GFG",
      year: "400+ Solved",
      icon: <Flame className="w-6 h-6 text-brand-pink" />,
      detail: "Mastered algorithmic paradigms (Dynamic Programming, Graphs, Backtracking) with a robust ranking database."
    },
    {
      title: "State Ranks & Rankings",
      issuer: "APECET & POLYCET",
      year: "Top 0.5%",
      icon: <Trophy className="w-6 h-6 text-brand-blue" />,
      detail: "Secured Rank 42 among 7,000+ candidates in APECET and Rank 1357 among 80,000+ candidates in POLYCET."
    }
  ];

  // Motion variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-brand-purple/30 selection:text-white font-sans text-foreground overflow-x-hidden relative cyber-grid">

      {/* Background Ambience Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-15%] w-[700px] h-[700px] bg-brand-purple/10 rounded-full blur-[130px] animate-blob"></div>
        <div className="absolute top-[25%] right-[-10%] w-[650px] h-[650px] bg-brand-cyan/80% bg-brand-cyan/10 rounded-full blur-[130px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[700px] h-[700px] bg-brand-pink/10 rounded-full blur-[130px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              onClick={() => scrollToSection("home")}
              className="text-xl md:text-2xl font-black bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(124,58,237,0.4)]"
              whileHover={{ scale: 1.05 }}
            >
              POTHA LOKESH
            </motion.h1>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5">
              {['Home', 'About', 'Experience', 'Skills', 'Work', 'Certifications', 'Contact'].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-xs font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-full px-4"
                >
                  {item}
                </Button>
              ))}
              <Button
                className="ml-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white shadow-lg shadow-brand-purple/20 transition-all border-0 text-xs py-1 h-9 px-4 font-bold"
                asChild
              >
                <a href={LINKS.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" /> Resume
                </a>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-brand-cyan transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden glass border-b border-white/10"
            >
              <div className="flex flex-col p-6 gap-3.5">
                {['Home', 'About', 'Experience', 'Skills', 'Work', 'Certifications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm font-bold text-left py-2.5 text-gray-300 hover:text-white border-b border-white/5 last:border-0"
                  >
                    {item}
                  </button>
                ))}
                <Button
                  className="w-full mt-3 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink text-white border-0 text-xs py-2.5 font-bold shadow-lg"
                  asChild
                >
                  <a href={LINKS.resume} target="_blank" rel="noreferrer">
                    <Download className="w-4 h-4 mr-2 inline" /> View Resume
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center w-full">
          {/* Hero Left Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-brand-cyan/30 text-brand-cyan font-bold text-xs mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse"></span>
              Full‑Stack & AI Systems Architect
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-white">
              Building Immersive <br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                AI Solutions
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Hi, I'm <strong className="text-white font-semibold">Potha Lokesh</strong>. I engineer scalable microservice architectures, build RAG engines using pgvector, and design interactive frontends. Experienced in merging deep learning agents with modern web applications.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="rounded-full h-12 px-6 text-sm bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan/90 hover:to-brand-blue/90 shadow-lg shadow-brand-cyan/25 border-0 text-white font-bold" 
                onClick={() => scrollToSection('work')}
              >
                Explore Projects
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full h-12 px-6 text-sm border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm" 
                onClick={() => scrollToSection('contact')}
              >
                Hire Me
              </Button>
            </div>

            {/* Social Links & Fast Stats */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-4 text-gray-400">
                <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all p-2 bg-white/5 rounded-full border border-white/5 hover:border-white/20">
                  <SiGithub size={20} />
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#0077b5] hover:scale-110 transition-all p-2 bg-white/5 rounded-full border border-white/5 hover:border-[#0077b5]/30">
                  <SiLinkedin size={20} />
                </a>
                <a href={LINKS.leetcode} target="_blank" rel="noreferrer" className="hover:text-[#ffa116] hover:scale-110 transition-all p-2 bg-white/5 rounded-full border border-white/5 hover:border-[#ffa116]/30">
                  <SiLeetcode size={20} />
                </a>
                <a href={`mailto:${LINKS.email}`} className="hover:text-brand-pink hover:scale-110 transition-all p-2 bg-white/5 rounded-full border border-white/5 hover:border-brand-pink/30">
                  <Mail size={20} />
                </a>
              </div>
              
              <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
              
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-brand-pink" />
                  <span>400+ DSA Solved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-brand-cyan" />
                  <span>SDE Intern Experience</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative w-[220px] h-[285px] mx-auto z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan via-brand-pink to-brand-purple rounded-[2rem] rotate-6 opacity-40 blur-2xl animate-pulse"></div>
              
              <div className="absolute inset-0 glass rounded-[2rem] -rotate-3 border border-white/20 shadow-2xl overflow-hidden group hover:rotate-0 transition-all duration-700 ease-in-out">
                <img
                  src="/photo1.jpg"
                  alt="Lokesh Potha"
                  className="w-full h-full object-cover transition-all duration-700"
                />
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Floating Widget 2 */}
              <div className="absolute -right-12 bottom-12 glass p-3.5 rounded-2xl border border-white/15 shadow-xl animate-float scale-90">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-purple/15 rounded-xl text-brand-purple border border-brand-purple/20">
                    <SiLeetcode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Solved Problems</p>
                    <p className="font-extrabold text-white text-sm">400+ Problems</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="text-brand-purple font-bold text-xs uppercase tracking-widest bg-brand-purple/10 px-3 py-1 rounded-full border border-brand-purple/20 mb-4 inline-block">
              Background Summary
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Lokesh</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            {/* Biography */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Electronics Graduate turned AI Developer
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light mb-6">
                I am a Bachelor of Technology in Electronics and Communication Engineering graduate from <strong className="text-white font-semibold">JNTUA College of Engineering, Anantapur</strong> (CGPA: 7.78/10). My academic background gave me strong logical math skills, which I naturally channel into software engineering.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light mb-8">
                I thrive in the intersection of microservices development and machine learning models. I enjoy writing performant Javascript, building API layers, containerizing nodes, and setting up automated cloud deployment pipelines. I dedicate time daily to sharpening my computer science fundamentals and practicing algorithmic problems.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">University</span>
                  <span className="text-xs font-bold text-white leading-snug">JNTUA College of Eng.</span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Internship Role</span>
                  <span className="text-xs font-bold text-white leading-snug">Software Engineer Intern</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Dashboard */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-cyan/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="mt-8">
                  <h4 className="text-3xl font-black text-white">1+</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Internship Done</p>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-purple/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                  <SiLeetcode className="w-5 h-5" />
                </div>
                <div className="mt-8">
                  <h4 className="text-3xl font-black text-white">400+</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">DSA Solved</p>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-pink/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="mt-8">
                  <h4 className="text-3xl font-black text-white">300%</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">AI Speed Boosted</p>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-brand-blue/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div className="mt-8">
                  <h4 className="text-3xl font-black text-white">Top 0.5%</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">APECET Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-28 relative">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <span className="text-brand-cyan font-bold text-xs uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20 mb-4 inline-block">
              Employment History
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-pink to-brand-purple mx-auto rounded-full mt-4"></div>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4 md:ml-8 space-y-12">
            {/* Node pulsing circle */}
            <div className="absolute -left-2 top-1.5 w-4.5 h-4.5 rounded-full bg-brand-purple border border-white/20 shadow-[0_0_10px_#7c3aed] animate-pulse"></div>

            <div className="glass p-6 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-brand-purple/40 transition-colors duration-500">
              {/* Radial gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest bg-brand-purple/20 text-brand-purple border border-brand-purple/35 inline-block mb-3">
                    Internship Role
                  </span>
                  <h3 className="text-xl md:text-3xl font-extrabold text-white">Software Engineer Intern</h3>
                  <h4 className="text-sm md:text-base font-bold text-brand-cyan mt-1 flex items-center gap-1.5">
                    Muno AI Private Limited
                  </h4>
                </div>
                <div className="text-left md:text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-200">Feb 2026 – May 2026</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-wider">Remote (India)</p>
                </div>
              </div>

              {/* Bullets grid */}
              <div className="space-y-4 text-sm md:text-base text-gray-300">
                {munoExperienceBullets.map((bullet, idx) => (
                  <div key={idx} className="flex gap-3 items-start group/item">
                    <span className="p-1 mt-1 rounded-full bg-brand-cyan/15 text-brand-cyan group-hover/item:scale-110 transition-transform">
                      <Flame className="w-3 h-3 text-brand-cyan" />
                    </span>
                    <p className="leading-relaxed font-light text-gray-300 group-hover/item:text-white transition-colors duration-200">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="text-brand-pink font-bold text-xs uppercase tracking-widest bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20 mb-4 inline-block">
              Skill Mapping
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink animate-gradient-x">Proficiencies</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-purple to-brand-pink mx-auto rounded-full mt-4"></div>
          </motion.div>

          <SkillsSection />
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <span className="text-brand-purple font-bold text-xs uppercase tracking-widest bg-brand-purple/10 px-3 py-1 rounded-full border border-brand-purple/20 mb-4 inline-block">
                Software Artifacts
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Work</span>
              </h2>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs h-11 px-5"
              onClick={() => window.open(LINKS.github, "_blank")}
            >
              View GitHub Profile <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group h-full cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl h-full flex flex-col hover:border-brand-purple/50 transition-all duration-500 relative ring-1 ring-white/5 hover:ring-brand-purple/50 hover:-translate-y-2">
                  
                  {/* Aspect Ratio Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                    
                    {/* Heart button */}
                    <button 
                      onClick={(e) => toggleLike(project.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-4.5 h-4.5 ${likedProjects.has(project.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </button>
                    
                    {/* Expand Badge on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]">
                      <div className="px-4 py-2 rounded-full bg-brand-purple text-xs font-bold text-white flex items-center gap-1.5 shadow-lg border border-brand-purple/20">
                        <Eye className="w-4 h-4" /> View Architecture & Details
                      </div>
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Tag row */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-white/10 text-brand-cyan rounded text-[10px] font-bold uppercase tracking-wider border border-white/5">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-white/5 text-gray-400 rounded text-[10px] font-bold">
                            +{project.tags.length - 3} More
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-cyan group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Project Full Overlay / Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-4xl glass border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-50 flex flex-col md:flex-row max-h-[90vh] text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Left Column: Banner */}
              <div className="w-full md:w-[40%] relative bg-black/40 flex flex-col justify-between p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed mb-6">
                    {selectedProject.longDescription}
                  </p>
                </div>
                
                {/* Tech Tags Wrap */}
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {selectedProject.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-brand-cyan uppercase font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full text-xs font-bold h-10 border-0" asChild>
                      <a href={selectedProject.live} target="_blank" rel="noreferrer">
                        Visit Live <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 rounded-full text-white border-white/20 hover:bg-white/10 text-xs font-bold h-10" asChild>
                      <a href={selectedProject.github} target="_blank" rel="noreferrer">
                        Codebase <Github className="w-3.5 h-3.5 ml-1.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Modal Right Column: Technical Details & SVG Diagram */}
              <div className="w-full md:w-[60%] p-6 md:p-8 overflow-y-auto bg-black/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-pink">
                      Engineering Metrics & Impact
                    </h4>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Achievements lists */}
                  <div className="space-y-3 mb-6">
                    {selectedProject.achievements.map((item: string, index: number) => (
                      <div key={index} className="flex gap-2.5 items-start text-xs sm:text-sm text-gray-300">
                        <span className="mt-1 font-bold text-brand-cyan text-xs">✔</span>
                        <p className="font-light leading-normal">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Show SVG Diagram if exists */}
                {(selectedProject.id === "learning" || selectedProject.id === "chatcal") && (
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-cyan mb-2">
                      System Architecture Flow
                    </h4>
                    <ArchitectureDiagram projectType={selectedProject.id} />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certifications & Achievements Section */}
      <section id="certifications" className="py-28 relative bg-black/20">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="text-brand-pink font-bold text-xs uppercase tracking-widest bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20 mb-4 inline-block">
              Verifiable Credentials
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Achievements</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto rounded-full mt-4"></div>
          </motion.div>

          {/* Grid of Certs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110"></div>
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    {cert.icon}
                  </div>
                  <h3 className="font-extrabold text-sm md:text-base text-white group-hover:text-brand-cyan transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-bold mt-1.5 uppercase tracking-wider">{cert.issuer}</p>
                  <p className="text-xs text-gray-300 font-light mt-3 leading-relaxed">
                    {cert.detail}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-brand-pink font-semibold">
                  <span>Authorized Log</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold rounded">
                    {cert.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee Banner */}
      <section className="py-16 bg-black/40 border-y border-white/5 relative overflow-hidden backdrop-blur-sm z-10">
        <div className="flex overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-16 items-center flex-nowrap animate-scroll-fast whitespace-nowrap pl-16">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center text-3xl font-black text-white/5 whitespace-nowrap uppercase tracking-widest cursor-default">
                <span className="hover:text-brand-cyan transition-colors">React.js</span>
                <span>●</span>
                <span className="hover:text-brand-purple transition-colors">Next.js 16</span>
                <span>●</span>
                <span className="hover:text-brand-pink transition-colors">TypeScript</span>
                <span>●</span>
                <span className="hover:text-brand-blue transition-colors">Node.js</span>
                <span>●</span>
                <span className="hover:text-brand-cyan transition-colors">PostgreSQL</span>
                <span>●</span>
                <span className="hover:text-brand-purple transition-colors">pgvector RAG</span>
                <span>●</span>
                <span className="hover:text-brand-pink transition-colors">Docker Compose</span>
                <span>●</span>
                <span className="hover:text-brand-blue transition-colors">Google Gemini API</span>
                <span>●</span>
                <span className="hover:text-brand-cyan transition-colors">AWS EC2</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="glass rounded-[2.5rem] p-8 md:p-14 text-center border border-white/10 relative overflow-hidden group hover:border-brand-blue/30 transition-colors duration-500">
            {/* Ambient overlay background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 group-hover:from-brand-purple/10 group-hover:to-brand-pink/10 transition-colors duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <span className="text-brand-cyan font-bold text-xs uppercase tracking-widest bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20 mb-4 inline-block">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
                Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink animate-gradient-x">Together</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
                Have an engineering project in mind, need to consult on an AI implementation, or looking to hire Lokesh? Submit your query below!
              </p>

              {/* Reactive Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onContactSubmit)} className="max-w-xl mx-auto space-y-4 text-left mb-10">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              className="bg-white/5 border-white/10 focus-visible:ring-brand-purple rounded-xl h-11 text-white placeholder:text-gray-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-brand-pink font-semibold mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Your Email"
                              className="bg-white/5 border-white/10 focus-visible:ring-brand-purple rounded-xl h-11 text-white placeholder:text-gray-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-brand-pink font-semibold mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project or inquiries..."
                            rows={4}
                            className="bg-white/5 border-white/10 focus-visible:ring-brand-purple rounded-xl text-white placeholder:text-gray-500 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-brand-pink font-semibold mt-1" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full rounded-xl bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan hover:opacity-90 transition-all text-white font-bold h-11 border-0"
                  >
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>

              <div className="w-16 h-px bg-white/10 mx-auto mb-8"></div>

              {/* Direct Channels */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-300 font-semibold items-center">
                <a href={`mailto:${LINKS.email}`} className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-cyan" /> {LINKS.email}
                </a>
                <a href={`tel:${LINKS.phone}`} className="hover:text-white transition-colors flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-brand-purple" /> {LINKS.phone}
                </a>
                <span className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4 text-brand-pink" /> Andhra Pradesh, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-gray-500 text-xs md:text-sm bg-black/60 backdrop-blur-sm z-10 relative">
        <p>© 2026 Potha Lokesh. Built with <Heart className="w-3 h-3 inline text-brand-pink mx-0.5 fill-brand-pink animate-pulse" /> using React, Vite & Tailwind CSS.</p>
      </footer>

      {/* AI Assistant Chat widget */}
      <AIAssistant />
    </div>
  );
}
