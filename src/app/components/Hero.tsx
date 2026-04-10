import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import paperBrushAsset from "figma:asset/3083ebf8141e014a5730b77c2365dd3527297f1e.png";
import aboutMeAsset from "figma:asset/a85c12079127ccb76a6ba62200070f92fd9d26eb.png";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 120, mass: 0.8 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

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
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      style={{ 
        background: '#f5f1e8',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23F5F1E8' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' fill='%23f5f1e8'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle pencil sketch stars - very faint */}
      <svg className="absolute top-[15%] left-[18%] w-12 h-12 opacity-[0.08]" viewBox="0 0 24 24" fill="none" stroke="#2C2418" strokeWidth="0.3">
        <path d="M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z" />
      </svg>
      <svg className="absolute top-[60%] right-[22%] w-10 h-10 opacity-[0.06]" viewBox="0 0 24 24" fill="none" stroke="#2C2418" strokeWidth="0.3">
        <path d="M12 2l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z" />
      </svg>
      
      {/* Subtle pencil arrow sketches */}
      <svg className="absolute bottom-[25%] left-[12%] w-16 h-8 opacity-[0.07]" viewBox="0 0 40 20" fill="none" stroke="#2C2418" strokeWidth="0.4">
        <path d="M2 10 L32 10 M32 10 L26 5 M32 10 L26 15" strokeLinecap="round" />
      </svg>

      {/* Almost invisible tea cup stain - very subtle */}
      <div 
        className="absolute top-[35%] right-[15%] w-32 h-32 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 104, 65, 0.4) 0%, rgba(139, 104, 65, 0.2) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* HYPER-REALISTIC DRIED PEARLS scattered */}
      {/* Pearl 1 - top left area */}
      <div 
        className="absolute top-[22%] left-[28%] w-3 h-3 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #FFFEF8, #F5F3ED 40%, #E8E4DB 70%, #C9C5BC)',
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.15),
            inset -1px -1px 2px rgba(0, 0, 0, 0.1),
            inset 1px 1px 2px rgba(255, 255, 255, 0.9)
          `,
        }}
      />
      {/* Pearl 2 - near center */}
      <div 
        className="absolute top-[48%] left-[42%] w-2.5 h-2.5 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #FFFEFA, #F7F5F0 45%, #EBE8E0 75%, #CDC9C0)',
          boxShadow: `
            0 1px 3px rgba(0, 0, 0, 0.12),
            inset -0.5px -0.5px 1px rgba(0, 0, 0, 0.08),
            inset 0.5px 0.5px 1.5px rgba(255, 255, 255, 0.95)
          `,
        }}
      />
      {/* Pearl 3 - bottom right */}
      <div 
        className="absolute bottom-[30%] right-[35%] w-3.5 h-3.5 rounded-full"
        style={{
          background: 'radial-gradient(circle at 28% 28%, #FFFFFF, #F8F6F1 38%, #ECE9E2 68%, #D1CEC5)',
          boxShadow: `
            0 2px 5px rgba(0, 0, 0, 0.18),
            inset -1px -1px 2px rgba(0, 0, 0, 0.12),
            inset 1px 1px 2.5px rgba(255, 255, 255, 1)
          `,
        }}
      />

      {/* DELICATE TANGLED SILVER CHAIN - bottom left */}
      <svg 
        className="absolute bottom-[18%] left-[15%] w-28 h-24 opacity-90"
        viewBox="0 0 120 100"
        fill="none"
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))',
        }}
      >
        {/* Silver chain links - complex tangled path */}
        <path 
          d="M10,50 Q20,30 35,45 T55,40 Q70,35 75,50 T85,60 Q95,70 105,55"
          stroke="url(#silverGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M15,55 Q25,65 40,50 T60,55 Q72,60 78,45"
          stroke="url(#silverGradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8E8E8" />
            <stop offset="30%" stopColor="#C0C0C0" />
            <stop offset="60%" stopColor="#A8A8A8" />
            <stop offset="100%" stopColor="#D0D0D0" />
          </linearGradient>
        </defs>
      </svg>

      {/* 1. THE LSD DIFFRACTION DISK - Top Left (Education) */}
      <motion.button
        onClick={() => scrollToSection('education')}
        data-cursor="hover"
        className="absolute top-24 left-26 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [-1, 1], [-8, 8]),
          y: useTransform(mouseYSpring, [-1, 1], [-6, 6]),
        }}
        whileHover={{ scale: 1.12, rotate: 8, z: 50 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            filter: "drop-shadow(0 35px 70px rgba(0,0,0,0.35))",
          }}
        >
          {/* Polished metal base disk */}
          <div 
            className="relative w-72 h-72 rounded-full overflow-visible"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #3A3A3A 0%, #2A2A2A 30%, #1A1A1A 60%, #0D0D0D 100%)',
              boxShadow: `
                0 0 80px rgba(0, 0, 0, 0.6),
                0 15px 50px rgba(0, 0, 0, 0.5),
                inset 0 2px 10px rgba(255, 255, 255, 0.08),
                inset 0 -5px 20px rgba(0, 0, 0, 0.8)
              `,
            }}
          >
            {/* Holotropic Diffraction Grating - LSD-like advanced refractive material */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  conic-gradient(from 0deg at 50% 50%,
                    rgba(255, 0, 128, 0.15) 0deg,
                    rgba(255, 140, 0, 0.12) 30deg,
                    rgba(255, 215, 0, 0.15) 60deg,
                    rgba(0, 255, 0, 0.12) 90deg,
                    rgba(0, 206, 209, 0.15) 120deg,
                    rgba(0, 128, 255, 0.12) 150deg,
                    rgba(139, 0, 255, 0.15) 180deg,
                    rgba(255, 0, 128, 0.12) 210deg,
                    rgba(255, 69, 0, 0.15) 240deg,
                    rgba(255, 255, 0, 0.12) 270deg,
                    rgba(0, 255, 128, 0.15) 300deg,
                    rgba(0, 191, 255, 0.12) 330deg,
                    rgba(255, 0, 128, 0.15) 360deg
                  )
                `,
                opacity: 0.4,
                mixBlendMode: 'screen',
                animation: 'rotate 20s linear infinite',
              }}
            />
            
            {/* Micro-diffraction rings */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  repeating-radial-gradient(circle at 50% 50%,
                    transparent 0px,
                    rgba(255, 255, 255, 0.08) 2px,
                    transparent 4px,
                    rgba(255, 255, 255, 0.05) 6px,
                    transparent 8px
                  )
                `,
              }}
            />

            {/* Holographic light rays */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  repeating-conic-gradient(from 45deg,
                    transparent 0deg,
                    rgba(255, 255, 255, 0.12) 1deg,
                    transparent 2deg,
                    rgba(255, 255, 255, 0.08) 3deg,
                    transparent 4deg
                  )
                `,
                opacity: 0.3,
              }}
            />
            
            {/* Center content area with volumetric depth */}
            <div 
              className="absolute inset-8 rounded-full overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8)',
                border: '3px solid rgba(40, 40, 40, 0.9)',
              }}
            >
              <ImageWithFallback
                src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/ChatGPT%20Image%20Mar%2026,%202026,%2001_36_56%20PM.png"
                alt="Education"
                className="w-full h-full object-cover brightness-95 contrast-110"
              />
            </div>
            
            {/* Metallic center hub */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #505050, #303030 50%, #101010)',
                boxShadow: `
                  0 5px 20px rgba(0, 0, 0, 0.8),
                  inset 0 3px 10px rgba(0, 0, 0, 0.9),
                  inset 0 -2px 8px rgba(255, 255, 255, 0.1)
                `,
              }}
            />
            
            {/* Y2K Metal Text around edge with deep volumetric shadow */}
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 288 288">
                <defs>
                  <path id="diskPath" d="M 144, 144 m -125, 0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0" />
                  <filter id="metalText">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                    <feOffset in="blur" dx="0" dy="8" result="offsetBlur"/>
                    <feFlood floodColor="#000000" floodOpacity="0.6"/>
                    <feComposite in2="offsetBlur" operator="in" result="shadow"/>
                    <feMerge>
                      <feMergeNode in="shadow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E8E8E8" />
                    <stop offset="40%" stopColor="#A0A0A0" />
                    <stop offset="60%" stopColor="#707070" />
                    <stop offset="100%" stopColor="#C0C0C0" />
                  </linearGradient>
                </defs>
                <text 
                  fill="url(#metalGrad)" 
                  fontSize="13" 
                  fontWeight="900" 
                  letterSpacing="5" 
                  fontFamily="'IBM Plex Mono', monospace"
                  filter="url(#metalText)"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  <textPath href="#diskPath" startOffset="50%" textAnchor="middle">
                    ⬡ EDUCATION ⬡ LEARNING ⬡
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.button>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* 2. THE BLUE ACETATE FILM BUNCH - Top Right (Contact) */}
      <motion.button
        onClick={() => scrollToSection('contact')}
        data-cursor="hover"
        className="absolute top-18 right-32 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [-1, 1], [-10, 10]),
          y: useTransform(mouseYSpring, [-1, 1], [-8, 8]),
        }}
        whileHover={{ scale: 1.1, rotate: -5, z: 45 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative"
          animate={{ 
            y: [0, -18, 0],
            rotate: [5, 7, 5]
          }}
          transition={{ 
            duration: 11, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{
            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.32))",
          }}
        >
          {/* Highly stacked bunch of acetate films with physical depth */}
          <div className="relative w-44 h-[480px]">
            {/* Background acetate layers - creating stack depth */}
            <div 
              className="absolute inset-0 rounded-sm transform translate-x-5 translate-y-5 rotate-2"
              style={{
                background: 'linear-gradient(135deg, rgba(80, 120, 160, 0.25), rgba(60, 100, 140, 0.3))',
                backdropFilter: 'blur(2px)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
              }}
            />
            <div 
              className="absolute inset-0 rounded-sm transform translate-x-3 translate-y-3 rotate-1"
              style={{
                background: 'linear-gradient(130deg, rgba(70, 110, 150, 0.28), rgba(55, 95, 135, 0.32))',
                backdropFilter: 'blur(1.5px)',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)',
              }}
            />
            
            {/* Main top acetate strip - semi-translucent blue tint */}
            <div 
              className="relative w-full h-full rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(125deg, rgba(85, 130, 175, 0.72), rgba(65, 110, 155, 0.68))',
                backdropFilter: 'blur(3px)',
                boxShadow: `
                  0 0 0 1px rgba(120, 160, 200, 0.3),
                  0 12px 35px rgba(0, 0, 0, 0.28),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.15)
                `,
              }}
            >
              {/* Acetate surface reflection streaks */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(145deg, transparent 0%, rgba(255, 255, 255, 0.15) 30%, transparent 50%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)',
                }}
              />
              
              {/* Film edge markings */}
              <div className="absolute top-3 left-2 right-2 flex justify-between items-center">
                <p className="text-[8px] font-bold text-blue-100 tracking-wider opacity-80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  ACETATE 35mm
                </p>
                <p className="text-[8px] font-bold text-blue-100 opacity-70" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  24
                </p>
              </div>
              
              {/* Contact image - full height with blue overlay */}
              <div className="absolute left-4 right-4 top-10 bottom-16">
                <div 
                  className="w-full h-full overflow-hidden"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <ImageWithFallback
                    src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Gemini_Generated_Image_k4rq32k4rq32k4rq.png"
                    alt="Contact"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'contrast(1.08) brightness(0.98)',
                    }}
                  />
                </div>
              </div>
              
              {/* Bottom label */}
              <div className="absolute bottom-5 left-4 right-4">
                <p className="text-white text-[5px] font-bold tracking-widest uppercase text-center opacity-90" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  CONTACT ME
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.button>

      {/* 3. THE HAND-DECKLED NOTEPAD - Bottom Left (About) */}
      <motion.button
        onClick={() => scrollToSection('about')}
        data-cursor="hover"
        className="absolute bottom-12 left-8 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [-1, 1], [-12, 12]),
          y: useTransform(mouseYSpring, [-1, 1], [-10, 10]),
        }}
        whileHover={{ scale: 1.1, rotate: -10, z: 48 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative"
          animate={{ 
            y: [0, -14, 0],
            rotate: [7, 9, 7]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.8
          }}
          style={{
            filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.3))",
            rotate: 7,
          }}
        >
          {/* About Me Asset Image */}
          <img 
            src={aboutMeAsset} 
            alt="About Me"
            className="w-auto h-auto max-w-[280px]"
            style={{
              filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.25))',
            }}
          />
        </motion.div>
      </motion.button>

      {/* 4. THE MINIATURE SCREEN - Bottom Right (Portfolio) */}
      <motion.button
        onClick={() => scrollToSection('experiments')}
        data-cursor="hover"
        className="absolute bottom-24 right-10 cursor-pointer group"
        style={{
          x: useTransform(mouseXSpring, [-1, 1], [-14, 14]),
          y: useTransform(mouseYSpring, [-1, 1], [-12, 12]),
        }}
        whileHover={{ scale: 1.12, rotate: 4, z: 52 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative"
          animate={{ 
            y: [0, -16, 0],
            rotate: [-3, -1, -3]
          }}
          transition={{ 
            duration: 10.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.2
          }}
          style={{
            filter: "drop-shadow(0 38px 72px rgba(0,0,0,0.38))",
          }}
        >
          {/* Miniature Vintage Mac OS Style Window */}
          <div 
            className="relative w-96 h-80 rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #F5F5F5, #E8E8E8)',
              boxShadow: `
                0 0 0 2px #A0A0A0,
                0 0 0 3px #D0D0D0,
                0 20px 60px rgba(0, 0, 0, 0.35)
              `,
            }}
          >
            {/* Window title bar - classic Mac OS style */}
            <div 
              className="h-9 flex items-center px-3 justify-between"
              style={{
                background: 'linear-gradient(180deg, #E0E0E0, #C8C8C8)',
                borderBottom: '1px solid #A0A0A0',
              }}
            >
              {/* Traffic light buttons */}
              <div className="flex gap-2">
                <div 
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #FF6B6B, #DC4444)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(255, 255, 255, 0.5)',
                  }}
                />
                <div 
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #FFD93D, #F0C020)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(255, 255, 255, 0.5)',
                  }}
                />
                <div 
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #6BCF7F, #4DB864)',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(255, 255, 255, 0.5)',
                  }}
                />
              </div>
              
              {/* Window title */}
              <p 
                className="text-[10px] font-semibold text-stone-700 tracking-wide flex-1 text-center mr-14"
                style={{ 
                  fontFamily: "'IBM Plex Mono', monospace",
                  textShadow: '0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                PORTFOLIO_REEL.mov
              </p>
            </div>
            
            {/* Window content - portfolio video placeholder */}
            <div className="relative w-full h-full bg-black">
              <ImageWithFallback
                src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/ChatGPT%20Image%20Mar%2026,%202026,%2003_52_36%20AM.png"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
              
              {/* Video play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(240, 240, 240, 0.9))',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div 
                    className="w-0 h-0 ml-2"
                    style={{
                      borderLeft: '18px solid #2C2418',
                      borderTop: '12px solid transparent',
                      borderBottom: '12px solid transparent',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.button>

      {/* Main hero content - center */}
      <div className="relative z-10 text-center px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Hero Title - Oversized bespoke calligraphic script */}
          <motion.h1 
            className="text-[3rem] md:text-[6rem] lg:text-[8rem] mb-12 tracking-tight cursor-pointer leading-none"
            style={{ 
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              fontFamily: "'Indie Flower', cursive",
              color: '#2C2418',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            data-cursor="hover"
          >
            Doris Fan
          </motion.h1>
          
          {/* Subtitle on torn-paper snippet - typewriter grid text */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, rotate: -2 }}
            animate={{ opacity: mounted ? 1 : 0, rotate: mounted ? -2 : -4 }}
            transition={{ delay: 0.4, duration: 1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            data-cursor="hover"
          >
            {/* Paper brush stroke background */}
            <img 
              src={paperBrushAsset} 
              alt=""
              className="absolute inset-0 -m-4 mt-1 ml-4 w-full h-full object-cover pointer-events-none"
              style={{
                filter: 'drop-shadow(0 8px 28px rgba(0, 0, 0, 0.18))',
                transform: 'scale(1.6)',
              }}
            />
            
            <p
              className="relative text-[8px] md:text-xs px-12 py-4 font-small tracking-widest"
              style={{ 
                fontFamily: "'Special Elite', monospace",
                color: '#3A3228',
                letterSpacing: '1.5px',
              }}
            >
              FILM • CONTENT CREATION • QUIET MOMENTS
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div 
              className="w-7 h-12 border-2 rounded-full flex justify-center pt-2"
              style={{
                borderColor: 'rgba(60, 50, 40, 0.4)',
              }}
            >
              <motion.div
                className="w-2 h-2.5 rounded-full"
                style={{
                  background: 'rgba(60, 50, 40, 0.6)',
                }}
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}