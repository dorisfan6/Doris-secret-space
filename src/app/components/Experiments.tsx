import { motion, AnimatePresence, useInView, animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "Music Video Creation",
    description: "Wrote, directed and filmed the music video for artist C-Sky's new single 'Daisy'. Full production from concept to grade.",
    tags: ["DaVinci", "Camera Operation", "Directing"],
    year: "2026",
    link: "https://vimeo.com/1180991187",
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/Timeline%2042_00108828.png",
  },
  {
    id: 2,
    title: "APP UI Design",
    description: "Prototyped a socialized app from the ground up, designing the complete UI system across all interaction states.",
    tags: ["Figma", "Adobe Illustrator"],
    year: "2025",
    link: "https://www.figma.com/proto/hUkHQjzmgd9mDVomwECzr6/Interactive-Project?node-id=2001-2&p=f&t=JMv9vEwAuo3Rv5aX-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2001%3A2",
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen4.png",
  },
  {
    id: 3,
    title: "Atomic Tango",
    description: "Producer, Creative Advisor and Editor for USC professor Freddy Tran Nager's social media account. Strategy meets craft.",
    tags: ["Editing", "Producing", "Directing"],
    year: "2024",
    link: "https://xhslink.com/m/15cESrWTPV4",
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen3.png",
  },
  {
    id: 4,
    title: "Website Development",
    description: "Built a skincare research website with integrated API, database backend, and conversational interface.",
    tags: ["Vibe Coding", "API", "Database"],
    year: "2026",
    link: "https://skin-science-bot.lovable.app/",
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen2.png",
  },
  {
    id: 5,
    title: "Social Media Data Analysis",
    description: "Online mention volume analysis on K-pop group i-dle's performance, with benchmark comparison and ten-year trend overview.",
    tags: ["Data Analysis", "Brandwatch", "Creative Direction"],
    year: "2025",
    link: "https://tulane.box.com/s/1wzj6d9ygnq7nprue3tle52vofifrilu",
    image: "https://nmdzqrdfflnsqelxgxjz.supabase.co/storage/v1/object/public/dordor/screen1.png",
  },
];

// ─── LAYOUT CONSTANTS ────────────────────────────────────────────────────────

const STRIP_W = 300;      // film strip width, px
const FRAME_IMG_H = 224;  // project image height, px
const FRAME_INFO_H = 68;  // info bar height within the film strip, px
const FRAME_PERF_H = 20;  // sprocket perforation row height, px
const FRAME_H = FRAME_PERF_H * 2 + FRAME_IMG_H + FRAME_INFO_H; // 352px total

const PANEL_W = 220;   // hover description panel width, px
const PANEL_GAP = 32;  // gap between strip and description panel, px

// ─── VINTAGE CAMERA — MECHANICAL REDESIGN ────────────────────────────────────
// Emphasises gears, rollers, ventilation slots, screws, film gate, panel seams.
// No thick decorative outlines — depth from gradients and layered shapes only.

