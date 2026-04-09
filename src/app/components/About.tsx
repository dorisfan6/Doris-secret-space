import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Coffee, Headphones, Sparkles, Palette, Terminal, Globe, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const funFacts = [
  { icon: Coffee, text: "Powered by matcha", color: "text-amber-600" },
  { icon: Headphones, text: "K-pop lover", color: "text-stone-700" },
  { icon: Sparkles, text: "Night owl designer", color: "text-amber-700" },
  { icon: Heart, text: "Obsessed with sociology", color: "text-rose-600" },
];

const currentlyExploring = [
  "Vibe Coding",
  "AI Filmmaking",
  "Real-time multiplayer",
  "Cameras",
];

const tools = [
  { name: "Figma", level: 95 },
  { name: "DaVinci Resolve", level: 96 },
  { name: "Adobe", level: 92 },
  { name: "Canva", level: 90 },
];

const inspirations = [
  "Brutalist architecture",
  "Music Video",
  "Old video game UIs",
  "Sci-fi film interfaces",
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredFact, setHoveredFact] = useState<number | null>(null);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-32 px-8 bg-transparent overflow-hidden" style={{ position: 'relative' }}>
      {/* Depth of field background blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] -z-10" />
      
      {/* Subtle paper particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="text-stone-700 tracking-wider uppercase text-sm bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full border border-stone-300/50 shadow-sm inline-block" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}>About Me</span>
          <h2 className="text-5xl md:text-6xl text-stone-900 mt-6 mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
            Crafting at the intersection of{" "}
            <span className="text-amber-800">art & technology</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Image and bio with collage feel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Image panel - polaroid style with irregular edges */}
            <div className="relative group" style={{ transform: 'rotate(-1.2deg)' }}>
              <motion.div
                className="absolute -inset-3 bg-amber-200/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              />
              <div 
                className="relative overflow-hidden bg-white border border-stone-300/60 shadow-[3px_5px_12px_rgba(0,0,0,0.15),1px_2px_4px_rgba(0,0,0,0.1)]"
                style={{
                  clipPath: "polygon(0.5% 1.2%, 2.3% 0.3%, 5.1% 0.8%, 8.2% 0.2%, 12.4% 0.6%, 16.8% 0.1%, 21.2% 0.5%, 25.9% 0.2%, 30.5% 0.7%, 35.1% 0.3%, 40.3% 0.6%, 45.7% 0.2%, 50.8% 0.5%, 55.4% 0.3%, 60.2% 0.7%, 65.6% 0.2%, 70.1% 0.5%, 75.3% 0.3%, 80.8% 0.6%, 85.2% 0.2%, 90.5% 0.5%, 94.8% 0.3%, 98.2% 0.7%, 99.5% 2.1%, 99.8% 5.8%, 99.4% 10.2%, 99.7% 15.4%, 99.3% 20.8%, 99.8% 25.6%, 99.2% 31.2%, 99.6% 36.9%, 99.3% 42.5%, 99.7% 48.2%, 99.4% 53.8%, 99.8% 59.3%, 99.3% 65.1%, 99.7% 70.5%, 99.2% 76.2%, 99.6% 81.8%, 99.3% 87.4%, 99.7% 92.8%, 99.4% 96.5%, 98.8% 98.9%, 95.2% 99.6%, 90.8% 99.3%, 85.5% 99.7%, 80.2% 99.2%, 75.6% 99.6%, 70.1% 99.3%, 65.4% 99.7%, 60.8% 99.2%, 55.3% 99.6%, 50.2% 99.3%, 45.6% 99.7%, 40.5% 99.2%, 35.8% 99.6%, 30.4% 99.3%, 25.1% 99.7%, 20.3% 99.2%, 15.6% 99.6%, 10.8% 99.3%, 6.2% 99.7%, 2.8% 99.2%, 0.8% 97.5%, 0.3% 93.2%, 0.7% 88.6%, 0.2% 83.4%, 0.6% 78.1%, 0.3% 72.8%, 0.7% 67.2%, 0.2% 61.5%, 0.6% 55.9%, 0.3% 50.4%, 0.7% 44.8%, 0.2% 39.1%, 0.6% 33.5%, 0.3% 27.9%, 0.7% 22.4%, 0.2% 16.8%, 0.6% 11.2%, 0.3% 5.8%, 0.7% 2.5%)",
                }}>
                {/* Paper texture */}
                <div 
                  className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="p-6"
                >
                  <ImageWithFallback
                    src="https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/01.PNG"
                    alt="Creative workspace"
                    className="w-full h-[480px] object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-stone-50/5" />
                
                {/* Tape corner */}
                <div 
                  className="absolute top-8 right-8 w-20 h-7 bg-amber-50/70 border border-amber-200/30 backdrop-blur-[2px] shadow-[1px_2px_6px_rgba(0,0,0,0.12)] z-20 rotate-[88deg]"
                  style={{
                    clipPath: "polygon(4% 2%, 8% 0%, 15% 1%, 23% 0%, 31% 1%, 38% 0%, 46% 1%, 54% 0%, 62% 1%, 69% 0%, 77% 1%, 85% 0%, 92% 1%, 96% 2%, 98% 8%, 99% 15%, 98% 23%, 99% 31%, 98% 38%, 99% 46%, 98% 54%, 99% 62%, 98% 69%, 99% 77%, 98% 85%, 99% 92%, 98% 96%, 96% 98%, 92% 99%, 85% 98%, 77% 99%, 69% 98%, 62% 99%, 54% 98%, 46% 99%, 38% 98%, 31% 99%, 23% 98%, 15% 99%, 8% 98%, 4% 96%, 2% 92%, 1% 85%, 2% 77%, 1% 69%, 2% 62%, 1% 54%, 2% 46%, 1% 38%, 2% 31%, 1% 23%, 2% 15%, 1% 8%)",
                  }}
                />
              </div>
            </div>

            {/* Bio text panel - torn paper style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 bg-white/95 p-8 border-l-4 border-l-stone-200 border-r border-t border-b border-stone-200/60 shadow-[2px_4px_10px_rgba(0,0,0,0.12),0px_1px_3px_rgba(0,0,0,0.08)]"
              style={{
                clipPath: "polygon(0% 2.5%, 1.2% 1.3%, 2.8% 2%, 4.5% 0.8%, 6.3% 1.8%, 8.2% 0.5%, 10.5% 1.5%, 12.8% 0.7%, 15.2% 1.6%, 17.8% 0.9%, 20.4% 1.7%, 23.1% 0.6%, 25.9% 1.4%, 28.7% 0.8%, 31.6% 1.5%, 34.5% 0.7%, 37.5% 1.6%, 40.6% 0.9%, 43.8% 1.7%, 47% 0.6%, 50.3% 1.4%, 53.6% 0.8%, 57% 1.5%, 60.4% 0.7%, 63.9% 1.6%, 67.5% 0.9%, 71.1% 1.7%, 74.8% 0.6%, 78.5% 1.4%, 82.3% 0.8%, 86.1% 1.5%, 90% 0.7%, 93.9% 1.6%, 97.2% 1.2%, 99% 2.8%, 99.6% 5.5%, 99.2% 8.8%, 99.7% 12.4%, 99.3% 16.2%, 99.8% 20.1%, 99.4% 24.3%, 99.8% 28.6%, 99.3% 33%, 99.7% 37.5%, 99.4% 42.1%, 99.8% 46.8%, 99.3% 51.6%, 99.7% 56.4%, 99.4% 61.3%, 99.8% 66.2%, 99.3% 71.2%, 99.7% 76.3%, 99.4% 81.4%, 99.8% 86.5%, 99.3% 91.2%, 99.6% 94.8%, 98.8% 97.3%, 97.2% 98.7%, 94.5% 99.3%, 91.2% 98.9%, 87.6% 99.4%, 83.8% 98.8%, 79.9% 99.5%, 76% 99%, 72% 99.6%, 68% 99.2%, 64% 99.7%, 60% 99.3%, 56% 99.8%, 52% 99.4%, 48% 99.8%, 44% 99.3%, 40% 99.7%, 36% 99.4%, 32% 99.8%, 28% 99.3%, 24% 99.7%, 20% 99.4%, 16% 99.8%, 12.5% 99.3%, 9% 99.6%, 5.8% 99.2%, 3% 98.5%, 1.2% 97%, 0.4% 94.5%, 0.8% 91%, 0.3% 87%, 0.7% 83%, 0.2% 79%, 0.6% 75%, 0.3% 71%, 0.7% 67%, 0.2% 63%, 0.6% 59%, 0.3% 55%, 0.7% 51%, 0.2% 47%, 0.6% 43%, 0.3% 39%, 0.7% 35%, 0.2% 31%, 0.6% 27%, 0.3% 23%, 0.7% 19%, 0.2% 15%, 0.6% 11%, 0.3% 7%)",
                transform: 'rotate(0.8deg)',
              }}
            >
              {/* Torn top edge with more organic feel */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 bg-white/95 z-10"
                style={{
                  clipPath: "polygon(0% 100%, 1.5% 35%, 3% 68%, 4.8% 42%, 6.5% 75%, 8.3% 38%, 10.2% 82%, 12.1% 45%, 14.2% 71%, 16.3% 52%, 18.5% 78%, 20.8% 41%, 23.2% 69%, 25.6% 48%, 28.1% 76%, 30.7% 39%, 33.4% 72%, 36.2% 44%, 39% 79%, 41.9% 35%, 44.9% 68%, 48% 51%, 51.2% 74%, 54.4% 42%, 57.7% 71%, 61.1% 47%, 64.5% 78%, 68% 38%, 71.6% 73%, 75.2% 49%, 78.9% 76%, 82.6% 43%, 86.4% 70%, 90.2% 46%, 94.1% 77%, 97.5% 52%, 100% 75%, 100% 0%, 0% 0%)",
                }}
              />
              
              <p className="text-stone-700 text-lg leading-relaxed mb-4 font-light" style={{ fontFamily: "'Kalam', cursive" }}>
                Creative Digital Media Specialist with a focus on <span className="text-amber-800 font-normal">video production</span>, <span className="text-amber-800 font-normal">social media strategy</span>, and <span className="text-amber-800 font-normal">data-driven content creation</span>. Currently advancing my skills in USC's M.S. in Digital Social Media program, I bring a strong foundation in producing and editing high-quality video content that captivates audiences.
              </p>
              <p className="text-stone-600 text-lg leading-relaxed font-light" style={{ fontFamily: "'Kalam', cursive" }}>
                I specialize in crafting strategic social media content that maximizes engagement, using in-depth audience analysis to guide content decisions and optimize digital storytelling for diverse platforms. My approach to digital campaigns is rooted in data insights, ensuring each piece connects with viewers while driving measurable impact.
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Stacked clippings with varied shapes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Fun facts - irregular clipping */}
            <div 
              className="relative bg-white/98 p-8 border-t-2 border-stone-300/70 border-l border-r border-b border-stone-200/50 shadow-[3px_4px_14px_rgba(0,0,0,0.12),1px_2px_5px_rgba(0,0,0,0.08)]"
              style={{
                clipPath: "polygon(0.8% 1.5%, 2.5% 0.4%, 5.3% 1.2%, 8.7% 0.3%, 12.6% 0.9%, 16.8% 0.5%, 21.3% 1.1%, 25.9% 0.4%, 30.7% 0.8%, 35.8% 0.6%, 41.2% 1.3%, 46.5% 0.5%, 52.1% 0.9%, 57.8% 0.4%, 63.5% 1%, 69.3% 0.6%, 75.2% 1.2%, 81.1% 0.5%, 87% 0.8%, 92.8% 0.6%, 97.5% 1.4%, 99.3% 3.2%, 99.7% 7.1%, 99.4% 11.8%, 99.8% 16.5%, 99.3% 21.7%, 99.7% 27.2%, 99.4% 32.9%, 99.8% 38.7%, 99.3% 44.6%, 99.7% 50.5%, 99.4% 56.4%, 99.8% 62.3%, 99.3% 68.3%, 99.7% 74.3%, 99.4% 80.4%, 99.8% 86.5%, 99.3% 92.1%, 98.7% 96.3%, 96.8% 98.8%, 93.2% 99.5%, 88.6% 99.2%, 83.5% 99.6%, 78.2% 99.3%, 72.7% 99.7%, 67.1% 99.4%, 61.4% 99.8%, 55.6% 99.3%, 49.8% 99.7%, 44% 99.4%, 38.1% 99.8%, 32.3% 99.3%, 26.4% 99.7%, 20.6% 99.4%, 14.9% 99.8%, 9.4% 99.3%, 5.2% 99.6%, 2.1% 98.9%, 0.6% 96.2%, 0.3% 92.5%, 0.7% 87.8%, 0.2% 82.4%, 0.6% 76.6%, 0.3% 70.5%, 0.7% 64.2%, 0.2% 57.8%, 0.6% 51.3%, 0.3% 44.7%, 0.7% 38.1%, 0.2% 31.5%, 0.6% 25%, 0.3% 18.6%, 0.7% 12.4%, 0.2% 6.8%)",
                transform: 'rotate(-0.6deg)',
              }}
            >
              <h3 className="text-2xl text-stone-900 mb-6 flex items-center gap-2" style={{ fontFamily: "'Caveat', cursive" }}>
                <Sparkles className="text-amber-600" />
                Fun Facts
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {funFacts.map((fact, index) => {
                  const Icon = fact.icon;
                  return (
                    <motion.div
                      key={index}
                      data-cursor="hover"
                      onHoverStart={() => setHoveredFact(index)}
                      onHoverEnd={() => setHoveredFact(null)}
                      whileHover={{ scale: 1.05, y: -3, rotate: index % 2 === 0 ? 2 : -2 }}
                      className="bg-amber-50/60 p-4 border border-amber-200/60 cursor-pointer relative overflow-hidden shadow-[1px_2px_4px_rgba(0,0,0,0.08)]"
                      style={{
                        clipPath: "polygon(2.5% 0.8%, 5.8% 0.3%, 10.4% 0.7%, 15.3% 0.4%, 20.8% 0.9%, 26.5% 0.5%, 32.4% 1%, 38.5% 0.6%, 44.7% 1.2%, 51% 0.5%, 57.4% 0.9%, 63.8% 0.6%, 70.3% 1.1%, 76.8% 0.7%, 83.4% 1.3%, 89.9% 0.8%, 95.5% 1.4%, 98.6% 3.1%, 99.5% 6.8%, 99.2% 11.5%, 99.7% 16.9%, 99.3% 22.8%, 99.8% 29.1%, 99.4% 35.7%, 99.9% 42.4%, 99.5% 49.2%, 99.8% 56.1%, 99.4% 63%, 99.9% 69.9%, 99.5% 76.8%, 99.8% 83.6%, 99.3% 90.2%, 98.5% 95.4%, 96.2% 98.3%, 92.1% 99.4%, 87% 99.1%, 81.3% 99.6%, 75.2% 99.3%, 68.9% 99.8%, 62.4% 99.4%, 55.8% 99.9%, 49.1% 99.5%, 42.4% 99.8%, 35.7% 99.4%, 29.1% 99.9%, 22.6% 99.5%, 16.3% 99.8%, 10.3% 99.3%, 5.2% 99.6%, 1.8% 98.7%, 0.5% 95.8%, 0.2% 91.4%, 0.6% 86.2%, 0.3% 80.5%, 0.8% 74.4%, 0.4% 68%, 0.9% 61.4%, 0.5% 54.6%, 1% 47.7%, 0.6% 40.8%, 1.1% 33.9%, 0.7% 27.1%, 1.2% 20.4%, 0.8% 13.9%, 1.3% 7.7%)",
                        transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-amber-100"
                        animate={{ opacity: hoveredFact === index ? 0.6 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Icon className={`${fact.color} w-6 h-6 mb-2 relative z-10`} />
                      <p className="text-sm text-stone-700 relative z-10 font-light" style={{ fontFamily: "'Kalam', cursive" }}>{fact.text}</p>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Tape accent */}
              <div 
                className="absolute bottom-10 right-[-10px] w-16 h-6 bg-amber-50/70 border border-amber-200/30 backdrop-blur-[2px] shadow-[1px_2px_4px_rgba(0,0,0,0.1)] z-20"
                style={{
                  clipPath: "polygon(3% 1%, 7% 0%, 13% 1%, 19% 0%, 26% 1%, 33% 0%, 40% 1%, 47% 0%, 54% 1%, 61% 0%, 68% 1%, 75% 0%, 82% 1%, 89% 0%, 95% 1%, 98% 4%, 99% 10%, 98% 17%, 99% 24%, 98% 31%, 99% 38%, 98% 45%, 99% 52%, 98% 59%, 99% 66%, 98% 73%, 99% 80%, 98% 87%, 99% 93%, 97% 97%, 93% 99%, 87% 98%, 81% 99%, 75% 98%, 69% 99%, 63% 98%, 57% 99%, 51% 98%, 45% 99%, 39% 98%, 33% 99%, 27% 98%, 21% 99%, 15% 98%, 9% 99%, 4% 97%, 1% 93%, 2% 86%, 1% 79%, 2% 72%, 1% 65%, 2% 58%, 1% 51%, 2% 44%, 1% 37%, 2% 30%, 1% 23%, 2% 16%, 1% 9%)",
                  transform: 'rotate(-90deg)',
                }}
              />
            </div>

            {/* Currently exploring - note card style */}
            <div 
              className="relative bg-amber-50/80 p-8 border-l-3 border-l-amber-300/70 border-t border-r border-b border-amber-200/50 shadow-[2px_5px_12px_rgba(217,119,6,0.18),1px_2px_4px_rgba(0,0,0,0.08)]"
              style={{
                clipPath: "polygon(1.2% 0.9%, 3.8% 0.4%, 7.5% 1.1%, 11.9% 0.6%, 16.8% 1.3%, 22% 0.7%, 27.5% 1.5%, 33.2% 0.8%, 39.1% 1.8%, 45.2% 0.9%, 51.4% 1.6%, 57.7% 1%, 64.1% 1.9%, 70.5% 1.2%, 77% 2.1%, 83.5% 1.4%, 89.9% 2.3%, 95.8% 1.8%, 98.9% 3.5%, 99.6% 7.3%, 99.3% 12%, 99.8% 17.4%, 99.4% 23.2%, 99.9% 29.3%, 99.5% 35.6%, 99.9% 42%, 99.5% 48.5%, 99.9% 55.1%, 99.5% 61.7%, 99.9% 68.3%, 99.5% 74.9%, 99.9% 81.5%, 99.5% 88%, 99.9% 94.2%, 98.8% 98.4%, 95.6% 99.6%, 91.2% 99.3%, 86.1% 99.7%, 80.6% 99.4%, 74.8% 99.8%, 68.8% 99.4%, 62.6% 99.9%, 56.3% 99.5%, 50% 99.8%, 43.6% 99.4%, 37.2% 99.9%, 30.8% 99.5%, 24.5% 99.8%, 18.3% 99.4%, 12.4% 99.7%, 6.8% 99.3%, 2.9% 99.5%, 1% 97.8%, 0.4% 94.2%, 0.8% 89.4%, 0.3% 83.9%, 0.7% 77.9%, 0.2% 71.5%, 0.6% 64.9%, 0.3% 58.1%, 0.7% 51.2%, 0.2% 44.2%, 0.6% 37.2%, 0.3% 30.2%, 0.7% 23.3%, 0.2% 16.6%, 0.6% 10.2%, 0.3% 4.5%)",
                transform: 'rotate(1.2deg)',
              }}
            >
              <h3 className="text-2xl text-stone-900 mb-6 flex items-center gap-2" style={{ fontFamily: "'Caveat', cursive" }}>
                <Terminal className="text-stone-700" />
                Currently Exploring
              </h3>
              <div className="space-y-3">
                {currentlyExploring.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 group cursor-pointer"
                    data-cursor="hover"
                  >
                    <motion.div
                      className="w-2 h-2 bg-amber-700 rounded-full"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-stone-700 group-hover:text-amber-800 transition-colors font-light" style={{ fontFamily: "'Kalam', cursive" }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools - compact clipping */}
            <div 
              className="relative bg-white/98 p-8 border border-stone-300/60 shadow-[2px_4px_12px_rgba(0,0,0,0.14),4px_6px_18px_rgba(245,158,11,0.08),1px_1px_3px_rgba(0,0,0,0.1)]"
              style={{
                clipPath: "polygon(0.6% 2.1%, 2.4% 0.8%, 5.6% 1.6%, 9.3% 0.9%, 13.5% 1.8%, 18.1% 1.1%, 23% 2.1%, 28.2% 1.4%, 33.6% 2.3%, 39.2% 1.6%, 45% 2.5%, 50.9% 1.8%, 56.9% 2.7%, 63% 2%, 69.2% 2.9%, 75.4% 2.2%, 81.6% 3.1%, 87.8% 2.5%, 93.7% 3.3%, 97.9% 4.2%, 99.4% 7.9%, 99.1% 12.7%, 99.6% 18.1%, 99.2% 23.9%, 99.7% 30%, 99.3% 36.3%, 99.8% 42.8%, 99.4% 49.4%, 99.9% 56.1%, 99.5% 62.8%, 99.9% 69.5%, 99.5% 76.2%, 99.9% 82.8%, 99.5% 89.3%, 99.8% 94.9%, 98.6% 98.3%, 95.7% 99.4%, 91.6% 99.1%, 86.8% 99.6%, 81.5% 99.2%, 75.9% 99.7%, 70% 99.3%, 63.9% 99.8%, 57.7% 99.4%, 51.4% 99.9%, 45.1% 99.5%, 38.7% 99.8%, 32.4% 99.4%, 26.2% 99.9%, 20.1% 99.5%, 14.3% 99.8%, 8.8% 99.3%, 4.2% 99.6%, 1.5% 98.4%, 0.5% 95.1%, 0.2% 90.6%, 0.6% 85.3%, 0.3% 79.4%, 0.7% 73.1%, 0.2% 66.5%, 0.6% 59.7%, 0.3% 52.8%, 0.7% 45.8%, 0.2% 38.8%, 0.6% 31.8%, 0.3% 24.9%, 0.7% 18.2%, 0.2% 11.8%, 0.6% 6%)",
                transform: 'rotate(-0.8deg)',
              }}
            >
              <h3 className="text-2xl text-stone-900 mb-6 flex items-center gap-2" style={{ fontFamily: "'Caveat', cursive" }}>
                <Palette className="text-rose-600" />
                Tools I Love
              </h3>
              <div className="space-y-4">
                {tools.map((tool, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-stone-700 font-light" style={{ fontFamily: "'Kalam', cursive" }}>{tool.name}</span>
                      <motion.span
                        className="text-amber-700 font-medium text-sm"
                        style={{ fontFamily: "'Courier New', monospace" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredTool === index ? 1 : 0 }}
                      >
                        {tool.level}%
                      </motion.span>
                    </div>
                    <div
                      className="h-2 bg-stone-100 overflow-hidden border border-stone-300/60"
                      style={{
                        clipPath: "polygon(0.5% 10%, 1.8% 5%, 4.2% 8%, 7.5% 4%, 11.3% 7%, 15.5% 5%, 20.1% 9%, 25% 6%, 30.2% 8%, 35.7% 5%, 41.4% 9%, 47.3% 6%, 53.4% 8%, 59.6% 5%, 65.9% 9%, 72.3% 6%, 78.7% 8%, 85.2% 5%, 91.6% 9%, 97.2% 7%, 99.5% 15%, 99.2% 25%, 99.6% 35%, 99.3% 45%, 99.7% 55%, 99.4% 65%, 99.8% 75%, 99.5% 85%, 99.2% 92%, 97.8% 96%, 94.5% 98%, 89.7% 96%, 84.3% 98%, 78.5% 96%, 72.4% 98%, 66.1% 96%, 59.7% 98%, 53.3% 96%, 46.8% 98%, 40.4% 96%, 34.1% 98%, 27.9% 96%, 21.9% 98%, 16.2% 96%, 10.9% 98%, 6.2% 96%, 2.5% 93%, 0.8% 87%, 0.3% 78%, 0.7% 68%, 0.2% 58%, 0.6% 48%, 0.3% 38%, 0.7% 28%, 0.2% 18%)",
                      }}
                      onMouseEnter={() => setHoveredTool(index)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-700 shadow-sm"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tool.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                        whileHover={{ opacity: 0.9 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspirations - tag board style */}
            <div 
              className="relative bg-white/98 p-8 border-t-2 border-stone-300/70 border-l border-r border-b border-stone-200/50 shadow-[3px_4px_11px_rgba(0,0,0,0.13),1px_2px_4px_rgba(0,0,0,0.09)]"
              style={{
                clipPath: "polygon(1.5% 0.7%, 4.2% 0.3%, 8.1% 0.9%, 12.6% 0.5%, 17.6% 1.2%, 23% 0.6%, 28.7% 1.4%, 34.7% 0.8%, 40.9% 1.6%, 47.3% 0.9%, 53.8% 1.7%, 60.4% 1.1%, 67.1% 1.9%, 73.9% 1.3%, 80.6% 2.1%, 87.3% 1.5%, 93.6% 2.3%, 98.2% 3.4%, 99.5% 6.8%, 99.2% 11.3%, 99.7% 16.6%, 99.3% 22.3%, 99.8% 28.4%, 99.4% 34.7%, 99.9% 41.2%, 99.5% 47.8%, 99.9% 54.5%, 99.5% 61.2%, 99.9% 67.9%, 99.5% 74.6%, 99.9% 81.3%, 99.5% 87.9%, 99.8% 93.8%, 98.5% 97.8%, 95.3% 99.3%, 90.8% 99%, 85.6% 99.5%, 80% 99.2%, 74.1% 99.6%, 68% 99.3%, 61.7% 99.8%, 55.3% 99.4%, 48.9% 99.9%, 42.4% 99.5%, 36% 99.8%, 29.6% 99.4%, 23.3% 99.9%, 17.2% 99.5%, 11.4% 99.8%, 6.2% 99.3%, 2.3% 98.9%, 0.8% 96.5%, 0.4% 92.8%, 0.8% 88.1%, 0.3% 82.7%, 0.7% 76.8%, 0.2% 70.5%, 0.6% 63.9%, 0.3% 57.1%, 0.7% 50.2%, 0.2% 43.3%, 0.6% 36.3%, 0.3% 29.4%, 0.7% 22.6%, 0.2% 16%, 0.6% 9.8%, 0.3% 4.2%)",
                transform: 'rotate(0.5deg)',
              }}
            >
              <h3 className="text-2xl text-stone-900 mb-6 flex items-center gap-2" style={{ fontFamily: "'Caveat', cursive" }}>
                <Globe className="text-stone-600" />
                Inspirations
              </h3>
              <div className="flex flex-wrap gap-3">
                {inspirations.map((inspiration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.08, rotate: index % 2 === 0 ? 3 : -3, y: -2 }}
                    data-cursor="hover"
                    className="bg-amber-100/80 px-4 py-2 border border-amber-300/70 text-stone-700 text-sm cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.08)] font-light"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      clipPath: "polygon(5% 0%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0% 90%, 0% 10%)",
                      transform: `rotate(${(index % 3 - 1) * 1.5}deg)`,
                    }}
                  >
                    {inspiration}
                  </motion.div>
                ))}
              </div>

              {/* Corner tape */}
              <div 
                className="absolute top-8 left-[-8px] w-18 h-6 bg-amber-100/50 border border-amber-200/60 backdrop-blur-sm shadow-sm z-20"
                style={{
                  clipPath: "polygon(6% 0%, 94% 0%, 100% 10%, 100% 90%, 94% 100%, 6% 100%, 0% 90%, 0% 10%)",
                  transform: 'rotate(-88deg)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}