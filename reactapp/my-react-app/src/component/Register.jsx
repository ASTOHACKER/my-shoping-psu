import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "./api";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", fullname: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await apiRequest("/api/users/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ username: "", password: "", fullname: "" });
      setMessage("Register success");
      setTimeout(() => navigate("/login"), 800);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-semibold tracking-tight">สมัครสมาชิก</h1>
      <p className="text-sm text-zinc-500 mt-1">สร้างบัญชีผู้ใช้สำหรับดูสินค้า</p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" required className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" />
        <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (อย่างน้อย 6 ตัวอักษร)" type="password" minLength="6" required className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" />
        <input value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} placeholder="Full name" required className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-400" />
        {message && <p className="text-sm text-emerald-700 border border-emerald-200 bg-emerald-50 rounded-md p-2.5">{message}</p>}
        {error && <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-2.5">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-zinc-900 text-white rounded-md py-2 text-sm font-medium hover:bg-black disabled:opacity-50">{loading ? "กำลังสมัคร..." : "Register"}</button>
      </form>
      <p className="text-sm text-zinc-500 mt-4 text-center">มีบัญชีแล้ว? <Link to="/login" className="text-zinc-900 underline">เข้าสู่ระบบ</Link></p>
    </div>
  );
}
