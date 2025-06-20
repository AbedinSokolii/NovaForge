import React, { useEffect, useState } from 'react';
import backImg from './assets/back.avif';
import girlImg from './assets/girl.avif';
import nfSignatureImg from './assets/nf signature.avif';
import '@fontsource/alex-brush';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Contact', href: '#contact' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Get In Touch', href: '#contact' },
];

function NovaLogoModel() {
  const gltf = useGLTF('/novalogo3d.gltf');
  return <primitive object={gltf.scene} scale={[6, 6, 6]} className="move-updown" />;
}

function App() {
  // Custom mouse dot state
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
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
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/70 border-b border-white/10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
          {/* Left: Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <img src={nfSignatureImg} alt="nf signature" className="w-32 h-20 object-contain shadow-md bg-black/30 backdrop-blur" />
            {/* Vertical Divider */}
            <div className="h-10 w-px bg-white/30 mx-2" />
            <ul className="flex gap-6 items-center text-lg">
              {navLinks.slice(0, 4).map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-100 hover:text-blue-400 font-medium px-2 py-1 rounded transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Right: Get In Touch Button */}
          <a
            href="#contact"
            className="inline-block px-5 py-2 rounded-lg bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white font-semibold shadow transition-all duration-300 hover:from-blue-700 hover:to-cyan-300 hover:scale-105 border border-blue-400/40 focus:outline-none"
          >
            Get In Touch
        </a>
        </div>
      </nav>
      {/* Spacer for navbar */}
      <div className="h-16" />

      {/* Home Section */}
      <section
        id="home"
        className="py-16 px-4"
        style={{
          background: 'transparent',
        }}
      >
        {/* Overlay removed */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
          {/* Left: Header and Paragraph */}
          <div className="md:w-1/2 w-full text-left mt-16">
            <h2 className="text-5xl font-extrabold mb-8 leading-tight">Websites That Sell. Built for Results. Engineered by NovaForge.</h2>
            <p className="text-2xl text-gray-300 mb-10 leading-relaxed">We don't do pretty. We build machines. Websites that convert visitors into customers — fast. If your site isn't selling, it's broken. Let's fix that.</p>
            {/* Contact Us Button */}
            <a href="#contact" className="inline-block px-8 py-3 rounded-lg bg-black/40 text-white font-semibold shadow transition-all duration-300 border border-transparent focus:outline-none hover:border-blue-400 hover:shadow-[0_0_16px_4px_rgba(0,176,255,0.5)]">
              Contact Us
        </a>
      </div>
          {/* Right: 3D GLTF Model */}
          <div className="hidden md:flex md:w-1/2 w-full mt-8 md:mt-0 items-center justify-center">
            <div className="glass-bg p-8 rounded-3xl shadow-2xl">
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
          <div className="dvd-parallel-wrapper absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="w-64 h-8 bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400 blur-xl opacity-80 dvd-parallel-line-left" />
            <div className="w-64 h-8 bg-gradient-to-l from-blue-900 via-blue-500 to-cyan-400 blur-xl opacity-80 dvd-parallel-line-right" />
          </div>
        </div>
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider" />

      {/* Second Scroll/Page Section */}
      <section className="py-20 px-4 border-b bg-black flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-10">
        {/* Left: Girl Image with Glassy Border and Blue Shadow */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          <div className="relative rounded-3xl overflow-hidden border-4 border-white/60 backdrop-blur-lg shadow-2xl" style={{boxShadow: '0 20px 40px 0 rgba(0, 102, 255, 0.3)'}}>
            <img src={girlImg} alt="Woman Using Laptop" className="w-80 h-96 object-cover" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-6 bg-blue-500 blur-2xl opacity-70 rounded-full z-0" />
          </div>
        </div>
        {/* Right: Text Content */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-3xl font-bold mb-4">Building High-Converting Websites. Turning Clicks Into Clients.</h2>
          <p className="text-lg text-gray-300 mb-6">You don't need another pretty homepage.<br />You need a system that sells — even while you sleep.<br />At NovaForge, we build conversion-first websites that crush KPIs and scale your brand without guesswork.</p>
          {/* Glassy Lines with Tick Icon */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-lg px-4 py-2 shadow border border-white/40">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 via-blue-400 to-cyan-400 text-white mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <span className="font-medium text-gray-800">Engineered for conversions. Every pixel has a purpose.</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-lg px-4 py-2 shadow border border-white/40">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 via-blue-400 to-cyan-400 text-white mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <span className="font-medium text-gray-800">Growth-focused. Not just design — strategy.</span>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider" />

      {/* Features Section */}
      <section id="features" className="py-16 px-4 relative overflow-visible">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-extrabold mb-4">From Design to Impact. Built to Perform.</h2>
          <h3 className="text-2xl font-bold mb-2 text-blue-400">Delivered In A Second!</h3>
          <p className="text-lg text-gray-200 mb-2">Get unlimited design features that give you the freedom<br />to create without boundaries.</p>
          {/* Glowing horizontal line */}
          <div className="mx-auto mt-6 mb-2 w-2/3 h-3 rounded-full features-horizontal-line" />
        </div>
        {/* Feature Boxes Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[40px] max-w-6xl mx-auto z-10 relative">
          {[
            'https://framerusercontent.com/images/AJiedqWbxVBOUN9xB5kV5MNLyw.svg',
            'https://framerusercontent.com/images/c7ewovWjVsAf198pTS4MtYSO8k.svg',
            'https://framerusercontent.com/images/sgcwYsOD6V0LWJJRJQ99llynBI.svg',
            'https://framerusercontent.com/images/qCPT61H8KatnJwS4aqpuVjWWdM.svg',
            'https://framerusercontent.com/images/Oyac3Rl5DdKSc0EQHWNG6R5Oyhg.svg',
            'https://framerusercontent.com/images/Iwdftj1FguNyuJzFy1omuAPYcc.svg',
          ].map((icon, i) => (
            <div key={i} className="glass-feature-box p-[48px] rounded-3xl shadow-2xl flex flex-col items-center text-center bg-half-blue-black min-h-[370px]">
              <div className="flex items-center gap-3 mb-2">
                <img src={icon} alt="feature icon" className="w-10 h-10 mr-2" />
                <h4 className="text-2xl font-bold text-white">Boost Your Revenue</h4>
                <span className="ml-2 px-3 py-1 rounded-lg border border-blue-400 bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white text-xs font-bold shadow">PRO</span>
              </div>
              <div className="text-blue-200 font-semibold mb-1">Business-Focused Design</div>
              <div className="w-1/2 h-1 rounded-full bg-blue-400/60 mb-8 mt-2" />
              <p className="text-gray-100 text-sm">We combine smart design and conversion psychology to turn visitors into paying clients. Your success is our goal.</p>
            </div>
          ))}
        </div>
        {/* Backwards V-shaped glowing line */}
        <div className="features-v-line absolute left-1/2 top-24 w-2/3 h-32 pointer-events-none z-0" />
        {/* Left and Right vertical glowing lines */}
        <div className="features-side-line-left absolute left-0 bottom-0 h-40 w-24 pointer-events-none z-0" />
        <div className="features-side-line-right absolute right-0 bottom-0 h-40 w-24 pointer-events-none z-0" />
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider" />

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 relative overflow-visible">
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
            <form className="flex flex-col gap-6 md:flex-row md:gap-8">
              <div className="flex-1 flex flex-col gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="text"
                  placeholder="Your Country"
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
                <input
                  type="text"
                  placeholder="Your Agency (optional)"
                  className="rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md"
                />
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <textarea
                  placeholder="Your Message"
                  rows={10}
                  className="h-full rounded-lg px-5 py-3 bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md resize-none min-h-[180px]"
                />
                <button
                  type="submit"
                  className="mt-2 px-8 py-3 rounded-lg bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white font-semibold shadow transition-all duration-300 hover:from-blue-700 hover:to-cyan-300 hover:scale-105 border border-blue-400/40 focus:outline-none self-end"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="mx-auto w-1/2 h-1 rounded-full bg-white/20 my-8 section-divider" />

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 relative overflow-hidden min-h-[600px] sm:min-h-[700px]">
        {/* Full Background Video */}
        <video src="/AB.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8 relative z-20">
          {/* Book an Appointment Button */}
          <a
            href="https://cal.com/novaforge-kljs4o/30min?duration=60&month=2025-07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-tr from-blue-900 via-blue-600 to-cyan-400 text-white font-semibold shadow transition-all duration-300 hover:from-blue-700 hover:to-cyan-300 hover:scale-105 border border-blue-400/40 focus:outline-none mt-6"
          >
            Book an Appointment
          </a>
          <h2 className="text-2xl font-semibold mb-2 mt-8">FAQ</h2>
          <p>Answers to common questions will be listed here.</p>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full py-8 bg-black/80 text-gray-300 text-center border-t border-white/10 mt-16">
        <span className="text-sm tracking-wide">&copy; {new Date().getFullYear()} NovaForge. All rights reserved.</span>
      </footer>
      </div>
  );
}

export default App;
