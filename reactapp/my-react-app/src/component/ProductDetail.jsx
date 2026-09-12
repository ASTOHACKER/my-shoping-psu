import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return null;
        }
        if (!response.ok) throw new Error("ไม่พบรายการสินค้านี้");
        return response.json();
      })
      .then((data) => {
        if (data) setProduct(data);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <p className="text-sm text-zinc-500">Loading...</p>;
  if (error || !product) {
    return (
      <div className="text-center border border-zinc-200 rounded-lg p-8">
        <p className="text-sm text-red-600">{error || "ไม่พบรายการสินค้านี้"}</p>
        <Link to="/products" className="text-sm text-zinc-600 hover:text-zinc-900 underline mt-3 inline-block">กลับหน้ารายการสินค้า</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/products" className="text-xs text-zinc-500 hover:text-zinc-700">← กลับรายการสินค้า</Link>
      <div className="mt-4 grid sm:grid-cols-2 gap-6">
        {product.image && (
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-lg border border-zinc-200" />
        )}
        <div>
          <h1 className="text-lg font-semibold">{product.name}</h1>
          <p className="text-sm font-medium text-zinc-700 mt-1">{product.price} บาท</p>
          <p className="text-sm text-zinc-600 mt-3 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
