'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogIn,
  UserPlus,
  CheckCircle2,
  ExternalLink,
  Star,
  Code,
  BarChart3
} from 'lucide-react';

// Animation Components
const FadeIn = ({ children, delay = 0, duration = 700, y = 10, className = "", once = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);

  return (
    <div
      ref={ref}
      className={`transform transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : y}px)`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};

const ScaleIn = ({ children, delay = 0, duration = 700, scale = 0.95, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1 : scale})`,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};

const GlowEffect = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
      {children}
    </div>
  );
};

const AnimatedGradientText = ({ children, className = "" }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 animate-gradient ${className}`}>
      {children}
    </span>
  );
};

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    let startValue = 0;
    
    if (isVisible) {
      interval = setInterval(() => {
        startValue += Math.ceil(target / 50); // Faster animation
        
        if (startValue >= target) {
          startValue = target;
          clearInterval(interval);
        }
        
        setCount(startValue);
      }, 30);
    }
    
    return () => clearInterval(interval);
  }, [isVisible, target]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 transition-all duration-500 tracking-tight">
      {count}{suffix}+
    </div>
  );
};

const TestimonialCarousel = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    let interval;
    
    if (autoplay && !isTransitioning) {
      interval = setInterval(() => {
        goToNext();
      }, 6000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length, isTransitioning]);

  return (
    <div 
      className="relative overflow-hidden rounded-xl group"
      ref={carouselRef}
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30 rounded-xl opacity-50"></div>
      
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="min-w-full bg-black/40 backdrop-blur-sm border border-purple-900/50 rounded-xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-purple-500/30">
                <Image 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-purple-400 fill-purple-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 text-lg md:text-xl font-light leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-purple-300 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-3 text-purple-400 hover:text-purple-300 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-3 text-purple-400 hover:text-purple-300 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setActiveIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? 'bg-purple-400 w-6' : 'bg-gray-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, details, isActive, onMouseEnter, onMouseLeave, isVisible }) => {
  return (
    <div 
      className={`group relative bg-black border 
        ${isActive 
          ? 'border-purple-500 shadow-lg shadow-purple-900/30' 
          : 'border-purple-900/50 hover:border-purple-700/70'
        } rounded-xl p-8 transition-all duration-500 overflow-hidden cursor-pointer`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-fuchsia-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
      
      {/* Icon with animated gradient background */}
      <div className="relative mb-6 p-3 inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-fuchsia-900/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-white tracking-tight group-hover:text-purple-300 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
      
      <ul className="space-y-3 text-gray-500">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start space-x-2 group-hover:text-gray-400 transition-all duration-300">
            <Zap className="w-5 h-5 text-purple-500 mt-0.5 group-hover:text-purple-400 transition-colors" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      
      {/* Bottom accent line that grows on hover */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
    </div>
  );
};

export default function DonnaLandingPage() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-purple-400" />,
      title: "Precision Case Intelligence",
      description: "AI-powered case management that anticipates your legal workflow needs and adapts to your practice patterns.",
      details: [
        "Intelligent deadline tracking with predictive alerts",
        "Adaptive workflow insights based on your practice patterns",
        "Strategic case optimization with AI-driven recommendations"
      ]
    },
    {
      icon: <Clock className="w-12 h-12 text-fuchsia-400" />,
      title: "Smart Notification System",
      description: "Contextual alerts that understand the rhythm of your practice and prioritize what matters most.",
      details: [
        "Proactive deadline reminders with smart scheduling",
        "Priority-based case updates that know what's important",
        "Intelligent communication flow that reduces noise"
      ]
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-indigo-400" />,
      title: "Secure Data Management",
      description: "Military-grade protection for sensitive legal information with compliance-first architecture.",
      details: [
        "End-to-end encryption for all client communications",
        "Compliance-first approach meeting legal industry standards",
        "Confidential data handling with audit trail capabilities"
      ]
    }
  ];

  const expandedTestimonials = [
    {
      name: "Rajesh Sharma",
      role: "Supreme Court Advocate",
      quote: "DONNA has transformed my practice. It's like having an AI assistant that never sleeps. Since implementing it, I've never missed a deadline and my case preparation has become significantly more efficient. The predictive insights are simply revolutionary.",
      image: "/placeholder-image.png" // Update with actual image path
    },
    {
      name: "Priya Iyer",
      role: "Corporate Legal Counsel",
      quote: "The predictive insights are game-changing. I'm always one step ahead with DONNA. It helps me identify potential issues before they become problems, saving our team countless hours of reactive work. Our legal department's productivity has increased by 35%.",
      image: "/placeholder-image.png" // Update with actual image path
    },
    {
      name: "Vikram Malhotra",
      role: "Managing Partner, Legal Associates",
      quote: "We've seen a 40% increase in productivity since adopting DONNA. Our attorneys spend less time on administrative tasks and more time on billable client work. The ROI has been exceptional, and the system keeps getting smarter the more we use it.",
      image: "/placeholder-image.png" // Update with actual image path
    },
    {
      name: "Neha Desai",
      role: "Legal Technology Specialist",
      quote: "DONNA's intuitive interface makes it accessible for even the most tech-averse attorneys. The onboarding experience was seamless, and the ongoing support is outstanding. It's rare to find legal tech that's both powerful and easy to use.",
      image: "/placeholder-image.png" // Update with actual image path
    }
  ];

  const isNavbarSolid = scrollY > 50;

  const additionalFeatures = [
    {
      icon: <Code className="w-10 h-10 text-purple-400" />,
      title: "API Integration",
      description: "Connect DONNA with your existing legal software ecosystem."
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-purple-400" />,
      title: "Advanced Analytics",
      description: "Gain insights into your practice with comprehensive reporting."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 ${isNavbarSolid ? 'bg-black/95' : 'bg-black/80 backdrop-blur-md'} border-b border-purple-900/50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="#" className="group flex items-center">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 mr-1">DONNA</span>
                <sup className="ml-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs px-1.5 py-0.5 rounded-full">AI</sup>
                <span className="block ml-1 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-300"></span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="#features" 
                className="text-gray-300 hover:text-purple-400 transition-colors relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="#testimonials" 
                className="text-gray-300 hover:text-purple-400 transition-colors relative group"
              >
                Testimonials
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="#pricing" 
                className="text-gray-300 hover:text-purple-400 transition-colors relative group"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="border-l border-purple-900/50 h-6 mx-2"></div>
              <Link 
                href="/../login/" 
                className="text-gray-300 hover:text-purple-400 transition-colors flex items-center group"
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                <span>Login</span>
                <span className="block w-0 group-hover:w-full h-0.5 bg-purple-500 transition-all duration-300 mt-0.5"></span>
              </Link>
              <Link 
                href="/signup" 
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  <UserPlus className="w-4 h-4 mr-1.5" />
                  <span>Sign Up</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {isMobileMenuOpen ? 
                  <X className="w-6 h-6" /> : 
                  <Menu className="w-6 h-6" />
                }
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-purple-900/30 overflow-hidden transition-all duration-500">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  href="#features" 
                  className="block text-gray-300 hover:bg-purple-900/30 px-3 py-2 rounded-md transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#testimonials" 
                  className="block text-gray-300 hover:bg-purple-900/30 px-3 py-2 rounded-md transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link 
                  href="#pricing" 
                  className="block text-gray-300 hover:bg-purple-900/30 px-3 py-2 rounded-md transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <div className="border-t border-purple-900/30 my-2"></div>
                <Link 
                  href="/login" 
                  className="flex items-center text-gray-300 hover:bg-purple-900/30 px-3 py-2 rounded-md transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="flex items-center bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-3 py-2 rounded-md transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-fuchsia-600/10 blur-3xl"></div>
        </div>
        
        <FadeIn delay={100} y={20}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Elevate Your <span className="relative">Legal <span className="absolute -bottom-2 left-0 h-1 bg-purple-500 w-full"></span></span> Practice with 
            <br />
            <AnimatedGradientText className="font-extrabold">
              Intelligent Case Management
            </AnimatedGradientText>
          </h1>
        </FadeIn>
        
        <FadeIn delay={300} y={20}>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 font-light">
            DONNA transforms how Indian attorneys manage cases, deadlines, and workflows 
            with cutting-edge AI-powered intelligence.
          </p>
        </FadeIn>
        
        <FadeIn delay={500} y={10}>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/trial" 
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-7 py-4 rounded-lg shadow-lg shadow-purple-900/20 hover:shadow-purple-500/30 transition-all duration-300 group"
            >
              <span className="relative z-10 flex items-center justify-center font-medium">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link 
              href="/demo" 
              className="relative overflow-hidden group bg-black border border-purple-700 text-purple-200 px-7 py-4 rounded-lg hover:border-purple-500 transition-all duration-300"
            >
              <span className="relative z-10 font-medium group-hover:text-white transition-colors duration-300">
                Watch Demo
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
        </FadeIn>
      </header>

      {/* Features Section */}
      <section id="features" className="relative bg-black py-20 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-fuchsia-600/5 blur-3xl"></div>
        </div>
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight">
              Designed for Legal <AnimatedGradientText>Professionals</AnimatedGradientText>
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
              Powerful tools that understand the unique needs of your legal practice
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 100} y={20}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  details={feature.details}
                  isActive={activeFeature === index}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                  isVisible={visibleSections[`feature-${index}`]}
                />
              </FadeIn>
            ))}
          </div>
          
          {/* Additional Features */}
          <div className="mt-20">
            <FadeIn>
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-16 text-white">
                Everything You Need to <AnimatedGradientText>Streamline Your Practice</AnimatedGradientText>
              </h3>
            </FadeIn>
            
            <div className="grid md:grid-cols-2 gap-10">
              {additionalFeatures.map((feature, index) => (
                <FadeIn key={index} delay={index * 100} y={10}>
                  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5 p-6 bg-gradient-to-br from-purple-900/10 to-fuchsia-900/10 border border-purple-900/30 rounded-xl hover:border-purple-700/50 transition-all duration-300 group">
                    <div className="p-3 bg-black/50 rounded-xl border border-purple-900/50 group-hover:border-purple-700/70 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">{feature.title}</h4>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="stats" className="bg-black py-20 md:py-28 border-y border-purple-900/30 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white tracking-tight">
              Transforming <AnimatedGradientText>Legal Practices</AnimatedGradientText> Across India
            </h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            <FadeIn delay={100}>
              <GlowEffect className="text-center p-8 rounded-xl border border-purple-900/30 bg-black/20 backdrop-blur-sm">
                <AnimatedCounter target={500} />
                <p className="text-gray-300 mt-4 text-lg font-medium">Law Firms Empowered</p>
                <p className="text-gray-500 text-sm mt-2">Across India's legal landscape</p>
              </GlowEffect>
            </FadeIn>
            
            <FadeIn delay={200}>
              <GlowEffect className="text-center p-8 rounded-xl border border-purple-900/30 bg-black/20 backdrop-blur-sm">
                <AnimatedCounter target={10} suffix="K" />
                <p className="text-gray-300 mt-4 text-lg font-medium">Cases Managed</p>
                <p className="text-gray-500 text-sm mt-2">From simple matters to complex litigation</p>
              </GlowEffect>
            </FadeIn>
            
            <FadeIn delay={300}>
              <GlowEffect className="text-center p-8 rounded-xl border border-purple-900/30 bg-black/20 backdrop-blur-sm">
                <AnimatedCounter target={95} suffix="%" />
                <p className="text-gray-300 mt-4 text-lg font-medium">Client Satisfaction</p>
                <p className="text-gray-500 text-sm mt-2">Consistent excellence in service delivery</p>
              </GlowEffect>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-black py-20 md:py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fuchsia-900/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-purple-900/10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight">
              What Our <AnimatedGradientText>Users Say</AnimatedGradientText>
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
              Join hundreds of satisfied legal professionals who trust DONNA
            </p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <TestimonialCarousel testimonials={expandedTestimonials} />
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-black py-20 md:py-32 border-t border-purple-900/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-purple-900/10 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight">
              How <AnimatedGradientText>DONNA</AnimatedGradientText> Works
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
              Seamless integration into your legal workflow
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100} y={20}>
              <div className="relative p-1 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20">
                <div className="bg-black p-6 rounded-lg h-full">
                  <div className="relative mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400">
                    <span className="text-xl font-bold">1</span>
                    <div className="absolute -right-2 -top-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs">
                      AI
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Import Your Cases</h3>
                  <p className="text-gray-400">Upload existing case files or create new ones. DONNA automatically extracts key details and organizes them.</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={200} y={20}>
              <div className="relative p-1 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20">
                <div className="bg-black p-6 rounded-lg h-full">
                  <div className="relative mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400">
                    <span className="text-xl font-bold">2</span>
                    <div className="absolute -right-2 -top-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs">
                      AI
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Smart Analysis</h3>
                  <p className="text-gray-400">DONNA analyzes your cases, identifies critical deadlines, and suggests optimal workflows based on your practice patterns.</p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={300} y={20}>
              <div className="relative p-1 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20">
                <div className="bg-black p-6 rounded-lg h-full">
                  <div className="relative mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400">
                    <span className="text-xl font-bold">3</span>
                    <div className="absolute -right-2 -top-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs">
                      AI
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Intelligent Management</h3>
                  <p className="text-gray-400">Receive prioritized notifications, track progress, and get insights that help you stay ahead of case developments.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-black py-20 md:py-32 border-t border-purple-900/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-900/10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight">
              Simple, <AnimatedGradientText>Transparent</AnimatedGradientText> Pricing
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
              No hidden fees, no complicated tiers - just powerful tools at a fair price
            </p>
          </FadeIn>

          <div className="max-w-md mx-auto">
            <ScaleIn scale={0.9}>
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative bg-black border border-purple-900/50 rounded-xl p-8 text-center">
                  <div className="bg-gradient-to-r from-purple-900/20 to-fuchsia-900/20 rounded-lg px-4 py-1 text-purple-300 inline-block mb-2">
                    MOST POPULAR
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    All-Access Plan
                  </h3>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">₹999</span>
                    <span className="text-gray-400">/month</span>
                    <p className="text-gray-500 text-sm mt-1">Billed annually or ₹1,199 monthly</p>
                  </div>
                  
                  <ul className="mb-8 space-y-4 text-left text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span><strong className="text-white">First Month FREE</strong> - No credit card required</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span>Unlimited Case Tracking & Management</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span>24/7 Priority Support with Legal Tech Experts</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span>AI-Powered Insights & Recommendations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span>Custom Reports & Advanced Analytics</span>
                    </li>
                  </ul>
                  
                  <Link 
                    href="/signup" 
                    className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white py-3 px-6 rounded-lg shadow-lg shadow-purple-900/20 hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center group font-medium"
                  >
                    <span className="relative z-10">Start Your Free Trial</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                  
                  <p className="text-gray-500 text-sm mt-4">No commitment. Cancel anytime.</p>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-black py-20 md:py-32 border-t border-purple-900/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-fuchsia-900/10 blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white tracking-tight">
              Get in <AnimatedGradientText>Touch</AnimatedGradientText>
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
              Have questions? Our team of legal tech experts is here to help
            </p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-black/80 backdrop-blur-sm border border-purple-900/50 rounded-xl p-8 md:p-10">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-black/70 border border-purple-800/50 rounded-lg p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-black/70 border border-purple-800/50 rounded-lg p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full bg-black/70 border border-purple-800/50 rounded-lg p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-3.5 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center group font-medium"
                  >
                    <span className="relative z-10">Send Message</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </form>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 mr-1">DONNA</span>
                <sup className="ml-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs px-1.5 py-0.5 rounded-full">AI</sup>
              </div>
              <p className="text-gray-500">
                The future of legal case management powered by artificial intelligence. Designed specifically for Indian legal professionals.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-500">
                <li><Link href="#features" className="hover:text-purple-400 transition-colors">Features</Link></li>
                <li><Link href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</Link></li>
                <li><Link href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-gray-500">
                <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/gdpr" className="hover:text-purple-400 transition-colors">GDPR Compliance</Link></li>
                <li><Link href="/security" className="hover:text-purple-400 transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-6">Connect</h4>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <Link href="https://twitter.com" className="hover:text-purple-400 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://linkedin.com" className="hover:text-purple-400 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://facebook.com" className="hover:text-purple-400 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@donna.ai" className="hover:text-purple-400 transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-900/30 pt-8 text-center">
            <p className="text-gray-500">© 2025 DONNA Technologies. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}