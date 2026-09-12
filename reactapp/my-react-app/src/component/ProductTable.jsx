import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest, authHeaders } from "./api";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = () => {
    setLoading(true);
    apiRequest("/api/products", { headers: authHeaders() })
      .then(setProducts)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`ลบสินค้า “${product.name}” หรือไม่?`)) return;

    try {
      await apiRequest(`/api/products/${product.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setProducts((current) => current.filter((item) => item.id !== product.id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  if (loading) return <p className="text-sm text-zinc-500">กำลังโหลดสินค้า...</p>;
  if (error) return <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3">{error}</p>;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Products</h2>
          <p className="text-sm text-zinc-500 mt-1">จัดการรายการสินค้าในระบบ</p>
        </div>
        <Link to="/admin/products/new" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-black">Add New Product</Link>
      </div>

      <div className="mt-5 border border-zinc-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500 border-b border-zinc-200 bg-zinc-50">
                <th className="py-3 px-3 font-medium">ID</th>
                <th className="py-3 px-3 font-medium">Name</th>
                <th className="py-3 px-3 font-medium">Category</th>
                <th className="py-3 px-3 font-medium text-right">Price</th>
                <th className="py-3 px-3 font-medium text-right">Stock</th>
                <th className="py-3 px-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50">
                  <td className="py-3 px-3 text-zinc-500">{product.id}</td>
                  <td className="py-3 px-3 font-medium">{product.name}</td>
                  <td className="py-3 px-3 text-zinc-600">{product.category}</td>
                  <td className="py-3 px-3 text-right">{Number(product.price).toFixed(2)}</td>
                  <td className="py-3 px-3 text-right">{product.stock}</td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <Link to={`/admin/products/${product.id}/edit`} className="text-xs border border-zinc-200 rounded px-2.5 py-1.5 hover:bg-white">Edit</Link>
                    <button onClick={() => handleDelete(product)} className="ml-2 text-xs border border-red-200 text-red-600 rounded px-2.5 py-1.5 hover:bg-red-50">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan="6" className="py-10 text-center text-zinc-500">ยังไม่มีสินค้า</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
