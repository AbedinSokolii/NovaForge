import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nfSignatureImg from './assets/nf signature.avif';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Work', href: '#portfolio' },
  { name: 'About Us', href: '#about-us' },
];

const portfolios = [
  {
    title: 'E-commerce Platform',
    description: 'A complete e-commerce solution with a custom backend, payment gateway integration, and a user-friendly interface that led to a 40% increase in sales for our client.',
    videoSrc: '/AB.mp4',
  },
  {
    title: 'Corporate Landing Page',
    description: 'A sleek and modern landing page for a B2B SaaS company, designed to maximize lead generation. The page achieved a 25% conversion rate within the first month.',
    videoSrc: '/AB.mp4', // Using same video for now
  },
];

const PortfolioPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef(null);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? portfolios.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === portfolios.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePortfolioNav = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      // For anchor links on the same page, scroll smoothly
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
    } else if (href === '/#contact') {
      e.preventDefault();
      // Navigate to home page and scroll to contact form in one smooth action
      navigate('/');
      
      // Wait for navigation and then scroll to contact
      setTimeout(() => {
        const targetElement = document.getElementById('contact');
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
        }
      }, 300);
    }
  };

  // Animate statistics when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  };

  // Video playback effect
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(error => {
            console.error("Video autoplay was prevented:", error);
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-x-hidden">
      {/* Moving Blue Light Whip Effect */}
      <div className="fixed inset-0 -z-10 bg-animated-light" />

      {/* Glassy NavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
          {/* Left: Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src={nfSignatureImg} alt="nf signature" className="w-32 h-20 object-contain shadow-md bg-black/30 backdrop-blur" />
            </Link>
            {/* Vertical Divider */}
            <div className="h-10 w-px bg-white/30 mx-2" />
            <ul className="flex gap-6 items-center text-lg">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={(e) => handlePortfolioNav(e, link.href)}
                    className="text-gray-100 hover:text-blue-400 font-medium px-2 py-1 rounded transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Right: Get In Touch Button */}
          <Link
            to="/#contact"
            onClick={(e) => handlePortfolioNav(e, '/#contact')}
            className="inline-block px-5 py-2 rounded-lg bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white font-semibold shadow transition-all duration-300 hover:from-blue-700 hover:to-cyan-300 hover:scale-105 border border-blue-400/40 focus:outline-none"
          >
            Get In Touch
          </Link>
        </div>
      </nav>
      {/* Spacer for navbar */}
      <div className="h-24" />

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Portfolio Section */}
        <section id="portfolio" className="py-16">
          <h2 className="text-4xl font-extrabold text-center mb-24 scroll-reveal">Our Work</h2>
          <div className="arc-slider-container scroll-reveal-scale">
            <div className="arc-slider-track">
              {portfolios.map((portfolio, index) => {
                const isActive = index === activeIndex;
                const isLeft = index === 0;
                const isRight = index === 1;
                
                return (
                  <div
                    key={index}
                    className={`arc-portfolio-item ${isActive ? 'active' : ''} ${isLeft ? 'left' : 'right'}`}
                    style={{
                      transform: isActive 
                        ? 'scale(1.1) translateZ(50px)' 
                        : isLeft 
                          ? 'translateX(-400px) scale(0.8) translateZ(-20px)' 
                          : 'translateX(505px) scale(0.8) translateZ(-20px)',
                    }}
                    onMouseEnter={() => videoRefs.current[index]?.play().catch(console.error)}
                    onMouseLeave={() => {
                      if (index !== activeIndex) {
                        videoRefs.current[index]?.pause();
                      }
                    }}
                  >
                    <div className="portfolio-content">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <video 
                          ref={el => (videoRefs.current[index] = el)}
                          src={portfolio.videoSrc} 
                          loop 
                          muted 
                          playsInline 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{portfolio.title}</h3>
                      <p className="text-gray-300 text-sm">{portfolio.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Center Navigation */}
            <div className="center-navigation scroll-reveal-bounce">
              <button onClick={handlePrev} className="nav-arrow left-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <div className="portfolio-indicator">
                <span className="indicator-text">
                  {activeIndex + 1} / {portfolios.length}
                </span>
                <div className="indicator-dots">
                  {portfolios.map((_, index) => (
                    <div 
                      key={index} 
                      className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <button onClick={handleNext} className="nav-arrow right-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-16 section-divider scroll-reveal" />

        {/* About Us Section */}
        <section id="about-us" className="py-16 text-center">
          <h2 className="text-4xl font-extrabold mb-8 scroll-reveal">About NovaForge</h2>
          
          {/* Main Description with Animation */}
          <div className="about-content-wrapper mb-12">
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 scroll-reveal">
              NovaForge is not just another web development agency. We are architects of digital experiences, dedicated to crafting high-performance websites that drive results. Our philosophy is simple: beautiful design must be coupled with smart strategy.
            </p>
            
            {/* Interactive Stats Grid */}
            <div ref={statsRef} className="stats-grid max-w-4xl mx-auto mb-10">
              <div className="stat-item scroll-reveal-stagger">
                <div className="stat-number" data-target="150">0</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-item scroll-reveal-stagger">
                <div className="stat-number" data-target="98">0</div>
                <div className="stat-label">Client Satisfaction %</div>
              </div>
              <div className="stat-item scroll-reveal-stagger">
                <div className="stat-number" data-target="5">0</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item scroll-reveal-stagger">
                <div className="stat-number" data-target="40">0</div>
                <div className="stat-label">Avg. Conversion Increase %</div>
              </div>
            </div>
          </div>

          {/* Core Values with Hover Effects */}
          <div className="values-section max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-blue-400 scroll-reveal">Our Core Values</h3>
            <div className="values-grid">
              <div className="value-card scroll-reveal-left">
                <div className="value-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="value-title">Excellence</h4>
                <p className="value-description">We don't settle for good enough. Every project is crafted with precision and attention to detail.</p>
              </div>
              
              <div className="value-card scroll-reveal">
                <div className="value-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h4 className="value-title">Innovation</h4>
                <p className="value-description">We blend creativity with conversion-focused engineering to build solutions that achieve business goals.</p>
              </div>
              
              <div className="value-card scroll-reveal-right">
                <div className="value-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h4 className="value-title">Partnership</h4>
                <p className="value-description">Your success is our success. We work as an extension of your team to deliver exceptional results.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="cta-section mt-12 scroll-reveal-glow">
            <div className="cta-content">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Digital Presence?</h3>
              <p className="text-gray-300 mb-6">Let's discuss how we can help you achieve your business goals.</p>
              <a 
                href="https://cal.com/novaforge-kljs4o/30min?duration=60&month=2025-07"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button inline-block px-8 py-4 rounded-lg bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white font-semibold shadow transition-all duration-300 hover:from-blue-700 hover:to-cyan-300 hover:scale-105 border border-blue-400/40 focus:outline-none"
              >
                Start Your Project
              </a>
            </div>
          </div>

          {/* Footer moved here */}
          <div className="w-full py-8 text-gray-400 text-center mt-16">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm tracking-wide">&copy; {new Date().getFullYear()} NovaForge. All rights reserved.</span>
              <div className="text-xs text-gray-500 mt-2">
                Crafted by <span className="text-gray-400">Uron</span>, <span className="text-gray-400">Abedin</span>, and <span className="text-gray-400">Roni</span>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
};

export default PortfolioPage;
