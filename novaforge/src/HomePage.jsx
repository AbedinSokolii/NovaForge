import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import emailjs from '@emailjs/browser';
import girlImg from './assets/girl.avif';
import nfSignatureImg from './assets/nf signature.avif';
import { Link } from 'react-router-dom';

function NovaLogoModel() {
  const gltf = useGLTF('/novalogo3d.gltf');
  return <primitive object={gltf.scene} scale={[6, 6, 6]} className="move-updown" />;
}

const HomePage = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    agency: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Intersection Observer for smooth reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if EmailJS is properly configured
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      setSubmitStatus('error');
      setIsSubmitting(false);
      console.error('EmailJS not configured. Please set up your EmailJS credentials.');
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          agency: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Home Section */}
      <section
        id="home"
        className={`py-16 px-4 transition-all duration-1000 ${
          visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          background: 'transparent',
        }}
      >
        {/* Overlay removed */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
          {/* Left: Header and Paragraph */}
          <div className="md:w-1/2 w-full text-left mt-16">
            <h2 className="text-5xl font-extrabold mb-8 leading-tight scroll-reveal-left">Websites That Sell. Built for Results. Engineered by NovaForge.</h2>
            <p className="text-2xl text-gray-300 mb-10 leading-relaxed scroll-reveal">We don't do pretty. We build machines. Websites that convert visitors into customers — fast. If your site isn't selling, it's broken. Let's fix that.</p>
            {/* Contact Us Button */}
            <a href="#contact" className="scroll-reveal-bounce inline-block px-8 py-3 rounded-lg bg-black/40 text-white font-semibold shadow transition-all duration-300 border border-transparent focus:outline-none hover:border-blue-400 hover:shadow-[0_0_16px_4px_rgba(0,176,255,0.5)]">
              Contact Us
            </a>
          </div>
          {/* Right: 3D GLTF Model */}
          <div className="hidden md:flex md:w-1/2 w-full mt-8 md:mt-0 items-center justify-center">
            <div className="glass-bg p-8 rounded-3xl shadow-2xl scroll-reveal-scale">
              <Canvas camera={{ position: [0, 0, 3] }} style={{ width: 400, height: 400 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 2, 2]} intensity={0.7} />
                <group className="move-updown">
                  <NovaLogoModel />
                </group>
                <OrbitControls enableZoom={false} autoRotate={false} />
              </Canvas>
            </div>
          </div>
        </div>
        {/* Moving Parallel Glowing Lines (Rectangular, Meet in Middle) */}
        <div className="relative flex justify-center mt-12 h-16">
          <div className="dvd-parallel-wrapper absolute top-0 left-0 w-full h-full pointer-events-none scroll-reveal">
            <div className="w-64 h-8 bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400 blur-xl opacity-80 dvd-parallel-line-left" />
            <div className="w-64 h-8 bg-gradient-to-l from-blue-900 via-blue-500 to-cyan-400 blur-xl opacity-80 dvd-parallel-line-right" />
          </div>
        </div>
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider scroll-reveal" />

      {/* Second Scroll/Page Section */}
      <section 
        id="about"
        className={`py-20 px-4 border-b bg-black flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-10 transition-all duration-1000 ${
          visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Left: Girl Image with Glassy Border and Blue Shadow */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          <div className="relative rounded-3xl overflow-hidden border-4 border-white/60 backdrop-blur-lg shadow-2xl scroll-reveal-left" style={{ boxShadow: '0 20px 40px 0 rgba(0, 102, 255, 0.3)' }}>
            <img src={girlImg} alt="Woman Using Laptop" className="w-80 h-96 object-cover" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-6 bg-blue-500 blur-2xl opacity-70 rounded-full z-0" />
          </div>
        </div>
        {/* Right: Text Content */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-3xl font-bold mb-4 scroll-reveal-right">Building High-Converting Websites. Turning Clicks Into Clients.</h2>
          <p className="text-lg text-gray-300 mb-6 scroll-reveal">You don't need another pretty homepage.<br />You need a system that sells — even while you sleep.<br />At NovaForge, we build conversion-first websites that crush KPIs and scale your brand without guesswork.</p>
          {/* Glassy Lines with Tick Icon */}
          <div className="flex items-center gap-4 scroll-reveal-stagger">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white font-medium">Conversion-First Design</span>
          </div>
          <div className="flex items-center gap-4 scroll-reveal-stagger">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white font-medium">Data-Driven Strategy</span>
          </div>
          <div className="flex items-center gap-4 scroll-reveal-stagger">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white font-medium">24/7 Support & Maintenance</span>
          </div>
        </div>
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider scroll-reveal" />

      {/* Features Section */}
      <section 
        id="features" 
        className={`py-16 px-4 relative overflow-visible transition-all duration-1000 ${
          visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-extrabold mb-4 scroll-reveal">From Design to Impact. Built to Perform.</h2>
          <h3 className="text-2xl font-bold mb-2 text-blue-400 scroll-reveal">Delivered In A Second!</h3>
          <p className="text-lg text-gray-200 mb-2 scroll-reveal">Get unlimited design features that give you the freedom<br />to create without boundaries.</p>
          {/* Glowing horizontal line */}
          <div className="mx-auto mt-6 mb-2 w-2/3 h-3 rounded-full features-horizontal-line scroll-reveal" />
        </div>
        {/* Feature Boxes Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[40px] max-w-6xl mx-auto z-10 relative">
          {[
            {
              icon: 'https://framerusercontent.com/images/AJiedqWbxVBOUN9xB5kV5MNLyw.svg',
              title: 'Boost Your Revenue',
              subtitle: 'Strategic Design, Built to Sell',
              description: 'We design with one goal: revenue. Using proven psychology and data-backed layouts, we turn visitors into buyers fast.'
            },
            {
              icon: 'https://framerusercontent.com/images/c7ewovWjVsAf198pTS4MtYSO8k.svg',
              title: 'Fully Custome Design',
              subtitle: 'No Templates. Just identity.',
              description: 'Every detail is handcrafted to reflect your brand\'s essence -- built from scratch for impact, credibility, and clarity.'
            },
            {
              icon: 'https://framerusercontent.com/images/sgcwYsOD6V0LWJJRJQ99llynBI.svg',
              title: 'Perfect on Every Screen',
              subtitle: 'Mobile. Tablet. Desktop.',
              description: 'We ensure your site looks flawless and functions seamlessly across every device and resolution -- guaranteed.'
            },
            {
              icon: 'https://framerusercontent.com/images/qCPT61H8KatnJwS4aqpuVjWWdM.svg',
              title: 'Fast Turnaround',
              subtitle: 'Pro Workflow. Rapid Delivery.',
              description: 'You\'ll move faster than your competitors. Expect a premium site -- delivered efficiently, tested thoroughly, and ready to convert.'
            },
            {
              icon: 'https://framerusercontent.com/images/Oyac3Rl5DdKSc0EQHWNG6R5Oyhg.svg',
              title: 'Long-Term Support',
              subtitle: 'Fixes. Updates. Growth.',
              description: 'We don\'t ghost you after launch. Get real-time support, improvements, and upgrades -- whenever you need it.'
            },
            {
              icon: 'https://framerusercontent.com/images/Iwdftj1FguNyuJzFy1omuAPYcc.svg',
              title: '24/7 Support',
              subtitle: 'Always Here When You Need Us',
              description: 'Your success is our priority. Get instant support whenever you need it, with our dedicated team ready to help.'
            }
          ].map((feature, i) => (
            <div key={i} className={`glass-feature-box p-[48px] rounded-3xl shadow-2xl flex flex-col items-center text-center bg-half-blue-black min-h-[370px] transition-all duration-500 hover:scale-105 scroll-reveal-stagger ${i % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right'}`}>
              <div className="flex items-center gap-3 mb-2">
                <img src={feature.icon} alt="feature icon" className="w-10 h-10 mr-2" />
                <h4 className="text-2xl font-bold text-white">{feature.title}</h4>
                <span className="ml-2 px-3 py-1 rounded-lg border border-blue-400 bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white text-xs font-bold shadow"></span>
              </div>
              <div className="text-blue-200 font-semibold mb-1">{feature.subtitle}</div>
              <div className="w-1/2 h-1 rounded-full bg-blue-400/60 mb-8 mt-2" />
              <p className="text-gray-100 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* Backwards V-shaped glowing line */}
        <div className="features-v-line absolute left-1/2 top-24 w-2/3 h-32 pointer-events-none z-0" />
        {/* Left and Right vertical glowing lines */}
        <div className="features-side-line-left absolute left-0 bottom-0 h-40 w-24 pointer-events-none z-0" />
        <div className="features-side-line-right absolute right-0 bottom-0 h-40 w-24 pointer-events-none z-0" />
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider scroll-reveal" />

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`py-16 px-4 relative overflow-visible transition-all duration-1000 ${
          visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* 3D Effect Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 6] }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[2, 2, 2]} intensity={1.2} color="#00b0ff" />
            <mesh>
              <sphereGeometry args={[2.5, 64, 64]} />
              <meshStandardMaterial color="#0ea5e9" metalness={0.7} roughness={0.2} transparent opacity={0.18} />
            </mesh>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
          </Canvas>
        </div>
        <div className="relative z-10 max-w-xl mx-auto">
          {/* Email & Phone Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-10">
            <div className="flex flex-col items-center bg-black/60 rounded-2xl px-8 py-6 shadow-xl glass-contact-form w-full">
              <span className="text-lg font-semibold text-white mb-1">Email</span>
              <a href="mailto:info@novaforge.com" className="text-blue-300 text-base hover:underline">info@novaforge.com</a>
            </div>
            <div className="flex flex-col items-center bg-black/60 rounded-2xl px-8 py-6 shadow-xl glass-contact-form w-full">
              <span className="text-lg font-semibold text-white mb-1">Phone</span>
              <a href="tel:+1234567890" className="text-blue-300 text-base hover:underline">+1 (234) 567-890</a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-black/60 rounded-3xl shadow-2xl p-10 glass-contact-form">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Contact Us</h2>
            
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/50 rounded-lg text-green-300 text-center">
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-300 text-center">
                <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className="text-sm">
                  <p className="font-semibold mb-1">EmailJS not configured</p>
                  <p>Please set up your EmailJS credentials in the code to enable email functionality.</p>
                  <p className="text-xs mt-2 opacity-75">Contact us directly at info@novaforge.com for now.</p>
                </div>
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 md:flex-row md:gap-8">
              <div className="flex-1 flex flex-col gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone"
                  required
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Your Country"
                  required
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="text"
                  name="agency"
                  value={formData.agency}
                  onChange={handleInputChange}
                  placeholder="Your Agency (optional)"
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={10}
                  required
                  className="h-full rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md resize-none min-h-[180px]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-2 px-8 py-3 rounded-lg text-white font-semibold shadow transition-all duration-300 border border-blue-400/40 focus:outline-none self-end ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-300 hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider scroll-reveal" />

      {/* FAQ Section */}
      <section 
        id="faq" 
        className={`py-16 px-4 relative overflow-hidden min-h-[600px] sm:min-h-[700px] transition-all duration-1000 ${
          visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Full Background Video */}
        <video src="/AB.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8 relative z-20">
          {/* Book an Appointment Button */}
          <a
            href="https://cal.com/novaforge-kljs4o/30min?duration=60&month=2025-07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white font-semibold shadow transition-all duration-300 hover:from-blue-700 hover:to-cyan-300 hover:scale-105 border border-blue-400/40 focus:outline-none mt-6"
          >
            Book an Appointment
          </a>
          <h2 className="text-3xl font-bold mb-4 mt-8">FAQ</h2>
          {/* Beautiful half-line border like in contact form */}
          <div className="mx-auto w-1/2 h-1 rounded-full bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-12" />
          
          {/* FAQ Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl">
            {/* Left: FAQ Questions */}
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Common Questions</h3>
              <div className="space-y-4">
                <a href="#" className="block p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">How long does it take to build a website?</h4>
                  <p className="text-sm text-gray-300 mt-1">Typically 2-4 weeks for a complete custom website</p>
                </a>
                <a href="#" className="block p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">Do you provide ongoing support?</h4>
                  <p className="text-sm text-gray-300 mt-1">Yes, we offer 24/7 support and maintenance packages</p>
                </a>
                <a href="#" className="block p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">What's included in your packages?</h4>
                  <p className="text-sm text-gray-300 mt-1">Custom design, development, SEO optimization, and training</p>
                </a>
                <a href="#" className="block p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">Can you redesign my existing website?</h4>
                  <p className="text-sm text-gray-300 mt-1">Absolutely! We specialize in website redesigns and improvements</p>
                </a>
              </div>
            </div>
            
            {/* Right: Social Links */}
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-6 text-blue-300">Connect With Our Team</h3>
              <div className="space-y-4">
                {/* Uron */}
                <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                  <h4 className="font-medium text-white mb-3">Uron</h4>
                  <div className="flex gap-3">
                    <a href="https://instagram.com/uron" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm hover:scale-105 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                    <a href="https://github.com/uron" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm hover:bg-gray-700 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
                
                {/* Abedin */}
                <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                  <h4 className="font-medium text-white mb-3">Abedin</h4>
                  <div className="flex gap-3">
                    <a href="https://instagram.com/abedin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm hover:scale-105 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                    <a href="https://github.com/abedin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm hover:bg-gray-700 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
                
                {/* Roni */}
                <div className="p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                  <h4 className="font-medium text-white mb-3">Roni</h4>
                  <div className="flex gap-3">
                    <a href="https://instagram.com/roni" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm hover:scale-105 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                    <a href="https://github.com/roni" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm hover:bg-gray-700 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
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
        </div>
      </section>
    </>
  );
};

export default HomePage; 