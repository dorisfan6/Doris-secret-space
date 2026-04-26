import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Camera, Code2, Shapes, Sparkles, Wand2 } from "lucide-react";
import {
  ArchiveFolder,
  BinderSleeve,
  ClipDetail,
  DeskSurface,
  FolderTab,
  MetadataLabel,
  PaperInsert,
  PrintedPhoto,
  TapeTab,
  VellumOverlay,
} from "./archive-objects/primitives";
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
    baseClassName: "lg:col-span-4 lg:mt-8",
    openClassName: "lg:col-span-8 lg:mt-8",
    minHeight: "470px",
    rotation: -2.2,
    paperRotation: -1.5,
    photoRotation: -2.4,
    tabAlign: "left",
    tapeA: { top: "18px", left: "22px", rotation: -5 },
    tapeB: { top: "54%", right: "-8px", rotation: 90 },
  },
  {
    baseClassName: "lg:col-span-3 lg:mt-28",
    openClassName: "lg:col-span-9 lg:mt-20",
    minHeight: "500px",
    rotation: 1.4,
    paperRotation: 0.8,
    photoRotation: 1.7,
    tabAlign: "right",
    tapeA: { top: "18px", right: "18px", rotation: 4 },
    tapeB: { left: "-8px", bottom: "104px", rotation: -90 },
  },
  {
    baseClassName: "lg:col-span-5 lg:-mt-8",
    openClassName: "lg:col-span-8 lg:-mt-8",
    minHeight: "446px",
    rotation: -0.8,
    paperRotation: -0.4,
    photoRotation: -1.1,
    tabAlign: "left",
    tapeA: { top: "18px", left: "24%", rotation: -1 },
    tapeB: { right: "16%", bottom: "18px", rotation: 2 },
  },
  {
    baseClassName: "lg:col-span-4 lg:-mt-14",
    openClassName: "lg:col-span-8 lg:-mt-12",
    minHeight: "490px",
    rotation: 1.2,
    paperRotation: 0.5,
    photoRotation: 1.4,
    tabAlign: "right",
    tapeA: { top: "18px", left: "20px", rotation: -4 },
    tapeB: { right: "-8px", top: "48%", rotation: 90 },
  },
  {
    baseClassName: "lg:col-span-4 lg:ml-10 lg:-mt-2",
    openClassName: "lg:col-span-8 lg:ml-0",
    minHeight: "458px",
    rotation: -1.1,
    paperRotation: -0.5,
    photoRotation: -1.6,
    tabAlign: "left",
    tapeA: { top: "18px", right: "22px", rotation: 5 },
    tapeB: { left: "20%", bottom: "18px", rotation: 1 },
  },
];

