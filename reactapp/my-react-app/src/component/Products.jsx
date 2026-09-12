import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const displayedProducts = categoryFilter
    ? products.filter(
        (p) => p.category?.toLowerCase() === categoryFilter.toLowerCase()
      )
    : products;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return null;
        }
        if (!response.ok) throw new Error("Cannot load products");
        return response.json();
      })
      .then((data) => {
        if (data) setProducts(data);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-xl font-semibold tracking-tight">รายการสินค้า</h1>
          <span className="text-xs text-zinc-400">กำลังโหลด...</span>
        </div>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-zinc-200 rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-zinc-100" />
              <div className="p-3.5 space-y-2">
                <div className="h-3 bg-zinc-100 rounded w-1/3" />
                <div className="h-4 bg-zinc-100 rounded w-3/4" />
                <div className="h-3 bg-zinc-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3">{error}</p>;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-xl font-semibold tracking-tight">รายการสินค้า</h1>
        <span className="text-xs text-zinc-500">{displayedProducts.length} รายการ</span>
      </div>
      {categoryFilter ? (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-full border border-zinc-200">
            หมวดหมู่: <strong>{categoryFilter}</strong>
          </span>
          <button
            onClick={() => setSearchParams({})}
            className="text-xs text-blue-600 hover:underline"
          >
            แสดงทั้งหมด
          </button>
        </div>
      ) : (
        <p className="text-sm text-zinc-500 mt-1">เมนูอบสดใหม่ — เลือกดูรายละเอียดได้</p>
      )}

      {displayedProducts.length === 0 ? (
        <p className="text-sm text-zinc-500 mt-6 border border-zinc-200 rounded-lg p-8 text-center">
          {categoryFilter ? `ไม่พบสินค้าในหมวด "${categoryFilter}"` : "ยังไม่มีสินค้าในฐานข้อมูล"}
        </p>
      ) : (
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col hover:border-zinc-300 transition-colors">
              <div className="aspect-[4/3] bg-zinc-100 overflow-hidden border-b border-zinc-100">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-xs text-zinc-400">ไม่มีรูป</div>
                )}
              </div>
              <div className="p-3.5 flex flex-col flex-1 gap-1">
                <p className="text-[11px] tracking-wide uppercase text-zinc-500">{product.category || "Dessert"}</p>
                <p className="text-sm font-medium leading-tight line-clamp-1">{product.name}</p>
                {product.description && (
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed min-h-[32px]">{product.description}</p>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                  <span className="text-sm font-semibold">{Number(product.price).toLocaleString()} บาท</span>
                  {product.stock != null && (
                    <span className={`text-xs ${product.stock === 0 ? "text-red-500" : "text-zinc-500"}`}>
                      {product.stock === 0 ? "หมด" : `คงเหลือ ${product.stock}`}
                    </span>
                  )}
                </div>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-3 text-xs font-medium text-center border border-zinc-200 bg-white px-3 py-2 rounded-md hover:bg-zinc-50"
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
