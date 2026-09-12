import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, authHeaders } from "./api";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadProducts = () => { setLoading(true); apiRequest("/api/products", { headers: authHeaders() }).then(setProducts).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)); };
  useEffect(() => { loadProducts(); }, []);
  const handleDelete = async (product) => {
    if (!window.confirm(`ลบสินค้า “${product.name}” หรือไม่?`)) return;
    try { await apiRequest(`/api/products/${product.id}`, { method: "DELETE", headers: authHeaders() }); setProducts((current) => current.filter((item) => item.id !== product.id)); }
    catch (requestError) { setError(requestError.message); }
  };
  if (loading) return <div className="loading-state">กำลังเตรียมรายการสินค้า...</div>;
  if (error) return <div className="error-state"><h2>โหลดรายการไม่สำเร็จ</h2><p>{error}</p></div>;

  return (
    <section>
      <div className="page-header"><div><p className="eyebrow">Product shelf</p><h2 className="page-title">รายการสินค้า</h2><p className="page-copy">ดูแลเมนูที่พร้อมเสิร์ฟ แก้ไขรายละเอียด หรือเติมสินค้าใหม่เข้าหน้าร้าน</p></div><span className="result-count">{products.length} รายการ</span></div>
      <div className="data-table-wrap"><div className="overflow-x-auto"><table className="data-table"><caption className="sr-only">ตารางจัดการสินค้า</caption><thead><tr><th>ID</th><th>สินค้า</th><th>หมวดหมู่</th><th>ราคา</th><th>คงเหลือ</th><th className="text-right">จัดการ</th></tr></thead><tbody>
        {products.map((product) => <tr key={product.id}><td>{product.id}</td><td><div className="table-product"><span className="table-product-thumb">{product.image && <img src={product.image} alt="" />}</span><strong>{product.name}</strong></div></td><td>{product.category || "—"}</td><td>{Number(product.price).toLocaleString()} บาท</td><td>{product.stock} ชิ้น</td><td><div className="table-actions"><Link to={`/admin/products/${product.id}/edit`} className="table-action">แก้ไข</Link><button onClick={() => handleDelete(product)} className="table-action delete" type="button">ลบ</button></div></td></tr>)}
        {products.length === 0 && <tr><td colSpan="6"><div className="empty-state">ยังไม่มีสินค้าในระบบ</div></td></tr>}
      </tbody></table></div></div>
    </section>
  );
}
