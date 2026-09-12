import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">หน้าแรก</h1>
      <p className="text-sm text-zinc-600 mt-2 leading-relaxed max-w-[60ch]">
        Sweet Bakery Cafe — ร้านขนมโฮมเมด อบสดใหม่ทุกวัน วัตถุดิบพรีเมียม
      </p>
      <div className="mt-5 flex gap-2">
        <Link to="/products" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-black">
          ดูเมนู
        </Link>
        <Link to="/about" className="text-sm bg-white border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-50">
          เกี่ยวกับเรา
        </Link>
      </div>

      <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
        <div className="border border-zinc-200 rounded-lg p-4">
          <p className="font-medium">เนยแท้</p>
          <p className="text-xs text-zinc-500 mt-1">นำเข้าฝรั่งเศส</p>
        </div>
        <div className="border border-zinc-200 rounded-lg p-4">
          <p className="font-medium">อบใหม่ทุกเช้า</p>
          <p className="text-xs text-zinc-500 mt-1">06:00 – พร้อมเสิร์ฟ</p>
        </div>
        <div className="border border-zinc-200 rounded-lg p-4">
          <p className="font-medium">50+ เมนู</p>
          <p className="text-xs text-zinc-500 mt-1">ครัวซองต์ เค้ก กาแฟ</p>
        </div>
      </div>
    </div>
  );
}
