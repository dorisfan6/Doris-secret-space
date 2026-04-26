import { AnimatePresence, motion, useInView } from "motion/react";
import { type CSSProperties, useMemo, useRef, useState } from "react";
import { Camera, Code2, Shapes, Sparkles, Wand2 } from "lucide-react";
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

const deskLayouts = [
  {
    cardHeight: "440px",
    cardClassName: "lg:col-span-4 lg:mt-8",
    wrapperStyle: { transform: "rotate(-2.2deg) translateY(14px)" },
    photoStyle: { transform: "rotate(-2.6deg)" },
    shadowStyle: { transform: "translate(14px, 14px) rotate(0.6deg)" },
    backingStyle: { transform: "translate(7px, 8px) rotate(-0.8deg)" },
    tapeA: { top: "18px", left: "28px", rotation: -5 },
    tapeB: { right: "28px", top: "53%", rotation: 88 },
  },
  {
    cardHeight: "470px",
    cardClassName: "lg:col-span-3 lg:mt-28",
    wrapperStyle: { transform: "rotate(1.3deg) translateY(-6px)" },
    photoStyle: { transform: "rotate(1.8deg)" },
    shadowStyle: { transform: "translate(10px, 16px) rotate(-0.4deg)" },
    backingStyle: { transform: "translate(5px, 8px) rotate(0.6deg)" },
    tapeA: { top: "16px", right: "24px", rotation: 4 },
    tapeB: { left: "-6px", bottom: "88px", rotation: -90 },
  },
  {
    cardHeight: "420px",
    cardClassName: "lg:col-span-5 lg:-mt-6",
    wrapperStyle: { transform: "rotate(-0.7deg) translateY(22px)" },
    photoStyle: { transform: "rotate(-1.1deg)" },
    shadowStyle: { transform: "translate(12px, 10px) rotate(0.7deg)" },
    backingStyle: { transform: "translate(5px, 6px) rotate(-0.5deg)" },
    tapeA: { top: "20px", left: "24%", rotation: -1 },
    tapeB: { right: "18%", bottom: "16px", rotation: 2 },
  },
  {
    cardHeight: "452px",
    cardClassName: "lg:col-span-4 lg:-mt-14",
    wrapperStyle: { transform: "rotate(1deg) translateY(-10px)" },
    photoStyle: { transform: "rotate(1.4deg)" },
    shadowStyle: { transform: "translate(12px, 18px) rotate(-0.6deg)" },
    backingStyle: { transform: "translate(6px, 8px) rotate(0.6deg)" },
    tapeA: { top: "18px", left: "24px", rotation: -4 },
    tapeB: { right: "-6px", top: "48%", rotation: 90 },
  },
  {
    cardHeight: "435px",
    cardClassName: "lg:col-span-4 lg:-mt-2 lg:ml-10",
    wrapperStyle: { transform: "rotate(-1.1deg) translateY(6px)" },
    photoStyle: { transform: "rotate(-1.7deg)" },
    shadowStyle: { transform: "translate(12px, 12px) rotate(0.4deg)" },
    backingStyle: { transform: "translate(5px, 6px) rotate(-0.5deg)" },
    tapeA: { top: "18px", right: "24px", rotation: 5 },
    tapeB: { left: "22%", bottom: "18px", rotation: 1 },
  },
];

const paperTexture =
  'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.035\' numOctaves=\'5\' result=\'noise\'/%3E%3CfeDiffuseLighting in=\'noise\' lighting-color=\'%23F4EFE5\' surfaceScale=\'2.5\'%3E%3CfeDistantLight azimuth=\'315\' elevation=\'58\'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23paper)\' fill=\'%23f4efe5\'/%3E%3C/svg%3E")';

const grainTexture =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';