function VintageCamera({ spinning }: { spinning: boolean }) {
  const reelSpokes   = [0, 60, 120, 180, 240, 300];
  const gearTeeth    = Array.from({ length: 12 }, (_, i) => i);
  const rollerKnurls = Array.from({ length: 10 }, (_, i) => i);
  const ventSlots    = Array.from({ length: 7  }, (_, i) => i);
  const focusTicks   = Array.from({ length: 20 }, (_, i) => i);
  const dialTicks    = Array.from({ length: 8  }, (_, i) => i);

  // Screw positions: body corners + mid-body + lens ring
  const screws: [number, number, number][] = [
    [36, 138, 5], [224, 138, 5],
    [36, 264, 5], [224, 264, 5],
    [36, 201, 4], [224, 201, 4],
  ];

  return (
    <svg
      viewBox="0 0 260 358"
      className="w-44 md:w-56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter:
          "drop-shadow(0 16px 36px rgba(0,0,0,0.5)) drop-shadow(0 4px 10px rgba(0,0,0,0.3)) drop-shadow(0 0 1px rgba(255,245,200,0.04))",
      }}
    >
      <defs>
        {/* Micro-diamond leatherette (2×2 weave) */}
        <pattern id="vc-lth" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill="#191510" />
          <rect x="0" y="0" width="1.5" height="1.5" fill="#201b12" opacity="0.85" />
          <rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#201b12" opacity="0.85" />
        </pattern>
        {/* Chrome plate gradient */}
        <linearGradient id="vc-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7a7060" />
          <stop offset="30%"  stopColor="#565046" />
          <stop offset="80%"  stopColor="#32302a" />
          <stop offset="100%" stopColor="#22201c" />
        </linearGradient>
        {/* Side column gradient */}
        <linearGradient id="vc-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5e5a4c" />
          <stop offset="50%"  stopColor="#3a3830" />
          <stop offset="100%" stopColor="#242220" />
        </linearGradient>
        {/* Lens glass: deep spectral gradient */}
        <radialGradient id="vc-glass" cx="33%" cy="27%" r="72%">
          <stop offset="0%"   stopColor="#8098c8" stopOpacity="0.52" />
          <stop offset="25%"  stopColor="#3858a0" stopOpacity="0.72" />
          <stop offset="60%"  stopColor="#102040" stopOpacity="0.9"  />
          <stop offset="100%" stopColor="#040810"                     />
        </radialGradient>
        {/* Reel hub */}
        <radialGradient id="vc-hub" cx="42%" cy="38%" r="58%">
          <stop offset="0%"   stopColor="#5a5040" />
          <stop offset="60%"  stopColor="#2e2c24" />
          <stop offset="100%" stopColor="#141210" />
        </radialGradient>
        {/* Body face flat surface */}
        <linearGradient id="vc-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#232018" />
          <stop offset="100%" stopColor="#141210" />
        </linearGradient>
        {/* Gear metal */}
        <radialGradient id="vc-gear" cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#3a3630" />
          <stop offset="100%" stopColor="#12100e" />
        </radialGradient>
      </defs>

      {/* ── TOP HANDLE BAR ── */}
      <rect x="82" y="10" width="96" height="16" rx="7" fill="#2a2820" />
      <rect x="86" y="13" width="88" height="10" rx="5" fill="#1a1810" />
      {/* Handle screws */}
      {([90, 168] as number[]).map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="18" r="4" fill="#201e18" stroke="#38362e" strokeWidth="0.6" />
          <line x1={cx - 2.5} y1="18" x2={cx + 2.5} y2="18" stroke="#484438" strokeWidth="1.2" />
        </g>
      ))}

      {/* ── FILM REEL ── */}
      <g transform="translate(130, 72)">
        <motion.g
          style={{ transformOrigin: "0px 0px" }}
          animate={{ rotate: spinning ? 360 : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Outer rim — no stroke */}
          <circle r="54" fill="#0e0c08" />
          {/* Wound film layers — warm amber to dark */}
          <circle r="50" fill="none" stroke="#3e3018" strokeWidth="3.5" />
          <circle r="44" fill="none" stroke="#281e0c" strokeWidth="5.5" />
          <circle r="37" fill="none" stroke="#3a2a14" strokeWidth="4.5" />
          <circle r="30" fill="none" stroke="#241a0a" strokeWidth="4"   />
          <circle r="23" fill="none" stroke="#342618" strokeWidth="3"   />
          {/* Spokes */}
          {reelSpokes.map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <g key={i}>
                {/* Spoke shadow */}
                <line
                  x1={Math.cos(rad) * 13} y1={Math.sin(rad) * 13}
                  x2={Math.cos(rad) * 40} y2={Math.sin(rad) * 40}
                  stroke="#1a1810" strokeWidth="9" strokeLinecap="round"
                />
                {/* Spoke face */}
                <line
                  x1={Math.cos(rad) * 14} y1={Math.sin(rad) * 14}
                  x2={Math.cos(rad) * 39} y2={Math.sin(rad) * 39}
                  stroke="#30281c" strokeWidth="5" strokeLinecap="round"
                />
                {/* Spoke highlight edge */}
                <line
                  x1={Math.cos(rad) * 15} y1={Math.sin(rad) * 15}
                  x2={Math.cos(rad) * 38} y2={Math.sin(rad) * 38}
                  stroke="#3e3628" strokeWidth="2" strokeLinecap="round"
                />
              </g>
            );
          })}
          {/* Hub ring */}
          <circle r="13" fill="url(#vc-hub)" />
          <circle r="9"  fill="#181612" />
          <circle r="5"  fill="#222018" />
          {/* Hub slots (6 small notches for takeup) */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <rect
                key={i}
                x={-1.5} y={-9}
                width={3} height={4}
                rx={0.5}
                fill="#0c0a08"
                transform={`rotate(${deg})`}
              />
            );
          })}
          <circle r="3"  fill="#2a2620" />
          {/* Hub highlight */}
          <ellipse cx="-4" cy="-4" rx="4.5" ry="3" fill="white" opacity="0.09" transform="rotate(-25 -4 -4)" />
          {/* Outer rim edge */}
          <circle r="53" fill="none" stroke="#242018" strokeWidth="1" />
        </motion.g>
      </g>

      {/* Reel mounting post */}
      <rect x="122" y="122" width="16" height="20" rx="6" fill="#262420" />
      <rect x="126" y="124" width="8"  height="18" rx="4" fill="#1a1818" />

      {/* ── CAMERA BODY SHADOW ── */}
      <rect x="30" y="140" width="200" height="170" rx="6" fill="black" opacity="0.35" transform="translate(5 7)" />

      {/* ── CAMERA BODY ── */}
      {/* Main leatherette fill */}
      <rect x="30" y="140" width="200" height="170" rx="6" fill="url(#vc-lth)" />

      {/* Left side chrome column */}
      <rect x="30" y="156" width="18" height="138" fill="url(#vc-side)" />
      <rect x="30" y="156" width="8"  height="138" fill="#1e1c18" />

      {/* Right side chrome column */}
      <rect x="212" y="156" width="18" height="138" fill="url(#vc-side)" />
      <rect x="222" y="156" width="8"  height="138" fill="#1e1c18" />

      {/* Top chrome plate */}
      <rect x="30" y="140" width="200" height="18" rx="5" fill="url(#vc-chrome)" />
      {/* Top plate seam line */}
      <line x1="64" y1="149" x2="196" y2="149" stroke="#8a8070" strokeWidth="0.5" opacity="0.5" />

      {/* Bottom chrome plate */}
      <rect x="30" y="292" width="200" height="18" rx="5" fill="url(#vc-chrome)" />

      {/* Body face (flat surface between columns) */}
      <rect x="48" y="158" width="164" height="134" fill="url(#vc-face)" />

      {/* ── VENTILATION SLOTS (right column) ── */}
      {ventSlots.map((_, i) => (
        <g key={i}>
          {/* Slot recess shadow */}
          <rect x="213" y={181 + i * 13} width="16" height="4.5" rx="1" fill="#070606" />
          {/* Slot rim top highlight */}
          <line x1="213" y1={181 + i * 13} x2="229" y2={181 + i * 13} stroke="#2e2c24" strokeWidth="0.6" />
        </g>
      ))}

      {/* ── PANEL SEAM LINES (body face detail) ── */}
      <line x1="48" y1="228" x2="212" y2="228" stroke="#181614" strokeWidth="0.8" opacity="0.7" />
      {/* Vertical seam hint */}
      <line x1="130" y1="158" x2="130" y2="228" stroke="#181614" strokeWidth="0.5" opacity="0.3" />

      {/* ── CABLE RELEASE SOCKET (left column) ── */}
      <circle cx="39" cy="224" r="5.5" fill="#0e0c08" />
      <circle cx="39" cy="224" r="5.5" fill="none" stroke="#2a2820" strokeWidth="0.8" />
      <circle cx="39" cy="224" r="3.5" fill="#080706" />
      <circle cx="39" cy="224" r="1.8" fill="#141210" />
      <ellipse cx="37.5" cy="222.5" rx="1.5" ry="1" fill="white" opacity="0.08" />

      {/* ── LENS ASSEMBLY ── */}
      {/* Outer lens hood/filter ring */}
      <circle cx="130" cy="200" r="54" fill="#0a0908" />
      {/* Filter thread marks (diagonal hatching on outer ring) */}
      {Array.from({ length: 16 }, (_, i) => {
        const deg = i * 22.5;
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={130 + Math.cos(rad) * 49}
            y1={200 + Math.sin(rad) * 49}
            x2={130 + Math.cos(rad) * 52}
            y2={200 + Math.sin(rad) * 52}
            stroke="#1e1c16"
            strokeWidth="1.5"
          />
        );
      })}
      {/* Aperture/focus outer barrel */}
      <circle cx="130" cy="200" r="46" fill="#0c0a08" />
      {/* Focus ring ticks */}
      {focusTicks.map((_, i) => {
        const deg = i * 18;
        const rad = (deg * Math.PI) / 180;
        const isLong = i % 5 === 0;
        return (
          <line
            key={i}
            x1={130 + Math.cos(rad) * 42}
            y1={200 + Math.sin(rad) * 42}
            x2={130 + Math.cos(rad) * (isLong ? 45 : 43)}
            y2={200 + Math.sin(rad) * (isLong ? 45 : 43)}
            stroke="#2e2c22"
            strokeWidth={isLong ? 1.2 : 0.7}
          />
        );
      })}
      {/* Aperture numbers (6 positions) */}
      {["1.4", "2", "2.8", "4", "5.6", "8"].map((v, i) => {
        const deg = i * 60 - 90;
        const rad = (deg * Math.PI) / 180;
        return (
          <text
            key={i}
            x={130 + Math.cos(rad) * 39}
            y={200 + Math.sin(rad) * 39 + 3}
            textAnchor="middle"
            fill="#302c22"
            fontSize="4.5"
            fontFamily="'Courier New', monospace"
          >
            {v}
          </text>
        );
      })}
      {/* Inner lens barrel */}
      <circle cx="130" cy="200" r="36" fill="#090808" />
      {/* Glass element */}
      <circle cx="130" cy="200" r="30" fill="url(#vc-glass)" />
      {/* Recessed inner element */}
      <circle cx="130" cy="200" r="22" fill="#050810" stroke="#0c1420" strokeWidth="1.5" />
      {/* Aperture blades */}
      <circle cx="130" cy="200" r="15" fill="#030508" />
      {/* Deepest centre */}
      <circle cx="130" cy="200" r="7"  fill="#020304" />
      {/* Primary specular (large soft) */}
      <ellipse
        cx="113" cy="185"
        rx="11" ry="7"
        fill="white" opacity="0.18"
        transform="rotate(-28 113 185)"
      />
      {/* Secondary specular (crisp) */}
      <ellipse cx="143" cy="213" rx="4" ry="2.5" fill="white" opacity="0.05" />
      {/* Coating colour ring */}
      <circle cx="130" cy="200" r="28" fill="none" stroke="#3060a8" strokeWidth="0.6" opacity="0.18" />

      {/* ── VIEWFINDER ── */}
      <rect x="166" y="144" width="42" height="28" rx="3" fill="#060606" />
      <rect x="168" y="146" width="38" height="24" rx="2" fill="#0b0d1a" />
      <line x1="170" y1="148" x2="183" y2="148" stroke="white" strokeWidth="0.5" opacity="0.2" />
      {/* VF corner marks */}
      {([[170,148],[204,148],[170,168],[204,168]] as [number,number][]).map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx + (i % 2 === 0 ? 4 : -4)} y2={cy} stroke="#303040" strokeWidth="1" />
          <line x1={cx} y1={cy} x2={cx} y2={cy + (i < 2 ? 4 : -4)} stroke="#303040" strokeWidth="1" />
        </g>
      ))}

      {/* ── SHUTTER SPEED DIAL ── */}
      <circle cx="56" cy="150" r="15" fill="#121008" />
      <circle cx="56" cy="150" r="12" fill="#0c0a08" />
      {dialTicks.map((_, i) => {
        const rad = (i * 45 * Math.PI) / 180;
        return (
          <line key={i}
            x1={56 + Math.cos(rad) * 8}  y1={150 + Math.sin(rad) * 8}
            x2={56 + Math.cos(rad) * 12} y2={150 + Math.sin(rad) * 12}
            stroke="#302e24" strokeWidth="1.5"
          />
        );
      })}
      {/* Speed numbers at cardinal positions */}
      {(["1/500","1/250","1/125","B"] as string[]).map((v, i) => {
        const deg = i * 90 - 45;
        const rad = (deg * Math.PI) / 180;
        return (
          <text key={i}
            x={56 + Math.cos(rad) * 6.5}
            y={150 + Math.sin(rad) * 6.5 + 1.5}
            textAnchor="middle" fill="#282416" fontSize="2.8" fontFamily="monospace"
          >{v}</text>
        );
      })}
      <circle cx="56" cy="150" r="4"   fill="#504438" />
      <ellipse cx="52" cy="146" rx="4" ry="2.5" fill="white" opacity="0.08" transform="rotate(-30 52 146)" />

      {/* ── FILM ADVANCE LEVER (knurled) ── */}
      <rect x="160" y="141" width="7"  height="26" rx="3.5" fill="#3a3828" />
      <rect x="158" y="163" width="32" height="6"  rx="3"   fill="#3a3828" />
      <circle cx="190" cy="166" r="4" fill="#2a2820" />
      {/* Knurling on lever arm */}
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={i}
          x1={163} y1={146 + i * 3.5}
          x2={164.5} y2={145 + i * 3.5}
          stroke="#4a4838" strokeWidth="1"
        />
      ))}

      {/* ── FRAME COUNTER ── */}
      <rect x="168" y="170" width="38" height="26" rx="2" fill="#030303" />
      <rect x="170" y="172" width="34" height="22" rx="1" fill="#060604" />
      <text x="187" y="186" textAnchor="middle" fill="#b08028" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.95">05</text>
      {/* Counter window frame */}
      <rect x="168" y="170" width="38" height="26" rx="2" fill="none" stroke="#242018" strokeWidth="1" />

      {/* ── CORNER SCREWS + MID SCREWS ── */}
      {screws.map(([cx, cy, r], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r}   fill="#181612" />
          <circle cx={cx} cy={cy} r={r}   fill="none" stroke="#2e2c26" strokeWidth="0.8" />
          <line   x1={cx - r * 0.6} y1={cy} x2={cx + r * 0.6} y2={cy} stroke="#404030" strokeWidth="1.2" />
          <line   x1={cx} y1={cy - r * 0.6} x2={cx} y2={cy + r * 0.6} stroke="#404030" strokeWidth="1.2" />
          <ellipse cx={cx - 1.2} cy={cy - 1.2} rx={r * 0.45} ry={r * 0.3} fill="white" opacity="0.07" transform={`rotate(-20 ${cx - 1.2} ${cy - 1.2})`} />
        </g>
      ))}

      {/* ── BRAND ENGRAVING ── */}
      <text x="130" y="296" textAnchor="middle" fill="#28261e" fontSize="5" fontFamily="'Courier New', monospace" letterSpacing="3">DORIS FAN FILMS</text>

      {/* ── SPROCKET / FILM-ADVANCE GEAR (bottom-right, partially visible) ── */}
      <g transform="translate(224, 307)">
        {/* Gear body */}
        <circle r="20" fill="url(#vc-gear)" />
        {/* 12 teeth */}
        {gearTeeth.map((_, i) => (
          <g key={i} transform={`rotate(${i * 30})`}>
            <rect x="-3.5" y="-23" width="7" height="5.5" rx="0.8" fill="#242018" />
            {/* Tooth root fillet highlight */}
            <line x1="-3.5" y1="-23" x2="-3.5" y2="-20" stroke="#2e2c22" strokeWidth="0.7" />
          </g>
        ))}
        <circle r="16" fill="#0e0c0a" />
        <circle r="11" fill="#181614" />
        {/* Gear spoke detail */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={i}
              x1={Math.cos(rad) * 4.5} y1={Math.sin(rad) * 4.5}
              x2={Math.cos(rad) * 9}   y2={Math.sin(rad) * 9}
              stroke="#242218" strokeWidth="3.5" strokeLinecap="round"
            />
          );
        })}
        <circle r="5"   fill="#121010" />
        <circle r="2.5" fill="#1e1c18" />
        {/* Gear highlight */}
        <ellipse cx="-6" cy="-7" rx="7" ry="4" fill="white" opacity="0.08" transform="rotate(-25 -6 -7)" />
        {/* Partial reveal mask (gear is half-hidden behind camera edge) */}
        <rect x="14" y="-30" width="30" height="60" fill="#1a1810" opacity="0.85" />
      </g>

      {/* ── LEFT GUIDE ROLLER (flanking film gate) ── */}
      <g transform="translate(60, 307)">
        <circle r="13" fill="#141210" />
        {rollerKnurls.map((_, i) => {
          const rad = (i * 36 * Math.PI) / 180;
          return (
            <line key={i}
              x1={Math.cos(rad) * 9}  y1={Math.sin(rad) * 9}
              x2={Math.cos(rad) * 13} y2={Math.sin(rad) * 13}
              stroke="#1e1c16" strokeWidth="1.5" strokeLinecap="round"
            />
          );
        })}
        <circle r="8"   fill="#0e0c0a" />
        <circle r="4.5" fill="#181612" />
        <circle r="2.5" fill="#121010" />
        <ellipse cx="-4" cy="-4" rx="5" ry="3" fill="white" opacity="0.08" transform="rotate(-30 -4 -4)" />
        {/* Roller axle */}
        <circle r="1.2" fill="#2a2820" />
      </g>

      {/* ── RIGHT GUIDE ROLLER ── */}
      <g transform="translate(200, 307)">
        <circle r="13" fill="#141210" />
        {rollerKnurls.map((_, i) => {
          const rad = (i * 36 * Math.PI) / 180;
          return (
            <line key={i}
              x1={Math.cos(rad) * 9}  y1={Math.sin(rad) * 9}
              x2={Math.cos(rad) * 13} y2={Math.sin(rad) * 13}
              stroke="#1e1c16" strokeWidth="1.5" strokeLinecap="round"
            />
          );
        })}
        <circle r="8"   fill="#0e0c0a" />
        <circle r="4.5" fill="#181612" />
        <circle r="2.5" fill="#121010" />
        <ellipse cx="-4" cy="-4" rx="5" ry="3" fill="white" opacity="0.08" transform="rotate(-30 -4 -4)" />
        <circle r="1.2" fill="#2a2820" />
      </g>

      {/* ── FILM GATE (rectangular opening the film passes through) ── */}
      {/* Gate outer frame plate */}
      <rect x="80" y="296" width="100" height="28" rx="1.5" fill="#1e1c16" />
      {/* Gate opening */}
      <rect x="84" y="299" width="92"  height="22" rx="1"   fill="#030202" />
      {/* Gate rails */}
      <rect x="80" y="295" width="100" height="4" rx="1" fill="#2a2820" />
      <rect x="80" y="323" width="100" height="4" rx="1" fill="#2a2820" />
      {/* Side rails */}
      <rect x="80" y="295" width="5"  height="32" fill="#2a2820" />
      <rect x="175" y="295" width="5" height="32" fill="#2a2820" />
      {/* Film visible in gate */}
      <rect x="86" y="300" width="88" height="20" fill="#080706" />
      {/* Gate registration pins (2 small circles) */}
      <circle cx="100" cy="310" r="2.5" fill="#1a1812" stroke="#282418" strokeWidth="0.6" />
      <circle cx="160" cy="310" r="2.5" fill="#1a1812" stroke="#282418" strokeWidth="0.6" />
      {/* Gate cross guides (very subtle) */}
      <line x1="86" y1="310" x2="174" y2="310" stroke="#141210" strokeWidth="0.5" />
      <line x1="130" y1="300" x2="130" y2="320" stroke="#141210" strokeWidth="0.5" />

      {/* ── FILM EXIT SLOT ── */}
      <rect x="78" y="328" width="104" height="14" rx="3" fill="#030202" />
      <rect x="82" y="331" width="96"  height="8"  fill="#0c0a08" />
      <line x1="78" y1="328" x2="182" y2="328" stroke="#1e1c16" strokeWidth="0.7" />
      <line x1="78" y1="342" x2="182" y2="342" stroke="#141210" strokeWidth="0.5" />
    </svg>
  );
}

