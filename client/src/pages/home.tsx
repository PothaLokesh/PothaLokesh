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
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message! I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertContact) => {
    contactMutation.mutate(data);
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
      title: "Web design",
      description: "I created digital products with unique ideas use Figma & Framer",
    },
    {
      icon: Smartphone,
      title: "Mobile app",
      description: "I develop mobile applications with great UI/UX using Flutter & React Native",
    },
    {
      icon: Palette,
      title: "UI-UX design",
      description: "I design beautiful user interfaces and user experiences with modern tools",
    },
    {
      icon: Briefcase,
      title: "Graphic design",
      description: "I create stunning graphics and visual content for various platforms",
    },
  ];

  const projects = [
    {
      id: "1",
      title: "E-commerce Food",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    },
    {
      id: "2",
      title: "Online Real App",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    },
    {
      id: "3",
      title: "Marketplace",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      id: "4",
      title: "Local advertising",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-foreground">William.</h1>
            
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
      <section id="home" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 flex-wrap">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden border-4 border-background shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
                    alt="William"
                    className="w-full h-full object-cover"
                    data-testid="img-profile-hero"
                  />
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-medium text-muted-foreground mb-3" data-testid="text-hero-subtitle">
                Hi I am William Clark
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight" data-testid="text-hero-title">
                frontend web developer<br />based in london.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed" data-testid="text-hero-description">
                I am a frontend developer from London. I have a real passion for UI effects, animations and creating intuitive, dynamic user experiences. I enjoy the challenge of blending design and technology to build something truly engaging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="rounded-full px-8"
                  data-testid="button-download-cv"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
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
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=faces"
                  alt="William"
                  className="w-full h-full object-cover"
                  data-testid="img-profile-about"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="flex-1">
              <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-about-description">
                I am an experienced Frontend Developer with a unique blend of professional expertise in building modern web applications. Throughout my career, I have had the privilege of collaborating with incredible teams and clients worldwide, delivering high-quality digital experiences.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card className="border-border" data-testid="card-stat-experience">
                  <CardContent className="p-6">
                    <Briefcase className="w-8 h-8 text-primary mb-3" />
                    <p className="text-3xl font-bold mb-1">10</p>
                    <p className="text-sm text-muted-foreground">Years experience</p>
                  </CardContent>
                </Card>
                <Card className="border-border" data-testid="card-stat-clients">
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-primary mb-3" />
                    <p className="text-3xl font-bold mb-1">12+</p>
                    <p className="text-sm text-muted-foreground">Clients worldwide</p>
                  </CardContent>
                </Card>
                <Card className="border-border" data-testid="card-stat-projects">
                  <CardContent className="p-6">
                    <Trophy className="w-8 h-8 text-primary mb-3" />
                    <p className="text-3xl font-bold mb-1">20+</p>
                    <p className="text-sm text-muted-foreground">Success projects</p>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 flex-wrap">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-social-telegram"
                >
                  <SiTelegram className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-social-whatsapp"
                >
                  <SiWhatsapp className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-social-figma"
                >
                  <SiFigma className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-social-dribbble"
                >
                  <SiDribbble className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-social-behance"
                >
                  <SiBehance className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">What I offer</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">My services</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            I build beautiful digital products with unique ideas use Figma, Framer, Microsoft, Visual and Apple.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group hover-elevate transition-all duration-300 border-border"
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
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
      <section id="work" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">Latest project</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">My latest work</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            My portfolio is a journey through innovation. Explore a curated selection of projects showcasing my expertise in creating engaging digital experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden border-border hover-elevate transition-all duration-300"
                data-testid={`card-project-${project.id}`}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => toggleLike(project.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover-elevate transition-all duration-300"
                      data-testid={`button-like-${project.id}`}
                    >
                      <Heart 
                        className={`w-5 h-5 transition-colors ${
                          likedProjects.has(project.id) 
                            ? 'fill-primary text-primary' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold" data-testid={`text-project-title-${project.id}`}>
                      {project.title}
                    </h4>
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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-muted-foreground text-center mb-2">Connect with me</p>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Get in touch</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            I'd love to hear from you. Feel free to reach out if you have any questions, comments or just want to connect. I'll always try to get back to you.
          </p>

          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            className="h-12 rounded-lg"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                            placeholder="Enter email address"
                            type="email"
                            className="h-12 rounded-lg"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                          placeholder="Enter your message"
                          rows={6}
                          className="resize-none rounded-lg"
                          data-testid="input-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto rounded-full px-12"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {contactMutation.isPending ? "Sending..." : "Send email"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 flex-wrap">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold mb-4">William.</h4>
              <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-footer-instagram"
                >
                  <SiInstagram className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-footer-linkedin"
                >
                  <SiLinkedin className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full"
                  data-testid="button-footer-github"
                >
                  <SiGithub className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 William Reece. All rights reserved.
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