export function Experiments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const [selectedExperimentId, setSelectedExperimentId] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28 md:px-8">
      <DeskSurface className="absolute inset-0 -z-10" />

      <div className="relative z-10 mx-auto max-w-[1540px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 max-w-3xl"
        >
          <div className="archive-meta inline-flex items-center gap-2 border border-[rgba(63,53,42,0.18)] bg-[rgba(255,251,245,0.88)] px-3 py-1.5 text-[10px] shadow-[var(--archive-shadow-label)]">
            <span className="h-2 w-2 rounded-full bg-[var(--archive-stamp-red)]" />
            Desk Archive
          </div>
          <h2 className="archive-title mt-5 text-4xl leading-tight md:text-6xl">
            Production proofs, contact sheets, and opened project files.
          </h2>
          <p className="archive-body mt-4 max-w-2xl text-base leading-7 md:text-lg">
            Each project is treated like a physical archive object: proof prints, binder sleeves, typed labels, tape notes, and a folder that unfolds on the desk when opened.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {experiments.map((experiment, index) => {
            const layout = deskLayouts[index % deskLayouts.length];
            const isSelected = selectedExperimentId === experiment.id;

            return (
              <motion.article
                key={experiment.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className={`relative ${isSelected ? layout.openClassName : layout.baseClassName}`}
              >
                <ExperimentArtifact
                  experiment={experiment}
                  layout={layout}
                  index={index}
                  isSelected={isSelected}
                  onSelect={() => setSelectedExperimentId(isSelected ? null : experiment.id)}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperimentArtifact({
  experiment,
  layout,
  index,
  isSelected,
  onSelect,
}: {
  experiment: (typeof experiments)[number];
  layout: (typeof deskLayouts)[number];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = experiment.icon;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 210, damping: 26 }}
      className="relative"
      style={{ transform: `rotate(${layout.rotation}deg)` }}
    >
      <button
        type="button"
        onClick={onSelect}
        data-cursor="hover"
        className="group block w-full text-left"
        style={{ cursor: "pointer" }}
      >
        <motion.div
          whileHover={{ y: -7, rotate: layout.rotation + (index % 2 === 0 ? 0.2 : -0.2), scale: 1.008 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <ArchiveFolder className="rounded-[18px] p-5 md:p-6" >
            <FolderTab
              className={`absolute top-0 h-12 w-28 rounded-t-[12px] ${layout.tabAlign === "right" ? "right-[14%]" : "left-[14%]"}`}
              style={{ transform: "translateY(-12px)" }}
            />

            <PaperInsert
              className="pointer-events-none absolute inset-x-4 top-4 bottom-4 rounded-[18px] opacity-80"
              style={{ transform: `translate(10px, 12px) rotate(${layout.paperRotation}deg)` }}
            >
              <div />
            </PaperInsert>

            <ClipDetail
              className="left-1/2 top-0 h-8 w-28 -translate-x-1/2 -translate-y-3"
              style={{ borderWidth: "2.5px" }}
            />

            <div className="desk-hole-strip rounded-l-[18px]">
              <div className="flex h-full flex-col items-center justify-evenly py-5">
                {Array.from({ length: 12 }).map((_, holeIndex) => (
                  <div key={holeIndex} className="h-2.5 w-1.5 rounded-full bg-[rgba(58,48,39,0.38)]" />
                ))}
              </div>
            </div>

            <div className="relative ml-6">
              <PrintedPhoto
                className="relative overflow-hidden rounded-[14px] p-3"
                style={{
                  minHeight: isSelected ? "336px" : layout.minHeight,
                  transform: `rotate(${layout.photoRotation}deg)`,
                }}
              >
                <div className="relative h-full overflow-hidden border border-[var(--archive-photo-border)] bg-[#ebe4da]">
                  <motion.div
                    className="h-full w-full"
                    whileHover={{ scale: 1.045 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageWithFallback src={experiment.image} alt={experiment.title} className="h-full w-full object-cover" />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%,rgba(40,30,20,0.06)_100%)]" />
                </div>

                <BinderSleeve className="right-[7%] top-[8%] h-[31%] w-[31%]" />

                <TapeStrip placement={layout.tapeA} />
                <TapeStrip placement={layout.tapeB} />

                <MetadataNote title={experiment.title} year={experiment.year} />

                <div className="archive-filedate absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px]">
                  <span>proof print</span>
                  <span>no. {String(index + 1).padStart(2, "0")}</span>
                </div>
              </PrintedPhoto>

              <PaperInsert className="relative mt-5 rounded-[16px] px-4 pb-4 pt-3">
                <VellumOverlay className="right-4 top-3 h-10 w-16" />
                <div className="relative z-10">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(80,69,57,0.14)] bg-[rgba(246,242,236,0.96)]"
                        style={{ boxShadow: "var(--archive-shadow-label)" }}
                      >
                        <Icon className="h-[18px] w-[18px] text-[#5f4c3c]" />
                      </div>
                      <span className="archive-meta border border-[rgba(138,79,72,0.16)] bg-[rgba(138,79,72,0.08)] px-2 py-1 text-[9px] text-[var(--archive-stamp-red)]">
                        {isSelected ? "folder open" : "click to open"}
                      </span>
                    </div>
                    <span className="archive-filedate text-[9px]">launch stays separate</span>
                  </div>

                  <h3 className="archive-title text-[1.8rem] leading-none">{experiment.title}</h3>
                  <motion.div
                    animate={{ scaleX: isSelected ? 1 : 0.56, opacity: isSelected ? 1 : 0.66 }}
                    transition={{ duration: 0.28 }}
                    className="mt-2 h-[2px] origin-left bg-[var(--archive-stamp-red)]"
                  />
                  <p className="archive-body mt-3 text-[13px] leading-6">{experiment.description}</p>
                </div>
              </PaperInsert>
            </div>
          </ArchiveFolder>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isSelected ? (
          <motion.div
            key="open-folder"
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="relative ml-6 mt-5"
          >
            <OpenArchiveFolder experiment={experiment} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function OpenArchiveFolder({
  experiment,
}: {
  experiment: (typeof experiments)[number];
}) {
  return (
    <ArchiveFolder className="rounded-[18px] p-5 md:p-6">
      <FolderTab className="absolute left-[10%] top-0 h-12 w-32 rounded-t-[12px]" style={{ transform: "translateY(-12px)" }} />
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <PaperInsert className="relative rounded-[16px] p-4">
          <ClipDetail className="left-12 top-0 h-8 w-24 -translate-y-3" />
          <div className="mb-3 flex items-center justify-between">
            <span className="archive-meta text-[9px]">contact sheet</span>
            <span className="archive-filedate text-[9px]">process views</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((item) => (
              <PrintedPhoto key={item} className="overflow-hidden rounded-[12px] p-2.5">
                <div className="aspect-[4/3] overflow-hidden border border-[var(--archive-photo-border)] bg-[#ebe4da]">
                  <ImageWithFallback
                    src={experiment.image}
                    alt={`${experiment.title} progress ${item + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="archive-filedate mt-2 flex items-center justify-between text-[9px]">
                  <span>progress {String(item + 1).padStart(2, "0")}</span>
                  <span>sheet</span>
                </div>
              </PrintedPhoto>
            ))}
          </div>
        </PaperInsert>

        <div className="space-y-5">
          <PaperInsert className="rounded-[16px] p-4">
            <div className="archive-meta text-[9px]">metadata</div>
            <p className="archive-body mt-3 text-sm leading-6">
              A folder opened on the desk, with contact sheets, notes, and room for deeper progress material without leaving the archive view.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {experiment.tags.map((tag, index) => (
                <MetadataLabel
                  key={tag}
                  className="px-2.5 py-1"
                  style={{ transform: `rotate(${index % 2 === 0 ? -1 : 0.8}deg)` }}
                >
                  <span className="archive-filedate text-[10px] text-[var(--archive-ink-charcoal)]">{tag}</span>
                </MetadataLabel>
              ))}
            </div>
          </PaperInsert>

          <PaperInsert className="rounded-[16px] p-4">
            <div className="archive-meta text-[9px]">external link</div>
            <p className="archive-body mt-3 text-sm leading-6">
              Inspect first, then decide to leave the desk. The project link stays separate from the folder-open interaction.
            </p>
            <a
              href={experiment.link}
              target="_blank"
              rel="noopener noreferrer"
              className="archive-meta mt-5 inline-flex w-full items-center justify-center border border-[rgba(26,22,18,0.08)] bg-[var(--archive-charcoal)] px-5 py-3 text-[11px] text-stone-100 shadow-[0_12px_22px_rgba(24,18,14,0.18)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[0_16px_28px_rgba(24,18,14,0.24)]"
            >
              Launch Project
            </a>
          </PaperInsert>
        </div>
      </div>
    </ArchiveFolder>
  );
}

function MetadataNote({
  title,
  year,
}: {
  title: string;
  year: string;
}) {
  return (
    <MetadataLabel className="pointer-events-none absolute right-[16px] top-[16px] z-20 max-w-[160px] px-3 py-2" style={{ transform: "rotate(-2deg)" }}>
      <div className="archive-filedate text-[9px]">file date</div>
      <div className="archive-title mt-1 text-sm">{year}</div>
      <div className="archive-filedate mt-2 border-t border-[rgba(93,78,62,0.12)] pt-2 text-[10px]">
        {title}
      </div>
    </MetadataLabel>
  );
}

function TapeStrip({
  placement,
}: {
  placement: { top?: string; right?: string; bottom?: string; left?: string; rotation: number };
}) {
  const { rotation, ...positionStyle } = placement;

  return (
    <TapeTab
      className="h-5 w-20"
      style={{
        ...positionStyle,
        transform: `rotate(${rotation}deg)`,
        clipPath: "polygon(5% 5%, 95% 0%, 100% 18%, 96% 100%, 4% 95%, 0% 8%)",
      }}
    />
  );
}
