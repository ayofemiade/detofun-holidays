"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useLenis } from "lenis/react";

export default function BookingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("openBookingModal", handleOpen);
        return () => window.removeEventListener("openBookingModal", handleOpen);
    }, []);

    // Toggle body scroll + Lenis lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            lenis?.stop();
        } else {
            document.body.style.overflow = "unset";
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = "unset";
            lenis?.start();
        };
    }, [isOpen, lenis]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget);
        const text = `Hello Detofun Holidays!%0A%0A*New Booking Request:*%0A- *Name:* ${formData.get('name')}%0A- *Email:* ${formData.get('email')}%0A- *Phone:* ${formData.get('phone')}%0A- *Guests:* ${formData.get('guests')}%0A- *Destination:* ${formData.get('destination')}%0A- *Date:* ${formData.get('date')}%0A- *Special Requests:* ${formData.get('requirements')}`;
        window.open(`https://wa.me/2348033975840?text=${text}`, '_blank');
        e.currentTarget.reset();
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 shadow-2xl">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-5xl bg-[#120B05] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(200,169,106,0.15)] flex flex-col md:flex-row border border-[#C8A96A]/20 z-10 max-h-[90vh]"
                    >
                        {/* Close button */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side: Image / Text */}
                        <div className="hidden md:flex md:w-2/5 relative bg-black flex-col justify-end">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#120B05] via-[rgba(18,11,5,0.4)] to-black/50 z-10" />
                            <Image
                                src="/images/olumo rock.jpg"
                                alt="Booking Experience"
                                fill
                                sizes="40vw"
                                className="object-cover object-center"
                            />
                            <div className="relative z-20 p-8 pb-10">
                                <h3 className="text-3xl font-heading text-white font-bold mb-4 drop-shadow-md">
                                    Your Nigerian Adventure Awaits
                                </h3>
                                <p className="text-[var(--color-secondary)]/80 text-sm leading-relaxed drop-shadow-sm">
                                    Leave the details to us. Fill out your preferences and our concierges will curate an unforgettable, premium journey for you.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div 
                            className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar relative bg-[#120B05]/95"
                            data-lenis-prevent
                        >
                            <h2 className="text-xl sm:text-2xl font-heading text-white font-bold mb-6 sm:mb-8">
                                Request a Reservation
                            </h2>

                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <label className="text-xs text-[var(--color-secondary)]/60 uppercase tracking-widest pl-1">Full Name</label>
                                        <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm" placeholder="John Doe" />
                                    </div>
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <label className="text-xs text-[var(--color-secondary)]/60 uppercase tracking-widest pl-1">Email</label>
                                        <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <label className="text-xs text-[var(--color-secondary)]/60 uppercase tracking-widest pl-1">Phone Number</label>
                                        <input name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm" placeholder="+1 234 567 8900" />
                                    </div>
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <label className="text-xs text-[var(--color-secondary)]/60 uppercase tracking-widest pl-1">Guests</label>
                                        <input name="guests" type="number" min="1" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm" placeholder="2 Adults" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <label className="text-xs text-[var(--color-secondary)]/60 uppercase tracking-widest pl-1">Destination</label>
                                        <select name="destination" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm appearance-none">
                                            <option>Abeokuta Day Tour</option>
                                            <option>School Excursion</option>
                                            <option>Corporate Retreat</option>
                                            <option>International Visitor</option>
                                            <option>Custom Package</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5 w-full overflow-hidden">
                                        <label className="text-xs text-[var(--color-secondary)]/60 uppercase tracking-widest pl-1">Travel Date</label>
                                        <input name="date" type="date" className="block w-full max-w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm [color-scheme:dark]" />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-[var(--color-secondary)]/60 uppercase tracking-widest pl-1">Special Requirements</label>
                                    <textarea name="requirements" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none text-sm" placeholder="Allergies, accessibility needs..."></textarea>
                                </div>

                                <button type="submit" className="mt-4 w-full py-4 bg-[var(--color-accent)] text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(200,169,106,0.3)]">
                                    Submit via WhatsApp
                                </button>
                                <p className="text-center text-[10px] text-white/40 mt-2 uppercase tracking-wider">Your information is secure and encrypted</p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
