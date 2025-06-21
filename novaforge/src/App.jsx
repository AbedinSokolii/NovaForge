import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import girlImg from './assets/girl.avif';
import nfSignatureImg from './assets/nf signature.avif';
import '@fontsource/alex-brush';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import PortfolioPage from './Portfolio';
import HomePage from './HomePage';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Features', href: '/#features' },
  { name: 'Contact', href: '/#contact' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Get In Touch', href: '/#contact' },
];

function NovaLogoModel() {
  const gltf = useGLTF('/novalogo3d.gltf');
  return <primitive object={gltf.scene} scale={[6, 6, 6]} className="move-updown" />;
}

// Loading Screen Component
function LoadingScreen({ isLoading, onComplete }) {
  useEffect(() => {
    if (!isLoading) return;

    // Simple fast loading - just 1.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-6 animate-pulse">
          <img src={nfSignatureImg} alt="NovaForge" className="w-48 h-32 object-contain mx-auto" />
        </div>
        
        {/* Simple Welcome Message */}
        <div className="text-blue-400 text-xl font-semibold mb-6 animate-pulse">
          Welcome to NovaForge
        </div>
        
        {/* Simple Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

// Custom hook for scroll reveal animations
function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is ready after route change
    const timeoutId = setTimeout(() => {
      // Observe all elements with scroll-reveal classes
      const elements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-bounce, .scroll-reveal-glow'
      );
      
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [location.pathname]); // Re-run when route changes
}

function App() {
  // Custom mouse dot state
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Initialize scroll reveal
  useScrollReveal();

  // Check if this is a page refresh on the main page
  useEffect(() => {
    // Check if this is a page refresh (not a navigation)
    const isPageRefresh = !window.performance.navigation.type || window.performance.navigation.type === 1;
    
    // Show loading screen only on page refresh of the main page
    if (location.pathname === '/' && isPageRefresh) {
      setIsLoading(true);
    }
  }, []); // Empty dependency array - only runs once on mount

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavLinkClick = (href) => {
    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} onComplete={handleLoadingComplete} />
      
      <div className="min-h-screen bg-black text-gray-100 relative overflow-x-hidden">
        {/* Custom Mouse Dot */}
        <div
          style={{
            left: mouse.x,
            top: mouse.y,
            pointerEvents: 'none',
            position: 'fixed',
            zIndex: 9999,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'rgba(0,176,255,0.85)',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 12px 2px rgba(0,176,255,0.5)',
          }}
        />
        {/* Moving Blue Light Whip Effect */}
        <div className="fixed inset-0 -z-10 bg-animated-light" />
        {/* Glassy NavBar */}
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/10 shadow-sm scroll-reveal">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
            {/* Left: Logo and Nav Links */}
            <div className="flex items-center gap-8">
              <Link to="/" className="scroll-reveal-scale">
                <img src={nfSignatureImg} alt="nf signature" className="w-32 h-20 object-contain shadow-md bg-black/30 backdrop-blur" />
              </Link>
              {/* Vertical Divider */}
              <div className="h-10 w-px bg-white/30 mx-2 scroll-reveal" />
              <ul className="flex gap-6 items-center text-lg">
                {navLinks.slice(0, 5).map((link, index) => (
                  <li key={link.name} className="scroll-reveal-stagger">
                    <Link
                      to={link.href}
                      onClick={() => handleNavLinkClick(link.href)}
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
              onClick={() => handleNavLinkClick('/#contact')}
              className="scroll-reveal-glow inline-block px-5 py-2 rounded-lg bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white font-semibold shadow transition-all duration-300 hover:from-blue-700 hover:to-cyan-300 hover:scale-105 border border-blue-400/40 focus:outline-none"
            >
              Get In Touch
            </Link>
          </div>
        </nav>
        {/* Spacer for navbar */}
        <div className="h-16" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
