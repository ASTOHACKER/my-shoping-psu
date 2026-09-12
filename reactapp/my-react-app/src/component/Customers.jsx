import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "./ui";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
function initials(name = "?") { return name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase(); }

export default function Customers() {
  const [customers, setCustomers] = useState([]); const [query, setQuery] = useState(""); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/customers`, { headers: { Authorization: `Bearer ${token}` } }).then(async (response) => {
      if (response.status === 401 || response.status === 403) { localStorage.removeItem("token"); navigate("/login"); return null; }
      if (!response.ok) throw new Error("ไม่สามารถโหลดรายชื่อลูกค้าได้"); return response.json();
    }).then((data) => { if (data) setCustomers(data); }).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, [navigate]);
  const filtered = customers.filter((customer) => [customer.name, customer.email, customer.city].some((field) => field && field.toLowerCase().includes(query.toLowerCase())));
  if (loading) return <div className="loading-state">กำลังเตรียมรายชื่อลูกค้า...</div>;
  if (error) return <div className="error-state"><h2>โหลดข้อมูลไม่สำเร็จ</h2><p>{error}</p></div>;
  return <section><div className="page-header"><div><p className="eyebrow">Community</p><h1 className="page-title">ลูกค้าของเรา</h1><p className="page-copy">คนสำคัญที่ทำให้ครัวของเรามีเหตุผลต้องเปิดเตาทุกเช้า</p></div><span className="result-count">{customers.length} คน</span></div>
    {customers.length === 0 ? <div className="empty-state"><h2>ยังไม่มีข้อมูลลูกค้า</h2><p>ข้อมูลจะแสดงเมื่อมีรายการในระบบ</p></div> : <><label className="search-field"><Icon name="search" size={16} /><span className="sr-only">ค้นหาลูกค้า</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อ / อีเมล / เมือง" /></label>{filtered.length === 0 ? <div className="empty-state" style={{ marginTop: 20 }}><h2>ไม่พบลูกค้าที่ตรงกัน</h2><p>ลองค้นหาด้วยคำอื่นแทน “{query}”</p></div> : <div className="data-table-wrap" style={{ marginTop: 20 }}><div className="overflow-x-auto"><table className="data-table"><caption className="sr-only">รายชื่อลูกค้า</caption><thead><tr><th></th><th>ชื่อ</th><th>อีเมล</th><th>เบอร์โทร</th><th>เมือง</th></tr></thead><tbody>{filtered.map((customer) => <tr key={customer.id}><td><span className="brand-mark" style={{ width: 32, height: 32, borderRadius: 9, fontSize: 10 }}>{initials(customer.name)}</span></td><td><strong>{customer.name}</strong></td><td>{customer.email}</td><td>{customer.phone}</td><td>{customer.city}</td></tr>)}</tbody></table></div></div>}</>}</section>;
}
