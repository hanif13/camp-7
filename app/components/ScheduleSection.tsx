export default function ScheduleSection() {
    const days = [
        {
            day: 'วันที่ 1',
            date: '27 เม.ย.',
            events: [
                { time: '08:00 - 12:00', title: 'ลงทะเบียนและเปิดค่าย', desc: 'รับรายงานตัว แนะนำตัว และพิธีเปิดอย่างเป็นทางการ' },
                { time: '13:00 - 17:00', title: 'กิจกรรม Ice Breaking', desc: 'สร้างความคุ้นเคยและความสัมพันธ์ระหว่างผู้เข้าร่วม' },
                { time: '19:00 - 21:00', title: 'Forum: Faith & Life', desc: 'เสวนาหัวข้อ "ศรัทธาคืออะไรในชีวิตของเรา"' },
            ],
        },
        {
            day: 'วันที่ 2',
            date: '28 เม.ย.',
            events: [
                { time: '07:00 - 08:30', title: 'ละหมาดซุบห์และทบทวนบทเรียน', desc: 'ฟิกห์ละหมาดและการปฏิบัติ' },
                { time: '09:00 - 12:00', title: 'Workshop: ถอดรหัสชีวิต', desc: 'กิจกรรมค้นหาจุดมุ่งหมายในชีวิตด้วยหลักอิสลาม' },
                { time: '13:00 - 17:00', title: 'Basecamp Activities', desc: 'กิจกรรมกลุ่มสร้างทักษะและการทำงานเป็นทีม' },
            ],
        },
        {
            day: 'วันที่ 3',
            date: '29 เม.ย.',
            events: [
                { time: '08:00 - 12:00', title: 'อัลกุรอานและภาษาอาหรับ', desc: 'นักเรียนฝึกอ่านและความเข้าใจอัลกุรอาน' },
                { time: '13:00 - 17:00', title: 'Field Trip: เรียนรู้นอกห้องเรียน', desc: 'เยี่ยมชมสถานที่สำคัญและบทเรียนจากธรรมชาติ' },
                { time: '19:00 - 22:00', title: 'Night Program: คืนแห่งศรัทธา', desc: 'โปรแกรมพิเศษภาคค่ำสร้างแรงบันดาลใจ' },
            ],
        },
        {
            day: 'วันที่ 4',
            date: '30 เม.ย.',
            events: [
                { time: '08:00 - 12:00', title: 'Leadership: ผู้นำแห่งอนาคต', desc: 'พัฒนาทักษะความเป็นผู้นำตามแบบอิสลาม' },
                { time: '13:00 - 17:00', title: 'Project: Faith Code', desc: 'นักเรียนนำเสนอโปรเจกต์ "โค้ดชีวิตด้วยศรัทธา"' },
                { time: '19:00 - 21:00', title: 'Cultural Night', desc: 'แสดงวัฒนธรรมและความสามารถของผู้เข้าร่วม' },
            ],
        },
        {
            day: 'วันที่ 5',
            date: '1 พ.ค.',
            events: [
                { time: '07:00 - 09:00', title: 'พิธีส่งมอบเกียรติบัตร', desc: 'มอบเกียรติบัตรและรางวัลสำหรับผู้ผ่านการอบรม' },
                { time: '09:00 - 10:30', title: 'พิธีปิดค่าย', desc: 'สรุปบทเรียน คำกล่าวปิดงาน และถ่ายภาพหมู่' },
                { time: '11:00 - 12:00', title: 'เดินทางกลับ', desc: 'เช็คเอาท์และส่งผู้เข้าร่วมกลับบ้านอย่างปลอดภัย' },
            ],
        },
    ];

    return (
        <section id="schedule" className="py-20 px-4 sm:px-8 bg-white relative overflow-hidden">
            {/* 🔴 Animated Background Blobs */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#882A0A]/5 rounded-full blur-[100px] -translate-x-1/3 animate-blob pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-[#FFB563]/10 rounded-full blur-[80px] translate-x-1/4 animate-blob-slow pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-14">
                    <span className="inline-block bg-[#FFB563]/20 text-[#882A0A] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                        กำหนดการ
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D1206] mb-3">
                        ตารางกิจกรรมค่าย
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-[#FFB563]" />
                        <span className="text-[#E8913A] text-lg">🍂</span>
                        <div className="h-px w-12 bg-[#FFB563]" />
                    </div>
                </div>

                <div className="space-y-6">
                    {days.map((day, di) => (
                        <details
                            key={di}
                            className="group bg-[#FFF8F0] rounded-2xl overflow-hidden border border-[#FFB563]/20 shadow-sm hover:shadow-md transition-shadow"
                            open={di === 0}
                        >
                            <summary className="flex items-center gap-4 px-6 py-4 cursor-pointer select-none list-none">
                                <div
                                    className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg, #882A0A, #A83A15)' }}
                                >
                                    <span className="text-[#FFD29D] text-[10px] font-bold leading-none">{day.day.split(' ')[0]}</span>
                                    <span className="text-white font-extrabold text-sm leading-none">{day.day.split(' ')[1]}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#3D1206] font-bold text-base sm:text-lg">{day.day} · {day.date}</p>
                                    <p className="text-gray-400 text-sm">{day.events.length} กิจกรรม</p>
                                </div>
                                <svg className="w-5 h-5 text-[#FFB563] transition-transform group-open:rotate-180"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-6 pb-5 pt-1 space-y-3">
                                {day.events.map((evt, ei) => (
                                    <div key={ei} className="flex gap-4 bg-white rounded-xl px-4 py-3 border border-gray-100">
                                        <div className="text-[#E8913A] font-semibold text-xs sm:text-sm whitespace-nowrap pt-0.5 min-w-[7rem]">
                                            {evt.time}
                                        </div>
                                        <div>
                                            <p className="text-[#3D1206] font-semibold text-sm sm:text-base">{evt.title}</p>
                                            <p className="text-gray-500 text-xs sm:text-sm">{evt.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
