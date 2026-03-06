import Image from 'next/image';

export default function SponsorSection() {
    const orgs = [
        {
            name: 'ศูนย์ประสานงาน สถาบันอัสลาม ประจำจังหวัดสงขลา',
            logo: '/logos/sppng.jpeg',
        },
        {
            name: 'A-Junior : Assalam Junior',
            logo: '/logos/a-junior.png',
        },
        {
            name: 'โรงเรียนหาดใหญ่วิทยาคาร',
            logo: '/logos/hatyai-school.jpg',
        },
        {
            name: 'องค์การบริหารกิจการนักเรียน(อบน.) โรงเรียนหาดใหญ่วิทยาคาร',
            logo: '/logos/obn.jpg',
        },

        {
            name: 'สมาคมบัณฑิตและนักศึกษาอัสสลามสงขลา AGSA Songkhla',
            logo: '/logos/agsa.jpg',
        },
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
                        ขอขอบคุณทุกองค์กรที่ร่วมกันจัดค่ายล้อมลูกรักด้วยศรัทธา ครั้งนี้
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
                            className="group bg-white rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-[#FFB563]/20 hover:border-[#FFB563]/60 hover:-translate-y-1"
                        >
                            {/* Logo */}
                            <div className="relative w-20 h-20 mb-3 rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={org.logo}
                                    alt={org.name}
                                    fill
                                    className="object-contain p-1"
                                    sizes="80px"
                                />
                            </div>
                            <p className="text-[#3D1206] font-semibold text-[11px] sm:text-xs leading-tight">
                                {org.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
