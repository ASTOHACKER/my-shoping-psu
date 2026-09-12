import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "./api";
import { Icon } from "./ui";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", fullname: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault(); setMessage(""); setError(""); setLoading(true);
    try {
      await apiRequest("/api/users/register", { method: "POST", body: JSON.stringify(form) });
      setForm({ username: "", password: "", fullname: "" }); setMessage("สมัครสมาชิกสำเร็จ กำลังพาไปหน้าเข้าสู่ระบบ");
      setTimeout(() => navigate("/login"), 800);
    } catch (requestError) { setError(requestError.message); } finally { setLoading(false); }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-aside"><small>BAKE SOMETHING GOOD</small><h2>เริ่มต้นวันที่อร่อยกว่าเดิม</h2><p>สร้างบัญชีไว้สำหรับดูเมนูใหม่ ๆ และรายละเอียดขนมจาก Sweet Bakery</p></aside>
      <section className="auth-form-wrap">
        <h1>สมัครสมาชิก</h1><p>สร้างบัญชีผู้ใช้สำหรับดูสินค้า</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field"><label htmlFor="register-name">ชื่อ-นามสกุล</label><input id="register-name" value={form.fullname} onChange={update("fullname")} placeholder="ชื่อของคุณ" required autoComplete="name" /></div>
          <div className="field"><label htmlFor="register-username">ชื่อผู้ใช้</label><input id="register-username" value={form.username} onChange={update("username")} placeholder="ตั้งชื่อผู้ใช้" required autoComplete="username" /></div>
          <div className="field"><label htmlFor="register-password">รหัสผ่าน</label><input id="register-password" value={form.password} onChange={update("password")} placeholder="อย่างน้อย 6 ตัวอักษร" type="password" minLength="6" required autoComplete="new-password" /></div>
          {message && <p className="form-message form-success" role="status">{message}</p>}
          {error && <p className="form-message" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="auth-submit">{loading ? "กำลังสร้างบัญชี..." : "สร้างบัญชี"}<Icon name="arrow" size={15} /></button>
        </form>
        <p className="auth-switch">มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link></p>
      </section>
    </div>
  );
}
