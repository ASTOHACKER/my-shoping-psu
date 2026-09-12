import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">เกี่ยวกับเรา</h1>
      <p className="text-sm text-zinc-600 mt-3 leading-relaxed max-w-[65ch]">
        Sweet Bakery Cafe ร้านขนมโฮมเมดที่ใส่ใจทุกขั้นตอน คัดวัตถุดิบคุณภาพ เนยสดแท้ ช็อกโกแลตเข้มข้น อบใหม่ทุกวัน
      </p>
      <div className="mt-6 border border-zinc-200 rounded-lg p-4 bg-zinc-50">
        <ul className="text-sm text-zinc-700 space-y-1.5 list-disc list-inside">
          <li>วัตถุดิบคุณภาพ ปลอดภัย ไม่มีสารกันบูด</li>
          <li>อบสดใหม่ทุกเช้า</li>
          <li>ส่งมอบความสุขในทุกคำ</li>
        </ul>
      </div>
    </div>
  );
}
