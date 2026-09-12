import { Link } from "react-router-dom";
import { Icon } from "./ui";

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <span className="eyebrow">Sweet Bakery Cafe</span>
          <h1 className="display-title">ขนมอบสดใหม่<br />ที่ทำให้วันธรรมดา<br /><em>หวานขึ้นอีกนิด</em></h1>
          <p className="lead">ขนมโฮมเมดจากครัวเล็ก ๆ ของเรา ใช้เนยแท้ วัตถุดิบคุณภาพ และอบใหม่ทุกเช้า เพื่อให้ทุกคำมีรสชาติของความตั้งใจ</p>
          <div className="button-row">
            <Link to="/products" className="button-primary">เลือกขนมของเรา <Icon name="arrow" size={16} /></Link>
            <Link to="/about" className="button-secondary">รู้จักร้านของเรา</Link>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-card">
            <div className="hero-card-top"><span>BAKED FRESH · EVERY MORNING</span><span className="hero-card-stamp">SINCE<br />2018</span></div>
            <div className="hero-card-copy"><h2>Made with<br />butter & care.</h2><p>ขนมที่ดีเริ่มจากวัตถุดิบที่ดี<br />และเวลาที่พอดีในเตาอบ</p></div>
            <div className="hero-card-bottom"><span>SMALL BATCH / BIG HEART</span><Icon name="sparkle" size={18} /></div>
          </div>
        </div>
      </section>

      <section className="home-highlights" aria-label="จุดเด่นของร้าน">
        <div className="highlight"><span className="highlight-icon"><Icon name="sparkle" size={16} /></span><div><h3>เนยแท้คุณภาพดี</h3><p>หอมละมุนจากวัตถุดิบที่เราเลือกเอง</p></div></div>
        <div className="highlight"><span className="highlight-icon"><Icon name="package" size={16} /></span><div><h3>อบใหม่ทุกเช้า</h3><p>เริ่มเตรียมตั้งแต่ 06:00 เพื่อความสดใหม่</p></div></div>
        <div className="highlight"><span className="highlight-icon"><Icon name="phone" size={16} /></span><div><h3>แวะมาทักทายกัน</h3><p>สยามสแควร์ ซอย 5 กรุงเทพฯ</p></div></div>
      </section>
    </div>
  );
}
