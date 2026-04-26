import { motion, useInView } from "motion/react";
import { type CSSProperties, useRef, useState } from "react";
import { Code2, Sparkles, Shapes, Wand2, Camera } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const experiments = [
  {
    id: 1,
    title: "Music Video Creation",
    description: "Wrote, direct and film the music video for artist C-Sky's new single 'Daisy'",
    icon: Sparkles,
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/Timeline%2042_00108828.png",
    tags: ["DaVinci", "Camera Operation", "Directing"],
    year: "2026",
    link: "https://vimeo.com/1180991187",
  },
  {
    id: 2,
    title: "APP UI Design ",
    description: "Create prototype for a socialized App, design the UI",
    icon: Wand2,
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen4.png",
    tags: ["Figma", "Adobe Illustrator"],
    year: "2025",
    link: "https://www.figma.com/proto/hUkHQjzmgd9mDVomwECzr6/Interactive-Project?node-id=2001-2&p=f&t=JMv9vEwAuo3Rv5aX-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2001%3A2",
  },
  {
    id: 3,
    title: "Atomic Tango",
    description: "Producer, Creative Advisor and Editor for USC professor Freddy Tran Nager's social media account",
    icon: Code2,
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen3.png",
    tags: ["Editing", "Producing", "Directing"],
    year: "2024",
    link: "https://xhslink.com/m/15cESrWTPV4",
  },
  {
    id: 4,
    title: "Website Development",
    description: "Build a website about skincare research",
    icon: Shapes,
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen2.png",
    tags: ["Vibe Coding", "API", "Database"],
    year: "2026",
    link: "https://skin-science-bot.lovable.app/",
  },
  {
    id: 5,
    title: "Socail Media Data Analysis in i-dle",
    description: "Online volume of mention analysis on K-pop group i-dle's performance, including benchmark comparison and ten-year overview",
    icon: Camera,
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen1.png",
    tags: ["Data Analysis", "Brandwatch", "Creative Direction"],
    year: "2025",
    link: "https://tulane.box.com/s/1wzj6d9ygnq7nprue3tle52vofifrilu",
  },
];

const cardCompositions = [
  {
    height: "470px",
    imageRatio: "57%",
    rotation: -1.2,
    photoRotation: -1.8,
    vellumRotation: 1.2,
    slipRotation: -2.4,
    stackOffset: ["translate(14px, 14px)", "translate(7px, 6px)"],
    tapes: [
      { top: "14px", left: "22px", rotation: -6, size: "w-20 h-6" },
      { top: "53%", right: "-6px", rotation: 88, size: "w-16 h-6" },
    ],
    labelSide: "right",
  },
  {
    height: "490px",
    imageRatio: "54%",
    rotation: 1.1,
    photoRotation: 1.6,
    vellumRotation: -1.4,
    slipRotation: 2.6,
    stackOffset: ["translate(10px, 16px)", "translate(6px, 8px)"],
    tapes: [
      { top: "18px", right: "18px", rotation: 5, size: "w-18 h-6" },
      { bottom: "112px", left: "-8px", rotation: -89, size: "w-16 h-6" },
    ],
    labelSide: "left",
  },
  {
    height: "455px",
    imageRatio: "59%",
    rotation: -0.8,
    photoRotation: -1.2,
    vellumRotation: 1.8,
    slipRotation: -1.8,
    stackOffset: ["translate(12px, 12px)", "translate(6px, 5px)"],
    tapes: [
      { top: "14px", left: "26%", rotation: -2, size: "w-16 h-5" },
      { bottom: "16px", right: "18%", rotation: 2, size: "w-14 h-5" },
    ],
    labelSide: "right",
  },
  {
    height: "482px",
    imageRatio: "55%",
    rotation: 0.7,
    photoRotation: 1.2,
    vellumRotation: -1.8,
    slipRotation: 2,
    stackOffset: ["translate(11px, 17px)", "translate(5px, 8px)"],
    tapes: [
      { top: "16px", left: "20px", rotation: -4, size: "w-18 h-6" },
      { top: "50%", right: "-8px", rotation: 90, size: "w-16 h-6" },
    ],
    labelSide: "left",
  },
  {
    height: "462px",
    imageRatio: "58%",
    rotation: -0.6,
    photoRotation: -1.5,
    vellumRotation: 1.4,
    slipRotation: -2.2,
    stackOffset: ["translate(13px, 12px)", "translate(5px, 6px)"],
    tapes: [
      { top: "18px", right: "20px", rotation: 4, size: "w-20 h-6" },
      { bottom: "18px", left: "22%", rotation: 1, size: "w-14 h-5" },
    ],
    labelSide: "right",
  },
];

