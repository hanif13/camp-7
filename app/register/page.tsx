'use client';

import { useState } from 'react';
import Link from 'next/link';

// ===============================================================
//  ⚙️  วาง Google Apps Script Deployment URL ของคุณที่นี่
// ===============================================================
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWXWrRUWQVQQzdjGKwIJRcSjLqOzfV3USLq2xRFVz-yhymYloaynznWNHI_rKcjbg1yA/exec';
// ===============================================================

type FormState = 'idle' | 'loading' | 'success' | 'error';

const SHIRT_SIZES = [
    { id: 'S', chest: '34"', length: '27"' },
    { id: 'M', chest: '36"', length: '28"' },
    { id: 'L', chest: '38"', length: '29"' },
    { id: 'XL', chest: '40"', length: '30"' },
];

const QURAN_LEVELS = [
    'อ่านไม่ได้เลย',
    'อ่านได้บ้าง (สะกดรายตัว)',
    'อ่านได้ปกติ (ไม่คล่อง)',
    'อ่านคล่อง (มีตัวชัต)',
    'อ่านคล่อง ไม่มีตัวชัต',
    'ท่องจำได้ (ฮาฟิซ)',
];

export default function RegisterPage() {
    const [form, setForm] = useState({
        // ข้อมูลส่วนตัว
        gender: '',
        firstName: '',
        lastName: '',
        age: '',
        grade: '',
        school: '',
        province: '',
        // ข้อมูลผู้ปกครอง
        parentName: '',
        parentPhone: '',
        // ประวัติการแพ้
        drugAllergy: '',
        foodAllergy: '',
        chronicDisease: '',
        // ไซส์เสื้อ
        shirtSize: '',
        // เพิ่มเติม
        firstTime: '',
        parentExpectation: '',
        studentExpectation: '',
        quranLevel: '',
    });
    const [state, setState] = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const set = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState('loading');
        setErrorMsg('');
        try {
            await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
            });
            setState('success');
            setForm({
                gender: '', firstName: '', lastName: '', age: '', grade: '', school: '',
                province: '', parentName: '', parentPhone: '', drugAllergy: '', foodAllergy: '',
                chronicDisease: '', shirtSize: '', firstTime: '', parentExpectation: '',
                studentExpectation: '', quranLevel: '',
            });
        } catch (err) {
            console.error(err);
            setState('error');
            setErrorMsg('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    };

    /* ── styles ── */
    const inputCls =
        'w-full bg-white/[0.08] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFB563]/60 focus:bg-white/[0.12] transition-all';
    const labelCls = 'block text-white/70 text-xs font-semibold mb-1.5 uppercase tracking-wider';

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: 'linear-gradient(160deg, #1E0A02 0%, #5C1A06 50%, #882A0A 100%)' }}
        >
            {/* Back */}
            <div className="px-4 py-4 sm:px-8">
                <Link href="/"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-[#FFD29D] text-sm transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    กลับหน้าหลัก
                </Link>
            </div>

            <div className="flex-1 flex items-start justify-center px-4 py-8 sm:px-8">
                <div className="w-full max-w-xl">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-[#FFB563]/30 rounded-full px-4 py-1.5 mb-5">
                            <span className="w-2 h-2 rounded-full bg-[#FFD29D] animate-pulse" />
                            <span className="text-[#FFD29D] text-xs font-semibold tracking-widest uppercase">
                                ค่ายล้อมลูกรักด้วยศรัทธา 2569
                            </span>
                        </div>
                        <h1 className="text-white font-extrabold text-3xl sm:text-4xl mb-2">ลงทะเบียนเข้าค่าย</h1>
                        <p className="text-white/50 text-sm">กรอกข้อมูลให้ครบถ้วนเพื่อยืนยันการสมัคร</p>
                    </div>

                    {/* Success */}
                    {state === 'success' ? (
                        <div className="bg-white/[0.08] backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 text-center">
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
                                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-white font-bold text-2xl mb-2">ลงทะเบียนสำเร็จ! 🎉</h2>
                            <p className="text-white/60 text-sm mb-6">
                                ขอบคุณที่สมัครเข้าร่วมค่ายล้อมลูกรักด้วยศรัทธา 2569<br />รอติดตามประกาศรายชื่อผู้มีสิทธิ์เข้าร่วมค่ายเร็ว ๆ นี้
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button onClick={() => setState('idle')}
                                    className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all">
                                    ลงทะเบียนอีกคน
                                </button>
                                <Link href="/"
                                    className="font-bold text-sm px-6 py-2.5 rounded-full text-center hover:scale-105 transition-transform"
                                    style={{ background: 'linear-gradient(135deg, #E8913A, #FFD29D)', color: '#3D1206' }}>
                                    กลับหน้าหลัก
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* ═══ ข้อมูลส่วนตัว ═══ */}
                            <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
                                <h2 className="text-[#FFD29D] font-bold text-base flex items-center gap-2">
                                    <span className="text-xl">👤</span> ข้อมูลส่วนตัว
                                </h2>

                                {/* เพศ */}
                                <div>
                                    <label className={labelCls}>เพศ <span className="text-red-400">*</span></label>
                                    <div className="flex gap-3">
                                        {['ชาย', 'หญิง'].map((g) => (
                                            <label key={g}
                                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer text-sm font-semibold transition-all ${form.gender === g
                                                    ? 'border-[#FFB563] bg-[#FFB563]/20 text-[#FFD29D]'
                                                    : 'border-white/10 bg-white/[0.06] text-white/60 hover:border-white/30'
                                                    }`}>
                                                <input type="radio" name="gender" value={g} required
                                                    className="sr-only" onChange={set('gender')} />
                                                {g === 'ชาย' ? '👳🏻‍♂️' : '🧕🏻'} {g}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* ชื่อ-สกุล */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelCls}>ชื่อ <span className="text-red-400">*</span></label>
                                        <input type="text" placeholder="ชื่อจริง" required value={form.firstName}
                                            onChange={set('firstName')} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className={labelCls}>นามสกุล <span className="text-red-400">*</span></label>
                                        <input type="text" placeholder="นามสกุล" required value={form.lastName}
                                            onChange={set('lastName')} className={inputCls} />
                                    </div>
                                </div>

                                {/* อายุ + ชั้น */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelCls}>อายุ (ปี) <span className="text-red-400">*</span></label>
                                        <input type="number" placeholder="เช่น 10" required
                                            value={form.age} onChange={set('age')} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className={labelCls}>ชั้นเรียน <span className="text-red-400">*</span></label>
                                        <select value={form.grade} onChange={set('grade')} required
                                            className={inputCls} style={{ colorScheme: 'dark' }}>
                                            <option value="" disabled className="bg-[#5C1A06]">เลือกชั้น...</option>
                                            {['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'].map((g) => (
                                                <option key={g} value={g} className="bg-[#5C1A06]">{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* โรงเรียน */}
                                <div>
                                    <label className={labelCls}>โรงเรียน / สถานศึกษา <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="ชื่อโรงเรียนหรือมหาวิทยาลัย" required
                                        value={form.school} onChange={set('school')} className={inputCls} />
                                </div>

                                {/* จังหวัด */}
                                <div>
                                    <label className={labelCls}>จังหวัดที่อาศัย <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="เช่น สงขลา, ปัตตานี" required
                                        value={form.province} onChange={set('province')} className={inputCls} />
                                </div>
                            </div>

                            {/* ═══ ข้อมูลผู้ปกครอง ═══ */}
                            <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
                                <h2 className="text-[#FFD29D] font-bold text-base flex items-center gap-2">
                                    <span className="text-xl">👨‍👩‍👧</span> ข้อมูลติดต่อผู้ปกครอง
                                </h2>

                                <div>
                                    <label className={labelCls}>ชื่อ-สกุล ผู้ปกครอง <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="ชื่อ-นามสกุล ผู้ปกครอง" required
                                        value={form.parentName} onChange={set('parentName')} className={inputCls} />
                                </div>

                                <div>
                                    <label className={labelCls}>
                                        เบอร์โทร ผู้ปกครอง <span className="text-red-400">*</span>
                                        <span className="text-white/30 text-[10px] ml-1 normal-case">(ที่ติดต่อได้วันค่าย)</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </span>
                                        <input type="tel" placeholder="0XX-XXX-XXXX" pattern="[0-9]{10}" maxLength={10}
                                            required value={form.parentPhone} onChange={set('parentPhone')}
                                            className={`${inputCls} pl-10`} />
                                    </div>
                                </div>
                            </div>

                            {/* ═══ ประวัติการแพ้ ═══ */}
                            <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
                                <h2 className="text-[#FFD29D] font-bold text-base flex items-center gap-2">
                                    <span className="text-xl">🏥</span> ประวัติการแพ้ / โรคประจำตัว
                                </h2>
                                <p className="text-white/30 text-xs -mt-1">ถ้าไม่มีให้ระบุ &quot;ไม่มี&quot;</p>

                                <div>
                                    <label className={labelCls}>แพ้ยา <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="ระบุชื่อยา หรือ ไม่มี" required
                                        value={form.drugAllergy} onChange={set('drugAllergy')} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>แพ้อาหาร <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="ระบุอาหาร หรือ ไม่มี" required
                                        value={form.foodAllergy} onChange={set('foodAllergy')} className={inputCls} />
                                </div>
                                <div>
                                    <label className={labelCls}>โรคประจำตัว <span className="text-red-400">*</span></label>
                                    <input type="text" placeholder="ระบุโรค หรือ ไม่มี" required
                                        value={form.chronicDisease} onChange={set('chronicDisease')} className={inputCls} />
                                </div>
                            </div>

                            {/* ═══ ไซส์เสื้อ ═══ */}
                            <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
                                <h2 className="text-[#FFD29D] font-bold text-base flex items-center gap-2">
                                    <span className="text-xl">👕</span> ไซส์เสื้อค่าย
                                </h2>

                                {/* Size chart */}
                                <div className="bg-white/[0.06] rounded-2xl overflow-hidden border border-white/10">
                                    <table className="w-full text-center text-xs">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="py-2 px-3 text-[#FFB563] font-bold">ไซส์</th>
                                                <th className="py-2 px-3 text-white/60 font-semibold">รอบอก</th>
                                                <th className="py-2 px-3 text-white/60 font-semibold">ความยาว</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {SHIRT_SIZES.map((s) => (
                                                <tr key={s.id} className="border-b border-white/5 last:border-0">
                                                    <td className="py-2 px-3 text-white font-bold">{s.id}</td>
                                                    <td className="py-2 px-3 text-white/60">{s.chest}</td>
                                                    <td className="py-2 px-3 text-white/60">{s.length}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Picker */}
                                <div>
                                    <label className={labelCls}>เลือกไซส์ <span className="text-red-400">*</span></label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {SHIRT_SIZES.map((s) => (
                                            <label key={s.id}
                                                className={`flex items-center justify-center py-3 rounded-xl border cursor-pointer font-bold text-sm transition-all ${form.shirtSize === s.id
                                                    ? 'border-[#FFB563] bg-[#FFB563]/20 text-[#FFD29D]'
                                                    : 'border-white/10 bg-white/[0.06] text-white/60 hover:border-white/30'
                                                    }`}>
                                                <input type="radio" name="shirtSize" value={s.id} required
                                                    className="sr-only" onChange={set('shirtSize')} />
                                                {s.id}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ═══ ข้อมูลเพิ่มเติม ═══ */}
                            <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
                                <h2 className="text-[#FFD29D] font-bold text-base flex items-center gap-2">
                                    <span className="text-xl">📋</span> ข้อมูลเพิ่มเติม
                                </h2>

                                {/* เข้าค่ายครั้งแรก */}
                                <div>
                                    <label className={labelCls}>เข้าค่ายนี้ครั้งแรกไหม? <span className="text-red-400">*</span></label>
                                    <div className="flex gap-3">
                                        {['ใช่ (ครั้งแรก)', 'ไม่ใช่ (เคยเข้าแล้ว)'].map((v) => (
                                            <label key={v}
                                                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all text-center ${form.firstTime === v
                                                    ? 'border-[#FFB563] bg-[#FFB563]/20 text-[#FFD29D]'
                                                    : 'border-white/10 bg-white/[0.06] text-white/60 hover:border-white/30'
                                                    }`}>
                                                <input type="radio" name="firstTime" value={v} required
                                                    className="sr-only" onChange={set('firstTime')} />
                                                {v}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* ระดับอัลกุรอาน */}
                                <div>
                                    <label className={labelCls}>ระดับการอ่านอัลกุรอาน <span className="text-red-400">*</span></label>
                                    <select value={form.quranLevel} onChange={set('quranLevel')} required
                                        className={inputCls} style={{ colorScheme: 'dark' }}>
                                        <option value="" disabled className="bg-[#5C1A06]">เลือกระดับ...</option>
                                        {QURAN_LEVELS.map((l) => (
                                            <option key={l} value={l} className="bg-[#5C1A06]">{l}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* ผู้ปกครองคาดหวัง */}
                                <div>
                                    <label className={labelCls}>
                                        ผู้ปกครองคาดหวังอะไรจากการส่งน้องเข้าค่าย?
                                    </label>
                                    <textarea rows={3} placeholder="กรอกความคาดหวัง..."
                                        value={form.parentExpectation} onChange={set('parentExpectation')}
                                        className={`${inputCls} resize-none`} />
                                </div>

                                {/* น้องคาดหวัง */}
                                <div>
                                    <label className={labelCls}>น้องคาดหวังอะไรจากการเข้าค่าย?</label>
                                    <textarea rows={3} placeholder="กรอกความคาดหวัง..."
                                        value={form.studentExpectation} onChange={set('studentExpectation')}
                                        className={`${inputCls} resize-none`} />
                                </div>
                            </div>

                            {/* Error */}
                            {state === 'error' && (
                                <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
                                    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-red-300 text-sm">{errorMsg}</p>
                                </div>
                            )}

                            {/* Submit */}
                            <button type="submit" disabled={state === 'loading'}
                                className="w-full font-extrabold text-base py-3.5 rounded-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(135deg, #E8913A, #FFD29D)', color: '#3D1206' }}>
                                {state === 'loading' ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        กำลังส่งข้อมูล...
                                    </>
                                ) : (
                                    'ยืนยันการลงทะเบียน →'
                                )}
                            </button>

                            <p className="text-center text-white/25 text-xs pb-4">
                                ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการจัดค่ายเท่านั้น
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
