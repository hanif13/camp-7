'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(160deg, #1E0A02 0%, #5C1A06 35%, #882A0A 65%, #6B7A40 100%)',
            }}
        >
            {/* Warm glow circles */}
            <div className="absolute top-[-6rem] right-[-6rem] w-96 h-96 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #FFB563 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-6rem] left-[-6rem] w-80 h-80 rounded-full opacity-15"
                style={{ background: 'radial-gradient(circle, #918450 0%, transparent 70%)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
                style={{ background: 'radial-gradient(circle, #FFD29D 0%, transparent 70%)' }} />

            {/* Leaf/star dots — fixed positions to avoid hydration mismatch */}
            {[
                { w: 2.1, t: 8, l: 12, o: 0.20 }, { w: 1.5, t: 22, l: 78, o: 0.15 },
                { w: 3.0, t: 35, l: 45, o: 0.30 }, { w: 1.2, t: 55, l: 90, o: 0.10 },
                { w: 2.5, t: 70, l: 25, o: 0.25 }, { w: 1.8, t: 15, l: 60, o: 0.18 },
                { w: 2.0, t: 80, l: 70, o: 0.20 }, { w: 1.4, t: 42, l: 8, o: 0.12 },
                { w: 2.8, t: 92, l: 38, o: 0.22 }, { w: 1.6, t: 5, l: 88, o: 0.16 },
                { w: 2.3, t: 62, l: 55, o: 0.28 }, { w: 1.1, t: 28, l: 32, o: 0.11 },
                { w: 3.0, t: 48, l: 82, o: 0.35 }, { w: 1.9, t: 75, l: 15, o: 0.19 },
                { w: 2.4, t: 18, l: 50, o: 0.24 }, { w: 1.7, t: 88, l: 60, o: 0.17 },
                { w: 2.6, t: 38, l: 95, o: 0.26 }, { w: 1.3, t: 58, l: 3, o: 0.13 },
            ].map((dot, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: dot.w + 'px',
                        height: dot.w + 'px',
                        top: dot.t + '%',
                        left: dot.l + '%',
                        background: '#FFD29D',
                        opacity: dot.o,
                    }}
                />
            ))}
            <div
                className={`relative z-10 text-center px-4 sm:px-8 max-w-4xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-[#FFB563]/30 rounded-full px-4 py-1.5 mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#FFD29D] animate-pulse" />
                    <span className="text-[#FFD29D] text-xs sm:text-sm font-semibold tracking-widest uppercase">
                        ค่ายอิสลาม 2569
                    </span>
                </div>

                <p className="text-white/50 text-sm sm:text-base font-light tracking-widest mb-4 uppercase">
                    ขอเรียนเชิญร่วมงาน
                </p>

                {/* Main title */}
                <h1 className="text-white font-extrabold leading-tight mb-3">
                    <span className="block text-3xl sm:text-5xl md:text-6xl mb-2">ล้อมลูกรัก</span>
                    <span
                        className="block text-4xl sm:text-6xl md:text-7xl"
                        style={{
                            background: 'linear-gradient(135deg, #E8913A 0%, #FFD29D 50%, #FFB563 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        ด้วยศรัทธา
                    </span>
                </h1>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 my-6">
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#FFB563]/60" />
                    <span className="text-[#FFD29D] text-lg">🍂</span>
                    <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#FFB563]/60" />
                </div>

                {/* Episode box */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 mb-10 mx-auto max-w-2xl">
                    <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wider mb-1">ตอน</p>
                    <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl leading-snug">
                        Faith Code Camp
                    </h2>
                    <p
                        className="font-semibold text-base sm:text-lg mt-1"
                        style={{
                            background: 'linear-gradient(135deg, #FFB563, #FFD29D)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        ถอดรหัสชีวิต ด้วยศรัทธา
                    </p>
                </div>

                {/* Date */}
                <p className="text-white/60 text-sm sm:text-base mb-10 tracking-wide">
                    🗓️ ระหว่างวันที่ 27 เมษายน – 1 พฤษภาคม 2569 &nbsp;|&nbsp; 🏫 ณ โรงเรียนหาดใหญ่วิทยาคาร
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/register"
                        className="w-full sm:w-auto font-extrabold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-xl hover:scale-105 transition-all duration-200"
                        style={{
                            background: 'linear-gradient(135deg, #E8913A 0%, #FFD29D 100%)',
                            color: '#3D1206',
                        }}
                    >
                        สมัครเข้าร่วมค่าย →
                    </Link>
                    <a
                        href="#schedule"
                        className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full hover:bg-white/20 transition-all duration-200"
                    >
                        ดูกำหนดการ
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-white/30 text-xs tracking-widest">SCROLL</span>
                <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
