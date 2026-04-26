import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Linkedin, FileText, Send, ArrowUpRight } from "lucide-react";

import { ArchiveButton } from "./archive/ArchiveButton";
import { ArchiveCard } from "./archive/ArchiveCard";
import { PaperPanel } from "./archive/PaperPanel";
import { SectionHeader } from "./archive/SectionHeader";
import { TextureOverlay } from "./archive/TextureOverlay";

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
    <section ref={ref} className="relative overflow-hidden bg-transparent px-8 py-32" style={{ position: "relative" }}>
      <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-[12%] top-[18%] h-[440px] w-[440px] rounded-full bg-[var(--archive-red-soft)] blur-[120px]"
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
          className="absolute bottom-[12%] right-[10%] h-[520px] w-[520px] rounded-full bg-[rgba(56,51,45,0.12)] blur-[130px]"
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
          <SectionHeader
            eyebrow="Contact File"
            title={
              <>
                Got an idea
                <span className="archive-display ml-4 inline-block text-[var(--archive-red)]">for the archive?</span>
              </>
            }
            subtitle="Let's build something thoughtful, tactile, and memorable together."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group mx-auto max-w-[980px]"
        >
          <motion.div
            className="absolute -inset-6 bg-[var(--archive-accent-soft)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          />

          <div className="absolute left-5 top-8 right-[-12px] h-full rounded-[34px] border border-[var(--archive-line)] bg-[rgba(85,77,69,0.08)] shadow-[var(--archive-shadow-soft)]"
            style={{ transform: "rotate(1.4deg)" }}
          />

          <div className="absolute inset-x-14 top-2 z-30 mx-auto h-8 w-44 rounded-b-[16px] border border-[rgba(0,0,0,0.18)] bg-[linear-gradient(180deg,#2d2823,#171411)] shadow-[0_12px_24px_rgba(0,0,0,0.22)]" />

          <PaperPanel
            className="relative rounded-[34px] border-[var(--archive-line-strong)] px-6 pb-8 pt-14 md:px-12 md:pb-12 md:pt-[4.5rem]"
            clip="notched"
          >
            <TextureOverlay variant="paper" opacityClassName="opacity-[0.08]" />
            <div className="absolute right-8 top-6 z-20 rotate-[7deg] border border-[rgba(138,75,67,0.18)] bg-[rgba(138,75,67,0.08)] px-4 py-1.5">
              <span className="archive-meta text-[10px] text-[var(--archive-red)]">Open File</span>
            </div>

            <div className="relative z-10">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="mb-8 border-b archive-divider pb-6">
                    <p className="archive-meta text-[11px] text-[var(--archive-red)]">Communication Dossier</p>
                    <p className="archive-serif mt-4 text-lg leading-8 text-[var(--archive-body)] md:text-xl">
                      Whether you want to collaborate on a project, shape a visual system, or compare notes on film,
                      editing, and digital storytelling, I am always open to meaningful correspondence.
                    </p>
                  </div>

                  <motion.div
                    className="relative mb-8"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PaperPanel
                      variant="vellum"
                      className="rounded-[22px] border-[var(--archive-line)] p-2 shadow-[var(--archive-shadow-soft)]"
                    >
                      <div className="absolute left-6 top-[-12px] h-8 w-16 rotate-[-3deg] border border-[rgba(107,90,71,0.14)] bg-[rgba(107,90,71,0.09)]" />
                      <div className="relative z-10 flex items-center gap-4 rounded-[18px] border border-[rgba(68,59,49,0.08)] bg-[rgba(255,251,244,0.72)] px-4 py-3">
                        <Mail className="ml-1 w-5 h-5 text-[var(--archive-red)]" />
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="archive-script flex-1 bg-transparent py-3 text-lg text-[var(--archive-ink)] placeholder:text-[var(--archive-muted)] outline-none"
                        />
                        <ArchiveButton
                          data-cursor="hover"
                          whileHover={{
                            scale: 1.05,
                            y: -1,
                            boxShadow: "0 16px 30px rgba(17, 13, 10, 0.22)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Get in Touch</span>
                          <Send className="w-4 h-4" />
                        </ArchiveButton>
                      </div>
                    </PaperPanel>
                  </motion.div>

                  <div className="relative mb-7">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t archive-divider border-dashed"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="archive-script bg-[var(--archive-paper-strong)] px-4 text-sm text-[var(--archive-muted)]">
                        or find me on
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 relative z-10">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                          data-cursor="hover"
                          initial={{ opacity: 0, y: 20, rotate: 0 }}
                          animate={isInView ? {
                            opacity: 1,
                            y: 0,
                            rotate: index % 2 === 0 ? -1.1 : 1.1,
                          } : {}}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          onHoverStart={() => setHoveredSocial(index)}
                          onHoverEnd={() => setHoveredSocial(null)}
                          whileHover={{ y: -6, rotate: 0 }}
                          className="relative"
                          style={{ cursor: "pointer" }}
                        >
                          <ArchiveCard className="h-full rounded-[22px] p-5">
                            <TextureOverlay variant="paper" opacityClassName="opacity-[0.05]" />
                            <motion.div
                              className="absolute inset-0 rounded-[22px] bg-[var(--archive-red-soft)]"
                              animate={{ opacity: hoveredSocial === index ? 0.55 : 0 }}
                              transition={{ duration: 0.3 }}
                            />
                            <div className="relative z-10 flex h-full flex-col gap-4">
                              <div className="flex items-start justify-between">
                                <motion.div
                                  animate={{
                                    rotate: hoveredSocial === index ? 10 : 0,
                                    scale: hoveredSocial === index ? 1.15 : 1,
                                  }}
                                  transition={{ duration: 0.4, type: "spring" }}
                                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--archive-line)] bg-[rgba(255,255,255,0.7)] text-[var(--archive-ink)]"
                                >
                                  <Icon className="w-5 h-5" />
                                </motion.div>
                                <ArrowUpRight className="w-4 h-4 text-[var(--archive-muted)]" />
                              </div>

                              <div>
                                <div className="archive-meta text-[10px]">Channel {String(index + 1).padStart(2, "0")}</div>
                                <span className="archive-serif mt-2 block text-lg text-[var(--archive-ink)]">
                                  {social.label}
                                </span>
                              </div>

                              {hoveredSocial === index && (
                                <>
                                  {[...Array(4)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute h-1 w-1 rounded-full bg-[var(--archive-red)]"
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
                                      style={{ left: "50%", top: "48%" }}
                                    />
                                  ))}
                                </>
                              )}
                            </div>
                          </ArchiveCard>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                <div className="relative">
                  <PaperPanel
                    variant="vellum"
                    className="relative rounded-[28px] border-[rgba(68,59,49,0.12)] p-6"
                  >
                    <TextureOverlay variant="paper" opacityClassName="opacity-[0.06]" />
                    <div className="absolute left-6 top-[-8px] h-5 w-24 rotate-[-2deg] border border-[rgba(107,90,71,0.14)] bg-[rgba(107,90,71,0.08)]" />
                    <div className="relative z-10">
                      <div className="archive-meta text-[11px] text-[var(--archive-red)]">Desk Notes</div>
                      <div className="mt-6 space-y-5">
                        <ArchiveCard tilt="left" className="p-5">
                          <div className="archive-meta text-[10px]">Preferred Modes</div>
                          <p className="archive-serif mt-3 text-base leading-7 text-[var(--archive-body)]">
                            Creative direction, visual systems, film-minded interaction design, and digital storytelling.
                          </p>
                        </ArchiveCard>
                        <ArchiveCard tilt="right" className="p-5">
                          <div className="archive-meta text-[10px]">Working Tone</div>
                          <p className="archive-serif mt-3 text-base leading-7 text-[var(--archive-body)]">
                            Thoughtful, tactile, and cinematic. Built with layered paper, subtle motion, and editorial restraint.
                          </p>
                        </ArchiveCard>
                        <PaperPanel variant="dark" className="rounded-[24px] p-5">
                          <div className="archive-meta text-[10px] text-stone-400">Archive Stamp</div>
                          <p className="archive-display mt-4 text-3xl text-stone-100">Open for thoughtful collaborations.</p>
                          <p className="archive-meta mt-6 text-[10px] text-stone-500">
                            film / interaction / archive / editorial
                          </p>
                        </PaperPanel>
                      </div>
                    </div>
                  </PaperPanel>
                </div>
              </div>
            </div>
          </PaperPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="archive-script text-sm text-[var(--archive-muted)] mb-2">
            Designed & crafted with intention by Doris Fan
          </p>
          <p className="archive-meta text-[10px] text-[var(--archive-muted)]">
            © 2026 • Built with React, Tailwind, and Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
