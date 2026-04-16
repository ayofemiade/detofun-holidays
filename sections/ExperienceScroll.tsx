"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const experiences = [
    {
        id: 1,
        title: "Step Into The Past",
        description: "Walk the ancient pathways of Olumo Rock, where history whispers through every crevice. Feel the spirit of the Egba people who found sanctuary here.",
        image: "/images/abeokuta.png",
    },
    {
        id: 2,
        title: "Vibrant Culture",
        description: "Immerse yourself in the colors of Itoku Market. The masterful Adire textile makers weave stories into fabric, preserving generations of artistry.",
        image: "/images/market.png",
    },
    {
        id: 3,
        title: "Modern Grandeur",
        description: "Experience the monumental Olusegun Obasanjo Presidential Library. A stunning blend of architectural brilliance, rich history, and tranquil views.",
        image: "/images/library.png",
    },
];

export default function ExperienceScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Translate the internal container from 0% to -66.66% (since 3 items take up 300% width)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66666%"]);

    return (
        <>
            {/* Desktop Version */}
            <section ref={containerRef} className="hidden md:block relative bg-[#120B05]" style={{ height: "400vh" }}>
                {/* Sticky Container */}
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center">

                    <motion.div style={{ x }} className="flex h-full w-[300vw]">
                        {experiences.map((exp, index) => (
                            <div key={exp.id} className="relative w-screen h-full flex items-center justify-center overflow-hidden shrink-0">

                                {/* Background Image Layer with Parallax Effect */}
                                <div className="absolute inset-0 w-full h-full">
                                    <div className="absolute inset-0 bg-black/50 z-10" />
                                    <Image
                                        src={exp.image}
                                        alt={exp.title}
                                        fill
                                        sizes="100vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#120B05]/90 z-10" />
                                </div>

                                {/* Text Layer */}
                                <div className="relative z-20 max-w-5xl text-center px-6 md:px-12 w-full flex flex-col items-center">
                                    <span className="text-[var(--color-accent)] uppercase tracking-[0.4em] text-sm md:text-base font-bold block mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                        0{exp.id} / Experience
                                    </span>
                                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white font-bold mb-8 drop-shadow-2xl">
                                        {exp.title}
                                    </h2>
                                    <p className="text-lg md:text-2xl font-light text-white/90 max-w-3xl leading-relaxed drop-shadow-lg">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll Progress Indicator fixed to the sticky container bottom */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 pointer-events-none">
                        {experiences.map((_, i) => {
                            // For each dot, we determine its active state linearly mapped to scrollYProgress
                            const isActive = useTransform(
                                scrollYProgress,
                                [
                                    (i - 0.5) * (1 / (experiences.length - 1)),
                                    i * (1 / (experiences.length - 1)),
                                    (i + 0.5) * (1 / (experiences.length - 1))
                                ],
                                [0, 1, 0]
                            );

                            const dotWidth = useTransform(isActive, [0, 1], ["8px", "32px"]);
                            const dotOpacity = useTransform(isActive, [0, 1], [0.3, 1]);
                            const dotColor = useTransform(isActive, [0, 1], ["#FFFFFF", "#C8A96A"]);

                            return (
                                <motion.div
                                    key={i}
                                    style={{ width: dotWidth, opacity: dotOpacity, backgroundColor: dotColor }}
                                    className="h-2 rounded-full transition-all duration-100"
                                />
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Mobile Version - Stacked */}
            <section className="md:hidden flex flex-col w-full bg-[#120B05]">
                {experiences.map((exp) => (
                    <div key={exp.id} className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5 last:border-none">
                        <div className="absolute inset-0 w-full h-full">
                            <div className="absolute inset-0 bg-black/60 z-10" />
                            <Image
                                src={exp.image}
                                alt={exp.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#120B05] z-10" />
                        </div>
                        <div className="relative z-20 px-6 w-full flex flex-col items-center text-center">
                            <span className="text-[var(--color-accent)] uppercase tracking-[0.3em] text-[0.65rem] font-bold block mb-4 drop-shadow-md">
                                0{exp.id} / Experience
                            </span>
                            <h2 className="text-3xl font-heading text-white font-bold mb-4 drop-shadow-xl">
                                {exp.title}
                            </h2>
                            <p className="text-sm text-white/80 leading-relaxed drop-shadow-md max-w-sm">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
