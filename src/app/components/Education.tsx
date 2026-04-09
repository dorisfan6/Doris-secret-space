import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface EducationItem {
  id: number;
  type: 'undergraduate' | 'summer' | 'graduate';
  degree: string;
  school: string;
  year: string;
  yearStart: number;
  yearEnd: number;
  highlight: string;
  field: string;
  achievements: string[];
  color: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    type: 'undergraduate',
    degree: "Bachelor of Arts / Bachelor of Science",
    school: "Tulane University",
    year: "2019-2023",
    yearStart: 2019,
    yearEnd: 2023,
    highlight: "Merit Scholarship",
    field: "Communication / Finance",
    achievements: [
      "Made to Dean's List",
      "Dual Degree holder",
      "Merit Scholarship for 4 years",
    ],
    color: "#d97706"
  },
  {
    id: 2,
    type: 'summer',
    degree: "Summer Exchange",
    school: "Yonsei University",
    year: "Summer 2023",
    yearStart: 2023,
    yearEnd: 2023,
    highlight: "Documentary Filmmaking",
    field: "Korea Cinema and pop culture",
    achievements: [
      "6-week intensive documentary program",
    ],
    color: "#ea580c"
  },
  {
    id: 3,
    type: 'graduate',
    degree: "Master of Science",
    school: "University of Southern California",
    year: "2024-2026",
    yearStart: 2024,
    yearEnd: 2026,
    highlight: "GSG Empowerment Award",
    field: "Digital Social Media",
    achievements: [
      "Specialized in Digital Media & Interactive Narratives",
      "Earned GSG Empowerment Award",
      "Joined NCAA Big Ten Internship",
      "Improving skills in SCA and Annenberg",
    ],
    color: "#c2410c"
  },
];

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  const selectedItem = educationData.find(item => item.id === selectedId);

  // Parallax for floating elements
  const floatX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const floatY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative min-h-screen py-32 px-8 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ x: floatX, y: floatY }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Depth of field background blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] -z-10" />

      <div className="relative min-h-screen">
        <motion.div
          className="max-w-[95vw] mx-auto"
          style={{ opacity, y }}
        >
          {/* Section Header with Discovery */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-7xl md:text-8xl text-stone-900 mb-6 relative inline-block"
              style={{ fontFamily: "'Caveat', cursive" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Educational Journey
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </motion.h2>
            <motion.p
              className="text-2xl text-stone-600 mt-8"
              style={{ fontFamily: "'Kalam', cursive" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              Three frames from the archive • Drag to explore
            </motion.p>

            {/* Timeline visualization */}
            <motion.div
              className="mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.7 }}
            >
              <div className="relative h-2 bg-stone-300 rounded-full overflow-hidden">
                {educationData.map((item, index) => {
                  const startPercent = ((item.yearStart - 2018) / (2024 - 2018)) * 100;
                  const widthPercent = ((item.yearEnd - item.yearStart + 1) / (2024 - 2018)) * 100;
                  
                  return (
                    <motion.div
                      key={item.id}
                      className="absolute top-0 h-full"
                      style={{
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`,
                        backgroundColor: item.color,
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scaleY: 1.5 }}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      data-cursor="hover"
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs text-stone-500 font-mono">
                <span>2018</span>
                <span>2020</span>
                <span>2022</span>
                <span>2024</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Film Strip - Draggable */}
          <div className="relative overflow-visible pb-20">
            <motion.div
              ref={filmStripRef}
              className="relative"
              drag="x"
              dragConstraints={{ left: -600, right: 600 }}
              dragElastic={0.15}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 20, power: 0.3 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              whileTap={{ cursor: "grabbing" }}
              style={{ x: -200 }} // Start slightly offset
            >
              {/* Film Strip Container */}
              <div className="relative inline-flex items-center justify-center gap-8 px-20">
                {/* Continuous film strip elements */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-3 bg-black opacity-40"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, #000 20px, #000 25px)',
                  }}
                  animate={{ x: isDragging ? [0, -25] : 0 }}
                  transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0, ease: "linear" }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-3 bg-black opacity-40"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, #000 20px, #000 25px)',
                  }}
                  animate={{ x: isDragging ? [0, -25] : 0 }}
                  transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0, ease: "linear" }}
                />

                {educationData.map((item, index) => {
                  const isSelected = selectedId === item.id;
                  const isHovered = hoveredId === item.id;
                  const isActive = isSelected || isHovered;
                  const isSummer = item.type === 'summer';

                  return (
                    <motion.div
                      key={item.id}
                      className="relative group"
                      onMouseEnter={() => !isDragging && setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => !isDragging && setSelectedId(isSelected ? null : item.id)}
                      data-cursor="hover"
                      initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                      whileHover={{ 
                        y: -20, 
                        rotateZ: index === 1 ? 3 : -2,
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                      }}
                      animate={{
                        z: isActive ? 50 : 0,
                        scale: isActive ? 1.08 : 1,
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: 1000,
                      }}
                    >
                      {/* Film Frame */}
                      <div
                        className={`relative ${isSummer ? 'w-[320px] h-[480px]' : 'w-[380px] h-[520px]'} overflow-hidden rounded-lg shadow-2xl`}
                        style={{
                          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                          boxShadow: isActive 
                            ? `0 30px 60px rgba(0,0,0,0.5), 0 0 60px ${item.color}40, inset 0 0 80px ${item.color}20` 
                            : '0 20px 40px rgba(0,0,0,0.4)',
                        }}
                      >
                        {/* Sprocket holes */}
                        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-around px-4 bg-black/50">
                          {Array.from({ length: isSummer ? 11 : 13 }).map((_, i) => (
                            <motion.div
                              key={`top-${i}`}
                              className="w-[6px] h-[6px] bg-stone-950 rounded-sm border border-stone-800"
                              animate={{
                                backgroundColor: isActive ? item.color : '#0c0a09',
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          ))}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-around px-4 bg-black/50">
                          {Array.from({ length: isSummer ? 11 : 13 }).map((_, i) => (
                            <motion.div
                              key={`bottom-${i}`}
                              className="w-[6px] h-[6px] bg-stone-950 rounded-sm border border-stone-800"
                              animate={{
                                backgroundColor: isActive ? item.color : '#0c0a09',
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          ))}
                        </div>

                        {/* Film grain overlay */}
                        <div 
                          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundSize: '180px 180px',
                          }}
                        />

                        {/* Animated light leak effect on hover */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                              background: `radial-gradient(circle at ${50 + index * 20}% ${30 + index * 10}%, ${item.color}40, transparent 50%)`,
                            }}
                          />
                        )}

                        {/* Frame metadata */}
                        <div className="absolute top-14 left-0 right-0 px-6 flex justify-between items-start">
                          <motion.div
                            className="text-[10px] font-mono tracking-wider"
                            animate={{
                              color: isActive ? item.color : '#78716c',
                            }}
                          >
                            FRAME {String(index + 1).padStart(2, '0')}
                          </motion.div>
                          <div className="text-[10px] font-mono text-stone-600">
                            35MM • {item.year.toUpperCase()}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative h-full px-8 py-20 flex flex-col justify-center items-center text-center">
                          {/* Floating year badge */}
                          <motion.div
                            className="mb-10"
                            animate={{
                              y: isActive ? [-5, 5, -5] : 0,
                            }}
                            transition={{
                              duration: 3,
                              repeat: isActive ? Infinity : 0,
                              ease: "easeInOut"
                            }}
                          >
                            <motion.div 
                              className="text-6xl font-light tracking-wider relative"
                              style={{ 
                                fontFamily: "'Caveat', cursive",
                                color: item.color,
                                textShadow: `0 0 30px ${item.color}80, 0 4px 12px rgba(0,0,0,0.8)`,
                              }}
                              animate={{
                                textShadow: isActive 
                                  ? `0 0 40px ${item.color}, 0 4px 12px rgba(0,0,0,0.8)` 
                                  : `0 0 20px ${item.color}80, 0 4px 12px rgba(0,0,0,0.8)`,
                              }}
                            >
                              {item.yearStart}
                              {/* Rotating connector for multi-year */}
                              {item.yearStart !== item.yearEnd && (
                                <motion.span
                                  className="inline-block mx-2 text-4xl"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                  ⟳
                                </motion.span>
                              )}
                              {item.yearStart !== item.yearEnd && item.yearEnd}
                            </motion.div>
                          </motion.div>

                          {/* School name with reveal effect */}
                          <motion.div className="mb-6 overflow-hidden">
                            <motion.h3
                              className={`${isSummer ? 'text-3xl' : 'text-4xl'} text-stone-100 leading-tight font-medium`}
                              style={{ fontFamily: "'Caveat', cursive" }}
                              animate={{
                                color: isActive ? '#fafaf9' : '#e7e5e4',
                                scale: isActive ? 1.05 : 1,
                              }}
                            >
                              {item.school}
                            </motion.h3>
                          </motion.div>

                          {/* Degree */}
                          <div
                            className={`${isSummer ? 'text-base' : 'text-lg'} text-stone-400 mb-3`}
                            style={{ fontFamily: "'Kalam', cursive" }}
                          >
                            {item.degree}
                          </div>

                          {/* Field badge */}
                          <motion.div
                            className="px-5 py-2 rounded-full border-2 mb-8"
                            style={{
                              borderColor: isActive ? item.color : '#57534e',
                              backgroundColor: isActive ? `${item.color}15` : 'transparent',
                            }}
                            animate={{
                              scale: isActive ? [1, 1.05, 1] : 1,
                            }}
                            transition={{
                              duration: 2,
                              repeat: isActive ? Infinity : 0,
                            }}
                          >
                            <div 
                              className="text-sm font-medium"
                              style={{ color: isActive ? item.color : '#a8a29e' }}
                            >
                              {item.field}
                            </div>
                          </motion.div>

                          {/* Highlight with animated glow */}
                          <motion.div
                            className="px-6 py-3 rounded-lg relative"
                            style={{
                              backgroundColor: `${item.color}20`,
                              border: `1px solid ${item.color}40`,
                            }}
                            animate={{
                              boxShadow: isActive 
                                ? `0 0 30px ${item.color}40, inset 0 0 20px ${item.color}20` 
                                : `0 0 10px ${item.color}20`,
                            }}
                          >
                            <div 
                              className="text-sm font-semibold"
                              style={{ color: item.color }}
                            >
                              {item.highlight}
                            </div>
                          </motion.div>

                          {/* Interaction hint */}
                          <motion.div
                            className="absolute bottom-16 left-0 right-0 text-center"
                            animate={{ 
                              opacity: isActive ? [0.5, 1, 0.5] : 0.3,
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          >
                            <div className="text-[10px] text-stone-600 uppercase tracking-widest">
                              {isSelected ? '✦ EXPANDED ✦' : 'Click to expand'}
                            </div>
                          </motion.div>
                        </div>

                        {/* Active glow border */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 border-2 pointer-events-none rounded-lg"
                            style={{ borderColor: item.color }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Shadow projection */}
                      <motion.div
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/40 rounded-full blur-xl"
                        animate={{
                          scale: isActive ? 1.3 : 1,
                          opacity: isActive ? 0.6 : 0.4,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Expanded Detail - Film Archive Style */}
          {selectedItem && (
            <motion.div
              className="mt-16 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              layoutId={`education-detail-${selectedItem.id}`}
            >
              {/* Film Archive Panel */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #000000 100%)',
                  boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 100px ${selectedItem.color}30`,
                }}
              >
                {/* Animated top accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${selectedItem.color}, transparent)`,
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Film sprocket holes on left */}
                <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center justify-around py-16 bg-black/60">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={`detail-sprocket-${i}`}
                      className="w-[7px] h-[6px] rounded-sm border"
                      style={{
                        backgroundColor: '#0a0a0a',
                        borderColor: selectedItem.color,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="pl-20 pr-12 py-12">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex-1">
                      {/* Frame metadata */}
                      <motion.div
                        className="text-xs font-mono tracking-widest mb-6"
                        style={{ color: selectedItem.color }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        ▸ FRAME {String(educationData.findIndex(item => item.id === selectedItem.id) + 1).padStart(2, '0')} • ARCHIVE EXPANDED
                      </motion.div>

                      {/* Year - Large and dramatic */}
                      <motion.div
                        className="flex items-baseline gap-6 mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <div 
                          className="text-8xl font-light"
                          style={{ 
                            fontFamily: "'Caveat', cursive",
                            color: selectedItem.color,
                            textShadow: `0 0 50px ${selectedItem.color}, 0 5px 20px rgba(0,0,0,0.8)`,
                          }}
                        >
                          {selectedItem.yearStart}
                        </div>
                        {selectedItem.yearStart !== selectedItem.yearEnd && (
                          <>
                            <motion.div
                              className="text-4xl text-stone-600"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              →
                            </motion.div>
                            <div 
                              className="text-8xl font-light"
                              style={{ 
                                fontFamily: "'Caveat', cursive",
                                color: selectedItem.color,
                                textShadow: `0 0 50px ${selectedItem.color}, 0 5px 20px rgba(0,0,0,0.8)`,
                              }}
                            >
                              {selectedItem.yearEnd}
                            </div>
                          </>
                        )}
                      </motion.div>

                      {/* School info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3
                          className="text-5xl text-stone-100 mb-3 leading-tight"
                          style={{ fontFamily: "'Caveat', cursive" }}
                        >
                          {selectedItem.school}
                        </h3>
                        <p
                          className="text-2xl text-stone-400 mb-4"
                          style={{ fontFamily: "'Kalam', cursive" }}
                        >
                          {selectedItem.degree}
                        </p>
                        <div className="flex gap-3 items-center flex-wrap">
                          <div
                            className="inline-block px-5 py-2 rounded-full border-2"
                            style={{
                              borderColor: selectedItem.color,
                              backgroundColor: `${selectedItem.color}15`,
                            }}
                          >
                            <span 
                              className="text-base font-medium"
                              style={{ color: selectedItem.color }}
                            >
                              {selectedItem.field}
                            </span>
                          </div>
                          <div
                            className="inline-block px-5 py-2 rounded-full"
                            style={{
                              backgroundColor: `${selectedItem.color}20`,
                              border: `1px solid ${selectedItem.color}40`,
                            }}
                          >
                            <span 
                              className="text-sm font-semibold"
                              style={{ color: selectedItem.color }}
                            >
                              {selectedItem.highlight}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Close button - cinematic style */}
                    <motion.button
                      onClick={() => setSelectedId(null)}
                      className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden group"
                      style={{
                        backgroundColor: '#1a1a1a',
                        border: `2px solid ${selectedItem.color}40`,
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: selectedItem.color + '20',
                        borderColor: selectedItem.color,
                      }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="hover"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span 
                        className="text-2xl font-light"
                        style={{ color: selectedItem.color }}
                      >
                        ×
                      </span>
                    </motion.button>
                  </div>

                  {/* Achievements Timeline */}
                  <motion.div
                    className="border-t pt-10"
                    style={{ borderColor: `${selectedItem.color}30` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div 
                      className="text-xs uppercase tracking-widest mb-8 font-mono"
                      style={{ color: selectedItem.color }}
                    >
                      ▸ Archive Details & Achievements
                    </div>
                    <ul className="space-y-5">
                      {selectedItem.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-6 group/item"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          whileHover={{ x: 10 }}
                        >
                          {/* Timeline dot */}
                          <motion.div
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold mt-1"
                            style={{
                              backgroundColor: `${selectedItem.color}20`,
                              border: `2px solid ${selectedItem.color}60`,
                              color: selectedItem.color,
                            }}
                            whileHover={{
                              backgroundColor: selectedItem.color,
                              color: '#000',
                              scale: 1.2,
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </motion.div>
                          <span className="text-lg text-stone-300 leading-relaxed flex-1">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Film metadata footer */}
                  <motion.div
                    className="mt-12 pt-8 border-t flex justify-between items-center"
                    style={{ borderColor: `${selectedItem.color}20` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="text-xs text-stone-600 font-mono tracking-wide">
                      35MM • KODAK TRI-X • EDUCATIONAL ARCHIVE • DORIS FAN COLLECTION
                    </div>
                    <div className="text-xs text-stone-700 font-mono">
                      © {selectedItem.yearStart}-{selectedItem.yearEnd}
                    </div>
                  </motion.div>
                </div>

                {/* Film grain overlay on detail */}
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '220px 220px',
                  }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Discovery elements - Floating hints */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 1.2 }}
          >
            <motion.p
              className="text-stone-500 text-base mb-4"
              style={{ fontFamily: "'Kalam', cursive" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦ Drag the film strip • Hover the timeline • Click any frame ✦
            </motion.p>
            <div className="flex justify-center gap-8 text-xs text-stone-400 font-mono">
              <span>🎬 3 FRAMES</span>
              <span>📍 2018-2024</span>
              <span>🎓 MULTIPLE DISCIPLINES</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}