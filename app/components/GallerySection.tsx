export default function GallerySection() {
    const placeholders = [
        { label: 'พิธีเปิดค่าย', bg: '#5C1A06', emoji: '🌙' },
        { label: 'กิจกรรมกลุ่ม', bg: '#882A0A', emoji: '🤝' },
        { label: 'Workshop ศรัทธา', bg: '#6B7A40', emoji: '📖' },
        { label: 'Night Program', bg: '#3D1206', emoji: '⭐' },
        { label: 'Field Trip', bg: '#7A6030', emoji: '🌿' },
        { label: 'พิธีปิดค่าย', bg: '#A83A15', emoji: '🎓' },
    ];

    return (
        <section id="gallery" className="py-20 px-4 sm:px-8" style={{ background: '#3D1206' }}>
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                    <span className="inline-block bg-white/10 text-[#FFD29D] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                        ภาพบรรยากาศ
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                        ความประทับใจจากค่าย
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-[#FFB563]" />
                        <span className="text-[#FFD29D] text-lg">🍂</span>
                        <div className="h-px w-12 bg-[#FFB563]" />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {placeholders.map((item, i) => (
                        <div
                            key={i}
                            className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
                            style={{ background: item.bg }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                <span className="text-4xl sm:text-5xl">{item.emoji}</span>
                                <span className="text-white/80 text-xs sm:text-sm font-semibold text-center px-2">
                                    {item.label}
                                </span>
                            </div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                style={{ background: 'rgba(232,145,58,0.2)' }}>
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                                <span className="text-white/50 text-[10px]">วางรูปภาพที่นี่</span>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-white/30 text-sm mt-6 italic">
                    * ภาพบรรยากาศจะอัปเดตหลังจากจัดงาน
                </p>
            </div>
        </section>
    );
}
