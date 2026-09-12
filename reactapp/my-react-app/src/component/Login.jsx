import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "./ui";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login({ setToken, setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "เข้าสู่ระบบไม่สำเร็จ");
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role || "user");
      setToken(result.token);
      if (setRole) setRole(result.role || "user");
      navigate(result.role === "admin" ? "/admin/products" : "/products");
    } catch (requestError) {
      setError(requestError.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-aside"><small>SWEET BAKERY CAFE</small><h2>กลับมาเติมความหวานกันนะ</h2><p>เข้าสู่ระบบเพื่อดูเมนูขนมและรายละเอียดสินค้าจากครัวของเรา</p></aside>
      <section className="auth-form-wrap">
        <h1>เข้าสู่ระบบ</h1><p>ยินดีต้อนรับกลับสู่ Sweet Bakery</p>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="field"><label htmlFor="login-username">ชื่อผู้ใช้</label><input id="login-username" type="text" value={username} placeholder="เช่น sweetlover" onChange={(event) => setUsername(event.target.value)} required autoComplete="username" /></div>
          <div className="field"><label htmlFor="login-password">รหัสผ่าน</label><input id="login-password" type="password" value={password} placeholder="กรอกรหัสผ่านของคุณ" onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></div>
          {error && <p className="form-message" role="alert">{error}</p>}
          <button type="submit" disabled={loading} className="auth-submit">{loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}<Icon name="arrow" size={15} /></button>
        </form>
        <p className="auth-switch">ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link></p>
      </section>
    </div>
  );
}
