import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Code2, Sparkles, Zap, Gamepad2, Shapes, Wand2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const experiments = [
  {
    id: 1,
    title: "Music Video Creation",
    description: "Wrote, direct and film the music video for artist C-Sky's new single 'Daisy'",
    icon: Sparkles,
    image: "https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Timeline%2042_00108828.png",
    tags: ["DaVinci", "Camera Operation", "Directing"],
    year: "2026",
    link: "https://vimeo.com/1180991187"
  },
  {
    id: 2,
    title: "APP UI Design ",
    description: "Create prototype for a socialized App, design the UI",
    icon: Wand2,
    image: "https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Screenshot%202026-04-07%20at%205.48.34%20PM.png",
    tags: ["Figma", "Adobe Illustrator"],
    year: "2025",
    link: "https://www.figma.com/proto/hUkHQjzmgd9mDVomwECzr6/Interactive-Project?node-id=2001-2&p=f&t=JMv9vEwAuo3Rv5aX-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2001%3A2"
  },
  {
    id: 3,
    title: "Atomic Tango",
    description: "Producer, Creative Advisor and Editor for USC professor Freddy Tran Nager's social media account",
    icon: Code2,
    image: "https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Screenshot%202026-04-09%20at%201.27.33%20PM.png",
    tags: ["Editing", "Producing", "Directing"],
    year: "2024",
    link: "https://xhslink.com/m/15cESrWTPV4"
  },
  {
    id: 4,
      title: "Website Development",
    description: "Build a website about skincare research",
    icon: Shapes,
    image: "https://flftewuhbgszetogrtot.supabase.co/storage/v1/object/public/pic/Screenshot%202026-04-09%20at%201.50.45%20PM.png",
    tags: ["Vibe Coding", "API", "Database"],
    year: "2026",
    link: "https://skin-science-bot.lovable.app/"
  },
];

// Varied compositions for each card
const cardCompositions = [
  {
    clipPath: "polygon(1% 0%, 99% 0%, 100% 2%, 100% 98%, 98% 100%, 1% 100%, 0% 97%)",
    height: "440px",
    imageRatio: "58%",
    rotation: -0.8,
    tapes: [
      { top: "54%", right: "10px", rotation: 88, size: "w-16 h-6" },
      { bottom: "8px", left: "20%", rotation: 2, size: "w-14 h-5" }
    ]
  },
  {
    clipPath: "polygon(0% 1%, 98% 0%, 100% 2%, 100% 99%, 99% 100%, 2% 100%, 0% 98%)",
    height: "460px",
    imageRatio: "52%",
    rotation: 1.2,
    tapes: [
      { top: "48%", left: "-8px", rotation: -92, size: "w-18 h-7" }
    ]
  },
  {
    clipPath: "polygon(2% 0%, 100% 0%, 100% 98%, 97% 100%, 0% 100%, 0% 2%)",
    height: "420px",
    imageRatio: "60%",
    rotation: -1.0,
    tapes: [
      { top: "56%", right: "-10px", rotation: 90, size: "w-20 h-6" },
      { top: "12px", right: "30%", rotation: -3, size: "w-16 h-5" }
    ]
  },
  {
    clipPath: "polygon(0% 0%, 98% 0%, 100% 3%, 100% 100%, 2% 100%, 0% 99%, 1% 1%)",
    height: "450px",
    imageRatio: "55%",
    rotation: 0.6,
    tapes: [
      { bottom: "40%", left: "8px", rotation: -88, size: "w-16 h-6" }
    ]
  },
  {
    clipPath: "polygon(1% 1%, 99% 0%, 100% 1%, 100% 99%, 98% 100%, 1% 99%, 0% 98%)",
    height: "430px",
    imageRatio: "57%",
    rotation: -0.5,
    tapes: [
      { top: "52%", right: "12px", rotation: 85, size: "w-18 h-6" },
      { bottom: "6px", left: "25%", rotation: 1, size: "w-14 h-5" }
    ]
  },
  {
    clipPath: "polygon(0% 2%, 97% 0%, 100% 2%, 100% 98%, 99% 100%, 2% 100%, 0% 97%)",
    height: "445px",
    imageRatio: "54%",
    rotation: 0.9,
    tapes: [
      { top: "50%", left: "-6px", rotation: -90, size: "w-20 h-7" }
    ]
  },
];

