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
      {/* Decorative paper scraps floating in background */}
      <motion.div
        className="absolute top-20 right-[15%] w-24 h-32 bg-amber-100/60 shadow-md"
        style={{
          clipPath: "polygon(8% 2%, 95% 5%, 98% 92%, 5% 95%)",
          rotate: 25,
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [25, 30, 25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-[12%] w-28 h-28 bg-stone-200/50 shadow-md"
        style={{
          clipPath: "polygon(5% 8%, 92% 5%, 95% 88%, 8% 92%)",
          rotate: -15,
        }}
        animate={{
          y: [0, 20, 0],
          rotate: [-15, -20, -15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative tape pieces */}
      <div
        className="absolute top-[30%] right-[8%] w-20 h-8 bg-amber-200/40 shadow-sm"
        style={{
          rotate: 45,
          clipPath: "polygon(2% 20%, 98% 18%, 96% 82%, 1% 80%)",
        }}
      />

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
        {/* White sticker border */}
        <div className="absolute -inset-2 bg-white shadow-lg" style={{ clipPath: "polygon(4% 0%, 100% 1%, 99% 96%, 1% 99%)" }} />
        
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
        
        {/* Decorative tape on sticker */}
        <div
          className="absolute -top-1 right-4 w-12 h-5 bg-amber-100/60 shadow-sm"
          style={{
            rotate: -8,
            clipPath: "polygon(3% 25%, 97% 20%, 95% 78%, 2% 75%)",
          }}
        />
      </motion.button>

      {/* Work Experience Sticker - Top Right (SMALLER) */}
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
        {/* White sticker border */}
        <div className="absolute -inset-1.5 bg-white shadow-md" style={{ clipPath: "polygon(1% 4%, 97% 0%, 100% 99%, 7% 96%)" }} />
        
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_6px_16px_rgba(0,0,0,0.2)] overflow-hidden"
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
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12))",
            clipPath: "polygon(2% 5%, 95% 0%, 100% 98%, 8% 95%)"
          }}
        >
          <div className="relative w-28 h-28 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/ChatGPT%20Image%20Mar%2026,%202026,%2001_44_20%20PM.png"
              alt="Work Experience"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm px-2 py-1.5">
              <p className="text-white text-[10px] font-bold tracking-wide uppercase text-center">Work</p>
            </div>
          </div>
        </motion.div>
        
        {/* Decorative tape on sticker */}
        <div
          className="absolute top-2 left-1 w-10 h-4 bg-amber-100/60 shadow-sm"
          style={{
            rotate: 12,
            clipPath: "polygon(2% 22%, 98% 25%, 96% 75%, 3% 72%)",
          }}
        />
      </motion.button>

      {/* Portfolio Sticker - Bottom Middle (HIGHLIGHTED - LARGEST) */}
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
        {/* White sticker border - Thicker for emphasis */}
        <div className="absolute -inset-3 bg-white shadow-xl" style={{ clipPath: "polygon(5% 1%, 99% 3%, 97% 98%, 0% 96%)" }} />
        
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_10px_24px_rgba(0,0,0,0.28)] overflow-hidden"
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
            filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.18))",
            clipPath: "polygon(6% 2%, 100% 4%, 96% 100%, 0% 95%)"
          }}
        >
          <div className="relative w-44 h-44 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/ChatGPT%20Image%20Mar%2026,%202026,%2001_36_56%20PM.png"
              alt="Portfolio"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/85 backdrop-blur-sm px-3 py-2.5">
              <p className="text-white text-sm font-bold tracking-wide uppercase text-center">Portfolio</p>
            </div>
          </div>
        </motion.div>
        
        {/* Double tape cross for emphasis */}
        <div
          className="absolute -top-2.5 left-1/4 w-18 h-6 bg-amber-100/70 shadow-sm"
          style={{
            rotate: -5,
            clipPath: "polygon(3% 20%, 97% 22%, 95% 78%, 2% 76%)",
          }}
        />
        <div
          className="absolute -top-2.5 right-1/4 w-18 h-6 bg-amber-100/70 shadow-sm"
          style={{
            rotate: 5,
            clipPath: "polygon(2% 24%, 98% 20%, 96% 76%, 3% 80%)",
          }}
        />
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
        {/* White sticker border */}
        <div className="absolute -inset-2 bg-white shadow-lg" style={{ clipPath: "polygon(2% 4%, 98% 0%, 100% 95%, 4% 99%)" }} />
        
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
        
        {/* Decorative tape on corner */}
        <div
          className="absolute bottom-2 right-3 w-12 h-5 bg-amber-100/60 shadow-sm"
          style={{
            rotate: -15,
            clipPath: "polygon(3% 23%, 97% 25%, 95% 77%, 2% 73%)",
          }}
        />
      </motion.button>
      
      {/* Contact Me Sticker - Bottom Right (SMALLER) */}
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
        {/* White sticker border */}
        <div className="absolute -inset-1.5 bg-white shadow-md" style={{ clipPath: "polygon(7% 1%, 99% 4%, 96% 98%, 0% 93%)" }} />
        
        <motion.div
          className="relative bg-[#f9f6ed] p-0 rounded-none shadow-[0_6px_16px_rgba(0,0,0,0.2)] overflow-hidden"
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
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12))",
            clipPath: "polygon(8% 2%, 98% 5%, 95% 100%, 0% 92%)"
          }}
        >
          <div className="relative w-28 h-28 overflow-hidden">
            <ImageWithFallback
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/fan.jpg"
              alt="Contact Me"
              className="w-full h-full object-cover sepia-[0.3] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 to-transparent mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm px-2 py-1.5">
              <p className="text-white text-[10px] font-bold tracking-wide uppercase text-center">Contact Me</p>
            </div>
          </div>
        </motion.div>
        
        {/* Decorative vertical tape */}
        <div
          className="absolute top-1/4 -right-0.5 w-4 h-12 bg-amber-100/60 shadow-sm"
          style={{
            rotate: 85,
            clipPath: "polygon(20% 2%, 78% 3%, 80% 97%, 22% 98%)",
          }}
        />
      </motion.button>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
            className="text-lg md:text-xl text-stone-600 mb-14 max-w-2xl mx-auto leading-relaxed cursor-pointer font-light italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontFamily: "'Georgia', serif" }}
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