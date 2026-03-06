export default function InfoSection() {
    const infoCards = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            label: 'วันที่จัดค่าย',
            title: '27 เม.ย. – 1 พ.ค. 2569',
            sub: '5 วัน 4 คืน',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'สถานที่จัดค่าย',
            title: 'โรงเรียนหาดใหญ่วิทยาคาร',
            sub: 'อำเภอหาดใหญ่ จังหวัดสงขลา',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'กลุ่มเป้าหมาย',
            title: 'เยาวชนมุสลิม',
            sub: 'ระดับชั้นประถมศึกษา',
        },
    ];

    return (
        <section id="info" className="py-20 px-4 sm:px-8 bg-[#FFF8F0] relative overflow-hidden">
            {/* 🔴 Animated Background Blobs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFB563]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 animate-blob-slow pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#882A0A]/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 animate-blob pointer-events-none" style={{ animationDelay: '1s' }} />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-14">
                    <span className="inline-block bg-[#882A0A]/10 text-[#882A0A] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                        ข้อมูลค่าย
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D1206] mb-3">
                        รายละเอียดการจัดค่าย
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-[#FFB563]" />
                        <span className="text-[#E8913A] text-lg">🍂</span>
                        <div className="h-px w-12 bg-[#FFB563]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {infoCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border-t-4 border-[#FFB563]"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#882A0A]/10 flex items-center justify-center text-[#882A0A] mb-5">
                                {card.icon}
                            </div>
                            <p className="text-[#E8913A] text-xs font-bold uppercase tracking-widest mb-1">
                                {card.label}
                            </p>
                            <h3 className="text-[#3D1206] font-extrabold text-lg sm:text-xl leading-snug mb-1">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 text-sm">{card.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
