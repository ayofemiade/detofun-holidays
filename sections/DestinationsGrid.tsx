"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { ArrowUpRight, MapPin } from "lucide-react";

// ─── Destination data — images mapped to actual files in /public/images/ ─────
const destinations = [
  {
    id: 1,
    title: "Olumo Rock",
    location: "Abeokuta, Ogun State",
    image: "/images/olumo rock.jpg",
    description:
      "An ancient fortress of granite rising 137m, offering panoramic vistas of Abeokuta and the Ogun River valley. Sacred symbol of Egba resilience.",
    tag: "Heritage Site",
    // Tall hero card — spans 2 rows on desktop
    layout: "md:col-span-2 md:row-span-2 h-[380px] md:h-full",
    sizes: "(max-width: 768px) 100vw, 66vw",
  },
  {
    id: 2,
    title: "Itoku Ankara Market",
    location: "Abeokuta, Ogun State",
    image: "/images/itoku _ Ankara market.jpg",
    description:
      "The vibrant heartbeat of Adire textile artistry — a riot of indigo, batik and hand-woven culture.",
    tag: "Cultural Market",
    layout: "md:col-span-1 h-[280px] md:h-auto",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    id: 3,
    title: "OOPL Presidential Library",
    location: "Abeokuta, Ogun State",
    image: "/images/oopl library .jpg",
    description:
      "A premier presidential archive, convention hall and cultural resort set within lush tropical gardens.",
    tag: "Landmark",
    layout: "md:col-span-1 h-[280px] md:h-auto",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    id: 4,
    title: "Gateway State",
    location: "Ogun State, Nigeria",
    image: "/images/Gateway state.png",
    description:
      "The Gateway to Nigeria — a tapestry of waterfalls, nature reserves and historic colonial landmarks waiting to be explored.",
    tag: "Nature & Heritage",
    // Wide panoramic card — spans 2 columns
    layout: "md:col-span-2 h-[300px] md:h-[340px]",
    sizes: "(max-width: 768px) 100vw, 66vw",
  },
  {
    id: 5,
    title: "Abeokuta City",
    location: "Ogun State, Nigeria",
    image: "/images/abeokuta.png",
    description:
      "Under the rocks — a city of faith, art, history and warmth, where every street tells a Yoruba story.",
    tag: "City Experience",
    layout: "md:col-span-1 h-[300px] md:h-[340px]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
];

// ─── Tag badge ────────────────────────────────────────────────────────────────
function DestTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.6rem] uppercase tracking-[0.18em] font-bold border border-[#C8A96A]/60 text-[#C8A96A] bg-[#2C1A0B]/70 backdrop-blur-sm">
      {label}
    </span>
  );
}

// ─── Single card ──────────────────────────────────────────────────────────────
function DestCard({
  dest,
  index,
}: {
  dest: (typeof destinations)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${dest.layout}`}
      style={{ minHeight: "260px" }}
    >
      {/* Image with gentle zoom on hover */}
      <Image
        src={dest.image}
        alt={dest.title}
        fill
        sizes={dest.sizes}
        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
      />

      {/* Dark gradient — always present so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0B] via-[#2C1A0B]/70 to-[#2C1A0B]/20 z-10 transition-opacity duration-500" />
      {/* Hover vignette */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 z-10" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-7">
        {/* Top — tag */}
        <div className="flex justify-start">
          <DestTag label={dest.tag} />
        </div>

        {/* Bottom — title + details */}
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          {/* Location line */}
          <div className="flex items-center gap-1.5 mb-2 opacity-80">
            <MapPin className="w-3 h-3 shrink-0" style={{ color: "#C8A96A" }} />
            <span
              className="text-[0.65rem] uppercase tracking-[0.16em] font-medium"
              style={{ color: "#F5E9DA", opacity: 0.75 }}
            >
              {dest.location}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-2xl sm:text-3xl font-heading font-bold mb-0 leading-tight group-hover:text-[#C8A96A] transition-colors duration-300 drop-shadow-md"
            style={{ color: "#F5E9DA" }}
          >
            {dest.title}
          </h3>

          {/* Description — slides in on hover */}
          <p
            className="mt-2 text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 drop-shadow-sm"
            style={{ color: "#F5E9DA", opacity: 0 }}
          >
            {dest.description}
          </p>

          {/* CTA link */}
          <div
            className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-2 group-hover:translate-y-0"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#C8A96A" }}
            >
              View Experience
            </span>
            <ArrowUpRight className="w-4 h-4" style={{ color: "#C8A96A" }} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function DestinationsGrid() {
  return (
    <section
      id="destinations"
      className="w-full py-28 px-4 text-white"
      style={{ backgroundColor: "#2C1A0B" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#C8A96A] uppercase tracking-widest text-sm font-semibold mb-4 block"
            >
              Curated Experiences
            </motion.span>
            <AnimatedText
              text="Explore Our Top Destinations"
              el="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight"
            />
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 text-[#C8A96A] font-semibold hover:text-[#F5E9DA] transition-colors cursor-pointer shrink-0"
          >
            View All Experiences <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/*
          Bento grid:
          Row 1: [Olumo Rock ×2] [Itoku Market ×1]
          Row 1 cont.: [Olumo Rock tall continues] [OOPL Library ×1]
          Row 2: [Gateway State ×2] [Abeokuta City ×1]
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[420px_340px] gap-5">
          {destinations.map((dest, idx) => (
            <DestCard key={dest.id} dest={dest} index={idx} />
          ))}
        </div>

        {/* Bottom divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-16 h-px origin-left"
          style={{ backgroundColor: "#C8A96A", opacity: 0.2 }}
        />
      </div>
    </section>
  );
}
