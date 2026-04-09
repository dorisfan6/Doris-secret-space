import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    id: 1,
    title: "Atomic Tango",
    description: "AI-powered generative art platform",
    role: "roducer, Creative Advisor & Editor",
    tools: ["React", "TensorFlow.js", "WebGL"],
    impact: "50k+ artworks created",
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1762278804729-13d330fad71a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGlnaXRhbCUyMGFydCUyMG5lb258ZW58MXx8fHwxNzc0MzIyMTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "September 2024-Present",
    tags: ["AI/ML", "Interactive", "WebGL"],
  },
  {
    id: 2,
    title: "Big Ten Network",
    description: "Real-time collaboration tool for designers",
    role: "Student U Internship",
    tools: ["Vue.js", "WebRTC", "Figma API"],
    impact: "Featured on Awwwards",
    color: "from-cyan-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1758876377882-6ae5b186b6e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBwYXJ0aWNsZXN8ZW58MXx8fHwxNzc0MzIyMTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "November 2024-Present",
    tags: ["WebRTC", "Collaboration", "SaaS"],
  },
  {
    id: 3,
    title: "Comfy Stone",
    description: "Immersive virtual gallery experience",
    role: "Production Assistant/ Editor Internship",
    tools: ["Three.js", "React Three Fiber", "GSAP"],
    impact: "Winner - FWA of the Day",
    color: "from-violet-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1771167220057-5e095b7a1bd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBuaWdodCUyMGxpZ2h0c3xlbnwxfHx8fDE3NzQzMjIxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "May 2024-August 2024",
    tags: ["3D", "VR", "Gallery"],
  },
  {
    id: 4,
    title: "Cipher",
    description: "Privacy-first messaging platform",
    role: "Full Stack & UI/UX",
    tools: ["Next.js", "E2E Encryption", "Rust"],
    impact: "10k+ active users",
    color: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1649542650641-bc48a1d4598d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwYWVzdGhldGljfGVufDF8fHx8MTc3NDMyMjE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
    tags: ["Security", "Real-time", "Mobile"],
  },
];

