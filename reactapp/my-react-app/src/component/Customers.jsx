import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return null;
        }
        if (!response.ok) throw new Error("Cannot load customers");
        return response.json();
      })
      .then((data) => {
        if (data) setCustomers(data);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const filtered = customers.filter((c) =>
    [c.name, c.email, c.city].some((f) => f && f.toLowerCase().includes(query.toLowerCase()))
  );

  if (loading) {
    return (
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight">รายชื่อลูกค้า</h1>
          <span className="text-xs text-zinc-400">กำลังโหลด...</span>
        </div>
        <div className="mt-5 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 border border-zinc-200 rounded-lg animate-pulse bg-zinc-50" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3">{error}</p>;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight">รายชื่อลูกค้า</h1>
        <span className="text-xs text-zinc-500">{customers.length} คน</span>
      </div>

      {customers.length === 0 ? (
        <p className="text-sm text-zinc-500 mt-6 border border-zinc-200 rounded-lg p-8 text-center">ยังไม่มีข้อมูลลูกค้า</p>
      ) : (
        <>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาชื่อ / อีเมล / เมือง"
            className="mt-4 w-full sm:max-w-xs border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
          />

          {filtered.length === 0 ? (
            <p className="text-sm text-zinc-500 mt-6 border border-zinc-200 rounded-lg p-8 text-center">ไม่พบลูกค้าที่ตรงกับ "{query}"</p>
          ) : (
            <div className="mt-4 border border-zinc-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-zinc-500 border-b border-zinc-200 bg-zinc-50">
                      <th className="py-2.5 px-3 font-medium w-10"></th>
                      <th className="py-2.5 px-3 font-medium">ชื่อ</th>
                      <th className="py-2.5 px-3 font-medium">อีเมล</th>
                      <th className="py-2.5 px-3 font-medium">เบอร์โทร</th>
                      <th className="py-2.5 px-3 font-medium">เมือง</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filtered.map((c) => (
                      <tr key={c.id} className="hover:bg-zinc-50">
                        <td className="py-2.5 px-3">
                          <span className="w-7 h-7 rounded-full bg-zinc-900 text-white grid place-items-center text-[11px] font-medium">
                            {initials(c.name || "?")}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-medium">{c.name}</td>
                        <td className="py-2.5 px-3 text-zinc-600">{c.email}</td>
                        <td className="py-2.5 px-3 text-zinc-600">{c.phone}</td>
                        <td className="py-2.5 px-3 text-zinc-600">{c.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
