import { Icon } from "./ui";

export default function Contact() {
  return (
    <div className="contact-layout">
      <section className="contact-copy"><p className="eyebrow">Come say hello</p><h1>แวะมาหา<br />เราได้เสมอ</h1><p>อยากสอบถามเมนู สั่งจองขนม หรือแค่แวะมาทักทาย ส่งข้อความหาเราได้เลย เราพร้อมชงกาแฟรอคุณอยู่</p></section>
      <section className="contact-list" aria-label="ข้อมูลติดต่อ Sweet Bakery">
        <div className="contact-item"><span className="contact-icon"><Icon name="phone" size={18} /></span><div><span>โทรศัพท์</span><strong>+66 012 345 6789</strong></div></div>
        <div className="contact-item"><span className="contact-icon"><Icon name="info" size={18} /></span><div><span>อีเมล</span><strong>support@example.com</strong></div></div>
        <div className="contact-item"><span className="contact-icon"><Icon name="home" size={18} /></span><div><span>หน้าร้าน</span><strong>สยามสแควร์ ซอย 5 กรุงเทพฯ</strong></div></div>
        <div className="contact-item"><span className="contact-icon"><Icon name="sparkle" size={18} /></span><div><span>เวลาเปิดร้าน</span><strong>ทุกวัน · 06:00 – 18:00 น.</strong></div></div>
      </section>
    </div>
  );
}
