import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-14 px-4 sm:px-8" style={{ background: '#1E0A02' }}>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
                    {/* Brand */}
                    <div>
                        <h3 className="font-extrabold text-lg mb-1" style={{ color: '#FFD29D' }}>
                            ล้อมลูกรัก ด้วยศรัทธา
                        </h3>
                        <p className="font-semibold text-sm mb-3" style={{ color: '#FFB563' }}>
                            ค่ายล้อมลูกรักด้วยศรัทธา
                        </p>
                        <p className="text-white/50 text-sm leading-relaxed">
                            ค่ายอิสลามเพื่อเยาวชน สร้างความเข้มแข็งด้านศรัทธา ความรู้ และทักษะชีวิต
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">ลิงก์ด่วน</h4>
                        <ul className="space-y-2">
                            {[
                                { href: '#location', label: 'สถานที่จัดงาน' },
                                { href: '#schedule', label: 'กำหนดการ' },
                                { href: '#gallery', label: 'ภาพบรรยากาศ' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <a href={l.href}
                                        className="text-white/50 hover:text-[#FFD29D] text-sm transition-colors duration-200">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">ติดต่อ</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FFB563' }}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-white/50 text-sm">โรงเรียนหาดใหญ่วิทยาคาร<br />อ.หาดใหญ่ จ.สงขลา</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#FFB563' }}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p className="text-white/50 text-sm">อมีรโครงการ</p>
                                    <a href="tel:0910463361" className="text-[#FFB563] text-sm font-semibold hover:text-[#FFD29D] transition-colors">
                                        091-046-3361
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#FFB563' }}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p className="text-white/50 text-sm">อมีเราะโครงการ</p>
                                    <a href="tel:0894632474" className="text-[#FFB563] text-sm font-semibold hover:text-[#FFD29D] transition-colors">
                                        089-463-2474
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-xs">
                        © 2569 ค่ายล้อมลูกรักด้วยศรัทธา สงวนลิขสิทธิ์
                    </p>
                    <Link
                        href="/register"
                        className="font-bold text-xs px-5 py-2 rounded-full hover:scale-105 transition-transform"
                        style={{ background: 'linear-gradient(135deg, #E8913A, #FFD29D)', color: '#3D1206' }}
                    >
                        สมัครเข้าร่วมค่าย →
                    </Link>
                </div>
            </div>
        </footer>
    );
}
