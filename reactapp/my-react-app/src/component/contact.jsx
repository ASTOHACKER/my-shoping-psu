import React from "react";

export default function Contact() {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">ติดต่อเรา</h1>
      <div className="mt-4 space-y-2 text-sm">
        <p><span className="text-zinc-500 w-16 inline-block">อีเมล</span> support@example.com</p>
        <p><span className="text-zinc-500 w-16 inline-block">โทร</span> +66 012 345 6789</p>
        <p><span className="text-zinc-500 w-16 inline-block">ที่อยู่</span> สยามสแควร์ ซอย 5 กรุงเทพฯ</p>
      </div>
    </div>
  );
}
