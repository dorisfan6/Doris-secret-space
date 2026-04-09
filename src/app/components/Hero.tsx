import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Newspaper/Magazine Cutout Stickers - Clickable Links */}
      
      {/* Education Sticker - Top Left */}
      <motion.button
        onClick={() => scrollToSection('education')}
        data-cursor="hover"
        className="absolute top-40 left-24 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [0, 1], [0, 25]),
          y: useTransform(mouseYSpring, [0, 1], [0, 15]),
        }}
        whileHover={{ scale: 1.15, rotate: 8, z: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden"
          animate={{ 
            rotate: [-2, -5, -2],
            y: [0, -8, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ 
            transformOrigin: "center", 
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            clipPath: "polygon(5% 0%, 100% 2%, 98% 95%, 2% 98%)"
          }}
        >
          <div className="relative w-36 h-36 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Gemini_Generated_Image_k4rq32k4rq32k4rq.png"
              alt="Education"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm px-2 py-2">
              <p className="text-white text-xs font-bold tracking-wide uppercase text-center">Education</p>
            </div>
          </div>
        </motion.div>
      </motion.button>

      {/* Work Experience Sticker - Top Right */}
      <motion.button
        onClick={() => scrollToSection('projects')}
        data-cursor="hover"
        className="absolute top-40 right-24 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [0, 1], [0, -25]),
          y: useTransform(mouseYSpring, [0, 1], [0, 15]),
        }}
        whileHover={{ scale: 1.15, rotate: -8, z: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden"
          animate={{ 
            rotate: [3, 6, 3],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ 
            transformOrigin: "center", 
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            clipPath: "polygon(2% 5%, 95% 0%, 100% 98%, 8% 95%)"
          }}
        >
          <div className="relative w-36 h-36 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/ChatGPT%20Image%20Mar%2026,%202026,%2001_44_20%20PM.png"
              alt="Work Experience"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm px-2 py-2">
              <p className="text-white text-xs font-bold tracking-wide uppercase text-center">Work</p>
            </div>
          </div>
        </motion.div>
      </motion.button>

      {/* Portfolio Sticker - Bottom Middle (HIGHLIGHTED) */}
      <motion.button
        onClick={() => scrollToSection('experiments')}
        data-cursor="hover"
        className="absolute bottom-32 left-1/2 -translate-x-1/2 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [0, 1], [0, 0]),
          y: useTransform(mouseYSpring, [0, 1], [0, 30]),
        }}
        whileHover={{ scale: 1.15, rotate: 7, z: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden"
          animate={{ 
            rotate: [-2, -4, -2],
            y: [0, -7, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.3
          }}
          style={{ 
            transformOrigin: "center", 
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            clipPath: "polygon(6% 2%, 100% 4%, 96% 100%, 0% 95%)"
          }}
        >
          <div className="relative w-36 h-36 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/ChatGPT%20Image%20Mar%2026,%202026,%2001_36_56%20PM.png"
              alt="Portfolio"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm px-3 py-2">
              <p className="text-white text-sm font-bold tracking-wide uppercase text-center">Portfolio</p>
            </div>
          </div>
        </motion.div>
      </motion.button>
      
      {/* About Me Sticker - Bottom Left */}
      <motion.button
        onClick={() => scrollToSection('about')}
        data-cursor="hover"
        className="absolute bottom-48 left-24 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [0, 1], [0, 20]),
          y: useTransform(mouseYSpring, [0, 1], [0, 25]),
        }}
        whileHover={{ scale: 1.15, rotate: -6, z: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden"
          animate={{ 
            rotate: [1, 3, 1],
            y: [0, -6, 0]
          }}
          transition={{ 
            duration: 5.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ 
            transformOrigin: "center", 
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            clipPath: "polygon(3% 5%, 97% 0%, 100% 94%, 5% 98%)"
          }}
        >
          <div className="relative w-36 h-36 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/ChatGPT%20Image%20Mar%2026,%202026,%2003_52_36%20AM.png"
              alt="About Me"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm px-3 py-2">
              <p className="text-white text-sm font-bold tracking-wide uppercase text-center">About Me</p>
            </div>
          </div>
        </motion.div>
      </motion.button>
      
      {/* Contact Me Sticker - Bottom Right */}
      <motion.button
        onClick={() => scrollToSection('contact')}
        data-cursor="hover"
        className="absolute bottom-48 right-24 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [0, 1], [0, -20]),
          y: useTransform(mouseYSpring, [0, 1], [0, 25]),
        }}
        whileHover={{ scale: 1.15, rotate: 10, z: 10 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden"
          animate={{ 
            rotate: [-4, -7, -4],
            y: [0, -12, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          style={{ 
            transformOrigin: "center", 
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            clipPath: "polygon(8% 2%, 98% 5%, 95% 100%, 0% 92%)"
          }}
        >
          <div className="relative w-32 h-32 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/fan.jpg"
              alt="Contact Me"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm px-2 py-1.5">
              <p className="text-white text-xs font-bold tracking-wide uppercase text-center">Contact Me</p>
            </div>
          </div>
        </motion.div>
      </motion.button>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-block mb-8"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-sm tracking-wider text-stone-700 uppercase bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full border border-stone-300/50 shadow-sm" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}>
              Digital Storyteller
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-7xl md:text-8xl lg:text-9xl mb-6 text-stone-900 tracking-tight cursor-pointer"
            style={{ 
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              fontFamily: "'Caveat', cursive"
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            data-cursor="hover"
          >
            Doris Fan
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-stone-600 mb-14 max-w-2xl mx-auto leading-relaxed cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontFamily: "'Architects Daughter', cursive" }}
            whileHover={{ scale: 1.05 }}
            data-cursor="hover"
          >
            Somewhere between film, design, and quiet moments
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-stone-400/60 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-2 bg-stone-600 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}