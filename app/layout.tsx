import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ค่ายล้อมลูกรักด้วยศรัทธา - ถอดรหัสชีวิต ด้วยศรัทธา",
  description:
    "ค่ายล้อมลูกรัก ด้วยศรัทธา ตอน ถอดรหัสชีวิตด้วยศรัทธา วันที่ 27 เม.ย. - 1 พ.ค. 2569 ณ โรงเรียนหาดใหญ่วิทยาคาร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased font-thai">{children}</body>
    </html>
  );
}
