import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Linkedin, FileText, Send, Sparkles } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yinuofandoris", color: "hover:text-blue-700" },
  { icon: FileText, label: "Resume", href: "https://drive.google.com/file/d/1raj2wRf8DxtermDv6yBbewi3ad6Ez1Lz/view?usp=sharing", color: "hover:text-sky-600" },
  { icon: Mail, label: "Email", href: "mailto:yinuofan@usc.edu", color: "hover:text-amber-700" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-16 md:py-32 px-4 md:px-8 bg-transparent overflow-hidden" style={{ position: 'relative' }}>
      {/* Depth of field background blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] -z-10" />
      
      {/* Soft background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-200/20 blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-stone-300/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -25, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="text-amber-600 w-5 h-5" />
            <span className="text-stone-700 tracking-wider uppercase text-sm bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full border border-stone-300/50 shadow-sm" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}>Let's Connect</span>
            <Sparkles className="text-amber-700 w-5 h-5" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl text-stone-900 mb-6" style={{ fontFamily: "'Caveat', cursive" }}>
            Got an idea?
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-amber-800" style={{ fontFamily: "'Kalam', cursive" }}>
            Let's create something meaningful together
          </p>
        </motion.div>

        {/* Main contact card - torn page from magazine */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          {/* Soft glow effect */}
          <motion.div
            className="absolute -inset-4 bg-amber-200/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          />

          <div
            className="relative bg-white p-6 md:p-12 border-2 border-stone-300 shadow-[8px_8px_0px_rgba(0,0,0,0.1),14px_14px_0px_rgba(245,158,11,0.08)]"
            style={{
              clipPath: "polygon(1% 0%, 98% 0%, 100% 2%, 100% 97%, 98% 100%, 3% 100%, 0% 98%, 0% 2%)",
            }}
          >
            {/* Paper texture */}
            <div 
              className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Torn edge at top */}
            <div 
              className="absolute top-0 left-0 right-0 h-3 bg-white z-10"
              style={{
                clipPath: "polygon(0% 100%, 4% 50%, 8% 80%, 12% 45%, 16% 75%, 20% 50%, 24% 85%, 28% 45%, 32% 70%, 36% 50%, 40% 80%, 44% 45%, 48% 75%, 52% 50%, 56% 80%, 60% 45%, 64% 75%, 68% 50%, 72% 80%, 76% 45%, 80% 75%, 84% 50%, 88% 80%, 92% 45%, 96% 75%, 100% 50%, 100% 0%, 0% 0%)",
              }}
            />

            <p className="text-stone-700 text-base md:text-xl mb-8 text-center leading-relaxed font-light relative z-10" style={{ fontFamily: "'Kalam', cursive" }}>
              Whether you want to collaborate on a project, discuss design, or simply say hello —{" "}
              <span className="text-amber-800 font-normal">I'm always up for meaningful conversations</span>.
            </p>

            {/* Email input - handwritten form style */}
            <motion.div
              className="relative mb-8 z-10"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4 bg-amber-50/60 p-2 border-2 border-amber-200/70 group-hover:border-amber-300 transition-colors shadow-[3px_3px_0px_rgba(0,0,0,0.08)]"
                style={{
                  clipPath: "polygon(1% 0%, 99% 0%, 100% 1%, 100% 99%, 99% 100%, 1% 100%, 0% 99%, 0% 1%)",
                }}
              >
                <Mail className="text-amber-700 ml-4 w-5 h-5" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-stone-800 placeholder:text-stone-400 outline-none py-3 font-light"
                  style={{ fontFamily: "'Kalam', cursive" }}
                />
                <motion.button
                  data-cursor="hover"
                  whileHover={{ scale: 1.05, y: -1, boxShadow: "3px_3px_0px_rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-stone-800 px-6 py-3 text-white font-medium flex items-center gap-2 hover:bg-stone-700 shadow-[2px_2px_0px_rgba(0,0,0,0.25)] transition-all"
                  style={{
                    fontFamily: "'Courier New', monospace",
                    clipPath: "polygon(2% 0%, 98% 0%, 100% 3%, 100% 97%, 98% 100%, 2% 100%, 0% 97%, 0% 3%)",
                  }}
                >
                  <span>Get in Touch</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Divider with handwritten feel */}
            <div className="relative mb-8 z-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-stone-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-stone-500 text-sm font-light" style={{ fontFamily: "'Kalam', cursive" }}>or find me on</span>
              </div>
            </div>

            {/* Social links - pinned cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">{socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                    rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                    data-cursor="hover"
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0,
                      rotate: (index % 2 === 0 ? -1.5 : 1.5) 
                    } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onHoverStart={() => setHoveredSocial(index)}
                    onHoverEnd={() => setHoveredSocial(null)}
                    whileHover={{ y: -6, rotate: 0 }}
                    className="relative group/social"
                    style={{ cursor: 'pointer' }}
                  >
                    <motion.div
                      className={`flex flex-col items-center gap-3 bg-amber-50/70 p-6 border-2 border-amber-200/70 ${social.color} transition-colors shadow-[3px_3px_0px_rgba(0,0,0,0.1)]`}
                      style={{
                        clipPath: "polygon(3% 0%, 97% 0%, 100% 4%, 100% 96%, 97% 100%, 3% 100%, 0% 96%, 0% 4%)",
                      }}
                    >
                      {/* Hover glow */}
                      <motion.div
                        className="absolute inset-0 bg-amber-100"
                        style={{
                          clipPath: "polygon(3% 0%, 97% 0%, 100% 4%, 100% 96%, 97% 100%, 3% 100%, 0% 96%, 0% 4%)",
                        }}
                        animate={{ opacity: hoveredSocial === index ? 0.7 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.div
                        animate={{
                          rotate: hoveredSocial === index ? 12 : 0,
                          scale: hoveredSocial === index ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="relative z-10"
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                      <span className="text-sm font-medium relative z-10" style={{ fontFamily: "'Courier New', monospace" }}>{social.label}</span>

                      {/* Pin/tack effect on top */}
                      <div 
                        className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-700 rounded-full shadow-md z-20"
                      >
                        <div className="absolute inset-0.5 bg-amber-400 rounded-full" />
                      </div>

                      {/* Animated dots */}
                      {hoveredSocial === index && (
                        <>
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-amber-400 rounded-full"
                              initial={{ scale: 0, opacity: 1 }}
                              animate={{
                                scale: [0, 1.5, 0],
                                opacity: [1, 0.6, 0],
                                x: Math.cos((i * Math.PI) / 2) * 25,
                                y: Math.sin((i * Math.PI) / 2) * 25,
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>
                  </motion.a>
                );
              })}
            </div>

            {/* Tape pieces for collage effect */}
            <div 
              className="absolute top-[20%] right-[-12px] w-20 h-7 bg-amber-100/50 border border-amber-200/60 backdrop-blur-sm shadow-md z-30"
              style={{
                clipPath: "polygon(6% 0%, 94% 0%, 100% 10%, 100% 90%, 94% 100%, 6% 100%, 0% 90%, 0% 10%)",
                transform: 'rotate(88deg)',
              }}
            />
            <div 
              className="absolute bottom-[25%] left-[-10px] w-18 h-6 bg-amber-100/50 border border-amber-200/60 backdrop-blur-sm shadow-md z-30"
              style={{
                clipPath: "polygon(6% 0%, 94% 0%, 100% 10%, 100% 90%, 94% 100%, 6% 100%, 0% 90%, 0% 10%)",
                transform: 'rotate(-90deg)',
              }}
            />
          </div>
        </motion.div>

        {/* Footer text - handwritten note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-stone-500 text-sm mb-2 font-light" style={{ fontFamily: "'Kalam', cursive" }}>
            Designed & crafted with intention by Doris Fan
          </p>
          <p className="text-stone-400 text-xs font-light" style={{ fontFamily: "'Courier New', monospace" }}>
            © 2026 • Built with React, Tailwind, and Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}