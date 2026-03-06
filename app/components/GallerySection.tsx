import Image from 'next/image';

export default function GallerySection() {
    // ใช้รูปจาก public/activity/ ทั้ง 6 รูป
    const images = Array.from({ length: 6 }).map((_, i) => `/activity/activity${i + 1}.jpg`);

    return (
        <section id="gallery" className="py-24 px-4 sm:px-8 relative overflow-hidden"
            style={{ background: '#3D1206' }} // Sienna Dark
        >
            {/* Background Decorations (Animated) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#882A0A]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-blob pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFB563]/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 animate-blob-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-[#FFD29D]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 animate-blob pointer-events-none" style={{ animationDelay: '2.5s' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-[#FFB563]/10 text-[#FFB563] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                        ภาพบรรยากาศค่าย
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
                        เก็บตกความทรงจำ <span className="text-[#FFD29D]">ดีๆ</span>
                    </h2>
                    <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
                        ประสบการณ์ใหม่ มิตรภาพ และความรู้ที่ได้รับจากค่ายล้อมลูกรักด้วยศรัทธา
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className={`group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#5C1A06]/50 shadow-lg border border-white/5 
                                ${i === 0 || i === 3 ? 'md:col-span-2' : ''} 
                                ${i === 2 ? 'row-span-2' : ''}
                                min-h-[160px] sm:min-h-[200px] md:min-h-[280px]`}
                        >
                            <Image
                                src={src}
                                alt={`ภาพกิจกรรมค่าย ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1E0A02]/90 via-[#1E0A02]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Call to action (Optional but looks good) */}
                <div className="mt-16 text-center">
                    <p className="text-[#FFB563] font-semibold text-sm sm:text-base mb-2">
                        ไม่อยากพลาดประสบการณ์ดีๆ แบบนี้ใช่ไหม?
                    </p>
                    <a href="#register" className="inline-block text-white/50 hover:text-white underline text-sm transition-colors">
                        เลื่อนขึ้นไปสมัครเลย
                    </a>
                </div>
            </div>
        </section>
    );
}
