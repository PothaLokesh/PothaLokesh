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
  ChevronDown
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
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

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
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Realtime Systems",
      description: "Interactive experiences with Socket.IO, ensuring instant data updates and seamless communication.",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: Palette,
      title: "Premium UI/UX",
      description: "Pixel-perfect, accessible interfaces featuring glassmorphism, fluid animations, and modern aesthetics.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Briefcase,
      title: "AI Integration",
      description: "Leveraging Python and ML libraries to build intelligent features that solve real-world problems.",
      color: "from-green-500 to-emerald-500",
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/10 supports-[backdrop-filter]:bg-background/60"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
            >
              POTHA LOKESH
            </motion.h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-full px-5"
                >
                  {item}
                </Button>
              ))}
              <Button
                className="ml-4 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300"
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
              className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-background/95 border-b border-border backdrop-blur-xl"
            >
              <div className="flex flex-col p-6 gap-4">
                {['Home', 'About', 'Services', 'Work', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-lg font-medium text-left py-2 hover:text-primary transition-colors border-b border-border/50 last:border-0"
                  >
                    {item}
                  </button>
                ))}
                <Button
                  className="w-full mt-4 rounded-full bg-primary text-white"
                  asChild
                >
                  <a href={`/${LINKS.resume}`} download>
                    Download CV
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, 50, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
              👋 Welcome to my portfolio
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Potha Lokesh
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Full‑Stack Developer & AI Enthusiast based in India. I craft scalable web applications and intelligent systems that solve real problems.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25" onClick={() => scrollToSection('work')}>
                View My Work
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-2 hover:bg-secondary/50" onClick={() => scrollToSection('contact')}>
                Contact Me
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-muted-foreground">
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <SiGithub size={24} />
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <SiLinkedin size={24} />
              </a>
              <a href={`mailto:lokesh941222@gmail.com`} className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <ExternalLink size={24} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-[300px] h-[360px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 rounded-[2rem] rotate-6 opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-secondary rounded-[2rem] -rotate-3 border border-border shadow-2xl overflow-hidden">
                <img
                  src="/photo1.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-20 bg-background/90 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                    <SiGithub className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contributions</p>
                    <p className="font-bold">Active Dev</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 bottom-32 bg-background/90 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">DSA</p>
                    <p className="font-bold">300+ Solved</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-secondary/30 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About Me</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm a passionate developer who bridges the gap between complex backend logic and user-friendly frontend designs.
            </p>
          </motion.div>

          <div className="flex flex-col gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                I specialize in <strong>Full-Stack Development</strong> with a strong focus on <strong>AI-powered applications</strong>. With a solid foundation in data structures and algorithmic problem solving (300+ problems solved across platforms), I build efficient, scalable, and reliable software systems.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                My recent work includes developing an AI-powered online learning platform using Retrieval-Augmented Generation (RAG) and a real-time chat application with AI-based event detection, leveraging modern technologies such as Next.js, TypeScript, PostgreSQL, MongoDB, and cloud-native tools.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-background rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-3xl text-primary mb-1">6+</h4>
                  <p className="text-sm text-muted-foreground">Major Projects</p>
                </div>
                <div className="p-4 bg-background rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-3xl text-primary mb-1">2+</h4>
                  <p className="text-sm text-muted-foreground">Years Coding</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What I Do</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 bg-secondary/20 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section id="skills" className="py-20 bg-primary/5 overflow-hidden">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">Tech Stack & Tools</h2>
        </div>
        <div className="flex overflow-hidden relative after:absolute after:inset-y-0 after:left-0 after:w-32 after:bg-gradient-to-r after:from-primary/5 after:to-transparent before:absolute before:inset-y-0 before:right-0 before:w-32 before:bg-gradient-to-l before:from-primary/5 before:to-transparent before:z-10 after:z-10">
          <motion.div
            className="flex gap-12 items-center flex-nowrap pl-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center text-4xl font-bold text-muted-foreground/30 whitespace-nowrap">
                <span>React</span>
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>PostgreSQL</span>
                <span>Tailwind</span>
                <span>Python</span>
                <span>Framer Motion</span>
                <span>Git</span>
                <span>Figma</span>
                <span>MongoDB</span>
                <span>Socket.IO</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
              <div className="w-20 h-1.5 bg-primary rounded-full"></div>
            </div>
            <Button variant="outline" className="rounded-full" onClick={() => window.open(LINKS.github, '_blank')}>
              View GitHub Profile
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group h-full"
              >
                <div className="rounded-2xl overflow-hidden border border-border/50 bg-card shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90" onClick={() => toggleLike(project.id)}>
                        <Heart className={`w-5 h-5 ${likedProjects.has(project.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      {project.live && (
                        <Button className="rounded-full bg-primary text-white" asChild>
                          <a href={project.live} target="_blank" rel="noreferrer">Visit Site <ExternalLink className="w-4 h-4 ml-2" /></a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="text-center mb-12 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground">Have a project in mind? I'd love to hear from you.</p>
            </div>

            <div className="flex justify-center gap-8 mb-12">
              <a href={`mailto:lokesh941222@gmail.com`} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Email Me</span>
              </a>
              <a href="tel:+916303090094" className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full bg-green-100/50 dark:bg-green-900/20 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Call Me</span>
              </a>
            </div>

            <div className="text-center border-t border-border pt-8">
              <p className="text-muted-foreground mb-6">Or follow me on social media</p>
              <div className="flex justify-center gap-4">
                {[
                  { icon: SiGithub, href: LINKS.github },
                  { icon: SiLinkedin, href: LINKS.linkedin },
                  { icon: SiInstagram, href: LINKS.instagram },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 text-center text-muted-foreground text-sm">
        <p>© 2025 Potha Lokesh. Built with Next.js, Tailwind & Framer Motion.</p>
      </footer>
    </div>
  );
}
