import { useState } from "react";
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
  X
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const LINKS = {
    instagram: "#",
    linkedin: "https://www.linkedin.com/in/lokesh-potha-7b0942253/",
    github: "https://github.com/PothaLokesh",
    resume: "resume.pdf",
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
      title: "Full‑stack web apps",
      description:
        "Build scalable apps with Next.js/React, Node.js, PostgreSQL/MongoDB, Tailwind CSS",
    },
    {
      icon: Smartphone,
      title: "Realtime & APIs",
      description:
        "Socket.IO realtime chat, secure auth, REST APIs with Express and Clerk",
    },
    {
      icon: Palette,
      title: "UI engineering",
      description:
        "Responsive, accessible interfaces with modern component systems and animations",
    },
    {
      icon: Briefcase,
      title: "AI/ML integration",
      description:
        "Integrate AI features and data‑driven insights using Python, scikit‑learn, TensorFlow",
    },
  ];

  const projects = [
    {
      id: "1",
      title: "AI‑Powered Online Learning Platform",
      image:
        "/a futuristic digital.png",
      live: "https://online-learning-platform-git-main-lokeshs-projects-a2d34815.vercel.app/",
    },
    {
      id: "2",
      title: "Realtime Chat Application",
      image:"/QuickApp.png",
      live: "https://chat-app-front-zeta.vercel.app/",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground">POTHA LOKESH</h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 flex-wrap">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid="nav-about"
              >
                About me
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid="nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('work')} 
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid="nav-work"
              >
                My work
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover-elevate"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border">
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors text-left"
                >
                  About me
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors text-left"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('work')} 
                  className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors text-left"
                >
                  My work
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 flex-wrap">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <img 
                    src="/photo1.jpg"
                    alt="Potha Lokesh"
                    className="w-full h-full object-cover"
                    data-testid="img-profile-hero"
                  />
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-medium text-muted-foreground mb-3" data-testid="text-hero-subtitle">
                Hi, I am Potha Lokesh
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" data-testid="text-hero-title">
                Full‑Stack Developer • AI Integration<br />based in Nandyala, India
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed" data-testid="text-hero-description">
                Aspiring software engineer focused on scalable web apps, AI integration, and data‑driven solutions. Passionate about building user‑centric products at the intersection of cloud, AI, and modern UX.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center md:justify-start">
                <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" data-testid="button-download-cv" asChild>
                 
                <a href="/resume.pdf" download>Download CV</a>
                 
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8"
                  onClick={() => scrollToSection('work')}
                  data-testid="button-my-work"
                >
                  My work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      

      

      {/* About Me Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">Introduction</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">About me</h3>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center flex-wrap">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-72 h-96 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden border border-border shadow-lg">
                <img 
                  src="/photo2.jpg"
                  alt="Potha Lokesh"
                  className="w-full h-full object-cover"
                  data-testid="img-profile-about"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="flex-1">
              <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-about-description">
                I am a full‑stack developer skilled in Next.js, React, Node.js, and databases
                like PostgreSQL and MongoDB. I enjoy crafting clean UIs with Tailwind CSS and
                bringing intelligent features to life using Python and machine learning tools.
                Recently, I built an AI‑powered e‑learning platform and a realtime chat app.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card className="border-border" data-testid="card-stat-experience">
                  <CardContent className="p-6">
                    <Briefcase className="w-8 h-8 text-primary mb-3" />
                    <p className="text-3xl font-bold mb-1">2</p>
                    <p className="text-sm text-muted-foreground">Major projects</p>
                  </CardContent>
                </Card>
                <Card className="border-border" data-testid="card-stat-clients">
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-primary mb-3" />
                    <p className="text-3xl font-bold mb-1">300+</p>
                    <p className="text-sm text-muted-foreground">LeetCode problems</p>
                  </CardContent>
                </Card>
                <Card className="border-border" data-testid="card-stat-projects">
                  <CardContent className="p-6">
                    <Trophy className="w-8 h-8 text-primary mb-3" />
                    <p className="text-3xl font-bold mb-1">5+</p>
                    <p className="text-sm text-muted-foreground">Certificates & achievements</p>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 flex-wrap">
                <Button size="icon" variant="outline" className="rounded-full" data-testid="button-social-instagram" asChild>
                  <a href={LINKS.instagram} target="_blank" rel="noreferrer">
                    <SiInstagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" className="rounded-full" data-testid="button-social-linkedin" asChild>
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                    <SiLinkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" className="rounded-full" data-testid="button-social-github" asChild>
                  <a href={LINKS.github} target="_blank" rel="noreferrer">
                    <SiGithub className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">What I offer</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">My services</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            I build beautiful digital products with unique ideas use Figma, Framer, Microsoft, Visual and Apple.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`group hover-elevate transition-all duration-500 hover:scale-105 border-border shadow-lg hover:shadow-2xl ${
                  index === 0 ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20' :
                  index === 1 ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' :
                  index === 2 ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20' :
                  'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'
                }`}
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ${
                    index === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    index === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    index === 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/20 dark:via-red-950/20 dark:to-pink-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">Latest projects</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">My latest work</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            My portfolio is a journey through innovation. Explore a curated selection of projects showcasing my expertise in creating engaging digital experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className={`group overflow-hidden border-border hover-elevate transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl ${
                  index % 2 === 0 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20' 
                    : 'bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20'
                }`}
                data-testid={`card-project-${project.id}`}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button
                      onClick={() => toggleLike(project.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover-elevate transition-all duration-300 hover:bg-red-500 hover:text-white"
                      data-testid={`button-like-${project.id}`}
                    >
                      <Heart 
                        className={`w-5 h-5 transition-colors ${
                          likedProjects.has(project.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-6 flex items-center justify-between gap-4">
                    <h4 className="text-xl font-semibold" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h4>
                    {project.live && (
                      <Button size="sm" variant="outline" className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300" asChild>
                        <a href={project.live} target="_blank" rel="noreferrer">Live Demo</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8"
              data-testid="button-show-more"
            >
              Show more
            </Button>
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">Core strengths</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-border bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Programming & Web</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Java","Python","C","HTML5","CSS3","JavaScript","TypeScript","React","Next.js","Tailwind CSS"
                  ].map((s, index) => (
                    <span key={s} className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                      index % 3 === 1 ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                      'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    }`}>{s}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Data & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "PostgreSQL","MongoDB","MySQL","NumPy","Pandas","scikit‑learn","TensorFlow","Matplotlib","OpenCV"
                  ].map((s, index) => (
                    <span key={s} className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      index % 3 === 0 ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' :
                      index % 3 === 1 ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' :
                      'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
                    }`}>{s}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-red-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">Milestones</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">Certifications & Achievements</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 shadow-lg hover:shadow-xl transition-all duration-300"><CardContent className="p-6">
              <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">IIT Madras Online Degree Foundational Level</h4>
              <p className="text-sm text-muted-foreground">Dec 2024</p>
            </CardContent></Card>
            <Card className="border-border bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 shadow-lg hover:shadow-xl transition-all duration-300"><CardContent className="p-6">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300">Java Programming: Hands‑on OOP</h4>
              <p className="text-sm text-muted-foreground">May 2024</p>
            </CardContent></Card>
            <Card className="border-border bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 shadow-lg hover:shadow-xl transition-all duration-300"><CardContent className="p-6">
              <h4 className="font-semibold text-red-700 dark:text-red-300">Solved 300+ problems on LeetCode</h4>
              <p className="text-sm text-muted-foreground">Algorithmic thinking, problem‑solving</p>
            </CardContent></Card>
            <Card className="border-border bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 shadow-lg hover:shadow-xl transition-all duration-300"><CardContent className="p-6">
              <h4 className="font-semibold text-pink-700 dark:text-pink-300">APECT & POLYCET achievements</h4>
              <p className="text-sm text-muted-foreground">Secured 42nd rank out of 7000+ students; AIR 1137 in POLYCET</p>
            </CardContent></Card>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/20 dark:via-purple-950/20 dark:to-fuchsia-950/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">Connect with me</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Get in touch</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            I'd love to hear from you. Feel free to reach out if you have any questions, comments or just want to connect. I'll always try to get back to you.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-600 dark:text-blue-400 font-medium">Email</p>
                <a href="mailto:lokesha941222@gmail.com" className="font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-colors">lokesha941222@gmail.com</a>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
                <p className="text-green-600 dark:text-green-400 font-medium">Phone</p>
                <a href="tel:+916303090094" className="font-medium text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 transition-colors">+91 63030 90094</a>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800">
                <p className="text-purple-600 dark:text-purple-400 font-medium">Location</p>
                <p className="font-medium text-purple-700 dark:text-purple-300">Nandyala, Andhra Pradesh, India</p>
              </div>
            </div>
           
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 flex-wrap">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold mb-4">POTHA LOKESH</h4>
              <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                <Button size="icon" variant="outline" className="rounded-full" data-testid="button-footer-instagram" asChild>
                  <a href={LINKS.instagram} target="_blank" rel="noreferrer">
                  <SiInstagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" className="rounded-full" data-testid="button-footer-linkedin" asChild>
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
                  <SiLinkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" className="rounded-full" data-testid="button-footer-github" asChild>
                  <a href={LINKS.github} target="_blank" rel="noreferrer">
                  <SiGithub className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 Potha Lokesh. All rights reserved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 flex-wrap text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#contact" className="hover:text-foreground transition-colors" data-testid="link-contact">
                Contact with me
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
