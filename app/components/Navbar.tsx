'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
    { href: '#location', label: 'สถานที่' },
    { href: '#schedule', label: 'กำหนดการ' },
    { href: '#gallery', label: 'ภาพบรรยากาศ' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-[#3D1206]/95 backdrop-blur-md shadow-lg shadow-black/30'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-col leading-tight">
                    <span className="text-[#FFD29D] font-bold text-sm sm:text-base tracking-wide">
                        ล้อมลูกรัก ด้วยศรัทธา
                    </span>
                    <span className="text-white/60 text-xs hidden sm:block">Faith Code camp</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-white/80 hover:text-[#FFD29D] text-sm font-medium transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href="/register"
                        className="bg-gradient-to-r from-[#E8913A] to-[#FFD29D] text-[#3D1206] font-bold text-sm px-5 py-2 rounded-full shadow-md hover:shadow-[#FFB563]/40 hover:scale-105 transition-all duration-200"
                    >
                        สมัครเข้าร่วมค่าย →
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white p-2 rounded-md"
                    aria-label="Toggle menu"
                >
                    <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                    <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-[#3D1206]/98 backdrop-blur-md overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 pb-4' : 'max-h-0'
                    }`}
            >
                <div className="px-4 flex flex-col gap-3 pt-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-white/80 hover:text-[#FFD29D] text-base font-medium py-2 border-b border-white/10 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        href="/register"
                        onClick={() => setMenuOpen(false)}
                        className="bg-gradient-to-r from-[#E8913A] to-[#FFD29D] text-[#3D1206] font-bold text-sm px-5 py-2.5 rounded-full text-center mt-2"
                    >
                        ลงทะเบียน
                    </Link>
                </div>
            </div>
        </nav>
    );
}
