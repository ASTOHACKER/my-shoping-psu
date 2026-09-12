import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Login failed");
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role || "user");
      setToken(result.token);
      if (setRole) setRole(result.role || "user");
      navigate(result.role === "admin" ? "/admin/products" : "/products");
    } catch (requestError) {
      setError(requestError.message || "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-semibold tracking-tight">เข้าสู่ระบบ</h1>
      <p className="text-sm text-zinc-500 mt-1">เข้าสู่ระบบเพื่อดูสินค้าและลูกค้า</p>
      <form onSubmit={handleLogin} className="mt-5 space-y-3">
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
          required
        />
        {error && <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-2.5">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-zinc-900 text-white rounded-md py-2 text-sm font-medium hover:bg-black disabled:opacity-50">
          {loading ? "กำลังเข้าสู่ระบบ..." : "Login"}
        </button>
      </form>
      <p className="text-sm text-zinc-500 mt-4 text-center"><a href="/register" className="text-zinc-900 underline">สมัครสมาชิก</a></p>
    </div>
  );
}
