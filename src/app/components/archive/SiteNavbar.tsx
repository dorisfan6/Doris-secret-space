import { motion } from "motion/react";

import { cn } from "../ui/utils";
import { TextureOverlay } from "./TextureOverlay";

type SiteNavbarProps = {
  headerVisible: boolean;
  items: Array<{ id: string; label: string }>;
};

export function SiteNavbar({ headerVisible, items }: SiteNavbarProps) {
  return (
    <>
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{
          x: headerVisible ? 0 : -30,
          opacity: headerVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-8 left-6 z-50 md:left-8"
        style={{ cursor: "none" }}
      >
        <motion.div
          className="paper-panel relative min-w-[110px] px-5 py-4 shadow-[var(--archive-shadow-soft)] [clip-path:polygon(0.8%_1%,99%_0%,100%_2.4%,100%_98.6%,98.5%_100%,2.1%_100%,0%_97%)]"
          whileHover={{ y: -2, rotate: 1.5, scale: 1.02 }}
          data-cursor="hover"
        >
          <TextureOverlay variant="paper" opacityClassName="opacity-[0.08]" />
          <div className="absolute right-4 top-[-10px] h-7 w-12 rotate-[8deg] border border-[rgba(138,75,67,0.16)] bg-[rgba(138,75,67,0.1)]" />
          <div className="relative z-10">
            <div className="archive-meta text-[10px] text-[var(--archive-red)]">Dossier</div>
            <div className="archive-display text-4xl leading-none">DF</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.nav
        initial={{ x: 30, opacity: 0 }}
        animate={{
          x: headerVisible ? 0 : 30,
          opacity: headerVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed right-6 top-8 z-50 hidden items-center gap-3 md:flex"
        style={{ cursor: "none" }}
      >
        {items.map((item, index) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            data-cursor="hover"
            className={cn(
              "relative overflow-hidden rounded-full border px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase",
              "border-[var(--archive-line)] bg-[rgba(255,252,246,0.76)] text-[var(--archive-muted)] backdrop-blur-md",
            )}
            whileHover={{ y: -2, color: "var(--archive-ink)" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + index * 0.06 }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="archive-meta relative z-10 text-[10px] normal-case tracking-[0.18em]">
              {item.label}
            </span>
            <motion.div
              className="absolute inset-x-3 bottom-2 h-px origin-left bg-[var(--archive-red)]"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.22 }}
            />
          </motion.a>
        ))}
      </motion.nav>
    </>
  );
}
