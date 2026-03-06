'use client';

import { useState, useEffect, useCallback } from 'react';

// ================================================================
//  ⚙️ วาง URL ที่ได้จาก Google Sheets → Publish to web → CSV ที่นี่
// ================================================================
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTO7HJ-UUgpdn8Xa6RhCcGv4Chw1Q4Ud1bjOXe4iiU0x_Xu9VEjDjMZBlpUE7BNWsVwRik-AF7-U9VX/pub?gid=0&single=true&output=csv';
// ================================================================

// รหัสผ่านสำหรับทีมงาน (เปลี่ยนได้ตามต้องการ)
const DASHBOARD_PIN = '1234';
// ================================================================

type Registrant = {
    timestamp: string;
    gender: string;
    firstName: string;
    lastName: string;
    age: string;
    grade: string;
    school: string;
    province: string;
    parentName: string;
    parentPhone: string;
    drugAllergy: string;
    foodAllergy: string;
    chronicDisease: string;
    shirtSize: string;
    firstTime: string;
    quranLevel: string;
    parentExpectation: string;
    studentExpectation: string;
};

// ── Simple CSV parser (handles quoted fields) ──────────────────
function parseCSV(text: string): string[][] {
    const rows: string[][] = [];
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
        if (!line.trim()) continue;
        const cols: string[] = [];
        let cur = '';
        let inQ = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') { inQ = !inQ; continue; }
            if (c === ',' && !inQ) { cols.push(cur); cur = ''; continue; }
            cur += c;
        }
        cols.push(cur);
        rows.push(cols);
    }
    return rows;
}

function rowToRegistrant(row: string[]): Registrant {
    const [
        timestamp, gender, firstName, lastName, age, grade, school, province,
        parentName, parentPhone, drugAllergy, foodAllergy, chronicDisease,
        shirtSize, firstTime, quranLevel, parentExpectation, studentExpectation,
    ] = row.map((v) => v.trim());
    return {
        timestamp, gender, firstName, lastName, age, grade, school, province,
        parentName, parentPhone, drugAllergy, foodAllergy, chronicDisease,
        shirtSize, firstTime, quranLevel, parentExpectation, studentExpectation,
    };
}

// ── Stat card ─────────────────────────────────────────────────
function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
            <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
            {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
    );
}

