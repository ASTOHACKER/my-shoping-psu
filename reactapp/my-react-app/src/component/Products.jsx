import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "./ui";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/products`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return null;
        }
        if (!response.ok) throw new Error("ไม่สามารถโหลดรายการขนมได้");
        return response.json();
      })
      .then((data) => { if (data) setProducts(data); })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category).filter(Boolean))], [products]);
  const displayedProducts = products.filter((product) => {
    const matchesCategory = !categoryFilter || product.category?.toLowerCase() === categoryFilter.toLowerCase();
    const haystack = [product.name, product.description, product.category].filter(Boolean).join(" ").toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  });

  if (loading) {
    return <div><div className="page-header"><div><p className="eyebrow">Sweet selection</p><h1 className="page-title">เมนูขนม</h1></div><span className="result-count">กำลังอบรายการ...</span></div><div className="loading-grid" aria-label="กำลังโหลดรายการขนม">{[1, 2, 3].map((item) => <div className="loading-card" key={item} />)}</div></div>;
  }

  if (error) return <div className="error-state"><h2>โหลดเมนูไม่สำเร็จ</h2><p>{error}</p></div>;

  return (
    <div>
      <header className="page-header">
        <div><p className="eyebrow">Sweet selection</p><h1 className="page-title">เมนูขนม</h1><p className="page-copy">เลือกของโปรดจากขนมโฮมเมดที่เราอบใหม่ทีละ batch — พร้อมเสิร์ฟความสุขจากเตาถึงโต๊ะ</p></div>
        <span className="result-count">{displayedProducts.length} รายการ</span>
      </header>

      <div className="toolbar">
        <div className="filter-row" aria-label="กรองหมวดหมู่สินค้า">
          <button type="button" className={`filter-pill${!categoryFilter ? " active" : ""}`} onClick={() => setSearchParams({})}>ทั้งหมด</button>
          {categories.map((category) => <button type="button" className={`filter-pill${categoryFilter.toLowerCase() === category.toLowerCase() ? " active" : ""}`} key={category} onClick={() => setSearchParams({ category })}>{category}</button>)}
        </div>
        <label className="search-field"><Icon name="search" size={16} /><span className="sr-only">ค้นหาเมนู</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อขนม..." /></label>
      </div>

      {displayedProducts.length === 0 ? (
        <div className="empty-state"><h2>ยังไม่พบขนมที่ตามหา</h2><p>{query ? `ลองค้นหาด้วยคำอื่นแทน “${query}”` : categoryFilter ? `ยังไม่มีสินค้าในหมวด “${categoryFilter}”` : "ยังไม่มีสินค้าในฐานข้อมูล"}</p></div>
      ) : (
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image">
                {product.image ? <img src={product.image} alt={product.name} loading="lazy" /> : <div className="product-image-placeholder">ยังไม่มีรูปสินค้า</div>}
                <span className="product-badge">ทำสดใหม่</span>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category || "Dessert"}</span>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description || "ขนมโฮมเมดจากครัว Sweet Bakery"}</p>
                <div className="product-meta"><span className="product-price">{Number(product.price).toLocaleString()} บาท</span><span className={`product-stock${product.stock === 0 ? " out" : ""}`}>{product.stock === 0 ? "หมดชั่วคราว" : `เหลือ ${product.stock} ชิ้น`}</span></div>
                <Link to={`/products/${product.id}`} className="product-detail-link">ดูรายละเอียด <Icon name="arrow" size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
