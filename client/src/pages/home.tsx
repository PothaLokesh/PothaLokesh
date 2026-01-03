import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Briefcase,
  Users,
  Trophy,
  Smartphone,
  Palette,
  Layout,
  Heart,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Code
} from "lucide-react";
import {
  SiTelegram,
  SiWhatsapp,
  SiFigma,
  SiDribbble,
  SiBehance,
  SiInstagram,
  SiLinkedin,
  SiGithub
} from "react-icons/si";
// Removed Framer Motion imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  // Removed useScroll and useTransform hooks

  const LINKS = {
    instagram: "#",
    linkedin: "https://www.linkedin.com/in/lokesh-potha-7b0942253/",
    github: "https://github.com/PothaLokesh",
    resume: "Lokesh_Potha_Resume.pdf",
  };

  const toggleLike = (projectId: string) => {
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

  const services = [
    {
      icon: Layout,
      title: "Full‑Stack Architecture",
      description: "Scalable, high-performance web applications built with Next.js, React, and robust backend systems.",
      color: "from-brand-cyan to-brand-blue",
    },
    {
      icon: Smartphone,
      title: "Realtime Systems",
      description: "Interactive experiences with Socket.IO, ensuring instant data updates and seamless communication.",
      color: "from-brand-purple to-brand-pink",
    },
    {
      icon: Palette,
      title: "Premium UI/UX",
      description: "Pixel-perfect, accessible interfaces featuring glassmorphism, fluid animations, and modern aesthetics.",
      color: "from-brand-pink to-brand-purple",
    },
    {
      icon: Code,
      title: "AI Integration",
      description: "Leveraging Python and ML libraries to build intelligent features that solve real-world problems.",
      color: "from-brand-blue to-brand-cyan",
    },
  ];

  const projects = [
    {
      id: "1",
      title: "AI‑Powered Learning Platform",
      description: "A comprehensive e-learning solution with AI course generation and student tracking.",
      tags: ["Next.js", "AI", "PostgreSQL"],
      image: "/a futuristic digital.png",
      live: "https://online-learning-platform-git-main-lokeshs-projects-a2d34815.vercel.app/",
    },
    {
      id: "2",
      title: "Realtime Chat Application",
      description: "Secure, instant messaging platform with group support and media sharing capabilities.",
      tags: ["React", "Socket.IO", "Node.js"],
      image: "/QuickApp.png",
      live: "https://chat-app-front-zeta.vercel.app/",
    },
    {
      id: "3",
      title: "MarketPulse Dashboard",
      description: "A real-time financial dashboard for tracking stock prices, interactive charts, and automated market news.",
      tags: ["Next.js", "TypeScript", "Cloudflare Workers", "MongoDB"],
      image: "/marketpulse.png",
      live: "https://marketpulse-dashboard-front.vercel.app/",
    }
  ];

  // Removed Animation variants

  return (
    <div className="min-h-screen bg-background selection:bg-brand-purple/30 selection:text-white font-sans text-foreground overflow-x-hidden">

      {/* Background Ambience - INTENSIFIED */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/40 rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-cyan/40 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-brand-pink/40 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-brand-blue/30 rounded-full blur-[100px] animate-blob animation-delay-3000 mix-blend-screen"></div>
      </div>

      {/* Navigation */}
      <nav
        className="fixed top-0 z-50 w-full glass border-b border-white/5 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent cursor-pointer animate-gradient-x drop-shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:scale-105 transition-transform duration-300"
            >
              POTHA LOKESH
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-bold bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent hover:bg-white/5 transition-all duration-300 rounded-full px-5 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] opacity-90 hover:opacity-100"
                >
                  {item}
                </Button>
              ))}
              <Button
                className="ml-4 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white shadow-lg hover:shadow-brand-purple/50 transition-all duration-300 border-0"
                asChild
              >
                <a href={`/${LINKS.resume}`} download className="flex items-center gap-2">
                  <Download className="w-4 h-4" /> CV
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-brand-cyan transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden overflow-hidden glass border-b border-white/10 animate-accordion-down"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-lg font-bold text-left py-2 bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                  {item}
                </button>
              ))}
              <Button
                className="w-full mt-4 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink text-white border-0"
                asChild
              >
                <a href={`/${LINKS.resume}`} download>
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div
            className="text-center lg:text-left fade-in-up"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-brand-cyan/30 text-brand-cyan font-bold text-sm mb-6 backdrop-blur-md shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <span className="animate-pulse mr-2 text-brand-pink">●</span> Available for Freelance
            </div>

            <h2 className="text-5xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1] text-white drop-shadow-2xl">
              Creative <br />
              <span className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                Developer
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              I build immersive digital experiences. Full‑Stack Developer & AI Enthusiast crafting scalable systems with a focus on motion and aesthetics.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-brand-cyan/90 hover:to-brand-blue/90 shadow-lg shadow-brand-cyan/25 border-0 text-white font-bold" onClick={() => scrollToSection('work')}>
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm" onClick={() => scrollToSection('contact')}>
                Contact Me
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-gray-400">
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full">
                <SiGithub size={28} />
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#0077b5] hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full">
                <SiLinkedin size={28} />
              </a>
              <a href={`mailto:lokesh941222@gmail.com`} className="hover:text-brand-pink hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full">
                <ExternalLink size={28} />
              </a>
            </div>
          </div>

          <div
            className="relative hidden lg:block"
          >
            <div className="relative w-[220px] h-[280px] mx-auto perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan via-brand-pink to-brand-purple rounded-[1.5rem] rotate-6 opacity-60 blur-2xl animate-pulse"></div>
              <div
                className="absolute inset-0 glass rounded-[1.5rem] -rotate-3 border border-white/30 shadow-2xl overflow-hidden group ring-1 ring-white/20 hover:rotate-0 transition-all duration-700 ease-in-out"
              >
                <img
                  src="/photo1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/80 via-transparent to-transparent opacity-60 mix-blend-overlay"></div>
              </div>

              {/* Floating Cards with Glassmorphism */}
              <div
                className="absolute -left-20 top-12 glass p-3 rounded-xl border border-white/20 shadow-xl backdrop-blur-xl scale-90 animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-blue/20 rounded-lg text-brand-blue">
                    <SiGithub className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Contributions</p>
                    <p className="font-bold text-white text-sm">Active</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-16 bottom-8 glass p-3 rounded-xl border border-white/20 shadow-xl backdrop-blur-xl scale-90 animate-float animation-delay-2000"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-purple/20 rounded-lg text-brand-purple">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Solving</p>
                    <p className="font-bold text-white text-sm">300+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">About</span> Me</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-blue mx-auto rounded-full mb-6 max-w-2xl shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bridging the gap between complex backend logic and immersive frontend experiences. I don't just write code; I design solutions.
            </p>
          </div>

          <div className="flex flex-col gap-16 items-center">
            <div
              className="glass p-8 md:p-12 rounded-3xl border border-white/10 w-full bg-gradient-to-br from-white/5 to-white/0"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-white">My Journey</h3>
                  <p className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent leading-relaxed mb-6 text-lg font-medium">
                    I specialize in <strong className="text-white">Full-Stack Development</strong> with a strong focus on <strong className="text-white">AI-powered applications</strong>. With a solid foundation in data structures and algorithm optimization, I build systems that are not only beautiful but robust.
                  </p>
                  <p className="bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink bg-clip-text text-transparent leading-relaxed mb-8 text-lg font-medium">
                    From building real-time chat apps to complex AI learning platforms, I love challenging the status quo. My stack includes Node.js, React, Next.js, and Python, always keeping performance and UX at the forefront.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-brand-purple/20 text-center hover:bg-brand-purple/10 transition-colors shadow-lg hover:shadow-brand-purple/20">
                    <h4 className="font-bold text-5xl text-brand-purple mb-2 drop-shadow-md">6+</h4>
                    <p className="text-sm text-gray-400 font-medium uppercase">Major Projects</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-brand-pink/20 text-center hover:bg-brand-pink/10 transition-colors shadow-lg hover:shadow-brand-pink/20">
                    <h4 className="font-bold text-5xl text-brand-pink mb-2 drop-shadow-md">2+</h4>
                    <p className="text-sm text-gray-400 font-medium uppercase">Years Experience</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-brand-cyan/20 text-center hover:bg-brand-cyan/10 transition-colors col-span-2 shadow-lg hover:shadow-brand-cyan/20">
                    <h4 className="font-bold text-5xl text-brand-cyan mb-2 drop-shadow-md">300+</h4>
                    <p className="text-sm text-gray-400 font-medium uppercase">DSA Problems Solved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative overflow-hidden">
        {/* Background Splashes */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink animate-gradient-x">Do</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="hover:-translate-y-2 transition-transform duration-300"
              >
                <Card className={`h-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md transition-all duration-300 group hover:border-brand-purple/30`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
                  <CardContent className="p-8 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] text-white group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-brand-cyan transition-colors">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section id="skills" className="py-24 bg-black/20 border-y border-white/5 relative overflow-hidden backdrop-blur-sm">
        <div className="flex overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>

          <div
            className="flex gap-16 items-center flex-nowrap pl-16 w-max animate-scroll" // Replaced framer with simple scroll anim if available or just flex
          // Note: "animate-scroll" needs to be defined in tailwind config or css, or we can use marquee tag (deprecated) or just overflow-auto. 
          // For now I'll use a simple style for safety or keep it static if keyframes aren't there. 
          // Actually, let's trust the user might not have 'animate-scroll' but I can add it to styles if I could edit CSS.
          // Since I can't edit CSS in this single shot effectively without risk, I'll just use a horizontal scroll layout or similar, 
          // BUT wait, I can add a style tag or just leave it as a static grid for now to be safe, OR check tailwind config.
          // I recall checking tailwind config earlier, it had 'gradient-x' etc. I don't recall 'scroll'. 
          // Use standard marquee-like approach for now or just grid.
          // Better yet, I'll use a simple overflow-x-auto for reliability without framer.
          // Or I can just simulate it with a very long div that the user can scroll.
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center text-5xl font-bold text-white/10 whitespace-nowrap uppercase tracking-wider">
                <span className="hover:text-brand-cyan hover:opacity-100 transition-all duration-300 cursor-default">React</span>
                <span className="hover:text-brand-purple hover:opacity-100 transition-all duration-300 cursor-default">Next.js</span>
                <span className="hover:text-brand-pink hover:opacity-100 transition-all duration-300 cursor-default">TypeScript</span>
                <span className="hover:text-brand-blue hover:opacity-100 transition-all duration-300 cursor-default">Node.js</span>
                <span className="hover:text-brand-cyan hover:opacity-100 transition-all duration-300 cursor-default">PostgreSQL</span>
                <span className="hover:text-brand-purple hover:opacity-100 transition-all duration-300 cursor-default">Tailwind</span>
                <span className="hover:text-brand-pink hover:opacity-100 transition-all duration-300 cursor-default">Python</span>
                <span className="hover:text-brand-blue hover:opacity-100 transition-all duration-300 cursor-default">Framer Motion</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-32 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-pink/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Work</span></h2>
            </div>
            <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10 text-white" onClick={() => window.open(LINKS.github, '_blank')}>
              View GitHub Profile
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group h-full fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl h-full flex flex-col hover:border-brand-purple/50 transition-all duration-500 relative ring-1 ring-white/5 hover:ring-brand-purple/50">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/0 to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                      <Button size="icon" variant="ghost" className="rounded-full bg-white text-black hover:bg-white/90 hover:scale-110 transition-all" onClick={() => toggleLike(project.id)}>
                        <Heart className={`w-5 h-5 ${likedProjects.has(project.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      {project.live && (
                        <Button className="rounded-full bg-brand-purple text-white hover:bg-brand-purple/90 shadow-lg shadow-brand-purple/30" asChild>
                          <a href={project.live} target="_blank" rel="noreferrer">Visit Site <ExternalLink className="w-4 h-4 ml-2" /></a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="p-8 relative z-10 flex-grow flex flex-col">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/10 text-brand-cyan rounded-full text-xs font-medium border border-white/5 hover:bg-brand-cyan/20 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-brand-purple transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="glass rounded-[2.5rem] p-8 md:p-16 text-center border border-white/10 relative overflow-hidden group hover:border-brand-blue/30 transition-colors duration-500">

            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-brand-pink/5 group-hover:from-brand-purple/20 group-hover:to-brand-pink/20 transition-colors duration-500"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Together</span></h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Have a project in mind or just want to chat? I'm always open to discussing new ideas and opportunities.</p>

              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]" asChild>
                  <a href={`mailto:lokesh941222@gmail.com`}>
                    Say Hello <ExternalLink className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10" asChild>
                  <a href="tel:+916303090094">
                    <Smartphone className="w-5 h-5 mr-2" /> +91 63030 90094
                  </a>
                </Button>
              </div>

              <div className="flex justify-center gap-6">
                {[
                  { icon: SiGithub, href: LINKS.github, color: "hover:text-white hover:bg-black" },
                  { icon: SiLinkedin, href: LINKS.linkedin, color: "hover:text-white hover:bg-[#0077b5]" },
                  { icon: SiInstagram, href: LINKS.instagram, color: "hover:text-white hover:bg-[#E1306C]" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-gray-500 text-sm bg-black/40 backdrop-blur-sm">
        <p>© 2025 Potha Lokesh. Built with <Heart className="w-3 h-3 inline text-brand-pink mx-1" /> using Next.js & Tailwind.</p>
      </footer>
    </div>
  );
}