// ─── FILM FRAME ───────────────────────────────────────────────────────────────

function FilmFrame({
  project,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const perfs = Array.from({ length: 7 });

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        width: STRIP_W,
        background: "#0c0b09",
        position: "relative",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease",
        boxShadow: isHovered
          ? "inset 0 0 0 1.5px rgba(160,118,40,0.5), 0 0 12px rgba(140,100,30,0.15)"
          : "none",
      }}
    >
      {/* Top perforation row */}
      <div
        style={{
          height: FRAME_PERF_H,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 4,
          background: "#0c0b09",
        }}
      >
        {perfs.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 12,
              background: "#050403",
              borderRadius: "2px",
              boxShadow:
                "inset 0 1px 3px rgba(0,0,0,0.98), 0 0 0 0.5px #1a1814",
            }}
          />
        ))}
      </div>

      {/* Image area */}
      <div
        style={{
          height: FRAME_IMG_H,
          overflow: "hidden",
          position: "relative",
          margin: "0 8px",
          border: "1.5px solid #1a1812",
        }}
      >
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{
            filter: isHovered
              ? "sepia(12%) contrast(1.06) brightness(0.97) saturate(0.95)"
              : "sepia(22%) contrast(1.08) brightness(0.88) saturate(0.85)",
            transition: "filter 0.3s ease",
          }}
        />
        {/* Film burn edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.42) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Corner badges */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            color: "#a07828",
            fontSize: 8,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "1.5px",
            background: "rgba(6,5,4,0.72)",
            padding: "2px 6px",
          }}
        >
          {String(index + 1).padStart(2, "0")}A
        </div>
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#a07828",
            fontSize: 8,
            fontFamily: "'Courier New', monospace",
            letterSpacing: "1.5px",
            background: "rgba(6,5,4,0.72)",
            padding: "2px 6px",
          }}
        >
          {project.year}
        </div>
        {/* Hover amber edge glow */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 20px rgba(160,110,20,0.12)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Minimal info bar */}
      <div
        style={{
          height: FRAME_INFO_H,
          padding: "10px 14px 8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0e0c",
          margin: "0 8px",
          borderLeft: "1.5px solid #1a1812",
          borderRight: "1.5px solid #1a1812",
          borderBottom: "1.5px solid #1a1812",
        }}
      >
        <div
          style={{
            color: isHovered ? "#e8d8a8" : "#c8b888",
            fontSize: 14,
            fontFamily: "'Caveat', cursive",
            lineHeight: 1.2,
            transition: "color 0.2s ease",
          }}
        >
          {project.title}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              color: "#c09040",
              fontSize: 9,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "1.2px",
              textDecoration: "none",
              width: "fit-content",
            }}
            data-cursor="hover"
          >
            VIEW PROJECT
            <ExternalLink size={8} />
          </a>
        )}
      </div>

      {/* Bottom perforation row */}
      <div
        style={{
          height: FRAME_PERF_H,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 4,
          background: "#0c0b09",
        }}
      >
        {perfs.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 12,
              background: "#050403",
              borderRadius: "2px",
              boxShadow:
                "inset 0 1px 3px rgba(0,0,0,0.98), 0 0 0 0.5px #1a1814",
            }}
          />
        ))}
      </div>

      {/* Inter-frame separator */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, #1e1c14 20%, #1e1c14 80%, transparent)",
        }}
      />
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