export function Experiments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeExperiment, setActiveExperiment] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-32 px-8 bg-transparent overflow-hidden" style={{ position: 'relative' }}>
      {/* Depth of field background blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] -z-10" />
      
      {/* Soft animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(180, 130, 70, 0.2) 0%, transparent 50%)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="text-stone-700 tracking-wider uppercase text-sm bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full border border-stone-300/50 shadow-sm inline-block" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}>Portfolio</span>
          <h2 className="text-5xl md:text-6xl text-stone-900 mt-6 mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
            Experiments &{" "}
            <span className="text-amber-800">explorations</span>
          </h2>
          <p className="text-stone-600 text-xl max-w-2xl mx-auto" style={{ fontFamily: "'Kalam', cursive" }}>
            The space where ideas get curious and interactions get interesting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((experiment, index) => {
            const Icon = experiment.icon;
            const composition = cardCompositions[index % cardCompositions.length];
            
            return (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  rotate: composition.rotation 
                } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onHoverStart={() => setActiveExperiment(experiment.id)}
                onHoverEnd={() => setActiveExperiment(null)}
                data-cursor="hover"
                className="group relative"
                style={{ 
                  transformStyle: "preserve-3d",
                  height: composition.height
                }}
              >
                {experiment.link ? (
                  <a
                    href={experiment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    <CardContent 
                      experiment={experiment}
                      composition={composition}
                      index={index}
                      activeExperiment={activeExperiment}
                    />
                  </a>
                ) : (
                  <CardContent 
                    experiment={experiment}
                    composition={composition}
                    index={index}
                    activeExperiment={activeExperiment}
                  />
                )}

                {/* Floating paper confetti on hover */}
                {activeExperiment === experiment.id && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-amber-400/60 shadow-sm"
                        style={{
                          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                          left: "50%",
                          top: "50%",
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 0,
                          rotate: 0,
                        }}
                        animate={{
                          x: Math.cos((i * Math.PI * 2) / 8) * 70,
                          y: Math.sin((i * Math.PI * 2) / 8) * 70,
                          opacity: [0, 0.9, 0],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CardContent({ experiment, composition, index, activeExperiment }: { experiment: any, composition: any, index: number, activeExperiment: number | null }) {
  const Icon = experiment.icon;
  return (
    <motion.div
      className="relative overflow-hidden bg-white h-full shadow-[4px_4px_0px_rgba(0,0,0,0.1),8px_8px_0px_rgba(245,158,11,0.1)]"
      style={{
        clipPath: composition.clipPath,
      }}
      whileHover={{
        y: -12,
        rotateX: 3,
        rotateY: index % 2 === 0 ? 2 : -2,
        scale: 1.02,
        rotate: 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle shadow layers for paper depth */}
      <motion.div
        className="absolute -inset-3 bg-amber-200/30 blur-xl -z-10"
        animate={{ 
          opacity: activeExperiment === experiment.id ? 0.8 : 0.3,
          scale: activeExperiment === experiment.id ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Image area - like a magazine cutout */}
      <div 
        className="absolute top-0 left-0 right-0 overflow-hidden"
        style={{ height: composition.imageRatio }}
      >
        <motion.div
          animate={{
            scale: activeExperiment === experiment.id ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
          className="w-full h-full relative"
        >
          <ImageWithFallback
            src={experiment.image}
            alt={experiment.title}
            className="w-full h-full object-cover"
          />
          {/* Polaroid-style border effect */}
          <div className="absolute inset-0 border-[6px] border-white shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
          {/* Slight gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-50/60 via-transparent to-transparent" />
        </motion.div>

        {/* Year stamp - varied positions */}
        <motion.div
          className="absolute bg-amber-100/80 px-3 py-1 text-xs text-amber-900 border border-amber-300/50 shadow-sm"
          style={{ 
            fontFamily: "'Courier New', monospace",
            clipPath: "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
            ...(index % 3 === 0 
              ? { top: "12px", right: "12px", transform: "rotate(2deg)" }
              : index % 3 === 1
              ? { top: "12px", left: "12px", transform: "rotate(-3deg)" }
              : { bottom: "12px", right: "12px", transform: "rotate(3deg)" }
            )
          }}
          whileHover={{ rotate: 0, scale: 1.1 }}
        >
          {experiment.year}
        </motion.div>
      </div>

      {/* Content area - editorial layout */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-amber-50/80 to-white p-6 flex flex-col justify-between"
        style={{
          top: composition.imageRatio
        }}
      >
        {/* Icon badge - like a printed stamp */}
        <motion.div
          className="w-14 h-14 bg-white border-2 border-stone-300 flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.1)] relative"
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
          }}
          animate={{
            scale: activeExperiment === experiment.id ? 1.15 : 1,
            rotate: activeExperiment === experiment.id ? 8 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="text-amber-700 w-6 h-6" />
          {/* Stamp-like circular border */}
          <div className="absolute inset-1 border border-dashed border-amber-300/50 rounded-full" />
        </motion.div>

        {/* Title and description */}
        <div className="flex-1 mt-3">
          <h3 
            className="text-2xl text-stone-900 mb-2 group-hover:text-amber-800 transition-colors relative inline-block"
            style={{ 
              fontFamily: "'Caveat', cursive",
              textShadow: "1px 1px 0px rgba(0,0,0,0.05)",
            }}
          >
            {experiment.title}
            {/* Underline scribble */}
            <motion.svg
              className="absolute -bottom-1 left-0 w-full h-2 opacity-0 group-hover:opacity-100"
              viewBox="0 0 100 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: activeExperiment === experiment.id ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <path
                d="M 2 3 Q 25 1, 50 3 T 98 3"
                stroke="#d97706"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>
          </h3>
          <p className="text-stone-600 text-sm font-light leading-relaxed" style={{ fontFamily: "'Kalam', cursive" }}>
            {experiment.description}
          </p>
        </div>

        {/* Tags - like printed labels */}
        <div className="flex flex-wrap gap-2 mt-3">
          {experiment.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              className="px-2.5 py-1 bg-white text-xs text-stone-700 border border-stone-300/70 shadow-[1px_1px_0px_rgba(0,0,0,0.08)]"
              style={{
                fontFamily: "'Courier New', monospace",
                clipPath: "polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)",
                transform: `rotate(${(tagIndex % 2 === 0 ? -0.5 : 0.5)}deg)`,
              }}
              whileHover={{
                y: -2,
                rotate: 0,
                boxShadow: "2px 2px 0px rgba(0,0,0,0.15)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Launch button - appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: activeExperiment === experiment.id ? 1 : 0,
            y: activeExperiment === experiment.id ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <button 
            className="w-full py-2.5 bg-stone-800 text-white text-sm shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            style={{
              fontFamily: "'Courier New', monospace",
              clipPath: "polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)",
            }}
          >
            LAUNCH PROJECT →
          </button>
        </motion.div>
      </div>

      {/* Tape pieces - varied positions */}
      {composition.tapes.map((tape, tapeIndex) => (
        <div 
          key={tapeIndex}
          className={`absolute ${tape.size} bg-amber-100/40 border border-amber-200/60 backdrop-blur-sm shadow-sm z-30`}
          style={{ 
            clipPath: "polygon(5% 0%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0% 90%, 0% 10%)",
            ...tape,
            transform: `rotate(${tape.rotation}deg)`,
          }} 
        />
      ))}
    </motion.div>
  );
}