// Different card compositions for variety
const cardStyles = [
  {
    // Card 1: Torn left edge, large image on top
    clipPath: "polygon(2.5% 0.8%, 5.3% 0.4%, 9.1% 0.9%, 13.4% 0.5%, 18.2% 1.1%, 23.4% 0.6%, 28.9% 1.3%, 34.7% 0.7%, 40.8% 1.5%, 47.1% 0.9%, 53.6% 1.7%, 60.2% 1.1%, 67% 1.9%, 73.9% 1.3%, 80.8% 2.2%, 87.7% 1.6%, 94.3% 2.4%, 98.8% 3.2%, 99.6% 6.5%, 99.3% 11.2%, 99.7% 16.8%, 99.4% 22.9%, 99.8% 29.4%, 99.4% 36.2%, 99.9% 43.1%, 99.5% 50.2%, 99.9% 57.3%, 99.5% 64.4%, 99.9% 71.5%, 99.5% 78.6%, 99.9% 85.6%, 99.4% 92.3%, 98.6% 97.2%, 95.8% 99.5%, 91.4% 99.2%, 86.2% 99.6%, 80.6% 99.3%, 74.7% 99.7%, 68.5% 99.4%, 62.2% 99.8%, 55.8% 99.4%, 49.3% 99.9%, 42.8% 99.5%, 36.3% 99.8%, 29.9% 99.4%, 23.6% 99.9%, 17.5% 99.5%, 11.7% 99.8%, 6.4% 99.3%, 2.6% 99.6%, 1% 97.8%, 0.4% 94.3%, 0.8% 89.6%, 0.3% 84.1%, 0.7% 78%, 0.2% 71.5%, 0.6% 64.7%, 0.3% 57.7%, 0.7% 50.6%, 0.2% 43.4%, 0.6% 36.2%, 0.3% 29.1%, 0.7% 22.2%, 0.2% 15.5%, 0.6% 9.3%, 0.3% 3.9%)",
    imageHeight: "65%",
    contentAlign: "left",
    rotation: -1.2,
    tapePosition: { top: "45%", right: "-8px", rotation: 85 },
    tapeSize: "w-20 h-7",
    cornerTear: { position: "top-left", size: 16 },
  },
  {
    // Card 2: Irregular right edge, medium image
    clipPath: "polygon(0.7% 1.8%, 2.8% 0.6%, 6.4% 1.3%, 10.8% 0.7%, 15.7% 1.5%, 21.1% 0.9%, 26.8% 1.7%, 32.8% 1.1%, 39.1% 1.9%, 45.6% 1.3%, 52.3% 2.1%, 59.1% 1.5%, 66% 2.3%, 73% 1.7%, 79.9% 2.5%, 86.8% 1.9%, 93.2% 2.7%, 97.5% 3.8%, 99.2% 7.2%, 99.6% 11.9%, 99.3% 17.5%, 99.7% 23.5%, 99.4% 30%, 99.8% 36.8%, 99.5% 43.8%, 99.9% 51%, 99.5% 58.2%, 99.9% 65.4%, 99.5% 72.6%, 99.9% 79.7%, 99.5% 86.7%, 99.8% 93.1%, 98.7% 97.8%, 95.6% 99.4%, 91.1% 99.1%, 85.9% 99.6%, 80.3% 99.3%, 74.3% 99.7%, 68% 99.4%, 61.5% 99.8%, 55% 99.4%, 48.4% 99.9%, 41.8% 99.5%, 35.3% 99.8%, 28.8% 99.4%, 22.5% 99.9%, 16.4% 99.5%, 10.6% 99.8%, 5.5% 99.3%, 2% 99.6%, 0.6% 97.5%, 0.3% 93.8%, 0.7% 88.9%, 0.2% 83.2%, 0.6% 76.9%, 0.3% 70.2%, 0.7% 63.3%, 0.2% 56.2%, 0.6% 49%, 0.3% 41.8%, 0.7% 34.6%, 0.2% 27.5%, 0.6% 20.6%, 0.3% 14%, 0.7% 7.9%)",
    imageHeight: "55%",
    contentAlign: "right",
    rotation: 0.8,
    tapePosition: { bottom: "35%", left: "-10px", rotation: -92 },
    tapeSize: "w-16 h-6",
    cornerTear: { position: "bottom-right", size: 14 },
  },
  {
    // Card 3: Asymmetric cuts, image offset
    clipPath: "polygon(1.4% 2.3%, 3.9% 0.9%, 7.8% 1.6%, 12.3% 1%, 17.3% 1.8%, 22.7% 1.2%, 28.5% 2%, 34.6% 1.4%, 40.9% 2.2%, 47.5% 1.6%, 54.2% 2.4%, 61.1% 1.8%, 68.1% 2.6%, 75.2% 2%, 82.3% 2.8%, 89.3% 2.2%, 95.6% 3%, 98.7% 4.1%, 99.5% 7.8%, 99.2% 12.6%, 99.7% 18.2%, 99.4% 24.4%, 99.8% 31%, 99.5% 37.9%, 99.9% 45%, 99.5% 52.2%, 99.9% 59.5%, 99.5% 66.8%, 99.9% 74.1%, 99.5% 81.3%, 99.9% 88.3%, 99.4% 94.5%, 98.4% 98.6%, 95.1% 99.7%, 90.4% 99.4%, 85% 99.8%, 79.2% 99.5%, 73% 99.9%, 66.6% 99.5%, 60.1% 99.8%, 53.5% 99.4%, 46.9% 99.9%, 40.2% 99.5%, 33.6% 99.8%, 27.1% 99.4%, 20.8% 99.9%, 14.7% 99.5%, 9.1% 99.8%, 4.4% 99.3%, 1.5% 98.4%, 0.5% 95.3%, 0.2% 90.9%, 0.6% 85.6%, 0.3% 79.6%, 0.7% 73.1%, 0.2% 66.2%, 0.6% 59.1%, 0.3% 51.9%, 0.7% 44.6%, 0.2% 37.3%, 0.6% 30.1%, 0.3% 23.1%, 0.7% 16.3%, 0.2% 10%)",
    imageHeight: "60%",
    contentAlign: "left",
    rotation: -0.6,
    tapePosition: { top: "52%", left: "8px", rotation: -88 },
    tapeSize: "w-18 h-6",
    cornerTear: { position: "top-right", size: 12 },
  },
  {
    // Card 4: Rough bottom edge, compact image
    clipPath: "polygon(0.9% 0.6%, 3.4% 0.3%, 7.3% 0.8%, 11.8% 0.4%, 16.9% 1%, 22.4% 0.6%, 28.2% 1.2%, 34.4% 0.7%, 40.9% 1.4%, 47.6% 0.9%, 54.5% 1.6%, 61.5% 1.1%, 68.6% 1.8%, 75.8% 1.3%, 82.9% 2%, 89.9% 1.5%, 96.2% 2.2%, 99.1% 3.4%, 99.7% 7%, 99.4% 11.7%, 99.8% 17.3%, 99.5% 23.4%, 99.9% 30%, 99.5% 36.9%, 99.9% 44%, 99.5% 51.2%, 99.9% 58.5%, 99.5% 65.9%, 99.9% 73.2%, 99.5% 80.5%, 99.9% 87.6%, 99.5% 94%, 98.9% 97.9%, 96.3% 99.3%, 92.3% 99.1%, 87.5% 99.5%, 82.2% 99.3%, 76.5% 99.7%, 70.5% 99.4%, 64.2% 99.8%, 57.8% 99.5%, 51.3% 99.9%, 44.8% 99.5%, 38.2% 99.8%, 31.7% 99.5%, 25.3% 99.9%, 19.1% 99.5%, 13.3% 99.8%, 7.9% 99.4%, 3.6% 99.7%, 1.4% 98.6%, 0.5% 95.8%, 0.2% 91.7%, 0.6% 86.6%, 0.3% 80.8%, 0.7% 74.5%, 0.2% 67.8%, 0.6% 60.9%, 0.3% 53.8%, 0.7% 46.6%, 0.2% 39.4%, 0.6% 32.2%, 0.3% 25.2%, 0.7% 18.4%, 0.2% 12%, 0.6% 6.2%)",
    imageHeight: "58%",
    contentAlign: "right",
    rotation: 1.0,
    tapePosition: { top: "48%", right: "12px", rotation: 90 },
    tapeSize: "w-20 h-7",
    cornerTear: { position: "bottom-left", size: 18 },
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-32 px-8 bg-transparent" style={{ position: 'relative' }}>
      {/* Depth of field background blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] -z-10" />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-stone-700 tracking-wider uppercase text-sm bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full border border-stone-300/50 shadow-sm inline-block" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}>Work Experience</span>
          <h2 className="text-5xl md:text-6xl text-stone-900 mt-6 mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
            Projects that <span className="text-amber-800">resonate</span>
          </h2>
          <p className="text-stone-600 text-xl max-w-2xl" style={{ fontFamily: "'Kalam', cursive" }}>
            Each piece reflects a commitment to craft, intention, and thoughtful design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              isInView={isInView}
              style={cardStyles[index % cardStyles.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  index, 
  isInView,
  style 
}: { 
  project: typeof projects[0]; 
  index: number; 
  isInView: boolean;
  style: typeof cardStyles[0];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        rotate: style.rotation 
      } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-cursor="hover"
      className="group relative"
      style={{ 
        transformStyle: "preserve-3d",
        height: index % 2 === 0 ? "550px" : "520px" // Vary heights
      }}
    >
      <motion.div
        className="relative overflow-hidden bg-white/98 h-full border border-stone-300/60 shadow-[2px_4px_14px_rgba(0,0,0,0.14),4px_7px_20px_rgba(0,0,0,0.08),1px_2px_4px_rgba(0,0,0,0.12)]"
        style={{
          clipPath: style.clipPath,
        }}
        whileHover={{ 
          y: -12, 
          rotate: 0,
          rotateX: 2,
          rotateY: index % 2 === 0 ? 2 : -2,
          scale: 1.02,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        {/* Paper texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft glow effect */}
        <motion.div
          className="absolute -inset-3 bg-amber-200/30 -z-10 blur-xl"
          animate={{ opacity: isHovered ? 0.8 : 0.2 }}
          transition={{ duration: 0.3 }}
        />

        {/* Image container - varied placement */}
        <div 
          className="absolute top-0 left-0 right-0 overflow-hidden"
          style={{ height: style.imageHeight }}
        >
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient overlay - varies by position */}
          <div 
            className={`absolute inset-0 ${
              index % 2 === 0 
                ? 'bg-gradient-to-br from-white/10 via-white/50 to-white/90' 
                : 'bg-gradient-to-bl from-white/10 via-white/50 to-white/90'
            }`} 
          />

          {/* Year stamp - different positions */}
          <motion.div
            className="absolute bg-amber-50/90 backdrop-blur-sm px-3 py-1.5 text-xs text-amber-900 border border-amber-300/60 shadow-md"
            style={{
              fontFamily: "'Courier New', monospace",
              clipPath: "polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)",
              ...(index % 2 === 0 
                ? { top: "16px", right: "16px", transform: "rotate(3deg)" }
                : { top: "16px", left: "16px", transform: "rotate(-4deg)" }
              )
            }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.year}
          </motion.div>

          {/* Tags - alternating positions */}
          <motion.div
            className="absolute flex flex-wrap gap-2"
            style={index % 2 === 0 
              ? { bottom: "12px", left: "12px" }
              : { bottom: "12px", right: "12px" }
            }
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3, staggerChildren: 0.05 }}
          >
            {project.tags.slice(0, 2).map((tag, i) => (
              <span
                key={tag}
                className="text-xs bg-white/90 backdrop-blur-sm px-2.5 py-1 text-amber-800 border border-amber-200/70 shadow-sm"
                style={{
                  fontFamily: "'Courier New', monospace",
                  clipPath: "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
                  transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Content area - editorial layout */}
        <div 
          className="absolute left-0 right-0 bg-gradient-to-b from-amber-50/70 to-white p-6 flex flex-col"
          style={{ 
            bottom: 0,
            top: style.imageHeight,
          }}
        >
          {/* Title with arrow - varied alignment */}
          <div className={`flex items-start justify-between mb-3 ${style.contentAlign === 'right' ? 'flex-row-reverse' : ''}`}>
            <h3 
              className="text-3xl text-stone-900 group-hover:text-amber-800 transition-colors duration-300" 
              style={{ 
                fontFamily: "'Caveat', cursive",
                textShadow: "1px 1px 0px rgba(0,0,0,0.03)",
              }}
            >
              {project.title}
            </h3>
            <motion.div
              animate={{ 
                rotate: isHovered ? 45 : 0, 
                x: isHovered ? (style.contentAlign === 'right' ? -3 : 3) : 0,
                y: isHovered ? -3 : 0 
              }}
              transition={{ duration: 0.35, type: "spring" }}
            >
              <ArrowUpRight className="text-stone-600 w-6 h-6" strokeWidth={1.5} />
            </motion.div>
          </div>
          
          <p 
            className={`text-stone-600 mb-3 text-base font-light leading-relaxed ${style.contentAlign === 'right' ? 'text-right' : ''}`}
            style={{ fontFamily: "'Kalam', cursive" }}
          >
            {project.description}
          </p>

          {/* Expandable details */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-stone-300/50 space-y-2.5">
              {/* Role */}
              <div className={style.contentAlign === 'right' ? 'text-right' : ''}>
                <span className="text-xs text-amber-700 uppercase tracking-wide font-medium block mb-1" style={{ fontFamily: "'Courier New', monospace" }}>
                  ROLE
                </span>
                <p className="text-stone-800 text-sm" style={{ fontFamily: "'Kalam', cursive" }}>{project.role}</p>
              </div>
              
              {/* Tools as inline labels */}
              <div className={style.contentAlign === 'right' ? 'text-right' : ''}>
                <span className="text-xs text-amber-700 uppercase tracking-wide font-medium block mb-1.5" style={{ fontFamily: "'Courier New', monospace" }}>
                  TOOLS
                </span>
                <div className={`flex flex-wrap gap-1.5 ${style.contentAlign === 'right' ? 'justify-end' : ''}`}>
                  {project.tools.map((tool, i) => (
                    <span 
                      key={tool} 
                      className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 border border-stone-300/60 shadow-sm"
                      style={{
                        fontFamily: "'Courier New', monospace",
                        clipPath: "polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)",
                        transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className={`flex items-center gap-2 ${style.contentAlign === 'right' ? 'justify-end' : ''}`}>
                <span className="text-xs text-amber-700 uppercase tracking-wide font-medium" style={{ fontFamily: "'Courier New', monospace" }}>
                  IMPACT:
                </span>
                <p className="text-stone-800 text-sm flex items-center gap-1.5" style={{ fontFamily: "'Kalam', cursive" }}>
                  {project.impact}
                  <ExternalLink className="w-3 h-3 text-amber-700" />
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Washi tape piece - varied positions */}
        <div 
          className={`absolute ${style.tapeSize} bg-amber-100/50 border border-amber-200/60 backdrop-blur-sm shadow-md z-30`}
          style={{ 
            clipPath: "polygon(6% 0%, 94% 0%, 100% 10%, 100% 90%, 94% 100%, 6% 100%, 0% 90%, 0% 10%)",
            ...style.tapePosition,
            transform: `rotate(${style.tapePosition.rotation}deg)`,
          }} 
        />

        {/* Corner tear effect */}
        {style.cornerTear.position === 'top-left' && (
          <div 
            className="absolute top-0 left-0 bg-stone-100/40 z-20"
            style={{
              width: `${style.cornerTear.size}px`,
              height: `${style.cornerTear.size}px`,
              clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
            }}
          />
        )}
        {style.cornerTear.position === 'top-right' && (
          <div 
            className="absolute top-0 right-0 bg-stone-100/40 z-20"
            style={{
              width: `${style.cornerTear.size}px`,
              height: `${style.cornerTear.size}px`,
              clipPath: "polygon(100% 0%, 100% 100%, 0% 0%)",
            }}
          />
        )}
        {style.cornerTear.position === 'bottom-left' && (
          <div 
            className="absolute bottom-0 left-0 bg-stone-100/40 z-20"
            style={{
              width: `${style.cornerTear.size}px`,
              height: `${style.cornerTear.size}px`,
              clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
            }}
          />
        )}
        {style.cornerTear.position === 'bottom-right' && (
          <div 
            className="absolute bottom-0 right-0 bg-stone-100/40 z-20"
            style={{
              width: `${style.cornerTear.size}px`,
              height: `${style.cornerTear.size}px`,
              clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}