export default function DashboardPage() {
    const [pin, setPin] = useState('');
    const [authed, setAuthed] = useState(false);
    const [pinError, setPinError] = useState(false);

    const [data, setData] = useState<Registrant[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [search, setSearch] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterGrade, setFilterGrade] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [selected, setSelected] = useState<Registrant | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setFetchError('');
        try {
            const res = await fetch(SHEET_CSV_URL);
            if (!res.ok) throw new Error('ไม่สามารถดึงข้อมูลได้');
            const text = await res.text();
            const rows = parseCSV(text);
            // Skip header row
            const regs = rows.slice(1).filter((r) => r.length >= 5 && r[0]).map(rowToRegistrant);
            setData(regs);
        } catch (e) {
            console.error(e);
            setFetchError('ไม่สามารถดึงข้อมูลจาก Google Sheet ได้ — ตรวจสอบว่า Publish to web แล้วหรือยัง');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (authed) fetchData();
    }, [authed, fetchData]);

    const handlePin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === DASHBOARD_PIN) {
            setAuthed(true);
            setPinError(false);
        } else {
            setPinError(true);
            setPin('');
        }
    };

    // ── Filtered data ────────────────────────────────────────────
    const filtered = data.filter((r) => {
        const q = search.toLowerCase();
        const matchQ = !q || `${r.firstName} ${r.lastName} ${r.school} ${r.province}`.toLowerCase().includes(q);
        const matchG = !filterGender || r.gender === filterGender;
        const matchGr = !filterGrade || r.grade === filterGrade;
        const matchS = !filterSize || r.shirtSize === filterSize;
        return matchQ && matchG && matchGr && matchS;
    });

    // ── Stats ────────────────────────────────────────────────────
    const total = data.length;
    const males = data.filter((r) => r.gender === 'ชาย').length;
    const females = data.filter((r) => r.gender === 'หญิง').length;
    const firstTimers = data.filter((r) => r.firstTime?.startsWith('ใช่')).length;
    const sizeCounts = ['S', 'M', 'L', 'XL'].map((s) => ({
        size: s,
        count: data.filter((r) => r.shirtSize === s).length,
    }));
    const gradeCounts: Record<string, number> = {};
    data.forEach((r) => { gradeCounts[r.grade] = (gradeCounts[r.grade] || 0) + 1; });

    // ── PIN Gate ─────────────────────────────────────────────────
    if (!authed) {
        return (
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{ background: 'linear-gradient(160deg, #1E0A02 0%, #5C1A06 50%, #882A0A 100%)' }}
            >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-sm text-center">
                    <div className="text-5xl mb-4">🔐</div>
                    <h1 className="text-white font-extrabold text-2xl mb-1">Dashboard</h1>
                    <p className="text-white/50 text-sm mb-6">สำหรับทีมงานค่ายเท่านั้น</p>
                    <form onSubmit={handlePin} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="รหัสผ่านทีมงาน"
                            maxLength={10}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-widest placeholder-white/20 focus:outline-none focus:border-amber-400/60"
                        />
                        {pinError && <p className="text-red-400 text-sm">รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง</p>}
                        <button
                            type="submit"
                            className="w-full font-bold py-3 rounded-xl"
                            style={{ background: 'linear-gradient(135deg, #E8913A, #FFD29D)', color: '#3D1206' }}
                        >
                            เข้าสู่ Dashboard →
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ── Main Dashboard ───────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#FFF8F0]">
            {/* Top bar */}
            <div className="sticky top-0 z-30 bg-[#3D1206]/95 backdrop-blur-md shadow-md px-4 sm:px-8 py-3 flex items-center justify-between">
                <div>
                    <h1 className="text-[#FFD29D] font-extrabold text-base sm:text-lg">📊 Dashboard ทีมงานค่าย</h1>
                    <p className="text-white/40 text-xs">ล้อมลูกรักด้วยศรัทธา 2569</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                    >
                        <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        รีเฟรช
                    </button>
                    <button
                        onClick={() => setAuthed(false)}
                        className="text-white/40 hover:text-white/70 text-xs transition-colors"
                    >
                        ออก
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

                {/* Error */}
                {fetchError && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-600 text-sm flex items-start gap-3">
                        <span className="text-xl">⚠️</span>
                        <div>
                            <p className="font-bold mb-1">ไม่สามารถดึงข้อมูลได้</p>
                            <p>{fetchError}</p>
                            <p className="mt-2 text-xs text-red-400">
                                วิธีแก้: เปิด Google Sheet → File → Share → Publish to web → เลือก Sheet1 → CSV → Publish
                                แล้ว copy Sheet ID ใส่ใน <code className="bg-red-100 px-1 rounded">SHEET_ID</code> ในโค้ด
                            </p>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="w-10 h-10 border-4 border-amber-300 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                            <p className="text-amber-700 text-sm font-medium">กำลังดึงข้อมูล...</p>
                        </div>
                    </div>
                )}

                {!loading && data.length > 0 && (
                    <>
                        {/* ── Stats ── */}
                        <div>
                            <h2 className="text-[#882A0A] font-bold text-sm uppercase tracking-widest mb-4">📈 สรุปภาพรวม</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                <StatCard label="ผู้สมัครทั้งหมด" value={total} sub="คน" color="text-[#882A0A]" />
                                <StatCard label="เพศชาย" value={males} sub={`${Math.round(males / total * 100)}%`} color="text-blue-600" />
                                <StatCard label="เพศหญิง" value={females} sub={`${Math.round(females / total * 100)}%`} color="text-pink-500" />
                                <StatCard label="เข้าค่ายครั้งแรก" value={firstTimers} sub={`${Math.round(firstTimers / total * 100)}%`} color="text-green-600" />
                            </div>

                            {/* ไซส์เสื้อ */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">👕 ไซส์เสื้อ</p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {sizeCounts.map(({ size, count }) => (
                                            <div key={size} className="text-center">
                                                <div
                                                    className="h-16 rounded-xl flex items-end justify-center pb-2 mb-1"
                                                    style={{
                                                        background: `linear-gradient(to top, #882A0A ${total ? (count / total * 100) : 0}%, #FFF8F0 0%)`,
                                                        minHeight: '4rem',
                                                    }}
                                                >
                                                    <span className="text-xs font-bold text-[#882A0A] bg-white/80 rounded-full px-1">{count}</span>
                                                </div>
                                                <span className="text-xs font-bold text-gray-600">{size}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">📚 ชั้นเรียน</p>
                                    <div className="space-y-1.5">
                                        {Object.entries(gradeCounts).sort().map(([grade, count]) => (
                                            <div key={grade} className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-gray-500 w-8">{grade}</span>
                                                <div className="flex-1 bg-amber-50 rounded-full h-4 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${(count / total * 100)}%`,
                                                            background: 'linear-gradient(135deg, #882A0A, #FFB563)',
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-600 w-6 text-right">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Filter & Search ── */}
                        <div>
                            <h2 className="text-[#882A0A] font-bold text-sm uppercase tracking-widest mb-4">👤 รายชื่อผู้สมัคร ({filtered.length} คน)</h2>
                            <div className="flex flex-wrap gap-3 mb-4">
                                <input
                                    type="text"
                                    placeholder="🔍 ค้นหาชื่อ โรงเรียน จังหวัด..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 min-w-[200px] bg-white border border-amber-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#FFB563] shadow-sm"
                                />
                                <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}
                                    className="bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 focus:outline-none shadow-sm">
                                    <option value="">เพศ: ทั้งหมด</option>
                                    <option value="ชาย">ชาย</option>
                                    <option value="หญิง">หญิง</option>
                                </select>
                                <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}
                                    className="bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 focus:outline-none shadow-sm">
                                    <option value="">ชั้น: ทั้งหมด</option>
                                    {['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'].map((g) => <option key={g} value={g}>{g}</option>)}
                                </select>
                                <select value={filterSize} onChange={(e) => setFilterSize(e.target.value)}
                                    className="bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 focus:outline-none shadow-sm">
                                    <option value="">เสื้อ: ทั้งหมด</option>
                                    {['S', 'M', 'L', 'XL'].map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {(search || filterGender || filterGrade || filterSize) && (
                                    <button onClick={() => { setSearch(''); setFilterGender(''); setFilterGrade(''); setFilterSize(''); }}
                                        className="text-xs text-gray-400 hover:text-[#882A0A] underline transition-colors">
                                        ล้างตัวกรอง
                                    </button>
                                )}
                            </div>

                            {/* Table */}
                            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-[#882A0A]/5 border-b border-amber-100">
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">#</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">ชื่อ-สกุล</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">เพศ</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">อายุ</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">ชั้น</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">โรงเรียน</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">จังหวัด</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">เสื้อ</th>
                                                <th className="text-left py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">ครั้งแรก</th>
                                                <th className="py-3 px-4 text-xs font-bold text-[#882A0A] uppercase tracking-wide whitespace-nowrap">ดูเพิ่ม</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.map((r, i) => (
                                                <tr key={i} className="border-b border-gray-50 hover:bg-amber-50 transition-colors">
                                                    <td className="py-3 px-4 text-gray-400 text-xs">{i + 1}</td>
                                                    <td className="py-3 px-4 font-semibold text-gray-800 whitespace-nowrap">{r.firstName} {r.lastName}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${r.gender === 'ชาย' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                                            {r.gender === 'ชาย' ? '👦' : '👧'} {r.gender}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-600">{r.age}</td>
                                                    <td className="py-3 px-4">
                                                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{r.grade}</span>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-600 max-w-[160px] truncate">{r.school}</td>
                                                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{r.province}</td>
                                                    <td className="py-3 px-4">
                                                        <span className="bg-[#882A0A]/10 text-[#882A0A] text-xs font-bold px-2 py-0.5 rounded-full">{r.shirtSize}</span>
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        {r.firstTime?.startsWith('ใช่') ? (
                                                            <span className="text-green-500 text-base">✅</span>
                                                        ) : (
                                                            <span className="text-gray-300 text-base">—</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4 text-center">
                                                        <button
                                                            onClick={() => setSelected(r)}
                                                            className="text-[#882A0A] hover:text-[#FFB563] text-xs font-semibold underline transition-colors"
                                                        >
                                                            ดู
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan={10} className="py-16 text-center text-gray-400 text-sm">
                                                        ไม่พบข้อมูลที่ค้นหา
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {!loading && data.length === 0 && !fetchError && (
                    <div className="text-center py-20 text-gray-400">
                        <div className="text-5xl mb-3">📭</div>
                        <p className="font-semibold">ยังไม่มีผู้สมัคร หรือยังไม่ได้ตั้งค่า Sheet ID</p>
                    </div>
                )}
            </div>

            {/* ── Detail Modal ── */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                            <div>
                                <h3 className="font-extrabold text-gray-800 text-lg">{selected.firstName} {selected.lastName}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{selected.timestamp ? new Date(selected.timestamp).toLocaleString('th-TH') : ''}</p>
                            </div>
                            <button onClick={() => setSelected(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                                ✕
                            </button>
                        </div>

                        <div className="px-6 py-5 space-y-5">
                            {[
                                {
                                    section: '👤 ข้อมูลส่วนตัว', fields: [
                                        ['เพศ', selected.gender], ['อายุ', selected.age + ' ปี'],
                                        ['ชั้น', selected.grade], ['โรงเรียน', selected.school],
                                        ['จังหวัด', selected.province],
                                    ]
                                },
                                {
                                    section: '👨‍👩‍👧 ผู้ปกครอง', fields: [
                                        ['ชื่อ-สกุล', selected.parentName],
                                        ['เบอร์โทร', selected.parentPhone],
                                    ]
                                },
                                {
                                    section: '🏥 ประวัติการแพ้', fields: [
                                        ['แพ้ยา', selected.drugAllergy],
                                        ['แพ้อาหาร', selected.foodAllergy],
                                        ['โรคประจำตัว', selected.chronicDisease],
                                    ]
                                },
                                {
                                    section: '📋 เพิ่มเติม', fields: [
                                        ['ไซส์เสื้อ', selected.shirtSize],
                                        ['เข้าค่ายครั้งแรก', selected.firstTime],
                                        ['ระดับอัลกุรอาน', selected.quranLevel],
                                    ]
                                },
                            ].map(({ section, fields }) => (
                                <div key={section}>
                                    <h4 className="text-xs font-bold text-[#882A0A] uppercase tracking-wider mb-2">{section}</h4>
                                    <div className="bg-amber-50 rounded-2xl overflow-hidden divide-y divide-amber-100">
                                        {fields.map(([label, val]) => (
                                            <div key={label} className="flex gap-3 px-4 py-2.5">
                                                <span className="text-gray-400 text-xs w-28 flex-shrink-0 pt-0.5">{label}</span>
                                                <span className="text-gray-800 text-sm font-medium flex-1">{val || '—'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {(selected.parentExpectation || selected.studentExpectation) && (
                                <div>
                                    <h4 className="text-xs font-bold text-[#882A0A] uppercase tracking-wider mb-2">💬 ความคาดหวัง</h4>
                                    {selected.parentExpectation && (
                                        <div className="bg-amber-50 rounded-2xl p-4 mb-2">
                                            <p className="text-xs text-gray-400 mb-1">ผู้ปกครอง</p>
                                            <p className="text-sm text-gray-700">{selected.parentExpectation}</p>
                                        </div>
                                    )}
                                    {selected.studentExpectation && (
                                        <div className="bg-amber-50 rounded-2xl p-4">
                                            <p className="text-xs text-gray-400 mb-1">น้อง</p>
                                            <p className="text-sm text-gray-700">{selected.studentExpectation}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
