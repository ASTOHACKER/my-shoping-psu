import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "./ui";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return null;
        }
        if (!response.ok) throw new Error("ไม่พบรายการสินค้านี้");
        return response.json();
      })
      .then((data) => { if (data) setProduct(data); })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="loading-state">กำลังเตรียมรายละเอียดขนม...</div>;
  if (error || !product) return <div className="error-state"><h2>ไม่พบขนมรายการนี้</h2><p>{error || "รายการอาจถูกย้ายหรือหมดจากเมนูแล้ว"}</p><Link to="/products" className="button-secondary" style={{ marginTop: 22 }}>กลับไปที่เมนู</Link></div>;

  return (
    <div>
      <Link to="/products" className="detail-back"><Icon name="back" size={16} /> กลับไปที่เมนูขนม</Link>
      <div className="detail-layout">
        <div className="detail-image">{product.image ? <img src={product.image} alt={product.name} /> : <div className="product-image-placeholder">ยังไม่มีรูปสินค้า</div>}</div>
        <div className="detail-info">
          <span className="product-category">{product.category || "Dessert"}</span>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description || "ขนมโฮมเมดจากครัว Sweet Bakery ตั้งใจทำสดใหม่เพื่อคุณ"}</p>
          <div className="detail-price">{Number(product.price).toLocaleString()} บาท</div>
          <p className="detail-stock">{product.stock === 0 ? "หมดชั่วคราว — ลองแวะมาใหม่เร็ว ๆ นี้" : `พร้อมเสิร์ฟ เหลือ ${product.stock} ชิ้น`}</p>
          <div className="button-row"><Link to="/contact" className="button-primary">สอบถาม / สั่งจอง <Icon name="arrow" size={16} /></Link><Link to="/products" className="button-secondary">เลือกเมนูอื่น</Link></div>
        </div>
      </div>
    </div>
  );
}