export function Experiments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const [selectedExperimentId, setSelectedExperimentId] = useState<number | null>(null);

  const selectedExperiment = useMemo(
    () => experiments.find((experiment) => experiment.id === selectedExperimentId) ?? null,
    [selectedExperimentId],
  );

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28 md:px-8" style={{ position: "relative" }}>
      <DeskBackground />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <div
            className="inline-flex items-center gap-2 border border-[rgba(63,53,42,0.18)] bg-[rgba(255,251,245,0.88)] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-stone-600 shadow-[0_6px_16px_rgba(42,30,19,0.07)]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span className="h-2 w-2 rounded-full bg-[#7d4b43]" />
            Desk Archive
          </div>
          <h2 className="mt-5 text-4xl leading-tight text-stone-900 md:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Production proofs, printed studies, and archive folders.
          </h2>
          <p
            className="mt-4 max-w-2xl text-base leading-7 text-stone-600 md:text-lg"
            style={{ fontFamily: "'IBM Plex Serif', serif" }}
          >
            Projects are laid out like real materials on a desk: proof prints, sheet protectors, paper labels, and a side folder that opens for deeper process views.
          </p>
        </motion.div>

        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.25fr)_440px] xl:items-start">
          <div className="relative">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-12">
              {experiments.map((experiment, index) => {
                const layout = deskLayouts[index % deskLayouts.length];
                const isSelected = selectedExperimentId === experiment.id;

                return (
                  <motion.div
                    key={experiment.id}
                    initial={{ opacity: 0, y: 36 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className={`relative ${layout.cardClassName}`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedExperimentId(experiment.id)}
                      data-cursor="hover"
                      className="group block w-full text-left"
                      style={{ cursor: "pointer" }}
                    >
                      <ExperimentArtifact experiment={experiment} layout={layout} index={index} isSelected={isSelected} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="xl:sticky xl:top-28">
            <SideFolder experiment={selectedExperiment} onClose={() => setSelectedExperimentId(null)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DeskBackground() {
  return (
    <>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,241,233,0.96) 0%, rgba(236,230,220,0.98) 54%, rgba(225,218,207,0.97) 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.84]"
        style={{ backgroundImage: paperTexture, backgroundSize: "220px 220px" }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: grainTexture, backgroundSize: "320px 320px" }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 14% 10%, rgba(255,255,255,0.58), transparent 26%), radial-gradient(circle at 86% 76%, rgba(105,87,66,0.1), transparent 34%)",
        }}
      />
    </>
  );
}

function ExperimentArtifact({
  experiment,
  layout,
  index,
  isSelected,
}: {
  experiment: (typeof experiments)[number];
  layout: (typeof deskLayouts)[number];
  index: number;
  isSelected: boolean;
}) {
  const Icon = experiment.icon;

  return (
    <motion.div
      animate={{
        y: isSelected ? -8 : 0,
        rotate: isSelected ? 0 : undefined,
        scale: isSelected ? 1.01 : 1,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="relative"
      style={{ height: layout.cardHeight, ...layout.wrapperStyle, transformStyle: "preserve-3d" }}
    >
      <PaperLayer
        className="absolute inset-0 rounded-[18px] border border-[rgba(89,76,59,0.08)] bg-[rgba(211,204,194,0.52)]"
        style={{
          ...layout.shadowStyle,
          boxShadow: "0 28px 42px rgba(46, 34, 24, 0.12)",
        }}
      />
      <PaperLayer
        className="absolute inset-0 rounded-[18px] border border-[rgba(110,95,78,0.1)] bg-[rgba(237,232,223,0.76)]"
        style={{
          ...layout.backingStyle,
          boxShadow: "0 16px 26px rgba(46, 34, 24, 0.09)",
        }}
      />

      <div
        className="relative h-full overflow-hidden rounded-[18px] border border-[rgba(79,67,53,0.18)] bg-[linear-gradient(180deg,rgba(248,244,236,0.98),rgba(238,232,222,0.98))]"
        style={{
          boxShadow: isSelected
            ? "0 34px 62px rgba(38,29,20,0.2), 0 1px 0 rgba(255,255,255,0.76) inset"
            : "0 24px 44px rgba(38,29,20,0.14), 0 1px 0 rgba(255,255,255,0.76) inset",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{ backgroundImage: paperTexture, backgroundSize: "220px 220px" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{ backgroundImage: grainTexture, backgroundSize: "280px 280px" }}
        />

        <div className="pointer-events-none absolute left-0 top-0 h-full w-[24px] border-r border-[rgba(79,67,53,0.14)] bg-[linear-gradient(180deg,rgba(216,209,198,0.92),rgba(198,189,176,0.78))]">
          <div className="flex h-full flex-col items-center justify-evenly py-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-2.5 w-1.5 rounded-full bg-[rgba(58,48,39,0.4)]" />
            ))}
          </div>
        </div>

        <div className="absolute inset-x-[34px] top-[30px] bottom-[108px]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[14px] border border-[rgba(70,59,48,0.18)] bg-[rgba(251,249,244,0.92)] p-3"
            style={{
              ...layout.photoStyle,
              boxShadow: "0 20px 28px rgba(34,25,18,0.16), 0 1px 0 rgba(255,255,255,0.78) inset",
            }}
          >
            <div className="relative h-full overflow-hidden border border-[rgba(67,56,46,0.12)] bg-[#ebe6dd]">
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.45 }}
                className="h-full w-full"
              >
                <ImageWithFallback src={experiment.image} alt={experiment.title} className="h-full w-full object-cover" />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_28%,rgba(43,33,22,0.05)_100%)]" />
            </div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.24em] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                proof print
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-stone-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                no. {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div
              className="pointer-events-none absolute right-[7%] top-[8%] h-[30%] w-[32%] border border-[rgba(255,255,255,0.56)] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03))]"
              style={{
                boxShadow: "0 8px 14px rgba(24,18,13,0.05), inset 0 0 0 1px rgba(255,255,255,0.18)",
                backdropFilter: "blur(0.3px)",
              }}
            >
              <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply" style={{ backgroundImage: grainTexture, backgroundSize: "220px 220px" }} />
            </div>
          </div>

          <TapeStrip style={layout.tapeA} />
          <TapeStrip style={layout.tapeB} />

          <MetadataSlip year={experiment.year} title={experiment.title} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 pl-[36px]">
          <div
            className="relative border border-[rgba(80,69,57,0.14)] bg-[rgba(253,250,244,0.9)] px-4 pb-4 pt-3"
            style={{ boxShadow: "0 10px 18px rgba(41,30,20,0.07)" }}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(80,69,57,0.14)] bg-[rgba(246,242,236,0.96)]"
                  style={{ boxShadow: "0 6px 14px rgba(41,30,20,0.08)" }}
                >
                  <Icon className="h-4.5 w-4.5 text-[#5f4c3c]" />
                </div>
                <span
                  className="border border-[rgba(125,75,67,0.16)] bg-[rgba(125,75,67,0.08)] px-2 py-1 text-[9px] uppercase tracking-[0.22em] text-[#7d4b43]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  file open
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.18em] text-stone-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                click to inspect
              </span>
            </div>

            <h3 className="text-[1.7rem] leading-none text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              {experiment.title}
            </h3>
            <motion.div
              animate={{ scaleX: isSelected ? 1 : 0.55, opacity: isSelected ? 1 : 0.62 }}
              transition={{ duration: 0.35 }}
              className="mt-2 h-[2px] origin-left bg-[#7d4b43]"
            />
            <p className="mt-3 text-[13px] leading-6 text-stone-600" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
              {experiment.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SideFolder({
  experiment,
  onClose,
}: {
  experiment: (typeof experiments)[number] | null;
  onClose: () => void;
}) {
  return (
    <div className="relative min-h-[560px]">
      <AnimatePresence mode="wait">
        {experiment ? (
          <motion.div
            key={experiment.id}
            initial={{ opacity: 0, x: 38, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 28, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative"
          >
            <div
              className="absolute left-0 top-14 h-[82%] w-7 rounded-l-[14px] border border-r-0 border-[rgba(84,66,45,0.22)] bg-[linear-gradient(180deg,#c49a62,#9a7346)]"
              style={{ transform: "translateX(-22px)", boxShadow: "-8px 14px 18px rgba(39, 28, 18, 0.14)" }}
            />
            <div
              className="absolute inset-x-[8%] top-0 h-16 rounded-t-[14px] border border-[rgba(84,66,45,0.22)] bg-[linear-gradient(180deg,#caa46b,#9a7346)]"
              style={{ transform: "translateY(-14px)", boxShadow: "0 14px 18px rgba(39, 28, 18, 0.12)" }}
            />

            <div
              className="relative overflow-hidden rounded-[18px] border border-[rgba(74,61,48,0.2)] bg-[linear-gradient(180deg,rgba(244,238,228,0.99),rgba(232,224,213,0.99))] p-5 md:p-6"
              style={{
                boxShadow: "0 34px 64px rgba(22, 17, 12, 0.2), 0 1px 0 rgba(255,255,255,0.74) inset",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
                style={{ backgroundImage: paperTexture, backgroundSize: "220px 220px" }}
              />

              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div
                      className="inline-flex items-center gap-2 border border-[rgba(84,66,45,0.18)] bg-[rgba(255,252,247,0.82)] px-2.5 py-1 text-[9px] uppercase tracking-[0.24em] text-[#7d4b43]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      Open Folder
                    </div>
                    <h3 className="mt-3 text-3xl leading-tight text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {experiment.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
                      {experiment.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="border border-[rgba(74,61,48,0.14)] bg-[rgba(255,251,246,0.9)] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-stone-500"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    close
                  </button>
                </div>

                <div
                  className="relative overflow-hidden border border-[rgba(76,64,52,0.16)] bg-[rgba(255,255,255,0.5)] p-4"
                  style={{ boxShadow: "0 18px 26px rgba(39, 28, 18, 0.08)" }}
                >
                  <div className="absolute right-5 top-5 h-16 w-16 border border-[rgba(255,255,255,0.48)] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))]" />
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="relative border border-[rgba(73,62,53,0.14)] bg-[rgba(253,250,245,0.94)] p-2.5"
                        style={{ boxShadow: "0 10px 16px rgba(41,30,20,0.08)" }}
                      >
                        <div className="aspect-[4/3] overflow-hidden border border-[rgba(70,58,46,0.12)] bg-[#e9e2d8]">
                          <ImageWithFallback
                            src={experiment.image}
                            alt={`${experiment.title} progress ${item + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                            progress {String(item + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[9px] uppercase tracking-[0.16em] text-stone-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                            sheet
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      metadata
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {experiment.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[rgba(73,62,53,0.14)] bg-[rgba(255,251,245,0.88)] px-2.5 py-1 text-[11px] text-stone-700"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={experiment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-[rgba(26,22,18,0.08)] bg-[#231d19] px-5 py-3 text-[11px] uppercase tracking-[0.24em] text-stone-100 shadow-[0_12px_22px_rgba(24,18,14,0.18)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[0_16px_28px_rgba(24,18,14,0.24)]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Launch Project
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="folder-placeholder"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="relative pt-10"
          >
            <div
              className="absolute left-0 top-20 h-[74%] w-7 rounded-l-[14px] border border-r-0 border-[rgba(84,66,45,0.18)] bg-[linear-gradient(180deg,#c49a62,#9a7346)]"
              style={{ transform: "translateX(-22px)", boxShadow: "-8px 14px 18px rgba(39, 28, 18, 0.12)" }}
            />
            <div
              className="absolute inset-x-[12%] top-0 h-14 rounded-t-[14px] border border-[rgba(84,66,45,0.18)] bg-[linear-gradient(180deg,#caa46b,#9a7346)]"
              style={{ transform: "translateY(-10px)" }}
            />
            <div
              className="relative border border-[rgba(74,61,48,0.18)] bg-[linear-gradient(180deg,rgba(242,236,226,0.99),rgba(232,224,213,0.99))] p-6"
              style={{ boxShadow: "0 30px 58px rgba(22,17,12,0.16)" }}
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#7d4b43]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Side Folder
              </div>
              <h3 className="mt-3 text-3xl text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Open a project file
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-600" style={{ fontFamily: "'IBM Plex Serif', serif" }}>
                Click any proof print on the desk to pull its folder open here. The project link stays separate, so browsing the archive never throws you out of the page.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PaperLayer({
  className,
  style,
}: {
  className: string;
  style: CSSProperties;
}) {
  return <div aria-hidden="true" className={`pointer-events-none ${className}`} style={style} />;
}

function MetadataSlip({
  title,
  year,
}: {
  title: string;
  year: string;
}) {
  return (
    <div
      className="pointer-events-none absolute right-[16px] top-[16px] z-20 max-w-[150px] border border-[rgba(93,78,62,0.16)] bg-[rgba(251,247,241,0.96)] px-3 py-2 shadow-[0_10px_20px_rgba(42,32,24,0.12)]"
      style={{ transform: "rotate(-2deg)" }}
    >
      <div className="text-[9px] uppercase tracking-[0.22em] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        file date
      </div>
      <div className="mt-1 text-sm text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>
        {year}
      </div>
      <div className="mt-2 border-t border-[rgba(93,78,62,0.12)] pt-2 text-[10px] uppercase tracking-[0.18em] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {title}
      </div>
    </div>
  );
}

function TapeStrip({
  style,
}: {
  style: { top?: string; right?: string; bottom?: string; left?: string; rotation: number };
}) {
  const { rotation, ...positionStyle } = style;

  return (
    <div
      className="pointer-events-none absolute z-20 h-5 w-20 border border-[rgba(164,146,116,0.24)] bg-[linear-gradient(180deg,rgba(232,223,198,0.7),rgba(208,194,164,0.44))] shadow-[0_4px_10px_rgba(57,45,32,0.08)]"
      style={{
        ...positionStyle,
        transform: `rotate(${rotation}deg)`,
        clipPath: "polygon(5% 5%, 95% 0%, 100% 18%, 96% 100%, 4% 95%, 0% 8%)",
      }}
    />
  );
}