const paperTexture =
  'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.04\' numOctaves=\'5\' result=\'noise\'/%3E%3CfeDiffuseLighting in=\'noise\' lighting-color=\'%23F5F1E8\' surfaceScale=\'2\'%3E%3CfeDistantLight azimuth=\'45\' elevation=\'60\'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23paper)\' fill=\'%23f5f1e8\'/%3E%3C/svg%3E")';

const grainTexture =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';

export function Experiments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeExperiment, setActiveExperiment] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent px-8 py-32" style={{ position: "relative" }}>
      <div className="absolute inset-0 -z-10 backdrop-blur-[1.5px]" />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,241,232,0.94) 0%, rgba(239,234,224,0.98) 58%, rgba(230,224,214,0.96) 100%)",
        }}
      />

      <div
        className="absolute inset-0 -z-10 opacity-[0.85]"
        style={{
          backgroundImage: paperTexture,
          backgroundSize: "220px 220px",
        }}
      />

      <div
        className="absolute inset-0 -z-10 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage: grainTexture,
          backgroundSize: "320px 320px",
        }}
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 12% 10%, rgba(255,255,255,0.58), transparent 28%), radial-gradient(circle at 82% 72%, rgba(121,103,82,0.1), transparent 34%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(55,46,38,0.14)] bg-[rgba(255,252,246,0.68)] px-5 py-2.5 shadow-[0_12px_28px_rgba(43,33,22,0.08)] backdrop-blur-sm">
            <div className="h-2.5 w-2.5 rounded-full bg-[#7d4b43] shadow-[0_0_0_4px_rgba(125,75,67,0.12)]" />
            <span
              className="text-[11px] uppercase tracking-[0.22em] text-stone-600"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Archive Portfolio
            </span>
          </div>
          <h2
            className="mt-7 text-5xl text-stone-900 md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Printed studies,
            <span className="ml-3 inline-block text-[#7d4b43]" style={{ fontFamily: "'Caveat', cursive" }}>
              contact sheets
            </span>
            <span className="ml-3 inline-block">and media tests</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-600 md:text-xl"
            style={{ fontFamily: "'Kalam', cursive" }}
          >
            A desk of printed frames, clipped notes, and tactile experiments arranged like an evolving production archive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment, index) => {
            const composition = cardCompositions[index % cardCompositions.length];

            return (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: composition.rotation } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onHoverStart={() => setActiveExperiment(experiment.id)}
                onHoverEnd={() => setActiveExperiment(null)}
                data-cursor="hover"
                className="group relative"
                style={{
                  transformStyle: "preserve-3d",
                  height: composition.height,
                }}
              >
                {experiment.link ? (
                  <a
                    href={experiment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full cursor-pointer"
                    style={{ cursor: "pointer" }}
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

                {activeExperiment === experiment.id && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-2 w-2 border border-[rgba(128,111,91,0.18)] bg-[rgba(255,249,240,0.86)] shadow-sm"
                        style={{
                          left: "50%",
                          top: "50%",
                          clipPath: "polygon(12% 0%, 88% 0%, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0% 88%, 0% 12%)",
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

function CardContent({
  experiment,
  composition,
  index,
  activeExperiment,
}: {
  experiment: (typeof experiments)[number];
  composition: (typeof cardCompositions)[number];
  index: number;
  activeExperiment: number | null;
}) {
  const Icon = experiment.icon;

  return (
    <motion.div
      className="relative h-full"
      whileHover={{
        y: -12,
        rotateX: 3,
        rotateY: index % 2 === 0 ? 2 : -2,
        scale: 1.02,
        rotate: 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <PaperLayer
        className="absolute inset-0 rounded-[26px] border border-[rgba(77,65,52,0.08)] bg-[rgba(209,201,189,0.46)]"
        style={{
          transform: composition.stackOffset[0],
          boxShadow: "0 34px 58px rgba(43, 33, 22, 0.12)",
        }}
      />
      <PaperLayer
        className="absolute inset-0 rounded-[26px] border border-[rgba(95,81,65,0.1)] bg-[rgba(233,227,217,0.76)]"
        style={{
          transform: composition.stackOffset[1],
          boxShadow: "0 22px 42px rgba(43, 33, 22, 0.1)",
        }}
      />

      <motion.div
        className="absolute -inset-4 -z-10 rounded-[30px] bg-[rgba(118,102,84,0.1)] blur-2xl"
        animate={{
          opacity: activeExperiment === experiment.id ? 0.95 : 0.45,
          scale: activeExperiment === experiment.id ? 1.06 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      <div
        className="relative h-full overflow-hidden rounded-[26px] border border-[rgba(77,65,52,0.14)] bg-[linear-gradient(180deg,rgba(251,248,241,0.98),rgba(239,233,223,0.98))]"
        style={{
          boxShadow:
            "0 30px 58px rgba(38, 29, 20, 0.16), 0 10px 18px rgba(255,255,255,0.7) inset, -6px -8px 24px rgba(115, 100, 83, 0.06) inset",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage: paperTexture,
            backgroundSize: "220px 220px",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage: grainTexture,
            backgroundSize: "260px 260px",
          }}
        />

        <div
          className="absolute left-0 top-0 h-full w-[28px] border-r border-[rgba(65,56,47,0.14)] bg-[linear-gradient(180deg,rgba(219,211,199,0.9),rgba(198,189,176,0.76))]"
          style={{
            boxShadow: "3px 0 8px rgba(28, 24, 20, 0.05)",
          }}
        >
          <div className="flex h-full flex-col items-center justify-evenly py-5">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="h-2.5 w-1.5 rounded-full bg-[rgba(56,48,41,0.42)]" />
            ))}
          </div>
        </div>

        <div
          className="absolute right-0 top-0 h-14 w-14 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_62%)]"
          style={{ clipPath: "polygon(0 0,100% 0,100% 100%)" }}
        />

        <div
          className="absolute inset-x-[48px] top-[32px] overflow-hidden rounded-[20px] border border-[rgba(70,61,52,0.16)] bg-[rgba(248,244,238,0.84)]"
          style={{
            height: composition.imageRatio,
            transform: `rotate(${composition.photoRotation}deg)`,
            boxShadow:
              "0 24px 36px rgba(36, 28, 21, 0.18), 0 2px 0 rgba(255,255,255,0.9) inset",
          }}
        >
          <motion.div
            animate={{
              scale: activeExperiment === experiment.id ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
            className="relative h-full w-full bg-white p-4 pb-14"
          >
            <div className="relative h-full w-full overflow-hidden border border-[rgba(62,52,43,0.12)] bg-[#e8e2d8]">
              <ImageWithFallback
                src={experiment.image}
                alt={experiment.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_38%,rgba(45,33,19,0.12)_100%)]" />
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
              <div
                className="text-[10px] uppercase tracking-[0.22em] text-stone-500"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                proof print
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.18em] text-stone-400"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                no. {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </motion.div>

          <div
            className="absolute left-[7%] top-[7%] h-[46%] w-[72%] border border-[rgba(255,255,255,0.42)] bg-[linear-gradient(180deg,rgba(251,249,244,0.42),rgba(255,255,255,0.16))] backdrop-blur-[8px]"
            style={{
              transform: `rotate(${composition.vellumRotation}deg)`,
              boxShadow: "0 14px 30px rgba(22, 17, 13, 0.08)",
            }}
          >
            <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply" style={{ backgroundImage: grainTexture }} />
          </div>
        </div>

        <MetadataSlip
          className={composition.labelSide === "right" ? "right-[18px]" : "left-[44px]"}
          style={{
            top: composition.labelSide === "right" ? "22px" : "24px",
            transform: `rotate(${composition.slipRotation}deg)`,
          }}
          year={experiment.year}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 pl-[46px]">
          <div
            className="relative overflow-hidden rounded-[22px] border border-[rgba(69,58,48,0.14)] bg-[linear-gradient(180deg,rgba(255,252,246,0.78),rgba(246,240,231,0.98))] px-5 pb-5 pt-4"
            style={{
              boxShadow: "0 16px 30px rgba(38, 29, 20, 0.08), 0 1px 0 rgba(255,255,255,0.6) inset",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
              style={{
                backgroundImage: paperTexture,
                backgroundSize: "220px 220px",
              }}
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-start justify-between gap-4">
                <motion.div
                  className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(72,60,49,0.14)] bg-[rgba(255,255,255,0.76)]"
                  animate={{
                    scale: activeExperiment === experiment.id ? 1.15 : 1,
                    rotate: activeExperiment === experiment.id ? 8 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    boxShadow: "0 8px 20px rgba(40, 32, 24, 0.12)",
                  }}
                >
                  <Icon className="h-6 w-6 text-[#6e5844]" />
                  <div className="absolute inset-[6px] rounded-full border border-dashed border-[rgba(110,88,68,0.22)]" />
                </motion.div>

                <div
                  className="rounded-[4px] border border-[rgba(125,75,67,0.18)] bg-[rgba(125,75,67,0.09)] px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#7d4b43]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  archived
                </div>
              </div>

              <div className="flex-1">
                <h3
                  className="relative mb-2 inline-block text-[2rem] leading-none text-stone-900 transition-colors group-hover:text-[#7d4b43]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {experiment.title}
                  <motion.svg
                    className="absolute -bottom-1 left-0 h-2 w-full opacity-0 group-hover:opacity-100"
                    viewBox="0 0 100 6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: activeExperiment === experiment.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <path
                      d="M 2 3 Q 25 1, 50 3 T 98 3"
                      stroke="#7d4b43"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </h3>
                <p
                  className="text-sm font-light leading-relaxed text-stone-600"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  {experiment.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {experiment.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    className="border border-[rgba(73,62,53,0.14)] bg-[rgba(255,251,245,0.88)] px-2.5 py-1 text-xs text-stone-700"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      transform: `rotate(${tagIndex % 2 === 0 ? -0.8 : 0.8}deg)`,
                      boxShadow: "0 3px 8px rgba(35, 26, 18, 0.07)",
                    }}
                    whileHover={{
                      y: -2,
                      rotate: 0,
                      boxShadow: "0 8px 14px rgba(35,26,18,0.14)",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

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
                  className="w-full border border-[rgba(26,22,18,0.08)] bg-[#231d19] py-2.5 text-sm tracking-[0.2em] text-stone-100 shadow-[0_12px_22px_rgba(24,18,14,0.18)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[0_16px_28px_rgba(24,18,14,0.24)]"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  LAUNCH PROJECT →
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {composition.tapes.map((tape, tapeIndex) => (
          <TapeStrip key={tapeIndex} tape={tape} />
        ))}
      </div>
    </motion.div>
  );
}

function PaperLayer({
  className,
  style,
}: {
  className: string;
  style: CSSProperties;
}) {
  return <div aria-hidden="true" className={className} style={style} />;
}

function MetadataSlip({
  className,
  style,
  year,
}: {
  className: string;
  style: CSSProperties;
  year: string;
}) {
  return (
    <motion.div
      className={`absolute z-30 border border-[rgba(110,88,68,0.16)] bg-[rgba(252,248,240,0.92)] px-3 py-2 shadow-[0_10px_20px_rgba(42,32,24,0.12)] ${className}`}
      style={style}
      whileHover={{ rotate: 0, scale: 1.1 }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.2em] text-stone-500"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        file date
      </div>
      <div
        className="mt-1 text-sm text-[#7d4b43]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {year}
      </div>
    </motion.div>
  );
}

function TapeStrip({
  tape,
}: {
  tape: { top?: string; right?: string; bottom?: string; left?: string; rotation: number; size: string };
}) {
  return (
    <div
      className={`absolute z-30 ${tape.size} border border-[rgba(154,138,112,0.24)] bg-[linear-gradient(180deg,rgba(230,220,193,0.64),rgba(206,193,164,0.42))] backdrop-blur-[1px] shadow-[0_4px_10px_rgba(57,45,32,0.08)]`}
      style={{
        ...tape,
        transform: `rotate(${tape.rotation}deg)`,
        clipPath: "polygon(5% 6%, 95% 0%, 100% 14%, 96% 100%, 2% 94%, 0% 10%)",
      }}
    />
  );
}
