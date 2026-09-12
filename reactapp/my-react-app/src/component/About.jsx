import { Icon } from "./ui";

export default function About() {
  return (
    <div className="story-layout">
      <aside className="story-note"><Icon name="sparkle" size={24} /><h2>เรื่องเล็ก ๆ<br />ที่เราตั้งใจทำ</h2><p>จากครัวเล็ก ๆ สู่โต๊ะกาแฟของคุณ เราเชื่อว่าขนมที่อร่อยควรทำให้ช่วงเวลาธรรมดารู้สึกพิเศษขึ้น</p></aside>
      <section className="story-copy">
        <p className="eyebrow">Our story</p>
        <h1>อบด้วยใจ<br />ในทุกเช้า</h1>
        <p>Sweet Bakery Cafe คือร้านขนมโฮมเมดที่ใส่ใจทุกขั้นตอน ตั้งแต่การเลือกเนยสดแท้ ช็อกโกแลตเข้มข้น ไปจนถึงจังหวะที่พอดีในเตาอบ เราทำขนมทีละ batch เพื่อให้คุณได้รับความสดใหม่ในทุกคำ</p>
        <ul className="story-list">
          <li><Icon name="sparkle" size={18} /><div><strong>วัตถุดิบคุณภาพ</strong><span>คัดสรรวัตถุดิบที่เรากล้าเสิร์ฟให้คนที่เรารัก</span></div></li>
          <li><Icon name="package" size={18} /><div><strong>อบสดใหม่ทุกวัน</strong><span>เริ่มเตรียมตั้งแต่เช้า ไม่เร่งขั้นตอนที่สำคัญ</span></div></li>
          <li><Icon name="users" size={18} /><div><strong>ส่งมอบความสุขในทุกคำ</strong><span>เพราะรอยยิ้มหลังได้ชิม คือสิ่งที่ทำให้เราอยากอบต่อ</span></div></li>
        </ul>
      </section>
    </div>
  );
}
