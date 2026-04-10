import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Experiments } from "./components/Experiments";
import { Contact } from "./components/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Smart scroll behavior - show header when scrolling up, hide when scrolling down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingUp = latest < lastScrollY;
    const isAtTop = latest < 100;
    
    setHeaderVisible(isScrollingUp || isAtTop);
    setLastScrollY(latest);
  });

  useEffect(() => {
    // Simulate loading with progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[10000] bg-[#f5f1e8] flex items-center justify-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23F5F1E8' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' fill='%23f5f1e8'/%3E%3C/svg%3E")`,
            }}
          >
            <div className="text-center">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-16 h-16 mx-auto mb-8 rounded-full border-3 border-stone-300 border-t-amber-700"
              />
              <motion.h2
                className="text-2xl font-light text-stone-800 mb-4"
                style={{ fontFamily: "'Caveat', cursive" }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Preparing Experience
              </motion.h2>
              <div className="w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-800"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <p className="text-stone-600 text-sm mt-2 font-light" style={{ fontFamily: "'Caveat', cursive" }}>{loadingProgress}%</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-[#f5f1e8]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23F5F1E8' surfaceScale='2'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' fill='%23f5f1e8'/%3E%3C/svg%3E")`,
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Custom cursor */}
          <CustomCursor />

          {/* Subtle grain texture overlay */}
          <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] mix-blend-overlay">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Navigation - Minimal Collage Style */}
          {/* Logo - Paper Label */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ 
              x: headerVisible ? 0 : -30, 
              opacity: headerVisible ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-8 left-8 z-50"
            style={{ cursor: 'none' }}
          >
            <motion.div className="relative">
              {/* White sticker border */}
              <div 
                className="absolute -inset-2.5 bg-white border-2 border-stone-200/70 shadow-md"
                style={{
                  clipPath: "polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%)",
                  transform: 'rotate(1deg)',
                }}
              />
              
              {/* Paper label background */}
              <motion.div
                className="relative bg-[#faf8f3] border border-stone-300/50 shadow-[2px_3px_8px_rgba(0,0,0,0.15)]"
                style={{
                  transform: 'rotate(-1.5deg)',
                  clipPath: "polygon(8% 2%, 92% 0%, 98% 8%, 100% 92%, 92% 98%, 8% 100%, 2% 92%, 0% 8%)",
                }}
                whileHover={{ scale: 1.08, rotate: 2 }}
                data-cursor="hover"
              >
                {/* Paper texture */}
                <div 
                  className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                <div
                  className="text-4xl text-stone-900 relative z-10 px-5 py-3"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  DF
                </div>
              </motion.div>
              
              {/* Small decorative tape */}
              <div 
                className="absolute -top-1.5 -right-1.5 w-26 h-10 bg-amber-100/60 border border-amber-200/30 shadow-sm"
                style={{
                  rotate: 25,
                  clipPath: "polygon(5% 20%, 95% 22%, 93% 78%, 3% 76%)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Navigation Links - Direct on Page */}
          <motion.nav
            initial={{ x: 30, opacity: 0 }}
            animate={{ 
              x: headerVisible ? 0 : 30, 
              opacity: headerVisible ? 1 : 0 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-10 right-10 z-50 flex gap-8"
            style={{ cursor: 'none' }}
          >
            {[
              { label: "About Me", id: "about" },
              { label: "Education", id: "education" },
              { label: "Portfolio", id: "experiments" },
              { label: "Contact Me", id: "contact" }
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={`#${item.id}`}
                data-cursor="hover"
                className="relative text-stone-700 hover:text-amber-800 transition-colors text-sm font-medium tracking-wide"
                whileHover={{ y: -2, scale: 1.05 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.label}
                {/* Subtle underline on hover */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-amber-700"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.a>
            ))}
          </motion.nav>

          {/* Main content */}
          <main className="relative">
            <Hero />
            <div id="experiments" style={{ position: 'relative' }}>
              <Experiments />
            </div>
            <div id="about" style={{ position: 'relative' }}>
              <About />
            </div>
            <div id="education" style={{ position: 'relative' }}>
              <Education />
            </div>
            <div id="contact" style={{ position: 'relative' }}>
              <Contact />
            </div>
          </main>

          {/* Floating action button - GIF to scroll to top */}
          <motion.button
            data-cursor="hover"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.15)] z-40 overflow-hidden bg-transparent border-0 p-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Untitled_Artwork.gif" 
              alt="Scroll to top"
              className="w-full h-full object-cover"
            />
          </motion.button>
        </motion.div>
      )}
    </>
  );
}