export function Experiments() {
  const sectionRef        = useRef<HTMLElement>(null);
  const cameraRef         = useRef<HTMLDivElement>(null);
  const isInView          = useInView(sectionRef, { once: true, amount: 0.1 });

  const [cameraH, setCameraH]           = useState(260);
  const [spinning, setSpinning]         = useState(false);
  const [revealedCount, setRevealedCount] = useState(1);
  const [isDragging, setIsDragging]     = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const MAX_DRAG = (projects.length - 1) * FRAME_H;

  // pullMV drives both container height and snap animation
  const pullMV = useMotionValue(0);

  const isDraggingRef  = useRef(false);
  const dragOriginRef  = useRef(0);

  // Keep revealed count and container height in sync
  const [containerH, setContainerH] = useState(cameraH + FRAME_H);
  useMotionValueEvent(pullMV, "change", (v) => {
    setContainerH(cameraH + FRAME_H + v);
    setRevealedCount(Math.min(projects.length, Math.floor(v / FRAME_H) + 1));
  });
  useEffect(() => {
    setContainerH(cameraH + FRAME_H + pullMV.get());
  }, [cameraH, pullMV]);

  // Measure camera height after mount
  useEffect(() => {
    if (cameraRef.current) {
      const h = cameraRef.current.offsetHeight;
      if (h > 0) setCameraH(h);
    }
  }, []);

  // Spring-snap to nearest full frame on release
  const snapToFrame = useCallback(
    (currentPull: number) => {
      const idx    = Math.round(currentPull / FRAME_H);
      const target = Math.max(0, Math.min(MAX_DRAG, idx * FRAME_H));
      if (Math.abs(target - currentPull) > 4) {
        setSpinning(true);
        setTimeout(() => setSpinning(false), 900);
      }
      animate(pullMV, target, { type: "spring", stiffness: 240, damping: 28 });
    },
    [MAX_DRAG, pullMV]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDraggingRef.current  = true;
      setIsDragging(true);
      dragOriginRef.current  = e.clientY - pullMV.get();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pullMV]
  );
  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const v = Math.max(0, Math.min(MAX_DRAG, e.clientY - dragOriginRef.current));
      pullMV.set(v);
    },
    [MAX_DRAG, pullMV]
  );
  const onPointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    snapToFrame(pullMV.get());
  }, [pullMV, snapToFrame]);

  const visibleAll = revealedCount >= projects.length;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-28 bg-transparent overflow-x-clip"
    >
      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="text-center mb-10 md:mb-14 px-4"
      >
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="h-px w-10 bg-stone-400" />
          <span
            className="text-stone-500 text-[10px] tracking-[0.28em] uppercase"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Roll №1 — Selected Works
          </span>
          <div className="h-px w-10 bg-stone-400" />
        </div>
        <h2
          className="text-4xl md:text-5xl text-stone-900"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Portfolio
        </h2>
      </motion.div>

      {/* ── Camera + Film strip assembly ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="flex flex-col items-center"
      >
        {/*
          Outer wrapper — wider than the strip to give space for hover panels.
          Position: relative so panels can escape using absolute positioning.
        */}
        <div
          className="relative"
          style={{ width: STRIP_W + (PANEL_W + PANEL_GAP) * 2 + 32, maxWidth: "100vw" }}
        >
          {/* ── Hover description panels (alternating sides) ── */}
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (() => {
              const p      = projects[hoveredIndex];
              const isLeft = hoveredIndex % 2 === 0;
              // Vertical center the panel over the hovered frame
              const panelTop = cameraH + hoveredIndex * FRAME_H + 18;

              return (
                <motion.div
                  key={hoveredIndex}
                  className="hidden md:block absolute z-20 pointer-events-none"
                  style={{
                    top: panelTop,
                    width: PANEL_W,
                    // Position relative to the centred strip inside the outer wrapper.
                    // 50% of outer wrapper = horizontal centre = strip centre.
                    ...(isLeft
                      ? { right: `calc(50% + ${STRIP_W / 2 + PANEL_GAP}px)` }
                      : { left:  `calc(50% + ${STRIP_W / 2 + PANEL_GAP}px)` }
                    ),
                  }}
                  initial={{ opacity: 0, x: isLeft ? 14 : -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLeft ? 14 : -14 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Connecting hairline to strip */}
                  <div
                    style={{
                      position: "absolute",
                      top: 52,
                      [isLeft ? "right" : "left"]: -PANEL_GAP,
                      width: PANEL_GAP,
                      height: 1,
                      background:
                        "linear-gradient(to right, transparent, rgba(160,118,40,0.55))",
                      ...(isLeft && {
                        background:
                          "linear-gradient(to left, transparent, rgba(160,118,40,0.55))",
                      }),
                    }}
                  />
                  {/* Panel card */}
                  <div
                    style={{
                      background: "#faf8f3",
                      border: "1px solid #e0d8c8",
                      boxShadow: "0 4px 18px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.08)",
                      padding: "14px 16px 12px",
                    }}
                  >
                    {/* Meta row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          color: "#a07030",
                          fontSize: 8,
                          fontFamily: "'Courier New', monospace",
                          letterSpacing: "1.8px",
                          textTransform: "uppercase",
                        }}
                      >
                        Frame {String(hoveredIndex + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          color: "#b0a888",
                          fontSize: 8,
                          fontFamily: "'Courier New', monospace",
                          letterSpacing: "1px",
                        }}
                      >
                        {p.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h4
                      style={{
                        color: "#1a1810",
                        fontSize: 18,
                        fontFamily: "'Caveat', cursive",
                        lineHeight: 1.15,
                        marginBottom: 8,
                      }}
                    >
                      {p.title}
                    </h4>

                    {/* Divider */}
                    <div
                      style={{
                        height: 1,
                        background: "linear-gradient(to right, #d0c8b4, transparent)",
                        marginBottom: 8,
                      }}
                    />

                    {/* Description */}
                    <p
                      style={{
                        color: "#4a4640",
                        fontSize: 11,
                        lineHeight: 1.6,
                        fontFamily: "Inter, sans-serif",
                        marginBottom: 10,
                      }}
                    >
                      {p.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            color: "#786848",
                            fontSize: 8,
                            fontFamily: "'Courier New', monospace",
                            letterSpacing: "0.8px",
                            border: "0.5px solid #c8bea0",
                            padding: "1.5px 5px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* ── Centered strip column ── */}
          <div
            className="flex flex-col items-center mx-auto"
            style={{ width: STRIP_W }}
          >
            {/* Growing clipped container */}
            <div
              style={{
                overflow: "hidden",
                width: STRIP_W,
                height: containerH,
              }}
            >
              {/* Camera illustration */}
              <div ref={cameraRef} className="flex justify-center">
                <VintageCamera spinning={spinning} />
              </div>

              {/* Film frames */}
              <div style={{ width: STRIP_W }}>
                {projects.map((project, index) => (
                  <FilmFrame
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredIndex === index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                ))}
              </div>
            </div>

            {/* ── Pull handle ── */}
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{
                width: STRIP_W,
                background: "#0c0b09",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                touchAction: "none",
              }}
              data-cursor="hover"
            >
              {/* Handle grip bar */}
              <div
                style={{
                  padding: "9px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #1e1c14",
                }}
              >
                <span
                  style={{
                    color: "#706048",
                    fontSize: 9,
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "1px",
                  }}
                >
                  {String(revealedCount).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <span
                    style={{
                      color: visibleAll ? "#605840" : "#b08832",
                      fontSize: 8,
                      fontFamily: "'Courier New', monospace",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    {visibleAll ? "all frames" : "pull film"}
                  </span>
                  {!visibleAll && (
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      style={{ color: "#b08832", fontSize: 10, lineHeight: 1 }}
                    >
                      ↓
                    </motion.div>
                  )}
                </div>

                {/* Grip knurls */}
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      style={{ width: 2, height: 14, background: "#242218", borderRadius: 1 }}
                    />
                  ))}
                </div>
              </div>

              {/* Knurl texture row */}
              <div
                style={{
                  height: 8,
                  background:
                    "repeating-linear-gradient(90deg, #0c0b09 0px, #0c0b09 4px, #141310 4px, #141310 8px)",
                }}
              />
            </div>

            {/* Tail fade */}
            <div
              style={{
                width: STRIP_W,
                height: 36,
                background: "linear-gradient(to bottom, #0c0b09, transparent)",
                pointerEvents: "none",
              }}
            />

            {/* Progress indicator */}
            <div className="flex items-center gap-1.5 mt-3" style={{ width: STRIP_W }}>
              {projects.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: i < revealedCount ? 2 : 1,
                    background: i < revealedCount ? "#2a2618" : "#d0c8b4",
                    borderRadius: 1,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
            <p
              className="mt-2 text-stone-400"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 9,
                letterSpacing: "1.4px",
              }}
            >
              {visibleAll ? `${projects.length} frames exposed` : "drag handle to reveal more"}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
