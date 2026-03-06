export default function SponsorSection() {
    const orgs = [
        { name: 'ศปง.สงขลา', short: 'ศปง.', emoji: '🕌' },
        { name: 'A-junior สงขลา', short: 'A-Junior', emoji: '⭐' },
        { name: 'อบน ญวค', short: 'อบน', emoji: '📚' },
        { name: 'รร ญวค', short: 'รร.ญวค', emoji: '🏫' },
        { name: 'AGSA สงขลา', short: 'AGSA', emoji: '🤝' },
    ];

    return (
        <section id="sponsors" className="py-20 px-4 sm:px-8 bg-[#FFF8F0]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                    <span className="inline-block bg-[#882A0A]/10 text-[#882A0A] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                        ผู้จัดงาน
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D1206] mb-3">
                        องค์กรผู้ร่วมจัด
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                        ขอขอบคุณทุกองค์กรที่ร่วมกันจัดค่าย Faith Code Camp ครั้งนี้
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4">
                        <div className="h-px w-12 bg-[#FFB563]" />
                        <span className="text-[#E8913A] text-lg">🍂</span>
                        <div className="h-px w-12 bg-[#FFB563]" />
                    </div>
                </div>

                {/* 5 org cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {orgs.map((org, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-[#FFB563]/20 hover:border-[#FFB563]/60 hover:-translate-y-1"
                        >
                            {/* Logo placeholder */}
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 text-3xl"
                                style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFE8C8)' }}
                            >
                                {org.emoji}
                            </div>
                            {/* Placeholder label */}
                            <div className="w-full h-10 rounded-lg mb-2 flex items-center justify-center border-2 border-dashed border-[#FFB563]/40">
                                <span className="text-[#882A0A]/30 text-[9px] font-medium">วางโลโก้</span>
                            </div>
                            <p className="text-[#3D1206] font-bold text-xs sm:text-sm leading-tight">{org.name}</p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-400 text-xs mt-8 italic">
                    * โลโก้จะอัปเดตในภายหลัง
                </p>
            </div>
        </section>
    );
}
