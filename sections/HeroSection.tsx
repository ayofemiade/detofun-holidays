"use client";

import { motion, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
// Static import → Next.js auto-generates blurDataURL at build time
import heroBg from "@/public/images/hero-bg.png";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const GOLD = "#C8A96A";
const SAND = "#F5E9DA";
const DARK = "#2C1A0B";

// ─── Motion variants (tightened delays for fast perceived load) ──────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    },
  }),
} as Variants;

const wordVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as Variants;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** ① Animated badge */
function HeroBadge() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate="visible"
      className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C8A96A]/60 bg-[#2C1A0B]/60 backdrop-blur-md mb-8 cursor-default"
      style={{ boxShadow: "0 0 18px 3px rgba(200,169,106,0.15), inset 0 0 12px rgba(200,169,106,0.05)" }}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75" style={{ backgroundColor: GOLD }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
      </span>
      <span
        className="text-[0.7rem] sm:text-xs tracking-[0.22em] uppercase font-semibold"
        style={{ color: SAND, fontFamily: "var(--font-inter, sans-serif)" }}
      >
        Nigeria&apos;s Premier Travel Experience
      </span>
    </motion.div>
  );
}

/** ② H1 — word-by-word stagger, zero duplication */
function AnimatedH1({ reduced }: { reduced: boolean }) {
  const lines = ["Discover Nigeria,", "One Story at a Time"];

  return (
    <h1
      className="font-heading text-4xl sm:text-5xl lg:text-7xl xl:text-[5rem] font-bold leading-[1.15] tracking-tight mb-4 sm:mb-6 drop-shadow-2xl"
      style={{ color: SAND }}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          <motion.span
            className="block"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduced ? 0 : 0.07,
                  // Tightened: line 1 starts at 0.1s, line 2 at 0.3s
                  delayChildren: reduced ? 0 : 0.1 + li * 0.2,
                },
              },
            }}
            aria-hidden
          >
            {line.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span className="inline-block" variants={reduced ? {} : wordVariants}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** ③ Subheading — single instance */
function Subheading() {
  return (
    <motion.p
      variants={fadeUp}
      custom={0.35}               // was 0.6
      initial="hidden"
      animate="visible"
      className="text-lg sm:text-xl md:text-2xl italic mb-8 sm:mb-10 max-w-[90%] sm:max-w-2xl leading-relaxed mx-auto"
      style={{ fontFamily: "var(--font-playfair, serif)", color: `${SAND}cc`, fontWeight: 400 }}
    >
      Curated journeys across Abeokuta and beyond&nbsp;&mdash;
      <br className="hidden sm:block" /> crafted for the discerning traveler.
    </motion.p>
  );
}

/** ④ CTA Row */
function CTARow() {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.55}               // was 0.9
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mb-14"
    >
      {/* Primary */}
      <motion.a
        href="#destinations"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative overflow-hidden px-9 py-4 rounded-full font-bold text-sm uppercase tracking-widest cursor-pointer flex items-center gap-3 shadow-[0_0_28px_rgba(200,169,106,0.3)] hover:shadow-[0_0_48px_rgba(200,169,106,0.55)] transition-shadow duration-300 w-full sm:w-auto justify-center"
        style={{ backgroundColor: GOLD, color: DARK }}
      >
        <span className="pointer-events-none absolute left-[-60%] top-0 h-full w-[40%] -skew-x-12 bg-white/30 blur-sm group-hover:left-[130%] transition-[left] duration-500 ease-in-out" />
        <span className="relative z-10">Explore Destinations</span>
        <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </motion.a>

      {/* Secondary */}
      <motion.button
        onClick={() => window.dispatchEvent(new Event('openBookingModal'))}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative overflow-hidden px-9 py-4 rounded-full font-bold text-sm uppercase tracking-widest cursor-pointer flex items-center justify-center gap-3 border transition-all duration-300 w-full sm:w-auto"
        style={{ borderColor: GOLD, color: GOLD, backgroundColor: "transparent" }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: GOLD }} />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2C1A0B]" style={{ color: "inherit" }}>
          Book a Tour
        </span>
      </motion.button>
    </motion.div>
  );
}

/** ⑤ Stats row */
function StatsRow() {
  const stats = [
    { number: "500+", label: "Travelers" },
    { number: "12+", label: "Destinations" },
    { number: "5★", label: "Rated" },
  ];

  return (
    <motion.div
      variants={fadeUp}
      custom={0.75}               // was 1.2
      initial="hidden"
      animate="visible"
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-10"
    >
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <span className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: GOLD, fontFamily: "var(--font-inter, sans-serif)" }}>
            {s.number}
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.2em] font-medium" style={{ color: `${SAND}99`, fontFamily: "var(--font-inter, sans-serif)" }}>
            {s.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/**
 * ⑥ Scroll indicator — CSS-only bounce (no JS animation overhead)
 * The chevron uses a pure CSS @keyframes animation defined inline,
 * so it runs on the compositor thread with zero layout/paint cost.
 */
function ScrollIndicator() {
  return (
    <>
      <style>{`
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        .hero-chevron-bounce {
          animation: hero-bounce 1.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-chevron-bounce { animation: none; }
        }
      `}</style>

      <motion.div
        variants={fadeUp}
        custom={0.9}              // was 1.5
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center gap-2 cursor-pointer select-none mt-8"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span
          className="text-[0.65rem] uppercase tracking-[0.35em] font-medium"
          style={{ color: `${SAND}80`, fontFamily: "var(--font-inter, sans-serif)" }}
        >
          Scroll to Discover
        </span>
        <ChevronDown
          strokeWidth={1.8}
          className="hero-chevron-bounce w-6 h-6"
          style={{ color: GOLD }}
          aria-label="Scroll down"
        />
      </motion.div>
    </>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax: image moves at 0.4× scroll speed
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Fade out content on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const showReduced = mounted && reduced;

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="Hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden pt-28 pb-8"
    >
      {/* ── Background: Ken Burns (CSS) + Scroll Parallax (Framer) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{ y: showReduced ? "0%" : bgY, opacity: mounted ? (mounted && reduced ? 1 : 1) : 1 }}
      >
        {/*
          Ken Burns: pure CSS keyframe — runs on the GPU compositor,
          zero JS tick cost. Defined inline to keep the component self-contained.
        */}
        <style>{`
          @keyframes ken-burns {
            0%, 100% { transform: scale(1.0); }
            50%       { transform: scale(1.08); }
          }
          .hero-ken-burns {
            animation: ken-burns 20s ease-in-out infinite;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-ken-burns { animation: none; }
          }
        `}</style>

        <div className="hero-ken-burns absolute inset-0 w-full h-full origin-center">
          {/*
            Static import (/public/images/hero-bg.png) → Next.js auto-generates
            blurDataURL at build time. placeholder="blur" shows a warm-brown
            low-res preview instantly — before any network bytes of the real
            image arrive. Combined with priority, the browser preloads this as
            an LCP resource.
          */}
          <Image
            src={heroBg}
            alt="Beautiful panoramic view of Nigerian landscape with Olumo Rock and Abeokuta hills"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            placeholder="blur"
            fetchPriority="high"
          />
        </div>
      </motion.div>

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #2C1A0B 0%, rgba(44,26,11,0.55) 50%, rgba(44,26,11,0.20) 100%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: reduced ? 1 : contentOpacity }}
        className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl w-full"
      >
        <HeroBadge />
        <AnimatedH1 reduced={reduced} />
        <Subheading />
        <CTARow />
        <StatsRow />
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
